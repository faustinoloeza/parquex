// height.bin — terrain heights on a HEIGHT_GRID × HEIGHT_GRID grid covering the
// park extent (row 0 = north edge), int16 centimeters, little endian.

export const HEIGHT_GRID = 512;
const CM = 100;

/** @param {(i: number, j: number) => number} heightAt meters at grid cell (i, j) */
export function encodeHeights(heightAt, grid = HEIGHT_GRID) {
  const out = new Int16Array(grid * grid);
  for (let j = 0; j < grid; j++) for (let i = 0; i < grid; i++) out[j * grid + i] = Math.round(heightAt(i, j) * CM);
  return new Uint8Array(out.buffer);
}

/** @returns {Float64Array} heights in meters */
export function decodeHeights(buffer) {
  const raw = new Int16Array(buffer);
  const out = new Float64Array(raw.length);
  for (let i = 0; i < raw.length; i++) out[i] = raw[i] / CM;
  return out;
}
