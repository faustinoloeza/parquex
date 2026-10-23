// 3D models placed in Xel-Há (see src/models for the model library and
// src/parks/xc/landmarks.js for the fields). Positions measured on satellite
// imagery with `pnpm data:compare xh <x>:<z>:<radius>`.

export default [
  // Faro Mirador: lighthouse with water slides into a pool to its north
  { id: 'faro', type: 'lighthouseSlides', x: 230, z: 331, rotation: 0, clear: 12 },
  // entrance plaza: round thatched palapa (≈ 20 m across on satellite) in place
  // of the OSM footprint and of the painted cluster of roofs, which was read
  // as one 2400 m² cone
  { id: 'entrada-palapa', type: 'roundPalapa', x: 159, z: -30, radius: 9, tiers: 2, clear: 11, replacesOsm: [388137521] },
  // giant floating faucet off the big three-lobed island in front of activity
  // 17: water column from the spout to the lagoon surface (y = 0)
  { id: 'llave-flotante', type: 'floatingFaucet', x: -6, z: 168, y: 0, rotation: Math.PI / 4 },
  // ticket offices facing the arrival plaza (OSM footprint 388137519, 35 × 11 m):
  // rubble-stone block with seven blue arches, palms in front
  {
    id: 'taquillas',
    type: 'ticketArcade',
    x: 117.3,
    z: -21.5,
    rotation: 3.484,
    length: 35,
    width: 11,
    clear: 16,
    replacesOsm: [388137519],
  },
  // "Xel-Há" mosaic letters at the west end of the ticket offices' front
  {
    id: 'letrero',
    type: 'letters',
    x: 101.6,
    z: -36.0,
    rotation: 3.484,
    text: 'XELHA',
    scale: 0.6,
    color: 0xf4f1e8,
    outline: 0x1f7fc4,
    base: 'limestone',
    ornaments: true,
    clear: 5,
  },
];
