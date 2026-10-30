// Seasonal themes: colors, decoration and extra content the map takes on for a
// season each year (docs/temas.md). In its season a theme is on by default
// ('auto' goes by the date in park time, like the day / night mode) and the
// settings or the URL (?theme=muertos, ?theme=classic: screenshots) can pick
// it or the classic look; out of its season it does not exist at all.
import { PARK_UTC_OFFSET } from '../app/time-of-day.js';
import muertos from './muertos/index.js';

/**
 * @typedef {object} Theme
 * @property {string} key                  html[data-theme] value (src/styles/themes/<key>.css)
 * @property {{ es: string, en: string }} label  name in the settings menu
 * @property {{ from: number[], to: number[] }} season  first and last day of each year, [month, day] in park
 *           time, both included (a season may wrap the new year): the only days the theme can show
 * @property {{ es: string, en: string }} [tagline]  line under the loading message
 * @property {boolean} [alwaysNight]       'auto' day / night mode shows night while the theme is on
 * @property {object} [night]              night lights over Stage's LIGHTING.night (Stage.setNightStyle)
 * @property {object} [festival]  a festival the theme brings: its program file (pipeline) and places by park
 *           (src/themes/muertos/festival.js → FESTIVAL, plus `places`)
 * @property {(ctx: object) => Promise<import('../layers/index.js').Layer & { theme: string }>} [decorations]
 *           the theme's layer of the focused park (app/world.js → createParkLayers gives the context)
 */

/** Every theme by key, in the order 'auto' checks them. */
export const THEMES = { [muertos.key]: muertos };

/** Every theme mode there is (saved preferences and ?theme are checked against it). */
export const THEME_MODES = ['auto', ...Object.keys(THEMES), 'classic'];

/**
 * [month (1–12), day] of a moment in the parks' local time.
 * @param {Date | number} [date]
 */
export function parkMonthDay(date = Date.now()) {
  const ms = typeof date === 'number' ? date : date.getTime();
  const d = new Date(ms + PARK_UTC_OFFSET * 3_600_000);
  return [d.getUTCMonth() + 1, d.getUTCDate()];
}

/**
 * Whether a moment falls in a theme's season (park time).
 * @param {Theme} theme
 * @param {Date | number} [date]
 */
export function inSeason(theme, date = Date.now()) {
  const [m, d] = parkMonthDay(date);
  const at = m * 100 + d,
    from = theme.season.from[0] * 100 + theme.season.from[1],
    to = theme.season.to[0] * 100 + theme.season.to[1];
  return from <= to ? at >= from && at <= to : at >= from || at <= to;
}

/**
 * Choices of the settings menu at a moment: automatic, each theme in season
 * and the classic look — none at all when no theme is in season.
 * @param {Date | number} [date]
 */
export function themeModes(date = Date.now()) {
  const now = Object.values(THEMES).filter((t) => inSeason(t, date));
  return now.length ? ['auto', ...now.map((t) => t.key), 'classic'] : [];
}

/**
 * Theme shown for a settings mode at a moment: 'classic' → none; a theme in
 * season → that theme; anything else ('auto', a theme out of season, an
 * unknown mode) → the first theme in season, if any.
 * @param {string} mode
 * @param {Date | number} [date]
 * @returns {Theme | null}
 */
export function activeTheme(mode, date = Date.now()) {
  if (mode === 'classic') return null;
  const now = Object.values(THEMES).filter((t) => inSeason(t, date));
  return now.find((t) => t.key === mode) ?? now[0] ?? null;
}

/**
 * Mode forced from the URL for screenshots (?theme=<key> / ?theme=classic), else null.
 * @param {string} [search]
 */
export function forcedThemeMode(search = typeof location === 'undefined' ? '' : location.search) {
  const mode = new URLSearchParams(search).get('theme');
  return THEME_MODES.includes(mode) ? mode : null;
}
