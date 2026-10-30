import * as THREE from 'three';
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { ICON } from './icons.js';
import { esc } from './dom.js';
import { localized } from '../i18n/index.js';

/**
 * The altars of the Día de Muertos theme on the map (the theme layer's
 * `altars`, src/themes/muertos/decorations.js): a small marker over each one
 * that opens a card with its style and place. Hidden until show(true).
 *
 * @param {THREE.Scene} scene
 * @param {object} options
 * @param {{ x: number, z: number, style: string, place: string | { es: string, en: string } | null }[]} options.altars
 *        place: a festival place name, a { es, en } name, or 'entrance'
 * @param {string} options.lang
 * @param {(key: string) => string} options.t
 * @param {(x: number, z: number) => number} options.heightAt
 * @param {() => void} options.onChange  the HTML changed (MapApp redraws the labels)
 */
export function createAltarMarkers(scene, { altars, lang, t, heightAt, onChange }) {
  const group = new THREE.Group();
  group.name = 'altar-markers';
  group.visible = false;
  scene.add(group);

  const placeOf = (a) => (a.place === 'entrance' ? t('entrance') : typeof a.place === 'string' ? a.place : localized(a.place, lang));
  const titleOf = (a) => t(`altar_${a.style}`);
  let selected = null;

  const items = altars.map((altar) => {
    const anchor = document.createElement('div');
    anchor.className = 'marker-anchor';
    const el = document.createElement('div');
    el.tabIndex = 0;
    el.setAttribute('role', 'button');
    anchor.appendChild(el);
    const obj = new CSS2DObject(anchor);
    // above the altar (about 4 m tall)
    obj.position.set(altar.x, Math.max(heightAt(altar.x, altar.z), 0.5) + 4.6, altar.z);
    group.add(obj);
    const item = { altar, el };
    const toggle = (e) => {
      e.stopPropagation();
      select(selected === item ? null : item);
    };
    el.addEventListener('click', toggle);
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle(e);
      } else if (e.key === 'Escape') select(null);
    });
    render(item);
    return item;
  });

  function render(item) {
    const { altar, el } = item;
    const place = placeOf(altar);
    if (item === selected) {
      el.className = 'altar-marker-selected';
      el.setAttribute('aria-expanded', 'true');
      el.innerHTML = `<div class="fm-head">${ICON.altar}<b>${esc(titleOf(altar))}</b></div>${place ? `<p>${esc(place)}</p>` : ''}`;
    } else {
      el.className = 'altar-marker';
      el.setAttribute('aria-expanded', 'false');
      el.setAttribute('aria-label', [titleOf(altar), place].filter(Boolean).join(', '));
      el.innerHTML = ICON.altar;
    }
  }

  function select(item) {
    const previous = selected;
    selected = item;
    if (previous) render(previous);
    if (item) render(item);
    onChange();
  }

  return {
    /** Titles and places, for the list in the festival panel. */
    list: () => altars.map((a) => ({ title: titleOf(a), place: placeOf(a), x: a.x, z: a.z })),
    show(on) {
      group.visible = on;
      if (!on && selected) select(null);
      onChange();
    },
    /** Shows the markers and opens the card of altar `i`. */
    focus(i) {
      if (!items[i]) return;
      group.visible = true;
      select(items[i]);
    },
    deselect() {
      if (selected) select(null);
    },
    dispose() {
      scene.remove(group);
      group.traverse((o) => o.element?.remove());
    },
  };
}
