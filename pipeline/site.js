import { getModel, landmarkGroundHoles } from '#models/index.js';
import { makeGroundHoles } from '#shared/ground-holes.js';
import { BUS_CLEARANCE, expandBusRows } from '#shared/vehicles.js';
import { pointInPolygon } from './lib/raster.js';

/** Edit kinds understood by the pipeline (documented in src/parks/xc/edits.js). */
export const EDIT_KINDS = [
  'clearTrees',
  'ignoreRoofs',
  'keepRoofs',
  'satelliteCover',
  'pave',
  'plant',
  'water',
  'flatten',
  'keepOsmBuilding',
  'removeOsmPiers',
];

/** Meters around a ground hole kept clear too: the walls' copings. */
const HOLE_MARGIN = 1.2;

/** `pave` surfaces: stone paving (default) or packed earth (trails, vehicle tracks). */
export const PAVE_SURFACES = ['stone', 'dirt'];

/**
 * Turns a park definition (landmarks, edits, vehicles) into the questions the
 * pipeline stages ask about the site: where not to put trees, which painted
 * shapes are not roofs, where to pave, which OSM objects to keep or drop…
 * See src/parks/xc/edits.js for the list of edit kinds.
 * @param {import('#parks/define.js').ParkDefinition} park
 */
export function resolveSite(park) {
  const landmarks = park.landmarks;
  const byId = new Map(landmarks.map((l) => [l.id, l]));
  const placementOf = (l) => {
    const model = getModel(l.type);
    return { model, params: { ...model?.params, ...l } };
  };
  /** Absolute position of an edit: its own `at`, or the landmark it refers to. */
  const origin = (edit) => {
    if (!edit.landmark) return edit.at;
    const l = byId.get(edit.landmark);
    if (!l) throw new Error(`edit ${edit.kind}: unknown landmark "${edit.landmark}"`);
    return [l.x, l.z];
  };
  for (const e of park.edits) if (!EDIT_KINDS.includes(e.kind)) throw new Error(`unknown edit kind "${e.kind}"`);
  const edits = (kind) => park.edits.filter((e) => e.kind === kind);

  // areas kept free of generated trees and generic buildings
  const clearCircles = [
    ...landmarks.filter((l) => l.clear).map((l) => ({ x: l.x, z: l.z, r: l.clear })),
    ...edits('clearTrees')
      .filter((e) => e.radius)
      .map((e) => ({ x: origin(e)[0], z: origin(e)[1], r: e.radius })),
    ...expandBusRows(park.vehicles).map((b) => ({ x: b.x, z: b.z, r: BUS_CLEARANCE })),
  ];
  // clearTrees areas given as polygons (relative to `at`, like pave / plant)
  const clearPolygons = edits('clearTrees').flatMap((e) => {
    const [ox, oz] = origin(e);
    return (e.polygons ?? []).map((poly) => poly.map(([x, z]) => [ox + x, oz + z]));
  });
  const clearPaths = landmarks.flatMap((l) => {
    const { model, params } = placementOf(l);
    return model?.clearPaths?.(params) ?? [];
  });
  // sunken moats cut out of the ground by landmarks (and the wall tops around them)
  const holes = landmarkGroundHoles(landmarks);
  const sunken = makeGroundHoles(holes);
  const circles = (kind) => edits(kind).map((e) => ({ x: origin(e)[0], z: origin(e)[1], r: e.radius }));
  const ignoreRoofs = circles('ignoreRoofs');
  const keepRoofs = circles('keepRoofs');

  return {
    /** Is (x, z) within `pad` meters of an area that must stay clear? */
    isCleared(x, z, pad = 0) {
      for (const c of clearCircles) if (Math.hypot(x - c.x, z - c.z) < c.r + pad) return true;
      if (clearPolygons.some((poly) => pointInPolygon(x, z, poly))) return true;
      for (const c of clearPaths) {
        const pts = c.closed ? [...c.pts, c.pts[0]] : c.pts;
        for (let i = 1; i < pts.length; i++) if (segmentDistance(x, z, pts[i - 1], pts[i]) < c.width / 2 + pad) return true;
      }
      return sunken.near(x, z, HOLE_MARGIN + pad);
    },

    /** Areas landmarks cut out of the ground (shared/ground-holes.js), absolute. */
    groundHoles: holes,

    /** Shapes painted on the illustration around (x, z) are not roofs. */
    ignoresRoofs: (x, z) => ignoreRoofs.some((c) => Math.hypot(x - c.x, z - c.z) < c.r),

    /** Roofs painted around (x, z) are real even by the water or under trees (keepRoofs). */
    keepsRoofs: (x, z) => keepRoofs.some((c) => Math.hypot(x - c.x, z - c.z) < c.r),

    /** satelliteCover edits, in order: { label, x, z, radius }. */
    satelliteCovers: edits('satelliteCover').map((e) => ({
      label: `${origin(e)[0]},${origin(e)[1]}`,
      x: origin(e)[0],
      z: origin(e)[1],
      radius: e.radius,
    })),

    /** pave / plant / water edits in order, as absolute polygons (`lines` become strips); `surface` of pave edits. */
    groundEdits: park.edits
      .filter((e) => e.kind === 'pave' || e.kind === 'plant' || e.kind === 'water')
      .map((e) => {
        const [ox, oz] = origin(e);
        const polygons = [...(e.polygons ?? []), ...(e.lines ?? []).flatMap((l) => strokePolygons(l, e.width ?? 8))];
        if (e.surface !== undefined && (e.kind !== 'pave' || !PAVE_SURFACES.includes(e.surface)))
          throw new Error(`edit ${e.kind}: surface must be one of ${PAVE_SURFACES.join(', ')} (pave only), got "${e.surface}"`);
        return {
          kind: e.kind,
          cover: e.cover,
          surface: e.surface,
          polygons: polygons.map((poly) => poly.map(([x, z]) => [ox + x, oz + z])),
        };
      }),

    /** flatten edits: squares of terrain leveled to the height at their center. */
    flattens: edits('flatten').map((e) => ({ x: origin(e)[0], z: origin(e)[1], size: e.size })),

    /** OSM building id → forced roof type (keepOsmBuilding). */
    keptOsmBuildings: new Map(edits('keepOsmBuilding').map((e) => [e.osmId, e.roof])),

    /** OSM building ids replaced by landmarks. */
    replacedOsmBuildings: new Set(landmarks.flatMap((l) => l.replacesOsm ?? [])),

    /** Is an OSM pier centered at (x, z) re-modelled by hand? */
    isPierRemoved: (x, z) => edits('removeOsmPiers').some(({ bbox: b }) => x >= b[0] && x <= b[2] && z >= b[1] && z <= b[3]),

    /** Footprints of solid landmarks (absolute polygons) that routes go around. */
    solidFootprints() {
      const out = [];
      for (const l of landmarks) {
        const { model, params } = placementOf(l);
        const f = model?.footprint?.(params);
        if (f) out.push(footprintPolygon(f, l));
      }
      return out;
    },

    /** Lines visitors can walk on besides the ground (walkways over water). */
    walkableLines: () =>
      landmarks.flatMap((l) => {
        const { model, params } = placementOf(l);
        return model?.walkable?.(params) ?? [];
      }),
  };
}

/** A polyline `width` meters wide as polygons: one quad per segment and an octagon per vertex (round joints). */
function strokePolygons(pts, width) {
  const r = width / 2;
  const out = pts.map(([x, z]) =>
    Array.from({ length: 8 }, (_, k) => [x + r * Math.cos((k * Math.PI) / 4), z + r * Math.sin((k * Math.PI) / 4)]),
  );
  for (let i = 1; i < pts.length; i++) {
    const [x0, z0] = pts[i - 1],
      [x1, z1] = pts[i];
    const len = Math.hypot(x1 - x0, z1 - z0) || 1;
    const nx = (-(z1 - z0) / len) * r,
      nz = ((x1 - x0) / len) * r;
    out.push([
      [x0 + nx, z0 + nz],
      [x1 + nx, z1 + nz],
      [x1 - nx, z1 - nz],
      [x0 - nx, z0 - nz],
    ]);
  }
  return out;
}

function segmentDistance(x, z, [x0, z0], [x1, z1]) {
  const dx = x1 - x0,
    dz = z1 - z0,
    L2 = dx * dx + dz * dz || 1;
  const t = Math.max(0, Math.min(1, ((x - x0) * dx + (z - z0) * dz) / L2));
  return Math.hypot(x - (x0 + dx * t), z - (z0 + dz * t));
}

/** Footprint shape → absolute polygon, rotated like the 3D model. */
function footprintPolygon(f, l) {
  let pts;
  if (f.circle)
    pts = Array.from({ length: 24 }, (_, i) => [Math.cos((i / 24) * Math.PI * 2) * f.circle, Math.sin((i / 24) * Math.PI * 2) * f.circle]);
  else if (f.ellipse)
    pts = Array.from({ length: 24 }, (_, i) => [
      Math.cos((i / 24) * Math.PI * 2) * f.ellipse[0],
      Math.sin((i / 24) * Math.PI * 2) * f.ellipse[1],
    ]);
  else {
    const [w, d] = f.rect;
    pts = [
      [-w / 2, -d / 2],
      [w / 2, -d / 2],
      [w / 2, d / 2],
      [-w / 2, d / 2],
    ];
  }
  const r = l.rotation ?? 0,
    c = Math.cos(r),
    s = Math.sin(r);
  // same convention as the 3D model: object.rotation.y = -rotation
  return pts.map(([x, z]) => [l.x + x * c - z * s, l.z + x * s + z * c]);
}
