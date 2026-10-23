// Slippy-map tile math (Web Mercator, the scheme of OpenStreetMap tiles):
// tile (x, y) at zoom z covers 1/2^z of the world in each direction, x grows
// east from 180°W and y grows south from ~85°N.

const RAD = Math.PI / 180;

/** Longitude of the west edge of tile column x at zoom z. */
export const tileToLng = (x, z) => (x / 2 ** z) * 360 - 180;

/** Latitude of the north edge of tile row y at zoom z. */
export const tileToLat = (y, z) => Math.atan(Math.sinh(Math.PI * (1 - (2 * y) / 2 ** z))) / RAD;

/** Fractional tile coordinates of a point; floor() them for the tile index. */
export function lngLatToTile(lng, lat, z) {
  const n = 2 ** z;
  const x = ((lng + 180) / 360) * n;
  const s = Math.sin(lat * RAD);
  const y = (0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * n;
  return [x, y];
}

/** [north, west, south, east] edges of a tile in degrees. */
export function tileBounds(x, y, z) {
  return [tileToLat(y, z), tileToLng(x, z), tileToLat(y + 1, z), tileToLng(x + 1, z)];
}
