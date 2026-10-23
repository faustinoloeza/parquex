// Deterministic value noise (same input → same output) for natural variation.

/** Hash of an integer lattice point → [0, 1]. */
export function hash2(x, y, seed = 0) {
  let h = (x * 374761393 + y * 668265263 + seed * 2147483647) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

/** Smooth value noise. */
export function valueNoise(x, y, seed = 0) {
  const xi = Math.floor(x),
    yi = Math.floor(y);
  const xf = x - xi,
    yf = y - yi;
  const u = xf * xf * (3 - 2 * xf),
    v = yf * yf * (3 - 2 * yf);
  const a = hash2(xi, yi, seed),
    b = hash2(xi + 1, yi, seed);
  const c = hash2(xi, yi + 1, seed),
    d = hash2(xi + 1, yi + 1, seed);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

/** Fractal noise: `oct` octaves of value noise, normalized to [0, 1]. */
export function fbm(x, y, seed = 0, oct = 4) {
  let s = 0,
    amp = 0.5,
    f = 1;
  for (let o = 0; o < oct; o++) {
    s += amp * valueNoise(x * f, y * f, seed + o * 17);
    f *= 2;
    amp *= 0.5;
  }
  return s / (1 - Math.pow(0.5, oct));
}
