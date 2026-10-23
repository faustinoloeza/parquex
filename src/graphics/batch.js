import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

// Normalizes attributes so geometries can be merged together.
export function prepareForMerge(g) {
  const out = g.index ? g.toNonIndexed() : g;
  if (!out.getAttribute('uv'))
    out.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(out.getAttribute('position').count * 2), 2));
  if (!out.getAttribute('normal')) out.computeVertexNormals();
  for (const name of Object.keys(out.attributes)) if (!['position', 'normal', 'uv', 'color'].includes(name)) out.deleteAttribute(name);
  return out;
}

// Collects geometries per material key and merges them into single meshes.
export class GeometryBatch {
  constructor() {
    this.parts = new Map();
  }

  /** Queues a geometry (optionally transformed) under a material key. */
  add(key, geometry, matrix) {
    const g = prepareForMerge(geometry);
    if (matrix) g.applyMatrix4(matrix);
    if (!this.parts.has(key)) this.parts.set(key, []);
    this.parts.get(key).push(g);
  }
  /**
   * One mesh per material key.
   * @param {Record<string, THREE.Material>} materials key → material
   */
  build(materials, { castShadow = true, receiveShadow = true } = {}) {
    const group = new THREE.Group();
    for (const [key, list] of this.parts) {
      const withColor = list.some((g) => g.getAttribute('color'));
      if (withColor)
        for (const g of list)
          if (!g.getAttribute('color')) {
            const c = new Float32Array(g.getAttribute('position').count * 3).fill(1);
            g.setAttribute('color', new THREE.BufferAttribute(c, 3));
          }
      const merged = mergeGeometries(list, false);
      const material = materials[key];
      if (!material) throw new Error(`Unknown material "${key}"`);
      const mesh = new THREE.Mesh(merged, material);
      mesh.castShadow = castShadow;
      mesh.receiveShadow = receiveShadow;
      mesh.name = `batch:${key}`;
      group.add(mesh);
    }
    return group;
  }
}
