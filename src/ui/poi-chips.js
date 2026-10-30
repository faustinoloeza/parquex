import { CATEGORY_STYLE, SERVICE_TYPES } from './icons.js';
import { esc } from './dom.js';
import { localized } from '../i18n/index.js';

export const OTHER = 'other';
const OTHER_COLOR = '#9aa5a8';
/** Categories without a style of their own (icons.js) take these, in order (Android app palette). */
const CATEGORY_COLORS = ['#0e7c86', '#f08a24', '#7a5af8', '#2e9e5b', '#d6457a', '#1670d6'];

/** { x0, x1, z0, z1 } around [x, z] points, or null. */
function boundsOf(points) {
  if (!points.length) return null;
  const xs = points.map((p) => p[0]),
    zs = points.map((p) => p[1]);
  return { x0: Math.min(...xs), x1: Math.max(...xs), z0: Math.min(...zs), z1: Math.max(...zs) };
}

/**
 * Activity groups for the filter chips, as in the Android app (PoiFilters.kt):
 * one per official route (poi.route.es = route.name.es) or, in parks without
 * routes, one per category; active activities that fit none go to OTHER.
 * @param {object} park park.json data
 * @param {(value: object) => string} L picks the UI language from { es, en }
 * @returns {{ groups: Array<{ key: string, kind: 'route' | 'category' | 'other', label: string | null, color: string,
 *   casing: string, count: number, bounds: { x0: number, x1: number, z0: number, z1: number } | null, slug?: string }>,
 *   groupOf: (poi: object) => string | null }}
 */
export function groupsOf(park, L) {
  const pois = park.pois.filter((p) => p.active);
  const keyOf = new Map();
  const groups = [];
  if (park.routes.length) {
    const byName = new Map(park.routes.map((r) => [r.name.es, r]));
    for (const p of pois) {
      const r = byName.get(p.route?.es);
      if (r) keyOf.set(p.id, `route:${r.slug}`);
    }
    for (const r of park.routes) {
      const key = `route:${r.slug}`;
      groups.push({
        key,
        kind: 'route',
        label: L(r.label) || L(r.name),
        color: r.color,
        casing: r.casing,
        slug: r.slug,
        count: pois.filter((p) => keyOf.get(p.id) === key).length,
        bounds: boundsOf(r.lines.flat()),
      });
    }
  } else {
    const categories = [...new Set(pois.map((p) => p.category.es).filter(Boolean))];
    let spare = 0;
    for (const c of categories) {
      const key = `cat:${c}`;
      const members = pois.filter((p) => p.category.es === c);
      for (const p of members) keyOf.set(p.id, key);
      const color = CATEGORY_STYLE[c]?.color ?? CATEGORY_COLORS[spare++ % CATEGORY_COLORS.length];
      const bounds = boundsOf(members.map((p) => [p.x, p.z]));
      groups.push({ key, kind: 'category', label: L(members[0].category) || c, color, casing: color, count: members.length, bounds });
    }
  }
  const others = pois.filter((p) => !keyOf.has(p.id));
  if (others.length) {
    const bounds = boundsOf(others.map((p) => [p.x, p.z]));
    groups.push({ key: OTHER, kind: 'other', label: null, color: OTHER_COLOR, casing: OTHER_COLOR, count: others.length, bounds });
  }
  return { groups, groupOf: (p) => keyOf.get(p.id) ?? (p.active ? OTHER : null) };
}

/** Relative luminance (0 … 1) of a #rrggbb color. */
function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Map filters on phones, as in the Android app (GroupRow / GroupChip): a
 * scrolling row of chips over the bottom of the map, one per route (or
 * category) plus the park services. Several can be on at once; an activity
 * marker shows when its group is on, and switching a chip on frames its area.
 *
 * @param {HTMLElement} root
 * @param {object} options
 * @param {object} options.park     park.json data
 * @param {string} options.lang
 * @param {(key: string) => string} options.t
 * @param {(filter: { visible: (poi: object) => boolean, services: Set<string> }) => void} options.onFilter
 * @param {(slugs: Set<string>) => void} options.onRoutes   routes of the active chips (highlighted)
 * @param {(bounds: { x0: number, x1: number, z0: number, z1: number }) => void} options.onFrame
 */
export function createPoiChips(root, { park, lang, t, onFilter, onRoutes, onFrame }) {
  const L = (value) => localized(value, lang);
  const { groups, groupOf } = groupsOf(park, L);
  const serviceTypes = new Set((park.services ?? []).map((s) => s.type));
  const services = Object.entries(SERVICE_TYPES)
    .filter(([type]) => serviceTypes.has(type))
    .map(([type, st]) => {
      const points = park.services.filter((s) => s.type === type).map((s) => [s.x, s.z]);
      return {
        key: `svc:${type}`,
        kind: 'service',
        type,
        label: L(st.label),
        color: st.color,
        icon: st.icon,
        count: points.length,
        bounds: boundsOf(points),
      };
    });
  const chips = [...groups, ...services];
  const active = new Set();

  const swatch = (c) =>
    c.kind === 'route' ? '<span class="chip-line"></span>' : c.kind === 'service' ? c.icon : '<span class="chip-dot"></span>';
  const el = document.createElement('nav');
  el.className = 'poi-chips';
  el.setAttribute('aria-label', t('mapFilters'));
  el.innerHTML = chips
    .map((c) => {
      // a white line is drawn by its outline, so that is its accent
      const accent = luminance(c.color) > 0.8 ? c.casing : c.color;
      return `<button type="button" class="chip" data-key="${esc(c.key)}" aria-pressed="false" style="--c:${accent};--line:${c.color};--k:${c.casing}">
        ${swatch(c)}<span>${esc(c.label ?? t('otherPois'))}</span><span class="chip-count">${c.count}</span></button>`;
    })
    .join('');
  root.appendChild(el);

  function emit() {
    onFilter({
      visible: (p) => active.has(groupOf(p)),
      services: new Set(services.filter((s) => active.has(s.key)).map((s) => s.type)),
    });
    onRoutes(new Set(groups.filter((g) => g.slug && active.has(g.key)).map((g) => g.slug)));
  }

  el.addEventListener('click', (e) => {
    const button = e.target.closest('[data-key]');
    const chip = button && chips.find((c) => c.key === button.dataset.key);
    if (!chip) return;
    const on = !active.has(chip.key);
    if (on) active.add(chip.key);
    else active.delete(chip.key);
    button.setAttribute('aria-pressed', String(on));
    emit();
    if (on && chip.bounds) onFrame(chip.bounds);
  });

  // start with no activity markers on the map, as on desktop
  emit();

  return { el, remove: () => el.remove() };
}
