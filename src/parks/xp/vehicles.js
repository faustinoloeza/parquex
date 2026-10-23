// Parked tour buses (rows of side-by-side buses, see shared/vehicles.js):
// from/to are the centers of the first and last bus, heading the bus long axis
// (deg, 0 = east, 90 = south).
export default [
  // two pink Xcaret buses at the drop-off by the highway access (seen on Esri
  // Wayback 2026-06-30)
  { from: [5, -166.5], to: [3.6, -163.4], count: 2, heading: 25, colors: ['#e8608f'] },
  // waiting row on the open ground north of it (empty on the 2024 reference;
  // inferred from the official map, which draws buses at the entrance)
  { from: [24, -206], to: [30, -182], count: 5, heading: 16, colors: ['#e8608f', '#3b6fd8', '#e8608f', '#f1f1f1', '#e8608f'] },
];
