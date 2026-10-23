// 3D models placed in Xcaret (see src/models for the model library).
//
// Every entry: { id, type, x, z, rotation?, y?, clear?, ...model params }
//   x, z      local meters (x = east, z = south) from the park center
//   rotation  radians, counter-clockwise seen from above
//   y         fixed height; by default the model sits on the terrain
//   clear     radius (m) kept free of generated trees and generic buildings
//   replacesOsm  OpenStreetMap building ids this model replaces
//
// Positions were measured on the official illustration and on satellite
// imagery (pipeline/tools/compare-landmarks.js renders both side by side).
const DEG = Math.PI / 180;

export default [
  // Gran Tlachco – theater of "Xcaret México Espectacular" (octagonal tiled roof)
  { id: 'tlachco', type: 'tlachco', x: 96, z: -373, radius: 44, clear: 56 },
  // Torre Escénica – 80 m tower with a rotating panoramic cabin
  { id: 'torre', type: 'scenicTower', x: 152, z: -406, height: 80, clear: 13 },
  // Voladores de Papantla pole (Danzas y Rituales Totonacas)
  { id: 'voladores', type: 'voladores', x: 216, z: -86, height: 30, clear: 8 },
  // Plaza principal: the arrival hall (harp recital, "Descubriendo México")
  // with a garden courtyard, built inside a stepped grass-terraced pyramid.
  // Roof platform 58 m and stairway stubs N/S measured on satellite imagery;
  // pyramid base (~70 m), the long south stairway and the ground-level east
  // entrance (where the route arrives) from the official illustration.
  {
    id: 'plaza',
    type: 'mayanPlaza',
    x: -70,
    z: -100,
    size: 58,
    base: 70,
    tiers: 4,
    courtyard: 25.5,
    height: 7.5,
    rotation: 0,
    clear: 40,
    stairs: [
      { side: 'n', width: 7 },
      { side: 's', width: 12 },
    ],
    portals: [
      { side: 'e', at: 2 },
      { side: 'w', at: -6 },
    ],
  },
  // Pebble-mosaic compass rose of the entrance plaza east of the main plaza,
  // where the flamingos are walked (official illustration; walking tour video)
  { id: 'rosa-vientos', type: 'compassRose', x: -27.8, z: -98, radius: 5, clear: 6 },
  // Ticket offices: a long half-moon building, with one more section to the
  // south, and its portal on the axis of the main plaza's west entrance
  // (z ≈ -106): past the turnstiles a straight path leads to the pyramid. The
  // concave front (ticket windows) faces the arriving visitors and the flag.
  // The origin is the center of the curve.
  {
    id: 'taquillas',
    type: 'crescentTickets',
    x: -178.6,
    z: -106,
    r0: 30,
    r1: 37.5,
    a0: -24 * DEG,
    a1: 46 * DEG,
    height: 5,
    passage: 12,
    passageAt: 0,
    joints: [24 * DEG],
  },
  // Espectáculo Ecuestre: charrería arena of packed earth next to the restaurant,
  // with wooden bleachers on its west side and a stable on its east side
  // (official map; the sandy ground shows on satellite imagery)
  {
    id: 'ecuestre',
    type: 'charroArena',
    x: 10,
    z: -118,
    outline: [
      [-8, -21],
      [7.5, -21],
      [6.5, 6],
      [5.5, 21],
      [-7, 20],
    ],
    stands: [-14.5, 1, -9.3, 12],
    stable: [8, 8.5, 18.5, 21.5],
    horses: [
      [-2, -10, 20, '#7a4a2a', true],
      [2, 2, 160, '#e6e0d4', true],
      [-3, 13, -60, '#3b2a20', false],
      [4, -15, 95, '#5a3a24', false],
    ],
  },
  // Juego de Pelota (Mesoamerican ball court), footprint from OSM
  { id: 'pelota', type: 'ballCourt', x: -96, z: -30, length: 72, width: 26, rotation: -2.9 * DEG, clear: 40 },
  // Capilla de Guadalupe (yellow colonial chapel next to the hacienda)
  { id: 'guadalupe', type: 'chapel', variant: 'guadalupe', x: 2, z: -156, rotation: 0, clear: 10 },
  // Hacienda Henequenera chimney
  { id: 'chimenea', type: 'chimney', x: -1, z: -228, height: 26, clear: 4 },
  // "Caracol" round stepped tower and the fan-shaped Xcaret Plus building
  { id: 'caracol', type: 'caracol', x: 205, z: -126, radius: 13, clear: 15 },
  {
    id: 'xplus',
    type: 'fan',
    x: 205,
    z: -126,
    r0: 17,
    r1: 48,
    a0: -104 * DEG,
    a1: 18 * DEG,
    blades: 6,
    clear: 0,
    replacesOsm: [1019729562],
  },
  // Cementerio Mexicano – round hill with 7 levels of colorful tombs
  // turned so its entrance (the gate with the cross and the first flight of
  // stairs, south in the model) faces east-south-east, where the official map
  // paints the stairway and the white line arrives
  { id: 'cementerio', type: 'cemetery', x: -125, z: 43, radius: 18, levels: 7, rotation: -74 * DEG, clear: 30 },
  // Capilla de San Francisco de Asís: white front block with the bell gable
  // facing north (z ≈ 103–109) and a thatched nave with a rounded apse to the
  // south (z ≈ 109–132), measured on satellite imagery
  { id: 'sanfrancisco', type: 'chapel', variant: 'sanfrancisco', x: -156, z: 117.5, rotation: Math.PI, clear: 15 },
  // Mariposario – large netted butterfly pavilion
  { id: 'mariposario', type: 'netDome', x: -128, z: 154, rx: 30, rz: 22, height: 16, clear: 6 },
  // Aviario
  { id: 'aviario', type: 'netDome', x: -192, z: 137, rx: 16, rz: 14, height: 12, arcade: true, clear: 5 },
  // Zona arqueológica: small stepped pyramids, an altar and low ruins
  { id: 'piramide-11a', type: 'pyramid', x: 271, z: -62, size: 12, height: 8, rotation: 8 * DEG, clear: 10 },
  { id: 'altar-11', type: 'altar', x: 261, z: -66, clear: 4 },
  { id: 'piramide-11b', type: 'pyramid', x: 264, z: -51, size: 10, height: 6.5, rotation: 8 * DEG, clear: 8 },
  { id: 'piramide-25', type: 'pyramid', x: 158, z: 2, size: 11, height: 7, rotation: -10 * DEG, clear: 9 },
  {
    id: 'ruinas-16',
    type: 'ruins',
    x: 0,
    z: 62,
    rooms: [
      [-8, -5, 7, 6],
      [10, 0, 9, 7],
      [-18, 15, 8, 8],
      [2, 14, 6, 5],
    ],
    clear: 4,
  },
  { id: 'templo-17', type: 'pyramid', x: 57, z: 161, size: 9, height: 4.5, rotation: 15 * DEG, clear: 8 },
  // Foro Abierto – round open forum
  { id: 'foro', type: 'forum', x: 122, z: -8, radius: 17, clear: 19 },
  // Big conical palapa south of the forum, open at the top in a collar
  // (satellite: roof Ø ≈ 41 m; official map: the collar)
  { id: 'palapa-central', type: 'roundPalapa', x: 108, z: 47.5, radius: 19.5, tiers: 1, oculus: 6.5, clear: 22 },
  // Acuario de Arrecife de Coral: angular flat-roofed building, wooden roof over
  // the court and a separate block with panels to the north (satellite + official map)
  {
    id: 'acuario',
    type: 'aquarium',
    x: 165,
    z: 48,
    outline: [
      [-18, -9],
      [2, -9],
      [16, 0.5],
      [8, 3.5],
      [19, 9],
      [19, 16.5],
      [1, 16.5],
      [1, -1],
      [-18, -1],
    ],
    glass: [
      [2, -9],
      [16, 0.5],
    ],
    court: [-9, -3, 0.5, 11],
    annex: [-18, -22.5, -6.5, -13.5],
    clear: 19,
  },
  // Museo Viviente de Orquídeas y Bromelias: shade-net greenhouses (OSM
  // footprints and satellite imagery; the vault as on the official map)
  { id: 'orquideas-a', type: 'greenhouse', x: 49.5, z: -271.5, width: 11, length: 43, rotation: 0.03 },
  { id: 'orquideas-b', type: 'greenhouse', x: 71, z: -286, width: 19, length: 20, bays: 3, rotation: 0.03 },
  { id: 'orquideas-c', type: 'greenhouse', x: 84.4, z: -280.8, width: 7.7, length: 24, vault: true, rotation: 0.03 },
  // Henequen (agave) field and stone aqueduct of the hacienda
  // Stone building over the path of the brown line on the way to the Gran
  // Tlachco, by the «Bienvenida Prehispánica»: painted on the illustration
  // (jungle hides it from the satellite), looks from Street View
  { id: 'galeria-antorchas', type: 'galleryBridge', x: 24.5, z: -295, clear: 14 },
  // blue agaves on white gravel (the pale patch of satellite imagery reaches
  // further south than the illustration's rows), boulder and Virgin by the path
  { id: 'henequen', type: 'agaveField', x: 31, z: -216, length: 26, width: 14, rotation: 0, clear: 10 },
  { id: 'acueducto', type: 'aqueduct', x: 21, z: -242, length: 120, rotation: 0, clear: 0 },
  // Entrance building (Puuc style) where visitors arrive from the parking lots:
  // stone wings around a planted courtyard, measured on satellite imagery (the
  // official map draws it ~25 m further south)
  {
    id: 'acceso',
    type: 'entranceBuilding',
    x: -155.5,
    z: -138.25,
    outer: [-17, -15.25, 17, 15.25],
    court: [-10, -8.75, 4, 3.25],
  },
  // Mexican flag of the entrance plaza: dark green pole on a square stone
  // pedestal (Street View)
  { id: 'bandera', type: 'flagpole', x: -176, z: -106, height: 18, rotation: 90 * DEG, clear: 4 },
  // Terminal of the park's own shuttles north-west of the entrance building
  // (bays where satellite imagery shows the parked buses; numbered posts,
  // shelter, vehicles and the walkway to the flag from Street View). Visitors
  // get off, walk right along the sidewalk and down the walkway to the flag.
  {
    id: 'terminal-autobuses',
    type: 'busTerminal',
    x: -178,
    z: -165,
    curb: [
      [-196.5, -159.5],
      [-155.5, -190.5],
    ],
    vehicles: [
      ['van'],
      ['bus', '#e8508a', ['#7a3fc4', '#f2c33a', '#2fb5c9', '#ffffff']],
      ['bus', '#3b6fd8', ['#f2c33a', '#e8508a', '#7bd34f']],
      ['bus', '#e8608f', ['#ffffff', '#2fb5c9', '#f28c28']],
      ['bus', '#8a4fd0', ['#f2c33a', '#e8508a', '#ffffff']],
      ['bus', '#3b6fd8', ['#ffffff', '#f2c33a', '#d9475e']],
      ['van'],
      ['van'],
      ['van'],
      ['bus', '#e8608f', ['#7bd34f', '#f2c33a', '#2fb5c9']],
      ['bus', '#9ccc3c', ['#f2c33a', '#2b7de0', '#e8508a']],
    ],
    shelter: { at: [-183.7, -159.1], length: 9, width: 5 },
    // the lot in front of the bays, up to the planted strip (official map;
    // grey interlocking pavers in Street View, 2012)
    plaza: [
      [-204.5, -153.5],
      [-152.3, -192.9],
      [-167.6, -212.9],
      [-219.6, -173.5],
    ],
    exit: { at: [-198, -152.5], facing: [-205, -163] },
    walk: [
      [-193, -156],
      [-191, -145],
      [-188, -133],
      [-185, -122],
    ],
  },
  // round thatched sunscreen kiosk in the middle of the plaza, between the flag
  // and the ticket offices (Street View)
  { id: 'kiosco-entrada', type: 'palapaKiosk', x: -163, z: -106, radius: 2.8, clear: 5 },
  // Gate of the «Sendero de Selva al Río del Paraíso» on the main path east of
  // the plaza (painted on the official map, looks from a visitor's photo)
  { id: 'puerta', type: 'trailGate', x: 68, z: -100, rotation: 0, clear: 8 },
  // Mayan entrance arch west of the ball court (gatehouse with a corbel arch
  // and the XCARET boulder), parallel to the parking lot's planted strips and
  // facing them (south-west)
  { id: 'arco-acceso', type: 'entranceArch', x: -171, z: -25, rotation: 56 * DEG, clear: 10 },
  // Temazcal of the Pueblo Maya: stone dome, doorway towards the path (west)
  { id: 'temazcal', type: 'temazcal', x: -65.5, z: 70.5, radius: 4, rotation: -90 * DEG, clear: 6 },
  // White building with blue domes and Plaza del Vitral
  { id: 'domos', type: 'domes', x: -166, z: 48, rotation: 0, clear: 9 },
  { id: 'vitral', type: 'vitral', x: -140, z: 221, rotation: 0, clear: 12 },
  // XCARET / MEXICO letters filled with Mexican textile patterns and framed in
  // white, on the sandy point of the pool where the underground rivers come
  // out, facing the swimmers (visitor's photo; spot on the official map)
  {
    id: 'letras-rios',
    type: 'letters',
    text: 'XCARET',
    x: -134,
    z: 375,
    scale: 0.55,
    color: 'textile',
    outline: 'white',
    base: 'rockwall',
    clear: 6,
  },
  { id: 'letras-rios-mexico', type: 'letters', text: 'MEXICO', x: -131, z: 376.6, scale: 0.17, color: 'white', base: 'rockwall', clear: 0 },
  // «52 JAGUARES Y PUMAS» carved boulder between the path and the moat, by the
  // south-east stairs of the bridge (visitor's photo)
  {
    id: 'letrero-felinos',
    type: 'stoneSign',
    x: -50.5,
    z: 209.5,
    rotation: -45 * DEG,
    number: 52,
    lines: ['JAGUARES', 'Y PUMAS'],
    hours: '8:30 h - 18:30 h',
    clear: 5,
  },
  // Caleta para Snorkel (activity 30): limestone ledges on both banks, entries
  // with wooden handrails on the palapas' bank (east) and wide steps across
  // (visitors' photos; banks traced on the official map)
  {
    id: 'caleta-snorkel',
    type: 'snorkelCove',
    x: 132,
    z: 170,
    y: 0,
    clear: 0,
    ledges: [
      {
        width: 2.6,
        pts: [
          [136, 149],
          [139, 162],
          [144.5, 170.5],
          [151, 179.5],
          [152.5, 188],
        ],
      },
      {
        width: 2.4,
        pts: [
          [109.5, 155],
          [115, 163.8],
          [122.8, 172.8],
          [129, 181],
          [130.8, 190],
        ],
      },
    ],
    entries: [
      { at: [138.6, 158], toward: [130, 161.5], width: 1.3, rails: 2 },
      { at: [142.6, 168], toward: [134.5, 172.5], width: 1.3, rails: 2 },
      { at: [148.5, 177], toward: [141, 182.5], width: 1.3, rails: 2 },
      { at: [120.2, 169.6], toward: [127, 164], width: 5, rails: 3 },
    ],
  },
  // Puma and jaguar islands: two islands isolated by a sunken moat ~4.5 m deep
  // (dark walls crowned by pointed stones), with a canyon between them that a
  // suspension footbridge runs over. Rims, ponds and bridge from OSM (cliffs
  // 1020271510-12 / 1020271503-04, ponds of relation 13661017, bridge
  // 1020271507), looks from visitors' photos.
  {
    id: 'felinos',
    type: 'habitat',
    x: -62,
    z: 178,
    // visitors' rim of the moat
    outer: [
      [-96.7, 235.5],
      [-99.9, 220.9],
      [-98.7, 202.4],
      [-92.1, 190.3],
      [-76.3, 177.2],
      [-75.0, 176.1],
      [-69.3, 171.2],
      [-64.7, 162.2],
      [-63.6, 147.8],
      [-60.1, 135.1],
      [-45.6, 130.2],
      [-35.5, 132.3],
      [-25.8, 139.6],
      [-25.0, 153.4],
      [-33.1, 165.7],
      [-39.0, 172.9],
      [-46.1, 194.7],
      [-60.9, 215.9],
      [-74.8, 229.3],
      [-85.8, 237.4],
    ],
    islands: [
      {
        animal: 'puma',
        at: [-45, 152],
        rim: [
          [-52.4, 194.7],
          [-50.0, 191.2],
          [-43.5, 170.5],
          [-36.7, 162.7],
          [-29.4, 152.5],
          [-30.5, 143.2],
          [-37.3, 137.4],
          [-45.7, 135.1],
          [-55.3, 138.1],
          [-58.4, 147.8],
          [-59.8, 162.9],
          [-65.1, 174.4],
          [-71.6, 180.0],
          [-54.1, 197.2],
        ],
        // along the canyon, 1 m inside the rim
        pond: [
          [-64.3, 175.0],
          [-70.1, 180.0],
          [-54.3, 195.6],
          [-53.2, 194.1],
          [-57.4, 189.1],
          [-63.2, 183.0],
          [-62.5, 179.4],
        ],
      },
      {
        animal: 'jaguar',
        at: [-80, 207],
        rim: [
          [-78.6, 184.8],
          [-88.5, 192.9],
          [-92.9, 203.6],
          [-94.8, 220.4],
          [-92.9, 230.2],
          [-87.6, 231.0],
          [-77.3, 225.3],
          [-64.7, 213.3],
          [-59.7, 205.4],
          [-57.2, 201.4],
          [-75.3, 182.2],
        ],
        pond: [
          [-60.5, 204.9],
          [-58.5, 201.5],
          [-75.4, 183.6],
          [-78.0, 185.6],
          [-71.9, 192.5],
          [-63.4, 199.3],
        ],
      },
    ],
    // deck ends where the bridge's line crosses the visitors' rim; the tower
    // (north-west) and the landing (south-east) stand beyond them; both flights
    // of stairs go down their north-east side, along the moat wall (user's marks)
    bridge: {
      from: [-75.9, 176.9],
      to: [-51.4, 202.3],
      height: 2.6,
      sag: 0.7,
      width: 1.6,
      tower: 4.3,
      landing: 2.8,
      stairs: [
        [0.72, -0.69],
        [0.72, -0.69],
      ],
    },
  },
  // Signpost with arrows to world cities on the rocky shore south of the beach
  // (Google Street View 20.576886, -87.1207784). Names and colors legible in
  // visitors' photos; distances and arrow directions are computed.
  {
    id: 'poste-ciudades',
    type: 'signpost',
    x: -82.5,
    z: 412.5,
    clear: 3,
    places: [
      { name: 'NEW YORK', at: [40.7128, -74.006], color: 'pink' },
      { name: 'HOTEL XCARET MÉXICO', km: 1.3, bearing: 0, color: 'yellow' },
      { name: 'COZUMEL', at: [20.4229, -86.9223], color: 'green' },
      { name: 'CANCÚN', at: [21.1619, -86.8515], color: 'yellow' },
      { name: 'HOLANDA', at: [52.3676, 4.9041], color: 'red' },
      { name: 'ROMA', at: [41.9028, 12.4964], color: 'pink' },
      { name: 'XENOTES', km: 73, bearing: 20, color: 'green' },
      { name: 'XEL-HÁ', at: [20.3192, -87.3578], color: 'blue' },
      { name: 'TULUM', at: [20.2114, -87.4654], color: 'green' },
      { name: 'CIUDAD DE MÉXICO', at: [19.4326, -99.1332], color: 'pink' },
      { name: 'ALASKA', at: [61.2181, -149.9003], color: 'yellow' },
      { name: 'CANADÁ', at: [43.6532, -79.3832], color: 'red' },
      { name: 'MOSCÚ', at: [55.7558, 37.6173], color: 'black' },
      { name: 'MADRID', at: [40.4168, -3.7038], color: 'white' },
      { name: 'PARÍS', at: [48.8566, 2.3522], color: 'blue' },
      { name: 'LOS ÁNGELES', at: [34.0522, -118.2437], color: 'yellow' },
      { name: 'BUENOS AIRES', at: [-34.6037, -58.3816], color: 'blue' },
      { name: 'TOKIO', at: [35.6762, 139.6503], color: 'pink' },
    ],
  },
  // Delphinus / escollera, traced on satellite imagery
  { id: 'baja-california', type: 'roundPalapa', x: 146, z: 290, radius: 13, tiers: 3, clear: 15 },
  { id: 'palapa-delphinus', type: 'longPalapa', x: 116, z: 313, length: 28, width: 9, rotation: -37 * DEG, clear: 8 },
  {
    id: 'muelle',
    type: 'dock',
    x: 183,
    z: 264,
    y: 0.6,
    poly: [
      [-10, -11.5],
      [-4, -13.5],
      [10, 9.5],
      [3, 14.5],
    ],
    clear: 9,
  },
  {
    id: 'andadores-delphinus',
    type: 'walkways',
    x: 95,
    z: 305,
    y: 0.75,
    width: 1.8,
    clear: 0,
    lines: [
      [
        [58, 322.5],
        [63, 312],
        [70, 303],
        [78, 295.5],
        [85, 291.5],
        [93, 288],
        [100, 287],
        [105, 287.5],
        [110, 289],
        [116, 291],
        [121, 296],
        [124.5, 303],
      ],
      [
        [65.5, 329],
        [70, 320],
        [77, 312],
        [85, 304.5],
        [95, 297],
        [104, 290.5],
        [110, 288.5],
      ],
      [
        [73, 334],
        [84, 325.5],
        [96, 315.5],
        [108, 305.5],
        [119, 296.5],
      ],
      [
        [75, 317],
        [81, 326],
        [87, 335],
      ],
      [
        [65.5, 330],
        [73, 334],
        [87, 335.5],
      ],
      [
        [110, 288.5],
        [118, 283],
        [125, 277.5],
        [131, 273],
      ],
    ],
  },
  {
    id: 'lanchas',
    type: 'boats',
    x: 100,
    z: 280,
    y: 0,
    clear: 0,
    boats: [
      [80.5, 289, -25, 8, '#f4f4f2'],
      [92.5, 284, -20, 9, '#2a5db0'],
      [124, 273, -30, 14, '#f4f4f2'],
    ],
  },
  // Mundo de Niños water slides and play tower
  { id: 'toboganes-a', type: 'waterSlides', x: 334, z: -27, rotation: 0, clear: 14 },
  { id: 'toboganes-b', type: 'waterSlides', x: 372, z: -104, rotation: 0.6, clear: 14 },
  { id: 'mundo-ninos', type: 'kidsTower', x: 356, z: -61, rotation: -0.45, clear: 12 },
];
