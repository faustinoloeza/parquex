// Parked tour buses (rows of side-by-side buses, see shared/vehicles.js).
// from/to: centers of the first and last bus; heading: bus long axis (deg,
// 0 = east, 90 = south); colors cycle along the row.
export default [
  // main lot by the highway: two buses seen side by side on the satellite
  { from: [407.5, -46.5], to: [407.5, -41.5], count: 2, heading: -2, colors: ['#3b6fd8', '#e8608f'] },
  // and a row along its empty east side (illustrative: the evening tours
  // arrive by bus; the daytime satellite shows the lot almost empty)
  { from: [426, -68], to: [426, -58], count: 3, heading: -2, colors: ['#f1f1f1', '#e8608f', '#f2c33a'] },
  // white shuttle in the gravel lot south of the big pond
  { from: [203, 124], to: [203, 124], count: 1, heading: 90, colors: ['#f1f1f1'] },
];
