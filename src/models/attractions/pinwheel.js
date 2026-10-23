import * as THREE from 'three';
import { ellipse, extrudeWithHoles, solidColor } from '../../graphics/geometry.js';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

const RAINBOW = [0xe63946, 0xf77f00, 0xfcbf49, 0x8ac926, 0x2a9d8f, 0x1982c4, 0x6a4c93, 0xe5579a];

/**
 * Rehilete (Xenses): white dome wrapped by colored blades curving around it like
 * a pinwheel, on a round plinth. The blades are tall at the dome and taper outwards.
 */
export default defineModel({
  type: 'pinwheel',
  label: 'Rehilete (domo con aspas de colores)',
  params: { radius: 15, height: 12, outer: 28, blades: 22, twist: 0.75 },
  footprint: (p) => ({ circle: p.outer }),
  build(p) {
    const k = new ModelKit();
    const { radius: r, height: h, outer } = p;
    // plinth and floor ring
    k.add('concrete', extrudeWithHoles(ellipse(outer + 0.5, outer + 0.5, 48), [], 0.5), 0, -0.3, 0);
    // dome (a squashed hemisphere) on a short drum
    k.cyl('white', r, r, 1.6, 0, 0.2, 0, 32, true);
    const dome = new THREE.SphereGeometry(1, 32, 9, 0, Math.PI * 2, 0, Math.PI / 2);
    dome.scale(r, h - 1.6, r);
    k.add('white', dome, 0, 1.8, 0);
    // blades: a spiral of thin slats (4 per blade), tall next to the dome
    const SEG = 4;
    for (let b = 0; b < p.blades; b++) {
      const a0 = (b / p.blades) * Math.PI * 2;
      const color = RAINBOW[b % RAINBOW.length];
      for (let s = 0; s < SEG; s++) {
        const t0 = s / SEG,
          t1 = (s + 1) / SEG;
        const r0 = r - 0.5 + (outer - r + 0.5) * t0,
          r1 = r - 0.5 + (outer - r + 0.5) * t1;
        const q0 = a0 + p.twist * t0,
          q1 = a0 + p.twist * t1;
        const x0 = Math.cos(q0) * r0,
          z0 = Math.sin(q0) * r0,
          x1 = Math.cos(q1) * r1,
          z1 = Math.sin(q1) * r1;
        const len = Math.hypot(x1 - x0, z1 - z0) + 0.15;
        const hh = h * 0.8 * (1 - 0.82 * (t0 + t1) * 0.5);
        const g = solidColor(new THREE.BoxGeometry(len, hh, 0.35).translate(0, hh / 2, 0), color);
        k.add('vertex', g, (x0 + x1) / 2, 0.2, (z0 + z1) / 2, -Math.atan2(z1 - z0, x1 - x0), false);
      }
    }
    return { object: k.build() };
  },
});
