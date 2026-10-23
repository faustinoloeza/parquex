import * as THREE from 'three';
import { TREE, TREE_STRIDE, decodeVegetation } from '#shared/formats/vegetation.js';
import { treeGeometries } from '../models/parts/trees.js';
import { swayMaterial } from '../graphics/shaders/sway.js';
import { releaseStatic } from '../graphics/memory.js';

/** Meters; trees are bucketed in chunks so close-up views get frustum culling. */
const CHUNK = 300;

/**
 * Every tree of the park (vegetation.bin) as instanced meshes, bucketed per
 * (chunk, type): chunks closer to the camera than the quality preset's LOD
 * distance use detailed trees, the others cheap ones; seen from afar the whole
 * park uses one cheap mesh per type (fewer draw calls).
 * @returns {import('./index.js').Layer & { count: number }}
 */
export function createVegetationLayer({ buffer }) {
  const data = decodeVegetation(buffer);
  const count = data.length / TREE_STRIDE;
  const time = { value: 0 };
  const defs = treeGeometries();
  for (const d of Object.values(defs)) d.material = swayMaterial(time, { side: d.side ?? THREE.FrontSide });

  // bucket instances per (chunk, type) and per type
  const buckets = new Map();
  const all = new Map();
  for (let i = 0; i < count; i++) {
    const o = i * TREE_STRIDE,
      type = data[o + 5];
    if (!defs[type]) continue;
    const key = `${Math.floor(data[o] / CHUNK)},${Math.floor(data[o + 2] / CHUNK)},${type}`;
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key).push(i);
    if (!all.has(type)) all.set(type, []);
    all.get(type).push(i);
  }

  const fill = (mesh, indices) => {
    fillTrees(mesh, data, indices);
    mesh.receiveShadow = true;
  };

  // per (chunk, type): a detailed and a cheap mesh sharing the same instance
  // buffers; each chunk picks one from its own distance to the camera
  const near = new THREE.Group(),
    far = new THREE.Group();
  near.name = 'vegetation:chunks';
  far.name = 'vegetation:far';
  const chunks = [];
  for (const [key, indices] of buckets) {
    const type = +key.split(',')[2];
    const hi = new THREE.InstancedMesh(defs[type].hi, defs[type].material, indices.length);
    fill(hi, indices);
    const lo = new THREE.InstancedMesh(defs[type].lo, defs[type].material, indices.length);
    lo.instanceMatrix = hi.instanceMatrix;
    lo.instanceColor = hi.instanceColor;
    lo.boundingSphere = hi.boundingSphere;
    lo.receiveShadow = true;
    lo.visible = false;
    const box = new THREE.Box3();
    for (const i of indices)
      box.expandByPoint(new THREE.Vector3(data[i * TREE_STRIDE], data[i * TREE_STRIDE + 1], data[i * TREE_STRIDE + 2]));
    box.max.y += 12;
    near.add(hi, lo);
    chunks.push({ hi, lo, box });
  }
  // the whole park seen from afar: one cheap mesh per type
  for (const [type, indices] of all) {
    const mesh = new THREE.InstancedMesh(defs[type].lo, defs[type].material, indices.length);
    fill(mesh, indices);
    far.add(mesh);
  }
  const object = new THREE.Group();
  object.name = 'vegetation';
  object.add(releaseStatic(near), releaseStatic(far));
  far.visible = false;

  let lodDistance = 420;
  const closest = new THREE.Vector3();
  return {
    name: 'vegetation',
    object,
    count,
    setQuality(preset) {
      lodDistance = preset.lod;
    },
    update({ t, distance, camera }) {
      time.value = t;
      const useFar = distance > lodDistance * 1.6;
      near.visible = !useFar;
      far.visible = useFar;
      if (useFar) return;
      const eye = camera.position;
      for (const c of chunks) {
        const detailed = c.box.clampPoint(eye, closest).distanceTo(eye) < lodDistance;
        c.hi.visible = detailed;
        c.lo.visible = !detailed;
      }
    },
  };
}

const m = new THREE.Matrix4(),
  q = new THREE.Quaternion(),
  s = new THREE.Vector3(),
  p = new THREE.Vector3();
const up = new THREE.Vector3(0, 1, 0);
const tint = new THREE.Color();

/**
 * Writes the matrices and tints of some trees into an InstancedMesh (one
 * instance per index, in order) and computes its bounds.
 * @param {THREE.InstancedMesh} mesh
 * @param {Float32Array} data    decoded vegetation.bin
 * @param {ArrayLike<number>} indices  tree indices
 * @param {{ scale?: Record<number, number>, tint?: Record<number, THREE.Color> }} [byType]
 *        extra scale / color per tree type (another type's geometry drawn in its place)
 */
export function fillTrees(mesh, data, indices, byType = {}) {
  for (let k = 0; k < indices.length; k++) {
    const i = indices[k],
      o = i * TREE_STRIDE,
      type = data[o + 5],
      sc = data[o + 3] * (byType.scale?.[type] ?? 1);
    p.set(data[o], data[o + 1] - 0.15, data[o + 2]);
    q.setFromAxisAngle(up, data[o + 4]);
    // palms vary in height a bit more than in width
    s.set(sc, type === TREE.PALM ? sc * (0.9 + ((i * 7919) % 100) / 400) : sc, sc);
    mesh.setMatrixAt(k, m.compose(p, q, s));
    // subtle per-tree brightness/hue variation
    const v = 0.86 + (((i * 2654435761) % 1000) / 1000) * 0.28;
    tint.setRGB(v, v * (0.97 + ((i * 97) % 10) / 160), v * 0.95);
    if (byType.tint?.[type]) tint.multiply(byType.tint[type]);
    mesh.setColorAt(k, tint);
  }
  mesh.instanceMatrix.needsUpdate = true;
  mesh.instanceColor.needsUpdate = true;
  mesh.computeBoundingSphere();
}
