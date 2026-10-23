// Official visitor routes. The lines are traced from the colored strokes
// painted on the illustration (`stroke`, see pipeline/stages/routes.js); `osm`
// matches OpenStreetMap ways by name as a fallback source; `links` adds
// stretches drawn by hand where the traced pieces stop short of each other.
export default [
  {
    slug: 'rio',
    name: 'Ruta del Río',
    color: '#232323',
    casing: '#ffffff',
    label: { es: 'Línea negra', en: 'Black line' },
    stroke: 'black',
    osm: /^(ruta del r[ií]o|black|dash black)$/i,
  },
  {
    slug: 'acuario',
    name: 'Ruta Acuario',
    color: '#1670d6',
    casing: '#ffffff',
    label: { es: 'Línea azul', en: 'Blue line' },
    stroke: 'blue',
    osm: /^ruta acuario$/i,
  },
  {
    slug: 'playa',
    name: 'Ruta Playa',
    color: '#1f9d55',
    casing: '#ffffff',
    label: { es: 'Línea verde', en: 'Green line' },
    stroke: 'green',
    osm: /^ruta playa$/i,
    // from the bridge at the head of the snorkel cove down the strip between
    // the pond and the cove, to the line along the cove's west bank
    links: [
      [
        [109.77, 145.15],
        [110.8, 148.5],
        [111.2, 153],
        [110.6, 157.5],
        [109.6, 159.63],
      ],
    ],
  },
  {
    slug: 'delfines',
    name: 'Ruta Delfines',
    color: '#e3262e',
    casing: '#ffffff',
    label: { es: 'Línea roja', en: 'Red line' },
    stroke: 'red',
    osm: /^ruta delfines$/i,
  },
  {
    slug: 'maya',
    name: 'Ruta Pueblo Maya',
    color: '#ffffff',
    casing: '#30343a',
    label: { es: 'Línea blanca', en: 'White line' },
    stroke: 'white',
  },
  {
    slug: 'mexico',
    name: 'Ruta México Espectacular',
    color: '#8a4b1e',
    casing: '#ffffff',
    label: { es: 'Línea café', en: 'Brown line' },
    stroke: 'brown',
  },
];
