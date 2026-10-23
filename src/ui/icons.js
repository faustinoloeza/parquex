// Small inline SVG icons (stroke style) for the sidebar and service chips.
const svg = (d, extra = '') => `<svg viewBox="0 0 24 24" aria-hidden="true" ${extra}>${d}</svg>`;

export const ICON = {
  search: svg('<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>'),
  close: svg('<path d="M6 6l12 12M18 6L6 18"/>'),
  menu: svg('<path d="M4 7h16M4 12h16M4 17h16"/>'),
  eye: svg('<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),
  eyeOff: svg(
    '<path d="M3 3l18 18"/><path d="M10.6 5.1A10 10 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-3.2 4.1M6.6 6.6A17 17 0 0 0 2 12s3.6 7 10 7a9.8 9.8 0 0 0 5.4-1.6"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',
  ),
  chevron: svg('<path d="M9 6l6 6-6 6"/>'),
  clock: svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
  route: svg('<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8a3.5 3.5 0 0 0 0-7H8a3.5 3.5 0 0 1 0-7h8"/>'),
  pin: svg('<path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>'),
  layers: svg('<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/>'),
  focus: svg('<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>'),
  star: svg('<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),
  ticket: svg(
    '<path d="M3 8a2 2 0 0 0 0 4v4h18v-4a2 2 0 0 1 0-4V4H3z" transform="translate(0 2)"/><path d="M14 6v12" stroke-dasharray="2 2"/>',
  ),
  mask: svg('<path d="M4 6c3 1 13 1 16 0 0 7-3 12-8 12S4 13 4 6z"/><path d="M8.5 10.5h2M13.5 10.5h2M9.5 14.5c1.5 1 3.5 1 5 0"/>'),
  compass: svg('<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>'),
  utensils: svg('<path d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M17 3c-2 1-3 3-3 6s1 4 3 4v8"/>'),
  bag: svg('<path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>'),
  camera: svg('<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>'),
  wc: svg(
    '<text x="12" y="16.5" text-anchor="middle" font-size="10" font-weight="800" fill="currentColor" stroke="none" font-family="system-ui,sans-serif">WC</text>',
  ),
  key: svg('<circle cx="8" cy="15" r="4"/><path d="M11 12l8-8M16 7l2 2M14 9l2 2"/>'),
  cross: svg('<path d="M10 4h4v6h6v4h-6v6h-4v-6H4v-4h6z" fill="currentColor" stroke="none"/>'),
  wheelchair: svg('<circle cx="11" cy="4.5" r="1.8"/><path d="M11 7.5v6h5l2.5 5"/><path d="M8 10.5a5.5 5.5 0 1 0 6.7 7.6"/>'),
  ramp: svg('<path d="M3 19h18L3 9z"/><path d="M8 16l3-1.5"/>'),
  sun: svg(
    '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  ),
  gauge: svg('<path d="M4 18a8 8 0 1 1 16 0"/><path d="M12 18l4-6"/>'),
  // walking directions: a turn arrow in a diamond (Google-Maps-like)
  directions: svg(
    '<path d="M12 2.5l9.5 9.5-9.5 9.5L2.5 12z"/><path d="M9 14.5v-3a1.5 1.5 0 0 1 1.5-1.5H15"/><path d="M13 7.8l2.2 2.2-2.2 2.2"/>',
  ),
  walk: svg('<circle cx="13" cy="4" r="1.8"/><path d="M10.5 21l2-6-2.5-2.5 1-4.5 3 3 2.5 1M10.5 8.5L7.5 10l-1 3.5M12.5 15l2.5 6"/>'),
};

export const SERVICE_TYPES = {
  wc: { icon: ICON.wc, color: '#0284c7', label: { es: 'Baños', en: 'Restrooms' } },
  locker: { icon: ICON.key, color: '#d97706', label: { es: 'Renta de casilleros', en: 'Locker rental' } },
  'first-aid': { icon: ICON.cross, color: '#dc2626', label: { es: 'Enfermería', en: 'First aid' } },
  wheelchair: { icon: ICON.wheelchair, color: '#7c3aed', label: { es: 'Sillas de ruedas y carriolas', en: 'Wheelchairs & strollers' } },
  ramp: { icon: ICON.ramp, color: '#ea580c', label: { es: 'Rampas difíciles', en: 'Steep ramps' } },
};

// Activity categories as named in the official data (Spanish keys).
export const CATEGORY_STYLE = {
  'Actividades Esenciales': { icon: ICON.star, color: '#0ea5e9' },
  'Actividades Extraordinarias': { icon: ICON.ticket, color: '#f59e0b' },
  Presentaciones: { icon: ICON.mask, color: '#a855f7' },
  'Atractivos por Descubrir': { icon: ICON.compass, color: '#16a34a' },
  Restaurantes: { icon: ICON.utensils, color: '#ef4444' },
  Tiendas: { icon: ICON.bag, color: '#ec4899' },
  Photos: { icon: ICON.camera, color: '#64748b' },
  Servicios: { icon: ICON.pin, color: '#0f766e' }, // hand-placed: parking lots, flag, ticket office…
};
