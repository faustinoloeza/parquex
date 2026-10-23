// Landmarks of Xplor, measured on the satellite reference (Esri Wayback
// 2024-06-27, see edits.js) with `pnpm data:compare xp x:z:r`. Coordinates
// in local meters (x east, z south of the park center).
const DEG = Math.PI / 180;

// Zip-line towers: round thatch roofs (≈ 8–11 m across) and round stairwell
// rings (≈ 13 m) seen from above, several with the shadow of their cables.
// [id, x, z, options]; replacesOsm: OSM footprints mapped at the towers
const TOWERS = [
  ['torre-acceso-1', -106, -85, { replacesOsm: [1428097073] }],
  ['torre-acceso-2', -132, -69, { height: 28, replacesOsm: [1428097072] }],
  ['torre-noreste', 268, -286, { replacesOsm: [1427360668, 1454412294, 1454412295] }],
  ['torre-este-1', 496, -102, { height: 32 }],
  ['torre-este-2', 425, -79, { replacesOsm: [1428204958] }],
  ['torre-hamaca', 258, -62, { height: 32, radius: 3.8, replacesOsm: [1428204957] }],
  ['torre-plaza-1', 123, 17, { height: 32, radius: 3.6, replacesOsm: [1428204922] }],
  ['torre-plaza-2', 132, 25, { height: 36, radius: 3.8, spiral: true }],
  ['torre-oasis', -208, 94, { replacesOsm: [1428097066] }],
  ['torre-oeste', -398, 147, { replacesOsm: [1428097071] }],
  // round stairwell rings without a roof: the tall spiral towers of the map
  ['torre-espiral-oeste', -454, 202, { height: 40, radius: 4.4, spiral: true, roof: false, replacesOsm: [1428097070] }],
  ['torre-espiral-sur', 140, 241, { height: 40, radius: 4.4, spiral: true, roof: false }],
  ['torre-sur', -172, 343, { replacesOsm: [1428097076] }],
];

// The two circuits (7 lines each in the park; the order between towers is
// inferred from distances and the few cable shadows — low confidence).
const CIRCUITS = [
  ['torre-acceso-1', 'torre-noreste', 'torre-este-1', 'torre-este-2', 'torre-hamaca', 'torre-plaza-2'],
  ['torre-acceso-2', 'torre-oasis', 'torre-oeste', 'torre-espiral-oeste', 'torre-sur', 'torre-espiral-sur', 'torre-plaza-1'],
];

const towerHeight = (o) => o.height ?? 30;
const byId = new Map(TOWERS.map(([id, x, z, o]) => [id, { x, z, o }]));
const cablesFrom = (id) =>
  CIRCUITS.flatMap((c) => {
    const i = c.indexOf(id);
    if (i < 0 || i === c.length - 1) return [];
    const t = byId.get(c[i + 1]);
    return [[t.x, t.z, towerHeight(t.o) - 6]];
  });

export default [
  ...TOWERS.map(([id, x, z, o]) => ({
    id,
    type: 'zipTower',
    x,
    z,
    clear: (o.radius ?? 3.2) + 5,
    height: 30,
    radius: 3.2,
    cables: cablesFrom(id),
    ...o,
  })),

  // Toboganxote (2024): launch tower with its stairs, the white sphere, two
  // funnels and the tube down to the wave pool (pool from OSM)
  {
    id: 'toboganxote',
    type: 'toboganxote',
    x: -20,
    z: 72,
    clear: 14,
    // OSM footprints of the sphere, the funnels and the tower stairs
    replacesOsm: [1454442145, 1454442146, 1454442147, 1427348704],
    tower: [-32, -16],
    sphere: [0, 0, 10],
    funnels: [
      [-13, -32, 9],
      [37, -18, 7.5],
    ],
    path: [
      [-32, 41, -16],
      [-25, 35, -28],
      [-13, 27, -32],
      [-3, 21, -16],
      [2, 18, -2],
      [16, 13, -8],
      [37, 9, -18],
      [47, 5, 6],
      [52, 3, 18],
      [58, 0.6, 32],
    ],
  },

  // El Troglodita: buffet hall under a 4 × 4 grid of pyramid roofs
  { id: 'troglodita', type: 'pyramidGrid', x: 244, z: 21, rotation: 45 * DEG, clear: 26 },

  // central plaza "Inicio y fin de actividades": lockers / shop hall and small
  // round palapas (roofs seen on the satellite)
  { id: 'plaza-palapa', type: 'longPalapa', x: 158, z: 47, length: 24, width: 9, rotation: 34 * DEG, clear: 14 },
  { id: 'plaza-palapa-norte', type: 'roundPalapa', x: 159, z: 7, radius: 4.5, tiers: 2, clear: 7 },
  { id: 'palapa-manantial', type: 'roundPalapa', x: 108, z: 58, radius: 4.5, tiers: 2, clear: 7 },

  // underground river openings (dark holes on the satellite) and the stairwell
  // of the river swim
  { id: 'cueva-rio-1', type: 'caveEntrance', x: -95, z: 225, radius: 3.5, clear: 6 },
  { id: 'cueva-rio-2', type: 'caveEntrance', x: -65, z: 225, radius: 3, stairs: false, clear: 6 },

  // access: palapa by the bus drop-off (low confidence) and the staff lot
  { id: 'acceso-palapa', type: 'longPalapa', x: 14, z: -140, length: 16, width: 8, rotation: -70 * DEG, clear: 10 },
  {
    id: 'estacionamiento',
    type: 'parkedCars',
    x: -45,
    z: -135,
    rows: [
      { from: [-58, -150], to: [-43, -113], count: 6, heading: -23 },
      { from: [-45, -156], to: [-21, -116], count: 7, heading: -30 },
      { from: [-70, -156], to: [-62, -114], count: 4, heading: -10 },
    ],
  },
];
