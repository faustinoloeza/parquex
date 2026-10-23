import * as THREE from 'three';
import { annularSector, extrudeWithHoles } from '../../graphics/geometry.js';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/**
 * Ticket offices of Xcaret (Street View): a long single-storey wall of rubble
 * stone curved as a half moon, with the ticket windows in niches on its
 * concave side (facing the arriving visitors) and a light flat roof. In the
 * middle, a covered entrance `passage` m wide: a portal of heavy dark wooden
 * posts on stone plinths, beams and a roof of thin sticks, with a frieze of
 * stone discs over the front, and the steel turnstiles underneath.
 * The origin is the center of the curve; radii r0 < r1 and angles a0 < a1
 * (radians, 0 = +x, π/2 = +z) bound the building. `passageAt` is the angle
 * of the portal (default: the middle); `joints` are angles where a stone
 * pilaster marks where one section of the building meets the next.
 */
export default defineModel({
  type: 'crescentTickets',
  label: 'Taquillas en media luna',
  params: { r0: 8.5, r1: 12.5, a0: -0.1, a1: 1.75, height: 3.8, passage: 0, passageAt: null, joints: [] },
  clearPaths: (p) => {
    const n = 8,
      r = (p.r0 + p.r1) / 2,
      pts = [];
    for (let i = 0; i <= n; i++) {
      const a = p.a0 + ((p.a1 - p.a0) * i) / n;
      pts.push([p.x + Math.cos(a) * r, p.z + Math.sin(a) * r]);
    }
    const am = p.passageAt ?? (p.a0 + p.a1) / 2;
    const portal = [p.r0 - 5, p.r1].map((u) => [p.x + Math.cos(am) * u, p.z + Math.sin(am) * u]);
    return [
      { pts, width: p.r1 - p.r0 + 2 },
      { pts: portal, width: p.passage + 2 },
    ];
  },
  build(p) {
    const k = new ModelKit();
    const { r0, r1, a0, a1, height: H, passage } = p;
    const am = p.passageAt ?? (a0 + a1) / 2,
      rm = (r0 + r1) / 2,
      gap = passage / 2 / rm; // half the passage, as an angle
    const rw = r0 + 0.6; // concave face of the wall (the roof overhangs it)

    // curved stone wings and their light flat roof with a stone cornice
    const wings =
      gap > 0
        ? [
            [a0, am - gap],
            [am + gap, a1],
          ]
        : [[a0, a1]];
    for (const [w0, w1] of wings) {
      k.add('limestone', extrudeWithHoles(annularSector(rw, r1, w0, w1), [], H + 0.6), 0, -0.6, 0);
      k.add('concrete', extrudeWithHoles(annularSector(r0, r1 + 0.2, w0, w1), [], 0.3), 0, H, 0);
      k.add('stone', extrudeWithHoles(annularSector(r0 - 0.05, r0 + 0.35, w0, w1), [], 0.45), 0, H - 0.25, 0);
    }

    // ticket windows in niches along the concave face
    const ry = (a) => -a - Math.PI / 2; // box x along the curve, z towards the concave side
    const along = (a, r) => [Math.cos(a) * r, Math.sin(a) * r];
    // stone pilasters where one section meets the next, a little taller
    for (const j of p.joints) {
      const [x, z] = along(j, (rw + r1) / 2 - 0.15);
      k.box('limestone', 1.1, H + 1.4, r1 - rw + 0.9, x, -0.6, z, ry(j));
      k.box('stone', 1.4, 0.3, r1 - rw + 1.2, x, H + 0.8, z, ry(j));
    }
    for (const [w0, w1] of wings) {
      const n = Math.max(1, Math.floor(((w1 - w0) * rw) / 3.2));
      for (let i = 0; i < n; i++) {
        const a = w0 + ((w1 - w0) * (i + 0.5)) / n;
        if (p.joints.some((j) => Math.abs(a - j) * rw < 1.5)) continue; // behind a pilaster
        const [x, z] = along(a, rw - 0.05);
        const [lx, lz] = along(a, rw - 0.2);
        const [cx, cz] = along(a, rw - 0.35);
        k.box('dark', 1.7, 2.3, 0.12, x, 0, z, ry(a));
        k.box('window', 1.3, 0.9, 0.14, x, 1.25, z, ry(a));
        k.box('stone', 2.2, 0.35, 0.4, lx, 2.3, lz, ry(a)); // lintel
        k.box('wood', 1.6, 0.1, 0.5, cx, 1.05, cz, ry(a)); // counter
      }
    }

    if (gap > 0) {
      // entrance portal, in a frame u (radial, into the park) × v (along the wall)
      const at = (u, v) => [Math.cos(am) * u - Math.sin(am) * v, Math.sin(am) * u + Math.cos(am) * v];
      const box = (m, wu, h, dv, u, y, v) => {
        const [x, z] = at(u, v);
        k.box(m, wu, h, dv, x, y, z, -am);
      };
      const W = passage + 1.2,
        u0 = rw - 5.5, // front, towards the arriving visitors
        u1 = r1 + 0.4,
        Hp = H; // top of the posts
      const rows = [u0 + 0.4, u1 - 0.4],
        cols = [-W / 2 + 0.3, 0, W / 2 - 0.3];
      for (const u of rows)
        for (const v of cols) {
          box('limestone', 1.1, 1.2, 1.1, u, -0.4, v); // plinth
          box('weatheredWood', 0.6, Hp - 0.8, 0.6, u, 0.8, v); // post
        }
      // beams and a roof of thin sticks
      for (const u of rows) box('weatheredWood', 0.55, 0.55, W + 0.6, u, Hp, 0);
      for (const v of cols) box('weatheredWood', u1 - u0, 0.5, 0.45, (u0 + u1) / 2, Hp, v);
      for (let u = u0 + 0.2; u < u1 - 0.1; u += 0.32) box('wood', 0.2, 0.1, W + 0.4, u, Hp + 0.55, 0);
      // front frieze: dark beam, a row of stone discs, beam and stone slab
      box('weatheredWood', 0.6, 0.4, W + 0.8, u0 + 0.2, Hp + 0.55, 0);
      const discs = Math.floor((W + 0.6) / 0.85);
      for (let i = 0; i < discs; i++) {
        const v = -((discs - 1) * 0.85) / 2 + i * 0.85;
        const [x, z] = at(u0 + 0.15, v);
        k.add('concrete', new THREE.CylinderGeometry(0.38, 0.38, 0.4, 14).rotateZ(Math.PI / 2), x, Hp + 1.37, z, -am);
        const [hx, hz] = at(u0 - 0.07, v);
        k.add('dark', new THREE.CylinderGeometry(0.12, 0.12, 0.05, 8).rotateZ(Math.PI / 2), hx, Hp + 1.37, hz, -am);
      }
      box('weatheredWood', 0.7, 0.35, W + 1, u0 + 0.2, Hp + 1.8, 0);
      box('stone', 1.2, 0.3, W + 1.4, u0 + 0.3, Hp + 2.15, 0);

      // turnstiles in two groups on the wall line, a stone partition between them
      const ut = rw + 0.6;
      box('limestone', 2.6, 1.1, 0.6, ut, -0.3, 0);
      const n = Math.max(1, Math.floor((passage / 2 - 0.8) / 0.9));
      for (const s of [-1, 1]) {
        for (let i = 0; i < n; i++) box('steel', 0.9, 1.05, 0.25, ut, 0, s * (0.9 + i * 0.9));
        // hanging sign with white arrows
        box('wood', 0.08, 0.75, passage / 2 - 0.6, u0 + 1.6, 3.1, s * (passage / 4));
        for (let i = 0; i < 3; i++) box('white', 0.1, 0.35, 0.3, u0 + 1.55, 3.3, s * (passage / 4) + (i - 1) * 0.9);
      }
    }
    return { object: k.build() };
  },
});
