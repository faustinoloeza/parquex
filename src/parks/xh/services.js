// Services of Xel-Há (restrooms, lockers, first aid, stroller and wheelchair
// rental) from the official interactive map at rivieramaya.mx/mapa-de-xel-ha/
// (October 2026; its service modules list what each one offers). Types:
// src/ui/icons.js → SERVICE_TYPES.
//
// That map is schematic (turned ≈ 180°, the lagoon drawn larger), so:
//   sure     the service modules, the ticket offices and two restrooms are
//            OpenStreetMap features (Módulo Azul / Café / Rojo / Amarillo)
//   low (~)  the rest: the map's position through a local fit on nearby
//            OSM modules and official activities (≈ 30 m median error, up to
//            ≈ 100 m around the entrance)
// Left out: the restrooms at the Xtours bus parking, ≈ 450 m north of the park.
export default [
  { type: 'wc', x: 91, z: -36, note: 'En la Entrada' },
  { type: 'wc', x: 156.3, z: -101.4, note: 'Cerca de la Entrada' }, // ~
  { type: 'wc', x: 38.9, z: -128.1, note: 'Estacionamiento principal' }, // ~ OSM restroom between the ticket offices and the parking
  { type: 'wc', x: 224.4, z: 106.4, note: 'En el Módulo Azul' },
  { type: 'wc', x: 178.2, z: 185.2, note: 'En el Módulo Café' },
  { type: 'wc', x: 91.2, z: 194.5, note: 'En el Módulo Rojo' },
  { type: 'wc', x: 75.1, z: 136.3, note: 'En el Módulo Amarillo' },
  { type: 'wc', x: 120, z: 60.1, note: 'Cerca del Módulo Amarillo' }, // ~
  { type: 'wc', x: -209, z: 523.9, note: 'Cerca del Zip Bike' }, // ~
  { type: 'wc', x: -474.7, z: 570.9, note: 'En el Módulo Verde (inicio del río)' }, // ~
  { type: 'first-aid', x: 103.1, z: 178.6, note: 'Junto al Módulo Rojo' }, // ~
  { type: 'locker', x: 210.2, z: 109.8, note: 'En el Módulo Azul' },
  { type: 'locker', x: 178.2, z: 185.2, note: 'En el Módulo Café' },
  { type: 'locker', x: 188.3, z: 302.2, note: 'En el Módulo Morado' }, // ~
  { type: 'locker', x: 91.2, z: 194.5, note: 'En el Módulo Rojo' },
  { type: 'locker', x: 70.9, z: 124.8, note: 'En el Módulo Amarillo' },
  { type: 'wheelchair', x: 71.6, z: -13.1, note: 'Renta de carriolas y sillas de ruedas, junto a la Entrada' }, // ~
  { type: 'wheelchair', x: 118.7, z: 81.8, note: 'Renta de carriolas, cerca del Módulo Amarillo' }, // ~
];
