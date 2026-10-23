// Walkway lines drawn by the app (park.json → walkways): the OSM footway
// network re-drawn on the park's walkways by the pipeline. Where an official
// route already runs along a walkway, the route line is enough, so those
// stretches are left out (Xcaret); parks without official routes (Xel-Há)
// show the whole network. The Android app follows the same rule.

/** Meters from an official route line within which a walkway stretch is hidden. */
export const WALKWAY_NEAR_ROUTE = 4;

/**
 * Walkway segments to draw, resampled every `step` meters: flat array
 * [x0, z0, x1, z1, …]. A segment is dropped when its middle is within
 * `near` meters of any official route line.
 * @param {number[][][]} walkways  park.json → walkways
 * @param {Array<{ lines: number[][][] }>} routes  park.json → routes
 */
export function walkwaySegments(walkways, routes = [], { near = WALKWAY_NEAR_ROUTE, step = 4 } = {}) {
  // route segments in a grid of `cell` meters for quick distance queries
  const cell = 20;
  const grid = new Map();
  const cellKey = (i, j) => `${i},${j}`;
  for (const r of routes)
    for (const l of r.lines)
      for (let k = 1; k < l.length; k++) {
        const [x0, z0] = l[k - 1],
          [x1, z1] = l[k];
        const i0 = Math.floor((Math.min(x0, x1) - near) / cell),
          i1 = Math.floor((Math.max(x0, x1) + near) / cell);
        const j0 = Math.floor((Math.min(z0, z1) - near) / cell),
          j1 = Math.floor((Math.max(z0, z1) + near) / cell);
        for (let i = i0; i <= i1; i++)
          for (let j = j0; j <= j1; j++) {
            const key = cellKey(i, j);
            if (!grid.has(key)) grid.set(key, []);
            grid.get(key).push([x0, z0, x1, z1]);
          }
      }
  const nearRoute = (x, z) => {
    for (const [x0, z0, x1, z1] of grid.get(cellKey(Math.floor(x / cell), Math.floor(z / cell))) ?? []) {
      const dx = x1 - x0,
        dz = z1 - z0,
        L2 = dx * dx + dz * dz || 1;
      const t = Math.max(0, Math.min(1, ((x - x0) * dx + (z - z0) * dz) / L2));
      if (Math.hypot(x - x0 - dx * t, z - z0 - dz * t) < near) return true;
    }
    return false;
  };
  const out = [];
  for (const line of walkways) {
    for (let k = 1; k < line.length; k++) {
      const [x0, z0] = line[k - 1],
        [x1, z1] = line[k];
      const n = Math.max(1, Math.ceil(Math.hypot(x1 - x0, z1 - z0) / step));
      for (let s = 0; s < n; s++) {
        const xa = x0 + ((x1 - x0) * s) / n,
          za = z0 + ((z1 - z0) * s) / n;
        const xb = x0 + ((x1 - x0) * (s + 1)) / n,
          zb = z0 + ((z1 - z0) * (s + 1)) / n;
        if (!nearRoute((xa + xb) / 2, (za + zb) / 2)) out.push(xa, za, xb, zb);
      }
    }
  }
  return out;
}
