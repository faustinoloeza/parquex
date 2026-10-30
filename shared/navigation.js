// Walking navigation helpers (pure, tested): where the walk starts (real or
// simulated location), progress along a route, step advancement, off-route
// detection and the texts of the guidance banner. The routes themselves come
// from shared/nav-graph.js. See docs/arquitectura.md, «Navegación a pie».

import { NAV, cumulative, pointAlong, projectSegment } from './nav-graph.js';

export const GUIDANCE = {
  /** m outside the designed area beyond which the real location is not used (simulated at the entrance) */
  farFromPark: 300,
  /** m from the route beyond which a new route is computed */
  offRoute: 25,
  /** m from the destination at which the walk ends */
  arrive: 12,
  /** m: a maneuver closer than this is "now" */
  now: 8,
  /** m searched behind / ahead of the last known position on the route */
  back: 40,
  ahead: 120,
};

/** Activity names that mark the park entrance, by priority (accents and case ignored). */
const ENTRANCE_NAMES = [/^(entrada|acceso|ingreso)( principal| al parque| y salida.*)?$/, /^ingreso/, /^plaza principal$/, /^taquillas?\b/];

const plain = (s) =>
  String(s ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim();

/**
 * The park entrance, where a simulated walk starts: `override` (park definition
 * → sources.entrance, local meters) if given; else the active activity whose
 * Spanish name reads as the entrance ("Entrada", "Acceso", "Ingreso…", "Plaza
 * Principal", "Taquillas"), else the first active activity, else the center of
 * the designed area.
 * @param {{ pois?: object[], clear?: { cx: number, cz: number } }} park  park.json
 * @param {{ x: number, z: number }} [override]
 * @returns {{ x: number, z: number, name?: { es: string, en?: string } }}
 */
export function findEntrance(park, override) {
  if (override && Number.isFinite(override.x) && Number.isFinite(override.z)) return { x: override.x, z: override.z, name: override.name };
  const pois = (park.pois ?? []).filter((p) => p.active !== false);
  for (const re of ENTRANCE_NAMES) {
    const p = pois.find((q) => re.test(plain(q.name?.es)));
    if (p) return { x: p.x, z: p.z, name: p.name };
  }
  if (pois.length) return { x: pois[0].x, z: pois[0].z, name: pois[0].name };
  return { x: park.clear?.cx ?? 0, z: park.clear?.cz ?? 0 };
}

/**
 * Where the walk starts.
 *  - `manual` (a point the user tapped on the map) wins;
 *  - a location fix inside the park, or less than GUIDANCE.farFromPark m outside
 *    its designed area, is used as is;
 *  - otherwise (far away, permission denied, no location) the entrance, simulated.
 * @param {object} input
 * @param {{ x: number, z: number, accuracy?: number, heading?: number | null } | null} input.fix  real location, local meters
 * @param {'denied' | 'unavailable' | null} [input.error]
 * @param {(x: number, z: number) => number} input.signedDistance   designed area (< 0 inside)
 * @param {{ x: number, z: number }} input.entrance
 * @param {{ x: number, z: number } | null} [input.manual]
 * @returns {{ x: number, z: number, simulated: boolean, reason: 'gps' | 'manual' | 'far' | 'denied' | 'unavailable' | 'waiting', accuracy?: number, heading?: number | null }}
 */
export function chooseStart({ fix, error = null, signedDistance, entrance, manual = null, far = GUIDANCE.farFromPark }) {
  if (manual) return { x: manual.x, z: manual.z, simulated: true, reason: 'manual' };
  if (fix && signedDistance(fix.x, fix.z) <= far)
    return { x: fix.x, z: fix.z, simulated: false, reason: 'gps', accuracy: fix.accuracy, heading: fix.heading ?? null };
  const reason = fix ? 'far' : (error ?? 'waiting');
  return { x: entrance.x, z: entrance.z, simulated: true, reason };
}

/**
 * A route ready for guidance: the polyline with its cumulative distances.
 * @param {{ points: number[][], steps: object[], length: number }} r  shared/nav-graph.js → route()
 */
export function prepareRoute(r) {
  return { ...r, cum: cumulative(r.points) };
}

/**
 * Closest point of the route to (x, z), searched first around `hint` (meters
 * along the route of the last position: a route that comes back near itself
 * does not make the position jump), then over the whole route.
 * @returns {{ along: number, dist: number, x: number, z: number }}
 */
export function locateOnRoute({ points, cum }, x, z, hint = null) {
  const scan = (from, to) => {
    let best = null;
    for (let i = 1; i < points.length; i++) {
      if (cum[i] < from || cum[i - 1] > to) continue;
      const [ax, az] = points[i - 1],
        [bx, bz] = points[i];
      const len = cum[i] - cum[i - 1] || 1;
      let { t } = projectSegment(x, z, ax, az, bx, bz);
      // stay inside the window
      t = Math.max((from - cum[i - 1]) / len, Math.min((to - cum[i - 1]) / len, t));
      t = Math.max(0, Math.min(1, t));
      const px = ax + (bx - ax) * t,
        pz = az + (bz - az) * t;
      const d = Math.hypot(x - px, z - pz);
      if (!best || d < best.dist) best = { along: cum[i - 1] + len * t, dist: d, x: px, z: pz };
    }
    return best;
  };
  if (hint !== null) {
    const local = scan(hint - GUIDANCE.back, hint + GUIDANCE.ahead);
    if (local && local.dist <= GUIDANCE.offRoute) return local;
  }
  return scan(-Infinity, Infinity);
}

/**
 * Guidance state at a position: progress, the next maneuver and whether the
 * walker left the route or arrived.
 * @param {ReturnType<typeof prepareRoute>} r
 * @param {{ x: number, z: number }} pos
 * @param {{ hint?: number | null, destination?: { x: number, z: number } }} [options]
 * @returns {{ along: number, dist: number, remaining: number, next: number, toNext: number, offRoute: boolean, arrived: boolean }}
 *          next: index of the upcoming step (maneuver) in r.steps; toNext: meters to it
 */
export function guidance(r, pos, { hint = null, destination } = {}) {
  const at = locateOnRoute(r, pos.x, pos.z, hint);
  const L = r.cum.at(-1);
  const remaining = Math.max(0, L - at.along);
  const end = destination ?? { x: r.points.at(-1)[0], z: r.points.at(-1)[1] };
  const arrived =
    Math.hypot(pos.x - end.x, pos.z - end.z) < GUIDANCE.arrive || (remaining < GUIDANCE.arrive && at.dist < GUIDANCE.offRoute);
  // the next maneuver still ahead (a couple of meters of slack once it is passed)
  let next = r.steps.length - 1;
  for (let i = 1; i < r.steps.length; i++)
    if (r.steps[i].along > at.along + 2) {
      next = i;
      break;
    }
  return {
    along: at.along,
    dist: at.dist,
    remaining,
    next,
    toNext: Math.max(0, r.steps[next].along - at.along),
    offRoute: !arrived && at.dist > GUIDANCE.offRoute,
    arrived,
  };
}

/**
 * Simulated walker: position and heading after walking `s` meters along the route.
 * @returns {{ x: number, z: number, dx: number, dz: number }}
 */
export function walkerAt({ points, cum }, s) {
  const p = pointAlong(points, cum, s);
  return { x: p.x, z: p.z, dx: p.dx, dz: p.dz };
}

/** Walking minutes for a distance (at least 1). */
export const walkMinutes = (meters, speed = NAV.speed) => Math.max(1, Math.round(meters / speed / 60));

/** Languages that write a decimal comma ("1,2 km"). */
const DECIMAL_COMMA = new Set(['es', 'fr', 'pt', 'it']);

/** "40 m", "350 m", "1.2 km" (rounded like a walking app: 5 m steps under 100 m, 10 m under 1 km). */
export function formatDistance(m, lang = 'es') {
  if (m >= 1000) return `${(m / 1000).toFixed(1).replace('.', DECIMAL_COMMA.has(lang) ? ',' : '.')} km`;
  const step = m < 100 ? 5 : 10;
  return `${Math.max(step, Math.round(m / step) * step)} m`;
}

const lowerFirst = (s) => (s ? s[0].toLowerCase() + s.slice(1) : s);

/**
 * Main line of the guidance banner: "En 40 m gira a la izquierda", the
 * maneuver alone when it is a few meters away, "Has llegado" at the end.
 * @param {ReturnType<typeof prepareRoute>} r
 * @param {ReturnType<typeof guidance>} g
 * @param {(key: string) => string} t
 * @param {string} [lang]
 */
export function bannerText(r, g, t, lang = 'es') {
  if (g.arrived) return t('nav_arrived');
  const step = r.steps[g.next];
  if (g.toNext <= GUIDANCE.now) return step.instruction;
  return t('nav_in').replace('{dist}', formatDistance(g.toNext, lang)).replace('{text}', lowerFirst(step.instruction));
}
