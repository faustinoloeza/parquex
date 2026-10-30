import { definePark } from '../define.js';
import activities from './activities.js';
import services from './services.js';
import landmarks from './landmarks.js';
import edits from './edits.js';
import vehicles from './vehicles.js';

// Xplor: no official illustration or map config — built from satellite
// imagery + OpenStreetMap (sources.mode 'satellite', see docs/agregar-parque.md).
export default definePark({
  key: 'xp',
  name: 'Xplor',
  labelKey: 'lbl_map_prefix_xp',
  activities,
  services,
  landmarks,
  edits,
  vehicles,
  sources: {
    mode: 'satellite',
    code: 'xp',
    // center of the OSM park outline (way 550358722)
    center: { lat: 20.5928, lng: -87.124285 },
    // build square: the park outline (≈ 1220 × 1040 m) plus ~140 m around it
    extent: { size: 1500 },
    osmPark: 'way/550358722',
    // the OSM outline, corrected (local meters): its south-western corner takes
    // in the houses south of the lower road (now the boundary) and its
    // south-eastern side stops short of the trails, towers and buildings of the
    // park (≈ 30–150 m beyond it)
    outline: [
      [-253, 5],
      [40, -232],
      [398, -521],
      [610, -245],
      [640, -160],
      [620, -70],
      [540, 10],
      [420, 90],
      [330, 120],
      [230, 200],
      [150, 290],
      [150, 400],
      [40, 450],
      [-71, 442],
      [-249, 342],
      [-610, 268],
      [-289, 21],
    ],
    osmBBox: [-87.1335, 20.585, -87.115, 20.6005],
    // Esri Wayback capture of 2024-06-27: the live World Imagery has a cloud
    // over the entrance and the northern half of the park
    satelliteRelease: 39767,
    // core_udn of the development backend
    name: 'Xplor',
    hours: { open: '09:00', close: '17:00' },
  },
});
