// Builds the runtime assets of one park into public/parks/<park>/:
//
//   park.json        georeference, activities, routes, services, piers, clear area
//   ground.webp      stylized ground texture (4096²)
//   water.png        water mask / tint / shore distance (2048²)
//   height.bin       terrain heights (shared/formats/heightmap.js)
//   vegetation.bin   trees (shared/formats/vegetation.js)
//   buildings.json   generic buildings (OSM footprints + painted roofs)
//
// Usage: node pipeline/build.js [park]   (default xc; run `pnpm data:fetch` first)
//
// The land cover is derived from the official illustrated map by color; the
// illustration itself is never shipped. Each stage reads what the previous
// ones left in the build context (see the header of each stage).
import { createBuildContext } from './context.js';
import { classify } from './stages/classify.js';
import { landcover } from './stages/landcover.js';
import { terrain } from './stages/terrain.js';
import { buildings } from './stages/buildings.js';
import { routes } from './stages/routes.js';
import { vegetation } from './stages/vegetation.js';
import { textures } from './stages/textures.js';
import { parkData } from './stages/park-data.js';

const STAGES = { classify, landcover, terrain, buildings, routes, vegetation, textures, parkData };

const key = process.argv[2] ?? 'xc';
const ctx = await createBuildContext(key);
ctx.log(`extent ${ctx.extent.size.toFixed(1)} m, ${(1 / ctx.grid.pxPerM).toFixed(3)} m/px`);
const started = performance.now();
for (const [name, stage] of Object.entries(STAGES)) {
  const t0 = performance.now();
  await stage(ctx);
  if (process.env.TIMINGS) ctx.log(`${name}: ${((performance.now() - t0) / 1000).toFixed(1)} s`);
}
ctx.log(`done in ${((performance.now() - started) / 1000).toFixed(1)} s`);
