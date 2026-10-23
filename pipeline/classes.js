// Classes used by the pipeline rasters.

/**
 * Color classes of the illustrated map (stage classify). UNKNOWN marks the
 * clouds around the park, where the land cover is extrapolated.
 */
export const COLOR = {
  UNKNOWN: 0,
  SEA: 1,
  DARKWATER: 2,
  POOL: 3,
  FOREST: 4,
  LAWN: 5,
  PATH: 6,
  SAND: 7,
  ROOF: 8,
  THATCH: 9,
  STONE: 10,
  MISC: 11,
};
export const COLOR_COUNT = 12;
export const isWaterColor = (c) => c === COLOR.SEA || c === COLOR.DARKWATER || c === COLOR.POOL;

/**
 * Final land cover (stage landcover); water classes come first. DIRT (packed
 * earth: jungle trails, vehicle tracks; `pave` edits with `surface: 'dirt'`) is
 * walkable like PATH but is not stone paving (no flagstones or curbs, not in the
 * mobile paving mask).
 */
export const LAND = { SEA: 0, LAGOON: 1, RIVER: 2, POOL: 3, FOREST: 4, LAWN: 5, PATH: 6, SAND: 7, PLAZA: 8, ROCK: 9, DIRT: 10 };
export const isWater = (c) => c <= LAND.POOL;
/** Stone paving: walkways and plazas. */
export const isPaved = (c) => c === LAND.PATH || c === LAND.PLAZA;
/** Ground made for walking or driving on: paving and dirt tracks (trees stay off it). */
export const isTrack = (c) => c === LAND.PATH || c === LAND.PLAZA || c === LAND.DIRT;
