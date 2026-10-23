import * as THREE from 'three';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/**
 * Caracol (round stepped tower of Xcaret Plus, activity 8): tiers of pale
 * rubble masonry stepping back under stone ledges, each pierced by rows of
 * arched windows (a few large, many small) that show the warm-lit interior,
 * and arched doorways at ground level (visitors' photos, 2026).
 */
export default defineModel({
  type: 'caracol',
  label: 'Caracol (torre redonda escalonada)',
  params: { radius: 13 },
  footprint: (p) => ({ circle: p.radius + 2 }),
  build(p) {
    const k = new ModelKit();
    const R = p.radius;
    const tiers = [
      [R + 1.5, 2.6],
      [R - 1, 4.2],
      [R - 3.6, 3.6],
      [R - 6.2, 3.2],
    ];
    // arched opening facing +z (rectangle with a half-round head), centered on x, base at y = 0
    const arch = (w, h) => {
      const r = w / 2;
      const shape = new THREE.Shape()
        .moveTo(-r, 0)
        .lineTo(r, 0)
        .lineTo(r, h - r)
        .absarc(0, h - r, r, 0, Math.PI, false)
        .lineTo(-r, 0);
      return new THREE.ExtrudeGeometry(shape, { depth: 0.3, bevelEnabled: false, curveSegments: 6 }).translate(0, 0, -0.15);
    };
    const openings = (r, y, w, h, n, offset = 0) => {
      for (let j = 0; j < n; j++) {
        const a = ((j + offset) / n) * Math.PI * 2;
        k.add('court', arch(w, h), Math.cos(a) * (r + 0.05), y, Math.sin(a) * (r + 0.05), -a + Math.PI / 2, false);
      }
    };
    let y = -1;
    tiers.forEach(([r, h], i) => {
      k.cyl('limestone', r, r + 0.3, h, 0, y, 0, 32);
      k.cyl('limestone', r + 0.4, r + 0.4, 0.3, 0, y + h - 0.3, 0, 32); // ledge
      if (i === 0)
        openings(r + 0.3, y + 1, 1.6, 2.2, 6, 0.25); // doorways
      else {
        openings(r, y + 0.5, 1.1, 1.5, Math.round(r * 0.9), 0.5); // large arches
        openings(r, y + h - 1.35, 0.55, 0.8, Math.round(r * 2.6)); // small windows
      }
      y += h;
    });
    // spiral wall winding up to the center on the top (seen on satellite
    // imagery and on the official map), as short segments along the curve
    const rTop = R - 6.6,
      turns = 2.25,
      rise = 2.4;
    const end = turns * Math.PI * 2;
    for (let a = 0; a < end;) {
      const f = a / end,
        r = rTop - (rTop - 1.1) * f;
      const step = Math.min(0.9 / r, end - a);
      const am = a + step / 2;
      k.box('limestone', 0.55, 1.5, r * step + 0.12, Math.cos(am) * r, y + f * rise, Math.sin(am) * r, -am);
      a += step;
    }
    k.cyl('limestone', 1, 1.1, rise + 1.8, 0, y, 0, 12);
    // stair on the south side
    for (let s = 0; s < 8; s++) k.box('limestone', 4, 0.45 * (8 - s), 0.6, 0, -1, R + 4.5 - s * 0.6);
    return { object: k.build() };
  },
});
