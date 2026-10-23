// vegetation.bin — every tree of the park in 10 bytes:
//
//   offset  type    value
//   0       int16   x in decimeters
//   2       int16   y (ground height) in centimeters
//   4       int16   z in decimeters
//   6       uint8   scale × 100
//   7       uint8   rotation around Y, 0..255 → 0..2π
//   8       uint8   tree type (TREE)
//   9       —       padding
//
// Decoded trees are a flat Float32Array with TREE_STRIDE values per tree:
// [x, y, z, scale, rotation, type].

export const TREE = { BROAD: 0, BROAD_LIGHT: 1, BUSH: 2, PALM: 3, CEIBA: 4 };
export const TREE_STRIDE = 6;
const BYTES = 10;

/**
 * Approximate sizes of each tree model in meters at scale 1, used by the
 * pipeline to keep walkways clear and to bake soft shadows.
 * crown: canopy radius seen from above; shadow: shadow blob radius;
 * height: height of the canopy (shadow offset).
 */
export const TREE_SHAPES = {
  [TREE.BROAD]: { crown: 3.2, shadow: 3.6, height: 6.2 },
  [TREE.BROAD_LIGHT]: { crown: 3.2, shadow: 3.6, height: 6.2 },
  [TREE.BUSH]: { crown: 1.7, shadow: 1.8, height: 1.5 },
  [TREE.PALM]: { crown: 3.4, shadow: 2.6, height: 8.5 },
  [TREE.CEIBA]: { crown: 4.6, shadow: 3.6, height: 11 },
};

/**
 * @param {ArrayLike<number>} trees flat [x, y, z, scale, rotation, type, ...]
 * @returns {Uint8Array}
 */
export function encodeVegetation(trees) {
  const count = trees.length / TREE_STRIDE;
  const bytes = new Uint8Array(count * BYTES);
  const view = new DataView(bytes.buffer);
  for (let t = 0; t < count; t++) {
    const o = t * TREE_STRIDE,
      b = t * BYTES;
    view.setInt16(b, Math.round(trees[o] * 10), true);
    view.setInt16(b + 2, Math.round(trees[o + 1] * 100), true);
    view.setInt16(b + 4, Math.round(trees[o + 2] * 10), true);
    view.setUint8(b + 6, Math.round(Math.min(2.55, trees[o + 3]) * 100));
    view.setUint8(b + 7, Math.round(((trees[o + 4] % (Math.PI * 2)) / (Math.PI * 2)) * 255));
    view.setUint8(b + 8, trees[o + 5]);
  }
  return bytes;
}

/**
 * @param {ArrayBuffer} buffer
 * @returns {Float32Array} flat [x, y, z, scale, rotation, type, ...]
 */
export function decodeVegetation(buffer) {
  const view = new DataView(buffer);
  const count = Math.floor(buffer.byteLength / BYTES);
  const data = new Float32Array(count * TREE_STRIDE);
  for (let t = 0; t < count; t++) {
    const b = t * BYTES,
      o = t * TREE_STRIDE;
    data[o] = view.getInt16(b, true) / 10;
    data[o + 1] = view.getInt16(b + 2, true) / 100;
    data[o + 2] = view.getInt16(b + 4, true) / 10;
    data[o + 3] = view.getUint8(b + 6) / 100;
    data[o + 4] = (view.getUint8(b + 7) / 255) * Math.PI * 2;
    data[o + 5] = view.getUint8(b + 8);
  }
  return data;
}
