// Services of Xenses: the restrooms and lockers of the printed park map, which
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
  { type: 'wc', ...at(5), note: 'Junto a la entrada (punto 5 del mapa)' },
  { type: 'wc', ...at(9), note: 'Sanitarios y casilleros (punto 9 del mapa)' },
  { type: 'locker', ...at(9), note: 'Sanitarios y casilleros (punto 9 del mapa)' },
  { type: 'wc', ...at(12), note: 'Ruta del Sentir (punto 12 del mapa)' },
  { type: 'wc', ...at(22), note: 'Ruta del Hacer (punto 22 del mapa)' },
  { type: 'wc', ...at(27), note: 'Ruta del Hacer (punto 27 del mapa)' },
];
