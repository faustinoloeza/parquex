import { PARK_CATALOG, SELECTABLE_PARKS } from '../parks/catalog.js';
import { LANGS, LANG_NAMES, localized } from '../i18n/index.js';
import { esc } from './dom.js';
import { attachMenu } from './menu.js';
import { TIME_MODES } from '../app/time-of-day.js';
import { THEMES, activeTheme, themeModes } from '../themes/index.js';

const QUALITIES = ['auto', 'high', 'medium', 'low'];

const ICONS = {
  list: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  chevron: '<svg class="tb-chevron" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4"/></svg>',
  // three sliders, like the Android app's settings button
  tune: `<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M1 4h18M1 10h18M1 16h18"/>
    <circle cx="13.6" cy="4" r="3.1"/><circle cx="6" cy="10" r="3.1"/><circle cx="11" cy="16" r="3.1"/></svg>`,
};

/**
 * Compact floating top bar, as in the Android app: a pill with the park name and
 * opening hours (opens the park switcher) and a settings button (language, graphics
 * quality, day / night, and the seasonal theme while one is in season). `onMenu` adds a button that
 * shows/hides the activity list.
 *
 * @param {HTMLElement} root
 * @param {object} options
 * @param {string} options.park          current park key
 * @param {string} options.lang
 * @param {(key: string) => string} options.t
 * @param {{ open: string, close: string }} [options.hours]  park hours (once loaded)
 * @param {string} [options.quality]     current quality mode (shows the quality options)
 * @param {(park: string, lang: string) => void} options.onNavigate
 * @param {() => void} [options.onMenu]
 * @param {(mode: string) => void} [options.onQuality]
 * @param {string} [options.timeMode]    current time of day mode ('auto' | 'day' | 'night')
 * @param {(mode: string) => void} [options.onTimeMode]
 * @param {string} [options.themeMode]   current theme mode ('auto' | a theme key | 'classic', src/themes)
 * @param {(mode: string) => void} [options.onTheme]
 */
export function createHeader(
  root,
  { park, lang, t, hours, quality, onNavigate, onMenu, onQuality, timeMode, onTimeMode, themeMode, onTheme },
) {
  const title = PARK_CATALOG[park]?.name ?? park;
  const hoursText = hours ? `${hours.open} – ${hours.close}` : '';
  const el = document.createElement('header');
  el.className = 'topbar';
  el.innerHTML = `
    ${onMenu ? `<button type="button" class="tb-round tb-list" aria-label="${esc(t('activityList'))}" aria-pressed="false">${ICONS.list}</button>` : ''}
    <div class="tb-anchor tb-park">
      <button type="button" class="tb-pill" aria-label="${esc(`${title}${hours ? `, ${t('parkHours')} ${hoursText}` : ''}. ${t('parkSwitcher')}`)}">
        <span class="tb-title">${esc(title)}</span>
        ${hours ? `<span class="tb-dot" aria-hidden="true"></span><span class="tb-hours">${esc(hoursText)}</span>` : ''}
        ${ICONS.chevron}
      </button>
    </div>
    <div class="tb-anchor tb-settings">
      <button type="button" class="tb-round" aria-label="${esc(t('settings'))}">${ICONS.tune}</button>
    </div>`;
  root.appendChild(el);

  const list = el.querySelector('.tb-list');
  list?.addEventListener('click', () => onMenu());

  attachMenu(
    el.querySelector('.tb-pill'),
    () =>
      SELECTABLE_PARKS.map((key) => ({
        label: PARK_CATALOG[key].name,
        checked: key === park,
        onSelect: () => key !== park && onNavigate(key, lang),
      })),
    { label: t('parkSwitcher') },
  );

  let current = quality,
    currentTime = timeMode,
    currentTheme = themeMode;
  // 'auto' names the theme it shows now, e.g. "Automático (Día de Muertos)"
  const themeLabel = (mode) => {
    if (mode === 'auto') {
      const now = activeTheme('auto');
      return now ? `${t('theme_auto')} (${localized(now.label, lang)})` : t('theme_auto');
    }
    return THEMES[mode] ? localized(THEMES[mode].label, lang) : t('theme_classic');
  };
  attachMenu(
    el.querySelector('.tb-settings button'),
    // one collapsible group per setting, showing its current choice: a short menu even with many languages
    () => [
      {
        group: t('language'),
        items: LANGS.map((l) => ({
          label: LANG_NAMES[l] ?? l.toUpperCase(),
          checked: l === lang,
          onSelect: () => l !== lang && onNavigate(park, l),
        })),
      },
      ...(onQuality
        ? [
            {
              group: t('quality'),
              items: QUALITIES.map((q) => ({
                label: t('q_' + q),
                checked: q === current,
                onSelect: () => {
                  current = q;
                  onQuality(q);
                },
              })),
            },
          ]
        : []),
      ...(onTimeMode
        ? [
            {
              group: t('timeOfDay'),
              items: TIME_MODES.map((m) => ({
                label: t('time_' + m),
                checked: m === currentTime,
                onSelect: () => {
                  currentTime = m;
                  onTimeMode(m);
                },
              })),
            },
          ]
        : []),
      ...(onTheme && themeModes().length
        ? [
            {
              group: t('theme'),
              items: themeModes().map((m) => ({
                label: themeLabel(m),
                checked: m === currentTheme,
                onSelect: () => {
                  currentTheme = m;
                  onTheme(m);
                },
              })),
            },
          ]
        : []),
    ],
    { align: 'end', label: t('settings') },
  );

  return {
    el,
    remove: () => el.remove(),
    /** Reflects whether the activity list is showing (button state). */
    setListOpen(on) {
      list?.setAttribute('aria-pressed', String(on));
    },
  };
}
