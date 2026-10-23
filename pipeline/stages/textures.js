import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { SUN_DIRECTION } from '#shared/scene.js';
import { TREE_SHAPES, TREE_STRIDE } from '#shared/formats/vegetation.js';
import { LAND, isPaved, isWater } from '../classes.js';
import { DEBUG_DIR } from '../context.js';
import { fbm, hash2 } from '../lib/noise.js';
import { blur, components, distanceTo, rasterizePolygon } from '../lib/raster.js';
import { WATER_SDF, WATER_SIZE } from '#shared/formats/water.js';
import { PAVING_FILE, PAVING_SIZE } from '#shared/formats/paving.js';
import { GROUND_LEVELS, GROUND_TILE_SIZE, groundTileId, groundTilePath, groundTileRect } from '#shared/formats/ground-tiles.js';
import { movedDesignArea, parkOffset } from '#shared/neighbors.js';

/**
 * Base ground color per land cover class (RGB): a clean, soft pastel palette
 * (fresh lawn green, warm light beige walkways, cream plazas) with little noise,
 * like a stylized 3D city map.
 */
export const GROUND_COLORS = {
  [LAND.SEA]: [214, 204, 166],
  [LAND.LAGOON]: [150, 168, 140],
  [LAND.RIVER]: [70, 82, 70],
  [LAND.POOL]: [200, 226, 226],
  [LAND.FOREST]: [84, 134, 56],
  [LAND.LAWN]: [134, 194, 94],
  [LAND.PATH]: [240, 226, 196], // warm light beige
  [LAND.SAND]: [244, 232, 200],
  [LAND.PLAZA]: [238, 230, 212], // cream stone paving
  [LAND.ROCK]: [206, 196, 172],
  [LAND.DIRT]: [206, 176, 130], // packed ochre earth (trails, vehicle tracks)
};
/**
 * Ground noise amplitudes: `broad` / `fine` brightness of the fbm noise (18 m
 * and 4 m), `grain` per-pixel grain (±, in 0..255 units), `joint` darkening of
 * the flagstone joints, `slab` tone spread between flagstones.
 */
const GROUND_NOISE = { broad: 0.07, fine: 0.03, grain: 4, joint: 0.08, slab: 0.04 };
/** Full ground texture size (px); the grid is upscaled and given a fine grain. */
const GROUND_SIZE = GROUND_TILE_SIZE * 2 ** (GROUND_LEVELS - 1);

/**
 * Stage 7 — textures for the app.
 *  ground/*.webp  stylized ground color: land cover colors, noise, darker grass
 *                 by the jungle, stone curbs along walkways, flagstone joints on
 *                 walkways and plazas (not on dirt tracks: grainy earth with
 *                 soft darker edges), baked tree shadows; as a tile pyramid
 *                 (shared/formats/ground-tiles.js)
 *  water.png      signed distance to the shore + tint (shared/formats/water.js)
 *  paving.png     coverage of walkways + plazas (not dirt) for the mobile export (shared/formats/paving.js)
 *  data/debug/<park>-landcover.png   land cover classes (clouds darker)
 *
 * reads   lc, pathMask, distPath, distLand, distWater, waterMask, outside, trees, designArea, osm
 * writes  groundTiles   ids of the ground tiles written
 */
export async function textures(ctx) {
  await groundTexture(ctx);
  await waterTexture(ctx);
  await pavingMask(ctx);
  await debugLandcover(ctx);
}

async function groundTexture(ctx) {
  const { grid, lc, pathMask, distPath, distLand, trees } = ctx;
  const { N, pxPerM: PX_PER_M, toPx, toLocal, idx } = grid;
  const forest = new Float32Array(N * N);
  for (let i = 0; i < forest.length; i++) forest[i] = lc[i] === LAND.FOREST ? 1 : 0;
  const forestAO = blur(forest, N, N, 4, 2);
  // stone paving only (pathMask also holds the dirt tracks, which get no curbs);
  // without dirt it is pathMask itself
  let hasDirt = false;
  for (let i = 0; i < lc.length && !hasDirt; i++) hasDirt = lc[i] === LAND.DIRT;
  let stoneMask = pathMask,
    distStone = distPath;
  if (hasDirt) {
    stoneMask = new Uint8Array(N * N);
    for (let i = 0; i < lc.length; i++) stoneMask[i] = isPaved(lc[i]) ? 1 : 0;
    distStone = distanceTo(stoneMask, N, N);
  }
  const pathF = new Float32Array(N * N);
  for (let i = 0; i < pathF.length; i++) pathF[i] = stoneMask[i];
  const pathSoft = blur(pathF, N, N, 1, 2);
  // dirt tracks: soft darker edges where they meet the vegetation
  let dirtSoft = null;
  if (hasDirt) {
    const dirtF = new Float32Array(N * N);
    for (let i = 0; i < dirtF.length; i++) dirtF[i] = lc[i] === LAND.DIRT ? 1 : 0;
    dirtSoft = blur(dirtF, N, N, 1, 2);
  }

  // baked soft tree shadows, cast away from the sun (same sun as the 3D scene)
  const SUN = SUN_DIRECTION;
  const sunH = Math.hypot(SUN[0], SUN[2]);
  const shadowDir = [-SUN[0] / sunH, -SUN[2] / sunH];
  const shadowLen = sunH / SUN[1]; // horizontal meters per meter of height
  const shadow = new Float32Array(N * N);
  for (let t = 0; t < trees.length; t += TREE_STRIDE) {
    const shape = TREE_SHAPES[trees[t + 5]],
      s = trees[t + 3];
    const rad = shape.shadow * s * PX_PER_M;
    const off = shape.height * s * shadowLen;
    const [u, v] = toPx(trees[t] + shadowDir[0] * off, trees[t + 2] + shadowDir[1] * off);
    const r0 = Math.ceil(rad);
    for (let dv = -r0; dv <= r0; dv++) {
      for (let du = -r0; du <= r0; du++) {
        const d = Math.hypot(du, dv) / rad;
        if (d >= 1) continue;
        const k = idx(u + du, v + dv);
        shadow[k] = Math.max(shadow[k], (1 - d * d) * 0.55);
      }
    }
  }
  const shadowSoft = blur(shadow, N, N, 1, 2);
  const grade = await groundGrade(ctx);

  const img = Buffer.alloc(N * N * 3);
  for (let v = 0; v < N; v++) {
    for (let u = 0; u < N; u++) {
      const i = v * N + u;
      const c = lc[i];
      const [x, z] = toLocal(u, v);
      let [r, g, b] = GROUND_COLORS[c];
      if (grade && c === LAND.FOREST && grade.w[i] > 0) {
        // sources.groundGrade: jungle lifted towards the lawn green (see groundGrade)
        const t = grade.w[i] * grade.lawn,
          L = GROUND_COLORS[LAND.LAWN];
        r += (L[0] - r) * t;
        g += (L[1] - g) * t;
        b += (L[2] - b) * t;
      }
      const n1 = fbm(x / 18, z / 18, 5) - 0.5;
      const n2 = fbm(x / 4, z / 4, 9) - 0.5;
      let k = 1 + n1 * GROUND_NOISE.broad + n2 * GROUND_NOISE.fine;
      if (c === LAND.LAWN) {
        // faint yellowish patches + softly darker grass near the jungle edge
        const dry = Math.max(0, fbm(x / 40, z / 40, 21) - 0.55) * 0.9;
        r += dry * 30;
        g += dry * 14;
        b += dry * 6;
        k *= 1 - forestAO[i] * 0.22;
      }
      if (c === LAND.PATH || c === LAND.PLAZA) {
        k *= 1 - (1 - pathSoft[i]) * 0.12; // darker rim at the path edges
        k = 1 + (k - 1) * 0.4;
        if (c === LAND.PATH) {
          r += 6;
          g += 6;
          b += 4;
        }
      } else if (c === LAND.DIRT) {
        // packed earth: coarser, rutted grain and darker edges, no paving pattern
        const ruts = fbm(x / 1.6, z / 1.6, 31) - 0.5;
        k = 1 + n1 * 0.1 + n2 * 0.12 + ruts * 0.14;
        k *= 1 - (1 - dirtSoft[i]) * 0.14;
      } else if (!isWater(c) && distStone[i] / PX_PER_M < 0.9 && c !== LAND.SAND) {
        // stone curb along the walkways so they read clearly from above
        const t = 1 - distStone[i] / PX_PER_M / 0.9;
        r = r + (198 - r) * t * 0.65;
        g = g + (184 - g) * t * 0.65;
        b = b + (154 - b) * t * 0.65;
      }
      if (c === LAND.SEA || isWater(c)) {
        const d = distLand[i] / PX_PER_M;
        k *= 1 - Math.min(1, d / 30) * 0.35;
      }
      k *= 1 - shadowSoft[i] * (c === LAND.FOREST ? 0.3 : 0.48); // soft baked tree shadows
      img[i * 3] = Math.max(0, Math.min(255, r * k));
      img[i * 3 + 1] = Math.max(0, Math.min(255, g * k));
      img[i * 3 + 2] = Math.max(0, Math.min(255, b * k));
    }
  }
  const S = GROUND_SIZE;
  const up = await sharp(img, { raw: { width: N, height: N, channels: 3 } })
    .resize(S, S, { kernel: 'cubic' })
    .raw()
    .toBuffer();
  // walkways and plazas are stone paving: weight of the paved classes at full
  // resolution (bilinear from the grid) for the flagstone pattern below
  const paved = new Float32Array(N * N);
  for (let i = 0; i < paved.length; i++) paved[i] = isPaved(lc[i]) ? 1 : 0;
  const f = N / S;
  const pavedAt = (u, v) => {
    const gx = Math.max(0, Math.min(N - 1.001, (u + 0.5) * f - 0.5)),
      gy = Math.max(0, Math.min(N - 1.001, (v + 0.5) * f - 0.5));
    const x0 = gx | 0,
      y0 = gy | 0,
      tx = gx - x0,
      ty = gy - y0;
    const a = paved[y0 * N + x0],
      b = paved[y0 * N + x0 + 1],
      c = paved[(y0 + 1) * N + x0],
      d = paved[(y0 + 1) * N + x0 + 1];
    return (a * (1 - tx) + b * tx) * (1 - ty) + (c * (1 - tx) + d * tx) * ty;
  };
  const mPerPx = ctx.extent.size / S;
  // fine grain at full resolution
  for (let v = 0; v < S; v++) {
    for (let u = 0; u < S; u++) {
      const i = (v * S + u) * 3;
      let n = (hash2(u, v, 3) - 0.5) * 2 * GROUND_NOISE.grain;
      let k = 1;
      const w = pavedAt(u, v);
      if (w > 0.02) {
        const x = ctx.extent.cx + (u / S - 0.5) * ctx.extent.size,
          z = ctx.extent.cz + (v / S - 0.5) * ctx.extent.size;
        const [joint, tone] = flagstone(x, z, mPerPx);
        k = 1 + w * (tone - joint * GROUND_NOISE.joint);
        n *= 1 - w * 0.4;
      }
      up[i] = Math.max(0, Math.min(255, up[i] * k + n));
      up[i + 1] = Math.max(0, Math.min(255, up[i + 1] * k + n));
      up[i + 2] = Math.max(0, Math.min(255, up[i + 2] * k + n));
    }
  }
  await writeGroundTiles(ctx, up, S);
}

const smoothstep = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/**
 * Weights (0..1 per grid pixel) of `sources.groundGrade` (src/parks/xcr), or
 * null without one. A region classified from satellite imagery is almost all
 * jungle, while the illustrated park next to it (Xcaret: ≈ 60 % jungle, 40 %
 * lawn in its edge band) reads lighter, so their seam shows a tone change.
 * The jungle of the region is lifted towards the lawn color by `lawn` × w:
 * w = 1 at the outline of the park `toward`, easing to 0 `reach` m away, and
 * held at 0 along the parks of `keep` (satellite parks with the same jungle as
 * the region: their seams stay as they are), easing in over `keepReach` m.
 * Outlines come from the built park.json of those parks (public/parks), moved
 * into this park's frame; a missing one is skipped with a warning.
 */
async function groundGrade(ctx) {
  const opts = ctx.park.sources.groundGrade;
  if (!opts) return null;
  const area = async (key) => {
    try {
      const p = JSON.parse(await fs.readFile(path.resolve('public/parks', key, 'park.json'), 'utf8'));
      return movedDesignArea(p.clear, parkOffset(ctx.center, p.center));
    } catch {
      ctx.log(`groundGrade: no park.json for ${key} (build it first); left out`);
      return null;
    }
  };
  const toward = await area(opts.toward);
  if (!toward) return null;
  const keep = (await Promise.all((opts.keep ?? []).map(area))).filter(Boolean);
  const { N, toLocal } = ctx.grid;
  // the weights are smooth: evaluate them on a coarse lattice and interpolate
  const STEP = 8,
    M = Math.ceil(N / STEP) + 1;
  const coarse = new Float32Array(M * M);
  for (let j = 0; j < M; j++) {
    for (let i = 0; i < M; i++) {
      const [x, z] = toLocal(i * STEP, j * STEP);
      let w = 1 - smoothstep(0, opts.reach, toward.signedDistance(x, z));
      for (const k of keep) w *= smoothstep(0, opts.keepReach ?? 250, k.signedDistance(x, z));
      coarse[j * M + i] = w;
    }
  }
  const w = new Float32Array(N * N);
  for (let v = 0; v < N; v++) {
    const fy = v / STEP,
      j = Math.min(M - 2, fy | 0),
      ty = fy - j;
    for (let u = 0; u < N; u++) {
      const fx = u / STEP,
        i = Math.min(M - 2, fx | 0),
        tx = fx - i;
      const a = coarse[j * M + i],
        b = coarse[j * M + i + 1],
        c = coarse[(j + 1) * M + i],
        d = coarse[(j + 1) * M + i + 1];
      w[v * N + u] = (a + (b - a) * tx) * (1 - ty) + (c + (d - c) * tx) * ty;
    }
  }
  return { w, lawn: opts.lawn };
}

/** Size (m) of the flagstones of the paving pattern. */
const FLAGSTONE = 1.15;

/**
 * Irregular flagstone paving at (x, z) meters: Voronoi cells on a jittered
 * grid. Returns [joint 0..1 (antialiased over one pixel), tone offset of the
 * slab]. Deterministic (hashes of the cell).
 */
function flagstone(x, z, mPerPx) {
  const gx = x / FLAGSTONE,
    gz = z / FLAGSTONE;
  const cx = Math.floor(gx),
    cz = Math.floor(gz);
  let d1 = Infinity,
    d2 = Infinity,
    id1 = 0;
  for (let j = -1; j <= 1; j++) {
    for (let i = -1; i <= 1; i++) {
      const px = cx + i + 0.15 + hash2(cx + i, cz + j, 41) * 0.7,
        pz = cz + j + 0.15 + hash2(cx + i, cz + j, 43) * 0.7;
      const d = Math.hypot(gx - px, gz - pz);
      if (d < d1) {
        d2 = d1;
        d1 = d;
        id1 = (cx + i) * 7919 + (cz + j);
      } else if (d < d2) d2 = d;
    }
  }
  const edge = ((d2 - d1) / 2) * FLAGSTONE; // meters to the slab border
  const joint = Math.max(0, Math.min(1, 1 - (edge - 0.03) / mPerPx));
  const tone = (hash2(id1, 7, 47) - 0.5) * 2 * GROUND_NOISE.slab;
  return [joint, tone];
}

/**
 * Cuts the full ground image into the tile pyramid; skips tiles beyond the
 * designed area. A region (`region: true`, src/parks/xcr) only gets the
 * overview tile: the app never streams finer ones for it.
 */
async function writeGroundTiles(ctx, image, S) {
  const { extent, designArea } = ctx;
  const levels = ctx.park.region ? 1 : GROUND_LEVELS;
  await ctx.remove('ground.webp'); // single-image format of older builds
  await ctx.remove('ground');
  const full = sharp(image, { raw: { width: S, height: S, channels: 3 } });
  const tiles = [];
  for (let level = 0; level < levels; level++) {
    const n = 2 ** level,
      span = S / n;
    for (let j = 0; j < n; j++) {
      for (let i = 0; i < n; i++) {
        if (level > 0 && !designArea.touchesRect(...groundTileRect(extent, level, i, j))) continue;
        const id = groundTileId(level, i, j);
        const tile = await full
          .clone()
          .extract({ left: i * span, top: j * span, width: span, height: span })
          .resize(GROUND_TILE_SIZE, GROUND_TILE_SIZE, { kernel: 'lanczos3' })
          .webp({ quality: 82, effort: 5 })
          .toBuffer();
        await ctx.write(groundTilePath(id), tile);
        tiles.push(id);
      }
    }
  }
  ctx.log(`ground tiles: ${tiles.length}`);
  ctx.groundTiles = tiles;
}

async function waterTexture(ctx) {
  const { grid, lc, waterMask, distLand, distWater } = ctx;
  const { N, pxPerM: PX_PER_M } = grid;
  // signed distance to the shore in meters (> 0 in the water) and tint
  const sdf = new Float32Array(N * N),
    tint = new Float32Array(N * N);
  const TINT = { [LAND.SEA]: 0, [LAND.LAGOON]: 0.45, [LAND.POOL]: 0.25, [LAND.RIVER]: 1 };
  for (let i = 0; i < lc.length; i++) {
    sdf[i] = waterMask[i] ? (distLand[i] - 0.5) / PX_PER_M : -(distWater[i] - 0.5) / PX_PER_M;
    tint[i] = waterMask[i] ? TINT[lc[i]] : 0.5;
  }
  const tintS = blur(tint, N, N, 3, 2);
  // box-downsample to WATER_SIZE (a distance field averages well)
  const S = WATER_SIZE,
    f = N / S;
  const img = Buffer.alloc(S * S * 3);
  for (let v = 0; v < S; v++) {
    for (let u = 0; u < S; u++) {
      let d = 0,
        t = 0;
      for (let b = 0; b < f; b++) {
        for (let a = 0; a < f; a++) {
          const i = (v * f + b) * N + u * f + a;
          d += sdf[i];
          t += tintS[i];
        }
      }
      d /= f * f;
      t /= f * f;
      const o = (v * S + u) * 3;
      img[o] = Math.round(Math.min(1, Math.max(0, (d - WATER_SDF.min) / (WATER_SDF.max - WATER_SDF.min))) * 255);
      img[o + 1] = Math.round(t * 255);
    }
  }
  await ctx.write(
    'water.png',
    await sharp(img, { raw: { width: S, height: S, channels: 3 } })
      .png({ compressionLevel: 9 })
      .toBuffer(),
  );
}

/** Streets drawn by the real map (OSM) that are not park paving. */
const STREETS = new Set(['primary', 'secondary', 'tertiary', 'tertiary_link', 'unclassified', 'residential', 'service']);
/** Paved patches smaller than this (m²) are dropped (stray illustration pixels). */
const MIN_PAVED_AREA = 40;

/**
 * Box-downsampled coverage of the paved classes for the mobile export, faded
 * out with the designed area. Parking lots and streets of OpenStreetMap are
 * left out (the real map below already draws them) and so are tiny patches.
 */
async function pavingMask(ctx) {
  const { grid, lc, designArea, osm, extent } = ctx;
  const { N, toLocal } = grid;
  const S = PAVING_SIZE,
    f = N / S,
    cellM = extent.size / S;
  const cover = new Float32Array(S * S);
  for (let v = 0; v < S; v++) {
    for (let u = 0; u < S; u++) {
      let n = 0;
      for (let b = 0; b < f; b++) {
        for (let a = 0; a < f; a++) {
          const c = lc[(v * f + b) * N + u * f + a];
          if (isPaved(c)) n++; // dirt tracks are not paving
        }
      }
      if (!n) continue;
      const [x, z] = toLocal((u + 0.5) * f, (v + 0.5) * f);
      cover[v * S + u] = (n / (f * f)) * (1 - designArea.fade(x, z));
    }
  }
  // streets and parking lots of the real map
  const toCell = ([x, z]) => [((x - extent.cx) / extent.size + 0.5) * S, ((z - extent.cz) / extent.size + 0.5) * S];
  for (const w of osm.elements) {
    if (w.type !== 'way' || !w.tags) continue;
    if (w.tags.amenity === 'parking' && osm.isClosed(w)) rasterizePolygon(osm.wayPoints(w).map(toCell), S, S, (i) => (cover[i] = 0));
    if (!STREETS.has(w.tags.highway)) continue;
    const pts = osm.wayPoints(w).map(toCell);
    const rad = 4 / cellM;
    for (let k = 1; k < pts.length; k++) {
      const [u0, v0] = pts[k - 1],
        [u1, v1] = pts[k];
      const steps = Math.ceil(Math.hypot(u1 - u0, v1 - v0) * 2) + 1;
      for (let st = 0; st <= steps; st++) {
        const u = u0 + ((u1 - u0) * st) / steps,
          v = v0 + ((v1 - v0) * st) / steps;
        for (let dv = -Math.ceil(rad); dv <= rad; dv++) {
          for (let du = -Math.ceil(rad); du <= rad; du++) {
            const uu = Math.round(u + du),
              vv = Math.round(v + dv);
            if (du * du + dv * dv <= rad * rad && uu >= 0 && vv >= 0 && uu < S && vv < S) cover[vv * S + uu] = 0;
          }
        }
      }
    }
  }
  // stray specks
  const { comps } = components(S * S, S, S, (i) => cover[i] >= 0.5);
  for (const { pixels } of comps) if (pixels.length * cellM * cellM < MIN_PAVED_AREA) for (const i of pixels) cover[i] = 0;
  const img = Buffer.alloc(S * S);
  for (let i = 0; i < img.length; i++) img[i] = Math.round(cover[i] * 255);
  await ctx.write(
    PAVING_FILE,
    await sharp(img, { raw: { width: S, height: S, channels: 1 } })
      .png({ compressionLevel: 9 })
      .toBuffer(),
  );
}

async function debugLandcover(ctx) {
  const { grid, lc, outside, key } = ctx;
  const { N } = grid;
  const PALETTE = [
    [40, 140, 175],
    [80, 180, 170],
    [25, 45, 95],
    [140, 225, 240],
    [35, 95, 25],
    [150, 200, 80],
    [240, 232, 205],
    [240, 225, 180],
    [200, 190, 175],
    [150, 140, 120],
    [190, 150, 95],
  ];
  const img = Buffer.alloc(N * N * 3);
  for (let i = 0; i < lc.length; i++) img.set(outside[i] ? PALETTE[lc[i]].map((v) => v * 0.7) : PALETTE[lc[i]], i * 3);
  await fs.mkdir(DEBUG_DIR, { recursive: true });
  await sharp(img, { raw: { width: N, height: N, channels: 3 } })
    .resize(1024)
    .png()
    .toFile(path.join(DEBUG_DIR, `${key}-landcover.png`));
}
