// Satellite reference of a park: Esri World Imagery tiles covering the park's
// build square (the illustration's square, or `sources.extent` for
// satellite-mode parks), saved as data/raw/<park>-satellite.jpg (aligned
// pixel-for-pixel with the extent). A park with `sources.satelliteRelease`
// gets that Esri World Imagery Wayback release instead of the live imagery
// (tiles cached in data/raw/tiles/wayback-<release>/<zoom>/). Used by `satelliteCover` edits,
// pipeline/tools/compare-landmarks.js and, for satellite-mode parks, as the
// land cover source; never shipped with the app.
//
// Usage: node pipeline/fetch-satellite.js [park] [zoom=18] [size=2400]
import path from 'node:path';
import { PARKS } from '#parks/index.js';
import { RAW_DIR, loadParkFrame } from './context.js';
import { saveParkSatellite } from './lib/satellite.js';

const key = process.argv[2] ?? 'xc';
const zoom = +(process.argv[3] ?? 18);
const size = +(process.argv[4] ?? 2400);
const file = path.join(RAW_DIR, `${key}-satellite.jpg`);
await saveParkSatellite(file, await loadParkFrame(key), zoom, size);
const release = PARKS[key]?.sources.satelliteRelease;
console.log('saved', path.relative(process.cwd(), file), release ? `(Esri Wayback release ${release})` : '(Esri World Imagery)');
