// Walking graph of a park and shortest walking routes over it (navigation:
// docs/arquitectura.md, «Navegación a pie»). Pure functions, no three.js:
// used by the app (src/app/navigation.js) and by the tests; the Android app
// can port them one to one.
//
//   const graph = buildGraph(park);                  // park.json
//   const r = route(graph, { x, z }, { x, z }, { t, landmarks });
//   r.points  [[x, z], …]  from the start to the destination (connectors included)
//   r.steps   [{ turn, instruction, distance, along, at, near? }, …]
//
// Edges come from park.json → walkways (lines that meet at exactly equal
// coordinates; loose ends within NAV.snap m are joined to the closest line)
// and from the official route lines (routes[].lines), tied to the walkways
// every NAV.linkStep m where they run within NAV.link m of each other. Pieces
// of the network that stay apart are bridged when they come within NAV.bridge
// m. The start and the destination are not graph nodes: they are projected
// onto the closest edge (≤ NAV.reach m for activities) when routing.

export const NAV = {
  /** m: loose walkway ends this close to another line are joined to it */
  snap: 4,
  /** m: an official route line within this distance of a walkway is tied to it */
  link: 6,
  /** m: spacing of those ties along the route line */
  linkStep: 20,
  /** m: a dead end this close to another walkway is tied to it when the way around is long */
  deadEnd: 25,
  /** m: separate pieces of the network closer than this are bridged */
  bridge: 30,
  /** m: farthest an activity may be from the network (connector to its entrance) */
  reach: 60,
  /** walking speed (m/s), ≈ 4.5 km/h */
  speed: 1.25,
  /** cost per meter by edge kind: official routes and walkways are preferred to ties and bridges */
  weights: { route: 0.95, walkway: 1, link: 1.15, bridge: 1.4 },
};

const CELL = 25;

/**
 * @typedef {object} NavGraph
 * @property {number[]} x                   node coordinates
 * @property {number[]} z
 * @property {Array<{ a: number, b: number, kind: string, len: number }>} edges
 * @property {Array<Array<[number, number]>>} adj   per node: [edge index, other node]
 * @property {number[]} comp                connected component of each node
 * @property {number[]} compSize            nodes per component
 * @property {Map<string, number[]>} grid   edge spatial index (CELL m)
 * @property {{ nodes: number, edges: number, components: number, bridges: number, length: number }} stats
 */

/**
 * Builds the walking graph of a park.
 * @param {{ walkways?: number[][][], routes?: Array<{ lines: number[][][] }> }} park  park.json
 * @param {Partial<typeof NAV>} [options]
 * @returns {NavGraph}
 */
export function buildGraph(park, options = {}) {
  const o = { ...NAV, ...options };
  const b = new Builder();
  let lineId = 0;
  const walkLines = [];
  for (const line of park.walkways ?? []) {
    const id = lineId++;
    const nodes = line.map(([x, z]) => b.node(x, z));
    for (let i = 1; i < nodes.length; i++) b.edge(nodes[i - 1], nodes[i], 'walkway', id);
    if (nodes.length > 1) walkLines.push({ id, first: nodes[0], last: nodes.at(-1) });
  }
  const routeLines = [];
  for (const r of park.routes ?? [])
    for (const line of r.lines ?? []) {
      const id = lineId++;
      const nodes = line.map(([x, z]) => b.node(x, z));
      for (let i = 1; i < nodes.length; i++) b.edge(nodes[i - 1], nodes[i], 'route', id);
      if (nodes.length > 1) routeLines.push({ id, first: nodes[0], last: nodes.at(-1) });
    }

  // loose ends: join to the closest other line within `snap` m
  for (const l of [...walkLines, ...routeLines]) {
    for (const n of [l.first, l.last]) {
      if (b.degree(n) !== 1) continue;
      const hit = b.nearest(b.x[n], b.z[n], o.snap, (e) => e.line !== l.id && e.a !== n && e.b !== n);
      if (!hit) continue;
      const m = b.split(hit);
      if (m !== n) b.edge(n, m, b.edges[hit.e].kind, l.id);
    }
  }

  // official routes run along walkways: tie them every `linkStep` m (and at their ends)
  if (walkLines.length)
    for (const l of routeLines) {
      const samples = b.samplesAlong(l.id, o.linkStep);
      for (const s of samples) {
        const hit = b.nearest(s.x, s.z, o.link, (e) => e.kind === 'walkway');
        if (!hit) continue;
        const from = b.split(s);
        const to = b.split(hit);
        if (from !== to && !b.connected(from, to)) b.edge(from, to, 'link', -1);
      }
    }

  // dead ends that stop just short of another walkway (plazas, gaps in OSM):
  // a short tie when walking around would be much longer
  for (let n = 0; n < b.x.length; n++) {
    if (b.degree(n) !== 1) continue;
    // edges already reachable on foot without a long way around do not count
    const near = b.within(n, DETOUR * o.deadEnd + 30);
    const hit = b.nearest(b.x[n], b.z[n], o.deadEnd, (e) => {
      const da = near.get(e.a) ?? Infinity,
        db = near.get(e.b) ?? Infinity;
      return Math.min(da, db) > DETOUR * Math.hypot(b.x[e.a] - b.x[n], b.z[e.a] - b.z[n]) + 30;
    });
    if (!hit) continue;
    const m = b.split(hit);
    b.edge(n, m, 'bridge', -1);
  }

  return finish(b, o);
}

/** A dead-end tie is added when the way around is longer than DETOUR × its length + 30 m. */
const DETOUR = 3;

/** Graph building state: nodes by exact coordinates, edges with a grid index. */
class Builder {
  constructor() {
    this.x = [];
    this.z = [];
    this.keys = new Map();
    this.edges = [];
    this.inc = []; // per node: incident edge indices (alive or not)
    this.grid = new Map();
  }

  node(x, z) {
    const key = `${x},${z}`;
    let n = this.keys.get(key);
    if (n === undefined) {
      n = this.x.length;
      this.x.push(x);
      this.z.push(z);
      this.inc.push([]);
      this.keys.set(key, n);
    }
    return n;
  }

  edge(a, b, kind, line) {
    if (a === b) return -1;
    const len = Math.hypot(this.x[b] - this.x[a], this.z[b] - this.z[a]);
    const e = this.edges.length;
    this.edges.push({ a, b, kind, len, line, dead: false });
    this.inc[a].push(e);
    this.inc[b].push(e);
    indexEdge(this.grid, e, this.x[a], this.z[a], this.x[b], this.z[b]);
    return e;
  }

  /** Nodes reachable from `n` within `limit` m over live edges (bounded Dijkstra). */
  within(n, limit) {
    const dist = new Map([[n, 0]]);
    const heap = new MinHeap();
    heap.push(0, n);
    while (heap.size) {
      const i = heap.pop();
      const d = dist.get(i);
      for (const e of this.inc[i]) {
        const ed = this.edges[e];
        if (ed.dead) continue;
        const m = ed.a === i ? ed.b : ed.a;
        const nd = d + ed.len;
        if (nd <= limit && nd < (dist.get(m) ?? Infinity)) {
          dist.set(m, nd);
          heap.push(nd, m);
        }
      }
    }
    return dist;
  }

  degree(n) {
    return this.inc[n].filter((e) => !this.edges[e].dead).length;
  }

  connected(a, b) {
    return this.inc[a].some((e) => !this.edges[e].dead && (this.edges[e].a === b || this.edges[e].b === b));
  }

  /** Closest point on a live edge within `max` m: { e, t, x, z, d } or null. */
  nearest(x, z, max, accept = () => true) {
    return nearestOnGrid(this.grid, this.edges, this.x, this.z, x, z, max, (e) => !e.dead && accept(e));
  }

  /** Node at a point of an edge ({ e, t }), splitting the edge when the point is inside it. */
  split({ e, t }) {
    const ed = this.edges[e];
    if (t * ed.len < 0.05) return ed.a;
    if ((1 - t) * ed.len < 0.05) return ed.b;
    const x = this.x[ed.a] + (this.x[ed.b] - this.x[ed.a]) * t;
    const z = this.z[ed.a] + (this.z[ed.b] - this.z[ed.a]) * t;
    const n = this.node(x, z);
    ed.dead = true;
    this.edge(ed.a, n, ed.kind, ed.line);
    this.edge(n, ed.b, ed.kind, ed.line);
    return n;
  }

  /**
   * Points every `step` m along a line (both ends included), each as
   * { e, t, x, z } on the live edge it falls on. Walks the line from one end.
   */
  samplesAlong(line, step) {
    const out = [];
    const edges = this.edges.map((ed, i) => [ed, i]).filter(([ed]) => !ed.dead && ed.line === line);
    if (!edges.length) return out;
    const byNode = new Map();
    for (const [ed, i] of edges)
      for (const n of [ed.a, ed.b]) {
        if (!byNode.has(n)) byNode.set(n, []);
        byNode.get(n).push(i);
      }
    const start = [...byNode.keys()].find((n) => byNode.get(n).length === 1) ?? edges[0][0].a;
    const used = new Set();
    let n = start,
      walked = 0,
      next = 0;
    for (;;) {
      const e = byNode.get(n).find((i) => !used.has(i));
      if (e === undefined) break;
      used.add(e);
      const ed = this.edges[e];
      const fwd = ed.a === n;
      while (next <= walked + ed.len) {
        const k = (next - walked) / ed.len;
        const t = fwd ? k : 1 - k;
        out.push({ e, t, x: this.x[ed.a] + (this.x[ed.b] - this.x[ed.a]) * t, z: this.z[ed.a] + (this.z[ed.b] - this.z[ed.a]) * t });
        next += step;
      }
      walked += ed.len;
      n = fwd ? ed.b : ed.a;
    }
    const last = this.edges[[...used].at(-1)];
    const end = last.a === n ? 0 : 1;
    out.push({ e: [...used].at(-1), t: end, x: this.x[n], z: this.z[n] });
    // splitting one sample's edge changes the edge index of the later ones: resolve lazily
    return out.map((s) => this.live(s));
  }

  /** A sample whose edge may be split later: re-found on the current live edges when used. */
  live(s) {
    const self = this;
    return {
      x: s.x,
      z: s.z,
      get e() {
        return self.resolve(s).e;
      },
      get t() {
        return self.resolve(s).t;
      },
    };
  }

  resolve(s) {
    if (!this.edges[s.e].dead) return s;
    const line = this.edges[s.e].line;
    const hit = this.nearest(s.x, s.z, 0.5, (e) => e.line === line);
    if (hit) {
      s.e = hit.e;
      s.t = hit.t;
    }
    return s;
  }
}

function indexEdge(grid, e, x0, z0, x1, z1) {
  const i0 = Math.floor(Math.min(x0, x1) / CELL),
    i1 = Math.floor(Math.max(x0, x1) / CELL);
  const j0 = Math.floor(Math.min(z0, z1) / CELL),
    j1 = Math.floor(Math.max(z0, z1) / CELL);
  for (let i = i0; i <= i1; i++)
    for (let j = j0; j <= j1; j++) {
      const key = `${i},${j}`;
      let list = grid.get(key);
      if (!list) grid.set(key, (list = []));
      list.push(e);
    }
}

/** Closest point to (x, z) on the indexed edges accepted by `accept`, within `max` m. */
function nearestOnGrid(grid, edges, xs, zs, x, z, max, accept) {
  let best = null;
  const ci = Math.floor(x / CELL),
    cj = Math.floor(z / CELL);
  const seen = new Set();
  const rings = Math.ceil(max / CELL) + 1;
  for (let r = 0; r <= rings; r++) {
    // cells at Chebyshev distance r: anything there is at least (r - 1) · CELL away
    if (best && best.d < (r - 1) * CELL) break;
    for (let i = ci - r; i <= ci + r; i++)
      for (let j = cj - r; j <= cj + r; j++) {
        if (Math.max(Math.abs(i - ci), Math.abs(j - cj)) !== r) continue;
        for (const e of grid.get(`${i},${j}`) ?? []) {
          if (seen.has(e)) continue;
          seen.add(e);
          const ed = edges[e];
          if (!accept(ed, e)) continue;
          const p = projectSegment(x, z, xs[ed.a], zs[ed.a], xs[ed.b], zs[ed.b]);
          if (p.d <= max && (!best || p.d < best.d)) best = { e, ...p };
        }
      }
  }
  return best;
}

/** Projection of (x, z) on segment a → b: { t, x, z, d }. */
export function projectSegment(x, z, ax, az, bx, bz) {
  const dx = bx - ax,
    dz = bz - az;
  const l2 = dx * dx + dz * dz;
  const t = l2 ? Math.max(0, Math.min(1, ((x - ax) * dx + (z - az) * dz) / l2)) : 0;
  const px = ax + dx * t,
    pz = az + dz * t;
  return { t, x: px, z: pz, d: Math.hypot(x - px, z - pz) };
}

/** Compacts the live edges, bridges separate pieces and builds the adjacency. */
function finish(b, o) {
  const keep = b.edges.filter((e) => !e.dead);
  // drop nodes no live edge uses
  const used = new Set();
  for (const e of keep) used.add(e.a).add(e.b);
  const remap = new Map();
  const x = [],
    z = [];
  for (let n = 0; n < b.x.length; n++)
    if (used.has(n)) {
      remap.set(n, x.length);
      x.push(b.x[n]);
      z.push(b.z[n]);
    }
  const edges = keep.map((e) => ({ a: remap.get(e.a), b: remap.get(e.b), kind: e.kind, len: e.len }));

  // bridges: shortest node pairs between pieces, Kruskal-style, up to `bridge` m
  const uf = unionFind(x.length);
  for (const e of edges) uf.union(e.a, e.b);
  const nodeGrid = new Map();
  for (let n = 0; n < x.length; n++) {
    const key = `${Math.floor(x[n] / o.bridge)},${Math.floor(z[n] / o.bridge)}`;
    if (!nodeGrid.has(key)) nodeGrid.set(key, []);
    nodeGrid.get(key).push(n);
  }
  const pairs = new Map(); // "rootA,rootB" → [d, a, b]
  for (let n = 0; n < x.length; n++) {
    const ci = Math.floor(x[n] / o.bridge),
      cj = Math.floor(z[n] / o.bridge);
    const rn = uf.find(n);
    for (let i = ci - 1; i <= ci + 1; i++)
      for (let j = cj - 1; j <= cj + 1; j++)
        for (const m of nodeGrid.get(`${i},${j}`) ?? []) {
          if (m <= n) continue;
          const rm = uf.find(m);
          if (rm === rn) continue;
          const d = Math.hypot(x[m] - x[n], z[m] - z[n]);
          if (d > o.bridge) continue;
          const key = rn < rm ? `${rn},${rm}` : `${rm},${rn}`;
          const cur = pairs.get(key);
          if (!cur || d < cur[0]) pairs.set(key, [d, n, m]);
        }
  }
  let bridges = 0;
  for (const [d, a, c] of [...pairs.values()].sort((p, q) => p[0] - q[0])) {
    if (uf.find(a) === uf.find(c)) continue;
    uf.union(a, c);
    edges.push({ a, b: c, kind: 'bridge', len: d });
    bridges++;
  }

  const adj = x.map(() => []);
  const grid = new Map();
  edges.forEach((e, i) => {
    adj[e.a].push([i, e.b]);
    adj[e.b].push([i, e.a]);
    indexEdge(grid, i, x[e.a], z[e.a], x[e.b], z[e.b]);
  });
  const roots = new Map();
  const comp = x.map((_, n) => {
    const r = uf.find(n);
    if (!roots.has(r)) roots.set(r, roots.size);
    return roots.get(r);
  });
  const compSize = new Array(roots.size).fill(0);
  for (const c of comp) compSize[c]++;
  return {
    x,
    z,
    edges,
    adj,
    comp,
    compSize,
    grid,
    weights: o.weights,
    reach: o.reach,
    stats: {
      nodes: x.length,
      edges: edges.length,
      components: roots.size,
      bridges,
      length: edges.reduce((s, e) => s + (e.kind === 'link' || e.kind === 'bridge' ? 0 : e.len), 0),
    },
  };
}

function unionFind(n) {
  const parent = Array.from({ length: n }, (_, i) => i);
  const find = (i) => {
    while (parent[i] !== i) i = parent[i] = parent[parent[i]];
    return i;
  };
  return {
    find,
    union(a, b) {
      const ra = find(a),
        rb = find(b);
      if (ra !== rb) parent[Math.max(ra, rb)] = Math.min(ra, rb);
    },
  };
}

/**
 * Closest point of the graph to (x, z): { e, t, x, z, d, comp } or null (empty graph,
 * or nothing within `max` m). `comp` restricts the search to one component.
 * @param {NavGraph} graph
 */
export function nearestPoint(graph, x, z, { max = Infinity, comp } = {}) {
  if (!graph.edges.length) return null;
  const accept = comp === undefined ? () => true : (ed) => graph.comp[ed.a] === comp;
  // grow the search radius instead of scanning everything at once
  for (let r = 50; ; r *= 4) {
    const lim = Math.min(r, max);
    const hit = nearestOnGrid(graph.grid, graph.edges, graph.x, graph.z, x, z, lim, accept);
    if (hit) return { ...hit, comp: graph.comp[graph.edges[hit.e].a] };
    if (lim >= max || r > 1e5) return null;
  }
}

/**
 * Shortest walking route (A*) from `from` to `to`. Both are projected on the
 * closest edge (the same component for both: the bigger one wins); the
 * stretches between them and the network are part of the route (`gaps`). With
 * no network nearby the route is a straight line (`direct`).
 *
 * @param {NavGraph} graph
 * @param {{ x: number, z: number }} from
 * @param {{ x: number, z: number, name?: string }} to   `name`: destination name for the last step
 * @param {{ t?: (key: string) => string, landmarks?: Array<{ name: string, x: number, z: number }> }} [options]
 *        t: translator for the step texts (nav_* keys); landmarks: names mentioned at turns
 * @returns {{ points: number[][], length: number, steps: object[], gaps: [number, number], direct: boolean }}
 *          gaps: meters of connector at the start and at the end (drawn dashed)
 */
export function route(graph, from, to, { t, landmarks = [] } = {}) {
  const finishRoute = (points, gaps, direct, isJunction) => {
    const pts = dedupe(points);
    return { points: pts, length: polylineLength(pts), steps: makeSteps(pts, { t, landmarks, name: to.name, isJunction }), gaps, direct };
  };
  const direct = () =>
    finishRoute(
      [
        [from.x, from.z],
        [to.x, to.z],
      ],
      [0, 0],
      true,
    );
  let s = nearestPoint(graph, from.x, from.z);
  let e = nearestPoint(graph, to.x, to.z);
  if (!s || !e) return direct();
  if (s.comp !== e.comp) {
    // keep the bigger piece of the network; move the other end onto it
    if (graph.compSize[s.comp] >= graph.compSize[e.comp]) e = nearestPoint(graph, to.x, to.z, { comp: s.comp });
    else s = nearestPoint(graph, from.x, from.z, { comp: e.comp });
  }
  // a straight walk is shorter than reaching the network
  const straight = Math.hypot(to.x - from.x, to.z - from.z);
  if (straight <= s.d + e.d) return direct();
  const path = astar(graph, s, e);
  if (!path) return direct();
  const onGraph = pruneSpikes([[s.x, s.z], ...path.map((n) => [graph.x[n], graph.z[n]]), [e.x, e.z]]);
  const points = [[from.x, from.z], ...onGraph, [to.x, to.z]];
  // decision points: crossings of the network and where the walk joins / leaves it
  const junctions = new Set([`${s.x},${s.z}`, `${e.x},${e.z}`]);
  for (const n of path) if (graph.adj[n].length >= 3) junctions.add(`${graph.x[n]},${graph.z[n]}`);
  return finishRoute(points, [s.d, e.d], false, (x, z) => junctions.has(`${x},${z}`));
}

/** A* between two points on edges; returns the graph nodes in between (maybe none). */
function astar(graph, s, e) {
  const { x, z, edges, adj, weights } = graph;
  const n = x.length;
  const S = n,
    E = n + 1;
  const es = edges[s.e],
    ee = edges[e.e];
  const w = (ed) => weights[ed.kind] ?? 1;
  const minW = Math.min(...Object.values(weights));
  const h = (i) => (i === E ? 0 : Math.hypot((i === S ? s.x : x[i]) - e.x, (i === S ? s.z : z[i]) - e.z) * minW);
  // virtual start S (on edge s.e) and end E (on edge e.e)
  const neighbors = (i) => {
    const out = [];
    if (i === S) {
      out.push([es.a, s.t * es.len * w(es)], [es.b, (1 - s.t) * es.len * w(es)]);
      if (s.e === e.e) out.push([E, Math.abs(s.t - e.t) * es.len * w(es)]);
      return out;
    }
    for (const [ei, m] of adj[i]) out.push([m, edges[ei].len * w(edges[ei])]);
    if (i === ee.a) out.push([E, e.t * ee.len * w(ee)]);
    if (i === ee.b) out.push([E, (1 - e.t) * ee.len * w(ee)]);
    return out;
  };
  const g = new Float64Array(n + 2).fill(Infinity);
  const prev = new Int32Array(n + 2).fill(-1);
  const closed = new Uint8Array(n + 2);
  g[S] = 0;
  const heap = new MinHeap();
  heap.push(h(S), S);
  while (heap.size) {
    const i = heap.pop();
    if (closed[i]) continue;
    if (i === E) break;
    closed[i] = 1;
    for (const [m, c] of neighbors(i)) {
      const ng = g[i] + c;
      if (ng < g[m]) {
        g[m] = ng;
        prev[m] = i;
        heap.push(ng + h(m), m);
      }
    }
  }
  if (g[E] === Infinity) return null;
  const path = [];
  for (let i = prev[E]; i !== S && i !== -1; i = prev[i]) path.push(i);
  return path.reverse();
}

class MinHeap {
  constructor() {
    this.k = [];
    this.v = [];
  }
  get size() {
    return this.k.length;
  }
  push(key, value) {
    const { k, v } = this;
    let i = k.length;
    k.push(key);
    v.push(value);
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (k[p] <= key) break;
      k[i] = k[p];
      v[i] = v[p];
      i = p;
    }
    k[i] = key;
    v[i] = value;
  }
  pop() {
    const { k, v } = this;
    const top = v[0];
    const lk = k.pop(),
      lv = v.pop();
    if (k.length) {
      let i = 0;
      for (;;) {
        let c = 2 * i + 1;
        if (c >= k.length) break;
        if (c + 1 < k.length && k[c + 1] < k[c]) c++;
        if (k[c] >= lk) break;
        k[i] = k[c];
        v[i] = v[c];
        i = c;
      }
      k[i] = lk;
      v[i] = lv;
    }
    return top;
  }
}

// ------------------------------------------------------------ polylines

/** Spikes shorter than this (m across) are cut (see pruneSpikes). */
export const SPIKE = { across: 8, lookahead: 120 };

/**
 * Cuts out-and-back spikes and small loops of a path: where it comes back
 * within SPIKE.across m of an earlier point after walking more than three
 * times that gap (+ 10 m), the stretch in between is replaced by the short
 * crossing. They appear where a walkway and an official route run side by
 * side and the path hops between them at a tie.
 */
export function pruneSpikes(points) {
  const out = [];
  let i = 0;
  while (i < points.length) {
    out.push(points[i]);
    let walked = 0,
      cut = -1;
    for (let j = i + 1; j < points.length && walked < SPIKE.lookahead; j++) {
      walked += Math.hypot(points[j][0] - points[j - 1][0], points[j][1] - points[j - 1][1]);
      const gap = Math.hypot(points[j][0] - points[i][0], points[j][1] - points[i][1]);
      if (gap < SPIKE.across && walked > 3 * gap + 10) cut = j;
    }
    i = cut > 0 ? cut : i + 1;
  }
  return out;
}

function dedupe(points) {
  const out = [];
  for (const p of points) {
    const q = out.at(-1);
    if (!q || Math.hypot(p[0] - q[0], p[1] - q[1]) > 0.05) out.push(p);
  }
  if (out.length === 1) out.push([...out[0]]);
  return out;
}

export function polylineLength(points) {
  let s = 0;
  for (let i = 1; i < points.length; i++) s += Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]);
  return s;
}

/** Cumulative distance at each point. */
export function cumulative(points) {
  const cum = [0];
  for (let i = 1; i < points.length; i++)
    cum.push(cum[i - 1] + Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]));
  return cum;
}

/** Point at distance `s` along the polyline, with the heading of that stretch: { x, z, dx, dz, i }. */
export function pointAlong(points, cum, s) {
  const L = cum.at(-1);
  s = Math.max(0, Math.min(L, s));
  // binary search for the segment
  let lo = 1,
    hi = points.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (cum[mid] < s) lo = mid + 1;
    else hi = mid;
  }
  const i = lo;
  const [ax, az] = points[i - 1],
    [bx, bz] = points[i];
  const len = cum[i] - cum[i - 1] || 1;
  const k = (s - cum[i - 1]) / len;
  return { x: ax + (bx - ax) * k, z: az + (bz - az) * k, dx: (bx - ax) / len, dz: (bz - az) / len, i };
}

// ------------------------------------------------------------ turn by turn

/**
 * Turn detection: heading change (°) above which a vertex is a turn (`min`;
 * `bend` where the path just bends with no other way to take), below which a
 * turn is "slight"; meters measured on each side (`window`), between two turns
 * (`merge`) and to a landmark named at a turn.
 */
export const TURNS = { min: 35, bend: 100, slight: 60, window: 10, merge: 18, landmark: 30 };

const COMPASS = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];

/** Compass point of a heading (x = east, z = south): 'n', 'ne', … */
export function compassOf(dx, dz) {
  const deg = (Math.atan2(dx, -dz) * 180) / Math.PI; // 0 = north, 90 = east
  return COMPASS[((Math.round(deg / 45) % 8) + 8) % 8];
}

/** Signed heading change (°) from direction a to b: > 0 = right (clockwise seen from above, north up). */
export function turnAngle(ax, az, bx, bz) {
  const cross = ax * bz - az * bx,
    dot = ax * bx + az * bz;
  return (Math.atan2(cross, dot) * 180) / Math.PI;
}

/**
 * Turn-by-turn steps of a polyline: a first "head <direction>" step, one step
 * per turn (heading change > TURNS.min° measured over TURNS.window m on each
 * side at a junction — `isJunction(x, z)` — or > TURNS.bend° elsewhere; turns
 * closer than TURNS.merge m keep the sharpest) and the arrival.
 * Each step: { turn: 'straight' | 'left' | 'right' | 'arrive', slight?, along
 * (m from the start), distance (m to the next step), at: [x, z], near?:
 * landmark name within TURNS.landmark m, instruction }.
 */
export function makeSteps(points, { t = (k) => k, landmarks = [], name, isJunction = () => true } = {}) {
  const cum = cumulative(points);
  const L = cum.at(-1);
  const candidates = [];
  for (let i = 1; i < points.length - 1; i++) {
    const s = cum[i];
    if (s < TURNS.window * 0.8 || L - s < TURNS.window * 0.8) continue;
    const a = pointAlong(points, cum, s - TURNS.window),
      b = pointAlong(points, cum, s + TURNS.window);
    const [x, z] = points[i];
    const inX = x - a.x,
      inZ = z - a.z,
      outX = b.x - x,
      outZ = b.z - z;
    if (Math.hypot(inX, inZ) < 1 || Math.hypot(outX, outZ) < 1) continue;
    const angle = turnAngle(inX, inZ, outX, outZ);
    if (Math.abs(angle) > (isJunction(x, z) ? TURNS.min : TURNS.bend)) candidates.push({ s, angle, at: [x, z] });
  }
  // non-maximum suppression: keep the sharpest turn within TURNS.merge m
  const turns = [];
  for (const c of [...candidates].sort((p, q) => Math.abs(q.angle) - Math.abs(p.angle)))
    if (turns.every((u) => Math.abs(u.s - c.s) > TURNS.merge)) turns.push(c);
  turns.sort((p, q) => p.s - q.s);

  const nearName = (x, z) => {
    let best = null;
    for (const lm of landmarks) {
      const d = Math.hypot(lm.x - x, lm.z - z);
      if (d <= TURNS.landmark && (!best || d < best.d)) best = { d, name: lm.name };
    }
    return best?.name;
  };
  const first = pointAlong(points, cum, Math.min(L, TURNS.window));
  const p0 = points[0];
  const hx = first.x - p0[0],
    hz = first.z - p0[1];
  const steps = [{ turn: 'straight', along: 0, at: [...p0], dir: compassOf(hx || first.dx, hz || first.dz) }];
  for (const u of turns) {
    // the same landmark is not repeated on consecutive turns
    let near = nearName(...u.at);
    if (near && steps.at(-1).near === near) near = undefined;
    steps.push({ turn: u.angle > 0 ? 'right' : 'left', slight: Math.abs(u.angle) < TURNS.slight, along: u.s, at: u.at, near });
  }
  steps.push({ turn: 'arrive', along: L, at: [...points.at(-1)], near: name });
  for (let i = 0; i < steps.length; i++) {
    steps[i].distance = i + 1 < steps.length ? steps[i + 1].along - steps[i].along : 0;
    steps[i].instruction = stepText(steps[i], t);
  }
  return steps;
}

/** Text of a step (nav_* keys of src/i18n; {dir}, {near}, {name} placeholders). */
export function stepText(step, t = (k) => k) {
  const fill = (s, vars) => s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');
  if (step.turn === 'straight') return fill(t('nav_head'), { dir: t(`nav_dir_${step.dir}`) });
  if (step.turn === 'arrive') return step.near ? fill(t('nav_arrive_at'), { name: step.near }) : t('nav_arrive');
  const base = t(`nav_${step.slight ? 'slight_' : ''}${step.turn}`);
  return step.near ? fill(t('nav_near'), { text: base, near: step.near }) : base;
}
