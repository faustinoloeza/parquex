import { encodeHeights, HEIGHT_GRID } from '#shared/formats/heightmap.js';
import { LAND, isWater } from '../classes.js';
import { fbm } from '../lib/noise.js';
import { blur, rasterizePolygon } from '../lib/raster.js';

/** Base height (m) per land cover class, indexed by LAND. */
const BASE_HEIGHT = [0, -1.8, -1.6, -1.3, 1.35, 1.0, 0.9, 0.55, 1.0, 1.7, 0.95];

/**
 * Stage 3 — terrain heights: sea floor deepening away from the shore, flat
 * pools and rivers, gently rolling land (flatter near the water).
 *
 * reads   lc, distLand, distWater, site.flattens
 * writes  sampleHeight(x, z)   smoothed terrain height in meters
 * output  height.bin
 */
export async function terrain(ctx) {
  const { grid, site } = ctx;
  const { N, pxPerM: PX_PER_M, toPx, toLocal, idx } = grid;
  const { lc, distLand, distWater } = ctx;

  const heights = new Float32Array(N * N);
  for (let v = 0; v < N; v++) {
    for (let u = 0; u < N; u++) {
      const i = v * N + u;
      const c = lc[i];
      const [x, z] = toLocal(u, v);
      if (c === LAND.SEA) {
        const d = distLand[i] / PX_PER_M;
        heights[i] = -(0.8 + Math.pow(Math.min(1, d / 50), 0.8) * 7.2);
      } else if (isWater(c)) {
        heights[i] = BASE_HEIGHT[c];
      } else {
        const shore = Math.min(1, distWater[i] / PX_PER_M / 18);
        const undulation = (fbm(x / 110, z / 110, 7) - 0.5) * 2.4 + (fbm(x / 35, z / 35, 3) - 0.5) * 0.6;
        heights[i] = BASE_HEIGHT[c] + undulation * shore * shore;
      }
    }
  }
  // flatten edits: level a square to the height at its center
  for (const f of site.flattens) {
    const [cu, cv] = toPx(f.x, f.z);
    const h0 = heights[idx(cu, cv)];
    const s = f.size / 2;
    rasterizePolygon(
      [
        [-s, -s],
        [s, -s],
        [s, s],
        [-s, s],
      ].map(([x, z]) => toPx(f.x + x, f.z + z)),
      N,
      N,
      (i) => {
        heights[i] = h0;
      },
    );
  }
  const smooth = blur(heights, N, N, 2, 2);

  /** Bilinear height (m) at local (x, z). */
  const sampleHeight = (x, z) => {
    const [u, v] = toPx(x, z);
    const u0 = Math.min(N - 2, Math.max(0, Math.floor(u))),
      v0 = Math.min(N - 2, Math.max(0, Math.floor(v)));
    const fu = Math.min(1, Math.max(0, u - u0)),
      fv = Math.min(1, Math.max(0, v - v0));
    const h = (a, b) => smooth[(v0 + b) * N + u0 + a];
    return h(0, 0) * (1 - fu) * (1 - fv) + h(1, 0) * fu * (1 - fv) + h(0, 1) * (1 - fu) * fv + h(1, 1) * fu * fv;
  };

  await ctx.write(
    'height.bin',
    encodeHeights((i, j) => {
      const u = (i / (HEIGHT_GRID - 1)) * (N - 1),
        v = (j / (HEIGHT_GRID - 1)) * (N - 1);
      const [x, z] = toLocal(u, v);
      return sampleHeight(x, z);
    }),
  );
  Object.assign(ctx, { sampleHeight, heightGrid: HEIGHT_GRID });
}
