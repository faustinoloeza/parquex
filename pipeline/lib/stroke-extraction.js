// Extracts thin colored lines (route strokes painted on the illustration) as
// polylines: color mask -> coarse grid -> per component spanning tree ->
// longest path + branches -> gap bridging -> smoothing + simplification.

const N8 = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

function chaikin(pts, iter = 2) {
  let p = pts;
  for (let k = 0; k < iter; k++) {
    if (p.length < 3) return p;
    const out = [p[0]];
    for (let i = 0; i < p.length - 1; i++) {
      const [x0, y0] = p[i],
        [x1, y1] = p[i + 1];
      out.push([0.75 * x0 + 0.25 * x1, 0.75 * y0 + 0.25 * y1], [0.25 * x0 + 0.75 * x1, 0.25 * y0 + 0.75 * y1]);
    }
    out.push(p[p.length - 1]);
    p = out;
  }
  return p;
}

function simplify(pts, tol) {
  if (pts.length < 3) return pts;
  const [ax, ay] = pts[0],
    [bx, by] = pts[pts.length - 1];
  const dx = bx - ax,
    dy = by - ay,
    len = Math.hypot(dx, dy) || 1;
  let best = -1,
    bd = 0;
  for (let i = 1; i < pts.length - 1; i++) {
    const d = Math.abs((pts[i][0] - ax) * dy - (pts[i][1] - ay) * dx) / len;
    if (d > bd) {
      bd = d;
      best = i;
    }
  }
  if (bd <= tol) return [pts[0], pts[pts.length - 1]];
  return [...simplify(pts.slice(0, best + 1), tol).slice(0, -1), ...simplify(pts.slice(best), tol)];
}

// Moving average along the path (keeps the end points).
function relax(pts, radius = 2) {
  return pts.map((p, i) => {
    if (i === 0 || i === pts.length - 1) return p;
    let sx = 0,
      sy = 0,
      n = 0;
    for (let k = Math.max(0, i - radius); k <= Math.min(pts.length - 1, i + radius); k++) {
      sx += pts[k][0];
      sy += pts[k][1];
      n++;
    }
    return [sx / n, sy / n];
  });
}

// Shortest distances over a cell set (8-neighbours, metric weights).
function distances(cells, sources, G) {
  const dist = new Map(),
    parent = new Map();
  const queue = [];
  for (const s of sources) {
    dist.set(s, 0);
    parent.set(s, -1);
    queue.push(s);
  }
  for (let q = 0; q < queue.length; q++) {
    const i = queue[q];
    const x = i % G,
      y = (i / G) | 0,
      d = dist.get(i);
    for (const [dx, dy] of N8) {
      const j = (y + dy) * G + x + dx;
      if (!cells.has(j)) continue;
      const nd = d + (dx && dy ? Math.SQRT2 : 1);
      if (nd < (dist.get(j) ?? Infinity)) {
        dist.set(j, nd);
        parent.set(j, i);
        queue.push(j);
      }
    }
  }
  return { dist, parent };
}

const farthest = (d) => [...d.entries()].reduce((a, b) => (b[1] > a[1] ? b : a));

/**
 * @param mask      Uint8Array (W*W) of line pixels at full illustration resolution
 * @param W         illustration size in pixels
 * @param toLocal   (u, v) in pixels -> [x, z] meters
 * @param metersPerPixel
 * @param opts      { cell, minLength, bridge, minHits, keepRatio, branch }
 */
export function extractLines(
  mask,
  W,
  toLocal,
  metersPerPixel,
  { cell = 2, minLength = 14, bridge = 14, minHits = 3, keepRatio = 0.15, branch = 10 } = {},
) {
  const cpx = cell / metersPerPixel;
  const G = Math.ceil(W / cpx);
  const counts = new Uint16Array(G * G);
  for (let v = 0; v < W; v++) for (let u = 0; u < W; u++) if (mask[v * W + u]) counts[Math.floor(v / cpx) * G + Math.floor(u / cpx)]++;
  const grid = new Uint8Array(G * G);
  for (let i = 0; i < grid.length; i++) grid[i] = counts[i] >= minHits ? 1 : 0;
  // drop blobs: cells whose whole neighbourhood is on belong to areas, not strokes
  const blob = new Uint8Array(G * G);
  for (let y = 1; y < G - 1; y++)
    for (let x = 1; x < G - 1; x++) {
      let all = grid[y * G + x];
      for (const [dx, dy] of N8) all &= grid[(y + dy) * G + x + dx];
      if (all)
        for (let dy = -2; dy <= 2; dy++)
          for (let dx = -2; dx <= 2; dx++) {
            const yy = y + dy,
              xx = x + dx;
            if (yy >= 0 && xx >= 0 && yy < G && xx < G) blob[yy * G + xx] = 1;
          }
    }
  for (let i = 0; i < grid.length; i++) if (blob[i]) grid[i] = 0;

  // connected components (8-neighbourhood)
  const comp = new Int32Array(G * G).fill(-1);
  const comps = [];
  for (let s = 0; s < grid.length; s++) {
    if (!grid[s] || comp[s] !== -1) continue;
    const cells = [s];
    comp[s] = comps.length;
    for (let k = 0; k < cells.length; k++) {
      const i = cells[k],
        x = i % G,
        y = (i / G) | 0;
      for (const [dx, dy] of N8) {
        const xx = x + dx,
          yy = y + dy;
        if (xx < 0 || yy < 0 || xx >= G || yy >= G) continue;
        const j = yy * G + xx;
        if (grid[j] && comp[j] === -1) {
          comp[j] = comps.length;
          cells.push(j);
        }
      }
    }
    comps.push(cells);
  }

  const trace = (start, parent) => {
    const p = [];
    for (let i = start; i !== -1 && i !== undefined; i = parent.get(i)) p.push(i);
    return p;
  };
  const strokes = [];
  for (const cells of comps) {
    if (cells.length * cell < minLength) continue;
    const set = new Set(cells);
    // diameter of the stroke: farthest from anywhere, then farthest from that
    const [a] = farthest(distances(set, [cells[0]], G).dist);
    const fromA = distances(set, [a], G);
    const [b, len] = farthest(fromA.dist);
    if (len * cell < minLength) continue;
    const main = trace(b, fromA.parent);
    const used = new Set(main);
    const paths = [main];
    // branches: repeatedly trace the cell farthest from what is already drawn
    for (let guard = 0; guard < 24; guard++) {
      const fromUsed = distances(set, [...used], G);
      const [c, d] = farthest(fromUsed.dist);
      if (d * cell < branch) break;
      const p = trace(c, fromUsed.parent);
      p.forEach((i) => used.add(i));
      paths.push(p);
    }
    strokes.push({ len: len * cell, paths });
  }
  const longest = Math.max(0, ...strokes.map((s) => s.len));
  const round = (p) => p.map(([x, z]) => [+x.toFixed(2), +z.toFixed(2)]);
  const smooth = strokes
    .filter((s) => s.len >= Math.max(minLength, longest * keepRatio))
    .flatMap((s) => s.paths)
    .map((p) => {
      const pts = p.map((i) => toLocal(((i % G) + 0.5) * cpx, (((i / G) | 0) + 0.5) * cpx));
      return round(simplify(chaikin(relax(pts, 2), 2), cell * 0.3));
    });

  // bridge small gaps between stroke ends (trees and birds painted over the line)
  const ends = smooth.flatMap((p, li) => [
    { li, p: p[0] },
    { li, p: p[p.length - 1] },
  ]);
  const bridges = new Map();
  for (const e of ends) {
    let best = null,
      bd = bridge;
    for (const f of ends) {
      if (f.li === e.li) continue;
      const d = Math.hypot(e.p[0] - f.p[0], e.p[1] - f.p[1]);
      if (d < bd) {
        bd = d;
        best = f;
      }
    }
    if (best && bd > cell * 0.5)
      bridges.set(
        [e.p, best.p]
          .map((q) => q.join(','))
          .sort()
          .join('|'),
        [e.p, best.p],
      );
  }
  return [...smooth, ...bridges.values()];
}
