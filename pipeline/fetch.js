// Downloads the raw inputs of the pipeline into data/raw/ (not versioned):
//  - OpenStreetMap features around each park
//  - satellite-mode parks: the satellite image of their build square (as
//    `pnpm data:satellite`; pinned to `sources.satelliteRelease` when the park
//    sets one)
// Illustrated parks (Xcaret, Xel-Há) are built from their map image,
// data/raw/<key>-illustration.png, which is not distributed nor downloaded
// here: without it their data (public/parks/<key>/) cannot be rebuilt.
// Activities, services and hours live in src/parks/<key>/.
//
// A park that fails is reported and skipped; the others still download.
//
// Usage: node pipeline/fetch.js [park]   (all parks by default)
import fs from 'node:fs/promises';
import path from 'node:path';
import { PARKS } from '#parks/index.js';
import { RAW_DIR, isSatelliteMode, loadParkFrame } from './context.js';
import { saveParkSatellite } from './lib/satellite.js';

const USER_AGENT = 'xcaret-maps-3d/0.1';

async function getJSON(url) {
  const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

async function fetchOSM(key, { osmBBox: [w, s, e, n] }) {
  const data = await getJSON(`https://api.openstreetmap.org/api/0.6/map.json?bbox=${w},${s},${e},${n}`);
  await fs.writeFile(path.join(RAW_DIR, `osm-${key}.json`), JSON.stringify(data));
  console.log('osm', key, data.elements.length);
}

const only = process.argv[2];
await fs.mkdir(RAW_DIR, { recursive: true });
if (only && !PARKS[only]) throw new Error(`Unknown park "${only}" (known: ${Object.keys(PARKS).join(', ')})`);
const exists = (file) =>
  fs.access(file).then(
    () => true,
    () => false,
  );
const failed = [];
for (const [key, park] of Object.entries(PARKS)) {
  if (only && only !== key) continue;
  try {
    await fetchOSM(key, park.sources);
    if (isSatelliteMode(park)) {
      const file = path.join(RAW_DIR, `${key}-satellite.jpg`);
      await saveParkSatellite(file, await loadParkFrame(key));
      console.log('satellite', key, path.relative(process.cwd(), file));
    } else if (!(await exists(path.join(RAW_DIR, `${key}-illustration.png`))))
      console.warn(`[${key}] data/raw/${key}-illustration.png is missing: illustrated parks need their map image placed there by hand`);
  } catch (err) {
    console.error(`[${key}] download failed:`, err.message);
    failed.push(key);
  }
}
if (failed.length) process.exitCode = 1;
