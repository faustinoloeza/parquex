import * as THREE from 'three';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/** concrete walkways over the dolphin pools */
export default defineModel({
  type: 'walkways',
  label: 'Andadores sobre el agua',
  params: { width: 1.8, lines: [] },
  // route lines may snap onto the walkways (lines are absolute coordinates)
  walkable: (p) => p.lines.map((line) => ({ line, width: p.width })),
  build(p) {
    const k = new ModelKit();
    const w = p.width ?? 1.8;
    for (const line of p.lines) {
      for (let i = 1; i < line.length; i++) {
        const [x0, z0] = line[i - 1],
          [x1, z1] = line[i];
        const len = Math.hypot(x1 - x0, z1 - z0);
        const g = new THREE.BoxGeometry(len + w * 0.6, 0.5, w);
        g.translate(0, 0.25, 0);
        k.add('concrete', g, (x0 + x1) / 2 - p.x, 0, (z0 + z1) / 2 - p.z, -Math.atan2(z1 - z0, x1 - x0));
        // low safety rail on one side
        const r = new THREE.BoxGeometry(len, 0.12, 0.12);
        const nx = -(z1 - z0) / len,
          nz = (x1 - x0) / len;
        k.add(
          'dark',
          r,
          (x0 + x1) / 2 - p.x + nx * (w / 2 - 0.1),
          1.1,
          (z0 + z1) / 2 - p.z + nz * (w / 2 - 0.1),
          -Math.atan2(z1 - z0, x1 - x0),
          false,
        );
        for (let j = 0; j <= Math.floor(len / 2.5); j++) {
          const t = j / Math.max(1, Math.floor(len / 2.5));
          k.box('dark', 0.08, 0.6, 0.08, x0 + (x1 - x0) * t - p.x + nx * (w / 2 - 0.1), 0.5, z0 + (z1 - z0) * t - p.z + nz * (w / 2 - 0.1));
        }
      }
    }
    return { object: k.build() };
  },
});
