import { ICON } from './icons.js';
import { esc, normalize } from './dom.js';
import { dayLabel, festivalDay, parkDate, sessionsOn } from '../themes/muertos/festival.js';

/**
 * Program of the Festival de Vida y Muerte (Día de Muertos theme) in the
 * activity list — the phone sheet and a sidebar tab: one tab per day (the
 * festival's day today, or the next one) and that day's sessions by time. A
 * session flies the map to its place when the place is located
 * (src/parks/xc/festival-places.js).
 *
 * @param {object} options
 * @param {import('../themes/muertos/festival.js').FestivalProgram} options.program
 * @param {Record<string, { x: number, z: number } | null>} options.places
 * @param {{ es: string, en: string }} options.name
 * @param {string} options.lang
 * @param {(key: string) => string} options.t
 * @param {(place: string, at: { x: number, z: number }, day: string) => void} options.onPlace
 * @param {(day: string) => void} [options.onDay]
 */
export function createFestivalPanel({ program, places, name, lang, t, onPlace, onDay }) {
  const L = (v) => v?.[lang] || v?.es || '';
  const today = parkDate();
  let day = festivalDay(program.days);
  let query = '';
  const range = `${dayLabel(program.days[0], lang)} – ${dayLabel(program.days.at(-1), lang)}`;

  const el = document.createElement('section');
  el.className = 'fest';
  el.innerHTML = `
    <header class="fest-head">${ICON.skull}<div><b>${esc(L(name))}</b><small>${esc(range)} · ${esc(t('festival_where'))}</small></div></header>
    <div class="fest-days" role="tablist">${program.days
      .map(
        (d) => `<button type="button" role="tab" data-day="${d}" aria-selected="${d === day}">
          ${esc(dayLabel(d, lang))}${d === today ? `<small>${esc(t('festival_today'))}</small>` : ''}</button>`,
      )
      .join('')}</div>
    <ol class="hours-list fest-list"></ol>
    <p class="sb-empty" hidden>${esc(t('noResults'))}</p>
    <a class="fest-source" href="${esc(program.source)}" target="_blank" rel="noopener">${esc(t('festival_source'))}</a>`;
  const list = el.querySelector('.fest-list');
  const empty = el.querySelector('.sb-empty');

  let rows = [];
  function render() {
    const q = normalize(query);
    rows = sessionsOn(program, day).filter(
      ({ activity: a }) => !q || normalize(`${a.name.es} ${a.name.en} ${a.place} ${a.category.es} ${a.category.en}`).includes(q),
    );
    list.innerHTML = rows
      .map(
        ({ activity: a, start, end }, i) => `<li><button type="button" class="poi-row fest-row" data-i="${i}">
          <span class="fest-time">${esc(start)}${end ? `<small>${esc(end)}</small>` : ''}</span>
          <span class="nm">${esc(L(a.name))}<small>${esc([L(a.category), a.place].filter(Boolean).join(' · '))}</small></span>
          ${a.extraCost ? `<span class="tag" title="${esc(t('extra'))}">$</span>` : ''}
        </button></li>`,
      )
      .join('');
    empty.hidden = rows.length > 0;
  }

  el.querySelector('.fest-days').addEventListener('click', (e) => {
    const tab = e.target.closest('[data-day]');
    if (!tab || tab.dataset.day === day) return;
    day = tab.dataset.day;
    for (const b of el.querySelectorAll('[data-day]')) b.setAttribute('aria-selected', String(b === tab));
    render();
    onDay?.(day);
  });
  list.addEventListener('click', (e) => {
    const row = rows[+e.target.closest('[data-i]')?.dataset.i];
    const at = row && places[row.activity.place];
    if (at) onPlace(row.activity.place, at, day);
  });
  render();

  return {
    el,
    get day() {
      return day;
    },
    /** Filters the sessions (name, place, category; no accents). */
    setQuery(q) {
      query = q;
      render();
    },
  };
}
