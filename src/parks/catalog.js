// What the web map knows about every park before loading it — name, title
// label, whether it is a region — and loadPark() for its full definition
// (landmarks, vehicles, fauna, activities…), fetched only when that park is
// opened, so the page ships one park's definition, not all of them.
// src/parks/index.js has every definition at once (pipeline, tests, mobile
// export); tests/parks/catalog.test.js keeps both in step.

export const PARK_CATALOG = {
  xc: { name: 'Xcaret', labelKey: 'lbl_map_prefix_xc' },
  xh: { name: 'Xel-Há', labelKey: 'lbl_map_prefix_xh' },
  xp: { name: 'Xplor', labelKey: 'lbl_map_prefix_xp' },
  xs: { name: 'Xenses', labelKey: 'lbl_map_prefix_xs' },
  xo: { name: 'Xoximilco', labelKey: 'lbl_map_prefix_xo' },
  xcr: { name: 'Zona Xcaret', region: true },
};

const LOADERS = {
  xc: () => import('./xc/index.js'),
  xh: () => import('./xh/index.js'),
  xp: () => import('./xp/index.js'),
  xs: () => import('./xs/index.js'),
  xo: () => import('./xo/index.js'),
  xcr: () => import('./xcr/index.js'),
};

/** Keys of the parks a visitor can open (header switcher, URL): every park but the regions. */
export const SELECTABLE_PARKS = Object.keys(PARK_CATALOG).filter((key) => !PARK_CATALOG[key].region);
export const DEFAULT_PARK = 'xc';

/**
 * The full definition of a park, loaded once.
 * @param {string} key
 * @returns {Promise<import('./define.js').ParkDefinition>}
 */
export const loadPark = (key) => LOADERS[key]().then((m) => m.default);
