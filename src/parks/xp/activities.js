// Activities of Xplor (the official backend has none for this park), from
// xcaret.com / xplor.travel (activities, buffet, Foto Pase) and the services of
// the printed park map (rivieramaya.mx: shops La Triquecueva and Hasta la
// Vista, soda fountains El Manantial and El Oasis, lockers, restrooms).
// Placed by hand over the satellite reference (`pnpm data:compare xp x:z:r`)
// with the printed map as a layout guide. Shape: see
// pipeline/lib/local-activities.js.
//
// Confidence: Toboganxote, El Troglodita, the Hamacuatizaje cenote and the
// parking are visible on the satellite; zip lines and rafts / river swim start
// points follow towers and cave openings that match the printed map; the
// soda fountains, shops, lockers and the entrance are approximate (low).
const ATT = { es: 'Atracciones', en: 'Attractions' };
const FOOD = { es: 'Restaurantes', en: 'Restaurants' };
const SERV = { es: 'Servicios', en: 'Services' };

/** @type {import('../../../pipeline/lib/local-activities.js').LocalActivity[]} */
export default [
  { number: 1, name: { es: 'Tirolesas', en: 'Zip-lines' }, category: ATT, extraCost: false, x: 128, z: 21 },
  { number: 2, name: { es: 'Vehículos anfibios', en: 'Amphibious vehicles' }, category: ATT, extraCost: false, x: 40, z: -30 },
  { number: 3, name: { es: 'Toboganxote', en: 'Toboganxote' }, category: ATT, extraCost: false, x: -20, z: 72 },
  { number: 4, name: { es: 'Hamacuatizaje', en: 'Hammock splash' }, category: ATT, extraCost: false, x: 238, z: -36 },
  // low confidence: the rafts circuit starts at a round stairwell south of the plaza
  { number: 5, name: { es: 'Balsas', en: 'Rafts' }, category: ATT, extraCost: false, x: 150, z: 232 },
  // low confidence: cave openings south-west of the Toboganxote
  { number: 6, name: { es: 'Nado en río de estalactitas', en: 'Stalactite river swim' }, category: ATT, extraCost: false, x: -82, z: 222 },
  // low confidence: far west, by the spiral tower
  { number: 7, name: { es: 'Expedición subterránea', en: 'Underground expedition' }, category: ATT, extraCost: false, x: -440, z: 215 },
  { number: 8, name: { es: 'Restaurante El Troglodita', en: 'El Troglodita Restaurant' }, category: FOOD, extraCost: false, x: 244, z: 21 },
  // low confidence
  {
    number: 9,
    name: { es: 'Fuente de sodas El Manantial', en: 'El Manantial soda fountain' },
    category: FOOD,
    extraCost: false,
    x: 108,
    z: 58,
  },
  // low confidence
  { number: 10, name: { es: 'Fuente de sodas El Oasis', en: 'El Oasis soda fountain' }, category: FOOD, extraCost: false, x: -195, z: 105 },
  // low confidence (under trees by the bus drop-off)
  { number: 11, name: { es: 'Entrada', en: 'Entrance' }, category: SERV, extraCost: false, x: 12, z: -150 },
  { number: 12, name: { es: 'Estacionamiento', en: 'Parking' }, category: SERV, extraCost: false, x: -45, z: -135 },
  { number: 13, name: { es: 'Casilleros', en: 'Lockers' }, category: SERV, extraCost: false, x: 162, z: 40 },
  { number: 14, name: { es: 'Tienda La Triquecueva', en: 'La Triquecueva shop' }, category: SERV, extraCost: false, x: 150, z: 56 },
  { number: 15, name: { es: 'Tienda Hasta la Vista', en: 'Hasta la Vista shop' }, category: SERV, extraCost: false, x: 20, z: -128 },
  { number: 16, name: { es: 'Foto Pase', en: 'Photo Pass' }, category: SERV, extraCost: true, x: 176, z: 24 },
  { number: 17, name: { es: 'Sanitarios', en: 'Restrooms' }, category: SERV, extraCost: false, x: 178, z: 48 },
];
