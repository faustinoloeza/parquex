import * as THREE from 'three';
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { ICON } from './icons.js';
import { esc } from './dom.js';
import { localized } from '../i18n/index.js';
import { sessionsOn } from '../themes/muertos/festival.js';

/**
 * Places of the Festival de Vida y Muerte on the map (Día de Muertos theme): a
 * calavera marker with the number of sessions of the day on each located spot
 * (place names that share a spot share the marker); selecting one opens a card
 * with its sessions. Hidden until show(true).
 *
 * @param {THREE.Scene} scene
 * @param {object} options
 * @param {import('../themes/muertos/festival.js').FestivalProgram} options.program
 * @param {Record<string, { x: number, z: number } | null>} options.places
 * @param {string} options.lang
 * @param {(key: string) => string} options.t
 * @param {(x: number, z: number) => number} options.heightAt
 * @param {() => void} options.onChange  the HTML changed (MapApp redraws the labels)
 */
export function createFestivalMarkers(scene, { program, places, lang, t, heightAt, onChange }) {
  const L = (v) => localized(v, lang);
  const group = new THREE.Group();
  group.name = 'festival-markers';
  group.visible = false;
  scene.add(group);

  const spots = new Map();
  for (const [name, at] of Object.entries(places)) {
    if (!at) continue;
    const key = `${at.x},${at.z}`;
    if (!spots.has(key)) spots.set(key, { at, names: [] });
    spots.get(key).names.push(name);
  }
  let day = null;
  let selected = null;

  for (const spot of spots.values()) {
    const anchor = document.createElement('div');
    anchor.className = 'marker-anchor';
    const el = document.createElement('div');
    el.tabIndex = 0;
    el.setAttribute('role', 'button');
    anchor.appendChild(el);
    const obj = new CSS2DObject(anchor);
    obj.position.set(spot.at.x, Math.max(heightAt(spot.at.x, spot.at.z), 0.5) + 3.5, spot.at.z);
    group.add(obj);
    Object.assign(spot, { el, obj });
    const toggle = (e) => {
      e.stopPropagation();
      select(selected === spot && !e.target.closest('ol') ? null : spot);
    };
    el.addEventListener('click', toggle);
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle(e);
      } else if (e.key === 'Escape') select(null);
    });
  }

  function render(spot) {
    const sessions = day ? sessionsOn(program, day).filter((s) => spot.names.includes(s.activity.place)) : [];
    spot.obj.visible = sessions.length > 0;
    const title = spot.names.join(' · ');
    if (spot === selected) {
      spot.el.className = 'fest-marker-selected';
      spot.el.setAttribute('aria-expanded', 'true');
      spot.el.innerHTML = `<div class="fm-head">${ICON.skull}<b>${esc(title)}</b></div>
        <ol>${sessions
          .map(
            ({ activity: a, start }) =>
              `<li><time>${esc(start)}</time><span>${esc(L(a.name))}${a.extraCost ? ' <em>$</em>' : ''}</span></li>`,
          )
          .join('')}</ol>`;
    } else {
      spot.el.className = 'fest-marker';
      spot.el.setAttribute('aria-expanded', 'false');
      spot.el.setAttribute('aria-label', `${title}: ${sessions.length} ${t('festival_sessions')}`);
      spot.el.innerHTML = `${ICON.skull}<span>${sessions.length}</span>`;
    }
  }

  function select(spot) {
    const previous = selected;
    selected = spot;
    if (previous) render(previous);
    if (spot) render(spot);
    onChange();
  }

  return {
    /** Shows the sessions of a day ("YYYY-MM-DD"). */
    setDay(d) {
      day = d;
      for (const spot of spots.values()) render(spot);
      onChange();
    },
    show(on) {
      group.visible = on;
      if (!on && selected) select(null);
      onChange();
    },
    get visible() {
      return group.visible;
    },
    /** Shows the markers and opens the card of the spot of a place. */
    focus(place) {
      const spot = [...spots.values()].find((s) => s.names.includes(place));
      if (!spot) return;
      group.visible = true;
      select(spot);
    },
    /** Closes the open card. */
    deselect() {
      if (selected) select(null);
    },
    /** { x0, x1, z0, z1 } around the located places. */
    bounds() {
      const xs = [...spots.values()].map((s) => s.at.x),
        zs = [...spots.values()].map((s) => s.at.z);
      return xs.length ? { x0: Math.min(...xs), x1: Math.max(...xs), z0: Math.min(...zs), z1: Math.max(...zs) } : null;
    },
    dispose() {
      scene.remove(group);
      group.traverse((o) => o.element?.remove());
    },
  };
}
