// Services of Xplor: the lockers and restrooms of the printed park map, which
// activities.js already lists as numbered points (same places, low confidence).
// The printed map shows no first aid, wheelchair or steep-ramp points.
// Types: src/ui/icons.js → SERVICE_TYPES.
import activities from './activities.js';

/** Position of the activity with that number. */
const at = (number) => {
  const { x, z } = activities.find((a) => a.number === number);
  return { x, z };
};

export default [
  { type: 'locker', ...at(13), note: 'Casilleros (punto 13 del mapa)' },
  { type: 'wc', ...at(17), note: 'Sanitarios (punto 17 del mapa)' },
];
