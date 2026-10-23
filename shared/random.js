// Deterministic random number generators: the same seed always produces the
// same park (trees, textures, animals), so builds and screenshots are
// reproducible.

/** Mulberry32: fast 32-bit generator returning floats in [0, 1). */
export function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Park–Miller "minimal standard" generator returning floats in (0, 1). */
export function minstd(seed) {
  return () => (seed = (seed * 16807) % 2147483647) / 2147483647;
}
