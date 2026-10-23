// Esri World Imagery tiles (with an on-disk cache) stitched into an image whose
// pixels map linearly to local meters. Used as a modelling reference and for
// `satelliteCover` edits; the imagery is never shipped with the app.
//
// The live World Imagery service changes without notice (new captures, clouds),
// so a park can pin an Esri World Imagery Wayback release
// (`sources.satelliteRelease`, the numeric release id of
// https://livingatlas.arcgis.com/wayback) to make its image reproducible.
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

/**
 * Tile URL of the live World Imagery service, or of a Wayback release.
 * @param {number|undefined} release Wayback release id (undefined = live imagery)
 */
export const tileUrl = (z, x, y, release) =>
  release
    ? `https://wayback.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/WMTS/1.0.0/default028mm/MapServer/tile/${release}/${z}/${y}/${x}`
    : `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}`;

/** Tile cache folder: <root>/<zoom> for the live imagery, <root>/wayback-<release>/<zoom> for a release. */
export const tileCacheDir = (cacheRoot, zoom, release) =>
  release ? path.resolve(cacheRoot, `wayback-${release}`, String(zoom)) : path.resolve(cacheRoot, String(zoom));

async function tile(zoom, x, y, cacheDir, release) {
  const file = path.join(cacheDir, `${x}_${y}.jpg`);
  const cached = await fs.readFile(file).catch(() => null);
  if (cached) return cached;
  // the Wayback service drops requests now and then: a few retries
  let res;
  for (let attempt = 0; attempt < 4; attempt++) {
    res = await fetch(tileUrl(zoom, x, y, release), { headers: { 'User-Agent': 'xcaret-maps-3d/0.1' } }).catch(() => null);
    if (res?.ok) break;
  }
  if (!res?.ok) throw new Error(`${res?.status ?? 'network error'} tile ${zoom}/${x}/${y}${release ? ` (wayback ${release})` : ''}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(file, buf);
  return buf;
}

/**
 * Satellite image of a local box [x0, z0, x1, z1] (meters).
 * @param {number} [release] Esri Wayback release id (default: live World Imagery)
 * @returns {Promise<{ image: Buffer, width: number, height: number, mppX: number, mppZ: number, x0: number, z0: number }>}
 */
export async function satelliteBox(proj, [x0, z0, x1, z1], zoom = 18, cacheRoot = 'data/raw/tiles', release = undefined) {
  const n = 2 ** zoom;
  const tx = (lng) => ((lng + 180) / 360) * n;
  const ty = (lat) => {
    const r = (lat * Math.PI) / 180;
    return ((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * n;
  };
  const [latN, lngW] = proj.toLatLng(x0, z0),
    [latS, lngE] = proj.toLatLng(x1, z1);
  const X0 = Math.floor(tx(lngW)),
    X1 = Math.floor(tx(lngE)),
    Y0 = Math.floor(ty(latN)),
    Y1 = Math.floor(ty(latS));
  const dir = tileCacheDir(cacheRoot, zoom, release);
  await fs.mkdir(dir, { recursive: true });
  const jobs = [];
  for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) jobs.push([x, y]);
  const parts = [];
  for (let i = 0; i < jobs.length; i += 6) {
    const batch = await Promise.all(jobs.slice(i, i + 6).map(([x, y]) => tile(zoom, x, y, dir, release)));
    batch.forEach((input, k) => parts.push({ input, left: (jobs[i + k][0] - X0) * 256, top: (jobs[i + k][1] - Y0) * 256 }));
  }
  const mosaic = await sharp({ create: { width: (X1 - X0 + 1) * 256, height: (Y1 - Y0 + 1) * 256, channels: 3, background: '#000' } })
    .composite(parts)
    .png()
    .toBuffer();
  // crop to the box (Web Mercator is locally uniform at park scale)
  const l = (tx(lngW) - X0) * 256,
    t = (ty(latN) - Y0) * 256,
    r = (tx(lngE) - X0) * 256,
    b = (ty(latS) - Y0) * 256;
  const image = await sharp(mosaic)
    .extract({ left: Math.round(l), top: Math.round(t), width: Math.round(r - l), height: Math.round(b - t) })
    .png()
    .toBuffer();
  const meta = await sharp(image).metadata();
  return { image, width: meta.width, height: meta.height, mppX: (x1 - x0) / meta.width, mppZ: (z1 - z0) / meta.height, x0, z0 };
}

/**
 * Saves the satellite image of a park's build square (frame.extent) as a JPEG
 * of size² pixels, aligned pixel-for-pixel with the extent. Uses the park's
 * Wayback release (`sources.satelliteRelease`) when it pins one.
 * @param {string} file
 * @param {{ park?: { sources: { satelliteRelease?: number } }, projection: object, extent: { cx: number, cz: number, size: number } }} frame
 */
export async function saveParkSatellite(file, { park, projection, extent }, zoom = 18, size = 2400) {
  const half = extent.size / 2;
  const box = [extent.cx - half, extent.cz - half, extent.cx + half, extent.cz + half];
  const sat = await satelliteBox(projection, box, zoom, 'data/raw/tiles', park?.sources.satelliteRelease);
  await sharp(sat.image).resize(size, size).jpeg({ quality: 88 }).toFile(file);
  return sat;
}
