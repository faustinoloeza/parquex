import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { nonIndexed } from '../../graphics/geometry.js';
import { TREE } from '#shared/formats/vegetation.js';

// Tree models of the vegetation layer: one detailed geometry (near) and one
// cheap stand-in (far) per tree type, all with per-vertex colors.

const col = (hex) => new THREE.Color(hex);

function paint(g, fn) {
  const pos = g.getAttribute('position');
  const c = new Float32Array(pos.count * 3);
  const tmp = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    fn(tmp, pos.getX(i), pos.getY(i), pos.getZ(i));
    c[i * 3] = tmp.r;
    c[i * 3 + 1] = tmp.g;
    c[i * 3 + 2] = tmp.b;
  }
  g.setAttribute('color', new THREE.BufferAttribute(c, 3));
  return g;
}

// Low-poly blob whose normals point away from `center`, so the canopy shades
// like a soft sphere (the look of the illustrated map).
function blob(radius, x, y, z, sy = 1, center = [x, y, z], detail = 0) {
  const g = nonIndexed(new THREE.IcosahedronGeometry(radius, detail));
  g.scale(1, sy, 1);
  g.translate(x, y, z);
  const pos = g.getAttribute('position');
  const nrm = g.getAttribute('normal');
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.set(pos.getX(i) - center[0], (pos.getY(i) - center[1]) * 1.2, pos.getZ(i) - center[2]).normalize();
    nrm.setXYZ(i, v.x, v.y, v.z);
  }
  return g;
}

function trunk(r0, r1, h, color, segs = 5) {
  const g = nonIndexed(new THREE.CylinderGeometry(r1, r0, h, segs, 1, true));
  g.translate(0, h / 2, 0);
  return paint(g, (c) => c.copy(color));
}

// Soft top-light / bottom-dark gradient (smoothstep) with a darker underside
// (cheap ambient occlusion where the crown meets the trunk), for a rounded,
// clean look.
function canopy(blobs, dark, light, yMin, yMax, center) {
  const parts = blobs.map(([r, x, y, z, sy]) => blob(r, x, y, z, sy ?? 1, center));
  const g = mergeGeometries(parts);
  return paint(g, (c, x, y) => {
    const t = THREE.MathUtils.clamp((y - yMin) / (yMax - yMin), 0, 1);
    c.copy(dark).lerp(light, 0.12 + 0.88 * t * t * (3 - 2 * t));
    c.multiplyScalar(0.8 + 0.2 * Math.min(1, t * 3)); // occlusion under the crown
  });
}

function broadleaf(dark, light) {
  const c = [0, 6.2, 0];
  return mergeGeometries([
    trunk(0.32, 0.22, 4.2, col('#7a5a3e')),
    canopy(
      [
        [3.0, 0, 6.4, 0, 0.85],
        [2.2, 1.9, 5.4, 0.6, 0.85],
        [2.1, -1.6, 5.6, -0.9, 0.85],
        [1.9, 0.2, 7.9, -0.3, 0.85],
      ],
      dark,
      light,
      3.4,
      9.2,
      c,
    ),
  ]);
}

function bush() {
  const c = [0, 1.5, 0];
  return canopy(
    [
      [1.7, 0, 1.4, 0, 0.8],
      [1.2, 1.1, 1.1, 0.4, 0.8],
    ],
    col('#3c6b2a'),
    col('#94c75c'),
    0,
    2.8,
    c,
  );
}

function ceiba() {
  const c = [0, 11, 0];
  return mergeGeometries([
    trunk(0.6, 0.35, 10.5, col('#86765f')),
    canopy(
      [
        [4.2, 0, 11.2, 0, 0.45],
        [3.2, 3.0, 10.6, 1, 0.45],
        [3.0, -2.8, 10.8, -1.4, 0.45],
        [2.8, 0.4, 12.2, 2.4, 0.45],
      ],
      col('#3b6a2b'),
      col('#9ccb64'),
      9,
      13.5,
      c,
    ),
  ]);
}

function palm() {
  const parts = [];
  // gently curved trunk
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.25, 3, 0),
    new THREE.Vector3(0.75, 6, 0),
    new THREE.Vector3(1.4, 8.6, 0),
  ]);
  const tg = nonIndexed(new THREE.TubeGeometry(curve, 5, 0.2, 5, false));
  parts.push(paint(tg, (c) => c.set('#94805f')));
  const top = new THREE.Vector3(1.4, 8.6, 0);
  const frondCount = 8;
  for (let f = 0; f < frondCount; f++) {
    const a = (f / frondCount) * Math.PI * 2 + (f % 2) * 0.2;
    const dir = new THREE.Vector3(Math.cos(a), 0, Math.sin(a));
    const side = new THREE.Vector3(-dir.z, 0, dir.x);
    const len = 3.6 + (f % 3) * 0.4;
    const segs = 4;
    const tris = [];
    const pts = [];
    for (let s = 0; s <= segs; s++) {
      const t = s / segs;
      const p = top.clone().addScaledVector(dir, len * t);
      p.y += Math.sin(t * Math.PI * 0.7) * 1.0 - t * t * 2.6;
      const w = Math.sin(t * Math.PI) * 0.75 + 0.05;
      pts.push([p.clone().addScaledVector(side, w), p.clone().addScaledVector(side, -w), p.clone()]);
    }
    for (let s = 0; s < segs; s++) {
      const [a0, b0, m0] = pts[s],
        [a1, b1, m1] = pts[s + 1];
      // slight V shape: center line raised
      m0.y += 0.12;
      m1.y += 0.12;
      tris.push(a0, m0, a1, m0, m1, a1, m0, b0, m1, b0, b1, m1);
    }
    const g = new THREE.BufferGeometry().setFromPoints(tris);
    g.computeVertexNormals();
    // bias normals upward so fronds read bright from the air
    const n = g.getAttribute('normal');
    for (let i = 0; i < n.count; i++) {
      const v = new THREE.Vector3(n.getX(i), Math.abs(n.getY(i)) + 0.8, n.getZ(i)).normalize();
      n.setXYZ(i, v.x, v.y, v.z);
    }
    g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(n.count * 2), 2));
    parts.push(paint(g, (c, x, y) => c.set('#4a8f36').lerp(col('#a8d86c'), THREE.MathUtils.clamp((y - 6.5) / 3, 0, 1))));
  }
  for (const p of parts)
    if (!p.getAttribute('uv')) p.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(p.getAttribute('position').count * 2), 2));
  return mergeGeometries(
    parts.map((p) => {
      for (const k of Object.keys(p.attributes)) if (!['position', 'normal', 'color', 'uv'].includes(k)) p.deleteAttribute(k);
      return p;
    }),
  );
}

// Cheap stand-ins used when the camera is far away.
function lowBroadleaf(dark, light) {
  return canopy([[3.4, 0, 6.2, 0, 0.8]], dark, light, 3.4, 9.2, [0, 6.2, 0]);
}
function lowPalm() {
  const tris = [];
  const top = new THREE.Vector3(1.4, 8.4, 0);
  for (let f = 0; f < 6; f++) {
    const a = (f / 6) * Math.PI * 2;
    const dir = new THREE.Vector3(Math.cos(a), 0, Math.sin(a));
    const side = new THREE.Vector3(-dir.z, 0, dir.x).multiplyScalar(0.7);
    const tip = top.clone().addScaledVector(dir, 3.8);
    tip.y -= 1.6;
    const mid = top.clone().addScaledVector(dir, 1.9);
    mid.y += 0.3;
    tris.push(top, mid.clone().add(side), tip, top, tip, mid.clone().sub(side));
  }
  const g = new THREE.BufferGeometry().setFromPoints(tris);
  g.computeVertexNormals();
  const n = g.getAttribute('normal');
  for (let i = 0; i < n.count; i++) n.setXYZ(i, 0, 1, 0);
  g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(n.count * 2), 2));
  return paint(g, (c, x, y) => c.set('#4a8f36').lerp(col('#a8d86c'), THREE.MathUtils.clamp((y - 6.5) / 3, 0, 1)));
}

/** Crown colors [underside, top] of the broadleaf trees: soft fresh greens. */
const BROAD = [col('#38652d'), col('#80b752')];
const BROAD_LIGHT = [col('#477a33'), col('#9cca64')];

/** Geometries per tree type: { hi, lo, side? }. */
export function treeGeometries() {
  return {
    [TREE.BROAD]: { hi: broadleaf(BROAD[0], BROAD[1]), lo: lowBroadleaf(BROAD[0], BROAD[1]) },
    [TREE.BROAD_LIGHT]: { hi: broadleaf(BROAD_LIGHT[0], BROAD_LIGHT[1]), lo: lowBroadleaf(BROAD_LIGHT[0], BROAD_LIGHT[1]) },
    [TREE.BUSH]: { hi: bush(), lo: bush() },
    [TREE.PALM]: { hi: palm(), lo: lowPalm(), side: THREE.DoubleSide },
    [TREE.CEIBA]: { hi: ceiba(), lo: ceiba() },
  };
}

/**
 * A tree for a landmark model (`plastic` / `vertex` material, single-sided):
 * trees drawn double-sided by the vegetation layer (palm fronds) get a copy of
 * their triangles with reversed winding (same normals), so they also show in the merged
 * models and in the exported glTF (single-sided there).
 * @param {number} type TREE.* (shared/formats/vegetation.js)
 */
export function modelTreeGeometry(type) {
  const def = treeGeometries()[type];
  const g = def.hi.index ? def.hi.toNonIndexed() : def.hi;
  if (def.side !== THREE.DoubleSide) return g;
  const back = g.clone();
  for (const attribute of Object.values(back.attributes)) {
    const a = attribute.array,
      s = attribute.itemSize;
    for (let v = 0; v + 2 < attribute.count; v += 3) {
      const i = (v + 1) * s,
        j = (v + 2) * s;
      const tmp = a.slice(i, i + s);
      a.copyWithin(i, j, j + s);
      a.set(tmp, j);
    }
  }
  // normals kept: the fronds' are biased upwards on purpose (bright from the air)
  return mergeGeometries([g, back]);
}
