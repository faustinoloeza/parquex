// Parked buses seen on the satellite image (format of src/parks/xc/vehicles.js:
// from/to are the centers of the first and last bus; heading is the bus long
// axis in degrees, 0 = east, 90 = south; colors cycle along the row). Cars in
// the visitor lot are the `parkedCars` landmark (landmarks.js).
const PINK = '#e8608f';

export default [
  // two pink Xcaret buses nose to tail on the service road north of the Rehilete
  { from: [106.4, -35.5], to: [107.6, -22], count: 2, heading: 85, colors: [PINK] },
];
