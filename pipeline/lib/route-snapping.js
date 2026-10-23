// Route line post-processing on a raster of walkable ground:
//   snap → centers each line on the walkway it follows
//   push out → moves points that fall on buildings to the nearest free pixel
//   join → links pieces of the same route whose ends meet or nearly meet
//   offset → routes sharing a walkway are drawn side by side, not on top

const len = (p) => p.reduce((s, q, i) => (i ? s + Math.hypot(q[0] - p[i - 1][0], q[1] - p[i - 1][1]) : 0), 0);

export function densify(line, step) {
  const out = [];
  for (let i = 1; i < line.length; i++) {
    const [x0, z0] = line[i - 1],
      [x1, z1] = line[i];
    const n = Math.max(1, Math.ceil(Math.hypot(x1 - x0, z1 - z0) / step));
    for (let k = 0; k < n; k++) out.push([x0 + ((x1 - x0) * k) / n, z0 + ((z1 - z0) * k) / n]);
  }
  out.push(line[line.length - 1]);
  return out;
}

export function smooth(line, radius = 2, passes = 2) {
  let p = line;
  for (let s = 0; s < passes; s++) {
    p = p.map((q, i) => {
      if (i === 0 || i === p.length - 1) return q;
      let sx = 0,
        sz = 0,
        n = 0;
      for (let k = Math.max(0, i - radius); k <= Math.min(p.length - 1, i + radius); k++) {
        sx += p[k][0];
        sz += p[k][1];
        n++;
      }
      return [sx / n, sz / n];
    });
  }
  return p;
}

export function simplify(pts, tol) {
  if (pts.length < 3) return pts;
  const [ax, az] = pts[0],
    [bx, bz] = pts[pts.length - 1];
  const dx = bx - ax,
    dz = bz - az,
    l = Math.hypot(dx, dz) || 1;
  let best = -1,
    bd = 0;
  for (let i = 1; i < pts.length - 1; i++) {
    const d = Math.abs((pts[i][0] - ax) * dz - (pts[i][1] - az) * dx) / l;
    if (d > bd) {
      bd = d;
      best = i;
    }
  }
  if (bd <= tol) return [pts[0], pts[pts.length - 1]];
  return [...simplify(pts.slice(0, best + 1), tol).slice(0, -1), ...simplify(pts.slice(best), tol)];
}

/**
 * Raster context: { N, pxPerM, toPx(x,z)->[u,v], toLocal(u,v)->[x,z],
 *   walk: Uint8Array (1 = walkway), center: Float32Array (m to the walkway edge),
 *   blocked: Uint8Array (1 = building), nearBlocked?: Uint8Array,
 *   centerWeight?: number (findPath: extra cost near walkway edges) }
 */
export function makeRouter(ctx) {
  const { N, pxPerM, toPx, toLocal, walk, center, blocked, nearBlocked, centerWeight = 0 } = ctx;
  const at = (u, v) => (u >= 0 && v >= 0 && u < N && v < N ? (v | 0) * N + (u | 0) : -1);

  // Moves a point onto the middle of the closest walkway within `radius` m.
  function snapPoint([x, z], radius) {
    const [u, v] = toPx(x, z);
    const R = Math.ceil(radius * pxPerM);
    let best = null,
      bs = -Infinity;
    for (let dv = -R; dv <= R; dv++)
      for (let du = -R; du <= R; du++) {
        const i = at(u + du, v + dv);
        if (i < 0 || !walk[i]) continue;
        const d = Math.hypot(du, dv) / pxPerM;
        if (d > radius) continue;
        const score = Math.min(center[i], 2.2) - 0.55 * d;
        if (score > bs) {
          bs = score;
          best = [u + du + 0.5, v + dv + 0.5];
        }
      }
    return best ? toLocal(best[0], best[1]) : null;
  }

  function pushOut([x, z], maxR = 12) {
    const [u, v] = toPx(x, z);
    const i0 = at(u, v);
    if (i0 < 0 || !blocked[i0]) return [x, z];
    const R = Math.ceil(maxR * pxPerM);
    for (let r = 1; r <= R; r++) {
      let best = null,
        bd = Infinity;
      for (let dv = -r; dv <= r; dv++)
        for (let du = -r; du <= r; du++) {
          if (Math.max(Math.abs(du), Math.abs(dv)) !== r) continue;
          const i = at(u + du, v + dv);
          if (i < 0 || blocked[i]) continue;
          const d = Math.hypot(du, dv) + (walk[i] ? 0 : 0.6);
          if (d < bd) {
            bd = d;
            best = [u + du + 0.5, v + dv + 0.5];
          }
        }
      if (best) return toLocal(best[0], best[1]);
    }
    return [x, z];
  }

  const isBlocked = ([x, z]) => {
    const i = at(...toPx(x, z));
    return i >= 0 && blocked[i] === 1;
  };
  const crossesBlocked = (a, b) => densify([a, b], 0.3).some(isBlocked);

  // A* over free pixels between two points, preferring walkways.
  function findPath(a, b, margin = 30) {
    const [ua, va] = toPx(...a).map(Math.floor),
      [ub, vb] = toPx(...b).map(Math.floor);
    const m = Math.ceil(margin * pxPerM);
    const u0 = Math.max(0, Math.min(ua, ub) - m),
      u1 = Math.min(N - 1, Math.max(ua, ub) + m);
    const v0 = Math.max(0, Math.min(va, vb) - m),
      v1 = Math.min(N - 1, Math.max(va, vb) + m);
    const W = u1 - u0 + 1,
      H = v1 - v0 + 1;
    const id = (u, v) => (v - v0) * W + (u - u0);
    const g = new Float32Array(W * H).fill(Infinity);
    const from = new Int32Array(W * H).fill(-1);
    const closed = new Uint8Array(W * H);
    const heap = [];
    const push = (n, f) => {
      heap.push([f, n]);
      let i = heap.length - 1;
      while (i > 0) {
        const p = (i - 1) >> 1;
        if (heap[p][0] <= heap[i][0]) break;
        [heap[p], heap[i]] = [heap[i], heap[p]];
        i = p;
      }
    };
    const pop = () => {
      const top = heap[0],
        last = heap.pop();
      if (heap.length) {
        heap[0] = last;
        let i = 0;
        for (;;) {
          const l = 2 * i + 1,
            r = l + 1;
          let s = i;
          if (l < heap.length && heap[l][0] < heap[s][0]) s = l;
          if (r < heap.length && heap[r][0] < heap[s][0]) s = r;
          if (s === i) break;
          [heap[s], heap[i]] = [heap[i], heap[s]];
          i = s;
        }
      }
      return top;
    };
    const hfn = (u, v) => Math.hypot(u - ub, v - vb);
    const start = id(ua, va),
      goal = id(ub, vb);
    g[start] = 0;
    push(start, hfn(ua, va));
    while (heap.length) {
      const [, n] = pop();
      if (closed[n]) continue;
      closed[n] = 1;
      if (n === goal) break;
      const u = (n % W) + u0,
        v = ((n / W) | 0) + v0;
      for (let dv = -1; dv <= 1; dv++)
        for (let du = -1; du <= 1; du++) {
          if (!du && !dv) continue;
          const uu = u + du,
            vv = v + dv;
          if (uu < u0 || vv < v0 || uu > u1 || vv > v1) continue;
          const k = vv * N + uu;
          if (blocked[k]) continue;
          // no diagonal corner cutting past a building
          if (du && dv && (blocked[v * N + uu] || blocked[vv * N + u])) continue;
          const nn = id(uu, vv);
          if (closed[nn]) continue;
          // centerWeight > 0 also prefers the middle of the walkway over its edges
          const mid = centerWeight && walk[k] ? 1 + centerWeight * Math.max(0, 1.6 - center[k]) : 1;
          const step = (du && dv ? Math.SQRT2 : 1) * (walk[k] ? mid : 2.5) * (nearBlocked?.[k] ? 3 : 1);
          const ng = g[n] + step;
          if (ng < g[nn]) {
            g[nn] = ng;
            from[nn] = n;
            push(nn, ng + hfn(uu, vv));
          }
        }
    }
    if (from[goal] === -1 && goal !== start) return null;
    const out = [];
    for (let n = goal; n !== -1; n = from[n]) out.push(toLocal((n % W) + u0 + 0.5, ((n / W) | 0) + v0 + 0.5));
    return out.reverse();
  }

  // Douglas-Peucker that never keeps a shortcut crossing a building.
  function simplifyFree(pts, tol) {
    if (pts.length < 3) return pts;
    const [ax, az] = pts[0],
      [bx, bz] = pts[pts.length - 1];
    const dx = bx - ax,
      dz = bz - az,
      l = Math.hypot(dx, dz) || 1;
    let best = -1,
      bd = 0;
    for (let i = 1; i < pts.length - 1; i++) {
      const d = Math.abs((pts[i][0] - ax) * dz - (pts[i][1] - az) * dx) / l;
      if (d > bd) {
        bd = d;
        best = i;
      }
    }
    if (bd <= tol && !crossesBlocked(pts[0], pts[pts.length - 1])) return [pts[0], pts[pts.length - 1]];
    if (best < 0) best = pts.length >> 1;
    return [...simplifyFree(pts.slice(0, best + 1), tol).slice(0, -1), ...simplifyFree(pts.slice(best), tol)];
  }

  // Trims ends that finish inside a building and reroutes interior stretches
  // that cross one around it along the walkways.
  function avoid(line) {
    let pts = densify(line, 0.5);
    const bad = pts.map(isBlocked);
    let s = 0,
      e = pts.length - 1;
    while (s <= e && bad[s]) s++;
    while (e >= s && bad[e]) e--;
    if (s > e) return [];
    pts = pts.slice(s, e + 1);
    const flags = bad.slice(s, e + 1);
    const out = [];
    for (let i = 0; i < pts.length; i++) {
      if (!flags[i]) {
        out.push(pts[i]);
        continue;
      }
      let j = i;
      while (j < pts.length && flags[j]) j++;
      const a = pts[i - 1],
        b = pts[j];
      const detour = findPath(a, b);
      if (process.env.DEBUG_ROUTES && !detour) console.log('avoid: no path', a.map(Math.round), b.map(Math.round));
      // raw pixel path: every step is between free pixels, so it never clips a wall
      if (detour) out.push(...detour.slice(1, -1));
      i = j - 1;
    }
    return simplifyFree(out, 0.2);
  }

  function snapLine(line, { radius = 5, step = 1 } = {}) {
    const dense = densify(line, step);
    // points with no walkway nearby (bridges, gaps) keep their position
    let pts = dense.map((p) => snapPoint(p, radius) ?? p);
    pts = smooth(pts, 3, 2);
    pts = pts.map((p) => pushOut(p));
    pts = smooth(pts, 1, 1).map((p) => pushOut(p));
    return simplify(pts, 0.2);
  }

  return { snapPoint, snapLine, pushOut, isBlocked, crossesBlocked, avoid, findPath };
}

// Joins pieces whose ends coincide (≤ tol) and bridges short gaps between a
// piece end and the nearest end of another piece when nothing blocks it.
export function joinPieces(pieces, { tol = 2.5, bridge = 14, minLength = 0, crossesBlocked = () => false } = {}) {
  let lines = pieces.filter((p) => p.length >= 2).map((p) => p.slice());
  const d = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  let merged = true;
  while (merged) {
    merged = false;
    outer: for (let i = 0; i < lines.length; i++) {
      for (let j = i + 1; j < lines.length; j++) {
        const a = lines[i],
          b = lines[j];
        const opts = [
          [d(a[a.length - 1], b[0]), () => [...a, ...b.slice(1)]],
          [d(a[a.length - 1], b[b.length - 1]), () => [...a, ...b.slice(0, -1).reverse()]],
          [d(a[0], b[b.length - 1]), () => [...b, ...a.slice(1)]],
          [d(a[0], b[0]), () => [...b.slice().reverse(), ...a.slice(1)]],
        ].sort((p, q) => p[0] - q[0]);
        if (opts[0][0] <= tol) {
          lines[i] = opts[0][1]();
          lines.splice(j, 1);
          merged = true;
          break outer;
        }
      }
    }
  }
  // drop leftovers (painted birds, flowers…): short pieces survive only when
  // they touch a long one
  if (minLength) {
    const long = lines.filter((l) => len(l) >= minLength);
    const touches = (l) => [l[0], l[l.length - 1]].some((e) => long.some((m) => m.some((q) => d(e, q) <= 8)));
    lines = [...long, ...lines.filter((l) => len(l) < minLength && len(l) >= 4 && touches(l))];
  }
  // bridges: from each free end to the closest point of any other line
  const bridges = [];
  // each free end also knows its outward direction (from a point ~3 m back)
  const dirOf = (l, atStart) => {
    const pts = atStart ? l : l.slice().reverse();
    const e = pts[0];
    let back = pts[pts.length - 1];
    for (const q of pts)
      if (d(e, q) >= 3) {
        back = q;
        break;
      }
    const dx = e[0] - back[0],
      dz = e[1] - back[1],
      n = Math.hypot(dx, dz) || 1;
    return [dx / n, dz / n];
  };
  const ends = lines.flatMap((l, li) => [
    { li, p: l[0], dir: dirOf(l, true) },
    { li, p: l[l.length - 1], dir: dirOf(l, false) },
  ]);
  for (const e of ends) {
    let best = null,
      bd = bridge;
    // prefer the point straight ahead (T junctions): distance grows with the
    // turn needed to reach it
    let bestCost = Infinity;
    lines.forEach((l, lj) => {
      if (lj === e.li) return;
      for (const q of densify(l, 0.5)) {
        const dd = d(e.p, q);
        if (dd > bridge || dd < 0.3) continue;
        const cos = ((q[0] - e.p[0]) * e.dir[0] + (q[1] - e.p[1]) * e.dir[1]) / dd;
        const cost = dd * (1 + 3 * (1 - cos));
        if (cost < bestCost) {
          bestCost = cost;
          best = q;
          bd = dd;
        }
      }
    });
    if (best && bd > 0.3 && !crossesBlocked(e.p, best)) bridges.push([e.p, best]);
  }
  return [...lines, ...bridges].filter((l) => len(l) > 1);
}

// Routes that share a walkway are shifted sideways so they read as parallel
// lines. The side is chosen from a canonical normal so two routes walking the
// corridor in opposite directions still end up on different sides.
export function offsetShared(routes, { near = 1.8, spacing = 1.6 } = {}) {
  const segs = routes.map((r) => r.lines.flatMap((l) => l.slice(1).map((q, i) => [l[i], q])));
  const distSeg = ([x, z], [[x0, z0], [x1, z1]]) => {
    const dx = x1 - x0,
      dz = z1 - z0,
      L2 = dx * dx + dz * dz || 1;
    const t = Math.max(0, Math.min(1, ((x - x0) * dx + (z - z0) * dz) / L2));
    return Math.hypot(x - x0 - dx * t, z - z0 - dz * t);
  };
  return routes.map((r, ri) => ({
    ...r,
    lines: r.lines.map((line) => {
      const dense = densify(line, 1);
      const offs = dense.map((p, i) => {
        const sharing = [ri];
        routes.forEach((_, rj) => {
          if (rj !== ri && segs[rj].some((s) => distSeg(p, s) < near)) sharing.push(rj);
        });
        if (sharing.length < 2) return 0;
        sharing.sort((a, b) => a - b);
        return (sharing.indexOf(ri) - (sharing.length - 1) / 2) * spacing;
      });
      // ease the offsets in and out along the line
      const eased = offs.map((_, i) => {
        let s = 0,
          n = 0;
        for (let k = Math.max(0, i - 4); k <= Math.min(offs.length - 1, i + 4); k++) {
          s += offs[k];
          n++;
        }
        return s / n;
      });
      const out = dense.map(([x, z], i) => {
        const a = dense[Math.max(0, i - 1)],
          b = dense[Math.min(dense.length - 1, i + 1)];
        let nx = -(b[1] - a[1]),
          nz = b[0] - a[0];
        const l = Math.hypot(nx, nz) || 1;
        nx /= l;
        nz /= l;
        if (nx < 0 || (nx === 0 && nz < 0)) {
          nx = -nx;
          nz = -nz;
        } // canonical side
        return [x + nx * eased[i], z + nz * eased[i]];
      });
      return simplify(out, 0.15);
    }),
  }));
}
