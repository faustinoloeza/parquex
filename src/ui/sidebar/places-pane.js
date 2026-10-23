import { ICON, SERVICE_TYPES, CATEGORY_STYLE } from '../icons.js';
import { esc } from '../dom.js';

/**
 * "Lugares" tab: switches per activity category and per service type.
 * @param {HTMLElement} pane
 * @param {object} ctx sidebar context (see index.js)
 * @param {{ onCategory: (category: string | null, on: boolean) => void, onService: (type: string, on: boolean) => void }} events
 *        onCategory(null, on) = show/hide all categories
 */
export function renderPlacesPane(pane, ctx, { onCategory, onService }) {
  const { park, pois, t, L, categoryOf } = ctx;
  const counts = new Map();
  for (const p of pois) counts.set(categoryOf(p), (counts.get(categoryOf(p)) ?? 0) + 1);
  const label = new Map(pois.map((p) => [categoryOf(p), L(p.category) || categoryOf(p)]));
  const serviceCounts = new Map();
  for (const s of park.services ?? []) serviceCounts.set(s.type, (serviceCounts.get(s.type) ?? 0) + 1);

  const toggle = (attr, key, style, text, count, checked) =>
    `<li><label class="toggle" style="--c:${style.color}"><input type="checkbox" ${attr}="${esc(key)}"${checked ? ' checked' : ''}><span class="ic">${style.icon}</span><span class="tl">${esc(text)}</span><span class="ct">${count}</span><span class="sw"></span></label></li>`;

  pane.innerHTML = `
    <div class="sb-row"><h3>${t('categories')}</h3><span><button class="link" data-all="1">${t('showAll')}</button> · <button class="link" data-all="0">${t('hideAll')}</button></span></div>
    <ul class="toggles">${[...counts.keys()].map((c) => toggle('data-cat', c, CATEGORY_STYLE[c] ?? { icon: ICON.pin, color: '#64748b' }, label.get(c), counts.get(c), false)).join('')}</ul>
    ${
      serviceCounts.size
        ? `<div class="sb-row"><h3>${t('services')}</h3></div>
    <ul class="toggles">${Object.entries(SERVICE_TYPES)
      .filter(([k]) => serviceCounts.has(k))
      .map(([k, st]) => toggle('data-svc', k, st, L(st.label), serviceCounts.get(k), false))
      .join('')}</ul>`
        : ''
    }`;

  pane.addEventListener('change', (e) => {
    const input = e.target;
    if (input.dataset.cat) onCategory(input.dataset.cat, input.checked);
    if (input.dataset.svc) onService(input.dataset.svc, input.checked);
  });
  pane.addEventListener('click', (e) => {
    const all = e.target.closest('[data-all]');
    if (!all) return;
    const on = all.dataset.all === '1';
    pane.querySelectorAll('[data-cat]').forEach((i) => {
      i.checked = on;
    });
    onCategory(null, on);
  });
}
