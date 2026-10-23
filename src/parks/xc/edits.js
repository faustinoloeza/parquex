// Manual corrections applied by the data pipeline on top of what it derives
// automatically from the illustration, OpenStreetMap and satellite imagery.
// Applied in order (later edits win where they overlap).
//
//   clearTrees      { at, radius }       no generated trees / buildings here
//   ignoreRoofs     { at, radius }       illustration shapes that are not roofs
//   keepRoofs       { at, radius }       painted roofs kept although by the water
//                                        or under trees (see pipeline/stages/buildings.js)
//   satelliteCover  { at, radius }       land cover from satellite (canopy / paving)
//   pave            { at | landmark, polygons, surface? }  paved ground (polygons relative)
//                                        (surface: 'dirt' → packed earth: trails, vehicle
//                                        tracks; walkable, no flagstones, not mobile paving)
//   plant           { at | landmark, polygons, cover? }  jungle with trees
//                                        (cover: 'lawn' → open scrub, sparse trees)
//   water           { at | landmark, polygons?, lines?, width?, cover? }  lagoon water
//                                        (lines: polylines `width` m wide, default 8;
//                                        cover: 'river' → dark river water)
//                                        pave / plant / water all accept `lines` + `width`
//                                        besides (or instead of) `polygons`; their
//                                        polygons always count as park (designed area),
//                                        even beyond the outline / clouds
//   flatten         { at | landmark, size }      level a square of terrain
//   keepOsmBuilding { osmId, roof }      force an OSM footprint (+ roof type)
//   removeOsmPiers  { bbox: [x0, z0, x1, z1] }   drop OSM piers re-modelled by hand
export default [
  // ground under the main plaza is level so it does not show inside the courtyard
  { kind: 'flatten', landmark: 'plaza', size: 62 },
  // octagonal plaza around the flag and the path to the entrance arch
  {
    kind: 'pave',
    landmark: 'bandera',
    polygons: [
      [
        [13, 0],
        [9.2, 9.2],
        [0, 13],
        [-9.2, 9.2],
        [-13, 0],
        [-9.2, -9.2],
        [0, -13],
        [9.2, -9.2],
      ],
      [
        [8, -5],
        [18, -5],
        [18, 5],
        [8, 5],
      ],
    ],
  },
  // jungle around the entrance building and in its courtyard
  {
    kind: 'plant',
    at: [-158, -140],
    polygons: [
      [
        [-16, -14],
        [4, -14],
        [20, -3],
        [20, 12],
        [6, 16],
        [-14, 16],
        [-18, 2],
      ],
    ],
  },

  // East of the main plaza the illustration paints the charro/horse mascot of
  // the equestrian show; it was misread as palapas. Satellite shows trees.
  { kind: 'ignoreRoofs', at: [-12, -112], radius: 20 },
  { kind: 'satelliteCover', at: [-12, -112], radius: 20 },
  { kind: 'satelliteCover', at: [5, -122], radius: 24 },
  { kind: 'ignoreRoofs', at: [1, -136.5], radius: 4 },
  { kind: 'ignoreRoofs', at: [15.8, -153.5], radius: 4 },
  // the official map draws the entrance building here, ~25 m south of where it
  // is; satellite imagery shows jungle
  { kind: 'satelliteCover', at: [-151, -110], radius: 16 },
  // plaza in front of the ticket offices (flag and kiosk in the middle) and the
  // straight path from their turnstiles to the west entrance of the main plaza
  {
    kind: 'pave',
    at: [-140, -106],
    polygons: [
      [
        [-50, -15],
        [-8, -15],
        [-8, 2],
        [-14, 28],
        [-50, 28],
      ],
      [
        [-6, -3],
        [36, -3],
        [36, 3],
        [-6, 3],
      ],
    ],
  },
  // stone-paved walkway from the shuttle terminal to the entrance plaza and main entrance
  {
    kind: 'pave',
    at: [0, 0],
    lines: [
      [
        [-193, -156],
        [-191, -145],
        [-188, -133],
        [-185, -121],
        [-140, -106],
        [-104, -101],
        [-70, -94],
        [-30, -95],
      ],
    ],
    width: 8,
  },
  // round plaza around the sunscreen kiosk
  {
    kind: 'pave',
    landmark: 'kiosco-entrada',
    polygons: [
      [
        [8, 0],
        [5.7, 5.7],
        [0, 8],
        [-5.7, 5.7],
        [-8, 0],
        [-5.7, -5.7],
        [0, -8],
        [5.7, -5.7],
      ],
    ],
  },
  // packed earth of the charrería arena (landmark 'ecuestre')
  {
    kind: 'pave',
    landmark: 'ecuestre',
    surface: 'dirt',
    polygons: [
      [
        [-8, -21],
        [7.5, -21],
        [6.5, 6],
        [5.5, 21],
        [-7, 20],
      ],
    ],
  },
  // small red-roof building east of the hacienda path, aligned north-south as
  // on satellite imagery (OSM footprint) instead of the skewed painted blob
  { kind: 'ignoreRoofs', at: [20.4, -160.4], radius: 5 },
  { kind: 'keepOsmBuilding', osmId: 1454523992, roof: 'tile' },

  // small huts by the lagoons, kept although the pipeline drops roof-colored
  // shapes at the water's edge (rocks) and under the canopy (tree trunks)
  { kind: 'keepRoofs', at: [116, 128], radius: 4 },
  { kind: 'keepRoofs', at: [158, 117], radius: 5 },
  { kind: 'keepRoofs', at: [306, 42], radius: 5 },

  // the gallery over the brown line's path (landmark 'galeria-antorchas') was
  // read as sunshades and a palapa
  { kind: 'ignoreRoofs', at: [24, -296], radius: 14 },

  // Caleta para Snorkel: a clear channel down to the sea (official map and
  // satellite imagery); the pipeline only kept a short, narrow stretch of it
  {
    kind: 'water',
    at: [0, 0],
    polygons: [
      [
        [113, 140],
        [110.7, 154.7],
        [116.2, 163],
        [124, 172],
        [130.3, 180],
        [132, 190],
        [133, 200],
        [134, 207],
        [152, 207],
        [151, 188.5],
        [149.4, 180],
        [143, 171],
        [137.5, 163],
        [134.5, 150.4],
        [136, 140],
      ],
    ],
  },

  // puma and jaguar islands: the illustration paints the animals (not roofs);
  // visitors' photos show lawn with fan palms and a few trees (the moat around
  // them is cut out of the ground by the landmark 'felinos')
  { kind: 'clearTrees', at: [-45, 152], radius: 6 },
  { kind: 'clearTrees', at: [-80, 207], radius: 6 },
  { kind: 'ignoreRoofs', at: [-46, 160], radius: 24 },
  { kind: 'ignoreRoofs', at: [-79, 206], radius: 20 },
  {
    kind: 'plant',
    cover: 'lawn',
    at: [0, 0], // absolute: the moat's visitors' rim
    polygons: [
      [
        [-96.7, 235.5],
        [-99.9, 220.9],
        [-98.7, 202.4],
        [-92.1, 190.3],
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
    ],
  },

  // block with roof panels north of the aquarium (landmark 'acuario')
  { kind: 'clearTrees', at: [152.75, 30], radius: 7 },

  // dolphin pools: walkways are modelled by hand (landmark 'andadores-delphinus')
  { kind: 'removeOsmPiers', bbox: [50, 265, 140, 345] },
  // palm/sand shapes on the breakwater misread as roofs
  { kind: 'clearTrees', at: [174.8, 273.2], radius: 5 },
  { kind: 'clearTrees', at: [176.3, 288.3], radius: 5 },
];
