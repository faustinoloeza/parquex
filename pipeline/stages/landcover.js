import sharp from 'sharp';
import { COLOR, LAND, isTrack, isWaterColor, isWater } from '../classes.js';
import { fbm } from '../lib/noise.js';
import { blur, components, distanceTo, rasterizePolygon } from '../lib/raster.js';
import { clearArea } from '../lib/clear-area.js';
import { makeDesignArea } from '#shared/design-area.js';

/**
 * Stage 2 — final land cover (sea, lagoons, rivers, pools, jungle, lawn,
 * paths, sand, plazas, rocks) and the distance fields derived from it.
 *
 * reads   cls3, outside, osmSea (satellite mode), osm (roads, parking), paths.satellite, site (satelliteCovers, groundEdits: pave / plant / water)
 * writes  lc                     land cover (LAND), per pixel
 *         distSea, distWater, distLand, distPath   distance fields (pixels)
 *         waterMask, pathMask    masks (pathMask: paving and dirt tracks)
 *         outsideSoft            blurred cloud mask
 *         clear, designArea      outline of the designed area (shared/design-area.js)
 */
export async function landcover(ctx) {
  const { grid, osm, site, log } = ctx;
  const { N, pxPerM: PX_PER_M, toPx, toLocal } = grid;
  const { cls3, outside } = ctx;

  // ---------------------------------------------------- color class → land
  const lc = new Uint8Array(N * N);
  {
    // the water body touching the clouds the most is the open sea (satellite
    // mode: the water beyond the OSM coastline, if any)
    const { label, comps } = components(N * N, N, N, (i) => isWaterColor(cls3[i]));
    let seaId = -1,
      best = -1;
    for (const comp of ctx.osmSea ? [] : comps) {
      let o = 0;
      for (const i of comp.pixels) o += outside[i];
      if (o > best) {
        best = o;
        seaId = comp.id;
      }
    }
    const tiny = new Set(comps.filter((c) => c.pixels.length < 12).map((c) => c.id));
    for (let i = 0; i < lc.length; i++) {
      const c = cls3[i];
      if (isWaterColor(c)) {
        const l = label[i];
        if (tiny.has(l)) lc[i] = LAND.LAWN;
        else if (ctx.osmSea ? ctx.osmSea[i] : l === seaId) lc[i] = LAND.SEA;
        else lc[i] = c === COLOR.DARKWATER ? LAND.RIVER : c === COLOR.POOL ? LAND.POOL : LAND.LAGOON;
      } else if (c === COLOR.FOREST) lc[i] = LAND.FOREST;
      else if (c === COLOR.LAWN) lc[i] = LAND.LAWN;
      else if (c === COLOR.PATH) lc[i] = LAND.PATH;
      else if (c === COLOR.SAND) lc[i] = LAND.SAND;
      else lc[i] = LAND.PLAZA; // roofs, stone, misc → built ground
    }
  }
  const seaMask = new Uint8Array(N * N);
  for (let i = 0; i < lc.length; i++) seaMask[i] = lc[i] === LAND.SEA ? 1 : 0;
  const distSea = distanceTo(seaMask, N, N); // px
  // stone and thatch-colored shapes by the sea are rocks and sand
  for (let i = 0; i < lc.length; i++) {
    const dm = distSea[i] / PX_PER_M;
    const c = cls3[i];
    if (lc[i] === LAND.PLAZA && c === COLOR.STONE && dm < 30) lc[i] = LAND.ROCK;
    if ((c === COLOR.THATCH || c === COLOR.SAND) && dm < 14 && !outside[i]) lc[i] = c === COLOR.THATCH ? LAND.ROCK : LAND.SAND;
  }

  // Lagoons and rivers: their rocky shores and islets are painted in stone,
  // pink or thatch tones that otherwise read as plaza (stone paving). Built
  // ground right at the water's edge and small islands are bare rock.
  {
    const wet = new Uint8Array(N * N);
    for (let i = 0; i < lc.length; i++) wet[i] = isWater(lc[i]) ? 1 : 0;
    const distWet = distanceTo(wet, N, N);
    const rocky = (c) => c === COLOR.STONE || c === COLOR.THATCH || c === COLOR.MISC || c === COLOR.ROOF;
    let shore = 0,
      islets = 0;
    for (let i = 0; i < lc.length; i++) {
      if (lc[i] === LAND.PLAZA && !outside[i] && rocky(cls3[i]) && distWet[i] / PX_PER_M < 5) {
        lc[i] = LAND.ROCK;
        shore++;
      }
    }
    const { comps } = components(N * N, N, N, (i) => !wet[i] && !outside[i]);
    for (const comp of comps) {
      if (comp.pixels.length / (PX_PER_M * PX_PER_M) > 2500) continue;
      // an islet: every pixel within a few meters of the water around it
      if (comp.pixels.some((i) => distWet[i] / PX_PER_M > 12)) continue;
      for (const i of comp.pixels)
        if (lc[i] === LAND.PLAZA || lc[i] === LAND.PATH) {
          lc[i] = LAND.ROCK;
          islets++;
        }
    }
    log(`rocky shores: ${shore} px, islets: ${islets} px`);
  }

  // ------------------------------------------------- under the clouds (OSM)
  {
    const ROAD_WIDTH = {
      primary: 11,
      secondary: 9,
      tertiary: 7,
      tertiary_link: 6,
      unclassified: 6,
      residential: 5,
      service: 4.5,
      track: 3,
    };
    const paint = (i, c) => {
      if (outside[i] && lc[i] !== LAND.SEA) lc[i] = c;
    };
    for (const w of osm.elements) {
      if (w.type !== 'way' || !w.tags) continue;
      const width = ROAD_WIDTH[w.tags.highway];
      if (width) {
        const pts = osm.wayPoints(w).map(([x, z]) => toPx(x, z));
        const rad = (width / 2) * PX_PER_M;
        for (let k = 1; k < pts.length; k++) {
          const [u0, v0] = pts[k - 1],
            [u1, v1] = pts[k];
          const steps = Math.ceil(Math.hypot(u1 - u0, v1 - v0) * 2) + 1;
          for (let st = 0; st <= steps; st++) {
            const u = u0 + ((u1 - u0) * st) / steps,
              v = v0 + ((v1 - v0) * st) / steps;
            for (let dv = -Math.ceil(rad); dv <= rad; dv++) {
              for (let du = -Math.ceil(rad); du <= rad; du++) {
                if (du * du + dv * dv > rad * rad) continue;
                const uu = Math.round(u + du),
                  vv = Math.round(v + dv);
                if (uu >= 0 && vv >= 0 && uu < N && vv < N) paint(vv * N + uu, LAND.PATH);
              }
            }
          }
        }
      }
      if (w.tags.amenity === 'parking' && osm.isClosed(w)) {
        rasterizePolygon(
          osm.wayPoints(w).map(([x, z]) => toPx(x, z)),
          N,
          N,
          (i) => paint(i, LAND.PLAZA),
        );
      }
    }
    // natural variety: clearings and a sandy shore
    const seaOnly = new Uint8Array(N * N);
    for (let i = 0; i < lc.length; i++) seaOnly[i] = lc[i] === LAND.SEA ? 1 : 0;
    const dSea = distanceTo(seaOnly, N, N);
    for (let v = 0; v < N; v++) {
      for (let u = 0; u < N; u++) {
        const i = v * N + u;
        if (!outside[i] || lc[i] !== LAND.FOREST) continue;
        const [x, z] = toLocal(u, v);
        const d = dSea[i] / PX_PER_M;
        if (d < 7 + fbm(x / 20, z / 20, 4) * 6) lc[i] = d < 3 ? LAND.ROCK : LAND.SAND;
        else if (fbm(x / 70, z / 70, 13) > 0.64) lc[i] = LAND.LAWN;
      }
    }
  }

  // ------------------------------------------- satelliteCover edits (in order)
  // Where the illustration paints characters over the ground, the land cover
  // comes from satellite imagery: the darker greenish part of the area is
  // canopy, the brightest is paving (thresholds relative to the area, the
  // imagery is hazy).
  if (site.satelliteCovers.length) {
    const sat = await sharp(ctx.paths.satellite)
      .resize(N, N, { kernel: 'lanczos3' })
      .blur(1.2)
      .removeAlpha()
      .raw()
      .toBuffer()
      .catch(() => null);
    if (!sat) log(`satelliteCover needs ${ctx.paths.satellite} (pnpm data:satellite)`);
    for (const area of sat ? site.satelliteCovers : []) {
      const [cu, cv] = toPx(area.x, area.z);
      const r = area.radius * PX_PER_M;
      const px = [];
      for (let v = Math.max(0, Math.floor(cv - r)); v <= Math.min(N - 1, cv + r); v++) {
        for (let u = Math.max(0, Math.floor(cu - r)); u <= Math.min(N - 1, cu + r); u++) {
          if ((u - cu) ** 2 + (v - cv) ** 2 > r * r) continue;
          const i = v * N + u;
          if (isWater(lc[i])) continue;
          const R = sat[i * 3],
            G = sat[i * 3 + 1],
            B = sat[i * 3 + 2];
          px.push([i, (R + G + B) / 3, 2 * G - R - B]);
        }
      }
      const lum = px.map((p) => p[1]).sort((a, b) => a - b);
      const q = (f) => lum[Math.min(lum.length - 1, Math.floor(f * lum.length))];
      const darkCut = q(0.6),
        brightCut = Math.max(q(0.85), 145);
      let forest = 0,
        paved = 0;
      for (const [i, L, exg] of px) {
        if (L <= darkCut && exg > 8) {
          lc[i] = LAND.FOREST;
          forest++;
        } else if (L >= brightCut && exg < 30) {
          lc[i] = LAND.PATH;
          paved++;
        }
      }
      log(`satelliteCover ${area.label}: ${forest} jungle px, ${paved} paved px`);
    }
  }

  // ----------------------------------------- pave / plant / water (in order)
  for (const edit of site.groundEdits) {
    // pave: stone paving, or packed earth with `surface: 'dirt'`; plant: jungle,
    // or open low scrub with `cover: 'lawn'`; water: lagoon, or river with
    // `cover: 'river'`. All of them make their polygons part of the park
    // (outside = 0), also beyond the outline / the illustration's clouds.
    const cover =
      edit.kind === 'pave'
        ? edit.surface === 'dirt'
          ? LAND.DIRT
          : LAND.PLAZA
        : edit.kind === 'water'
          ? edit.cover === 'river'
            ? LAND.RIVER
            : LAND.LAGOON
          : edit.cover === 'lawn'
            ? LAND.LAWN
            : LAND.FOREST;
    for (const poly of edit.polygons) {
      rasterizePolygon(
        poly.map(([x, z]) => toPx(x, z)),
        N,
        N,
        (i) => {
          lc[i] = cover;
          outside[i] = 0;
        },
      );
    }
  }

  // ---------------------------------------------------------- derived fields
  const waterMask = new Uint8Array(N * N);
  const landMask = new Uint8Array(N * N);
  for (let i = 0; i < lc.length; i++) {
    waterMask[i] = isWater(lc[i]) ? 1 : 0;
    landMask[i] = 1 - waterMask[i];
  }
  const distWater = distanceTo(waterMask, N, N); // px, for land pixels
  const distLand = distanceTo(landMask, N, N); // px, for water pixels
  const pathMask = new Uint8Array(N * N);
  for (let i = 0; i < lc.length; i++) pathMask[i] = isTrack(lc[i]) ? 1 : 0;
  const distPath = distanceTo(pathMask, N, N);
  const outsideSoft = blur(outside, N, N, 20, 2);

  const clear = clearArea({ grid, extent: ctx.extent, outsideSoft, smooth: !ctx.park.region && !ctx.park.sources.straightOutline });
  Object.assign(ctx, {
    lc,
    distSea,
    waterMask,
    distWater,
    distLand,
    pathMask,
    distPath,
    outsideSoft,
    clear,
    designArea: makeDesignArea(clear),
  });
}
