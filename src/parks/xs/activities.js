// Activities of Xenses (the official backend has none for this park), placed by
// hand over the satellite image (`pnpm data:compare xs x:z:r`). Shape: see
// pipeline/lib/local-activities.js — { number, name: { es, en }, category:
// { es, en }, extraCost, x, z } or lat/lng instead of x/z.
//
// Sources: xensespark.com (/es, /es/entrada-parque-xenses/: activities, included
// services, El Xnack with extra cost), the printed park map (rivieramaya.mx/mapa-de-xenses/:
// names ES/EN, icons and the order of both routes) and travel guides (sinpostal.com,
// eluniversal.com.mx). Numbered in walking order: parking and entrance, the Rehilete hub,
// Ruta del Sentir (south), then Ruta del Hacer (north-west).
//
// The printed map is schematic and turned ≈ 90° from north (its "down" is the
// entrance, east of the Rehilete here; "right" is north). Placements:
//   sure    Rehilete (white dome), Xensatorium (OSM hall), Tobogán (OSM "Slip" tower),
//           parking lots (cars on satellite)
//   medium  Latido (orange dome next to the Rehilete), Pueblo (street with a row of
//           red roofs running north-west), Riolajante / Lodorama (dark winding channel loop),
//           entrance / ticket office (plaza towards the drop-off roundabout)
//   low (~)  everything else: placed by the printed map's layout on the nearest path
const ATTR = { es: 'Atracciones', en: 'Attractions' };
const FOOD = { es: 'Restaurantes', en: 'Restaurants' };
const SERV = { es: 'Servicios', en: 'Services' };
const SHOP = { es: 'Tiendas', en: 'Shops' };

const WC = { es: 'Sanitarios', en: 'Restrooms' };
const SHOES = { es: 'Zapatera', en: 'Shoe Nursery' };

/** @type {import('../../../pipeline/lib/local-activities.js').LocalActivity[]} */
export default [
  // ----------------------------------------------------------- arrival and hub
  { number: 1, name: { es: 'Estacionamiento', en: 'Parking' }, category: SERV, x: 178, z: 135 },
  { number: 2, name: { es: 'Ingreso y salida del parque', en: 'Park Access and Exit' }, category: SERV, x: 190, z: 68 }, // ~
  { number: 3, name: { es: 'Taquillas', en: 'Ticket Office' }, category: SERV, x: 166, z: 57 }, // ~
  { number: 4, name: { es: 'Cajero automático', en: 'ATM' }, category: SERV, x: 160, z: 76 }, // ~
  { number: 5, name: WC, category: SERV, x: 149, z: 70 }, // ~
  { number: 6, name: { es: 'Rehilete', en: 'Pinwheel' }, category: ATTR, x: 121, z: 39 },
  { number: 7, name: { es: 'Obsequiario', en: 'Giftery' }, category: SHOP, extraCost: true, x: 131, z: 31 }, // inside the Rehilete
  { number: 8, name: { es: 'El Xnack', en: 'El Xnack' }, category: FOOD, extraCost: true, x: 97, z: 78 }, // ~ shaded tables SW of the dome
  { number: 9, name: { es: 'Sanitarios y casilleros', en: 'Restrooms and Lockers' }, category: SERV, x: 80, z: 42 }, // ~

  // ------------------------------------------- Ruta del Sentir (Path of Feeling)
  { number: 10, name: { es: 'Camino de Enanos y Gigantes', en: 'Dwarfs and Giants' }, category: ATTR, x: 64, z: 112 }, // ~
  { number: 11, name: SHOES, category: SERV, x: 47, z: 172 }, // ~
  { number: 12, name: WC, category: SERV, x: 57, z: 182 }, // ~
  { number: 13, name: { es: 'Xensatorium', en: 'Xensatorium' }, category: ATTR, x: 32, z: 230 },
  // ~ the white lattice of low walls / skylights just south of the Rehilete
  {
    number: 14,
    name: { es: 'Laberinto de Arterias Subterráneas', en: 'Underground Arteries Labyrinth' },
    category: ATTR,
    x: 118,
    z: 70,
  },
  { number: 15, name: { es: 'El Edén', en: 'Eden' }, category: ATTR, x: 50, z: 279 }, // ~
  { number: 16, name: { es: 'Jardín Xítrico', en: 'Citric Garden' }, category: ATTR, x: 26, z: 140 }, // ~

  // --------------------------------------------- Ruta del Hacer (Path of Doing)
  { number: 17, name: { es: 'Latido', en: 'Heartbeat' }, category: ATTR, x: 89, z: 24 },
  { number: 18, name: { es: 'El Pueblo', en: 'Town' }, category: ATTR, x: 36, z: -48 },
  { number: 19, name: { es: 'Canicódromo', en: 'Marblelous' }, category: ATTR, x: -55, z: -128 }, // ~ green-roofed spot by the west path
  { number: 20, name: { es: 'La Re-cámara', en: 'Picture This' }, category: ATTR, x: -90, z: -136 }, // ~
  { number: 21, name: { es: 'El Respiro', en: 'The Breather' }, category: ATTR, x: -48, z: -98 }, // ~ hammocks in the shade
  { number: 22, name: WC, category: SERV, x: -115, z: -118 }, // ~
  { number: 23, name: SHOES, category: SERV, x: -12, z: -150 }, // ~
  { number: 24, name: { es: 'Xauna', en: 'Xauna' }, category: ATTR, x: -38, z: -196 }, // ~
  { number: 25, name: { es: 'Tobogán', en: 'Slip' }, category: ATTR, x: -22, z: -135 },
  { number: 26, name: { es: 'Vuelo de Pájaro', en: 'Bird Flight' }, category: ATTR, x: -62, z: -210 }, // ~ 220 m zip line
  { number: 27, name: WC, category: SERV, x: -122, z: -300 }, // ~
  { number: 28, name: { es: 'Riolajante', en: 'Riverlaxing' }, category: ATTR, x: -108, z: -265 }, // ~ dark channel loop
  { number: 29, name: { es: 'Lodorama', en: 'Sludgerie' }, category: ATTR, x: -82, z: -243 },
  { number: 30, name: { es: 'Lluvia', en: 'Rain' }, category: ATTR, x: -68, z: -226 }, // ~
];
