// Corrections to what the pipeline reads from the satellite and OSM for Xplor
// (kinds documented in src/parks/xc/edits.js). Applied in order.
//
// Satellite reference: data/raw/xp-satellite.jpg is the Esri Wayback release
// of 2024-06-27 (`sources.satelliteRelease: 39767`, `pnpm data:satellite xp`),
// not the current Esri World Imagery, which has a cloud over the entrance and
// the northern half of the park.
import trails from './trails.js';

// The designed area follows `sources.outline` (src/parks/xp/index.js), the OSM
// outline corrected to take in the south-eastern trails and towers and to leave
// out the houses south of the lower road.

export default [
  // dirt tracks of the amphibious vehicles and jungle trails (traced from the
  // satellite, see trails.js): packed earth, not stone paving
  { kind: 'pave', surface: 'dirt', at: [0, 0], width: 3.5, lines: trails },
  // Toboganxote: the long white channel winding south of the sphere
  {
    kind: 'pave',
    landmark: 'toboganxote',
    width: 3,
    lines: [
      [
        [-36, 3],
        [-30, 25],
        [-22, 40],
        [-5, 45],
        [-7, 63],
        [8, 78],
        [-3, 93],
        [4, 108],
        [15, 113],
      ],
    ],
  },
  // bus drop-off and turning area by the highway access (open ground)
  {
    kind: 'pave',
    at: [20, -190],
    polygons: [
      [
        [-12, -45],
        [26, -45],
        [24, 0],
        [6, 40],
        [-14, 40],
        [-24, 18],
      ],
    ],
  },
  // central plaza ("Inicio y fin de actividades") between the zip-line towers
  // and El Troglodita
  {
    kind: 'pave',
    at: [160, 30],
    polygons: [
      [
        [-32, -18],
        [10, -30],
        [30, -8],
        [24, 30],
        [-6, 34],
        [-30, 14],
      ],
    ],
  },

  // cenote of the Hamacuatizaje (open water by the tower, SW of it) and the
  // open stretch of underground river east of the park
  {
    kind: 'water',
    cover: 'river',
    at: [0, 0],
    width: 7,
    lines: [
      [
        [214, -2],
        [218, -12],
        [224, -22],
        [232, -30],
        [242, -40],
        [254, -50],
      ],
    ],
  },
  {
    kind: 'water',
    cover: 'river',
    at: [0, 0],
    width: 5,
    lines: [
      [
        [180, -20],
        [192, -28],
        [203, -34],
        [212, -38],
        [218, -33],
      ],
      [
        [545, -94],
        [565, -97],
        [590, -102],
        [605, -104],
      ],
    ],
  },

  { kind: 'clearTrees', at: [20, -190], radius: 30 },
  { kind: 'clearTrees', at: [160, 30], radius: 24 },
];
