// Land and sea from the OpenStreetMap coastline: rasterize it as a barrier and
// flood the sea from a pixel of open water.

/**
 * @param {{ elements: object[], wayPoints: Function }} osm
 * @param {{ N: number, toPx: (x: number, z: number) => number[] }} grid
 * @param {number[]} [seaCorner]  open-sea pixel in 0..1 image coordinates (no sea without it)
 * @returns {Uint8Array} 1 on the sea side of the coastline
 */
export function osmSeaMask(osm, { N, toPx }, seaCorner) {
  const osmSea = new Uint8Array(N * N);
  if (!seaCorner) return osmSea;
  const barrier = new Uint8Array(N * N);
  for (const w of osm.elements) {
    if (w.type !== 'way' || w.tags?.natural !== 'coastline') continue;
    const pts = osm.wayPoints(w).map(([x, z]) => toPx(x, z));
    for (let k = 1; k < pts.length; k++) {
      const [u0, v0] = pts[k - 1],
        [u1, v1] = pts[k];
      const steps = Math.ceil(Math.hypot(u1 - u0, v1 - v0) * 2) + 1;
      for (let s = 0; s <= steps; s++) {
        const u = u0 + ((u1 - u0) * s) / steps,
          v = v0 + ((v1 - v0) * s) / steps;
        for (let dv = -1; dv <= 1; dv++) {
          for (let du = -1; du <= 1; du++) {
            const uu = Math.round(u) + du,
              vv = Math.round(v) + dv;
            if (uu >= 0 && vv >= 0 && uu < N && vv < N) barrier[vv * N + uu] = 1;
          }
        }
      }
    }
  }
  const [su, sv] = seaCorner.map((c) => Math.min(N - 1, Math.round(c * (N - 1))));
  const stack = [sv * N + su];
  osmSea[stack[0]] = 1;
  while (stack.length) {
    const i = stack.pop();
    const x = i % N,
      y = (i / N) | 0;
    for (const j of [x > 0 ? i - 1 : -1, x < N - 1 ? i + 1 : -1, y > 0 ? i - N : -1, y < N - 1 ? i + N : -1]) {
      if (j >= 0 && !osmSea[j] && !barrier[j]) {
        osmSea[j] = 1;
        stack.push(j);
      }
    }
  }
  // barrier pixels take the side of their neighbours
  for (let i = 0; i < N * N; i++) if (barrier[i] && (osmSea[i - 1] || osmSea[i + 1])) osmSea[i] = 1;
  return osmSea;
}
