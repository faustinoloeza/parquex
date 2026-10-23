// Parked tour buses seen on satellite imagery along the south-west edge of the
// arrival parking lot: groups of side-by-side buses parked at an angle, nose
// towards the lot (colors and gaps as on the imagery).
// Same format as src/parks/xc/vehicles.js: from/to are the centers of the
// first and last bus; heading is the bus long axis (deg, 0 = east, 90 = south);
// colors cycle along the row. The rows follow the lot as painted on the
// illustration (a few meters off the satellite) so they stand on its paving;
// the last row covers the buses painted on the ground.
const PINK = '#e8608f',
  BLUE = '#7fb7e6',
  YELLOW = '#f2c33a',
  DARK = '#3a3f4a',
  RED = '#d9475e',
  CREAM = '#e9d48a';

export default [
  { from: [-157.5, -244.3], to: [-154.0, -242.3], count: 2, heading: -45, colors: [PINK, BLUE] },
  { from: [-149.3, -239.5], to: [-131.6, -229.2], count: 5, heading: -45, colors: [YELLOW, CREAM, DARK, PINK, PINK] },
  { from: [-125.5, -225.7], to: [-122.1, -223.7], count: 2, heading: -45, colors: [PINK, BLUE] },
  { from: [-115.5, -219.8], to: [-112.1, -217.8], count: 2, heading: -45, colors: [PINK, BLUE] },
  { from: [-105.0, -213.7], to: [-105.0, -213.7], count: 1, heading: -45, colors: [RED] },
  { from: [-97.0, -209.0], to: [-73.7, -195.4], count: 8, heading: -45, colors: [PINK, DARK, DARK, BLUE, DARK, CREAM, DARK, CREAM] },
  { from: [-64.2, -189.9], to: [-60.3, -187.6], count: 2, heading: -45, colors: [DARK, PINK] },
];
