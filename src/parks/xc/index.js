import { definePark } from '../define.js';
import sources from './sources.js';
import routes from './routes.js';
import landmarks from './landmarks.js';
import edits from './edits.js';
import vehicles from './vehicles.js';
import fauna from './fauna.js';
import activities from './activities.js';
import services from './services.js';

export default definePark({
  key: 'xc',
  name: 'Xcaret',
  labelKey: 'lbl_map_prefix_xc',
  sources,
  routes,
  landmarks,
  edits,
  vehicles,
  fauna,
  activities,
  services,
});
