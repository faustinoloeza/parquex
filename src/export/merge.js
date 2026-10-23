import * as THREE from 'three';
import { mergeGeometries, mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';
import { bakeTextureTransform, emissiveUv, exportMaterial } from './materials.js';

const KEEP = ['position', 'normal', 'uv', 'color'];

/**
 * Collects the meshes under some app objects in world space and merges them
 * into one mesh per (plain) material: one draw call per material for all of
 * them, world transforms baked in.
 *
 *  - InstancedMesh: every instance is expanded (instance colors go into the
 *    vertex colors), so the result needs no instancing support;
 *  - lines and points are skipped (thin ropes; Filament has no line width);
 *  - flat-shaded materials get per-face normals (glTF has no flat shading);
 *  - mirrored transforms get their triangle winding flipped.
 */
export class MaterialMerger {
  constructor() {
    /** @type {Map<THREE.Material, THREE.BufferGeometry[]>} */
    this.parts = new Map();
    this.skipped = [];
  }

  /** @param {THREE.Object3D} root */
  addObject(root) {
    root.updateMatrixWorld(true);
    root.traverse((o) => {
      if (!o.isMesh || !o.visible || !isVisible(o)) return;
      if (Array.isArray(o.material) || o.material.isShaderMaterial) {
        this.skipped.push(o.name || o.type);
        return;
      }
      if (o.isInstancedMesh) {
        const m = new THREE.Matrix4();
        const c = new THREE.Color();
        for (let i = 0; i < o.count; i++) {
          o.getMatrixAt(i, m);
          m.premultiply(o.matrixWorld);
          this.addGeometry(o.geometry, m, o.material, o.instanceColor ? o.getColorAt(i, c) : null, hint(o));
        }
      } else this.addGeometry(o.geometry, o.matrixWorld, o.material, null, hint(o));
    });
  }

  /**
   * @param {THREE.BufferGeometry} geometry
   * @param {THREE.Matrix4} matrix world matrix
   * @param {THREE.Material} source app material
   * @param {THREE.Color | null} tint instance color
   * @param {string} [name] material name when the app material has none
   */
  addGeometry(geometry, matrix, source, tint, name) {
    const material = exportMaterial(source, tint ? { vertexColors: true, name } : { name });
    let g = geometry.index ? geometry.toNonIndexed() : geometry.clone();
    for (const name of Object.keys(g.attributes)) if (!KEEP.includes(name)) g.deleteAttribute(name);
    // night windows (export/materials.js): their own UVs, from the source ones
    if (material.emissiveMap?.channel === 1) emissiveUv(g, source.emissiveMap);
    if (material.map) bakeTextureTransform(g, source.map);
    else g.deleteAttribute('uv');
    if (material.map && !g.getAttribute('uv')) g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(count(g) * 2), 2));
    g.applyMatrix4(matrix);
    if (matrix.determinant() < 0) flipWinding(g);
    if (source.flatShading || !g.getAttribute('normal')) {
      g.deleteAttribute('normal');
      g.computeVertexNormals(); // non-indexed: one normal per face
    }
    g = withColors(g, material.vertexColors, tint);
    if (!this.parts.has(material)) this.parts.set(material, []);
    this.parts.get(material).push(g);
  }

  /**
   * One mesh per material, indexed again (shared vertices welded).
   * @param {string} prefix mesh name prefix
   * @returns {THREE.Mesh[]}
   */
  build(prefix) {
    const meshes = [];
    for (const [material, list] of this.parts) {
      const merged = mergeVertices(mergeGeometries(list, false), 1e-4);
      const mesh = new THREE.Mesh(merged, material);
      mesh.name = `${prefix}:${material.name}`;
      meshes.push(mesh);
      for (const g of list) g.dispose();
    }
    this.parts.clear();
    return meshes;
  }
}

const count = (g) => g.getAttribute('position').count;

/** Readable material name from a model mesh ("batch:<material key>" from ModelKit). */
const hint = (o) => (o.name.startsWith('batch:') ? o.name.slice(6) : undefined);

function isVisible(o) {
  for (let p = o.parent; p; p = p.parent) if (!p.visible) return false;
  return true;
}

/** Reverses each triangle of a non-indexed geometry (swaps its 2nd and 3rd vertex). */
function flipWinding(g) {
  for (const attribute of Object.values(g.attributes)) {
    const a = attribute.array,
      s = attribute.itemSize;
    const tmp = new Float32Array(s);
    for (let v = 0; v + 2 < attribute.count; v += 3) {
      const i = (v + 1) * s,
        j = (v + 2) * s;
      tmp.set(a.subarray(i, i + s));
      a.copyWithin(i, j, j + s);
      a.set(tmp, j);
    }
  }
}

/** RGB vertex colors when the material uses them (times the instance tint), none otherwise. */
function withColors(g, vertexColors, tint) {
  if (!vertexColors) {
    g.deleteAttribute('color');
    return g;
  }
  const n = count(g);
  const src = g.getAttribute('color');
  const rgb = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const r = src ? src.getX(i) : 1,
      gg = src ? src.getY(i) : 1,
      b = src ? src.getZ(i) : 1;
    rgb[i * 3] = r * (tint?.r ?? 1);
    rgb[i * 3 + 1] = gg * (tint?.g ?? 1);
    rgb[i * 3 + 2] = b * (tint?.b ?? 1);
  }
  g.setAttribute('color', new THREE.BufferAttribute(rgb, 3));
  return g;
}
