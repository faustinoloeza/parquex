import { SELECTABLE_PARKS, DEFAULT_PARK } from '../parks/index.js';
import { LANGS } from '../i18n/index.js';

/** Where the site is served from ('/', or '/<repo>/' on GitHub Pages; vite.config.js → base). */
export const BASE = import.meta.env?.BASE_URL ?? '/';

/**
 * URLs mirror the official site: <base><park>/<lang>, e.g. /xc/es or
 * /parquex/xh/en. Unknown values (and regions, which are not parks) fall back
 * to the default park / first language.
 */
export function parseRoute(pathname = location.pathname, base = BASE) {
  const path = pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  const [p, l] = path.split('/').filter(Boolean);
  const park = SELECTABLE_PARKS.includes(p?.toLowerCase()) ? p.toLowerCase() : DEFAULT_PARK;
  const lang = LANGS.includes(l) ? l : LANGS[0];
  return { park, lang };
}

export const routeUrl = (park, lang, base = BASE) => `${base}${park}/${lang}`;

/**
 * Debug switches read from the query string:
 *   ?stats      FPS / draw calls overlay
 *   ?still      render 4 frames and stop (screenshots); sets window.__ready
 *   ?nosidebar  start with the sidebar closed
 *   ?ref        official illustration as ground texture (needs data/raw)
 *   ?noneighbors  only the focused park, without the neighboring ones (comparisons)
 *   ?view=x,z,distance,polar,azimuth   start camera (meters, degrees), for screenshots
 */
export function debugFlags(search = location.search) {
  const params = new URLSearchParams(search);
  const view = params.get('view')?.split(',').map(Number);
  return {
    stats: params.has('stats'),
    still: params.has('still'),
    nosidebar: params.has('nosidebar'),
    reference: params.has('ref'),
    neighbors: !params.has('noneighbors'),
    view: view?.length >= 3 && view.every(Number.isFinite) ? view : null,
  };
}
