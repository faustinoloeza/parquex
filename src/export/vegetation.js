import * as THREE from 'three';
import { TREE, TREE_STRIDE, decodeVegetation } from '#shared/formats/vegetation.js';
import { createVegetationLayer } from '../layers/vegetation.js';
import { exportMaterial } from './materials.js';
import { MaterialMerger } from './merge.js';

/** Meters per side of the merged tree chunks (TREES.MERGED), for culling on the device. */
const MERGE_CHUNK = 350;

/**
 * How trees are written:
 *  - INSTANCED: one InstancedMesh per tree type over the whole park, written
 *    with EXT_mesh_gpu_instancing (tiny file, 5 draw calls), without the
 *    per-tree tint (_COLOR_0 is a custom attribute viewers ignore). Needs a
 *    viewer that implements the extension.
 *  - MERGED: plain geometry, every tree baked in (tint included) and merged per
 *    chunk of MERGE_CHUNK meters: works in any glTF viewer, bigger file.
 *  - PROTOTYPES: one prototype per type (`proto:tree-<type>`, added to
 *    `instances`, see export/instances.js) and one record per tree (tint
 *    included), for the mobile app; the returned group is empty.
 */
export const TREES = { INSTANCED: 'instanced', MERGED: 'merged', PROTOTYPES: 'prototypes' };

/**
 * Factor baked into the tree prototypes' COLOR_0 (TREES.PROTOTYPES): the
 * per-tree tint of the vegetation layer goes up to 1.14 × 1.026 ≈ 1.17 and
 * an instances.bin tint byte stops at 1.
 */
export const TREE_TINT_SCALE = 1.17;

/** Name of a tree type in instances.bin and of its prototype node (`proto:tree-broad-light`…). */
export const treeTypeName = (type) =>
  `tree-${Object.keys(TREE)
    .find((k) => TREE[k] === type)
    .toLowerCase()
    .replace(/_/g, '-')}`;

/**
 * Trees of the park with their cheap geometry (`lo`, the app's far-away
 * stand-ins). Reuses the vegetation layer's "whole park" meshes (one
 * InstancedMesh per type) and swaps the wind-sway shader for a plain material.
 * @param {{ buffer: ArrayBuffer, mode?: string, instances?: import('./instances.js').InstanceSet }} options
 * @returns {{ object: THREE.Group, count: number, byType: Record<string, number> }} byType: trees per type name
 */
export function exportVegetation({ buffer, mode = TREES.INSTANCED, instances }) {
  const layer = createVegetationLayer({ buffer });
  const far = layer.object.getObjectByName('vegetation:far');
  const group = new THREE.Group();
  group.name = 'vegetation';
  // the layer creates its whole-park meshes in order of first appearance of each type
  const names = Object.fromEntries(Object.entries(TREE).map(([name, id]) => [id, name.toLowerCase()]));
  const data = decodeVegetation(buffer);
  const types = [];
  for (let o = 0; o < data.length; o += TREE_STRIDE) if (names[data[o + 5]] && !types.includes(data[o + 5])) types.push(data[o + 5]);
  const byType = {};
  far.children.forEach((mesh, i) => (byType[names[types[i]]] = mesh.count));
  if (mode === TREES.PROTOTYPES) {
    far.children.forEach((mesh, i) => instances.add(`tree-${names[types[i]].replace(/_/g, '-')}`, mesh, { tintScale: TREE_TINT_SCALE }));
  } else if (mode === TREES.MERGED) {
    const chunks = new Map();
    const m = new THREE.Matrix4(),
      p = new THREE.Vector3(),
      c = new THREE.Color();
    for (const mesh of far.children) {
      for (let i = 0; i < mesh.count; i++) {
        mesh.getMatrixAt(i, m);
        p.setFromMatrixPosition(m);
        const key = `${Math.floor(p.x / MERGE_CHUNK)},${Math.floor(p.z / MERGE_CHUNK)}`;
        if (!chunks.has(key)) chunks.set(key, new MaterialMerger());
        chunks.get(key).addGeometry(mesh.geometry, m, mesh.material, mesh.getColorAt(i, c));
      }
    }
    for (const [key, merger] of chunks) for (const mesh of merger.build(`trees:${key}`)) group.add(mesh);
  } else {
    far.children.forEach((mesh, i) => {
      const geometry = mesh.geometry.clone();
      geometry.deleteAttribute('uv');
      const material = exportMaterial(mesh.material);
      const out = new THREE.InstancedMesh(geometry, material, mesh.count);
      out.instanceMatrix.copy(mesh.instanceMatrix);
      out.name = `trees:${names[types[i]]}`;
      group.add(out);
    });
  }
  return { object: group, count: layer.count, byType };
}
