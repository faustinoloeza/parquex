import { trianglesGeometry } from '../../graphics/geometry.js';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/**
 * Xcaret Plus fan-shaped building: `blades` white wedges alternating with
 * lower `infill` wedges (thatch on the official map, brownish on satellite
 * imagery), with no gaps between them. `infill: false` leaves gaps.
 */
export default defineModel({
  type: 'fan',
  label: 'Edificio en abanico (Xcaret Plus)',
  params: { r0: 17, r1: 48, a0: -1.8, a1: 0.3, blades: 6, infill: 'thatch' },
  // no trees on the roofs: a band along the middle radius
  clearPaths: (p) => {
    const r = (p.r0 + p.r1) / 2,
      ry = p.rotation ?? 0,
      n = 12;
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const a = p.a0 + ((p.a1 - p.a0) * i) / n;
      const lx = Math.cos(a) * r,
        lz = Math.sin(a) * r;
      pts.push([p.x + lx * Math.cos(ry) + lz * Math.sin(ry), p.z - lx * Math.sin(ry) + lz * Math.cos(ry)]);
    }
    return [{ pts, width: p.r1 - p.r0 + 2 }];
  },
  build(p) {
    const k = new ModelKit();
    const { r0, r1, a0, a1, blades, infill } = p;
    const seg = 5;
    const P = (a, r, y) => [Math.cos(a) * r, y, Math.sin(a) * r];
    // reversed winding (faces seen from the other side)
    const flip = (tris) => tris.map((t) => [t[0], t[1], t[2], t[6], t[7], t[8], t[3], t[4], t[5]]);

    /** A wedge between angles s0 and s1 whose roof slopes up to the outside. */
    function wedge(s0, s1, h0, h1, roof) {
      const tris = [],
        wallTris = [];
      for (let i = 0; i < seg; i++) {
        const aa = s0 + ((s1 - s0) * i) / seg,
          ab = s0 + ((s1 - s0) * (i + 1)) / seg;
        // roof slopes upward to the outside (counter-clockwise from above)
        tris.push([...P(aa, r0, h0), ...P(ab, r0, h0), ...P(ab, r1, h1)], [...P(aa, r0, h0), ...P(ab, r1, h1), ...P(aa, r1, h1)]);
        // walls: outer glazed facade + inner facade
        wallTris.push([...P(aa, r1, -1), ...P(ab, r1, -1), ...P(ab, r1, h1)], [...P(aa, r1, -1), ...P(ab, r1, h1), ...P(aa, r1, h1)]);
        wallTris.push([...P(ab, r0, -1), ...P(aa, r0, -1), ...P(aa, r0, h0)], [...P(ab, r0, -1), ...P(aa, r0, h0), ...P(ab, r0, h0)]);
      }
      k.add(roof, trianglesGeometry(tris), 0, 0, 0, 0, true);
      k.add('glass', trianglesGeometry(flip(wallTris)), 0, 0, 0, 0, true);
      for (const [a, out] of [
        [s0, 1],
        [s1, -1],
      ]) {
        const side = [
          [...P(a, r0, -1), ...P(a, r1, -1), ...P(a, r1, h1)],
          [...P(a, r0, -1), ...P(a, r1, h1), ...P(a, r0, h0)],
        ];
        k.add('wall', trianglesGeometry(out < 0 ? side : flip(side)), 0, 0, 0, 0, true);
      }
    }

    if (infill) {
      // white wedges and infill wedges of equal width, white at both ends
      const span = (a1 - a0) / (blades * 2 - 1);
      for (let b = 0; b < blades * 2 - 1; b++) {
        const s0 = a0 + b * span;
        if (b % 2 === 0) wedge(s0, s0 + span, 4, 9.5, 'white');
        else wedge(s0, s0 + span, 3.2, 8, infill);
      }
    } else {
      const span = (a1 - a0) / blades;
      for (let b = 0; b < blades; b++) {
        const s0 = a0 + b * span + span * 0.08;
        wedge(s0, s0 + span * 0.84, 4, 9.5, 'white');
      }
    }
    return { object: k.build() };
  },
});
