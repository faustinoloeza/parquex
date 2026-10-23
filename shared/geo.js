// Geographic helpers shared by the app and the data pipeline.
//
// Local frame used everywhere in the project: meters on a tangent plane around
// the park's map center, x = east, z = south (north is -z, as in three.js
// top-down views). y is height above sea level.

const EARTH_RADIUS = 6378137;
const METERS_PER_DEGREE = (Math.PI * EARTH_RADIUS) / 180;

/**
 * Equirectangular projection around (lat0, lng0); accurate to centimeters at
 * park scale (~1 km).
 * @param {number} lat0
 * @param {number} lng0
 */
export function makeProjection(lat0, lng0) {
  const mLat = METERS_PER_DEGREE;
  const mLng = METERS_PER_DEGREE * Math.cos((lat0 * Math.PI) / 180);
  return {
    lat0,
    lng0,
    mLat,
    mLng,
    /** @returns {[number, number]} [x, z] in meters */
    toLocal: (lat, lng) => [(lng - lng0) * mLng, -(lat - lat0) * mLat],
    /** @returns {[number, number]} [lat, lng] */
    toLatLng: (x, z) => [lat0 - z / mLat, lng0 + x / mLng],
  };
}

/**
 * Square covered by the official illustrated map, in local meters. The values
 * come from how the official site places its GLTF over Google Maps (node
 * transform × scene scale/position).
 * @param {{ nodeScale: number, nodeTranslation: number[], sceneScale: number, scenePosition: number[] }} ill
 * @returns {{ size: number, cx: number, cz: number }}
 */
export function illustrationExtent(ill) {
  const s = ill.sceneScale;
  const size = ill.nodeScale * s;
  // the node translation (x, 0, z) is rotated +90° about X: (x, y, z) → (x, -z, y)
  const east = ill.nodeTranslation[0] * s + ill.scenePosition[0];
  const north = -ill.nodeTranslation[2] * s + ill.scenePosition[1];
  return { size, cx: east, cz: -north };
}

const toRad = (d) => (d * Math.PI) / 180;

/** Great-circle distance in km between two [lat, lng] points. */
export function haversineKm([la1, lo1], [la2, lo2]) {
  const a = Math.sin(toRad(la2 - la1) / 2) ** 2 + Math.cos(toRad(la1)) * Math.cos(toRad(la2)) * Math.sin(toRad(lo2 - lo1) / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(a));
}

/** Initial bearing in degrees (0 = north, 90 = east) from one [lat, lng] to another. */
export function bearingDeg([la1, lo1], [la2, lo2]) {
  const y = Math.sin(toRad(lo2 - lo1)) * Math.cos(toRad(la2));
  const x = Math.cos(toRad(la1)) * Math.sin(toRad(la2)) - Math.sin(toRad(la1)) * Math.cos(toRad(la2)) * Math.cos(toRad(lo2 - lo1));
  return (Math.atan2(y, x) * 180) / Math.PI;
}

/**
 * Georeference of a park: projection origin, the square covered by the build
 * grid (local meters) and the map bounds.
 *  - Illustrated parks: `sources.mapFrame` (center and bounds of the official
 *    map) and the placement of the official illustration (extent).
 *  - Satellite-mode parks (`sources.mode === 'satellite'`, no official
 *    illustration): `sources.center` and `sources.extent`; the bounds are the
 *    extent square.
 * @param {{ sources: object }} park              park definition (src/parks/<key>)
 * @returns {{ center: { lat: number, lng: number }, projection: ReturnType<typeof makeProjection>,
 *   extent: { cx: number, cz: number, size: number }, bounds: { x0: number, x1: number, z0: number, z1: number } }}
 */
export function parkFrame(park) {
  const src = park.sources;
  if (src.mode === 'satellite') {
    if (!src.center || !src.extent?.size) throw new Error('satellite-mode parks need sources.center and sources.extent.size');
    const center = { lat: src.center.lat, lng: src.center.lng };
    const extent = { cx: src.extent.cx ?? 0, cz: src.extent.cz ?? 0, size: src.extent.size };
    const h = extent.size / 2;
    return {
      center,
      projection: makeProjection(center.lat, center.lng),
      extent,
      bounds: { x0: extent.cx - h, x1: extent.cx + h, z0: extent.cz - h, z1: extent.cz + h },
    };
  }
  const frame = src.mapFrame;
  if (!frame) throw new Error('illustrated parks need sources.mapFrame (or use sources.mode: "satellite")');
  const projection = makeProjection(frame.latitude, frame.longitude);
  const [bx0, bz0] = projection.toLocal(frame.bound1Lat, frame.bound1Long);
  const [bx1, bz1] = projection.toLocal(frame.bound2Lat, frame.bound2Long);
  return {
    center: { lat: frame.latitude, lng: frame.longitude },
    projection,
    extent: illustrationExtent(src.illustration),
    bounds: { x0: Math.min(bx0, bx1), x1: Math.max(bx0, bx1), z0: Math.min(bz0, bz1), z1: Math.max(bz0, bz1) },
  };
}
