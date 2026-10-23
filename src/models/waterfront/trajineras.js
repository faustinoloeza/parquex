import * as THREE from 'three';
import { extrudePolygon, extrudeWithHoles, solidColor } from '../../graphics/geometry.js';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/** Trajinera color schemes: [hull, gunwale stripe, roof, arch, arch panel / flowers]. */
const SCHEMES = [
  [0x1f6fb2, 0xf3c234, 0xe8407a, 0xf3c234, 0xe8407a],
  [0x2f9e4f, 0xf7f4ec, 0xf28c28, 0xe8407a, 0xf3c234],
  [0xc0362c, 0xf3c234, 0x2a8fd6, 0x2f9e4f, 0xf7f4ec],
  [0x7a3fb0, 0xf7f4ec, 0xf3c234, 0x2a8fd6, 0xe8407a],
  [0xf28c28, 0x1f6fb2, 0x2f9e4f, 0xc0362c, 0xf3c234],
  [0xe8407a, 0xf7f4ec, 0x1f6fb2, 0xf3c234, 0x2f9e4f],
  [0x1d9c9c, 0xf3c234, 0xc0362c, 0xf28c28, 0xf7f4ec],
];

/** Vertical slab in the boat's cross-section: `outline`/`holes` as [across, up], `t` thick along the boat. */
function crossSlab(outline, holes, t) {
  const flip = (pts) => pts.map(([u, y]) => [u, -y]);
  const g = holes.length ? extrudeWithHoles(flip(outline), holes.map(flip), t) : extrudePolygon(flip(outline), t, { bottom: true });
  g.rotateX(Math.PI / 2); // outline in the XY plane, thickness along +z
  g.translate(0, 0, -t / 2);
  g.rotateY(Math.PI / 2); // across the boat (z), thickness along it (x)
  return g.index ? g.toNonIndexed() : g;
}

/** Arch outline: posts `a` m from the axis up to `h`, then a half circle. */
function archOutline(a, y0, h, n = 12) {
  const pts = [
    [a, y0],
    [a, h],
  ];
  for (let i = 1; i < n; i++) pts.push([a * Math.cos((i / n) * Math.PI), h + a * Math.sin((i / n) * Math.PI)]);
  pts.push([-a, h], [-a, y0]);
  return pts;
}

/**
 * Trajineras of Xoximilco: long flat-bottomed boats painted in bright colors,
 * a flat roof on thin posts over a long table with benches and, at the bow, a
 * tall painted arch with the boat's name panel and paper flowers. Several boats
 * per placement (one draw call for the painted parts, one for the wood):
 * `boats` lists [x, z, heading°, scheme?] in park coordinates (heading: bow
 * direction, 0 = east, 90 = south); the placement's own x/z is the origin and
 * `y` should be the water level (0). Static (merged with the other models).
 */
export default defineModel({
  type: 'trajineras',
  label: 'Trajineras',
  params: { boats: [], length: 10, width: 2.6 },
  build(p) {
    const k = new ModelKit();
    const L = p.length,
      W = p.width;
    const paint = (g, color, m) => k.addTransformed('plastic', solidColor(g, color), m);
    p.boats.forEach(([x, z, heading, scheme], i) => {
      const [hull, stripe, roof, arch, panel] = SCHEMES[(scheme ?? i) % SCHEMES.length];
      // boat frame: bow towards +x, then turned to the heading
      const frame = new THREE.Matrix4()
        .makeTranslation(x - p.x, 0, z - p.z)
        .multiply(new THREE.Matrix4().makeRotationY(-THREE.MathUtils.degToRad(heading)));
      const at = (dx, dy, dz) => frame.clone().multiply(new THREE.Matrix4().makeTranslation(dx, dy, dz));
      // flat hull with blunt raked ends, a light gunwale stripe and the plank deck
      const outline = [
        [-L / 2, -W * 0.36],
        [-L / 2 + 0.7, -W / 2],
        [L / 2 - 0.7, -W / 2],
        [L / 2, -W * 0.36],
        [L / 2, W * 0.36],
        [L / 2 - 0.7, W / 2],
        [-L / 2 + 0.7, W / 2],
        [-L / 2, W * 0.36],
      ];
      paint(extrudePolygon(outline, 0.62), hull, at(0, -0.3, 0));
      paint(
        extrudePolygon(
          outline.map(([a, b]) => [a * 1.01, b * 1.04]),
          0.14,
        ),
        stripe,
        at(0, 0.24, 0),
      );
      k.addTransformed('wood', new THREE.BoxGeometry(L - 1.3, 0.06, W - 0.3).translate(0, 0.35, 0), frame);
      // long table and two benches
      k.addTransformed('wood', new THREE.BoxGeometry(L - 4, 0.08, 0.8).translate(0, 1.05, 0), frame);
      k.addTransformed('wood', new THREE.BoxGeometry(L - 4.4, 0.66, 0.3).translate(0, 0.66, 0), frame);
      for (const s of [-1, 1]) k.addTransformed('wood', new THREE.BoxGeometry(L - 4, 0.45, 0.42).translate(0, 0.6, s * 0.86), frame);
      // posts and the flat roof with a contrasting fringe
      const roofY = 2.35;
      for (const px of [-L / 2 + 1.2, 0, L / 2 - 1.6])
        for (const s of [-1, 1])
          paint(new THREE.CylinderGeometry(0.05, 0.05, roofY - 0.35, 5), 0xf7f4ec, at(px, 0.35 + (roofY - 0.35) / 2, s * (W / 2 - 0.25)));
      paint(new THREE.BoxGeometry(L - 2.2, 0.1, W + 0.1), roof, at(-0.3, roofY + 0.05, 0));
      paint(new THREE.BoxGeometry(L - 2.1, 0.22, W + 0.16), stripe, at(-0.3, roofY - 0.08, 0));
      // painted bow arch with the name panel and paper flowers
      const ax = L / 2 - 1.05;
      const a = W / 2 + 0.15,
        h = 2.25;
      paint(crossSlab(archOutline(a, 0.35, h), [archOutline(a - 0.42, 0.75, h - 0.1)], 0.12), arch, at(ax, 0, 0));
      paint(new THREE.BoxGeometry(0.16, 0.5, a * 1.5), panel, at(ax + 0.05, h + a * 0.55, 0));
      for (let f = 0; f < 7; f++) {
        const ang = (f / 6) * Math.PI;
        const flower = new THREE.IcosahedronGeometry(0.17, 0);
        paint(flower, f % 2 ? panel : 0xf7f4ec, at(ax + 0.1, h + (a - 0.2) * Math.sin(ang), (a - 0.2) * Math.cos(ang)));
      }
    });
    return { object: k.build() };
  },
});
