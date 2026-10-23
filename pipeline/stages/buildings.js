import { COLOR, LAND, isWater } from '../classes.js';
import { hsv } from '../lib/color.js';
import { hash2 } from '../lib/noise.js';
import { components, orientedBox, polygonArea, rasterizePolygon } from '../lib/raster.js';
import { OBJECT_MARGIN } from '#shared/design-area.js';

/** Roof type from the illustration's color. */
function roofFromColor(r, g, b) {
  const [h, s, v] = hsv(r, g, b);
  if ((h < 28 || h > 335) && s > 0.28) return 'tile';
  if (s < 0.13 && v > 195) return 'white';
  if (s < 0.16) return 'stone';
  if (h >= 25 && h < 65 && s >= 0.13) return 'thatch';
  return 'stone';
}

/**
 * Roof type from the satellite's color (satellite-mode parks): terracotta →
 * tile, brown / straw → thatch (palapas), light → flat white, else stone.
 */
export function roofFromSatellite(r, g, b) {
  const [h, s, v] = hsv(r, g, b);
  if ((h < 25 || h > 340) && s > 0.28 && r > g + 20) return 'tile';
  if (v > 175 && s < 0.2) return 'white';
  if (h >= 18 && h < 55 && s > 0.2 && v > 70 && v < 200) return 'thatch';
  return 'stone';
}

/** Vegetation over a footprint (excess green): trees hiding part of the roof. */
const isGreen = (r, g, b) => 2 * g - r - b >= 20 && g >= r;

const round2 = (n) => +n.toFixed(2);
const boxOf = (box, minSize = 0) => ({
  cx: round2(box.cx),
  cz: round2(box.cy),
  length: +Math.max(minSize, box.length).toFixed(2),
  width: +Math.max(minSize, box.width).toFixed(2),
  angle: +box.angle.toFixed(4),
});

/**
 * Stage 4 — generic buildings (everything that is not a hand-made landmark).
 *  - OpenStreetMap footprints the illustration shows as built; roof type
 *    voted from the illustration's colors under the footprint
 *  - OSM footprints where the illustration is hidden by its clouds, with a
 *    plausible look
 *  - thatched / tiled roofs painted on the illustration but missing in OSM
 *    (palapas, sunshades), except shapes in roof colors that are rocks or
 *    decks by the water, or tree trunks under the canopy
 *  - satellite-mode parks (rawRGB is the satellite image): every OSM footprint
 *    inside the park, roof type voted from the satellite's colors; no painted
 *    roofs
 *
 * Only inside the designed area: beyond it the app shows the real map.
 *
 * reads   osm, lc, cls1, rawRGB, outside, outsideSoft, designArea, distSea, sampleHeight, site
 * writes  buildings   (also buildings.json)
 *         occupied    pixels covered by buildings
 */
export async function buildings(ctx) {
  const { grid, osm, site, log } = ctx;
  const { N, pxPerM: PX_PER_M, toPx, toLocal, idx } = grid;
  const { lc, cls1, rawRGB, outside, outsideSoft, distSea, sampleHeight } = ctx;
  const list = [];
  const occupied = new Uint8Array(N * N);

  // --------------------------------------------------------- OSM footprints
  for (const w of osm.elements) {
    if (w.type !== 'way' || !w.tags?.building || !osm.isClosed(w)) continue;
    let poly = osm.wayPoints(w).slice(0, -1);
    if (poly.length < 3) continue;
    let area = polygonArea(poly);
    if (area < 0) {
      poly = poly.reverse();
      area = -area;
    }
    if (area < 12) continue;
    const cx = poly.reduce((s, p) => s + p[0], 0) / poly.length;
    const cz = poly.reduce((s, p) => s + p[1], 0) / poly.length;
    const [cu, cv] = toPx(cx, cz);
    if (cu < 0 || cv < 0 || cu >= N || cv >= N) continue;
    if (site.isCleared(cx, cz, 4) || site.replacedOsmBuildings.has(w.id)) continue;
    if (!ctx.designArea.contains(cx, cz, OBJECT_MARGIN) && !site.keptOsmBuildings.has(w.id)) continue; // real map beyond
    const outline = poly.map(([x, z]) => [round2(x), round2(z)]);

    if (outsideSoft[idx(cu, cv)] > 0.05) {
      // beyond the illustrated area: real OSM buildings with a plausible look
      const box = orientedBox(poly);
      const h = hash2(w.id % 100003, 7);
      const rect = area / Math.max(1, box.length * box.width);
      const roof = h < 0.55 ? 'white' : h < 0.85 ? 'tile' : 'stone';
      const levels = +w.tags['building:levels'] || (area > 600 ? 3 : area > 150 ? 2 : 1);
      rasterizePolygon(
        poly.map(([x, z]) => toPx(x, z)),
        N,
        N,
        (i) => {
          occupied[i] = 1;
        },
      );
      list.push({
        src: 'osm',
        id: w.id,
        name: w.tags.name,
        poly: outline,
        roof,
        shape: roof === 'tile' ? (rect > 0.8 ? 'hip' : 'inset') : 'flat',
        wall: levels * 3.3,
        y: +sampleHeight(cx, cz).toFixed(2),
        box: boxOf(box),
      });
      continue;
    }

    let total = 0,
      built = 0,
      r = 0,
      g = 0,
      b = 0;
    const votes = { tile: 0, thatch: 0, white: 0, stone: 0 };
    const pix = [];
    rasterizePolygon(
      poly.map(([x, z]) => toPx(x, z)),
      N,
      N,
      (i) => {
        total++;
        pix.push(i);
        const c = lc[i];
        if (c === LAND.PLAZA || c === LAND.PATH || c === LAND.ROCK || c === LAND.SAND) built++;
        r += rawRGB[i * 3];
        g += rawRGB[i * 3 + 1];
        b += rawRGB[i * 3 + 2];
        const k = cls1[i];
        if (ctx.satellite) {
          if (!isGreen(rawRGB[i * 3], rawRGB[i * 3 + 1], rawRGB[i * 3 + 2]))
            votes[roofFromSatellite(rawRGB[i * 3], rawRGB[i * 3 + 1], rawRGB[i * 3 + 2])]++;
        } else if (k !== COLOR.FOREST && k !== COLOR.LAWN) votes[roofFromColor(rawRGB[i * 3], rawRGB[i * 3 + 1], rawRGB[i * 3 + 2])]++;
      },
    );
    if (process.env.DEBUG_OSM)
      log(
        'osm',
        w.id,
        Math.round(cx),
        Math.round(cz),
        Math.round(area),
        'built',
        (built / Math.max(1, total)).toFixed(2),
        JSON.stringify(votes),
      );
    const roofish = (votes.tile + votes.thatch + votes.white + votes.stone) / Math.max(1, total);
    // keep footprints the illustration shows as built, or whose roof shows through the trees
    const kept = site.keptOsmBuildings.has(w.id);
    // (satellite mode: OSM is the only source of buildings, keep them all)
    if (!total || (!kept && !ctx.satellite && built / total < 0.5 && roofish < 0.35)) continue;
    r /= total;
    g /= total;
    b /= total;
    // painted roofs are partly hidden by trees: a fifth of red pixels is enough
    const voted =
      votes.tile > total * 0.2
        ? 'tile'
        : ctx.satellite && !(votes.tile + votes.thatch + votes.white + votes.stone)
          ? 'thatch' // fully under the canopy: most likely a palapa
          : Object.entries(votes).sort((a, c) => c[1] - a[1])[0][0];
    const box = orientedBox(poly);
    const rect = area / Math.max(1, box.length * box.width);
    const wall = area < 80 ? 3.2 : area < 300 ? 4.2 : area < 1000 ? 5.5 : 7;
    // grey corrugated sheds read as 'slate' hipped roofs when rectangular
    const roof =
      site.keptOsmBuildings.get(w.id) ??
      (voted === 'stone' && rect > 0.8 && area > 80 && box.length / Math.max(1, box.width) > 1.8 ? 'slate' : voted);
    const pitched = roof === 'tile' || roof === 'thatch' || roof === 'slate';
    const shape = pitched ? (rect > 0.8 ? 'hip' : 'inset') : 'flat';
    for (const i of pix) occupied[i] = 1;
    list.push({
      src: 'osm',
      id: w.id,
      name: w.tags.name,
      poly: outline,
      roof,
      shape,
      wall,
      y: +sampleHeight(cx, cz).toFixed(2),
      color: [r, g, b].map(Math.round),
      box: boxOf(box),
    });
  }
  log(`osm buildings kept: ${list.length}`);

  // ------------------------------------------ roofs painted on the illustration
  if (!ctx.satellite) {
    const isRoof = (i) =>
      (cls1[i] === COLOR.THATCH || cls1[i] === COLOR.ROOF) &&
      !outside[i] &&
      lc[i] !== LAND.ROCK &&
      lc[i] !== LAND.SAND &&
      distSea[i] / PX_PER_M > 6;
    const { comps } = components(N * N, N, N, isRoof);
    // land cover in a ring 1.5–7 m around an oriented box: fractions of water and vegetation
    const ringCover = ({ cx, cy, length, width, angle }) => {
      const c = Math.cos(angle),
        s = Math.sin(angle);
      let n = 0,
        water = 0,
        green = 0;
      for (let a = -length / 2 - 7; a <= length / 2 + 7; a += 0.5) {
        for (let d = -width / 2 - 7; d <= width / 2 + 7; d += 0.5) {
          if (Math.max(Math.abs(a) - length / 2, Math.abs(d) - width / 2) < 1.5) continue;
          const k = lc[idx(...toPx(cx + a * c - d * s, cy + a * s + d * c))];
          n++;
          if (isWater(k)) water++;
          else if (k === LAND.FOREST || k === LAND.LAWN) green++;
        }
      }
      return { water: water / n, green: green / n };
    };
    const rejected = { water: 0, canopy: 0 };
    let n = 0;
    for (const comp of comps) {
      const areaM = comp.pixels.length / (PX_PER_M * PX_PER_M);
      if (areaM < 5 || areaM > 3500) continue;
      const pts = comp.pixels.map((i) => toLocal(i % N, (i / N) | 0));
      const box = orientedBox(pts);
      if (site.isCleared(box.cx, box.cy, 2) || site.ignoresRoofs(box.cx, box.cy)) continue;
      if (!ctx.designArea.contains(box.cx, box.cy, OBJECT_MARGIN)) continue;
      let overlap = 0,
        tile = 0;
      for (const i of comp.pixels) {
        overlap += occupied[i];
        if (cls1[i] === COLOR.ROOF) tile++;
      }
      if (overlap / comp.pixels.length > 0.25) continue;
      const fill = areaM / Math.max(1, box.length * box.width);
      if (fill < 0.45 || box.width < 1.6) continue; // thin strokes: route lines, birds
      const aspect = box.length / Math.max(0.1, box.width);
      const round = aspect < 1.35 && fill < 0.86;
      const small = areaM < 22;
      // Shapes the illustration paints in roof colors that are not roofs:
      //  - rocks, islets, decks and boats at the water's edge (lots of water
      //    around, smaller than a big palapa): real huts by the water are kept
      //    with `keepRoofs` edits
      //  - tree trunks and shadows under the canopy: small or darker than a
      //    sunlit roof, surrounded by vegetation
      // (OSM footprints are not filtered: a mapped building over the water is real.)
      if (!site.keepsRoofs(box.cx, box.cy)) {
        const ring = ringCover(box);
        let v = 0;
        for (const i of comp.pixels) v += Math.max(rawRGB[i * 3], rawRGB[i * 3 + 1], rawRGB[i * 3 + 2]);
        v /= comp.pixels.length;
        const reason = ring.water >= 0.15 && areaM < 80 ? 'water' : ring.green >= 0.5 && (small || v < 150) ? 'canopy' : null;
        if (reason) {
          rejected[reason]++;
          if (process.env.DEBUG_ROOFS) {
            let r = 0,
              g = 0,
              b = 0;
            for (const i of comp.pixels) {
              r += rawRGB[i * 3];
              g += rawRGB[i * 3 + 1];
              b += rawRGB[i * 3 + 2];
            }
            const L = comp.pixels.length;
            log(
              'not a roof:',
              reason,
              Math.round(box.cx),
              Math.round(box.cy),
              Math.round(areaM),
              'm²',
              'fill',
              fill.toFixed(2),
              'hsv',
              hsv(r / L, g / L, b / L)
                .map((q) => q.toFixed(2))
                .join('/'),
              'ring',
              ring.water.toFixed(2),
              ring.green.toFixed(2),
            );
          }
          continue;
        }
      }
      list.push({
        src: 'blob',
        shape: round ? 'cone' : 'hip',
        roof: tile / comp.pixels.length > 0.5 ? 'tile' : 'thatch',
        kind: small ? 'umbrella' : 'palapa',
        wall: small ? 2.2 : areaM < 150 ? 2.8 : 3.6,
        y: +sampleHeight(box.cx, box.cy).toFixed(2),
        box: boxOf(box, 2.4),
      });
      for (const i of comp.pixels) occupied[i] = 1;
      n++;
    }
    log(`roof blobs: ${n} (not roofs: ${rejected.water} by the water, ${rejected.canopy} under the canopy)`);
  }

  await ctx.write('buildings.json', JSON.stringify(list));
  Object.assign(ctx, { buildings: list, occupied });
}
