// Manual corrections for Xenses on top of what the pipeline reads from the
// satellite image and OpenStreetMap (edit kinds documented in
// src/parks/xc/edits.js). Applied in order (later edits win where they overlap).
// Coordinates are absolute local meters (`at: [0, 0]`), traced on the satellite
// with `pnpm data:compare xs @x:z:r`.

/** Strip `width` m wide along a polyline, as a polygon (left side out, right side back). */
function ribbon(pts, width) {
  const left = [],
    right = [];
  for (let i = 0; i < pts.length; i++) {
    const [ax, az] = pts[Math.max(0, i - 1)],
      [bx, bz] = pts[Math.min(pts.length - 1, i + 1)];
    const len = Math.hypot(bx - ax, bz - az) || 1;
    const nx = (-(bz - az) / len) * (width / 2),
      nz = ((bx - ax) / len) * (width / 2);
    left.push([pts[i][0] + nx, pts[i][1] + nz]);
    right.push([pts[i][0] - nx, pts[i][1] - nz]);
  }
  return [...left, ...right.reverse()];
}

export default [
  // ------------------------------------------------ hidden trails (north-west)
  // Serpentine sascab trails of the far north-west, faint under the canopy and
  // missing in OSM: a long switchback from the buildings at (-195, -275) west
  // to a hairpin at x ≈ -288, then back east and around a lower loop. Packed
  // earth (`surface: 'dirt'`), not stone paving.
  {
    kind: 'pave',
    surface: 'dirt',
    at: [0, 0],
    polygons: [
      ribbon(
        [
          [-200, -281],
          [-219, -283],
          [-238, -278],
          [-257, -277],
          [-278, -278],
          [-287, -283],
          [-289, -292],
          [-286, -303],
        ],
        3,
      ),
      ribbon(
        [
          [-287, -283],
          [-281, -268],
          [-272, -256],
        ],
        3,
      ),
      ribbon(
        [
          [-230, -260],
          [-249, -258],
          [-267, -254],
          [-275, -249],
          [-279, -240],
          [-282, -229],
          [-280, -219],
          [-274, -211],
          [-262, -214],
          [-246, -216],
          [-235, -209],
        ],
        3,
      ),
    ],
  },
  // ------------------------------------------------- Lodorama and Riolajante
  // dark winding channel (mud) around a wooded island north of the slide tower:
  // a closed loop ≈ 45 × 45 m, ≈ 6 m wide
  {
    kind: 'water',
    cover: 'river',
    at: [0, 0],
    width: 6,
    lines: [
      [
        [-115, -262],
        [-100, -270],
        [-86, -263],
        [-79, -250],
        [-82, -236],
        [-95, -228],
        [-109, -236],
        [-118, -249],
        [-115, -262],
      ],
    ],
  },
];
