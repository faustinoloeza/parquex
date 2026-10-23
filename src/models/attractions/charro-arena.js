import { extrudeProfile } from '../../graphics/geometry.js';
import { horseGeometry } from '../parts/creatures.js';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

const DEG = Math.PI / 180;

/** Thin box from (ax, az) to (bx, bz) with its base at y. */
function beam(k, material, [ax, az], [bx, bz], y, w, h) {
  const dx = bx - ax,
    dz = bz - az;
  k.box(material, Math.hypot(dx, dz), h, w, (ax + bx) / 2, y, (az + bz) / 2, -Math.atan2(dz, dx));
}

/** Wooden post-and-rail fence along a closed outline. */
function fence(k, pts) {
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i],
      b = pts[(i + 1) % pts.length];
    for (const y of [0.5, 1.0, 1.45]) beam(k, 'weatheredWood', a, b, y, 0.08, 0.12);
    const n = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / 2.4));
    for (let j = 0; j < n; j++) {
      const t = j / n;
      k.box('weatheredWood', 0.16, 1.85, 0.16, a[0] + (b[0] - a[0]) * t, -0.2, a[1] + (b[1] - a[1]) * t);
    }
  }
}

/** Band along a rectangle's longer side (x0, z0, x1, z1), for clearPaths. */
function band([x0, z0, x1, z1], ox, oz, extra) {
  const cx = ox + (x0 + x1) / 2,
    cz = oz + (z0 + z1) / 2;
  const alongZ = z1 - z0 >= x1 - x0;
  const half = (alongZ ? z1 - z0 : x1 - x0) / 2,
    width = (alongZ ? x1 - x0 : z1 - z0) + extra;
  const end = Math.max(0, half - width / 2);
  const pts = alongZ
    ? [
        [cx, cz - end],
        [cx, cz + end],
      ]
    : [
        [cx - end, cz],
        [cx + end, cz],
      ];
  return { pts, width };
}

const bbox = (pts) => [
  Math.min(...pts.map((p) => p[0])),
  Math.min(...pts.map((p) => p[1])),
  Math.max(...pts.map((p) => p[0])),
  Math.max(...pts.map((p) => p[1])),
];

/**
 * Espectáculo Ecuestre: charrería arena of packed earth (the ground itself, a
 * `pave` edit with `surface: 'dirt'`) inside a wooden post-and-rail fence,
 * wooden bleachers on one side, a stable open towards the arena and horses,
 * some ridden by charros (official map and satellite imagery).
 * Shapes in local meters:
 *   outline   arena fence [[x, z], ...]
 *   stands    [x0, z0, x1, z1] bleachers rising towards −x
 *   stable    [x0, z0, x1, z1] stalls open towards −x, ridge along z
 *   horses    [[x, z, heading (deg, 0 = +x, counter-clockwise), coat, rider?], ...]
 */
export default defineModel({
  type: 'charroArena',
  label: 'Lienzo charro (espectáculo ecuestre)',
  params: { outline: [], stands: null, stable: null, horses: [] },
  clearPaths: (p) => [
    band(bbox(p.outline), p.x, p.z, 1),
    ...(p.stands ? [band(p.stands, p.x, p.z, 1)] : []),
    ...(p.stable ? [band(p.stable, p.x, p.z, -1.5)] : []),
  ],
  build(p) {
    const k = new ModelKit();
    fence(k, p.outline);

    if (p.stands) {
      const [x0, z0, x1, z1] = p.stands;
      const rows = 5,
        d = (x1 - x0) / rows;
      for (let i = 0; i < rows; i++) k.box('wood', d, 0.45 * (i + 1) + 0.3, z1 - z0, x1 - (i + 0.5) * d, -0.3, (z0 + z1) / 2);
      // back rail
      beam(k, 'weatheredWood', [x0 + 0.1, z0], [x0 + 0.1, z1], 0.45 * rows + 0.9, 0.1, 0.12);
      for (const z of [z0 + 0.2, (z0 + z1) / 2, z1 - 0.2]) k.box('weatheredWood', 0.14, 0.95, 0.14, x0 + 0.1, 0.45 * rows, z);
    }

    if (p.stable) {
      const [x0, z0, x1, z1] = p.stable;
      const W = x1 - x0,
        L = z1 - z0,
        H = 2.8,
        cz = (z0 + z1) / 2;
      // back and end walls; the side towards the arena is a row of stalls
      k.box('weatheredWood', 0.3, H, L, x1 - 0.15, -0.3, cz);
      for (const z of [z0 + 0.15, z1 - 0.15]) k.box('weatheredWood', W, H, 0.3, (x0 + x1) / 2, -0.3, z);
      const stalls = Math.max(1, Math.round(L / 3));
      for (let i = 0; i <= stalls; i++) {
        const z = z0 + (L * i) / stalls;
        k.box('wood', 0.25, H, 0.25, x0 + 0.15, -0.3, z);
        if (i > 0 && i < stalls) k.box('weatheredWood', W * 0.6, 1.7, 0.12, x0 + W * 0.3, -0.3, z);
      }
      for (let i = 0; i < stalls; i++) {
        const z = z0 + (L * (i + 0.5)) / stalls;
        k.box('dark', 0.1, 2.1, (L / stalls) * 0.75, x0 + 0.6, -0.3, z);
        k.box('wood', 0.12, 1.1, (L / stalls) * 0.7, x0 + 0.3, -0.3, z);
      }
      // gabled roof with eaves, ridge along z
      const rise = W * 0.3;
      const roof = extrudeProfile(
        [
          [-W / 2 - 0.7, 0],
          [W / 2 + 0.7, 0],
          [0, rise],
        ],
        L + 1,
      );
      k.add('thatch', roof, (x0 + x1) / 2, H - 0.3, cz, Math.PI / 2);
    }

    for (const [x, z, heading, coat, rider] of p.horses) k.add('vertex', horseGeometry(coat, rider), x, 0, z, heading * DEG);
    return { object: k.build() };
  },
});
