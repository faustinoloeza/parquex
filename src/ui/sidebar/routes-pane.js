import { ICON } from '../icons.js';
import { esc } from '../dom.js';
import { poiRow } from './poi-row.js';

/**
 * "Rutas" tab: one card per official route with its activities. Tapping a card
 * focuses the route (filters the map); the eye button hides it.
 * @param {HTMLElement} pane
 * @param {object} ctx sidebar context (see index.js)
 * @param {{ onFocus: (slug: string | null) => void, onVisibility: (slug: string, on: boolean) => void }} events
 */
export function renderRoutesPane(pane, ctx, { onFocus, onVisibility }) {
  const { park, pois, t, L, slugOf } = ctx;
  pane.innerHTML =
    `<p class="sb-hint">${t('routesHint')}</p>` +
    park.routes
      .map((r) => {
        const list = pois.filter((p) => slugOf(p) === r.slug).sort((a, b) => a.number - b.number);
        return `<div class="route-card" data-slug="${r.slug}" style="--c:${r.color};--k:${r.casing}">
      <div class="route-head">
        <button class="route-toggle" aria-expanded="false">
          <span class="route-swatch"></span>
          <span class="route-name">${esc(L(r.name))}<small>${esc(L(r.label))} · ${list.length} ${t('activities')}</small></span>
          <span class="chev">${ICON.chevron}</span>
        </button>
        <button class="route-eye" role="switch" aria-checked="true" title="${t('hideAll')}">${ICON.eye}</button>
      </div>
      <ol class="route-list" hidden>${list.map((p) => poiRow(p, ctx)).join('')}</ol>
    </div>`;
      })
      .join('');

  const cards = [...pane.querySelectorAll('.route-card')];
  const visible = new Map(park.routes.map((r) => [r.slug, true]));

  function setVisible(card, on) {
    const slug = card.dataset.slug;
    visible.set(slug, on);
    const eye = card.querySelector('.route-eye');
    eye.setAttribute('aria-checked', String(on));
    eye.innerHTML = on ? ICON.eye : ICON.eyeOff;
    card.classList.toggle('off', !on);
    onVisibility(slug, on);
  }

  for (const card of cards) {
    const slug = card.dataset.slug;
    const toggle = card.querySelector('.route-toggle');
    const list = card.querySelector('.route-list');
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      for (const c of cards) {
        c.querySelector('.route-toggle').setAttribute('aria-expanded', 'false');
        c.querySelector('.route-list').hidden = true;
        c.classList.remove('focused');
      }
      toggle.setAttribute('aria-expanded', String(open));
      list.hidden = !open;
      card.classList.toggle('focused', open);
      // focusing a hidden route shows it again
      if (open && !visible.get(slug)) setVisible(card, true);
      onFocus(open ? slug : null);
    });
    card.querySelector('.route-eye').addEventListener('click', () => setVisible(card, !visible.get(slug)));
  }
  return { isVisible: (slug) => visible.get(slug) };
}
