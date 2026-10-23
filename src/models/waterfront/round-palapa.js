import * as THREE from 'three';
import { frustum } from '../../graphics/geometry.js';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/** Palapa redonda escalonada; `oculus` (m) opens the top in a collar, as on the big central palapa */
export default defineModel({
  type: 'roundPalapa',
  label: 'Palapa redonda escalonada',
  params: { radius: 13, tiers: 3, oculus: 0 },
  footprint: (p) => ({ circle: p.radius + 1.5 }),
  build(p) {
    const k = new ModelKit();
    const R = p.radius,
      wall = 3.6;
    const segs = Math.max(18, Math.round(R * 2.4));
    // stone platform on the breakwater with steps
    k.cyl('limestone', R + 1.5, R + 2.2, 1.2, 0, -0.6, 0, segs);
    k.cyl('wood', R + 1.2, R + 1.2, 0.12, 0, 0.6, 0, segs);
    // two rings of posts and a central column
    for (const [rr, n] of [
      [R * 0.9, Math.round(R * 1.5)],
      [R * 0.48, Math.round(R * 0.8)],
    ]) {
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2;
        k.cyl('wood', 0.2, 0.26, wall + (rr < R * 0.5 ? 3 : 0), Math.cos(a) * rr, 0.6, Math.sin(a) * rr, 6);
      }
    }
    k.cyl('wood', 0.55, 0.65, wall + 7, 0, 0.6, 0, 10);
    // dining tables
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2 + 0.3,
        rr = R * 0.7;
      k.cyl('wood', 0.7, 0.7, 0.08, Math.cos(a) * rr, 1.35, Math.sin(a) * rr, 10);
      k.cyl('dark', 0.08, 0.08, 0.75, Math.cos(a) * rr, 0.6, Math.sin(a) * rr, 5);
    }
    // three stepped thatch tiers with darker ridges, like the official map
    let y = wall + 0.6,
      r = R + 1.2;
    const tiers = p.tiers ?? 3;
    for (let t = 0; t < tiers; t++) {
      const last = t === tiers - 1;
      // the top tier ends in an open collar of radius `oculus` (if any)
      const rTop = last ? Math.min(p.oculus ?? 0, r * 0.5) : r * 0.55;
      const h = last ? R * 0.55 * (1 - rTop / r) : R * 0.36;
      k.add('thatch', frustum(r, rTop, h, segs), 0, y, 0);
      k.add('thatchDark', new THREE.TorusGeometry(r - 0.15, 0.22, 4, segs).rotateX(Math.PI / 2), 0, y + 0.05, 0, 0, false);
      if (last && rTop > 0) {
        k.add('thatch', frustum(rTop, rTop * 0.94, 2.2, segs), 0, y + h - 0.1, 0);
        k.add('thatchDark', new THREE.TorusGeometry(rTop * 0.94, 0.25, 4, segs).rotateX(Math.PI / 2), 0, y + h + 2.1, 0, 0, false);
        k.cyl('thatchDark', rTop * 0.92, rTop * 0.92, 0.1, 0, y + h - 0.2, 0, segs);
      }
      y += h * 0.78;
      r = rTop * 1.18;
    }
    return { object: k.build() };
  },
});
