import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/** low ruins (room outlines) */
export default defineModel({
  type: 'ruins',
  label: 'Ruinas (muros bajos de cuartos)',
  params: { rooms: [] },
  build(p) {
    const k = new ModelKit();
    for (const [x, z, w, d] of p.rooms) {
      const t = 0.7,
        h = 0.9 + ((x * 7 + z * 3) & 3) * 0.25;
      k.box('rockwall', w, h, t, x, -0.3, z - d / 2);
      k.box('rockwall', w, h * 0.8, t, x, -0.3, z + d / 2);
      k.box('rockwall', t, h, d, x - w / 2, -0.3, z);
      k.box('rockwall', t, h * 0.7, d * 0.55, x + w / 2, -0.3, z - d * 0.2);
      k.box('stone', w - 1.4, 0.25, d - 1.4, x, -0.15, z);
    }
    return { object: k.build() };
  },
});
