import * as THREE from 'three';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/** Spacing (m) of the stone discs set in the friezes. */
const DISC_STEP = 0.52;

/**
 * Stone building straddling a path on the way to the Gran Tlachco (the
 * underpass of the «Bienvenida Prehispánica»): a low front body over round
 * pillars with a frieze of stone discs, and behind it a taller gallery of
 * pale limestone slabs with dark slits and torches, crowned by another disc
 * frieze. Layout from the official illustration (front body 20 × 8 m,
 * gallery 31 × 7.6 m), looks from Street View (2014).
 *
 * Local frame: the path runs along z through x = 0 (front body to the south,
 * +z; gallery to the north).
 */
export default defineModel({
  type: 'galleryBridge',
  label: 'Galería de antorchas sobre el camino',
  params: { length: 20, depth: 8, gallery: 31, galleryDepth: 7.6, opening: 9, clearance: 2.9 },
  build(p) {
    const k = new ModelKit();
    const { length: L, depth: D, gallery: G, galleryDepth: GD, opening: O, clearance: C } = p;
    const H = C + 0.7; // top of the front body (terrace)
    const zF = D / 2, // front (south) face
      zJ = -D / 2, // where the gallery starts
      zB = -D / 2 - GD; // back (north) face

    // ---------------------------------------------------- front body
    // abutments beside the path, round pillars across it
    for (const s of [-1, 1]) {
      const w = (L - O) / 2;
      k.box('limestone', w, H, D, s * (O / 2 + w / 2), 0, 0);
    }
    const pillars = [-O / 2 + 0.55, -O / 6, O / 6, O / 2 - 0.55];
    for (const x of pillars) k.cyl('limestone', 0.42, 0.46, C, x, 0, zF - 0.6, 10);
    k.box('stone', L + 0.3, H - C, D + 0.3, 0, C, 0); // beam all round
    k.box('paving', L + 0.1, 0.06, D + 0.1, 0, H, 0); // terrace
    discs(k, -L / 2 + 0.4, L / 2 - 0.4, C + (H - C) / 2, zF + 0.15, 1);

    // ---------------------------------------------------- gallery
    const zG = (zJ + zB) / 2;
    for (const s of [-1, 1]) {
      const w = (G - O) / 2;
      k.box('limestone', w, H, GD, s * (O / 2 + w / 2), 0, zG);
    }
    for (const z of [zJ, zB + 0.6]) for (const x of pillars) k.cyl('limestone', 0.42, 0.46, C, x, 0, z, 10);
    k.box('stone', G + 0.3, H - C, GD + 0.3, 0, C, zG);
    // upper storey: dark core behind rows of tall slabs with slits between them
    const S = 2.3; // slab height
    k.box('dark', G - 1.4, S, GD - 1.4, 0, H, zG);
    const n = Math.round((G - 1) / 1.35);
    const pitch = (G - 1) / n;
    for (const z of [zJ - 0.25, zB + 0.25]) {
      for (let i = 0; i < n; i++) k.box('wall', pitch - 0.38, S, 0.5, -G / 2 + 0.5 + (i + 0.5) * pitch, H, z);
    }
    for (const s of [-1, 1]) k.box('wall', 0.5, S, GD, s * (G / 2 - 0.25), H, zG);
    // crown: beam with discs, flat roof
    k.box('stone', G + 0.3, 0.6, GD + 0.3, 0, H + S, zG);
    k.box('limestone', G + 0.5, 0.2, GD + 0.5, 0, H + S + 0.6, zG);
    discs(k, -G / 2 + 0.4, G / 2 - 0.4, H + S + 0.3, zJ + 0.15, 1);
    discs(k, -G / 2 + 0.4, G / 2 - 0.4, H + S + 0.3, zB - 0.15, -1);
    // torches on every other slab, facing the path (lit at night)
    for (let i = 1; i < n; i += 2) {
      const x = -G / 2 + 0.5 + (i + 0.5) * pitch,
        z = zJ + 0.12;
      k.cyl('dark', 0.05, 0.06, 2.1, x, H + 0.3, z, 6);
      k.cyl('dark', 0.13, 0.07, 0.22, x, H + 2.4, z, 6);
      k.add('lamp', new THREE.ConeGeometry(0.1, 0.32, 6).translate(0, 0.16, 0), x, H + 2.62, z);
    }
    return { object: k.build() };
  },
});

/** Row of stone discs (pale rings with a dark center) on a south (+1) or north (−1) face at z. */
function discs(k, x0, x1, y, z, facing) {
  const n = Math.floor((x1 - x0) / DISC_STEP);
  const ring = new THREE.CylinderGeometry(0.21, 0.21, 0.12, 8).rotateX(Math.PI / 2);
  const hub = new THREE.CylinderGeometry(0.08, 0.08, 0.16, 6).rotateX(Math.PI / 2);
  for (let i = 0; i <= n; i++) {
    const x = x0 + ((x1 - x0) * i) / n;
    k.add('white', ring.clone(), x, y, z + facing * 0.06, 0, false);
    k.add('darkStone', hub.clone(), x, y, z + facing * 0.08, 0, false);
  }
}
