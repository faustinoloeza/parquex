import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/** Mayan pyramids */
export default defineModel({
  type: 'pyramid',
  label: 'Pirámide maya escalonada',
  params: { size: 10, height: 6 },
  footprint: (p) => ({ rect: [p.size + 1, p.size + 3] }),
  build(p) {
    const k = new ModelKit();
    const S = p.size,
      H = p.height,
      tiers = 4;
    const th = H / tiers;
    for (let i = 0; i < tiers; i++) {
      const s = S * (1 - i * 0.17);
      k.box('rockwall', s, th + (i === 0 ? 1 : 0), s, 0, i * th - (i === 0 ? 1 : 0), 0);
      k.box('darkStone', s + 0.15, 0.25, s + 0.15, 0, (i + 1) * th - 0.35, 0);
    }
    const ts = S * 0.36;
    k.box('rockwall', ts, 2.4, ts, 0, H, 0);
    k.box('dark', ts * 0.3, 1.4, 0.2, 0, H, ts / 2);
    k.box('stone', ts + 0.6, 0.5, ts + 0.6, 0, H + 2.4, 0);
    // stairway on the south face
    const n = 12;
    for (let s = 0; s < n; s++) k.box('rockwall', S * 0.26, (H * (s + 1)) / n, 0.55, 0, 0, S / 2 + 1.2 - (s * (S / 2 + 1.2 - ts / 2)) / n);
    return { object: k.build() };
  },
});
