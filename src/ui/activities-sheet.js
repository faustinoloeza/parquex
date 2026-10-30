import { localized } from '../i18n/index.js';
import { createBottomSheet } from './bottom-sheet.js';
import { poiRow, poiMatches } from './sidebar/poi-row.js';
import { parkHeader } from './sidebar/park-header.js';

/**
 * Activity list on phones, as in the Android app (ui/ActivitiesSheet.kt): a
 * modal bottom sheet with the park's status and hours, a search box and every
 * activity by number with its "Go" button. Choosing one closes the sheet and
 * the map flies to it (onSelect) or opens the directions (onDirections). The
 * map filters live outside it, in the chip row (ui/poi-chips.js).
 *
 * @param {HTMLElement} root
 * @param {object} options
 * @param {object} options.park             park.json data
 * @param {string} options.lang
 * @param {(key: string) => string} options.t
 * @param {(poi: object) => void} options.onSelect
 * @param {(poi: object) => void} options.onDirections
 * @param {() => void} [options.onAbout]    shows the unofficial-site notice again
 * @param {(open: boolean) => void} [options.onToggle]
 */
export function createActivitiesSheet(root, { park, lang, t, onSelect, onDirections, onAbout, onToggle }) {
  const L = (value) => localized(value, lang);
  const pois = park.pois.filter((p) => p.active).sort((a, b) => a.number - b.number);
  const ctx = { t, L, categoryOf: (p) => p.category.es ?? 'Otros' };

  const sheet = createBottomSheet(root, { label: t('activityList'), handleLabel: t('sheetResize'), onClose: () => onToggle?.(false) });
  sheet.el.classList.add('activities-sheet');
  sheet.head.innerHTML = parkHeader(park, t);
  sheet.body.innerHTML = `
    <ul class="hours-list"></ul>
    <p class="sb-empty" hidden>${t('noResults')}</p>
    <footer class="sb-foot">
      ${onAbout ? `<button type="button" class="disclaimer-link" data-about>${t('disclaimerLink')}</button>` : ''}
      <small>${t('credits')}</small>
    </footer>`;
  const list = sheet.body.querySelector('.hours-list');
  const empty = sheet.body.querySelector('.sb-empty');

  const render = (query) => {
    const found = query ? pois.filter((p) => poiMatches(p, query)) : pois;
    list.innerHTML = found.map((p) => poiRow(p, ctx)).join('');
    empty.hidden = found.length > 0;
  };
  render('');

  // ----------------------------------------------------------------- search
  const input = sheet.head.querySelector('.sb-search input');
  const clear = sheet.head.querySelector('.sb-clear');
  input.addEventListener('input', () => {
    const query = input.value.trim();
    clear.hidden = !query;
    render(query);
    sheet.body.scrollTop = 0;
  });
  // typing needs the whole height (the keyboard covers the bottom)
  input.addEventListener('focus', () => sheet.expand());
  clear.addEventListener('click', (e) => {
    e.preventDefault();
    input.value = '';
    input.dispatchEvent(new Event('input'));
    input.focus();
  });

  // a row selects the activity, "Go" asks for directions; the sheet closes first
  sheet.body.addEventListener('click', (e) => {
    if (e.target.closest('[data-about]')) {
      sheet.close();
      return onAbout();
    }
    const go = e.target.closest('[data-go]');
    const row = go ?? e.target.closest('[data-poi]');
    const p = row && pois.find((x) => x.id === (go ? go.dataset.go : row.dataset.poi));
    if (!p) return;
    sheet.close();
    if (go) onDirections(p);
    else onSelect(p);
  });

  return {
    el: sheet.el,
    open() {
      sheet.open();
      onToggle?.(true);
    },
    close: () => sheet.close(),
    get isOpen() {
      return sheet.isOpen;
    },
    remove: () => sheet.remove(),
  };
}
