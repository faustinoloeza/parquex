import * as THREE from 'three';
import { extrudePolygon, solidColor } from '../../graphics/geometry.js';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/** Stroke glyphs (2.4 × 3.2 units, like letters.js) for the arch's sign. */
const GLYPHS = {
  X: [
    [0, 0, 2.4, 3.2],
    [0, 3.2, 2.4, 0],
  ],
  O: [
    [0.3, 0.3, 2.1, 0.3],
    [0.3, 2.9, 2.1, 2.9],
    [0.3, 0.3, 0.3, 2.9],
    [2.1, 0.3, 2.1, 2.9],
  ],
  I: [[1.2, 0, 1.2, 3.2]],
  M: [
    [0.3, 0, 0.3, 3.2],
    [2.1, 0, 2.1, 3.2],
    [0.3, 3.2, 1.2, 1.5],
    [1.2, 1.5, 2.1, 3.2],
  ],
  L: [
    [0.35, 0, 0.35, 3.2],
    [0, 0.3, 2.2, 0.3],
  ],
  C: [
    [0.35, 0, 0.35, 3.2],
    [0.2, 2.9, 2.4, 2.9],
    [0.2, 0.3, 2.4, 0.3],
  ],
};

/** Vertical slab: `outline` as [x, y] in the front plane, `depth` thick along z, centered on z = 0. */
function slab(outline, depth) {
  const g = extrudePolygon(
    outline.map(([x, y]) => [x, -y]),
    depth,
    { top: true, bottom: true },
  );
  g.rotateX(Math.PI / 2);
  g.translate(0, 0, -depth / 2);
  return g;
}

/** Half circle of radius r around (0, cy), from angle a0 to a1 (radians). */
const arc = (r, cy, a0, a1, n = 18) =>
  Array.from({ length: n + 1 }, (_, i) => {
    const a = a0 + ((a1 - a0) * i) / n;
    return [r * Math.cos(a), cy + r * Math.sin(a)];
  });

/** Band hugging the road arch between radii r0 < r1, down to the ground. */
const archBand = (r0, r1, spring) => [[r1, 0], ...arc(r1, spring, 0, Math.PI), [-r1, 0], [-r0, 0], ...arc(r0, spring, Math.PI, 0), [r0, 0]];

/**
 * Entrance arch of Xoximilco: a free-standing cream stucco portal over the
 * access road with a semicircular road arch (white intrados band with a thin
 * maroon stripe), cornices at the springing line, a baroque scrolled crest
 * with round stone medallions, cream paper flowers and the park's name in big
 * cream letters following the arch; low rubble walls on both sides and the
 * colorful crossed "X" decorations on the lawn in front. Front faces +z, the
 * road runs along z. Modeled on a street-level photo.
 */
export default defineModel({
  type: 'fiestaArch',
  label: 'Arco de acceso de Xoximilco',
  params: { width: 11, depth: 1.4, opening: 4.1, spring: 2.7, text: 'XOXIMILCO', wall: 7 },
  footprint: (p) => ({ rect: [p.width, p.depth + 0.6] }),
  build(p) {
    const k = new ModelKit();
    const W = p.width / 2,
      D = p.depth,
      ra = p.opening,
      sp = p.spring;
    const paint = (g, color, x = 0, y = 0, z = 0) =>
      k.addTransformed('vertex', solidColor(g, color), new THREE.Matrix4().makeTranslation(x, y, z));
    // scrolled crest: height over |x| / W (corner scrolls, a dip, a raised center)
    const crest = [
      [1, 8.3],
      [0.92, 8.6],
      [0.82, 8.45],
      [0.7, 8.1],
      [0.55, 8.25],
      [0.42, 8.9],
      [0.3, 9.4],
      [0.15, 9.5],
      [0, 9.3],
    ];
    const top = [
      ...crest.map(([t, y]) => [t * W, y]),
      ...[...crest]
        .reverse()
        .slice(1)
        .map(([t, y]) => [-t * W, y]),
    ];
    const crestY = (x) => {
      const t = Math.abs(x) / W;
      for (let i = 1; i < crest.length; i++) {
        const [t0, y0] = crest[i - 1],
          [t1, y1] = crest[i];
        if (t <= t0 && t >= t1) return y0 + ((y1 - y0) * (t - t0)) / (t1 - t0);
      }
      return crest[0][1];
    };
    // the portal: stucco around the road arch
    k.add('wall', slab([[-W, 0], [-ra, 0], ...arc(ra, sp, Math.PI, 0), [ra, 0], [W, 0], ...top], D), 0, 0, 0, 0, false);
    // white intrados band with a thin maroon stripe, a little proud of both faces
    paint(slab(archBand(ra - 0.02, ra + 0.55, sp), D + 0.1), 0xf7f4ec);
    paint(slab(archBand(ra + 0.55, ra + 0.68, sp), D + 0.08), 0x8a2335);
    // cornices at the springing line and a plinth
    for (const s of [-1, 1]) {
      k.box('wall', W - ra - 0.55, 0.3, D + 0.4, s * (ra + 0.68 + (W - ra - 0.68) / 2), sp - 0.3, 0);
      k.box('wall', W - ra - 0.55, 0.35, D + 0.25, s * (ra + 0.68 + (W - ra - 0.68) / 2), 0, 0);
    }
    // stone medallions: corner scrolls and two in the center
    for (const [x, y, r] of [
      [-W + 0.55, 8.05, 0.62],
      [W - 0.55, 8.05, 0.62],
      [-1.2, 8.75, 0.78],
      [1.2, 8.75, 0.78],
    ]) {
      const g = new THREE.CylinderGeometry(r, r, D + 0.24, 14).rotateX(Math.PI / 2);
      k.addTransformed('stone', g, new THREE.Matrix4().makeTranslation(x, y, 0));
      const rim = new THREE.TorusGeometry(r, 0.09, 4, 14);
      for (const z of [-1, 1]) paint(rim.clone(), 0xe9dfc4, x, y, z * (D / 2 + 0.12));
    }
    // cream paper flowers over the upper part of both faces
    for (const [r, n] of [
      [6.4, 12],
      [7.05, 14],
    ]) {
      for (let i = 0; i < n; i++) {
        const a = (0.12 + (0.76 * i) / (n - 1)) * Math.PI;
        const x = r * Math.cos(a),
          y = sp + r * Math.sin(a);
        if (Math.abs(x) > W - 0.4 || y > crestY(x) - 0.35) continue;
        for (const z of [-1, 1]) {
          const flower = new THREE.CylinderGeometry(0.34, 0.34, 0.1, 7).rotateX(Math.PI / 2);
          paint(flower, i % 3 ? 0xffffff : 0xf1e4bf, x, y, z * (D / 2 + 0.05));
        }
      }
    }
    // the name in big cream letters following the arch (front face)
    const text = [...p.text.toUpperCase()];
    const s = 0.36,
      rl = ra + 1.35,
      t = 0.27,
      depth = 0.25;
    text.forEach((ch, i) => {
      const a = Math.PI * (0.83 - (0.66 * i) / Math.max(1, text.length - 1));
      const m = new THREE.Matrix4()
        .makeTranslation(rl * Math.cos(a), sp + rl * Math.sin(a), D / 2 + depth / 2)
        .multiply(new THREE.Matrix4().makeRotationZ(a - Math.PI / 2));
      for (const [ax, ay, bx, by] of GLYPHS[ch] ?? []) {
        const len = Math.hypot(bx - ax, by - ay) * s + t * 0.6;
        const g = new THREE.BoxGeometry(len, t, depth)
          .rotateZ(Math.atan2(by - ay, bx - ax))
          .translate(((ax + bx) / 2 - 1.2) * s, ((ay + by) / 2 - 1.6) * s, 0);
        k.addTransformed('vertex', solidColor(g, 0xfff3c2), m);
      }
    });
    // low rubble-stone walls on both sides
    for (const sx of [-1, 1]) {
      k.box('limestone', 1.6, 2.6, 0.9, sx * (W + 0.8), 0, 0);
      k.box('limestone', p.wall, 1.7, 0.6, sx * (W + 1.6 + p.wall / 2), 0, 0);
    }
    // small colored park sign on top
    paint(new THREE.BoxGeometry(2.6, 0.6, 0.25).translate(0, 0.3, 0), 0xc0362c, 0, 9.45, 0);
    paint(new THREE.BoxGeometry(2.2, 0.18, 0.3).translate(0, 0.09, 0), 0x1f6fb2, 0, 9.55, 0);
    // crossed "X" decorations on the lawn, striped red / blue / yellow / white
    const stripes = [0xc0362c, 0x1f6fb2, 0xf3c234, 0xf7f4ec];
    for (const sx of [-1, 1]) {
      for (const tilt of [-1, 1]) {
        const board = new THREE.Matrix4()
          .makeTranslation(sx * (W + 2.6), 0.85, 2.4)
          .multiply(new THREE.Matrix4().makeRotationX(-0.25))
          .multiply(new THREE.Matrix4().makeRotationZ(tilt * 0.75));
        for (let j = 0; j < 4; j++) {
          const g = new THREE.BoxGeometry(0.55, 0.28, 0.12).translate(-0.825 + j * 0.55, 0, tilt * 0.03);
          k.addTransformed('vertex', solidColor(g, stripes[(j + (tilt > 0 ? 1 : 0)) % 4]), board);
        }
      }
    }
    return { object: k.build() };
  },
});
