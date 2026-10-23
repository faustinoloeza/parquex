// Walkway network: OpenStreetMap footways/paths re-drawn on the walkways the
// park actually shows (the illustration's paths, a few meters to tens of
// meters away from OSM), as a graph whose lines meet at exactly the same
// coordinates at every junction.
//
//   split   → OSM ways cut at shared vertices: one edge per junction pair
//   snap    → junctions and points every `hop` m moved onto the nearest walkway
//             (once per junction, so every edge ending there ends at the same point)
//   route   → between consecutive snapped points, A* over the walkway raster
//             (centered); stretches with no walkway nearby keep the OSM line
//             (jungle trails the illustration hides; painted as paths later)
//   cut     → stretches over water that is not a pier or bridge are dropped
//   connect → loose ends close to another line are joined to it (the target
//             line gets a vertex at the joint)
import { densify, simplify, smooth } from './route-snapping.js';

const keyOf = ([x, z]) => `${x},${z}`;
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const lengthOf = (l) => l.reduce((s, q, i) => (i ? s + dist(q, l[i - 1]) : 0), 0);

/** Splits polylines at the vertices they share (exact coordinates) and at their ends. */
export function splitAtJunctions(lines) {
  const uses = new Map();
  for (const l of lines) l.forEach((p, i) => uses.set(keyOf(p), (uses.get(keyOf(p)) ?? 0) + (i === 0 || i === l.length - 1 ? 2 : 1)));
  const edges = [];
  for (const l of lines) {
    let cur = [l[0]];
    for (let i = 1; i < l.length; i++) {
      cur.push(l[i]);
      if (i === l.length - 1 || uses.get(keyOf(l[i])) > 1) {
        if (cur.length >= 2 && lengthOf(cur) > 0) edges.push(cur);
        cur = [l[i]];
      }
    }
  }
  return edges;
}

/**
 * Connected components of a line network where lines connect only through
 * vertices with exactly the same coordinates (how the mobile app builds its
 * graph). Returns the vertex count of each component, largest first.
 */
export function componentSizes(lines) {
  const parent = new Map();
  const find = (k) => {
    while (parent.get(k) !== k) {
      parent.set(k, parent.get(parent.get(k)));
      k = parent.get(k);
    }
    return k;
  };
  const add = (k) => parent.has(k) || parent.set(k, k);
  for (const l of lines) {
    l.forEach((p) => add(keyOf(p)));
    for (let i = 1; i < l.length; i++) {
      const a = find(keyOf(l[i - 1])),
        b = find(keyOf(l[i]));
      if (a !== b) parent.set(a, b);
    }
  }
  const sizes = new Map();
  for (const k of parent.keys()) sizes.set(find(k), (sizes.get(find(k)) ?? 0) + 1);
  return [...sizes.values()].sort((a, b) => b - a);
}

/** Closest point to p on segment ab, with its distance. */
function closestOnSegment(p, a, b) {
  const dx = b[0] - a[0],
    dz = b[1] - a[1],
    L2 = dx * dx + dz * dz || 1;
  const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dz) / L2));
  const q = [a[0] + dx * t, a[1] + dz * t];
  return { q, t, d: dist(p, q) };
}

/**
 * @param {number[][][]} ways  OSM walkway polylines (junctions share exact coordinates)
 * @param {object} o
 * @param {ReturnType<import('./route-snapping.js').makeRouter>} o.router  router over the walkway raster
 *        (its blocked raster includes water that is not walkable)
 * @param {(x: number, z: number) => boolean} o.inside  part of the park (others are dropped)
 * @param {(x: number, z: number) => boolean} o.overWater  water that is not a pier or bridge
 * @param {number} [o.snapRadius]  m searched around OSM points for a walkway
 * @param {number} [o.hop]         m between snapped points along an edge
 * @param {number} [o.join]        m within which loose ends are joined to another line
 * @returns {{ lines: number[][][], trails: number[][][] }} lines: the network;
 *          trails: stretches with no walkway on the ground (to be painted)
 */
export function buildWalkwayNetwork(ways, { router, inside, overWater, snapRadius = 24, hop = 10, join = 10 }) {
  const round = ([x, z]) => [+x.toFixed(2), +z.toFixed(2)];
  const edges = splitAtJunctions(ways).filter((e) => {
    const pts = densify(e, 2);
    return pts.filter((p) => inside(...p)).length >= pts.length / 2;
  });

  // ------------------------------------------------------------- snap + route
  const nodes = new Map();
  const node = (p) => {
    const k = keyOf(p);
    if (!nodes.has(k)) {
      const q = router.snapPoint(p, snapRadius);
      nodes.set(k, { p: round(q ?? p), ok: Boolean(q) });
    }
    return nodes.get(k);
  };
  const trails = [];
  let lines = [];
  for (const e of edges) {
    const a = node(e[0]),
      b = node(e[e.length - 1]);
    const dense = densify(e, hop);
    let shift = a.ok ? [a.p[0] - e[0][0], a.p[1] - e[0][1]] : [0, 0];
    const anchors = [
      { ...a, o: e[0] },
      // each point first looks where the previous one landed (keeps following
      // the same drawn walkway when two run on either side of the OSM line)
      ...dense.slice(1, -1).map((p) => {
        let q = router.snapPoint([p[0] + shift[0], p[1] + shift[1]], snapRadius / 3);
        if (!q || dist(q, p) > snapRadius) q = router.snapPoint(p, snapRadius);
        if (q) shift = [q[0] - p[0], q[1] - p[1]];
        return { p: q ?? p, ok: Boolean(q), o: p };
      }),
      { ...b, o: e[e.length - 1] },
    ];
    // anchors with no walkway in reach retry shifted like their snapped
    // neighbors (OSM and the drawing are offset by a similar amount along a way)
    anchors.forEach((A, i) => {
      if (A.ok) return;
      let before = null,
        after = null;
      for (let j = i - 1; j >= 0 && !before; j--) if (anchors[j].ok) before = [j, anchors[j]];
      for (let j = i + 1; j < anchors.length && !after; j++) if (anchors[j].ok) after = [j, anchors[j]];
      if (!before && !after) return;
      const off = ([, N]) => [N.p[0] - N.o[0], N.p[1] - N.o[1]];
      let shift;
      if (before && after) {
        const t = (i - before[0]) / (after[0] - before[0]);
        const [b0, b1] = off(before),
          [a0, a1] = off(after);
        shift = [b0 + (a0 - b0) * t, b1 + (a1 - b1) * t];
      } else shift = off(before ?? after);
      const q = router.snapPoint([A.o[0] + shift[0], A.o[1] + shift[1]], snapRadius / 2);
      if (q && dist(q, A.o) <= snapRadius * 1.5) Object.assign(A, { p: q, ok: true });
    });
    // drop interior anchors that snapped onto the same spot or back onto the previous one
    const pts = [a.p];
    for (let i = 1; i < anchors.length; i++) {
      const A = anchors[i - 1],
        B = anchors[i];
      if (B !== b && dist(B.p, pts[pts.length - 1]) < 2) continue;
      const path = A.ok && B.ok ? router.findPath(A.p, B.p, 12) : null;
      if (path && path.length > 2 && lengthOf(path) < 2 * dist(A.p, B.p) + 8) pts.push(...path.slice(1, -1));
      else if (!A.ok || !B.ok) trails.push([A.p, B.p]);
      pts.push(B.p);
    }
    const line = simplify(smooth(pts, 2, 2), 0.25).map((p, i, l) => (i === 0 ? a.p : i === l.length - 1 ? b.p : round(p)));
    // cut stretches over open water (no pier, no bridge) longer than 4 m
    const dense2 = densify(line, 0.5);
    const wet = dense2.map((p) => overWater(...p));
    let piece = [];
    const flush = () => {
      if (piece.length >= 2 && lengthOf(piece) > 1) lines.push(simplify(piece, 0.25).map(round));
      piece = [];
    };
    for (let i = 0; i < dense2.length;) {
      if (!wet[i]) {
        piece.push(dense2[i++]);
        continue;
      }
      let j = i;
      while (j < dense2.length && wet[j]) j++;
      if ((j - i) * 0.5 > 4) flush();
      else piece.push(...dense2.slice(i, j));
      i = j;
    }
    flush();
  }

  // drop exact duplicates (two OSM ways snapped onto the same walkway)
  const seen = new Set();
  lines = lines.filter((l) => {
    const k = [keyOf(l[0]), keyOf(l[l.length - 1]), Math.round(lengthOf(l))].sort().join('|');
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });

  // ---------------------------------------------------------------- connect
  const degree = () => {
    const deg = new Map();
    for (const l of lines) for (const p of [l[0], l[l.length - 1]]) deg.set(keyOf(p), (deg.get(keyOf(p)) ?? 0) + 1);
    // interior vertices shared with another line are junctions too
    const all = new Map();
    for (const l of lines) for (const p of l) all.set(keyOf(p), (all.get(keyOf(p)) ?? 0) + 1);
    return (p) => Math.max(deg.get(keyOf(p)) ?? 0, all.get(keyOf(p)) ?? 0);
  };
  let deg = degree();
  for (let li = 0; li < lines.length; li++) {
    for (const end of [0, 1]) {
      const l = lines[li];
      const p = end ? l[l.length - 1] : l[0];
      if (deg(p) !== 1) continue;
      let best = null;
      lines.forEach((m, mi) => {
        if (mi === li) return;
        for (let i = 1; i < m.length; i++) {
          const c = closestOnSegment(p, m[i - 1], m[i]);
          if (c.d <= join && c.d > 0 && (!best || c.d < best.d)) best = { ...c, mi, i };
        }
      });
      if (!best || router.crossesBlocked(p, best.q)) continue;
      const m = lines[best.mi];
      // joint: an existing vertex when close, otherwise a new one
      let q = round(best.q);
      if (dist(q, m[best.i - 1]) < 1) q = m[best.i - 1];
      else if (dist(q, m[best.i]) < 1) q = m[best.i];
      else m.splice(best.i, 0, q);
      if (dist(p, q) < 0.3) continue;
      // split the target line at the joint so the junction is a line end too
      const k = m.indexOf(q);
      if (k > 0 && k < m.length - 1) {
        lines.splice(best.mi, 1, m.slice(0, k + 1), m.slice(k));
        if (best.mi < li) li++;
      }
      lines.push([p, q]);
      deg = degree();
    }
  }
  // drop scraps left alone (< 40 m in all, not joined to anything)
  const parent = new Map();
  const find = (k) => (parent.get(k) === k ? k : find(parent.get(k)));
  for (const l of lines) for (const p of [l[0], l[l.length - 1]]) if (!parent.has(keyOf(p))) parent.set(keyOf(p), keyOf(p));
  for (const l of lines) parent.set(find(keyOf(l[0])), find(keyOf(l[l.length - 1])));
  const total = new Map();
  for (const l of lines) total.set(find(keyOf(l[0])), (total.get(find(keyOf(l[0]))) ?? 0) + lengthOf(l));
  lines = lines.filter((l) => total.get(find(keyOf(l[0]))) >= 40);
  return { lines, trails };
}
