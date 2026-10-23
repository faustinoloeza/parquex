// 3D models placed in Xenses (see src/models for the model library and
// src/parks/xc/landmarks.js for the fields). Positions measured on the
// satellite image with `pnpm data:compare xs <x>:<z>:<radius>` (or `@-x:z:r`).
const DEG = Math.PI / 180;

// axis of the south hall (Xensatorium) and its neighbors: ≈ 59° from east (towards NE)
const HALL = 59.4 * DEG;
// the Pueblo street runs north-west from the Rehilete towards the slide tower
const STREET = [
  [71, 6],
  [45, -25],
  [21, -52],
  [5, -75],
  [-10, -98],
];

export default [
  // Rehilete: white dome ≈ 31 m across with colored blades spiralling out to
  // r ≈ 28 m (the dark spokes on satellite), replacing the OSM footprint
  // "Pinwheel" (which also covers the annex to its west and read as one big block)
  { id: 'rehilete', type: 'pinwheel', x: 121, z: 39, radius: 15.5, height: 12, outer: 28, clear: 30, replacesOsm: [550357196] },
  // Latido: the small orange dome (r ≈ 5 m) north-west of the Rehilete
  {
    id: 'latido',
    type: 'pavilion',
    x: 89,
    z: 24,
    roof: 'dome',
    width: 10,
    height: 7,
    domeMaterial: 'court',
    clear: 6,
    replacesOsm: [1454442180],
  },
  // restrooms and lockers: long white block between the Latido and the street
  // to the west entrance of the hub (≈ 30 × 8 m along the street)
  { id: 'casilleros', type: 'pavilion', x: 80, z: 40, rotation: -49 * DEG, width: 26, depth: 8, height: 4, clear: 6 },
  // El Xnack: grey shade south-west of the dome with rows of tables
  { id: 'xnack', type: 'pavilion', x: 96, z: 77, rotation: -45 * DEG, roof: 'pergola', width: 26, depth: 16, height: 3.6, clear: 12 },
  // ticket office facing the plaza towards the drop-off roundabout (~)
  { id: 'taquillas', type: 'pavilion', x: 160, z: 62, rotation: 20 * DEG, width: 12, depth: 6, height: 3.8, clear: 6 },

  // El Pueblo: leaning houses with red roofs along the north-east side of the
  // street (the reddish band on satellite), the first one upside down
  { id: 'pueblo', type: 'crookedTown', x: 46, z: -24, line: STREET, side: -1, offset: 3.2, spacing: 6.5, depth: 5.5 },

  // Tobogán: the OSM "Slip" tower (water slide tower, 6 levels) with its slide
  // running south-south-east down to a splash pool by the top of the street
  {
    id: 'tobogan',
    type: 'slideTower',
    x: -24,
    z: -156,
    rotation: 15 * DEG,
    height: 18,
    length: 30,
    clear: 8,
    replacesOsm: [550357199],
  },

  // Xensatorium: the long hall south of the hub (≈ 96 × 22 m, solar panels on
  // the roof), replacing the OSM footprint; and the panel-roofed annex east of it
  {
    id: 'xensatorium',
    type: 'pavilion',
    x: 38.5,
    z: 236.5,
    rotation: HALL,
    roof: 'panels',
    width: 96,
    depth: 20,
    height: 7,
    clear: 12,
    replacesOsm: [550357200],
  },
  {
    id: 'anexo-sala',
    type: 'pavilion',
    x: 77,
    z: 240,
    rotation: HALL,
    roof: 'panels',
    width: 22,
    depth: 14,
    height: 5,
    replacesOsm: [1427348799],
  },

  // cars in the visitor lot south-east of the hub (shaded by trees; the lot
  // further south is empty on satellite)
  {
    id: 'autos',
    type: 'parkedCars',
    x: 175,
    z: 135,
    rows: [
      { from: [182.5, 122.5], to: [184.5, 140], count: 5, heading: 5 },
      { from: [165.5, 135.5], to: [166.5, 141], count: 2, heading: 0 },
      { from: [167.5, 149], to: [168.5, 154], count: 2, heading: 0 },
      { from: [176, 152], to: [186, 155.5], count: 4, heading: 100 },
      { from: [163, 109], to: [163, 109], count: 1, heading: 60 },
    ],
  },
];
