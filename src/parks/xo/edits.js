// Manual corrections for Xoximilco (kinds documented in src/parks/xc/edits.js).
//
// The canals and ponds come from the satellite (`sources.greenWater`, see
// pipeline/stages/classify-satellite.js); the crowns that overhang the narrow
// canals split them into pieces, so the main canals of the trajinera network are
// traced here as `water` lines over their center (measured on the satellite with
// `pnpm data:compare xo -- x:z:r`). Widths are the open water seen between the
// crowns. The pebbly, shallow channels (white stones under the water) are traced
// narrower.
const canal = (width, lines) => ({ kind: 'water', at: [0, 0], width, lines });
/** Disc of water (radius r) around a landmark, as a 24-gon. */
const lake = (landmark, r) => ({
  kind: 'water',
  landmark,
  polygons: [Array.from({ length: 24 }, (_, i) => [r * Math.cos((i * Math.PI) / 12), r * Math.sin((i * Math.PI) / 12)])],
});

export default [
  // ------------------------------------------------------------------ west
  // outer west canal: from the horseshoe at the north-west corner down to the
  // south trail
  canal(12, [
    [
      [-326, -245],
      [-334, -262],
      [-350, -270],
      [-375, -271],
      [-392, -266],
      [-398, -255],
      [-405, -230],
      [-406, -180],
      [-404, -120],
      [-400, -70],
      [-390, -40],
      [-370, 0],
      [-356, 40],
      [-353, 90],
      [-351, 140],
      [-352, 175],
    ],
  ]),
  // wide middle canal, east arm of the horseshoe, and its link to the long pond
  canal(15, [
    [
      [-326, -245],
      [-324, -200],
      [-324, -150],
      [-326, -100],
      [-327, -60],
      [-318, -20],
      [-312, 10],
      [-295, 18],
      [-275, 20],
    ],
  ]),
  // pebbly shallow channels inside the horseshoe and south of the middle canal
  canal(6, [
    [
      [-342, -234],
      [-368, -233],
      [-379, -216],
      [-378, -180],
      [-374, -140],
      [-367, -100],
      [-356, -72],
      [-340, -52],
    ],
    [
      [-312, 15],
      [-318, 60],
      [-316, 110],
      [-314, 150],
      [-318, 185],
    ],
  ]),
  // long pond west of the chinampa fingers and the pond north of them
  canal(20, [
    [
      [-252, -38],
      [-255, 0],
      [-256, 60],
      [-256, 120],
      [-252, 145],
    ],
    [
      [-235, -42],
      [-200, -42],
      [-160, -35],
    ],
  ]),
  // north-west: from the horseshoe up to the long north canal
  canal(14, [
    [
      [-336, -266],
      [-324, -288],
      [-305, -305],
      [-288, -323],
      [-265, -340],
      [-240, -355],
    ],
  ]),

  // ----------------------------------------------------------------- north
  // long north canal along the whole park, into the embarcadero lake
  canal(18, [
    [
      [-240, -355],
      [-200, -361],
      [-150, -362],
      [-100, -360],
      [-70, -362],
      [-40, -365],
      [0, -366],
      [40, -363],
      [100, -360],
      [160, -358],
      [220, -355],
      [260, -350],
      [290, -335],
    ],
  ]),
  // canal from the north-west of the north canal down past the off-road
  // track's grandstand to the central ponds, and the pond east of it
  canal(12, [
    [
      [-92, -338],
      [-78, -318],
      [-60, -300],
      [-45, -285],
      [-28, -262],
      [-20, -240],
      [-22, -215],
      [-24, -180],
      [-22, -145],
    ],
    [
      [35, -310],
      [15, -290],
      [3, -270],
      [-12, -250],
    ],
  ]),
  // the embarcadero palapa and the round building stand in the lake (their
  // roofs read as dry ground on the satellite), and so do the boat docks
  lake('embarcadero', 34),
  lake('casona', 23),
  {
    kind: 'water',
    at: [0, 0],
    polygons: [
      [
        [222, -237],
        [243, -231],
        [244, -204],
        [222, -185],
        [207, -185],
        [207, -212],
      ],
      [
        [259, -334],
        [281, -334],
        [281, -300],
        [259, -300],
      ],
    ],
  },
  // embarcadero lake → canal south past the docks
  canal(14, [
    [
      [255, -212],
      [248, -180],
      [245, -145],
    ],
  ]),

  // ------------------------------------------------- chinampa fingers (south)
  canal(8, [
    // west finger canal, then east along the south trail to the big pond
    [
      [-147, -25],
      [-147, 20],
      [-150, 80],
      [-150, 140],
      [-145, 165],
      [-120, 175],
      [-95, 185],
      [-70, 195],
      [-40, 205],
    ],
    // arch over the north end of the second finger
    [
      [-147, -22],
      [-129, -12],
      [-118, -24],
      [-98, -27],
      [-80, -20],
      [-72, -2],
    ],
    // canals between the fingers
    [
      [-136, -15],
      [-130, 20],
      [-129, 60],
      [-123, 100],
      [-115, 130],
      [-100, 160],
    ],
    [
      [-95, 35],
      [-93, 70],
      [-92, 100],
      [-88, 130],
      [-80, 160],
    ],
  ]),
  // pebbly channel down the middle finger
  canal(6, [
    [
      [-72, -2],
      [-68, 40],
      [-66, 90],
      [-64, 140],
      [-60, 180],
      [-50, 200],
    ],
  ]),
];
