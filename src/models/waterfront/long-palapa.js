import { hipRoof, m4 } from '../../graphics/geometry.js';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/** long thatched palapa (open sides) */
export default defineModel({
  type: 'longPalapa',
  label: 'Palapa alargada',
  params: { length: 28, width: 9 },
  footprint: (p) => ({ rect: [p.length + 1, p.width + 1] }),
  build(p) {
    const k = new ModelKit();
    const L = p.length,
      W = p.width,
      wall = 3.2;
    k.box('limestone', L + 1, 0.6, W + 1, 0, -0.3, 0);
    const nx = Math.round(L / 3.5);
    for (let i = 0; i <= nx; i++) for (const sz of [-1, 1]) k.cyl('wood', 0.18, 0.22, wall, -L / 2 + (i / nx) * L, 0.3, (sz * W) / 2, 6);
    k.addTransformed('thatch', hipRoof(L, W, W * 0.55, 0.9), m4(0, wall + 0.3, 0));
    for (let i = 0; i < Math.floor(L / 4); i++) k.box('wood', 1.6, 0.08, 0.8, -L / 2 + 2 + i * 4, 1.1, 0);
    return { object: k.build() };
  },
});
