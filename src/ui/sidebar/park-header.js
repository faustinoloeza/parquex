import { ICON } from '../icons.js';
import { esc } from '../dom.js';
import { openState } from '../opening-hours.js';

/**
 * Park name with its open / closed state, the park hours and the activity
 * search box: the head of the sidebar and of the phone activity sheet.
 * @param {object} park park.json data
 * @param {(key: string) => string} t
 */
export function parkHeader(park, t) {
  const st = park.hours ? openState(`${park.hours.open}-${park.hours.close}`) : null;
  return `
      <div class="sb-title">
        <h2>${esc(park.name)}</h2>
        ${st ? `<span class="sb-status ${st.open ? 'is-open' : 'is-closed'}">${st.open ? `${t('open')} · ${t('closesAt')} ${st.to}` : `${t('closed')} · ${t('opensAt')} ${st.from}`}</span>` : ''}
      </div>
      ${park.hours ? `<p class="sb-hours">${ICON.clock}<span>${t('parkHours')}: <b>${park.hours.open} – ${park.hours.close}</b></span></p>` : ''}
      <label class="sb-search">${ICON.search}<input type="search" placeholder="${t('search')}" autocomplete="off"><button class="sb-clear" aria-label="${t('close')}" hidden>${ICON.close}</button></label>`;
}
