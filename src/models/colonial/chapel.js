import * as THREE from 'three';
import { hipRoof, m4, trianglesGeometry } from '../../graphics/geometry.js';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/**
 * Thatched roof over an apsidal plan (straight sides, hipped front, rounded
 * back), like a Maya house: eaves at y = 0 from z = zA (center of the apse)
 * to zF (front), ridge at `height` from zA to zR.
 */
function apsidalRoof(halfWidth, zA, zF, zR, height, segs = 10) {
  const tris = [];
  const inside = new THREE.Vector3(0, height * 0.3, (zA + zR) / 2);
  const ab = new THREE.Vector3(),
    ac = new THREE.Vector3(),
    center = new THREE.Vector3();
  // triangles facing outwards (the roof is convex)
  const face = (a, b, c) => {
    ab.set(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    ac.set(c[0] - a[0], c[1] - a[1], c[2] - a[2]);
    center.set((a[0] + b[0] + c[0]) / 3, (a[1] + b[1] + c[1]) / 3, (a[2] + b[2] + c[2]) / 3).sub(inside);
    tris.push(ab.cross(ac).dot(center) >= 0 ? [...a, ...b, ...c] : [...a, ...c, ...b]);
  };
  const w = halfWidth;
  const r0 = [0, height, zA],
    r1 = [0, height, zR];
  for (const s of [-1, 1]) {
    face([s * w, 0, zA], [s * w, 0, zF], r1);
    face([s * w, 0, zA], r1, r0);
  }
  face([w, 0, zF], [-w, 0, zF], r1);
  for (let i = 0; i < segs; i++) {
    const a0 = (i / segs) * Math.PI,
      a1 = ((i + 1) / segs) * Math.PI;
    face([Math.cos(a0) * w, 0, zA - Math.sin(a0) * w], [Math.cos(a1) * w, 0, zA - Math.sin(a1) * w], r0);
  }
  return trianglesGeometry(tris);
}

/** Capilla de Guadalupe: ochre walls with white trims and pilasters (as seen on site), tall bell tower */
function guadalupe() {
  const k = new ModelKit();
  const Wd = 8,
    Ln = 18,
    H = 7;
  k.box('ochre', Wd, H + 1, Ln, 0, -1, 0);
  k.addTransformed('tile', hipRoof(Ln, Wd, 3.2, 0.5), m4(0, H, 0, Math.PI / 2));
  // tall arched side windows and buttresses
  for (let i = 0; i < 4; i++) {
    const z = -Ln / 2 + 2.5 + i * ((Ln - 5) / 3);
    for (const sx of [-1, 1]) {
      k.box('window', 0.15, 2.6, 1.1, sx * (Wd / 2 + 0.02), 2.2, z);
      k.box('white', 0.6, H - 1, 0.7, sx * (Wd / 2 + 0.3), -1, z + (Ln - 5) / 6);
    }
  }
  // facade (towards +z)
  k.box('ochre', Wd + 1.2, H + 5, 1.2, 0, -1, Ln / 2);
  k.box('white', Wd + 1.4, 0.5, 1.4, 0, H + 4, Ln / 2);
  k.box('dark', 2.4, 4, 0.3, 0, 0, Ln / 2 + 0.6);
  k.box('white', 3.4, 0.4, 0.4, 0, 4.1, Ln / 2 + 0.6);
  // tall bell tower on the facade (official map): three tiers with arched
  // openings; ochre with white cornices and plinth like the chapel itself
  const fz = Ln / 2 + 0.4;
  k.box('white', Wd + 1.6, 1.2, 1.8, 0, -1, fz);
  let y = H + 4,
    w = 4.6;
  for (let tier = 0; tier < 3; tier++) {
    const th = 3.2 - tier * 0.3;
    k.box('ochre', w, th, 1.6, 0, y, fz);
    const arch = new THREE.CylinderGeometry(0.75 - tier * 0.08, 0.75 - tier * 0.08, 0.3, 12, 1, false, 0, Math.PI);
    arch.rotateX(Math.PI / 2);
    arch.rotateZ(Math.PI / 2);
    k.box('window', 1.5 - tier * 0.15, th * 0.45, 1.7, 0, y + th * 0.2, fz);
    k.add('window', arch, 0, y + th * 0.65, fz + 0.72, 0, false);
    k.cyl('bell', 0.32, 0.5, 0.75, 0, y + th * 0.25, fz, 10);
    k.box('white', w + 0.5, 0.3, 1.9, 0, y + th, fz);
    y += th + 0.3;
    w -= 0.9;
  }
  for (const x of [-Wd / 2 - 0.4, Wd / 2 + 0.4]) k.box('white', 0.6, H + 5, 1.4, x, -1, Ln / 2);
  // round window and pilasters on the facade
  const rose = new THREE.CircleGeometry(0.9, 16);
  k.add('glass', rose, 0, H + 1.6, Ln / 2 + 0.62, 0, false);
  // cross on top
  k.box('dark', 0.25, 2.2, 0.25, 0, H + 13.5, Ln / 2 + 0.4);
  k.box('dark', 1.2, 0.25, 0.25, 0, H + 14.9, Ln / 2 + 0.4);
  return k;
}

/**
 * Capilla de San Francisco de Asís (satellite and official map): a white
 * front block with a bell gable (espadaña: two bells, one more on top) and a
 * long nave under a thatched roof with a rounded apse at the back.
 */
function sanFrancisco({ length: T, width: Wn, facade: F }) {
  const k = new ModelKit();
  const D = 6, // depth of the white front block
    front = T / 2,
    back = -T / 2,
    zF = front - D, // where the nave meets the front block
    zA = back + Wn / 2, // center of the apse
    eave = 3.2;
  // nave: white walls, straight part and half-round apse
  k.box('white', Wn, eave + 1, zF - zA, 0, -1, (zF + zA) / 2);
  const apse = new THREE.CylinderGeometry(Wn / 2, Wn / 2, eave + 1, 16, 1, false, Math.PI / 2, Math.PI);
  apse.translate(0, (eave + 1) / 2, 0);
  k.add('white', apse, 0, -1, zA);
  for (let i = 0; i < 3; i++) {
    const z = zA + 2 + i * ((zF - zA - 3) / 2);
    for (const sx of [-1, 1]) k.box('window', 0.15, 1.6, 0.9, sx * (Wn / 2 + 0.02), 0.9, z);
  }
  // thatch with a steep pitch, hipped against the front block
  const hw = Wn / 2 + 0.9,
    rise = 5.2;
  k.add('thatch', apsidalRoof(hw, zA, zF + 0.3, zF - hw * 0.55, rise), 0, eave - 0.2, 0);
  k.cyl('thatchDark', 0.35, 0.35, 0.3, 0, eave + rise - 0.25, zA, 6);

  // white front block with a flat roof
  k.box('white', F, 4.4, D, 0, -1, front - D / 2);
  k.box('white', F + 0.3, 0.3, D + 0.3, 0, 3.4, front - D / 2);
  // bell gable on the front: wide body, a tier with two bells, a crowned top
  const gz = front - 0.45,
    t = 0.9;
  k.box('white', F, 3.4, t, 0, 3.4, gz);
  k.box('white', F * 0.62, 2.7, t, 0, 6.8, gz);
  k.box('white', F * 0.28, 2.2, t, 0, 9.5, gz);
  const crown = new THREE.CylinderGeometry(F * 0.14, F * 0.14, t, 16, 1, false, Math.PI / 2, Math.PI);
  crown.rotateX(Math.PI / 2);
  k.add('white', crown, 0, 11.7, gz, 0, true);
  for (const [x, y] of [
    [-F * 0.16, 7.3],
    [F * 0.16, 7.3],
    [0, 10],
  ]) {
    k.box('window', 1.1, 1.5, t + 0.1, x, y, gz);
    const arch = new THREE.CylinderGeometry(0.55, 0.55, t + 0.1, 12, 1, false, Math.PI / 2, Math.PI);
    arch.rotateX(Math.PI / 2);
    k.add('window', arch, x, y + 1.5, gz, 0, false);
    k.cyl('bell', 0.28, 0.42, 0.65, x, y + 0.55, gz, 10);
  }
  // door and cross
  k.box('dark', 2.2, 3, 0.2, 0, 0, front + 0.02);
  k.box('dark', 0.22, 1.8, 0.22, 0, 12.9, gz);
  k.box('dark', 1, 0.22, 0.22, 0, 14, gz);
  return k;
}

/** Chapels */
export default defineModel({
  type: 'chapel',
  label: 'Capilla',
  // San Francisco: overall length (front block + nave + apse), nave width and front width
  params: { variant: 'sanfrancisco', length: 29, width: 10, facade: 12.5 },
  footprint: (p) => ({ rect: p.variant === 'guadalupe' ? [9.5, 20] : [p.facade + 0.5, p.length + 1] }),
  build(p) {
    const k = p.variant === 'guadalupe' ? guadalupe() : sanFrancisco(p);
    return { object: k.build() };
  },
});
