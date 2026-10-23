// 3D models placed in Xoximilco (see src/models for the library and
// src/parks/xc/landmarks.js for the fields). Positions measured on the
// satellite image with `pnpm data:compare xo -- x:z:r`. The water level of the
// canals is y = 0.

const DEG = Math.PI / 180;

// Embarcadero: the big round palapa standing in the lake at the north-east
// corner, with the trajineras moored all around its east and south sides, bow
// to the palapa (≈ 21 boats on the satellite).
const EMBARCADERO = [317, -280];
const moored = Array.from({ length: 21 }, (_, i) => {
  const a = (-70 + i * 9.5) * DEG;
  return [EMBARCADERO[0] + 27.5 * Math.cos(a), EMBARCADERO[1] + 27.5 * Math.sin(a), -70 + i * 9.5 + 180, i];
});

export default [
  // ------------------------------------------------------------- entrance
  // free-standing entrance arch over the access road from the highway
  // (OSM service road 679574895), facing the highway (east)
  { id: 'arco-entrada', type: 'fiestaArch', x: 438, z: -80.5, rotation: -90 * DEG, clear: 9 },

  // ---------------------------------------------------------- embarcadero
  { id: 'embarcadero', type: 'roundPalapa', x: EMBARCADERO[0], z: EMBARCADERO[1], y: 0.4, radius: 19, tiers: 2, clear: 22 },
  { id: 'trajineras-embarcadero', type: 'trajineras', x: EMBARCADERO[0], z: EMBARCADERO[1], y: 0, boats: moored },
  // round building west of the embarcadero (terracotta ring around a courtyard)
  // and the footbridge between both
  {
    id: 'casona',
    type: 'pavilion',
    x: 267,
    z: -241.5,
    y: 0.4,
    roof: 'dome',
    width: 36,
    height: 9,
    wall: 'facadeOchre',
    domeMaterial: 'tile',
    clear: 20,
  },
  {
    id: 'puente-embarcadero',
    type: 'walkways',
    x: 291,
    z: -263,
    y: 0.75,
    width: 4,
    clear: 0,
    lines: [
      [
        [283, -255],
        [299, -270],
      ],
    ],
  },
  // boat slips north of the embarcadero (white pier with stalls to its east)
  {
    id: 'muelle-norte',
    type: 'dock',
    x: 262.5,
    z: -317,
    poly: [
      [-1.8, -15],
      [1.8, -15],
      [1.8, 15],
      [-1.8, 15],
    ],
    clear: 0,
  },
  {
    id: 'trajineras-muelle-norte',
    type: 'trajineras',
    x: 269,
    z: -317,
    y: 0,
    boats: [
      [269.5, -326, 0, 2],
      [269.5, -321.5, 0, 5],
      [269.5, -310, 0, 0],
    ],
  },
  // trajineras waiting at the docks west of the round building
  {
    id: 'trajineras-muelle-oeste',
    type: 'trajineras',
    x: 228,
    z: -210,
    y: 0,
    boats: [
      [229, -229.5, 30, 1],
      [232, -224, 30, 3],
      [233.5, -218.5, 30, 6],
      [235, -213.5, 30, 4],
      [236.5, -208.5, 30, 2],
      [215, -207.5, 0, 5],
      [215, -203.5, 0, 0],
      [215, -199.5, 0, 3],
      [215, -195.5, 0, 6],
      [215, -191.5, 0, 1],
    ],
  },

  // ------------------------------------------------ trajineras on the canals
  {
    id: 'trajineras-canales',
    type: 'trajineras',
    x: 0,
    z: 0,
    y: 0,
    boats: [
      [-200, -361, 0, 0],
      [-20, -366, 180, 1],
      [150, -358, 3, 2],
      [-405, -150, 92, 3],
      [-324, -180, -88, 4],
      [-256, 60, 90, 5],
      [40, 230, 30, 6],
      [360, 200, 80, 0],
      [-150, 60, 92, 2],
      [80, -110, 15, 4],
    ],
  },

  // -------------------------------------------------------------- buildings
  // palapas and service buildings seen on the satellite (no OSM footprints)
  { id: 'palapa-embarcadero-oeste', type: 'longPalapa', x: 219, z: -284, rotation: 25 * DEG, length: 22, width: 10, clear: 12 },
  { id: 'palapas-muelle-norte', type: 'longPalapa', x: 251, z: -322, rotation: 75 * DEG, length: 16, width: 8, clear: 9 },
  { id: 'palapa-terracota', type: 'roundPalapa', x: 165, z: -212, radius: 7, tiers: 1, clear: 9 },
  { id: 'bodega-sur', type: 'longPalapa', x: 229, z: 166, rotation: 0, length: 28, width: 11, clear: 14 },
  { id: 'recepcion', type: 'longPalapa', x: 416, z: 7, rotation: 90 * DEG, length: 22, width: 12, clear: 12 },

  // white saw-tooth roofed grandstand by the off-road track (shared with Xavage)
  // and flat white service buildings on the south trail
  { id: 'gradas', type: 'pavilion', x: -66, z: -255, rotation: -15 * DEG, width: 34, depth: 15, height: 6, clear: 18 },
  { id: 'servicios-sur-1', type: 'pavilion', x: -247, z: 246, width: 14, depth: 10, height: 4, clear: 9 },
  { id: 'servicios-sur-2', type: 'pavilion', x: -213, z: 247, width: 18, depth: 10, height: 4, clear: 11 },

  // ------------------------------------------------------------- parking
  {
    id: 'autos-estacionamiento',
    type: 'parkedCars',
    x: 399,
    z: -45,
    rows: [
      { from: [399, -67], to: [399, -56], count: 5, heading: 0 },
      { from: [399, -34], to: [399, -26], count: 4, heading: 0 },
      { from: [419, -16], to: [419, -16], count: 1, heading: 0 },
    ],
  },
];
