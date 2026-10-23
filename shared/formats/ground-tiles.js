// Ground texture pyramid — public/parks/<park>/ground/<level>-<i>-<j>.webp
//
// Level L splits the park extent (park.json → extent) into 2^L × 2^L square
// tiles of GROUND_TILE_SIZE px; i is the column (west → east), j the row
// (north → south). Level 0 is a single overview tile, the last level holds
// the full detail. Only tiles that show part of the designed area exist;
// park.json → ground.tiles lists their ids ("<level>-<i>-<j>").
//
// The app keeps level 0 loaded and streams finer tiles near the camera, so
// memory stays bounded whatever the zoom.

export const GROUND_TILE_SIZE = 1024;
export const GROUND_LEVELS = 3; // 1, 4 and 16 tiles → up to 4096 px across the extent

export const groundTileId = (level, i, j) => `${level}-${i}-${j}`;
export const groundTilePath = (id) => `ground/${id}.webp`;

/** [x0, z0, x1, z1] in local meters covered by a tile. */
export function groundTileRect(extent, level, i, j) {
  const n = 2 ** level,
    size = extent.size / n;
  const x0 = extent.cx - extent.size / 2 + i * size,
    z0 = extent.cz - extent.size / 2 + j * size;
  return [x0, z0, x0 + size, z0 + size];
}
