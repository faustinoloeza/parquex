import * as THREE from 'three';
import { ellipse, extrudePolygon, frustum, solidColor } from '../../graphics/geometry.js';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

const WHITE = 0xf4f6f8;
const BLUE = 0x1f5fb8;

/** Painted part (all share the vertex-colored `plastic` material: one draw call). */
const painted = (g, hex) => solidColor(g, hex);

/** Glossy slide tube from a list of [x, y, z] points. */
function slideTube(points, color, radius = 0.6) {
  const curve = new THREE.CatmullRomCurve3(points.map(([x, y, z]) => new THREE.Vector3(x, y, z)));
  return { curve, geometry: painted(new THREE.TubeGeometry(curve, points.length * 12, radius, 8, false), color) };
}

/**
 * Faro Mirador de Xel-Há: white lighthouse with blue bands, a viewing gallery,
 * glazed lantern and thatched cap, with water slides running from its north
 * face down into a teardrop pool. Origin halfway between tower and pool;
 * the slides run towards -z (north). Measured on satellite imagery: tower
 * ≈ 11 m across, pool ≈ 15 × 19 m, ≈ 43 m apart center to center.
 */
export default defineModel({
  type: 'lighthouseSlides',
  label: 'Faro con toboganes',
  params: { height: 34, slides: 3 },
  footprint: () => ({ rect: [20, 54] }),
  // tower, slide corridor and pool stay free of trees (the jungle reaches them)
  clearPaths: (p) => {
    const at = (dx, dz) => [p.x + dx, p.z + dz];
    return [
      { pts: [at(-2.3, 21), at(1.8, -22)], width: 9 },
      { pts: [at(1.8, -31), at(1.8, -13)], width: 24 },
      { pts: [at(-2.3, 17), at(-2.3, 25)], width: 18 },
    ];
  },
  build(p) {
    const k = new ModelKit();
    const H = p.height;
    const T = [-2.3, 21]; // tower center
    const P = [1.8, -22]; // pool center
    const r0 = 5.2,
      r1 = 4.4; // tower radius at the base and top
    const radiusAt = (y) => r0 + (r1 - r0) * (y / H);

    // base plaza and the stone terrace west of the slides: two levels with
    // steps down towards the tower
    k.cyl('paving', 8.5, 9, 0.25, T[0], -0.3, T[1], 28);
    const [tx, tz] = [-15.5, 5.5];
    k.box('limestone', 10, 0.9, 19, tx, -0.5, tz, 0.15);
    k.box('limestone', 7, 0.8, 12, tx - 1, 0.4, tz - 2.5, 0.15);
    for (let i = 0; i < 3; i++) k.box('limestone', 3.2, 0.75 - 0.2 * i, 1.2, tx + 2, -0.5, tz + 10.1 + i * 1.2, 0.15);

    // tower: white shaft with blue bands
    k.addTransformed('plastic', painted(frustum(r0, r1, H, 24), WHITE), new THREE.Matrix4().makeTranslation(T[0], 0, T[1]));
    for (let y = 3.5; y < H - 3; y += 3.8) {
      const r = radiusAt(y + 0.9) + 0.12;
      k.addTransformed('plastic', painted(frustum(r, r, 1.8, 24), BLUE), new THREE.Matrix4().makeTranslation(T[0], y, T[1]));
    }
    // gallery, railing, lantern, thatched cap, mast and flag
    k.addTransformed(
      'plastic',
      painted(new THREE.CylinderGeometry(r1 + 1.4, r1 + 0.6, 0.6, 24).translate(0, 0.3, 0), WHITE),
      new THREE.Matrix4().makeTranslation(T[0], H, T[1]),
    );
    k.add('iron', frustum(r1 + 1.3, r1 + 1.3, 1.1, 24), T[0], H + 0.6, T[1], 0, false);
    k.cyl('glass', 3, 3, 3.2, T[0], H + 0.6, T[1], 16);
    k.addTransformed(
      'thatch',
      new THREE.ConeGeometry(3.9, 3.4, 16).translate(0, 1.7, 0),
      new THREE.Matrix4().makeTranslation(T[0], H + 3.8, T[1]),
    );
    k.cyl('iron', 0.07, 0.07, 6, T[0], H + 7, T[1], 6);
    [0x1f8a4c, 0xffffff, 0xc8102e].forEach((c, i) =>
      k.addTransformed(
        'plastic',
        painted(new THREE.BoxGeometry(1.1, 2.1, 0.06), c),
        new THREE.Matrix4().makeTranslation(T[0] + 0.6 + i * 1.1, H + 11.8, T[1]),
      ),
    );

    // slides: down the north face, then straight into the pool, on posts
    for (let i = 0; i < p.slides; i++) {
      const dx = (i - (p.slides - 1) / 2) * 1.5;
      const { curve, geometry } = slideTube(
        [
          [T[0] + dx, 12.5, T[1] - radiusAt(12.5) - 0.7],
          [T[0] + dx * 1.2, 8.5, T[1] - 9],
          [dx + 0.4, 4.6, 5],
          [dx + 1, 2.2, -4],
          [P[0] + dx, 0.7, P[1] + 8.5],
          [P[0] + dx, 0.35, P[1] + 6.5],
        ],
        i === 1 ? WHITE : BLUE,
      );
      k.addTransformed('plastic', geometry);
      for (let t = 0.12; t < 0.9; t += 0.13) {
        const q = curve.getPoint(t);
        if (q.y > 1.2) k.cyl('iron', 0.12, 0.12, q.y - 0.6, q.x, 0, q.z, 6);
      }
    }

    // teardrop pool with a stone rim
    const outline = ellipse(7.5, 9.5, 36).map(([x, z]) => [x * (z < 0 ? 0.8 : 1), z]);
    const rim = outline.map(([x, z]) => [x * 1.12, z * 1.1]);
    k.add('paving', extrudePolygon(rim, 0.3), P[0], -0.1, P[1]);
    k.add('pool', extrudePolygon(outline, 0.08), P[0], 0.2, P[1], 0, false);
    return { object: k.build() };
  },
});
