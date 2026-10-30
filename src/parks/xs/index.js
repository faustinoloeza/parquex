import { definePark } from '../define.js';
import activities from './activities.js';
import services from './services.js';
import landmarks from './landmarks.js';
import edits from './edits.js';
import vehicles from './vehicles.js';

// Xenses: no official illustration or map config — built from satellite
// imagery + OpenStreetMap (sources.mode 'satellite', see docs/agregar-parque.md).
export default definePark({
  key: 'xs',
  name: 'Xenses',
  labelKey: 'lbl_map_prefix_xs',
  activities,
  services,
  landmarks,
  edits,
  vehicles,
  sources: {
    mode: 'satellite',
    code: 'xs',
    // center of the OSM park outline (way 550357202)
    center: { lat: 20.585055, lng: -87.127065 },
    // build square: the park outline (≈ 610 × 710 m) plus ~150 m around it
    extent: { size: 1000 },
    osmPark: 'way/550357202',
    osmBBox: [-87.1335, 20.5785, -87.121, 20.591],
    // core_udn of the development backend
    name: 'Xenses',
    hours: { open: '08:30', close: '17:00' },
  },
});
