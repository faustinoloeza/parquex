import sharp from 'sharp';
import { COLOR, COLOR_COUNT, isWaterColor } from '../classes.js';
import { STROKES } from '../strokes.js';
import { hsv } from '../lib/color.js';
import { blur, components, fillUnknown, modeFilter } from '../lib/raster.js';
import { osmSeaMask } from '../lib/coastline.js';
import { classifySatellite } from './classify-satellite.js';

/**
 * Stage 1 — classify the official illustration by color (satellite-mode
 * parks: see classify-satellite.js, same products).
 *
 * reads   paths.illustration, park.sources (masks, seaCorner, waterHueMin), park.routes (strokes), osm coastline
 * writes  rawRGB, blurRGB   illustration resized to the grid (RGB)
 *         forced            painted overlays (logo) to re-fill
 *         cls1              color classes, smoothed, route strokes removed
 *         outside           1 where the illustration is hidden by clouds
 *         cls3              color classes with clouds filled (sea from the OSM coastline)
 */
export async function classify(ctx) {
  // parks without an official illustration: satellite imagery + OSM
  if (ctx.satellite) return classifySatellite(ctx);
  const { park, grid, osm, log } = ctx;
  const { N } = grid;
  const rawRGB = await sharp(ctx.paths.illustration).resize(N, N, { kernel: 'lanczos3' }).removeAlpha().raw().toBuffer();
  const blurRGB = await sharp(ctx.paths.illustration).resize(N, N, { kernel: 'lanczos3' }).removeAlpha().blur(1.1).raw().toBuffer();

  // ---------------------------------------------------------------- by color
  // lagoons painted in a greener teal (Xel-Há) start at a lower hue
  const waterHue = park.sources.waterHueMin ?? 170;
  const cls0 = new Uint8Array(N * N);
  for (let i = 0; i < N * N; i++) {
    const r = blurRGB[i * 3],
      g = blurRGB[i * 3 + 1],
      b = blurRGB[i * 3 + 2];
    const [h, s, v] = hsv(r, g, b);
    const warm = r - b;
    let c = COLOR.MISC;
    if (s < 0.09 && warm < 6 && v > 165)
      c = COLOR.UNKNOWN; // cloud
    else if (h >= waterHue && h <= 240 && s > 0.22 && b > r + 15)
      c = v < 115 ? COLOR.DARKWATER : v > 175 && s < 0.6 ? COLOR.POOL : COLOR.SEA;
    else if (h >= 60 && h < 170 && s > 0.2) c = v < 135 ? COLOR.FOREST : COLOR.LAWN;
    else if (s < 0.2 && v > 190 && warm >= 6) c = COLOR.PATH;
    else if (h >= 25 && h < 60 && s >= 0.12 && v > 120) c = v > 200 ? COLOR.SAND : COLOR.THATCH;
    else if ((h < 25 || h > 340) && s > 0.3) c = COLOR.ROOF;
    else if (s < 0.2 && v <= 190) c = COLOR.STONE;
    cls0[i] = c;
  }
  // painted overlays (the logo) are re-filled from their surroundings
  const forced = new Uint8Array(N * N);
  for (const [x0, y0, x1, y1] of park.sources.illustration.masks) {
    for (let v = Math.floor(y0 * N); v < y1 * N; v++) for (let u = Math.floor(x0 * N); u < x1 * N; u++) forced[v * N + u] = 1;
  }
  const cls1 = modeFilter(cls0, N, N, 2, COLOR_COUNT);
  for (let i = 0; i < cls1.length; i++) if (forced[i]) cls1[i] = COLOR.FOREST;

  // ------------------------------------------------- remove the route strokes
  // each stroke pixel takes the most common class around it (the lines are
  // re-drawn in 3D)
  {
    const tests = park.routes.map((r) => STROKES[r.stroke]?.test).filter(Boolean);
    const stroke = new Uint8Array(N * N);
    for (let i = 0; i < N * N; i++) {
      const r = rawRGB[i * 3],
        g = rawRGB[i * 3 + 1],
        b = rawRGB[i * 3 + 2];
      if (tests.some((t) => t(r, g, b))) stroke[i] = 1;
    }
    const grown = Uint8Array.from(stroke);
    for (let v = 1; v < N - 1; v++) {
      for (let u = 1; u < N - 1; u++) {
        const i = v * N + u;
        if (stroke[i]) for (const j of [i - 1, i + 1, i - N, i + N]) grown[j] = 1;
      }
    }
    const counts = new Int32Array(COLOR_COUNT);
    let fixed = 0;
    for (let v = 0; v < N; v++) {
      for (let u = 0; u < N; u++) {
        const i = v * N + u;
        if (!grown[i]) continue;
        counts.fill(0);
        for (let dv = -4; dv <= 4; dv++) {
          for (let du = -4; du <= 4; du++) {
            const uu = u + du,
              vv = v + dv;
            if (uu < 0 || vv < 0 || uu >= N || vv >= N) continue;
            const j = vv * N + uu;
            if (!grown[j]) counts[cls1[j]]++;
          }
        }
        let best = cls1[i],
          bc = 0;
        for (let c = 0; c < COLOR_COUNT; c++) {
          if (counts[c] > bc) {
            bc = counts[c];
            best = c;
          }
        }
        if (bc) {
          cls1[i] = best;
          fixed++;
        }
      }
    }
    log(`route stroke pixels removed from land cover: ${fixed}`);
  }

  // ------------------------------------------------------------------ clouds
  // The clouds are a whitish veil (low saturation, neutral or cool tint).
  // Anything foggy connected to the image border is unknown and gets
  // extrapolated from the nearest clear pixel.
  const fogPix = new Float32Array(N * N);
  for (let i = 0; i < fogPix.length; i++) {
    const r = blurRGB[i * 3],
      g = blurRGB[i * 3 + 1],
      b = blurRGB[i * 3 + 2];
    const [, s, v] = hsv(r, g, b);
    fogPix[i] = cls1[i] === COLOR.UNKNOWN || (s < 0.17 && r - b < 9 && v > 150) ? 1 : 0;
  }
  const fogFrac = blur(fogPix, N, N, 6, 2);
  const cls2 = Uint8Array.from(cls1);
  const SOFT = new Set([COLOR.STONE, COLOR.MISC, COLOR.PATH, COLOR.POOL, COLOR.LAWN, COLOR.SAND, COLOR.THATCH]);
  for (let i = 0; i < cls2.length; i++) {
    const f = fogFrac[i];
    if (f > 0.4 || (f > 0.12 && SOFT.has(cls2[i]))) cls2[i] = COLOR.UNKNOWN;
  }
  {
    const { comps } = components(N * N, N, N, (i) => cls2[i] === COLOR.UNKNOWN);
    for (const comp of comps) {
      const touchesBorder = comp.pixels.some((i) => {
        const x = i % N,
          y = (i / N) | 0;
        return x === 0 || y === 0 || x === N - 1 || y === N - 1;
      });
      if (touchesBorder) continue;
      for (const i of comp.pixels) cls2[i] = cls1[i] === COLOR.UNKNOWN ? COLOR.PATH : cls1[i];
    }
  }
  for (let i = 0; i < cls2.length; i++) if (forced[i]) cls2[i] = COLOR.UNKNOWN;
  const outside = new Uint8Array(N * N);
  for (let i = 0; i < outside.length; i++) outside[i] = cls2[i] === COLOR.UNKNOWN && !forced[i] ? 1 : 0;

  // Under the clouds, land and sea come from the OpenStreetMap coastline:
  // rasterize it as a barrier and flood the sea from a pixel of open water.
  const osmSea = osmSeaMask(osm, grid, park.sources.seaCorner);
  for (let i = 0; i < cls2.length; i++) if (outside[i]) cls2[i] = osmSea[i] ? COLOR.SEA : COLOR.FOREST;
  const cls3 = fillUnknown(cls2, N, N, COLOR.UNKNOWN, (c) => (isWaterColor(c) ? COLOR.SEA : COLOR.FOREST));

  Object.assign(ctx, { rawRGB, blurRGB, forced, cls1, outside, cls3 });
}
