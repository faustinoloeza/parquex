// Parked tour buses seen on satellite imagery (rows of side-by-side buses).
// from/to: centers of the first and last bus; heading: bus long axis (deg,
// 0 = east, 90 = south); colors cycle along the row.
// The park's own shuttles at their bays are modelled by hand (landmark
// 'terminal-autobuses'). Removed at the user's request (2026-10-22): the lone
// bus of the arrival lot (it stood on the planted strip) and the north lot by
// the service warehouse (too far from the visitors' areas).
export default [
  // west lot
  { from: [-367.5, -22], to: [-364, -22], count: 2, heading: 92, colors: ['#f2c33a', '#e8608f'] },
  { from: [-356, -17], to: [-343, -13], count: 4, heading: 92, colors: ['#e8608f', '#f2c33a', '#f2c33a', '#e8608f'] },
  { from: [-335, -32.6], to: [-331, -24.6], count: 3, heading: -12, colors: ['#f1f1f1', '#e8608f', '#e8608f'] },
  { from: [-320, -47.4], to: [-312, -38.6], count: 3, heading: -12, colors: ['#d9475e', '#e8608f', '#f1f1f1'] },
  { from: [-306.5, -33.6], to: [-300.5, -24.6], count: 4, heading: -12, colors: ['#e8608f', '#f2c33a', '#f2c33a', '#e8608f'] },
  { from: [-291, -48], to: [-276, -30], count: 5, heading: -55, colors: ['#e8608f', '#d9475e', '#f2c33a', '#e8608f', '#3b6fd8'] },
  { from: [-256, -30.6], to: [-256, -30.6], count: 1, heading: -30, colors: ['#d9475e'] },
];
