// Activities of each park, written in src/parks/<key>/activities.js (Xcaret and
// Xel-Há: as their official maps listed them; the other parks: placed by hand).
// Stage parkData turns them into park.json `pois`.

/**
 * @typedef {object} LocalActivity   one entry of src/parks/<key>/activities.js
 * @property {string} [id]            stable id (default `<park>-<number>`); needed when numbers repeat
 * @property {number} number          number shown on the marker
 * @property {{ es: string, en: string }} name
 * @property {{ es: string, en: string }} category
 * @property {boolean} [extraCost]    not included in the ticket
 * @property {number} [x]             local meters (x = east, z = south)…
 * @property {number} [z]
 * @property {number} [lat]           …or geographic coordinates
 * @property {number} [lng]
 * @property {{ es: string | null, en: string | null }} [route]  official route it belongs to
 * @property {boolean} [active]       false: listed but not shown
 * @property {string} [hours]         opening hours ("12:00 - 17:00")
 * @property {string} [desc]          short description
 * @property {boolean} [seasonal]     open only in season
 */

/**
 * @param {LocalActivity[]} list
 * @param {{ key: string, projection: { toLocal: Function, toLatLng: Function }, sampleHeight: (x: number, z: number) => number }} ctx
 */
export function localActivities(list, { key, projection, sampleHeight }) {
  return list
    .map((a) => {
      const hasLocal = Number.isFinite(a.x) && Number.isFinite(a.z);
      if (!hasLocal && !(Number.isFinite(a.lat) && Number.isFinite(a.lng))) throw new Error(`activity ${a.number}: needs x/z or lat/lng`);
      const [x, z] = hasLocal ? [a.x, a.z] : projection.toLocal(a.lat, a.lng);
      const [lat, lng] = hasLocal ? projection.toLatLng(x, z) : [a.lat, a.lng];
      return {
        id: a.id ?? `${key}-${a.number}`,
        number: a.number,
        lat: hasLocal ? +lat.toFixed(7) : lat,
        lng: hasLocal ? +lng.toFixed(7) : lng,
        x: +x.toFixed(2),
        z: +z.toFixed(2),
        y: +Math.max(0, sampleHeight(x, z)).toFixed(2),
        extraCost: !!a.extraCost,
        active: a.active ?? true,
        name: { es: a.name.es ?? a.name.en, en: a.name.en ?? a.name.es },
        category: { es: a.category?.es ?? null, en: a.category?.en ?? null },
        route: { es: a.route?.es ?? null, en: a.route?.en ?? null },
        ...(a.hours && { hours: a.hours }),
        ...(a.desc && { desc: a.desc }),
        ...(a.seasonal && { seasonal: true }),
      };
    })
    .sort((a, b) => a.number - b.number);
}
