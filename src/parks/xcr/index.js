import { definePark } from '../define.js';

// Zona Xcaret: not a park but the land around Xcaret, Xplor and Xenses (and the
// Hotel Xcaret resort grounds), built like a satellite-mode park so the three
// parks read as one continuous territory instead of separate patches on the
// real map. `region: true`: never selectable (header, URL, mobile export); the
// app only draws it as the lowest-priority neighbor of the parks it touches
// (layers/neighbors.js, docs/arquitectura.md → Parques vecinos).
export default definePark({
  key: 'xcr',
  name: 'Zona Xcaret',
  region: true,
  sources: {
    mode: 'satellite',
    code: 'xcr',
    // middle of the outline's bounding box (Xcaret's frame: x -95, z -636)
    center: { lat: 20.586313, lng: -87.120862 },
    // build square: the outline (≈ 3370 × 2810 m) plus its margin and fade
    // band; ≈ 1.7 m/px on the 2048² grid
    extent: { size: 3500 },
    // The square of land between the roads around the three parks, traced on
    // OSM (local meters, clockwise from the north): the MEX 307 highway on the
    // north-west, the Hotel Xcaret access road on the north-east down to the
    // coast, ~250–300 m of sea along the coast, and on the south-west the
    // Solidaridad municipal boundary (Calica) and the road from the highway
    // junction at the west corner. The road edges run ~50 m beyond the road
    // center lines, so each road stays short of the blend band towards the real
    // map (shared/design-area.js FADE) and reads as stylized paving.
    outline: [
      [135, -1424], // highway × Hotel Xcaret road (north)
      [1440, -207], // Hotel Xcaret road at the coast (east)
      [1667, -5], // out at sea
      [639, 905],
      [54, 1384], // out at sea, off the south-west end of Xcaret
      [-31, 1267],
      [-349, 1024], // municipal boundary
      [-513, 1084],
      [-1226, 316], // along the Calica road
      [-1698, 69], // highway × Calica road (west)
    ],
    osmBBox: [-87.138, 20.5702, -87.1038, 20.6025],
    // the open sea is the south-east corner of the build square
    seaCorner: [0.99, 0.99],
    // Esri Wayback capture of 2024-06-27 (cloud free, the one Xplor uses)
    satelliteRelease: 39767,
    // Xcaret's illustration reads lighter than the satellite jungle (lawns
    // between its jungle): near Xcaret the region's jungle is lifted towards the
    // lawn green; along Xplor and Xenses (same satellite jungle) it is left as is
    // (pipeline/stages/textures.js → groundGrade)
    groundGrade: { toward: 'xc', lawn: 0.45, reach: 700, keep: ['xp', 'xs'], keepReach: 250 },
    name: 'Zona Xcaret',
  },
});
