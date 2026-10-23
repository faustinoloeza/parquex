import * as THREE from 'three';
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { ICON, SERVICE_TYPES } from './icons.js';
import { esc } from './dom.js';

/**
 * HTML markers anchored in the 3D scene (CSS2DObject):
 *  - numbered activity markers styled like the Android app (teal / orange circle
 *    with a white ring) that expand into a white card when selected
 *  - service chips (restrooms, lockers…), hidden until enabled in the sidebar
 */
export function createMarkers(scene, park, { t, lang, heightAt, onSelect, routeSlugOf, onDirections }) {
  const group = new THREE.Group();
  group.name = 'markers';
  scene.add(group);
  const items = [];
  for (const poi of park.pois) {
    if (!poi.active) continue;
    const anchor = document.createElement('div');
    anchor.className = 'marker-anchor';
    const el = document.createElement('div');
    el.className = 'activity-marker';
    el.tabIndex = 0;
    el.setAttribute('role', 'button');
    const name = poi.name[lang] ?? poi.name.es;
    const route = poi.route[lang] ?? poi.route.es;
    const category = poi.category[lang] ?? poi.category.es;
    const slug = routeSlugOf(poi);
    const routeDef = park.routes.find((r) => r.slug === slug);
    el.setAttribute('aria-label', `${poi.number} ${name}`);
    // colour as in the Android app: teal = included, orange = additional cost
    el.dataset.cost = poi.extraCost ? 'extra' : 'included';
    el.innerHTML = `
      <div class="activity-marker-number">${poi.number}</div>
      <div class="activity-marker-name">${esc(name)}</div>
      <div class="activity-marker-included">${esc(t(poi.extraCost ? 'lbl_map_activity_not_included' : 'lbl_map_activity_included'))}</div>
      ${route ? `<div class="activity-marker-route">${routeDef ? `<i style="--c:${routeDef.color};--k:${routeDef.casing}"></i>` : ''}${esc(route)}</div>` : ''}
      <div class="activity-marker-category">${esc(category ?? '')}${poi.hours ? ` · <b>${esc(poi.hours)}</b>` : ''}${poi.desc ? `<br>${esc(poi.desc)}` : ''}</div>
      ${onDirections ? `<button type="button" class="activity-marker-go">${ICON.directions}<span>${esc(t('nav_directions'))}</span></button>` : ''}`;
    anchor.appendChild(el);
    const obj = new CSS2DObject(anchor);
    obj.position.set(poi.x, Math.max(heightAt(poi.x, poi.z), 0.5) + 2.5, poi.z);
    group.add(obj);
    const item = { poi, el, obj, slug, visible: true, selected: false };
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      if (e.target.closest('.activity-marker-go')) return onDirections(poi);
      onSelect(item.selected ? null : poi);
    });
    el.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && !e.target.closest('.activity-marker-go')) {
        e.preventDefault();
        onSelect(item.selected ? null : poi);
      }
    });
    items.push(item);
  }

  const services = [];
  for (const s of park.services ?? []) {
    const type = SERVICE_TYPES[s.type];
    if (!type) continue;
    const anchor = document.createElement('div');
    anchor.className = 'marker-anchor';
    const el = document.createElement('div');
    el.className = 'service-chip';
    el.style.setProperty('--c', type.color);
    el.title = `${type.label[lang] ?? type.label.es}${s.note ? ` · ${s.note}` : ''}`;
    el.innerHTML = type.icon;
    anchor.appendChild(el);
    const obj = new CSS2DObject(anchor);
    obj.position.set(s.x, Math.max(heightAt(s.x, s.z), 0.5) + 1.5, s.z);
    obj.visible = false;
    group.add(obj);
    services.push({ s, obj });
  }

  return {
    group,
    items,
    select(poi) {
      for (const item of items) {
        const on = !!poi && item.poi.id === poi.id;
        item.selected = on;
        item.el.className = on ? 'activity-marker-selected' : 'activity-marker';
        if (on) item.obj.visible = true;
        else item.obj.visible = item.visible;
      }
    },
    // fn(poi) -> boolean
    filter(fn) {
      for (const item of items) {
        item.visible = fn(item.poi, item.slug);
        item.obj.visible = item.visible || item.selected;
      }
    },
    showServices(types) {
      for (const { s, obj } of services) obj.visible = types.has(s.type);
    },
    // Keep the selected card above the others (CSS2DRenderer rewrites zIndex).
    afterRender() {
      for (const item of items) if (item.selected) item.obj.element.style.zIndex = '100000';
    },
    /** Removes the markers and their HTML (the focused park changed). */
    dispose() {
      scene.remove(group);
      group.traverse((o) => o.element?.remove());
    },
  };
}
