import { BASEMAP } from '../config.js';
import { localized } from '../i18n/index.js';
import { esc } from './dom.js';

/**
 * Credit line of the real map, required by the tile provider's license
 * (bottom-right corner of the map).
 * @param {HTMLElement} root
 * @param {string} lang
 */
export function createAttribution(root, lang) {
  const el = document.createElement('div');
  el.className = 'map-attribution';
  el.innerHTML = `<a href="${esc(BASEMAP.attributionUrl)}" target="_blank" rel="noopener">${esc(localized(BASEMAP.attribution, lang))}</a>`;
  root.appendChild(el);
  return el;
}
