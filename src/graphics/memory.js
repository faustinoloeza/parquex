// Video-memory bookkeeping: static data is uploaded once and its CPU copy
// released, so the page holds each texture / vertex buffer only once. Sizes
// are recorded before release for the diagnostics overlay (?stats).

/** Frees the CPU copy of a texture's image once it has been uploaded. */
export function releaseAfterUpload(texture) {
  texture.onUpdate = () => {
    const image = texture.image;
    texture.userData.bytes = textureBytes(texture);
    if (typeof ImageBitmap !== 'undefined' && image instanceof ImageBitmap) image.close();
    else if (image?.getContext) image.width = image.height = 1; // canvas
    texture.onUpdate = null;
  };
  return texture;
}

/**
 * Frees the CPU copy of a static geometry once it is on the GPU. Bounds are
 * computed first: culling needs them. Do not use on geometry that is modified,
 * merged or raycast later.
 */
export function releaseGeometryAfterUpload(geometry) {
  if (!geometry.boundingSphere) geometry.computeBoundingSphere();
  if (!geometry.boundingBox) geometry.computeBoundingBox();
  geometry.userData.bytes = geometryBytes(geometry);
  for (const attribute of Object.values(geometry.attributes)) attribute.onUpload(dropArray);
  geometry.index?.onUpload(dropArray);
  return geometry;
}

function dropArray() {
  this.array = null;
}

function textureBytes(texture) {
  if (texture.userData.bytes) return texture.userData.bytes;
  const { width = 0, height = 0 } = texture.image ?? {};
  return width * height * 4 * (texture.generateMipmaps ? 4 / 3 : 1);
}

function geometryBytes(geometry) {
  if (geometry.userData.bytes) return geometry.userData.bytes;
  let bytes = 0;
  for (const a of Object.values(geometry.attributes)) bytes += a.array?.byteLength ?? 0;
  return bytes + (geometry.index?.array?.byteLength ?? 0);
}

/**
 * Approximate video memory (bytes) of the geometries and textures used under
 * `root`, per top-level child.
 * @param {import('three').Object3D} root
 */
export function estimateMemory(root) {
  const seen = new Set();
  const total = { geometry: 0, texture: 0, byLayer: {} };
  for (const layer of root.children) {
    const entry = (total.byLayer[layer.name || layer.type] = { geometry: 0, texture: 0 });
    layer.traverse((o) => {
      if (o.geometry && !seen.has(o.geometry)) {
        seen.add(o.geometry);
        entry.geometry += geometryBytes(o.geometry);
      }
      if (o.isInstancedMesh && !seen.has(o.instanceMatrix)) {
        seen.add(o.instanceMatrix);
        entry.geometry += o.count * 64 + (o.instanceColor ? o.count * 12 : 0);
      }
      for (const m of o.material ? [o.material].flat() : []) {
        const values = [...Object.values(m), ...Object.values(m.uniforms ?? {}).map((u) => u.value)];
        for (const v of values) {
          if (v?.isTexture && !seen.has(v)) {
            seen.add(v);
            entry.texture += textureBytes(v);
          }
        }
      }
    });
    total.geometry += entry.geometry;
    total.texture += entry.texture;
  }
  return total;
}

/**
 * Releases the CPU copies of every geometry (and instance buffers) under a
 * static object once uploaded. Bounds are computed first.
 * @param {import('three').Object3D} root
 */
export function releaseStatic(root) {
  root.traverse((o) => {
    if (o.isInstancedMesh) {
      if (!o.boundingSphere) o.computeBoundingSphere();
      o.instanceMatrix.onUpload(dropArray);
      o.instanceColor?.onUpload(dropArray);
    }
    if (o.geometry) releaseGeometryAfterUpload(o.geometry);
  });
  return root;
}

/** GPU resources cached at module level and reused by every park (see markShared). */
const SHARED = new WeakSet();

/**
 * Marks a geometry, material or texture as shared (module caches: procedural
 * textures, the material library…): disposeObject() leaves it alone, because
 * its CPU copy is gone and the next park reuses it as it is.
 * @template T
 * @param {T} resource
 * @returns {T}
 */
export function markShared(resource) {
  SHARED.add(resource);
  return resource;
}

/**
 * Frees the video memory of everything under `root` (geometries, instance
 * buffers, materials and their textures), except shared resources and the
 * textures in `keep`. Used when the map switches its focused park.
 * @param {import('three').Object3D} root
 * @param {{ keep?: Set<import('three').Texture> }} [options]
 */
export function disposeObject(root, { keep = new Set() } = {}) {
  const done = new Set();
  const once = (resource) => {
    if (!resource || done.has(resource) || SHARED.has(resource) || keep.has(resource)) return;
    done.add(resource);
    resource.dispose();
  };
  root.traverse((o) => {
    if (o.isInstancedMesh && !done.has(o)) {
      done.add(o);
      o.dispose(); // instance buffers
    }
    once(o.geometry);
    for (const m of o.material ? [o.material].flat() : []) {
      if (SHARED.has(m)) continue;
      const values = [...Object.values(m), ...Object.values(m.uniforms ?? {}).map((u) => u?.value)];
      for (const v of values) if (v?.isTexture) once(v);
      once(m);
    }
  });
}
