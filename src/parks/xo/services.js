// Services of Xoximilco: the restrooms of the printed park map, which
// activities.js already lists as a numbered point (same place, low confidence).
// The printed map shows no lockers, first aid, wheelchair or steep-ramp points.
// Types: src/ui/icons.js → SERVICE_TYPES.
import activities from './activities.js';

/** Position of the activity with that number. */
const at = (number) => {
  const { x, z } = activities.find((a) => a.number === number);
  return { x, z };
};

export default [{ type: 'wc', ...at(7), note: 'Sanitarios (punto 7 del mapa)' }];
