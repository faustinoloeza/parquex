// Outline of the designed (cloud-free) part of the illustration as a polar
// profile around its centroid; see shared/design-area.js.

/**
 * Cloud-free area as { cx, cz, radii[72] } around its centroid. The radii are
 * smoothed (5-sample moving average) unless `smooth` is false: a region's
 * hand-traced polygon (src/parks/xcr) or a straight-sided park outline
 * (sources.straightOutline) is already clean and smoothing would cut its corners.
 */
export function clearArea({ grid, extent, outsideSoft, smooth = true }) {
  const { N, toPx, toLocal, idx } = grid;
  let sx = 0,
    sz = 0,
    n = 0;
  for (let v = 0; v < N; v += 2) {
    for (let u = 0; u < N; u += 2) {
      if (outsideSoft[v * N + u] < 0.5) {
        const [x, z] = toLocal(u, v);
        sx += x;
        sz += z;
        n++;
      }
    }
  }
  const cx = sx / n,
    cz = sz / n;
  const radii = [];
  const STEPS = 72;
  for (let a = 0; a < STEPS; a++) {
    const ang = (a / STEPS) * Math.PI * 2;
    let r = 0;
    for (let d = 0; d < extent.size; d += 2) {
      const [u, v] = toPx(cx + Math.cos(ang) * d, cz + Math.sin(ang) * d);
      if (u < 0 || v < 0 || u >= N || v >= N || outsideSoft[idx(u, v)] > 0.5) break;
      r = d;
    }
    radii.push(r);
  }
  const smoothed = radii.map((r, i) => {
    if (!smooth) return +r.toFixed(1);
    let s = 0;
    for (let k = -2; k <= 2; k++) s += radii[(i + k + STEPS) % STEPS];
    return +(s / 5).toFixed(1);
  });
  return { cx: +cx.toFixed(1), cz: +cz.toFixed(1), radii: smoothed };
}
