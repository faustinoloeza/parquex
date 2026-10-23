import { extrudePolygon } from '../../graphics/geometry.js';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/** concrete dock (muelle) */
export default defineModel({
  type: 'dock',
  label: 'Muelle de concreto',
  params: { poly: [] },
  build(p) {
    const k = new ModelKit();
    k.add('pierStone', extrudePolygon(p.poly, 1.6), 0, -0.6, 0);
    // bollards along the edges
    for (let i = 0; i < p.poly.length; i++) {
      const [x0, z0] = p.poly[i],
        [x1, z1] = p.poly[(i + 1) % p.poly.length];
      const n = Math.floor(Math.hypot(x1 - x0, z1 - z0) / 6);
      for (let j = 1; j < n; j++) {
        const t = j / n,
          x = x0 + (x1 - x0) * t,
          z = z0 + (z1 - z0) * t;
        k.cyl('dark', 0.22, 0.28, 0.6, x + (x1 > x0 ? 0 : 0), 1, z, 8);
      }
    }
    return { object: k.build() };
  },
});
