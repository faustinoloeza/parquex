import { CATEGORY_STYLE, ICON } from '../icons.js';
import { esc, normalize } from '../dom.js';
import { openState } from '../opening-hours.js';

/**
 * One activity as a clickable row (data-poi = activity id), with a small
 * "Go" button for walking directions (data-go = activity id).
 * @param {object} p activity (park.json → pois)
 * @param {{ t: (k: string) => string, L: (v: object) => string, categoryOf: (p: object) => string }} ctx
 */
export function poiRow(p, { t, L, categoryOf }) {
  const cat = CATEGORY_STYLE[categoryOf(p)];
  const st = p.hours ? openState(p.hours) : null;
  return `<li class="poi-item"><button class="poi-row" data-poi="${p.id}">
      <span class="num${p.extraCost ? ' is-extra' : ''}">${p.number}</span>
      <span class="nm">${esc(L(p.name))}<small>${cat ? `<i style="--c:${cat.color}"></i>` : ''}${esc(L(p.category))}${p.hours ? ` · ${esc(p.hours)}` : ''}</small></span>
      ${p.extraCost ? `<span class="tag" title="${t('extra')}">$</span>` : ''}
      ${st ? `<span class="dot ${st.open ? 'is-open' : ''}" title="${st.open ? t('open') : t('closed')}"></span>` : ''}
    </button>${goButton(p, { t, L })}</li>`;
}

/** Walking directions button next to an activity row. */
export function goButton(p, { t, L }) {
  return `<button class="poi-go" data-go="${p.id}" title="${esc(`${t('nav_goTo')} ${L(p.name)}`)}" aria-label="${esc(`${t('nav_goTo')} ${L(p.name)}`)}">${ICON.directions}<span>${esc(t('nav_go'))}</span></button>`;
}

/** Search match (number, name in both languages, category, route, description), ignoring case and accents. */
export function poiMatches(p, query) {
  const q = normalize(query);
  return normalize(`${p.number} ${p.name.es} ${p.name.en} ${p.category.es} ${p.route.es ?? ''} ${p.desc ?? ''}`).includes(q);
}
