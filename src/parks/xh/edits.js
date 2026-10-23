// Manual corrections for Xel-Há on top of what the pipeline derives from the
// illustration, OpenStreetMap and satellite imagery (edit kinds documented in
// src/parks/xc/edits.js). Applied in order (later edits win where they overlap).
//
// The pipeline already drops shapes painted in roof colors next to the water
// (rocks, decks) and under the canopy (tree trunks); these are the leftovers,
// checked one by one against the illustration and satellite imagery.
export default [
  // ----------------------------------------------------- Faro (lighthouse)
  // the illustration paints the tower (blue bands read as water) and its pool
  // west of where the satellite shows them: jungle there, then the tower
  // plaza, the stone terrace and a short path to the lagoon walkway
  { kind: 'flatten', landmark: 'faro', size: 60 },
  // keep jungle crowns off the lighthouse and its pool so they stay visible
  { kind: 'clearTrees', at: [227.7, 352], radius: 17 },
  { kind: 'clearTrees', at: [231.8, 309], radius: 15 },
  {
    kind: 'plant',
    at: [228, 340],
    polygons: [
      [
        [-20, -22],
        [-6, -32],
        [8, -22],
        [22, -14],
        [22, 12],
        [10, 34],
        [-18, 34],
        [-23, 5],
      ],
    ],
  },
  {
    kind: 'pave',
    landmark: 'faro',
    polygons: [
      // tower plaza (octagon r ≈ 9.5 around the tower)
      [
        [7.2, 21],
        [4.4, 27.7],
        [-2.3, 30.5],
        [-9, 27.7],
        [-11.8, 21],
        [-9, 14.3],
        [-2.3, 11.5],
        [4.4, 14.3],
      ],
      // terrace and path west to the lagoon walkway
      [
        [-21, -4],
        [-10, -4],
        [-10, 16],
        [-21, 16],
        [-21, 10],
        [-32, 10],
        [-32, 6],
        [-21, 6],
      ],
    ],
  },

  // heart-shaped sascab clearing at the end of the kite path (activity 11,
  // "Vuela tu papalote"): ≈ 21 × 25 m, lobes towards the sea, as on satellite,
  // in the low coastal scrub (the illustration paints the whole cape as sand)
  {
    kind: 'plant',
    cover: 'lawn',
    at: [343, 481.4],
    polygons: [
      [
        [23.3, 0.0],
        [22.9, 4.8],
        [17.2, 7.5],
        [14.6, 10.6],
        [12.7, 14.5],
        [7.8, 14.7],
        [3.7, 14.7],
        [0.0, 15.4],
        [-3.5, 14.0],
        [-8.3, 15.7],
        [-15.6, 17.8],
        [-19.0, 13.7],
        [-18.5, 8.1],
        [-18.1, 3.7],
        [-15.2, 0.0],
        [-14.6, -3.0],
        [-17.5, -7.7],
        [-15.5, -11.2],
        [-11.3, -12.9],
        [-8.9, -16.8],
        [-4.9, -19.4],
        [-0.0, -19.6],
        [5.0, -20.1],
        [8.4, -15.9],
        [8.4, -9.6],
        [11.1, -8.1],
        [16.2, -7.1],
        [19.5, -4.0],
      ],
    ],
  },
  {
    kind: 'pave',
    at: [343, 481.4],
    polygons: [
      [
        [0.0, -4.2],
        [0.1, -5.1],
        [0.8, -7.1],
        [2.5, -9.2],
        [5.0, -10.1],
        [7.6, -9.3],
        [9.6, -6.8],
        [10.4, -3.4],
        [9.6, 0.2],
        [7.6, 3.6],
        [5.0, 6.7],
        [2.5, 9.6],
        [0.8, 12.0],
        [0.1, 13.8],
        [0.0, 14.4],
        [-0.1, 13.8],
        [-0.8, 12.0],
        [-2.5, 9.6],
        [-5.0, 6.7],
        [-7.6, 3.6],
        [-9.6, 0.2],
        [-10.4, -3.4],
        [-9.6, -6.8],
        [-7.6, -9.3],
        [-5.0, -10.1],
        [-2.5, -9.2],
        [-0.8, -7.1],
        [-0.1, -5.1],
      ],
    ],
  },

  // ---------------------------------------------------- not roofs (illustration)
  // entrance roofs painted as one cluster (modelled as landmark 'entrada-palapa')
  { kind: 'ignoreRoofs', at: [167.7, -16.4], radius: 6 },
  // red and yellow cars in the parking lot
  { kind: 'ignoreRoofs', at: [64, -117], radius: 6 },
  { kind: 'ignoreRoofs', at: [118, -88], radius: 6 },
  { kind: 'ignoreRoofs', at: [76, -72], radius: 4 },
  // planters with palms between the parking rows
  { kind: 'ignoreRoofs', at: [-86, -183], radius: 8 },
  { kind: 'ignoreRoofs', at: [-67, -173], radius: 6 },
  // tan cornices along the walls of the entrance buildings
  { kind: 'ignoreRoofs', at: [166, -54], radius: 4 },
  { kind: 'ignoreRoofs', at: [141, -42], radius: 6 },
  { kind: 'ignoreRoofs', at: [119, -32], radius: 4 },
  { kind: 'ignoreRoofs', at: [133, -22], radius: 4 },
  // planks of the hanging bridges between the jungle huts (the huts are kept)
  { kind: 'ignoreRoofs', at: [-3, 52], radius: 4 },
  { kind: 'ignoreRoofs', at: [15, 53], radius: 4 },
  { kind: 'ignoreRoofs', at: [14, 67], radius: 4 },
  // rocks and benches by the paths
  { kind: 'ignoreRoofs', at: [-8, 88], radius: 4 },
  { kind: 'ignoreRoofs', at: [215, 88], radius: 3 },
  { kind: 'ignoreRoofs', at: [-4, 103], radius: 3 },
  { kind: 'ignoreRoofs', at: [178, 291], radius: 4 },
  { kind: 'ignoreRoofs', at: [197, 347], radius: 4 },
  { kind: 'ignoreRoofs', at: [-228, 549], radius: 4 },
  // tree trunk by the parking lot, red macaw on a path, planter in the jungle
  { kind: 'ignoreRoofs', at: [-220, -296], radius: 3 },
  { kind: 'ignoreRoofs', at: [236, 163], radius: 7 },
  { kind: 'ignoreRoofs', at: [206, 369], radius: 3 },
  { kind: 'ignoreRoofs', at: [-277, 593], radius: 7 },
  // deck of the dolphin pool (its outline was read as a long roof over the water)
  { kind: 'ignoreRoofs', at: [177, 100], radius: 8 },
  // rocks on the lagoon shores
  { kind: 'ignoreRoofs', at: [-159, 220], radius: 4 },
  { kind: 'ignoreRoofs', at: [223, 442], radius: 4 },
  { kind: 'ignoreRoofs', at: [31, 460], radius: 4 },
  { kind: 'ignoreRoofs', at: [290, 480], radius: 4 },
  // wooden bridge in the mangrove
  { kind: 'ignoreRoofs', at: [-385, 588], radius: 6 },
  // wooden dock on the lagoon shore
  { kind: 'ignoreRoofs', at: [158, 306], radius: 8 },
  // kayak on the beach and the roof ornament of the white lookout
  { kind: 'ignoreRoofs', at: [347, 494], radius: 4 },
  { kind: 'ignoreRoofs', at: [317, 466], radius: 3 },
  // limestone rocks of the southern coast
  { kind: 'ignoreRoofs', at: [243, 610], radius: 4 },
  { kind: 'ignoreRoofs', at: [255, 648], radius: 4 },
  { kind: 'ignoreRoofs', at: [261, 662], radius: 4 },
  { kind: 'ignoreRoofs', at: [270, 669], radius: 4 },
  { kind: 'ignoreRoofs', at: [289, 685], radius: 4 },

  // -------------------------------------------- real roofs next to the water
  // zip-line platforms on the lagoon (thatched, on stilts)
  { kind: 'keepRoofs', at: [-221, 186], radius: 5 },
  { kind: 'keepRoofs', at: [-221, 233], radius: 5 },
  // palapa on the lawn by the southern lagoon
  { kind: 'keepRoofs', at: [142, 507], radius: 5 },
];
