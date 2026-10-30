// Placement of seasonal decoration (src/themes): pure functions on plain arrays
// (meters, local park frame), like shared/lamps.js, so they can be tested and
// reused by other themes.

/**
 * Points every ~`spacing` m around a circle (at least 3), starting at angle `phase`.
 * @returns {number[][]} [x, z] each
 */
export function ringPoints(cx, cz, radius, spacing, phase = 0) {
  const n = Math.max(3, Math.round((2 * Math.PI * radius) / spacing));
  return Array.from({ length: n }, (_, i) => {
    const a = phase + (i / n) * 2 * Math.PI;
    return [cx + radius * Math.cos(a), cz + radius * Math.sin(a)];
  });
}

/**
 * Nearest point of the polylines to (x, z).
 * @param {number[][][]} lines
 * @returns {{ x: number, z: number, d: number } | null}
 */
export function nearestOnLines(x, z, lines) {
  let best = null;
  for (const line of lines) {
    for (let i = 1; i < line.length; i++) {
      const [x0, z0] = line[i - 1],
        [x1, z1] = line[i];
      const dx = x1 - x0,
        dz = z1 - z0;
      const t = Math.max(0, Math.min(1, ((x - x0) * dx + (z - z0) * dz) / (dx * dx + dz * dz || 1)));
      const px = x0 + dx * t,
        pz = z0 + dz * t;
      const d = Math.hypot(x - px, z - pz);
      if (!best || d < best.d) best = { x: px, z: pz, d };
    }
  }
  return best;
}

/**
 * Free spot for a piece of decoration near (x, z): the closest point, on rings
 * every `step` m out to `maxRadius`, that `accept` takes and that stays
 * `clearance` m off the paths (still within `reach` m of one, so it is seen
 * from the path). `rotation` turns the piece's front (+z) towards the nearest
 * path (three.js Y rotation).
 * @param {{ lines: number[][][], accept: (x: number, z: number) => boolean, clearance?: number,
 *   reach?: number, maxRadius?: number, step?: number }} options
 * @returns {{ x: number, z: number, rotation: number } | null}
 */
export function freeSpot(x, z, { lines, accept, clearance = 2.5, reach = 12, maxRadius = 30, step = 1.5 }) {
  for (let r = 0; r <= maxRadius; r += step) {
    const candidates = r === 0 ? [[x, z]] : ringPoints(x, z, r, step);
    for (const [cx, cz] of candidates) {
      if (!accept(cx, cz)) continue;
      const near = nearestOnLines(cx, cz, lines);
      if (near && (near.d < clearance || near.d > reach)) continue;
      const rotation = near ? Math.atan2(near.x - cx, near.z - cz) : 0;
      return { x: cx, z: cz, rotation };
    }
  }
  return null;
}

/**
 * Strings hung across the paths near some spots (papel picado): every
 * `spacing` m along each line, a segment `width` m long perpendicular to it,
 * kept only within `radius` m of a spot.
 * @param {number[][][]} lines
 * @param {{ spots: number[][], radius: number, spacing: number, width: number }} options  spots: [x, z] each
 * @returns {number[][][]} [[x0, z0], [x1, z1]] each
 */
export function spansAcross(lines, { spots, radius, spacing, width }) {
  const spans = [];
  const near = (x, z) => spots.some(([sx, sz]) => Math.hypot(x - sx, z - sz) < radius);
  const h = width / 2;
  for (const line of lines) {
    let walked = 0; // length of the line before the current segment
    let next = spacing / 2; // distance along the line of the next span
    for (let i = 1; i < line.length; i++) {
      const [x0, z0] = line[i - 1],
        [x1, z1] = line[i];
      const len = Math.hypot(x1 - x0, z1 - z0);
      if (len === 0) continue;
      const ux = (x1 - x0) / len,
        uz = (z1 - z0) / len;
      for (; next <= walked + len; next += spacing) {
        const s = next - walked;
        const x = x0 + ux * s,
          z = z0 + uz * s;
        if (near(x, z))
          spans.push([
            [x - uz * h, z + ux * h],
            [x + uz * h, z - ux * h],
          ]);
      }
      walked += len;
    }
  }
  return spans;
}

/**
 * Order in which instances appear as the quality cap grows: a seeded shuffle,
 * so any first n of them are spread evenly over the park.
 * @param {number} count
 * @param {() => number} random  (0, 1)
 * @returns {number[]} indices
 */
export function revealOrder(count, random) {
  const order = Array.from({ length: count }, (_, i) => i);
  for (let i = count - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

/**
 * Point and direction at `s` m along a polyline (clamped to its ends).
 * @returns {{ x: number, z: number, ux: number, uz: number }}
 */
export function pointAlong(line, s) {
  let walked = 0;
  for (let i = 1; i < line.length; i++) {
    const [x0, z0] = line[i - 1],
      [x1, z1] = line[i];
    const len = Math.hypot(x1 - x0, z1 - z0);
    if (len === 0) continue;
    if (walked + len >= s || i === line.length - 1) {
      const t = Math.max(0, Math.min(1, (s - walked) / len));
      return { x: x0 + (x1 - x0) * t, z: z0 + (z1 - z0) * t, ux: (x1 - x0) / len, uz: (z1 - z0) / len };
    }
    walked += len;
  }
  const [x, z] = line[0];
  return { x, z, ux: 1, uz: 0 };
}

/**
 * Distance along a polyline of the point nearest to (x, z).
 * @returns {{ s: number, d: number }}
 */
export function distanceAlong(line, x, z) {
  let best = { s: 0, d: Infinity };
  let walked = 0;
  for (let i = 1; i < line.length; i++) {
    const [x0, z0] = line[i - 1],
      [x1, z1] = line[i];
    const dx = x1 - x0,
      dz = z1 - z0;
    const len = Math.hypot(dx, dz);
    const t = Math.max(0, Math.min(1, ((x - x0) * dx + (z - z0) * dz) / (len * len || 1)));
    const d = Math.hypot(x - x0 - dx * t, z - z0 - dz * t);
    if (d < best.d) best = { s: walked + t * len, d };
    walked += len;
  }
  return best;
}

/**
 * Spots beside a stretch of a polyline (`from` … `to` m along it, either
 * order): every `spacing` m, on each side, the first offset from the line in
 * [min, max] (every `step` m) that `accept` takes; a spot closer than `minGap`
 * to one already chosen is skipped. `rotation` turns a piece's front (+z)
 * towards the line (three.js Y rotation).
 * @param {number[][]} line
 * @param {{ from: number, to: number, spacing: number, offsets: number[], step?: number, minGap?: number,
 *   accept: (x: number, z: number, facing: number) => boolean }} options  accept also gets the rotation
 * @returns {{ x: number, z: number, rotation: number, s: number, side: number }[]}
 */
export function placeBeside(line, { from, to, spacing, offsets: [min, max], step = 1, minGap = 0, accept }) {
  const spots = [];
  const [a, b] = from <= to ? [from, to] : [to, from];
  for (let s = a + spacing / 2; s <= b; s += spacing) {
    const p = pointAlong(line, s);
    for (const side of [1, -1]) {
      // left of the direction of travel for side 1
      const nx = -p.uz * side,
        nz = p.ux * side;
      for (let o = min; o <= max; o += step) {
        const x = p.x + nx * o,
          z = p.z + nz * o;
        const rotation = Math.atan2(-nx, -nz);
        if (spots.some((q) => Math.hypot(q.x - x, q.z - z) < minGap) || !accept(x, z, rotation)) continue;
        spots.push({ x, z, rotation, s, side });
        break;
      }
    }
  }
  return spots;
}
