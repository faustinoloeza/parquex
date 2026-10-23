import { GROUND_TILE_SIZE } from '#shared/formats/ground-tiles.js';
import { resolveWaterTint } from '#shared/water-tint.js';
import { localActivities } from '../lib/local-activities.js';
import { findEntrance } from '#shared/navigation.js';
import LABELS from '#parks/labels.js';

/**
 * Stage 8 — park.json: everything the app needs besides the 3D assets.
 *  - designed area (cloud-free outline as a polar profile) and ground tiles
 *  - activities (src/parks/<key>/activities.js: numbers, names, categories,
 *    routes, cost, hours) and services (src/parks/<key>/services.js)
 *  - name and hours from park.sources, labels from src/parks/labels.js
 *  - groundHoles: the holes landmarks cut in the ground that have a bridge
 *    over them (rings + the height of the deck), for viewers that draw
 *    walkways and the navigation route on top of the terrain
 *  - waterTint: inland water color, when the park sets `sources.waterTint`
 *  - region: true for a region (src/parks/xcr), not a park
 *  - routes (style + lines), piers, OSM walkways, labels, extent and bounds
 *  - entrance: where simulated walks start (parkEntrance: sources.entrance, else
 *    the activity named like the entrance, shared/navigation.js → findEntrance)
 *
 * reads   clear, groundTiles, sampleHeight, routes, piers, walkways, heightGrid, site.groundHoles
 * output  park.json
 */
export async function parkData(ctx) {
  const { key, park, center, bounds, extent, sampleHeight, log } = ctx;
  const pois = localActivities(park.activities ?? [], ctx);
  const ids = new Set(pois.map((p) => p.id));
  if (ids.size !== pois.length)
    throw new Error(`src/parks/${key}/activities.js: repeated activity ids (give \`id\` to activities that share a number)`);
  const services = (park.services ?? []).map((s) => ({
    type: s.type,
    x: s.x,
    z: s.z,
    y: +Math.max(0.3, sampleHeight(s.x, s.z)).toFixed(2),
    note: s.note ?? null,
  }));
  // holes with a bridge over them: what people walk on there is the deck
  const groundHoles = ctx.site.groundHoles
    .filter((h) => h.cover != null)
    .map((h) => ({ rings: h.rings, y: +((h.base.y ?? sampleHeight(h.base.x, h.base.z)) + h.cover).toFixed(2) }));

  // route names in both languages come from the activities
  const routeEn = new Map();
  for (const p of pois) if (p.route.es && p.route.en) routeEn.set(p.route.es, p.route.en);
  const routes = park.routes.map((r) => ({
    slug: r.slug,
    name: { es: r.name, en: routeEn.get(r.name) ?? r.name },
    color: r.color,
    casing: r.casing,
    label: r.label,
    lines: ctx.routes.find((x) => x.slug === r.slug)?.lines ?? [],
  }));

  const waterTint = resolveWaterTint(park.sources.waterTint);
  const data = {
    key,
    code: park.sources.code,
    name: park.sources.name ?? park.name,
    hours: park.sources.hours ?? null,
    center,
    extent: { cx: +extent.cx.toFixed(3), cz: +extent.cz.toFixed(3), size: +extent.size.toFixed(3) },
    // satellite parks have no official map bounds: frame the designed area
    bounds: ctx.satellite ? clearBounds(ctx.clear) : bounds,
    heightGrid: ctx.heightGrid,
    clear: ctx.clear,
    ground: { tileSize: GROUND_TILE_SIZE, tiles: ctx.groundTiles },
    pois,
    labels: LABELS,
    routes,
    services,
    piers: ctx.piers,
    walkways: ctx.walkways,
    // inland water color (shared/water-tint.js); only parks that set one
    ...(waterTint && { waterTint }),
    // land around several parks (src/parks/xcr): the app draws it only as their lowest-priority neighbor
    ...(park.region && { region: true }),
    // bridges over sunken moats: { rings (even-odd, local meters), y (deck height) }
    ...(groundHoles.length && { groundHoles }),
  };
  if (!park.region) data.entrance = parkEntrance(data, park.sources.entrance);
  await ctx.write('park.json', JSON.stringify(data));
  log(
    `pois ${pois.length}, routes ${routes.length}, services ${services.length}, piers ${ctx.piers.length}, walkways ${ctx.walkways.length}`,
  );
}

/**
 * park.json → entrance ({ x, z }, local meters, 0.01 m): the start of the
 * simulated walks, the same point the web picks (shared/navigation.js →
 * findEntrance with the definition's sources.entrance), so the mobile app needs
 * no per-park value.
 * @param {object} park park.json (pois, clear)
 * @param {{ x: number, z: number }} [override] sources.entrance
 */
export function parkEntrance(park, override) {
  const { x, z } = findEntrance(park, override);
  return { x: Math.round(x * 100) / 100, z: Math.round(z * 100) / 100 };
}

/** Margin (m) around the designed area for the map bounds of satellite parks. */
const BOUNDS_MARGIN = 20;

/** Bounding box of the designed area's polar outline (+ margin), rounded to 0.1 m. */
export function clearBounds({ cx, cz, radii }) {
  const xs = [],
    zs = [];
  radii.forEach((r, i) => {
    const a = (i / radii.length) * Math.PI * 2;
    xs.push(cx + Math.cos(a) * r);
    zs.push(cz + Math.sin(a) * r);
  });
  const round = (v) => Math.round(v * 10) / 10;
  return {
    x0: round(Math.min(...xs) - BOUNDS_MARGIN),
    x1: round(Math.max(...xs) + BOUNDS_MARGIN),
    z0: round(Math.min(...zs) - BOUNDS_MARGIN),
    z1: round(Math.max(...zs) + BOUNDS_MARGIN),
  };
}
