// Activities of Xoximilco (the official backend has none for this park), placed by
// hand over the satellite image (`pnpm data:compare xo x:z:r`). Shape: see
// pipeline/lib/local-activities.js — { number, name: { es, en }, category:
// { es, en }, extraCost, x, z } or lat/lng instead of x/z.
//
// Sources: the official site (xoximilco.com, now xoxicancun.com, es/en: trajinera
// ride, mariachi, luchadores dance, kermés wedding, welcome aguas frescas, Mexican
// dinner and open bar on board, gift shop, Foto Pase, parking), rivieramaya.mx/mapa-de-xoximilco/
// (taquilla y recepción → path → embarcadero principal, start and end of the
// ride; printed map for the layout: entrance and parking by the highway, embarcadero
// in the north-east) and thehappening.com (mojigangas parade on arrival, El Pueblo
// stop, El Xangarrito artisan shop, ranchera / marimba / jarana music).
// Numbered in visiting order: arrival, embarcadero, then the ride on the canals.
//
// Placements:
//   sure    entrance arch (OSM access road), parking (buses on the satellite),
//           embarcadero (round palapa with the moored trajineras)
//   medium  ticket office / reception (building south of the parking, seen through
//           the arch in a street photo), trajinera ride (north canal)
//   low (~) everything else: the shows and stops happen along the canals or at the
//           buildings around the embarcadero; placed on the nearest plausible spot
const ATTR = { es: 'Atracciones', en: 'Attractions' };
const FOOD = { es: 'Restaurantes', en: 'Restaurants' };
const SERV = { es: 'Servicios', en: 'Services' };
const SHOP = { es: 'Tiendas', en: 'Shops' };

/** @type {import('../../../pipeline/lib/local-activities.js').LocalActivity[]} */
export default [
  // ---------------------------------------------------------------- arrival
  { number: 1, name: { es: 'Entrada', en: 'Entrance' }, category: SERV, x: 441, z: -80 },
  { number: 2, name: { es: 'Estacionamiento', en: 'Parking' }, category: SERV, x: 416, z: -52 },
  { number: 3, name: { es: 'Taquilla y recepción', en: 'Ticket Office and Reception' }, category: SERV, x: 416, z: 4 },
  { number: 4, name: { es: 'Bienvenida con aguas frescas', en: 'Aguas Frescas Welcome' }, category: FOOD, x: 404, z: -103 }, // ~
  { number: 5, name: { es: 'Desfile de mojigangas', en: 'Giant Puppet Parade' }, category: ATTR, x: 300, z: -196 }, // ~
  { number: 6, name: { es: 'El Xangarrito', en: 'El Xangarrito' }, category: SHOP, extraCost: true, x: 250, z: -230 }, // ~ artisan shop
  { number: 7, name: { es: 'Sanitarios', en: 'Restrooms' }, category: SERV, x: 219, z: -284 }, // ~
  { number: 8, name: { es: 'Foto Pase', en: 'Photo Pass' }, category: SERV, extraCost: true, x: 287, z: -248 }, // ~
  // ------------------------------------------------------------ embarcadero
  { number: 9, name: { es: 'Embarcadero', en: 'Boat Dock' }, category: ATTR, x: 317, z: -280 },
  // ------------------------------------------------------------- the ride
  { number: 10, name: { es: 'Paseo en trajinera', en: 'Trajinera Ride' }, category: ATTR, x: 100, z: -360 },
  {
    number: 11,
    name: { es: 'Cena mexicana y barra libre a bordo', en: 'Mexican Dinner and Open Bar on Board' },
    category: FOOD,
    x: 228,
    z: -214,
  }, // ~ boats loading at the docks
  { number: 12, name: { es: 'Mariachi', en: 'Mariachi' }, category: ATTR, x: -200, z: -361 }, // ~
  { number: 13, name: { es: 'Marimba y son jarocho', en: 'Marimba and Son Jarocho' }, category: ATTR, x: -405, z: -150 }, // ~
  { number: 14, name: { es: 'Baile de los luchadores', en: 'Wrestlers Dance' }, category: ATTR, x: -256, z: 60 }, // ~
  { number: 15, name: { es: 'Boda de kermés', en: 'Kermés Wedding' }, category: ATTR, x: 40, z: 230 }, // ~
  { number: 16, name: { es: 'El Pueblo', en: 'The Village' }, category: ATTR, x: 267, z: -241 }, // ~ round building by the embarcadero
];
