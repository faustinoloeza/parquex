// Street lamps of the night mode (layers/lamps.js): where they stand. Pure
// functions on plain arrays (meters, local park frame), shared so the mobile
// app can place the same lamps.

/**
 * Lamp placement (m): spacing along a line, side offset, minimum gap between two
 * lamps, and grid spacing over paved areas.
 */
export const LAMP_LAYOUT = { spacing: 18, offset: 2.2, minGap: 10, areaSpacing: 16 };

/**
 * Lamps along polylines ([[x, z], …]): about every `spacing` m, evenly over each
 * line (a line shorter than half the gap gets none), alternating sides at
 * `offset` m from the line. A lamp closer than `minGap` to one already placed
 * (crossings, parallel lines, a route over a walkway) is dropped, and so is
 * one `accept(x, z)` refuses (water, buildings…).
 * @param {number[][][]} lines
 * @param {{ spacing?: number, offset?: number, minGap?: number, accept?: (x: number, z: number) => boolean,
 *   lamps?: number[][] }} [options]  lamps: already placed (kept, and checked against)
 * @returns {number[][]} [x, z] per lamp
 */
export function placeLampsAlong(lines, options = {}) {
  const { spacing, offset, minGap } = { ...LAMP_LAYOUT, ...options };
  const accept = options.accept ?? (() => true);
  const grid = new LampGrid(minGap, options.lamps ?? []);
  let side = 1;
  for (const line of lines) {
    if (line.length < 2) continue;
    const cumulative = [0];
    for (let i = 1; i < line.length; i++)
      cumulative.push(cumulative[i - 1] + Math.hypot(line[i][0] - line[i - 1][0], line[i][1] - line[i - 1][1]));
    const length = cumulative[cumulative.length - 1];
    if (length < minGap / 2) continue;
    const n = Math.max(1, Math.round(length / spacing));
    let seg = 1;
    for (let k = 0; k < n; k++) {
      const s = ((k + 0.5) * length) / n;
      while (seg < line.length - 1 && cumulative[seg] < s) seg++;
      const [x0, z0] = line[seg - 1],
        [x1, z1] = line[seg];
      const l = cumulative[seg] - cumulative[seg - 1] || 1;
      const t = (s - cumulative[seg - 1]) / l;
      const nx = -(z1 - z0) / l,
        nz = (x1 - x0) / l;
      const x = x0 + (x1 - x0) * t + nx * offset * side,
        z = z0 + (z1 - z0) * t + nz * offset * side;
      side = -side;
      if (grid.near(x, z) || !accept(x, z)) continue;
      grid.add(x, z);
    }
  }
  return grid.lamps;
}

/**
 * Lamps over paved areas (plazas, quays): a jittered `areaSpacing` grid inside
 * [x0, z0, x1, z1], where `coverAt(x, z)` (0..1) is at least `threshold`, at
 * least `minGap` from every lamp already placed (kept and returned too).
 * @param {number[][]} lamps
 * @param {(x: number, z: number) => number} coverAt
 * @param {number[]} rect
 * @param {{ areaSpacing?: number, minGap?: number, threshold?: number, accept?: (x: number, z: number) => boolean }} [options]
 */
export function placeLampsOver(lamps, coverAt, [x0, z0, x1, z1], options = {}) {
  const { areaSpacing: spacing, minGap } = { ...LAMP_LAYOUT, ...options };
  const threshold = options.threshold ?? 0.6;
  const accept = options.accept ?? (() => true);
  const grid = new LampGrid(minGap, lamps);
  for (let j = 0, z = z0 + spacing / 2; z < z1; z += spacing, j++) {
    for (let i = 0, x = x0 + spacing / 2; x < x1; x += spacing, i++) {
      const px = x + (hash(i, j, 1) - 0.5) * spacing * 0.9,
        pz = z + (hash(i, j, 2) - 0.5) * spacing * 0.9;
      if (coverAt(px, pz) < threshold || grid.near(px, pz) || !accept(px, pz)) continue;
      grid.add(px, pz);
    }
  }
  return grid.lamps;
}

/**
 * At most `max` lamps, evenly thinned along the list (index j is kept when
 * ⌊(j+1)·f⌋ > ⌊j·f⌋, f = max / count), so a lower cap keeps a spread subset.
 * @template T
 * @param {T[]} lamps
 * @param {number} max
 * @returns {T[]}
 */
export function capLamps(lamps, max) {
  if (lamps.length <= max) return lamps;
  const f = max / lamps.length;
  return lamps.filter((_, j) => Math.floor((j + 1) * f) > Math.floor(j * f));
}

/** Hash grid of lamps with cells of `gap` m: "is there a lamp within `gap`?". */
class LampGrid {
  constructor(gap, lamps) {
    this.gap = gap;
    this.cells = new Map();
    this.lamps = [];
    for (const [x, z] of lamps) this.add(x, z);
  }
  key(i, j) {
    return i * 73856093 + j;
  }
  add(x, z) {
    const k = this.key(Math.floor(x / this.gap), Math.floor(z / this.gap));
    if (!this.cells.has(k)) this.cells.set(k, []);
    this.cells.get(k).push([x, z]);
    this.lamps.push([x, z]);
  }
  near(x, z) {
    const ci = Math.floor(x / this.gap),
      cj = Math.floor(z / this.gap);
    for (let j = cj - 1; j <= cj + 1; j++) {
      for (let i = ci - 1; i <= ci + 1; i++) {
        for (const [px, pz] of this.cells.get(this.key(i, j)) ?? []) if (Math.hypot(px - x, pz - z) < this.gap) return true;
      }
    }
    return false;
  }
}

function hash(i, j, seed) {
  let h = (i * 374761393 + j * 668265263 + seed * 2147483647) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}
