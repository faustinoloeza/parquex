import * as THREE from 'three';
import { solidColor } from '../../graphics/geometry.js';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/** Letters and digits as strokes [x0, y0, x1, y1] in a 2.4 × 3.2 box. */
const GLYPHS = {
  X: [
    [0, 0, 2.4, 3.2],
    [0, 3.2, 2.4, 0],
  ],
  C: [
    [0.35, 0, 0.35, 3.2],
    [0, 3.2 - 0.35, 2.4, 3.2 - 0.35],
    [0, 0.35, 2.4, 0.35],
  ],
  A: [
    [0, 0, 1.2, 3.2],
    [2.4, 0, 1.2, 3.2],
    [0.55, 1.3, 1.85, 1.3],
  ],
  R: [
    [0.35, 0, 0.35, 3.2],
    [0, 2.85, 2.1, 2.85],
    [2.05, 3.2, 2.05, 1.5],
    [0, 1.65, 2.1, 1.65],
    [1.0, 1.65, 2.4, 0],
  ],
  E: [
    [0.35, 0, 0.35, 3.2],
    [0, 2.85, 2.4, 2.85],
    [0, 1.6, 2.0, 1.6],
    [0, 0.35, 2.4, 0.35],
  ],
  L: [
    [0.35, 0, 0.35, 3.2],
    [0, 0.35, 2.2, 0.35],
  ],
  H: [
    [0.35, 0, 0.35, 3.2],
    [2.05, 0, 2.05, 3.2],
    [0, 1.6, 2.4, 1.6],
  ],
  T: [
    [0, 2.85, 2.4, 2.85],
    [1.2, 0, 1.2, 3.2],
  ],
  M: [
    [0.35, 0, 0.35, 3.2],
    [2.05, 0, 2.05, 3.2],
    [0.35, 3.2, 1.2, 1.5],
    [2.05, 3.2, 1.2, 1.5],
  ],
  I: [[1.2, 0, 1.2, 3.2]],
  O: [
    [0.35, 0, 0.35, 3.2],
    [2.05, 0, 2.05, 3.2],
    [0, 2.85, 2.4, 2.85],
    [0, 0.35, 2.4, 0.35],
  ],
  0: [
    [0.35, 0, 0.35, 3.2],
    [2.05, 0, 2.05, 3.2],
    [0, 2.85, 2.4, 2.85],
    [0, 0.35, 2.4, 0.35],
  ],
  2: [
    [0, 2.85, 2.4, 2.85],
    [2.05, 3.2, 2.05, 1.6],
    [0, 1.6, 2.4, 1.6],
    [0.35, 1.6, 0.35, 0],
    [0, 0.35, 2.4, 0.35],
  ],
  6: [
    [0, 2.85, 2.4, 2.85],
    [0.35, 3.2, 0.35, 0],
    [0, 1.6, 2.4, 1.6],
    [2.05, 1.6, 2.05, 0],
    [0, 0.35, 2.4, 0.35],
  ],
};

/**
 * Letras monumentales. Optional: `scale`, an `outline` drawn as a slightly
 * larger silhouette behind the letters (mosaic signs), and
 * `ornaments` (Xel-Há sign: small lighthouse on the L, fish disc between E
 * and H, leaf after the last letter). `color` and `outline` are material
 * names, or hex colors painted on the shared `plastic` material (one draw call
 * for the whole sign). The front faces +z.
 */
export default defineModel({
  type: 'letters',
  label: 'Letras monumentales',
  params: { text: 'XCARET', scale: 1, color: 'white', outline: null, base: 'limestone', ornaments: false },
  footprint: (p) => ({ rect: [(p.text.length * 3.1 + 2) * (p.scale ?? 1), 3.5 * (p.scale ?? 1)] }),
  build(p) {
    const k = new ModelKit();
    const text = p.text.toUpperCase();
    const S = p.scale ?? 1;
    const adv = 3.1 * S,
      t = 0.7 * S,
      depth = 0.9 * S;
    const x0 = -((text.length - 1) * adv + 2.4 * S) / 2;
    const lift = 0.4 * S + (p.ornaments ? 0.5 : 0);
    // material name, or a hex color painted per vertex on `plastic`
    const put = (paint, g, x = 0, y = 0, z = 0, ry = 0) => {
      if (typeof paint === 'number') k.add('plastic', solidColor(g, paint), x, y, z, ry, true);
      else k.add(paint, g, x, y, z, ry, true);
    };
    const stroke = (material, ax, ay, bx, by, i, grow, z) => {
      const len = Math.hypot(bx - ax, by - ay) * S + t * 0.6 + grow;
      const g = new THREE.BoxGeometry(len, t + grow, depth - Math.abs(z));
      g.rotateZ(Math.atan2(by - ay, bx - ax));
      g.translate(x0 + i * adv + ((ax + bx) / 2) * S, lift + ((ay + by) / 2) * S, z);
      put(material, g);
    };
    [...text].forEach((ch, i) => {
      for (const [ax, ay, bx, by] of GLYPHS[ch] ?? []) {
        stroke(p.color ?? 'white', ax, ay, bx, by, i, 0, 0);
        if (p.outline) stroke(p.outline, ax, ay, bx, by, i, 0.35 * S, -0.12 * S);
      }
    });
    const width = text.length * adv + 2 * S;
    if (p.ornaments) {
      // rubble base, lighthouse on the L, fish disc and a leaf (Xel-Há sign)
      k.box(p.base, width + 1, 1, 3 * S, 0, -0.5, 0);
      const li = text.indexOf('L');
      if (li >= 0) {
        const x = x0 + li * adv + 0.35 * S;
        put(p.color, new THREE.CylinderGeometry(0.3 * S, 0.42 * S, 1.1 * S, 10).translate(0, 0.55 * S, 0), x, lift + 3.2 * S);
        put(p.outline ?? p.color, new THREE.CylinderGeometry(0.05, 0.5 * S, 0.6 * S, 10).translate(0, 0.3 * S, 0), x, lift + 4.3 * S);
      }
      const hi = text.indexOf('H');
      if (hi > 0) {
        const fish = new THREE.CylinderGeometry(0.9 * S, 0.9 * S, depth + 0.1, 16).rotateX(Math.PI / 2);
        put(0x8a2335, fish, x0 + hi * adv - 0.35 * S, lift + 1.7 * S, 0.05);
      }
      const leaf = new THREE.CylinderGeometry(0.8 * S, 0.8 * S, depth * 0.6, 3).rotateX(Math.PI / 2).scale(1.4, 0.8, 1);
      put(0x6fae3c, leaf, x0 + text.length * adv, lift + 3 * S, 0, 0.5);
    } else k.box(p.base ?? 'limestone', width, 0.5 * S, 3.2 * S, 0, -0.1 * S, 0);
    return { object: k.build() };
  },
});
