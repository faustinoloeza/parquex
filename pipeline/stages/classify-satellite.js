import sharp from 'sharp';
import { COLOR, COLOR_COUNT, isWaterColor } from '../classes.js';
import { hsv } from '../lib/color.js';
import { blur, components, distanceTo, fillUnknown, modeFilter, rasterizePolygon } from '../lib/raster.js';
import { osmSeaMask } from '../lib/coastline.js';

/**
 * Stage 1 for parks without an official illustration (`sources.mode:
 * 'satellite'`): the color classes come from OpenStreetMap first and from the
 * satellite image (data/raw/<key>-satellite.jpg, `pnpm data:satellite`) for
 * the rest. Same products as the illustration classifier (classify.js), so the
 * later stages run unchanged.
 *
 * reads   paths.satellite, osm, park.sources (osmPark or outline, seaCorner, greenWater)
 * writes  rawRGB, blurRGB   satellite image resized to the grid (RGB)
 *         forced            all 0 (no painted overlays)
 *         cls1, cls3        color classes (identical: nothing is hidden)
 *         outside           1 beyond the park outline (`sources.outline`, else
 *                           the OSM `osmPark` polygon) + PARK_MARGIN (the
 *                           designed area follows the park boundary)
 *         osmSea            1 on the sea side of the OSM coastline (landcover:
 *                           only water there is open sea)
 */
export async function classifySatellite(ctx) {
  const { grid, paths, log } = ctx;
  const { N } = grid;
  const load = (blurSigma) => {
    let img = sharp(paths.satellite).resize(N, N, { kernel: 'lanczos3' }).removeAlpha();
    if (blurSigma) img = img.blur(blurSigma);
    return img.raw().toBuffer();
  };
  let rawRGB, blurRGB;
  try {
    [rawRGB, blurRGB] = await Promise.all([load(0), load(1.2)]);
  } catch {
    throw new Error(`${ctx.key}: needs ${paths.satellite} — run \`pnpm data:fetch ${ctx.key}\` or \`pnpm data:satellite ${ctx.key}\``);
  }
  const out = classifySatelliteRaster({ ...ctx, rawRGB, blurRGB });
  log(
    `satellite classes: ${Object.entries(out.stats)
      .map(([k, v]) => `${k} ${v}%`)
      .join(', ')}; inside the park outline ${out.insidePct}%`,
  );
  Object.assign(ctx, { rawRGB, blurRGB, forced: out.forced, cls1: out.cls, cls3: out.cls, outside: out.outside, osmSea: out.osmSea });
}

/** Meters around the park outline still drawn as the designed park. */
export const PARK_MARGIN = 25;

/** OSM highways painted as walkways (full width in meters). */
const WALK_WIDTH = { footway: 2.6, pedestrian: 3.5, path: 2, steps: 2.4, cycleway: 2.4, track: 3, bridleway: 2 };
/** OSM roads painted as paved ground (full width in meters). */
const ROAD_WIDTH = {
  trunk: 14,
  trunk_link: 7,
  primary: 11,
  secondary: 9,
  secondary_link: 6,
  tertiary: 7,
  tertiary_link: 6,
  unclassified: 6,
  residential: 5,
  living_street: 5,
  service: 4.5,
};
/** OSM waterways painted as rivers / canals (full width in meters, unless tagged). */
const WATERWAY_WIDTH = { river: 8, canal: 5, stream: 2.5, ditch: 1.5, drain: 1.5 };

/** Excess green (2G − R − B) from which a satellite pixel is vegetation. */
const CANOPY_EXG = 22;
/** Local brightness deviation (0..255, over ~2 m) above which green reads as tree crowns. */
const CANOPY_TEXTURE = 6;
/**
 * `sources.greenWater`: murky green canals and ponds (Xoximilco). Their water is
 * a smooth yellowish green (hue ≈ 88–98°, brightness ≈ 90–135) while the
 * canopy around them is darker, bluer (hue ≈ 105–118°) and rough. Thresholds:
 * min excess green, max hue (degrees), min brightness, max local deviation;
 * then blobs under `minArea` m² (lit crowns) are dropped, gaps narrower than
 * 2 × `close` m (overhanging crowns, boats, bridges) are closed and enclosed
 * land under `hole` m² is filled.
 */
const GREEN_WATER = { exg: 40, hueMax: 102, minLum: 75, texture: 9, minArea: 200, close: 4, hole: 40 };

/**
 * Satellite pixel (blurred RGB) → color class. Tuned on hazy Esri imagery of
 * the Riviera Maya jungle: canopy is an olive green (excess green 2G − R − B
 * ≈ 25–60, brightness ≈ 85–125), walkways and plazas are bright and greyish
 * beige, open scrub is a dull brownish green, water is blue / turquoise.
 */
export function satelliteColorClass(r, g, b) {
  const [h, s] = hsv(r, g, b);
  const L = (r + g + b) / 3;
  const exg = 2 * g - r - b;
  if (b > r + 12 && b >= g - 6 && s > 0.15 && h >= 160 && h <= 235) return L > 140 ? COLOR.POOL : COLOR.SEA;
  if (L < 70) return COLOR.FOREST; // shadows under the canopy
  if (exg >= CANOPY_EXG && g >= r) return L < 135 ? COLOR.FOREST : COLOR.LAWN;
  if ((h < 25 || h > 340) && s > 0.3 && r > g + 25) return COLOR.ROOF; // terracotta
  if (L >= 150 && s < 0.3) return COLOR.PATH; // paving, bare limestone, sand
  if (exg >= 4) return COLOR.LAWN; // open scrub, dry grass
  return COLOR.STONE; // grey / brown built ground
}

/**
 * Murky green water (`sources.greenWater`, see GREEN_WATER): smooth, yellowish
 * green, not dark; specks dropped, narrow gaps closed, small islands filled.
 * @returns {Uint8Array} 1 = water
 */
function greenWaterMask(rgb, lum, mean, mean2, N, pxPerM) {
  const T = GREEN_WATER;
  const m = new Uint8Array(N * N);
  for (let i = 0; i < N * N; i++) {
    const r = rgb[i * 3],
      g = rgb[i * 3 + 1],
      b = rgb[i * 3 + 2];
    const dev = Math.sqrt(Math.max(0, mean2[i] - mean[i] * mean[i]));
    if (2 * g - r - b >= T.exg && hsv(r, g, b)[0] <= T.hueMax && lum[i] >= T.minLum && dev < T.texture) m[i] = 1;
  }
  const px2 = pxPerM * pxPerM;
  for (const comp of components(N * N, N, N, (i) => m[i]).comps)
    if (comp.pixels.length / px2 < T.minArea) for (const i of comp.pixels) m[i] = 0;
  // closing: grow by `close` m, then shrink back
  const grown = distanceTo(m, N, N);
  const dry = new Uint8Array(N * N);
  for (let i = 0; i < N * N; i++) dry[i] = grown[i] / pxPerM > T.close ? 1 : 0;
  const shrunk = distanceTo(dry, N, N);
  for (let i = 0; i < N * N; i++) if (shrunk[i] / pxPerM > T.close) m[i] = 1;
  for (const comp of components(N * N, N, N, (i) => !m[i]).comps)
    if (comp.pixels.length / px2 < T.hole) for (const i of comp.pixels) m[i] = 1;
  return m;
}

/** Boats out at sea (satellite parks with a `seaCorner`): blobs up to maxArea m², all farther than offshore m from land. */
const BOAT = { maxArea: 3000, offshore: 40 };

/** Smallest blob (m²) kept per class after the majority filter; smaller ones melt into their surroundings. */
const MIN_AREA = {
  [COLOR.PATH]: 8,
  [COLOR.LAWN]: 60,
  [COLOR.POOL]: 12,
  [COLOR.SEA]: 20,
  [COLOR.STONE]: 12,
  [COLOR.ROOF]: 12,
};

/**
 * Pure part of the satellite classifier (testable on synthetic rasters).
 * @param {object} p
 * @param {{ N: number, pxPerM: number, toPx: Function }} p.grid
 * @param {Uint8Array|Buffer} p.blurRGB   N × N RGB
 * @param {ReturnType<import('../lib/osm.js').makeOsm>} p.osm
 * @param {{ sources: object }} p.park
 */
export function classifySatelliteRaster({ grid, blurRGB, osm, park }) {
  const { N, pxPerM, toPx } = grid;
  const src = park.sources;

  // ------------------------------------------------------- satellite colors
  const cls0 = new Uint8Array(N * N);
  const lum = new Float32Array(N * N);
  const lum2 = new Float32Array(N * N);
  for (let i = 0; i < N * N; i++) {
    const r = blurRGB[i * 3],
      g = blurRGB[i * 3 + 1],
      b = blurRGB[i * 3 + 2];
    cls0[i] = satelliteColorClass(r, g, b);
    lum[i] = (r + g + b) / 3;
    lum2[i] = lum[i] * lum[i];
  }
  // texture: crowns are rough (lit tops, shaded gaps), lawns and paving smooth
  const rTex = Math.max(1, Math.round(2 * pxPerM));
  const mean = blur(lum, N, N, rTex, 1),
    mean2 = blur(lum2, N, N, rTex, 1);
  const green = new Float32Array(N * N);
  // opt-in: murky green canals and ponds
  const wet = src.greenWater ? greenWaterMask(blurRGB, lum, mean, mean2, N, pxPerM) : null;
  let greenWater = 0;
  for (let i = 0; i < N * N; i++) {
    const dev = Math.sqrt(Math.max(0, mean2[i] - mean[i] * mean[i]));
    const exg = 2 * blurRGB[i * 3 + 1] - blurRGB[i * 3] - blurRGB[i * 3 + 2];
    if (wet?.[i]) {
      cls0[i] = COLOR.SEA;
      greenWater++;
    }
    green[i] = cls0[i] === COLOR.FOREST || (exg >= CANOPY_EXG && dev > CANOPY_TEXTURE) ? 1 : 0;
  }
  // dull gaps and sunlit or dry crowns inside the jungle are canopy, not
  // clearings: open ground needs little canopy within ~4 m
  const canopy = blur(green, N, N, Math.max(1, Math.round(4 * pxPerM)), 2);
  for (let i = 0; i < N * N; i++) if (cls0[i] === COLOR.LAWN && canopy[i] > 0.45) cls0[i] = COLOR.FOREST;
  const cls = modeFilter(cls0, N, N, 2, COLOR_COUNT);
  // morphological cleanup: specks melt into the most common class around them
  {
    const area = (n) => n / (pxPerM * pxPerM);
    for (const [c, minArea] of Object.entries(MIN_AREA)) {
      const k = +c;
      const { comps } = components(N * N, N, N, (i) => cls[i] === k);
      for (const comp of comps) if (area(comp.pixels.length) < minArea) for (const i of comp.pixels) cls[i] = COLOR.UNKNOWN;
    }
    const filled = fillUnknown(cls, N, N, COLOR.UNKNOWN);
    cls.set(filled);
  }

  // ------------------------------------------------------- OpenStreetMap first
  const paintArea = (el, value) => {
    const { outer, inner } = osm.areaRings(el);
    if (!outer.length) return;
    const mask = new Uint8Array(N * N);
    const touched = [];
    for (const ring of outer)
      rasterizePolygon(
        ring.map(([x, z]) => toPx(x, z)),
        N,
        N,
        (i) => {
          if (!mask[i]) touched.push(i);
          mask[i] = 1;
        },
      );
    for (const ring of inner)
      rasterizePolygon(
        ring.map(([x, z]) => toPx(x, z)),
        N,
        N,
        (i) => {
          mask[i] = 0;
        },
      );
    for (const i of touched) if (mask[i]) cls[i] = value;
  };
  const paintLine = (pts, width, value) => {
    const rad = Math.max(0.7, (width / 2) * pxPerM);
    const R = Math.ceil(rad);
    const px = pts.map(([x, z]) => toPx(x, z));
    for (let k = 1; k < px.length; k++) {
      const [u0, v0] = px[k - 1],
        [u1, v1] = px[k];
      const steps = Math.ceil(Math.hypot(u1 - u0, v1 - v0) * 2) + 1;
      for (let st = 0; st <= steps; st++) {
        const u = u0 + ((u1 - u0) * st) / steps,
          v = v0 + ((v1 - v0) * st) / steps;
        for (let dv = -R; dv <= R; dv++) {
          for (let du = -R; du <= R; du++) {
            if (du * du + dv * dv > rad * rad) continue;
            const uu = Math.round(u + du),
              vv = Math.round(v + dv);
            if (uu >= 0 && vv >= 0 && uu < N && vv < N) cls[vv * N + uu] = value;
          }
        }
      }
    }
  };
  const isArea = (el) => el.type === 'relation' || (el.type === 'way' && el.nodes[0] === el.nodes[el.nodes.length - 1]);
  const ways = osm.elements.filter((e) => (e.type === 'way' || e.type === 'relation') && e.tags);
  const tagWidth = (t, fallback) => {
    const w = parseFloat(t.width);
    return Number.isFinite(w) && w > 0 && w < 60 ? w : fallback;
  };
  const counts = { lawn: 0, paved: 0, roads: 0, walkways: 0, buildings: 0, water: 0, waterways: 0, pools: 0 };
  // painted in order: later layers win
  const layers = [
    // grass and sports fields
    [(t, el) => isArea(el) && (t.landuse === 'grass' || t.leisure === 'pitch' || t.natural === 'grassland'), 'lawn', COLOR.LAWN],
    // parking lots, plazas and pedestrian areas
    [
      (t, el) =>
        isArea(el) &&
        (t.amenity === 'parking' || t['area:highway'] || t.place === 'square' || (t.highway === 'pedestrian' && t.area === 'yes')),
      'paved',
      COLOR.STONE,
    ],
    // roads
    [
      (t, el) => el.type === 'way' && ROAD_WIDTH[t.highway] && t.area !== 'yes',
      'roads',
      COLOR.PATH,
      (t) => tagWidth(t, ROAD_WIDTH[t.highway]),
    ],
    // walkways and trails (also the ones hidden under the canopy)
    [
      (t, el) => el.type === 'way' && WALK_WIDTH[t.highway] && t.area !== 'yes',
      'walkways',
      COLOR.PATH,
      (t) => tagWidth(t, WALK_WIDTH[t.highway]),
    ],
    // building footprints: built ground (the 3D buildings come from stage buildings)
    [(t, el) => isArea(el) && t.building, 'buildings', COLOR.STONE],
    // lakes, cenotes, ponds
    [
      (t, el) =>
        isArea(el) &&
        (t.natural === 'water' || t.water || t.waterway === 'riverbank' || t.landuse === 'reservoir' || t.landuse === 'basin'),
      'water',
      COLOR.SEA,
    ],
    // rivers and canals
    [
      (t, el) => el.type === 'way' && WATERWAY_WIDTH[t.waterway] && !isArea(el),
      'waterways',
      COLOR.DARKWATER,
      (t) => tagWidth(t, WATERWAY_WIDTH[t.waterway]),
    ],
    [(t, el) => isArea(el) && t.leisure === 'swimming_pool', 'pools', COLOR.POOL],
  ];
  for (const [test, name, value, width] of layers) {
    for (const el of ways) {
      if (!test(el.tags, el)) continue;
      counts[name]++;
      if (width) paintLine(osm.wayPoints(el), width(el.tags), value);
      else paintArea(el, value);
    }
  }

  // --------------------------------------------------------------------- sea
  const osmSea = osmSeaMask(osm, grid, src.seaCorner);
  for (let i = 0; i < N * N; i++) {
    // open water beyond the coastline (dark deep water reads as canopy)
    if (osmSea[i] && (isWaterColor(cls[i]) || cls[i] === COLOR.FOREST || cls[i] === COLOR.LAWN)) cls[i] = COLOR.SEA;
  }
  if (src.seaCorner) {
    // boats and their wakes: small bright blobs out at sea, well off the coastline
    const land = new Uint8Array(N * N);
    for (let i = 0; i < N * N; i++) land[i] = osmSea[i] ? 0 : 1;
    const toLand = distanceTo(land, N, N);
    const { comps } = components(N * N, N, N, (i) => osmSea[i] && cls[i] !== COLOR.SEA);
    for (const comp of comps) {
      if (comp.pixels.length / (pxPerM * pxPerM) > BOAT.maxArea) continue;
      if (comp.pixels.every((i) => toLand[i] / pxPerM > BOAT.offshore)) for (const i of comp.pixels) cls[i] = COLOR.SEA;
    }
  }

  // ------------------------------------------------------- park outline
  // `sources.outline` (local meters, traced by hand) wins over the OSM outline:
  // some OSM park polygons are rough or shared with a neighbouring park
  const inside = new Uint8Array(N * N);
  const parkEl = !src.outline && src.osmPark && osm.find(src.osmPark);
  if (!src.outline && src.osmPark && !parkEl) throw new Error(`OSM park outline ${src.osmPark} not in the OSM download (check osmBBox)`);
  if (src.outline) {
    if (src.outline.length < 3) throw new Error('sources.outline needs at least 3 [x, z] points');
    rasterizePolygon(
      src.outline.map(([x, z]) => toPx(x, z)),
      N,
      N,
      (i) => (inside[i] = 1),
    );
  } else if (parkEl) {
    const { outer, inner } = osm.areaRings(parkEl);
    if (!outer.length) throw new Error(`OSM park outline ${src.osmPark} is not a closed area`);
    for (const ring of outer)
      rasterizePolygon(
        ring.map(([x, z]) => toPx(x, z)),
        N,
        N,
        (i) => (inside[i] = 1),
      );
    for (const ring of inner)
      rasterizePolygon(
        ring.map(([x, z]) => toPx(x, z)),
        N,
        N,
        (i) => (inside[i] = 0),
      );
  } else {
    // no outline: a disc 100 m inside the build square
    const R = N / 2 - 100 * pxPerM;
    for (let v = 0; v < N; v++) for (let u = 0; u < N; u++) if ((u - N / 2) ** 2 + (v - N / 2) ** 2 < R * R) inside[v * N + u] = 1;
  }
  const dist = distanceTo(inside, N, N);
  const outside = new Uint8Array(N * N);
  let nInside = 0;
  for (let i = 0; i < N * N; i++) {
    outside[i] = dist[i] / pxPerM > PARK_MARGIN ? 1 : 0;
    nInside += inside[i];
  }
  // smooth the outline a little (the designed area is a polar profile anyway)
  const soft = blur(outside, N, N, Math.max(1, Math.round(3 * pxPerM)), 2);
  for (let i = 0; i < N * N; i++) outside[i] = soft[i] > 0.5 ? 1 : 0;

  const hist = new Map();
  for (let i = 0; i < N * N; i++) if (!outside[i]) hist.set(cls[i], (hist.get(cls[i]) ?? 0) + 1);
  const total = [...hist.values()].reduce((a, b) => a + b, 0) || 1;
  const names = Object.fromEntries(Object.entries(COLOR).map(([k, v]) => [v, k.toLowerCase()]));
  const stats = Object.fromEntries([...hist].sort((a, b) => b[1] - a[1]).map(([c, n]) => [names[c], +((100 * n) / total).toFixed(1)]));
  return {
    cls,
    outside,
    osmSea,
    forced: new Uint8Array(N * N),
    counts,
    stats,
    insidePct: +((100 * nInside) / (N * N)).toFixed(1),
    greenWaterPx: greenWater,
  };
}
