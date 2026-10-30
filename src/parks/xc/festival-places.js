// Places of Xcaret's Festival de Vida y Muerte (src/themes/muertos): the place
// names of the festival's program (its activities API → placeName) in local
// meters, taken from this park's activities (park.json → pois) and landmarks.
// `altar`: one of the festival's big altars is drawn there (the program lists
// two monumental ones, the main entrance and the Plaza / Rosa de los Vientos
// shop, plus the archaeological site; the hacienda and the cemetery have
// their own): true finds a free spot by the paths nearby, { x, z, rotation }
// sets it. null: not located yet, listed without a marker.
/**
 * Rows of altars on the grass beside a stretch of a route (the festival lines
 * the black line with them): from the point of the route nearest `from` to
 * the one nearest `to`, every `spacing` m on each side where there is room,
 * cycling through the styles (src/themes/muertos/altars.js).
 */
export const ALTAR_ROWS = [
  // black line (Ruta del Río) from activity 15 (Restaurante La Isla / Territorio
  // del Tapir) to just before the green line joins it
  { route: 'rio', from: [64, -3], to: [-2.6, 88], spacing: 10, styles: ['sarape', 'shelves', 'cake', 'pyramid'] },
];

export default {
  // between the ticket offices and the main plaza; its altar in the open plaza
  // by the flag and the kiosk, facing them (north)
  'Entrada Principal': { x: -140, z: -106, altar: { x: -171, z: -88, rotation: Math.PI } },
  'Plaza Principal': { x: -70, z: -94 },
  'Rosa de los Vientos': { x: -27.8, z: -98, altar: true }, // compass rose of the entrance plaza
  'Palapa Tequila': { x: -4, z: -98 },
  'Capilla Guadalupe': { x: 2, z: -156 },
  'Patio de la hacienda': { x: -22, z: -206, altar: true }, // Hacienda Henequenera
  'Salón Hacienda': { x: -22, z: -206 },
  'Juego de Pelota': { x: -94, z: -27 },
  Kiosco: { x: -163, z: -106 },
  'Foro Abierto': { x: 124, z: -11 },
  'La Isla': { x: 50, z: -7 }, // Restaurante La Isla
  'Xcaret Plus': { x: 211, z: -115 },
  'Gran Tlachco': { x: 96, z: -373 },
  'Taller de Coco': { x: -65, z: 114 },
  'Tortillería de Pueblo': { x: -117, z: 88 }, // Pueblo Maya (approximate)
  Panteón: { x: -125, z: 43, altar: true }, // Cementerio Mexicano
  'Casa de los Murmullos, Cementerio': { x: -125, z: 43 },
  Plataformas: { x: 271, z: -62, altar: true }, // archaeological site, group B
  'Aldea de Artesanos': null,
  Explanada: null,
  'Avenida Principal': null,
};
