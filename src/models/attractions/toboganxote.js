import * as THREE from 'three';
import { frustum, solidColor } from '../../graphics/geometry.js';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/**
 * Toboganxote (Xplor's 5-in-1 raft slide): a 41 m launch tower, the white
 * "Esfera", two open funnels and the tube that links them down to the wave
 * pool. Points are relative to the model origin, [x, z] or [x, y, z]:
 *   tower    [x, z]         launch tower (stairs on its back)
 *   sphere   [x, z, r]      white sphere sitting on the ground
 *   funnels  [[x, z, r]…]   open bowls ("remolino", "torbellino")
 *   path     [[x, y, z]…]   tube centerline from the tower top to the pool
 */
export default defineModel({
  type: 'toboganxote',
  label: 'Toboganxote (tobogán 5 en 1)',
  params: { height: 41, tower: [0, 0], sphere: [20, 15, 10], funnels: [], path: [], color: 0xf28c28 },
  footprint: (p) => ({ circle: 8 }),
  build(p) {
    const k = new ModelKit();
    const H = p.height;
    const [tx, tz] = p.tower;
    // launch tower: four white posts, landings every 4 m and a flat top
    for (const [x, z] of [
      [-1, -1],
      [1, -1],
      [-1, 1],
      [1, 1],
    ])
      k.box('white', 0.6, H, 0.6, tx + x * 3.5, 0, tz + z * 3.5);
    for (let y = 4; y < H; y += 4) {
      k.box('concrete', 7.6, 0.3, 7.6, tx, y, tz);
      k.box('iron', 7.6, 0.25, 1.4, tx, y - 2, tz - 4.6, y % 8 ? 0.15 : -0.15);
    }
    k.box('concrete', 8.4, 0.4, 8.4, tx, H, tz);
    k.box('iron', 8.4, 1.1, 0.1, tx, H + 0.4, tz - 4.2);
    k.box('iron', 0.1, 1.1, 8.4, tx - 4.2, H + 0.4, tz);
    // the sphere: three quarters above ground, with a ring of supports
    const [sx, sz, sr] = p.sphere;
    k.add('white', new THREE.SphereGeometry(sr, 24, 14, 0, Math.PI * 2, 0, Math.PI * 0.68), sx, sr * 0.55, sz);
    // funnels
    for (const [fx, fz, fr] of p.funnels) {
      k.addTransformed(
        'plastic',
        solidColor(frustum(fr * 0.25, fr, fr * 0.8, 20), 0x2f8fd8),
        new THREE.Matrix4().makeTranslation(fx, 6, fz),
      );
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        k.box('white', 0.3, 6 + fr * 0.4, 0.3, fx + Math.cos(a) * fr * 0.6, 0, fz + Math.sin(a) * fr * 0.6);
      }
    }
    // tube
    if (p.path.length > 1) {
      const curve = new THREE.CatmullRomCurve3(p.path.map(([x, y, z]) => new THREE.Vector3(x, y, z)));
      k.addTransformed('plastic', solidColor(new THREE.TubeGeometry(curve, 120, 1.1, 8, false), p.color), new THREE.Matrix4());
      for (let t = 0.04; t < 0.98; t += 0.05) {
        const q = curve.getPoint(t);
        if (q.y > 1.5) k.box('white', 0.35, q.y - 1, 0.35, q.x, 0, q.z);
      }
    }
    return { object: k.build() };
  },
});
