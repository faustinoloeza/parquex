import { ICON } from '../icons.js';
import { localized } from '../../i18n/index.js';
import { openState } from '../opening-hours.js';
import { poiRow, poiMatches } from './poi-row.js';
import { parkHeader } from './park-header.js';
import { renderRoutesPane } from './routes-pane.js';
import { renderPlacesPane } from './places-pane.js';
import { renderHoursPane } from './hours-pane.js';

/**
 * Side panel on desktop (phones get ui/activities-sheet.js and
 * ui/poi-chips.js): park status, search and three tabs (routes, places,
 * hours). It owns the filter state and reports it through
 * onFilter({ visible(poi, slug), services, routeVisibility? }).
 *
 * Activity markers are hidden by default: they show for the focused route,
 * for the categories switched on in "Lugares" ("Mostrar todo" turns all on)
 * and for search matches.
 *
 * @param {HTMLElement} root
 * @param {object} options
 * @param {object} options.park             park.json data
 * @param {string} options.lang
 * @param {(key: string) => string} options.t
 * @param {(poi: object) => void} options.onSelect
 * @param {(filter: object) => void} options.onFilter
 * @param {(slug: string | null) => void} options.onFocusRoute
 * @param {(poi: object) => void} [options.onDirections]  walking directions to an activity ("Go" buttons)
 */
export function createSidebar(root, { park, lang, t, onSelect, onFilter, onFocusRoute, onDirections, onAbout }) {
  const L = (value) => localized(value, lang);
  const pois = park.pois.filter((p) => p.active);
  const categoryOf = (p) => p.category.es ?? 'Otros';
  const routeSlug = new Map(park.routes.map((r) => [r.name.es, r.slug]));
  const slugOf = (p) => routeSlug.get(p.route.es) ?? null;
  const parkState = park.hours ? openState(`${park.hours.open}-${park.hours.close}`) : null;
  const ctx = { park, pois, t, L, categoryOf, slugOf, parkState };

  // filter state
  const state = {
    categories: new Map(pois.map((p) => [categoryOf(p), false])),
    services: new Set(),
    focus: null,
    search: '',
  };

  const el = document.createElement('aside');
  el.className = 'sidebar';
  el.setAttribute('aria-label', park.name);
  el.innerHTML = `
    <div class="sb-head">${parkHeader(park, t)}
    </div>
    <nav class="sb-tabs" role="tablist">
      <button role="tab" data-tab="routes" aria-selected="true">${ICON.route}${t('tabRoutes')}</button>
      <button role="tab" data-tab="places" aria-selected="false">${ICON.layers}${t('tabPlaces')}</button>
      <button role="tab" data-tab="hours" aria-selected="false">${ICON.clock}${t('tabHours')}</button>
    </nav>
    <div class="sb-body">
      <section class="sb-pane" data-pane="results" hidden></section>
      <section class="sb-pane" data-pane="routes"></section>
      <section class="sb-pane" data-pane="places" hidden></section>
      <section class="sb-pane" data-pane="hours" hidden></section>
    </div>
    <footer class="sb-foot">
      ${onAbout ? `<button type="button" class="disclaimer-link" data-about>${t('disclaimerLink')}</button>` : ''}
      <small>${t('credits')}</small>
    </footer>`;
  root.appendChild(el);
  const pane = (name) => el.querySelector(`[data-pane="${name}"]`);
  el.querySelector('[data-about]')?.addEventListener('click', () => onAbout());

  // -------------------------------------------------------------- filtering
  let routes = null;
  const visible = (p, slug = slugOf(p)) => {
    if (slug && !routes.isVisible(slug)) return false;
    if (state.search) return poiMatches(p, state.search);
    if (state.focus) return slug === state.focus;
    return state.categories.get(categoryOf(p));
  };
  const emit = (extra = {}) => onFilter({ visible, services: state.services, ...extra });

  // ------------------------------------------------------------------ panes
  routes = renderRoutesPane(pane('routes'), ctx, {
    onFocus(slug) {
      state.focus = slug;
      onFocusRoute(slug);
      emit();
    },
    onVisibility(slug, on) {
      emit({ routeVisibility: [slug, on] });
    },
  });
  renderPlacesPane(pane('places'), ctx, {
    onCategory(category, on) {
      if (category === null) for (const k of state.categories.keys()) state.categories.set(k, on);
      else state.categories.set(category, on);
      emit();
    },
    onService(type, on) {
      if (on) state.services.add(type);
      else state.services.delete(type);
      emit();
    },
  });
  renderHoursPane(pane('hours'), ctx);

  // ------------------------------------------------------------------- tabs
  const panes = [...el.querySelectorAll('.sb-pane')];
  const tabs = [...el.querySelectorAll('[data-tab]')];
  let activeTab = 'routes';
  const showPane = (name) => {
    for (const p of panes) p.hidden = p.dataset.pane !== name;
  };
  for (const tab of tabs) {
    tab.addEventListener('click', () => {
      activeTab = tab.dataset.tab;
      for (const x of tabs) x.setAttribute('aria-selected', String(x === tab));
      if (!state.search) showPane(activeTab);
    });
  }

  // activity rows anywhere in the panel select the activity
  el.addEventListener('click', (e) => {
    const go = e.target.closest('[data-go]');
    if (go) {
      const p = pois.find((x) => x.id === go.dataset.go);
      if (p) onDirections?.(p);
      return;
    }
    const row = e.target.closest('[data-poi]');
    if (!row) return;
    const p = pois.find((x) => x.id === row.dataset.poi);
    if (p) onSelect(p);
  });

  // ----------------------------------------------------------------- search
  const input = el.querySelector('.sb-search input');
  const clear = el.querySelector('.sb-clear');
  const results = pane('results');
  input.addEventListener('input', () => {
    state.search = input.value.trim();
    clear.hidden = !state.search;
    if (state.search) {
      const found = pois.filter((p) => visible(p)).sort((a, b) => a.number - b.number);
      results.innerHTML = found.length
        ? `<p class="sb-hint">${found.length} ${t('results')}</p><ul class="hours-list">${found.map((p) => poiRow(p, ctx)).join('')}</ul>`
        : `<p class="sb-empty">${t('noResults')}</p>`;
      showPane('results');
    } else showPane(activeTab);
    emit();
  });
  clear.addEventListener('click', (e) => {
    e.preventDefault();
    input.value = '';
    input.dispatchEvent(new Event('input'));
    input.focus();
  });

  // start with no activity markers on the map (see visible())
  emit();

  return {
    el,
    /** Shows/hides the panel (toggles when `force` is undefined). */
    toggle(force) {
      el.classList.toggle('collapsed', force === undefined ? !el.classList.contains('collapsed') : !force);
    },
    /** Marks the rows of the selected activity. */
    highlight(poi) {
      el.querySelectorAll('.poi-row.active').forEach((r) => r.classList.remove('active'));
      if (poi) el.querySelectorAll(`[data-poi="${poi.id}"]`).forEach((r) => r.classList.add('active'));
    },
  };
}
