// Día de Muertos: from October 1 to November 2, the last day of Xcaret's
// Festival de Vida y Muerte; on November 3 it is gone until next October. The
// map dresses like the festival's nights: always night on 'auto', a warm
// candle-lit sky, and candles, marigolds, papel picado and altars over the
// park (decorations.js). The page colors come from the altars (marigold,
// Mexican pink, purple): src/styles/themes/muertos.css.
import xcPlaces, { ALTAR_ROWS as xcRows } from '../../parks/xc/festival-places.js';
import { FESTIVAL } from './festival.js';

/** Festival places and rows of altars of each park (src/parks/<key>/festival-places.js). */
const PLACES = { xc: xcPlaces };
const ROWS = { xc: xcRows };

/** The decoration's code (its own chunk), fetched once. */
const loadDecorations = () => import('./decorations.js');

/** @type {import('../index.js').Theme} */
export default {
  key: 'muertos',
  label: {
    es: 'Día de Muertos',
    en: 'Day of the Dead',
    zh: '亡灵节',
    ja: '死者の日',
    fr: 'Jour des Morts',
    pt: 'Dia dos Mortos',
    ko: '망자의 날',
    ar: 'يوم الموتى',
    it: 'Giorno dei Morti',
    hi: 'मृतकों का दिन',
  },
  season: { from: [10, 1], to: [11, 2] },
  tagline: FESTIVAL.name,
  alwaysNight: true,
  // Xcaret's festival: its program and where it happens
  festival: { ...FESTIVAL, places: PLACES },
  // a dark, warm night: deep violet sky and a dim amber bounce, so the
  // candle-lit paths and altars stand out
  night: {
    sky: '#14081f',
    hemiSky: '#6e5a86',
    hemiGround: '#6a3a1c',
    hemi: 1.35,
    sun: '#ffb27a',
    sunIntensity: 0.3,
    shadow: 0.45,
    exposure: 1.05,
  },
  preload: loadDecorations,
  async decorations(ctx) {
    const { createMuertosLayer } = await loadDecorations();
    const places = Object.entries(PLACES[ctx.park.key] ?? {})
      .filter(([, p]) => p?.altar)
      .map(([name, p]) => ({ x: p.x, z: p.z, at: typeof p.altar === 'object' ? p.altar : null, place: name }));
    return createMuertosLayer({ ...ctx, places, rows: ROWS[ctx.park.key] ?? [] });
  },
};
