import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { encodeInstances, linearToSrgbByte } from '#shared/formats/instances.js';
import { MaterialMerger } from './merge.js';

// Repeated models of the mobile export (trees, buses) as one prototype mesh
// per type plus a list of copies (instances.bin, shared/formats/instances.js)
// instead of every copy baked into the GLB. The app hides the prototypes and
// rebuilds merged geometry on the device (Filament's gltfio has no
// EXT_mesh_gpu_instancing and caps InstanceBuffer at 64).

/** Rotation/scale terms below this count as zero (float noise of compose/decompose). */
const EPS = 1e-4;

/**
 * Collects prototypes and their copies.
 *
 *   const set = new InstanceSet();
 *   set.add('bus', instancedMesh);
 *   set.prototypes  // [THREE.Mesh 'proto:bus', …] to add to the scene
 *   set.encode()    // instances.bin
 */
export class InstanceSet {
  constructor() {
    /** @type {THREE.Mesh[]} */
    this.prototypes = [];
    /** @type {import('#shared/formats/instances.js').InstanceType[]} */
    this.types = [];
    /** problems found (tilted copies, uneven XZ scale, clamped tints) */
    this.warnings = [];
  }

  /**
   * Adds every copy of an app InstancedMesh as `proto:<name>` + records. The
   * prototype geometry goes through the same path as the merged export
   * (MaterialMerger: plain material, normals, COLOR_0 times the tint), with
   * the per-copy tint left to the records.
   * @param {string} name type name
   * @param {THREE.InstancedMesh} mesh copies in world space (its parents' transforms included)
   * @param {{ tintScale?: number }} [options] tintScale: factor baked into the prototype's COLOR_0 so
   *        tints brighter than 1 (trees go up to ≈ 1.17) fit in the 0..255 record bytes
   */
  add(name, mesh, { tintScale = 1 } = {}) {
    if (this.types.some((t) => t.name === name)) throw new Error(`duplicate instance type "${name}"`);
    const merger = new MaterialMerger();
    merger.addGeometry(mesh.geometry, new THREE.Matrix4(), mesh.material, new THREE.Color(tintScale, tintScale, tintScale));
    this.prototypes.push(combine(merger.build('proto'), `proto:${name}`));

    const { records, tilted, uneven, clamped } = instanceRecords(mesh, { tintScale });
    if (tilted) this.warnings.push(`${name}: ${tilted} copies tilted (only rotation around y is stored)`);
    if (uneven) this.warnings.push(`${name}: ${uneven} copies with different x and z scale (x kept)`);
    if (clamped) this.warnings.push(`${name}: ${clamped} tints above ${tintScale} clamped`);
    this.types.push({ name, records });
  }

  /** instances.bin */
  encode() {
    return encodeInstances(this.types);
  }

  /** copies per type name */
  counts() {
    return Object.fromEntries(this.types.map((t) => [t.name, t.records.length]));
  }
}

/**
 * One instances.bin record per copy of an InstancedMesh (its parents'
 * transforms included), with the count of copies that do not fit a record:
 * tilted (only the rotation around y is stored), uneven x / z scale (x kept)
 * and tints above `tintScale` (clamped).
 * @param {THREE.InstancedMesh} mesh
 * @param {{ tintScale?: number }} [options]
 * @returns {{ records: import('#shared/formats/instances.js').InstanceRecord[], tilted: number, uneven: number, clamped: number }}
 */
export function instanceRecords(mesh, { tintScale = 1 } = {}) {
  mesh.updateWorldMatrix(true, false);
  const m = new THREE.Matrix4(),
    c = new THREE.Color(1, 1, 1);
  const records = [];
  let tilted = 0,
    uneven = 0,
    clamped = 0;
  for (let i = 0; i < mesh.count; i++) {
    mesh.getMatrixAt(i, m).premultiply(mesh.matrixWorld);
    const e = m.elements;
    // columns: x = (cos·s, 0, −sin·s), y = (0, sy, 0), z = (sin·s, 0, cos·s)
    const scale = Math.hypot(e[0], e[2]),
      scaleZ = Math.hypot(e[8], e[10]);
    if (Math.abs(e[1]) > EPS || Math.abs(e[4]) > EPS || Math.abs(e[6]) > EPS || Math.abs(e[9]) > EPS) tilted++;
    if (Math.abs(scale - scaleZ) > EPS * Math.max(1, scale)) uneven++;
    if (mesh.instanceColor) mesh.getColorAt(i, c);
    const rgb = [c.r, c.g, c.b].map((v) => v / tintScale);
    if (rgb.some((v) => v > 1 + 1e-6)) clamped++;
    const [r, g, b] = rgb.map(linearToSrgbByte);
    records.push({ x: e[12], y: e[13], z: e[14], rotY: Math.atan2(-e[2], e[0]), scale, scaleY: e[5], r, g, b });
  }
  return { records, tilted, uneven, clamped };
}

/**
 * One mesh per prototype: a single material stays a plain mesh (one glTF
 * primitive); several become one geometry with groups and a material array
 * (one primitive each, same glTF mesh). No transform.
 * @param {THREE.Mesh[]} meshes
 * @param {string} name
 */
export function combine(meshes, name) {
  let mesh = meshes[0];
  if (meshes.length > 1) {
    // one material may keep uv (a texture) or color (vertex colors) and another not:
    // fill in what is missing (zero uv, white) so the primitives can share a mesh
    for (const name of ['uv', 'color']) {
      if (!meshes.some((m) => m.geometry.getAttribute(name))) continue;
      const size = name === 'uv' ? 2 : 3;
      for (const { geometry: g } of meshes)
        if (!g.getAttribute(name))
          g.setAttribute(
            name,
            new THREE.BufferAttribute(new Float32Array(g.getAttribute('position').count * size).fill(name === 'uv' ? 0 : 1), size),
          );
    }
    const geometry = mergeGeometries(
      meshes.map((m) => m.geometry),
      true,
    );
    mesh = new THREE.Mesh(
      geometry,
      meshes.map((m) => m.material),
    );
  }
  mesh.name = name;
  return mesh;
}
