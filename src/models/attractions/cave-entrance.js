import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/**
 * Entrance to the underground rivers (Xplor): a round pit with a low
 * rubble-stone parapet, a dark opening and, with `stairs`, a spiral staircase
 * going down along the wall (the round stairwells seen from above).
 */
export default defineModel({
  type: 'caveEntrance',
  label: 'Entrada a caverna (pozo con escalera)',
  params: { radius: 5, stairs: true },
  footprint: (p) => ({ circle: p.radius + 0.6 }),
  build(p) {
    const k = new ModelKit();
    const R = p.radius;
    // parapet (open ring) around a dark disc that reads as the shaft (the
    // terrain is not carved, so the opening is drawn just above the ground)
    k.cyl('rockwall', R + 0.5, R + 0.6, 1.1, 0, -0.2, 0, 20, true);
    k.cyl('rockwall', R, R, 1.1, 0, -0.2, 0, 20, true);
    k.cyl('limestone', R + 0.55, R + 0.55, 0.12, 0, 0.9, 0, 20, true);
    k.cyl('dark', R, R, 0.05, 0, 0.02, 0, 20);
    if (p.stairs) {
      for (let i = 0; i < 18; i++) {
        const a = (i / 18) * Math.PI * 1.6;
        k.box('limestone', 1.5, 0.25, 0.8, Math.cos(a) * (R - 0.9), 0.08 + (17 - i) * 0.045, Math.sin(a) * (R - 0.9), -a);
      }
    }
    return { object: k.build() };
  },
});
