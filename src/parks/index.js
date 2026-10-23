// Registry of parks. Each park lives in its own folder (see src/parks/xc):
// pipeline sources, routes, 3D landmarks, data corrections, vehicles, fauna.
// Generated assets are in public/parks/<key>/ (`pnpm data:build <key>`).
// xp, xs and xo have no official illustration: they are built from satellite
// imagery + OpenStreetMap (sources.mode 'satellite'). xcr is not a park but a
// region (`region: true`): the land around Xcaret, Xplor and Xenses, drawn only
// as their lowest-priority neighbor and never selectable.
import xc from './xc/index.js';
import xh from './xh/index.js';
import xp from './xp/index.js';
import xs from './xs/index.js';
import xo from './xo/index.js';
import xcr from './xcr/index.js';

export const PARKS = { xc, xh, xp, xs, xo, xcr };
/** Keys of the parks a visitor can open (header switcher, URL, mobile export): every park but the regions. */
export const SELECTABLE_PARKS = Object.keys(PARKS).filter((key) => !PARKS[key].region);
export const DEFAULT_PARK = 'xc';
