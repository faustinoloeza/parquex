import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/** small altar */
export default defineModel({
  type: 'altar',
  label: 'Altar',
  params: {},
  footprint: () => ({ rect: [5, 5] }),
  build(p) {
    const k = new ModelKit();
    k.box('rockwall', 5, 0.8, 5, 0, -0.3, 0);
    k.box('rockwall', 3.6, 1.4, 3.6, 0, 0.5, 0);
    k.box('darkStone', 3.9, 0.3, 3.9, 0, 1.9, 0);
    for (const [dx, dz] of [
      [0, 2.6],
      [0, -2.6],
      [2.6, 0],
      [-2.6, 0],
    ])
      k.box('rockwall', 1.4, 0.4, 1, dx, -0.3, dz, dx ? Math.PI / 2 : 0);
    return { object: k.build() };
  },
});
