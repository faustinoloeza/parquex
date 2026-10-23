import * as THREE from 'three';
import { mulberry32 } from '#shared/random.js';
import { trianglesGeometry } from '../../graphics/geometry.js';
import { rock } from '../parts/rock.js';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/** Height of the ledges above the water (m); depth the steps go down to. */
const LEDGE = 0.4,
  BOTTOM = -0.9;
/** Steps: run (m), handrail height above the treads (m). */
const RUN = 0.42,
  RAIL = 0.9;

/**
 * Snorkel cove (visitors' photos, 2026): flat ledges of pale limestone along
 * both banks of a clear channel, with boulders at the waterline; on the bank
 * of the palapas, entries of a few steps with wooden handrails; across, wide
 * steps going down into the water split by handrails. Absolute coordinates;
 * place with `y: 0` (water level).
 */
export default defineModel({
  type: 'snorkelCove',
  label: 'Caleta de snorkel',
  // ledges: [{ pts: [[x, z], …] along the waterline, width }];
  // entries: [{ at: [x, z] on the ledge, toward: [x, z] in the water, width, rails: number of handrails }]
  params: { ledges: [], entries: [] },
  build(p) {
    const k = new ModelKit();
    const L = ([x, z]) => [x - p.x, z - p.z];
    const rnd = mulberry32(5);
    for (const ledge of p.ledges) {
      const pts = ledge.pts.map(L);
      k.add('pierStone', strip(pts, ledge.width), 0, 0, 0);
      // boulders along the waterline
      for (let i = 1; i < pts.length; i++) {
        const [x0, z0] = pts[i - 1],
          [x1, z1] = pts[i];
        const n = Math.round(Math.hypot(x1 - x0, z1 - z0) / 1.6);
        for (let j = 0; j < n; j++) {
          const t = (j + rnd()) / n;
          k.add('sandstone', rock(0.35 + rnd() * 0.35, i * 10 + j), x0 + (x1 - x0) * t, -0.15, z0 + (z1 - z0) * t, rnd() * 6.3);
        }
      }
    }
    for (const e of p.entries) stairs(k, L(e.at), L(e.toward), e.width ?? 1.6, e.rails ?? 2);
    return { object: k.build() };
  },
});

/** Slab `width` m wide centered on a polyline, top at LEDGE, with its sides down to below the water. */
function strip(pts, width) {
  const tris = [];
  const h = width / 2;
  for (let i = 1; i < pts.length; i++) {
    const [x0, z0] = pts[i - 1],
      [x1, z1] = pts[i];
    const l = Math.hypot(x1 - x0, z1 - z0) || 1;
    const nx = (-(z1 - z0) / l) * h,
      nz = ((x1 - x0) / l) * h;
    const a = [x0 + nx, LEDGE, z0 + nz],
      b = [x1 + nx, LEDGE, z1 + nz],
      c = [x1 - nx, LEDGE, z1 - nz],
      d = [x0 - nx, LEDGE, z0 - nz];
    const down = (v) => [v[0], -0.6, v[2]];
    tris.push([...a, ...b, ...c], [...a, ...c, ...d]); // top (counter-clockwise from above)
    tris.push([...a, ...down(b), ...b], [...a, ...down(a), ...down(b)]); // sides, facing out
    tris.push([...d, ...c, ...down(c)], [...d, ...down(c), ...down(d)]);
  }
  return trianglesGeometry(tris);
}

/** Steps from the ledge at `at` down into the water towards `toward`, with `rails` wooden handrails across their width. */
function stairs(k, [ax, az], [tx, tz], width, rails) {
  const l = Math.hypot(tx - ax, tz - az) || 1;
  const [dx, dz] = [(tx - ax) / l, (tz - az) / l];
  const ang = -Math.atan2(dz, dx);
  const n = Math.round((LEDGE - BOTTOM) / 0.22);
  const rise = (LEDGE - BOTTOM) / n;
  for (let i = 0; i < n; i++) {
    const top = LEDGE - (i + 1) * rise;
    const x = ax + dx * (i + 0.5) * RUN,
      z = az + dz * (i + 0.5) * RUN;
    k.add(
      'pierStone',
      new THREE.BoxGeometry(RUN, top - BOTTOM + 0.1, width).translate(0, (top - BOTTOM + 0.1) / 2, 0),
      x,
      BOTTOM - 0.1,
      z,
      ang,
    );
  }
  // handrails: posts and a sloping rail, starting 1.2 m back on the ledge
  const [nx, nz] = [-dz, dx];
  const run = n * RUN;
  for (let r = 0; r < rails; r++) {
    const s = rails === 1 ? 0 : -width / 2 + 0.1 + ((width - 0.2) * r) / (rails - 1);
    const p = (along, y) => [ax + dx * along + nx * s, y, az + dz * along + nz * s];
    const yAt = (along) => (along <= 0 ? LEDGE : LEDGE - (along / run) * (LEDGE - BOTTOM));
    const stops = [-1.2, 0, run * 0.5, run];
    for (const a of stops) k.rod('weatheredWood', p(a, yAt(a)), p(a, yAt(a) + RAIL), 0.05, 6);
    for (let i = 1; i < stops.length; i++) {
      const [a0, a1] = [stops[i - 1], stops[i]];
      k.rod('weatheredWood', p(a0, yAt(a0) + RAIL), p(a1, yAt(a1) + RAIL), 0.045, 6);
    }
  }
}
