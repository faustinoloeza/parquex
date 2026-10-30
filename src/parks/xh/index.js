import { definePark } from '../define.js';
import landmarks from './landmarks.js';
import edits from './edits.js';
import vehicles from './vehicles.js';
import activities from './activities.js';
import services from './services.js';

// Xel-Há: sources, a first landmark and corrections; more landmarks still to model.
export default definePark({
  key: 'xh',
  name: 'Xel-Há',
  labelKey: 'lbl_map_prefix_xh',
  landmarks,
  edits,
  vehicles,
  activities,
  services,
  sources: {
    code: 'xh',
    // center (origin of the local frame) and corner bounds of the official map
    mapFrame: {
      latitude: 20.31939,
      longitude: -87.3578,
      bound1Lat: 20.32212,
      bound1Long: -87.35395,
      bound2Lat: 20.31409,
      bound2Long: -87.36194,
    },
    illustration: {
      nodeScale: 55,
      nodeTranslation: [2.6017372608184814, 0, 4.543321132659912],
      sceneScale: 25.5,
      scenePosition: [-60, -78, -120],
      // the Xel-Há logo painted over the jungle
      masks: [[0.485, 0.13, 0.66, 0.222]],
    },
    // the lagoon is painted in a greener teal than Xcaret's water
    waterHueMin: 160,
    osmBBox: [-87.37, 20.31, -87.348, 20.327],
    // no activity is the entrance: the arrival plaza between the ticket offices
    // and the entrance palapa (start of simulated walks, shared/navigation.js)
    entrance: { x: 140, z: -14 },
  },
});
