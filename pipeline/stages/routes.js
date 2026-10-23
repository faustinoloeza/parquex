import sharp from 'sharp';
import { LAND, isTrack, isWater } from '../classes.js';
import { STROKES } from '../strokes.js';
import { distanceTo, forEachInDisc, rasterizePolygon } from '../lib/raster.js';
import { extractLines } from '../lib/stroke-extraction.js';
import { makeRouter, joinPieces, offsetShared, densify } from '../lib/route-snapping.js';
import { buildWalkwayNetwork, componentSizes } from '../lib/walkway-network.js';

/** OSM highway values people walk on inside the parks. */
const WALKWAY = new Set(['footway', 'path', 'steps', 'pedestrian']);

const round2 = (p) => p.map(([x, z]) => [+x.toFixed(2), +z.toFixed(2)]);

/**
 * Stage 5 — piers, OSM walkways and official route lines.
 *
 * Route lines are traced from the colored strokes painted on the illustration
 * (OSM ways named after the route are the fallback), then centered on the
 * walkways they follow, kept off buildings, joined where they were cut and
 * painted onto the ground as a continuous walkway free of trees.
 *
 * reads   osm, park.routes, paths.illustration, outside, forced, lc, occupied, buildings, site
 * writes  piers, routes ({ slug, lines }), walkways (network of OSM
 *         footways/paths/steps re-drawn on the ground's walkways, see
 *         lib/walkway-network.js; junctions share exact coordinates)
 *         lc, pathMask, distPath   updated with the painted walkways and trails
 */
export async function routes(ctx) {
  const { park, grid, osm, site, extent, log } = ctx;
  const { N, pxPerM: PX_PER_M, toPx, toLocal, idx } = grid;
  const { outside, forced, lc, occupied, buildings, pathMask } = ctx;

  // ----------------------------------------------------- OSM piers and ways
  const piers = [];
  const osmWalkways = [];
  const routeLines = new Map(park.routes.map((r) => [r.slug, []]));
  for (const w of osm.elements) {
    if (w.type !== 'way' || !w.tags) continue;
    const t = w.tags;
    const pts = osm.wayPoints(w);
    if (pts.length < 2) continue;
    const inside = pts.some(([x, z]) => {
      const [u, v] = toPx(x, z);
      return u >= 0 && v >= 0 && u < N && v < N && !outside[idx(u, v)];
    });
    if (!inside) continue;
    if (t.man_made === 'pier') {
      const cx = pts.reduce((a, p) => a + p[0], 0) / pts.length,
        cz = pts.reduce((a, p) => a + p[1], 0) / pts.length;
      if (!site.isPierRemoved(cx, cz) && ctx.designArea.contains(cx, cz, 10)) piers.push({ closed: osm.isClosed(w), pts: round2(pts) });
    }
    if (WALKWAY.has(t.highway)) osmWalkways.push(round2(pts));
    const def = t.highway && t.name && park.routes.find((r) => r.osm?.test(t.name));
    if (def) routeLines.get(def.slug).push(round2(pts));
  }

  // Paved lines explicitly added in park edits (e.g. entrance & shuttle terminal walkways)
  for (const ed of park.edits ?? []) {
    if (ed.kind === 'pave' && ed.lines) {
      const atX = ed.at ? ed.at[0] : 0;
      const atZ = ed.at ? ed.at[1] : 0;
      for (const line of ed.lines) {
        const pts = line.map(([x, z]) => [Math.round((x + atX) * 100) / 100, Math.round((z + atZ) * 100) / 100]);
        if (pts.length >= 2) osmWalkways.push(pts);
      }
    }
  }

  // ---------------------------------------- strokes painted on the illustration
  const dashedRoutes = new Set();
  // (satellite-mode parks have no illustration: OSM ways only)
  const painted = ctx.satellite ? [] : park.routes.filter((r) => STROKES[r.stroke]);
  if (painted.length) {
    const full = await sharp(ctx.paths.illustration).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    const W = full.info.width;
    const scale = N / W;
    const mPerPx = extent.size / W;
    const toL = (u, v) => [extent.cx + (u / W - 0.5) * extent.size, extent.cz + (v / W - 0.5) * extent.size];
    for (const def of painted) {
      const st = STROKES[def.stroke];
      const mask = new Uint8Array(W * W);
      for (let v = 0; v < W; v++) {
        for (let u = 0; u < W; u++) {
          const i = v * W + u;
          const k = idx(u * scale, v * scale);
          if (outside[k] || forced[k] || (!st.overWater && isWater(lc[k]))) continue;
          if (st.test(full.data[i * 3], full.data[i * 3 + 1], full.data[i * 3 + 2])) mask[i] = 1;
        }
      }
      const lines = st.dashed
        ? // dashes are kept as short pieces and joined later along the walkway
          extractLines(mask, W, toL, mPerPx, { cell: 1.5, minLength: 1.5, bridge: 0, minHits: 5, keepRatio: 0 })
        : extractLines(mask, W, toL, mPerPx, { cell: 2, minLength: 25, bridge: 18, minHits: 8, keepRatio: 0.05 });
      // painted strokes replace the OSM ways of the same route
      routeLines.set(def.slug, lines);
      if (st.dashed) dashedRoutes.add(def.slug);
      log(`stroke ${def.stroke} -> ${def.slug}: ${lines.length} pieces`);
    }
  }

  // ------------------------------------------------ walkable / blocked rasters
  const blocked = new Uint8Array(N * N);
  for (let i = 0; i < blocked.length; i++) blocked[i] = occupied[i];
  // small sunshades are not obstacles: routes walk past and under them
  for (const b of buildings) {
    if (b.kind !== 'umbrella') continue;
    const { cx, cz, length, width } = b.box;
    const [u, v] = toPx(cx, cz);
    forEachInDisc((Math.max(length, width) / 2 + 0.6) * PX_PER_M, (du, dv) => {
      blocked[idx(u + du, v + dv)] = 0;
    });
  }
  for (const poly of site.solidFootprints()) {
    rasterizePolygon(
      poly.map(([x, z]) => toPx(x, z)),
      N,
      N,
      (i) => {
        blocked[i] = 1;
      },
    );
  }
  // sunken moats of the landmarks (even-odd rings): nobody walks there…
  const sunken = new Uint8Array(N * N);
  for (const hole of site.groundHoles) {
    const parity = new Uint8Array(N * N);
    for (const ring of hole.rings) {
      rasterizePolygon(
        ring.map(([x, z]) => toPx(x, z)),
        N,
        N,
        (i) => {
          parity[i] ^= 1;
        },
      );
    }
    for (let i = 0; i < parity.length; i++) if (parity[i]) sunken[i] = blocked[i] = 1;
  }
  const walk = new Uint8Array(N * N);
  for (let i = 0; i < walk.length; i++) walk[i] = !blocked[i] && (isTrack(lc[i]) || lc[i] === LAND.SAND) ? 1 : 0;
  // piers and walkways over water are walkable too (…but over the bridges of the landmarks)
  const strokeWalk = (line, width, overHoles = false) => {
    for (const [x, z] of densify(line, 0.4)) {
      const [u, v] = toPx(x, z);
      forEachInDisc((width / 2) * PX_PER_M, (du, dv) => {
        const k = idx(u + du, v + dv);
        if (overHoles && sunken[k]) blocked[k] = 0;
        if (!blocked[k]) walk[k] = 1;
      });
    }
  };
  for (const p of piers) strokeWalk(p.pts, 2);
  for (const { line, width } of site.walkableLines()) strokeWalk(line, width, true);
  const notWalk = new Uint8Array(N * N);
  for (let i = 0; i < walk.length; i++) notWalk[i] = walk[i] ? 0 : 1;
  const center = distanceTo(notWalk, N, N);
  for (let i = 0; i < center.length; i++) center[i] /= PX_PER_M;
  // keep detours about a meter away from walls
  const distBlocked = distanceTo(blocked, N, N);
  const nearBlocked = new Uint8Array(N * N);
  for (let i = 0; i < nearBlocked.length; i++) nearBlocked[i] = distBlocked[i] / PX_PER_M < 1.2 ? 1 : 0;
  const router = makeRouter({ N, pxPerM: PX_PER_M, toPx, toLocal, walk, center, blocked, nearBlocked });

  // ------------------------------------------------------ snap, join, offset
  const snapped = park.routes.map((def) => {
    const raw = routeLines.get(def.slug) ?? [];
    // OSM ways are a few meters off the illustrated walkways; painted strokes are on them
    const pieces = raw.map((l) => (l.length < 2 ? l : router.snapLine(l, { radius: def.stroke ? 2.5 : 6 })));
    // hand-drawn links (src/parks/<key>/routes.js), not snapped: they join pieces the tracing leaves apart
    pieces.push(...(def.links ?? []).map((l) => l.map(([x, z]) => [x, z])));
    const dashed = dashedRoutes.has(def.slug);
    const lines = joinPieces(pieces, {
      tol: dashed ? 5 : 2.5,
      bridge: 12,
      minLength: dashed ? 40 : 0,
      crossesBlocked: router.crossesBlocked,
    });
    return { slug: def.slug, lines };
  });
  const routes = offsetShared(snapped, { near: 1.8, spacing: 1.7 }).map((r) => ({
    ...r,
    lines: r.lines
      .map((l) => router.avoid(l))
      .filter((l) => l.length >= 2)
      .map(round2),
  }));
  const onBuildings = routes.flatMap((r) =>
    r.lines.flatMap((l) =>
      densify(l, 0.5)
        .filter(router.isBlocked)
        .map((q) => [r.slug, Math.round(q[0]), Math.round(q[1])]),
    ),
  );
  if (process.env.DEBUG_ROUTES) {
    const groups = new Map();
    for (const [slug, x, z] of onBuildings) {
      const k = `${slug} ${Math.round(x / 10) * 10},${Math.round(z / 10) * 10}`;
      groups.set(k, (groups.get(k) ?? 0) + 1);
    }
    log([...groups].map(([k, n]) => `${k}:${n}`).join('  '));
  }
  log(`routes snapped: ${routes.map((r) => `${r.slug} ${r.lines.length}`).join(', ')}; points on buildings: ${onBuildings.length}`);

  // -------------------------------------- paint a continuous walkway under routes
  let paintedPx = 0;
  for (const r of routes) {
    for (const line of r.lines) {
      for (const [x, z] of densify(line, 0.4)) {
        const [u, v] = toPx(x, z);
        forEachInDisc(1.5 * PX_PER_M, (du, dv) => {
          const k = idx(u + du, v + dv);
          if (blocked[k] || isWater(lc[k])) return;
          if (lc[k] === LAND.FOREST || lc[k] === LAND.LAWN || lc[k] === LAND.ROCK) {
            lc[k] = LAND.PATH;
            paintedPx++;
          }
        });
      }
    }
  }
  log(`walkway pixels painted under routes: ${paintedPx}`);

  // ------------------------------------------------ walkway network (OSM)
  // OSM footways re-drawn on the walkways of the ground; water without a pier
  // is not walkable here (the route router lets lines cross it to join pieces)
  const wetBlocked = new Uint8Array(N * N);
  for (let i = 0; i < wetBlocked.length; i++) wetBlocked[i] = blocked[i] || (isWater(lc[i]) && !walk[i]) ? 1 : 0;
  const distWet = distanceTo(wetBlocked, N, N);
  const nearWet = new Uint8Array(N * N);
  for (let i = 0; i < nearWet.length; i++) nearWet[i] = distWet[i] / PX_PER_M < 1 ? 1 : 0;
  const walkRouter = makeRouter({
    N,
    pxPerM: PX_PER_M,
    toPx,
    toLocal,
    walk,
    center,
    blocked: wetBlocked,
    nearBlocked: nearWet,
    centerWeight: 1.5,
  });
  const network = buildWalkwayNetwork(osmWalkways, {
    router: walkRouter,
    inside: (x, z) => ctx.designArea.contains(x, z, 150),
    overWater: (x, z) => {
      const k = idx(...toPx(x, z));
      return isWater(lc[k]) && !walk[k];
    },
  });
  const paveWalkways = [];
  for (const ed of park.edits ?? []) {
    if (ed.kind === 'pave' && ed.lines) {
      const atX = ed.at ? ed.at[0] : 0;
      const atZ = ed.at ? ed.at[1] : 0;
      for (const line of ed.lines) {
        const pts = line.map(([x, z]) => [Math.round((x + atX) * 100) / 100, Math.round((z + atZ) * 100) / 100]);
        if (pts.length >= 2) paveWalkways.push(pts);
      }
    }
  }
  const walkways = [...network.lines, ...network.trails.filter((t) => t.length >= 2), ...paveWalkways];
  // trails the illustration does not show (under the jungle) are painted as paths
  let trailPx = 0;
  for (const line of network.trails) {
    for (const [x, z] of densify(line, 0.4)) {
      const [u, v] = toPx(x, z);
      forEachInDisc(1.2 * PX_PER_M, (du, dv) => {
        const k = idx(u + du, v + dv);
        if (blocked[k] || outside[k] || isWater(lc[k])) return;
        if (lc[k] === LAND.FOREST || lc[k] === LAND.LAWN) {
          lc[k] = LAND.PATH;
          trailPx++;
        }
      });
    }
  }
  const before = componentSizes(osmWalkways),
    after = componentSizes(walkways);
  log(
    `walkways: OSM ${osmWalkways.length} ways (${before.length} components, largest ${before[0] ?? 0} vertices) → ` +
      `${walkways.length} lines, ${walkways.reduce((s, l) => s + l.length, 0)} points (${after.length} components, largest ${after[0] ?? 0}); ` +
      `trail pixels painted: ${trailPx}`,
  );
  for (let i = 0; i < lc.length; i++) pathMask[i] = isTrack(lc[i]) ? 1 : 0;

  Object.assign(ctx, { piers, walkways, routes, distPath: distanceTo(pathMask, N, N) });
}
