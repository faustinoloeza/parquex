// What a focused park shows of its neighbors (shared/neighbors.js), as plain
// functions shared by the web layer (src/layers/neighbors.js) and the mobile
// context bundle (src/export/context.js → context.glb, context-instances.bin,
// context.json): which opacity each neighbor's ground and water take, where a
// region's sea turns into the real map's sea, and which trees are kept.
//
// Everything a neighbor shows yields to the focused park and to the neighbors
// ranked before it (closest parks first, regions last). The web computes some
// of it per pixel; the mobile bundle bakes the same values per vertex.

import { FADE, makeDesignArea } from './design-area.js';
import { findNeighbors, neighborOpacity, yieldOpacity } from './neighbors.js';
import { TREE, TREE_STRIDE } from './formats/vegetation.js';

/**
 * Neighbor trees are dropped more than this (m) inside an area they yield to
 * (the focused park, a closer neighbor): that park's ground and trees show
 * there. Its own trees stop OBJECT_MARGIN (30 m) inside, so no double trees.
 */
export const TREE_YIELD = FADE.inner / 3;

/** Tree types drawn for neighbors (bushes, 1.5 m, are left out: the ground already shows them). */
export const NEIGHBOR_TREE_TYPES = [TREE.BROAD, TREE.BROAD_LIGHT, TREE.CEIBA, TREE.PALM];

/**
 * A region's open sea turns into the real map's sea color towards its outline:
 * fully within the first [0] m inside it, not at all [1] m inside (its sea
 * reaches ~250–300 m off the coast), so it meets the map's sea without an edge.
 */
export const REGION_SEA_EDGE = [40, 240];

/** Color of the map style's sea (src/config.js → BASEMAP.sea): a region's sea fades to it at its outline. */
export const MAP_SEA = '#aad3df';

const smoothstep = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/**
 * How much of a region's water is the real map's sea (0 … 1) at a point of its
 * own frame: near its outline and only on the open sea (water.png tint < 0.1;
 * pools and lagoons, tint ≥ 0.25, never). Same as the still-water shader
 * (layers/water.js, SEA_EDGE).
 * @param {ReturnType<typeof makeDesignArea>} own the region's area, its own frame
 * @param {number} x
 * @param {number} z
 * @param {number} tint water.png green channel, 0 … 1
 */
export function seaEdge(own, x, z, tint) {
  return (1 - smoothstep(REGION_SEA_EDGE[0], REGION_SEA_EDGE[1], -own.signedDistance(x, z))) * (1 - smoothstep(0.1, 0.25, tint));
}

/**
 * The neighbors of a focused park with the opacity of each of their layers
 * (functions of the neighbor's own local coordinates), in priority order.
 *
 *  - `cull`: everything the neighbor yields to (its own fade × the focused
 *    park × the parks ranked before it); ground cells where it is 0 are not
 *    built (layers/neighbors.js → groundGrid).
 *  - `ground`: the ground's opacity. A park: = cull. A region: (1 − its own
 *    fade) × the focused park's fade only (the web computes it per pixel,
 *    regionGround): the neighbor parks are blended over it with their own
 *    opacity, so the region does not yield to them.
 *  - `water`: the water's yield factor (multiplies the water's own alpha). A
 *    park: = cull. A region: only where it yields to the parks (yieldOpacity);
 *    its own fade is applied by `regionWaterAlpha` (kept on pools and lagoons,
 *    lifted on the open sea near its outline).
 * @param {{ key: string, center: object, clear: object }} focus park.json of the focused park (+ key)
 * @param {object[]} parks park.json (+ key) of the other parks
 * @returns {Array<ReturnType<typeof findNeighbors>[number] & { own: ReturnType<typeof makeDesignArea>,
 *   yieldTo: Array<ReturnType<typeof makeDesignArea>>, opacity: { cull: Function, ground: Function, water: Function } }>}
 */
export function neighborLayers(focus, parks) {
  const focusArea = makeDesignArea(focus.clear);
  const found = findNeighbors(focus, parks);
  const yieldTo = [focusArea];
  return found.map((n) => {
    const own = makeDesignArea(n.park.clear);
    const areas = [...yieldTo];
    const cull = neighborOpacity(own, n.offset, areas);
    let ground = cull,
      water = cull;
    if (n.region) {
      ground = (x, z) => {
        const a = 1 - own.fade(x, z);
        if (a <= 0) return 0;
        const [wx, wz] = n.offset.toWorld(x, z);
        return a * focusArea.fade(wx, wz);
      };
      water = yieldOpacity(n.offset, areas);
    } else yieldTo.push(n.area);
    return { ...n, own, yieldTo: areas, opacity: { cull, ground, water } };
  });
}

/**
 * Opacity factor of a region's water at a point (its own frame): where it
 * yields to the parks × its own fade, except on the open sea near its outline,
 * which stays opaque (and takes the map's sea color, `edge`).
 * @param {number} yieldFactor neighborLayers → opacity.water at the point
 * @param {number} ownFade the region's own fade at the point
 * @param {number} edge seaEdge() at the point
 */
export const regionWaterFactor = (yieldFactor, ownFade, edge) => yieldFactor * ((1 - ownFade) * (1 - edge) + edge);

/**
 * Trees of a neighbor to draw for a density preset (QualityPreset.neighbors),
 * as indices into its decoded vegetation.bin. Only NEIGHBOR_TREE_TYPES, and
 * none more than TREE_YIELD inside an area the neighbor yields to. Parks: one
 * tree in `stride` = max(treeStride, ⌈count / maxTrees⌉). Regions: an even
 * pick of at most regionTrees among the eligible trees.
 * @param {Float32Array} data decoded vegetation.bin
 * @param {{ treeStride: number, maxTrees: number, regionTrees?: number }} preset
 * @param {boolean} region
 * @param {{ toWorld: (x: number, z: number) => number[] }} offset
 * @param {Array<ReturnType<typeof makeDesignArea>>} yieldTo areas in the focused frame
 * @returns {{ indices: number[], stride: number, eligible?: number, cap?: number }}
 */
export function pickNeighborTrees(data, preset, region, offset, yieldTo) {
  const count = data.length / TREE_STRIDE;
  const keep = (i) => {
    const o = i * TREE_STRIDE;
    if (!NEIGHBOR_TREE_TYPES.includes(data[o + 5])) return false;
    const [wx, wz] = offset.toWorld(data[o], data[o + 2]);
    return !yieldTo.some((area) => area.signedDistance(wx, wz) < -TREE_YIELD);
  };
  const indices = [];
  if (region) {
    const eligible = [];
    for (let i = 0; i < count; i++) if (keep(i)) eligible.push(i);
    const cap = preset.regionTrees ?? preset.maxTrees;
    const step = Math.max(1, eligible.length / cap);
    for (let k = 0; k < eligible.length; k += step) indices.push(eligible[Math.floor(k)]);
    return { indices, stride: step, eligible: eligible.length, cap };
  }
  // one tree in treeStride, fewer in very wooded parks (at most maxTrees)
  const stride = Math.max(preset.treeStride, Math.ceil(count / preset.maxTrees));
  for (let i = 0; i < count; i += stride) if (keep(i)) indices.push(i);
  return { indices, stride };
}

/**
 * Drops the triangles whose three vertices are (nearly) transparent and the
 * vertices no triangle uses any more.
 * @param {ArrayLike<number>} index triangle list
 * @param {ArrayLike<number>} alpha per vertex
 * @param {number} [min] alpha below this counts as 0 (default: half an 8-bit step)
 * @returns {{ index: number[], vertices: number[] }} index into the kept vertices, and the old index of each kept vertex
 */
export function clipTransparent(index, alpha, min = 0.5 / 255) {
  const remap = new Int32Array(alpha.length).fill(-1);
  const vertices = [];
  const out = [];
  for (let t = 0; t < index.length; t += 3) {
    const a = index[t],
      b = index[t + 1],
      c = index[t + 2];
    if (alpha[a] < min && alpha[b] < min && alpha[c] < min) continue;
    for (const v of [a, b, c]) {
      if (remap[v] < 0) {
        remap[v] = vertices.length;
        vertices.push(v);
      }
      out.push(remap[v]);
    }
  }
  return { index: out, vertices };
}

/**
 * The outline of a designed area moved by `distance` meters along its radii
 * (< 0 inwards), as a closed polyline (first point not repeated).
 * @param {ReturnType<typeof makeDesignArea>} area
 * @param {number} [distance]
 * @param {number} [points] defaults to 2 per radius
 * @returns {Array<[number, number]>}
 */
export function outlinePolyline(area, distance = 0, points = area.radii.length * 2) {
  const out = [];
  for (let k = 0; k < points; k++) {
    const angle = (k / points) * Math.PI * 2;
    const r = Math.max(0, area.radiusAt(angle) + distance);
    out.push([area.cx + Math.cos(angle) * r, area.cz + Math.sin(angle) * r]);
  }
  return out;
}

const round = (v, digits = 2) => Math.round(v * 10 ** digits) / 10 ** digits;
const roundPoints = (points) => points.map(([x, z]) => [round(x, 1), round(z, 1)]);

/**
 * Where a neighbor sits in the focused frame, for context.json: its offset,
 * designed area and outlines (focused-frame meters).
 *  - `clear`: the designed area moved into the focused frame (same polar
 *    profile as park.json → clear, radii unchanged).
 *  - `outline`: where its ground starts to show (signed distance +FADE.outer):
 *    nothing of it outside.
 *  - `opaqueOutline`: where its own fade ends (−FADE.inner): inside it, the
 *    ground is opaque except where it yields to the focused park or to a
 *    neighbor ranked before it.
 * @param {ReturnType<typeof neighborLayers>[number]} n
 * @param {number} priority index in neighborLayers (0 = drawn over the others)
 */
export function neighborPlacement(n, priority) {
  return {
    key: n.key,
    region: n.region,
    priority,
    gap: round(n.gap, 1),
    center: { lat: n.park.center.lat, lng: n.park.center.lng },
    offset: { x: round(n.offset.dx, 3), z: round(n.offset.dz, 3), sx: n.offset.sx },
    clear: { cx: round(n.area.cx, 3), cz: round(n.area.cz, 3), radii: n.area.radii },
    outline: roundPoints(outlinePolyline(n.area, FADE.outer)),
    opaqueOutline: roundPoints(outlinePolyline(n.area, -FADE.inner)),
  };
}

/**
 * How the app's real map (OpenStreetMap tiles) gives way to the context
 * ground, written to context.json → basemapYield.
 */
export const BASEMAP_YIELD = {
  mode: 'draw-over',
  summary:
    'Draw every ctx-ground node AFTER the OSM tiles (and after the focused park fade quad), alpha-blended with its baked COLOR_0 alpha, depth test and depth write off. Inside each neighbor/region (inside opaqueOutline, away from the parks it yields to) the alpha is 1, so the map is fully hidden there; outside `outline` there is no context ground.',
  regionCorrection: {
    why: 'In the 50 m band where the focused park fades into a region (the region surrounds Xcaret, Xplor and Xenses) the map would still show at up to 25 % (fade·(1−fade)), as the web avoids with basemap.setRegion.',
    formula:
      'alphaOSM = f * (1 - r) / max(1 - r * f, 1e-4), f = focused park fade (the OSM fade quad alpha today), r = 1 - fade(region clear, x, z)',
    region: 'neighbors[i] with region: true → clear (focused frame) and fade (inner/outer)',
    optional:
      'without it the result is the web neighbor-park behavior (a faint map ghost only inside that band); tiles fully inside a region opaqueOutline can be skipped',
  },
};

/**
 * Ground grid of a neighbor for the mobile context bundle: the web's
 * (layers/neighbors.js → groundGrid: `cell` m cells, at most `maxSegments` per
 * side, only cells that show something) with the cells where the opacity
 * changes (the fade bands) split into F × F (F even, ≤ `bandCell` m each), so
 * a per-vertex opacity follows the outlines as smoothly as the web's per-pixel
 * one. A whole cell next to a split one is drawn as a fan from its center
 * through every point of the shared edge: no T-junctions, no cracks.
 * Triangles wind like groundGrid's (clockwise in x/z, counter-clockwise seen
 * from above with z pointing south).
 * @param {{ cx: number, cz: number, size: number }} extent the neighbor's park.json extent
 * @param {ReturnType<typeof makeDesignArea>} own its area (own frame)
 * @param {(x: number, z: number) => number} cull a cell is kept when this is > 0.002 at a corner (neighborLayers → opacity.cull)
 * @param {(x: number, z: number) => number} alphaAt the opacity that is baked (opacity.ground)
 * @param {{ cell?: number, maxSegments?: number, bandCell?: number }} [options]
 * @returns {{ x0: number, z0: number, cell: number, step: number, lattice: number, points: number[], index: number[], fine: number, cells: number }}
 *          points: lattice coordinates (i, j) per vertex, position = (x0 + i · step, z0 + j · step); lattice: steps per side
 */
export function contextGroundGrid(extent, own, cull, alphaAt, { cell = 12, maxSegments = 128, bandCell = 9 } = {}) {
  const { cx, cz, size } = extent;
  const S = Math.min(maxSegments, Math.ceil(size / cell));
  const c = size / S;
  const F = c > bandCell ? 2 * Math.ceil(c / (2 * bandCell)) : 1;
  const x0 = cx - size / 2,
    z0 = cz - size / 2;
  const V = S + 1;
  const cullAt = new Float32Array(V * V),
    alpha = new Float32Array(V * V);
  for (let j = 0; j < V; j++)
    for (let i = 0; i < V; i++) {
      cullAt[j * V + i] = cull(x0 + i * c, z0 + j * c);
      alpha[j * V + i] = alphaAt(x0 + i * c, z0 + j * c);
    }
  const corners = (i, j) => [j * V + i, j * V + i + 1, (j + 1) * V + i, (j + 1) * V + i + 1];
  const kept = new Uint8Array(S * S),
    fine = new Uint8Array(S * S);
  for (let j = 0; j < S; j++)
    for (let i = 0; i < S; i++) {
      const k = corners(i, j);
      if (Math.max(...k.map((v) => cullAt[v])) < 0.002) continue;
      if (own.signedDistance(x0 + (i + 0.5) * c, z0 + (j + 0.5) * c) > FADE.outer + c * 1.5) continue;
      kept[j * S + i] = 1;
      const a = k.map((v) => alpha[v]);
      if (F > 1 && Math.max(...a) > 0.5 / 255 && Math.min(...a) < 1 - 0.5 / 255) fine[j * S + i] = 1;
    }
  const isFine = (i, j) => i >= 0 && j >= 0 && i < S && j < S && fine[j * S + i] === 1;

  const L = S * F;
  const ids = new Map();
  const points = [];
  const index = [];
  const vertex = (gi, gj) => {
    const key = gj * (L + 1) + gi;
    let id = ids.get(key);
    if (id === undefined) {
      id = points.length / 2;
      ids.set(key, id);
      points.push(gi, gj);
    }
    return id;
  };
  // (a, d, b) with a = (i, j), d = (i, j + 1), b = (i + 1, j): groundGrid's winding
  const quad = (gi, gj, s) => {
    const a = vertex(gi, gj),
      b = vertex(gi + s, gj),
      d = vertex(gi, gj + s),
      e = vertex(gi + s, gj + s);
    index.push(a, d, b, b, d, e);
  };
  let fineCount = 0;
  for (let j = 0; j < S; j++)
    for (let i = 0; i < S; i++) {
      if (!kept[j * S + i]) continue;
      const gi = i * F,
        gj = j * F;
      if (fine[j * S + i]) {
        fineCount++;
        for (let b = 0; b < F; b++) for (let a = 0; a < F; a++) quad(gi + a, gj + b, 1);
        continue;
      }
      const split = [isFine(i, j - 1), isFine(i + 1, j), isFine(i, j + 1), isFine(i - 1, j)]; // north, east, south, west
      if (!split.some(Boolean)) {
        quad(gi, gj, F);
        continue;
      }
      // fan from the center over the outline, east along the north edge first
      const loop = [];
      const edge = (from, to, n) => {
        for (let s = 0; s < n; s++) loop.push([from[0] + ((to[0] - from[0]) * s) / n, from[1] + ((to[1] - from[1]) * s) / n]);
      };
      const nw = [gi, gj],
        ne = [gi + F, gj],
        se = [gi + F, gj + F],
        sw = [gi, gj + F];
      edge(nw, ne, split[0] ? F : 1);
      edge(ne, se, split[1] ? F : 1);
      edge(se, sw, split[2] ? F : 1);
      edge(sw, nw, split[3] ? F : 1);
      const center = vertex(gi + F / 2, gj + F / 2);
      // going east then south is (a, b, d) order: reverse it for groundGrid's winding
      for (let k = 0; k < loop.length; k++) {
        const p = loop[k],
          q = loop[(k + 1) % loop.length];
        index.push(center, vertex(q[0], q[1]), vertex(p[0], p[1]));
      }
    }
  return { x0, z0, cell: c, step: c / F, lattice: L, points, index, fine: fineCount, cells: kept.reduce((t, v) => t + v, 0) };
}
