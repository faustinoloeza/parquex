import { definePark } from '../define.js';
import activities from './activities.js';
import landmarks from './landmarks.js';
import edits from './edits.js';
import vehicles from './vehicles.js';

// Xoximilco: no official illustration or map config — built from satellite
// imagery + OpenStreetMap (sources.mode 'satellite', see docs/agregar-parque.md).
export default definePark({
  key: 'xo',
  name: 'Xoximilco',
  labelKey: 'lbl_map_prefix_xo',
  activities,
  landmarks,
  edits,
  vehicles,
  sources: {
    mode: 'satellite',
    code: 'xo',
    // center of the OSM park outline (relation 18179096)
    center: { lat: 20.994385, lng: -86.86255 },
    // build square: the park outline (≈ 985 × 770 m) plus ~150 m around it
    extent: { size: 1300 },
    // OSM outline of the park (relation 18179096, the purple frame of the real
    // map); it also takes in Xavage's rafting lake (north-east) and the jungle
    // south of the canals, so the 3D park fills the whole frame
    osmPark: 'relation/18179096',
    outline: [
      [-492.4, -386.4],
      [492.8, -372.6],
      [379, 386.7],
      [-448.1, 236.1],
      [-486.6, -300.9],
    ],
    // straight sides: the designed area follows them without rounding the corners
    straightOutline: true,
    // the canals and ponds are a murky green that reads as canopy otherwise
    greenWater: true,
    // murky dark green canals (sampled on the satellite: ≈ #456538 – #5f7b47
    // in the canals, lighter in the big shallow pond)
    waterTint: { shallow: '#5d7f48', deep: '#3d5f3a' },
    osmBBox: [-86.8705, 20.988, -86.854, 21.001],
    // core_udn of the development backend
    name: 'Xoximilco',
    hours: { open: '07:00', close: '23:00' },
  },
});
