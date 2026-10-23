/**
 * @typedef {object} ParkSources  inputs of the data pipeline
 * @property {string} code            short park code (park.json → code)
 * @property {'satellite'} [mode]     'satellite': no official illustration / map config; the land cover comes
 *                                    from satellite imagery + OSM (docs/agregar-parque.md). Needs center, extent
 *                                    and osmPark instead of mapFrame / illustration.
 * @property {{ latitude: number, longitude: number, bound1Lat: number, bound1Long: number, bound2Lat: number, bound2Long: number }} [mapFrame]
 *                                    illustrated parks: center (origin of the local frame) and corner bounds of the map
 * @property {{ nodeScale: number, nodeTranslation: number[], sceneScale: number, scenePosition: number[], masks: number[][] }} [illustration]
 *                                    illustrated parks: placement of data/raw/<key>-illustration.png (not in the repository)
 * @property {{ lat: number, lng: number }} [center]   satellite mode: origin of the local frame (x = east, z = south)
 * @property {{ size: number, cx?: number, cz?: number }} [extent]   satellite mode: square (m) covered by the
 *                                    build grid and the satellite image, centered at (cx, cz) (default 0, 0)
 * @property {string} [osmPark]       satellite mode: OSM outline of the park ("way/<id>" or "relation/<id>");
 *                                    the designed area follows it (+ 25 m)
 * @property {boolean} [greenWater]  satellite mode: smooth, strongly green surfaces are water (murky canals and
 *                                    ponds, Xoximilco); off by default (lawns could match)
 * @property {number} [satelliteRelease]  Esri World Imagery Wayback release id: the satellite image comes from
 *                                    that dated capture instead of the live imagery (reproducible; avoids clouds)
 * @property {number[][]} [outline]   satellite mode: park outline as a polygon in local meters ([x, z] points),
 *                                    replacing the osmPark polygon for the designed area (+ 25 m); osmPark is
 *                                    still required (documentation / provenance)
 * @property {boolean} [straightOutline]  satellite mode: the outline has straight sides and sharp corners; the
 *                                    designed area follows it without the usual smoothing (pipeline/lib/clear-area.js)
 * @property {string | { shallow: string, deep: string }} [waterTint]   color of the lagoons, rivers and pools
 *                                    ('#rrggbb' or shallow / deep pair) instead of the default turquoise
 *                                    (the open sea keeps its colors)
 * @property {{ toward: string, lawn: number, reach: number, keep?: string[], keepReach?: number }} [groundGrade]
 *                                    regions: the jungle near park `toward` is lifted towards the lawn green
 *                                    (`lawn` × weight, 1 at its outline … 0 at `reach` m), held off along the
 *                                    parks of `keep` (pipeline/stages/textures.js → groundGrade)
 * @property {string} [name]          park name (default: the definition's name)
 * @property {{ open: string, close: string }} [hours]   park hours ("HH:MM")
 * @property {number[]} osmBBox       [west, south, east, north]
 * @property {number[]} [seaCorner]   open-sea pixel (0..1) to flood the coastline
 * @property {number} [waterHueMin]   lowest hue (degrees) read as water (default 170; lower for greener lagoons)
 * @property {{ x: number, z: number }} [entrance]  park entrance (local meters) where simulated walks start,
 *                                    when no activity is named like it (shared/navigation.js → findEntrance)
 *
 * @typedef {object} RouteStyle
 * @property {string} slug
 * @property {string} name            Spanish name, as in the official data
 * @property {string} color           line color
 * @property {string} casing          outline color
 * @property {{ es: string, en: string }} label
 * @property {string} [stroke]        stroke color on the illustration (pipeline/stages/routes.js)
 * @property {RegExp} [osm]           OSM way names that belong to the route
 * @property {number[][][]} [links]   hand-drawn stretches [[x, z], …] (local meters) added as they are,
 *                                    e.g. where the traced pieces stop short of each other
 *
 * @typedef {object} Landmark         a model of src/models placed in the park
 * @property {string} id
 * @property {string} type            model type (src/models/index.js)
 * @property {number} x
 * @property {number} z
 * @property {number} [y]
 * @property {number} [rotation]
 * @property {number} [clear]
 * @property {number[]} [replacesOsm]
 *
 * @typedef {object} ParkDefinition
 * @property {string} key             URL id (/xc/es)
 * @property {string} name
 * @property {string} [labelKey]      i18n key of the header button (every selectable park; regions have none)
 * @property {boolean} [region]       not a park: land around several parks (src/parks/xcr), built by the
 *                                    satellite-mode pipeline with only the overview ground tile and a thinned
 *                                    vegetation.bin. Never selectable (header switcher, URL, mobile export); the
 *                                    app draws it only as the lowest-priority neighbor of the parks it touches,
 *                                    under their designed areas (layers/neighbors.js). Needs sources.outline.
 * @property {ParkSources} sources
 * @property {RouteStyle[]} routes
 * @property {Landmark[]} landmarks
 * @property {object[]} edits         see src/parks/xc/edits.js
 * @property {object[]} vehicles      bus rows (shared/vehicles.js)
 * @property {object} fauna           see src/layers/fauna.js
 * @property {object[]} [activities]  activities (src/parks/<key>/activities.js, pipeline/lib/local-activities.js)
 * @property {Array<{ type: string, x: number, z: number, note?: string | null }>} [services]
 *                                    restrooms, lockers… (src/parks/<key>/services.js; types: src/ui/icons.js)
 */

/** @param {Partial<ParkDefinition> & Pick<ParkDefinition, 'key' | 'name' | 'sources'>} def */
export function definePark(def) {
  return { routes: [], landmarks: [], edits: [], vehicles: [], fauna: {}, activities: [], services: [], ...def };
}
