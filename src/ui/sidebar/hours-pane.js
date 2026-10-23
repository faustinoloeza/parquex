import { ICON } from '../icons.js';
import { esc } from '../dom.js';
import { openState } from '../opening-hours.js';
import { goButton, poiRow } from './poi-row.js';

/**
 * "Horarios" tab: park hours, restaurants with "open now", shows.
 * @param {HTMLElement} pane
 * @param {object} ctx sidebar context (see index.js)
 */
export function renderHoursPane(pane, ctx) {
  const { park, pois, t, L, categoryOf, parkState } = ctx;
  const food = pois.filter((p) => p.hours).sort((a, b) => a.number - b.number);
  const shows = pois.filter((p) => categoryOf(p) === 'Presentaciones').sort((a, b) => a.number - b.number);
  const badge = (st) => `<em class="${st.open ? 'is-open' : 'is-closed'}">${st.open ? t('open') : t('closed')}</em>`;
  pane.innerHTML = `
    ${park.hours ? `<div class="park-hours">${ICON.sun}<div><b>${esc(park.name)}</b><span>${park.hours.open} – ${park.hours.close}</span></div>${parkState ? badge(parkState) : ''}</div>` : ''}
    ${
      food.length
        ? `<h3>${t('restaurants')}</h3><ul class="hours-list">${food
            .map((p) => {
              const st = openState(p.hours);
              return `<li class="poi-item"><button class="poi-row" data-poi="${p.id}"><span class="num${p.extraCost ? ' is-extra' : ''}">${p.number}</span><span class="nm">${esc(L(p.name))}<small>${esc(p.desc ?? '')}${p.seasonal ? ` · ${t('seasonal')}` : ''}</small></span><span class="hr"><b>${esc(p.hours)}</b>${st ? badge(st) : ''}</span></button>${goButton(p, ctx)}</li>`;
            })
            .join('')}</ul>`
        : ''
    }
    ${shows.length ? `<h3>${t('shows')}</h3><ul class="hours-list">${shows.map((p) => poiRow(p, ctx)).join('')}</ul>` : ''}`;
}
