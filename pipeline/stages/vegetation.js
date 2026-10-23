import { mulberry32 } from '#shared/random.js';
import { TREE, TREE_SHAPES, TREE_STRIDE, encodeVegetation } from '#shared/formats/vegetation.js';
import { LAND } from '../classes.js';
import { fbm } from '../lib/noise.js';
import { distanceTo } from '../lib/raster.js';
import { OBJECT_MARGIN } from '#shared/design-area.js';

/** Meters between candidate tree positions (jittered grid). */
const CELL = 4.1;
/**
 * Most trees written to vegetation.bin for a region (`region: true`): the app
 * draws at most a few thousand of them (quality → neighbors.regionTrees), so the
 * file keeps an even subset; the full set still bakes the ground shadows.
 */
export const REGION_MAX_TREES = 30000;

/**
 * Stage 6 — trees. A jittered grid of candidates; each one becomes a tree with
 * a probability that depends on the land cover (dense jungle, sparse lawn,
 * palms by the sea), never on buildings, landmarks or walkways, and only
 * inside the designed area (the real map shows beyond it).
 *
 * reads   lc, outsideSoft, designArea, occupied, distPath, distWater, distSea, sampleHeight, site
 * writes  trees   flat [x, y, z, scale, rotation, type, ...] (also vegetation.bin)
 */
export async function vegetation(ctx) {
  const { grid, extent, site, log } = ctx;
  const { pxPerM: PX_PER_M, toPx, idx, N } = grid;
  const { lc, outsideSoft, designArea, occupied, distPath, distWater, distSea, sampleHeight } = ctx;

  const trees = [];
  const rand = mulberry32(1234);
  const occDist = distanceTo(occupied, N, N);
  const x0 = extent.cx - extent.size / 2,
    z0 = extent.cz - extent.size / 2;
  const cells = Math.floor(extent.size / CELL);
  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      const x = x0 + (i + rand()) * CELL;
      const z = z0 + (j + rand()) * CELL;
      const [u, v] = toPx(x, z);
      const k = idx(u, v);
      const c = lc[k];
      if (outsideSoft[k] > 0.5 && rand() < 0.15) continue; // a bit sparser under the clouds
      if (occDist[k] / PX_PER_M < 2.5 || site.isCleared(x, z)) continue;
      const dPath = distPath[k] / PX_PER_M;
      const dWater = distWater[k] / PX_PER_M;
      const dSea = distSea[k] / PX_PER_M;
      let p = 0;
      if (c === LAND.FOREST) p = dWater < 1.5 ? 0.15 : 0.93;
      else if (c === LAND.LAWN) p = 0.045;
      else if ((c === LAND.SAND || c === LAND.ROCK) && dSea > 4) p = 0.07;
      else if (c === LAND.PLAZA && dSea < 40 && dPath > 0) p = 0.02;
      if (rand() > p) continue;
      let type;
      const palmP = dSea < 45 ? 0.6 : c === LAND.LAWN ? 0.25 : 0.05;
      if (rand() < palmP) type = TREE.PALM;
      else {
        const t = rand();
        type = t < 0.03 ? TREE.CEIBA : t < 0.55 ? TREE.BROAD : t < 0.88 ? TREE.BROAD_LIGHT : TREE.BUSH;
      }
      const scale = 0.78 + rand() * 0.5 + (fbm(x / 60, z / 60, 11) - 0.5) * 0.3;
      // keep walkways clear: the whole crown must stay off the path
      if (dPath < TREE_SHAPES[type].crown * scale * 0.85 + 0.6) continue;
      const rotation = rand() * Math.PI * 2; // drawn even when skipped: same trees as before for the same seed
      // irregular edge towards the real map beyond the designed area
      if (!designArea.contains(x, z, OBJECT_MARGIN + (fbm(x / 25, z / 25, 5) - 0.5) * 30)) continue;
      trees.push(x, sampleHeight(x, z), z, scale, rotation, type);
    }
  }
  const kept = ctx.park.region ? thinTrees(trees, REGION_MAX_TREES) : trees;
  await ctx.write('vegetation.bin', encodeVegetation(kept));
  log(`trees: ${trees.length / TREE_STRIDE}${kept !== trees ? ` (${kept.length / TREE_STRIDE} written)` : ''}`);
  ctx.trees = trees;
}

/**
 * Every k-th tree so that at most `max` remain (flat [x, y, z, scale, rotation,
 * type, ...]); the same array when it already fits.
 */
export function thinTrees(trees, max) {
  const count = trees.length / TREE_STRIDE;
  if (count <= max) return trees;
  const k = Math.ceil(count / max);
  const out = [];
  for (let i = 0; i < count; i += k) for (let s = 0; s < TREE_STRIDE; s++) out.push(trees[i * TREE_STRIDE + s]);
  return out;
}
