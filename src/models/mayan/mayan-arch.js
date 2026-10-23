import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/** Puuc arch (Labná) */
export default defineModel({
  type: 'mayanArch',
  label: 'Arco maya (Labná)',
  build() {
    const k = new ModelKit();
    const W = 16,
      D = 6,
      H = 8;
    // two wings with a corbelled passage between them
    const wing = (W - 3.2) / 2;
    for (const sx of [-1, 1]) {
      k.box('limestone', wing, H, D, sx * (1.6 + wing / 2), -0.5, 0);
      // latticework panels and columns of the Puuc frieze
      for (let i = 0; i < 3; i++) k.box('darkStone', 0.5, 2.2, 0.2, sx * (2.4 + (i * (wing - 1.4)) / 2), H * 0.45, D / 2 + 0.05);
    }
    // corbel arch: stepped blocks narrowing to the top
    for (let i = 0; i < 4; i++) k.box('limestone', 3.2 - i * 0.75, 0.9, D, 0, H - 3.4 + i * 0.85, 0);
    k.box('stone', W + 0.6, 0.6, D + 0.6, 0, H - 0.5, 0);
    k.box('stone', W + 0.3, 0.45, D + 0.3, 0, H * 0.38, 0);
    // roof comb
    k.box('limestone', W * 0.55, 2.2, 0.8, 0, H + 0.1, 0);
    for (let i = 0; i < 5; i++) k.box('dark', 0.6, 0.9, 0.9, -W * 0.22 + i * W * 0.11, H + 0.8, 0);
    return { object: k.build() };
  },
});
