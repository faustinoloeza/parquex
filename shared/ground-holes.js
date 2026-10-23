// Holes that landmarks cut in the ground (sunken moats, ponds): the terrain
// mesh is not drawn there, so the model shows what lies below ground level
// (walls going down, a canyon floor, water). Used by the app's terrain, the
// mobile export, the lamps and the data pipeline (no trees, no walkways).
//
// A hole is one or more closed rings in absolute meters filled with the
// even-odd rule: an outer ring with island rings inside is a moat around the
// islands. Separate holes add up.

/**
 * @typedef {object} GroundHole
 * @property {number[][][]} rings  closed rings [[x, z], …] (absolute meters), even-odd
 * @property {number} [cover]      meters above the landmark's base at which overlays that
 *                                 cross the hole (walkways, the navigation route) are drawn:
 *                                 the deck of the bridge over it; none → the terrain
 * @property {{ x: number, z: number, y?: number }} [base]  the landmark's placement (its base is
 *                                 `y`, or the terrain height there)
 */

/**
 * @param {GroundHole[]} holes
 */
export function makeGroundHoles(holes = []) {
  const list = holes.map((hole) => {
    // edges as flat [ax, az, bx, bz] with their bounding boxes, for fast rejection
    const edges = [];
    let x0 = Infinity,
      z0 = Infinity,
      x1 = -Infinity,
      z1 = -Infinity;
    for (const ring of hole.rings) {
      for (let i = 0; i < ring.length; i++) {
        const [ax, az] = ring[i],
          [bx, bz] = ring[(i + 1) % ring.length];
        edges.push([ax, az, bx, bz]);
        x0 = Math.min(x0, ax);
        z0 = Math.min(z0, az);
        x1 = Math.max(x1, ax);
        z1 = Math.max(z1, az);
      }
    }
    return { hole, edges, box: [x0, z0, x1, z1] };
  });

  const inside = (h, x, z) => {
    const [x0, z0, x1, z1] = h.box;
    if (x < x0 || x > x1 || z < z0 || z > z1) return false;
    let c = false;
    for (const [ax, az, bx, bz] of h.edges) if (az > z !== bz > z && x < ((bx - ax) * (z - az)) / (bz - az) + ax) c = !c;
    return c;
  };

  /** The hole at (x, z), or null. */
  const at = (x, z) => list.find((h) => inside(h, x, z))?.hole ?? null;

  return {
    /** No holes at all (callers skip the work). */
    empty: list.length === 0,
    at,
    contains: (x, z) => at(x, z) !== null,

    /** Is (x, z) inside a hole or within `d` meters of its edge? */
    near(x, z, d) {
      for (const h of list) {
        const [x0, z0, x1, z1] = h.box;
        if (x < x0 - d || x > x1 + d || z < z0 - d || z > z1 + d) continue;
        if (inside(h, x, z)) return true;
        for (const e of h.edges) if (segmentDistance(x, z, e) < d) return true;
      }
      return false;
    },

    /**
     * Where the rectangle [x0, x1] × [z0, z1] lies: 0 outside every hole,
     * 1 inside one, 2 across an edge.
     */
    classify(x0, z0, x1, z1) {
      for (const h of list) {
        const b = h.box;
        if (x1 < b[0] || x0 > b[2] || z1 < b[1] || z0 > b[3]) continue;
        for (const [ax, az, bx, bz] of h.edges) {
          if (Math.max(ax, bx) < x0 || Math.min(ax, bx) > x1 || Math.max(az, bz) < z0 || Math.min(az, bz) > z1) continue;
          if (segmentCrossesRect(ax, az, bx, bz, x0, z0, x1, z1)) return 2;
        }
      }
      return at((x0 + x1) / 2, (z0 + z1) / 2) ? 1 : 0;
    },
  };
}

/**
 * Height of what people walk on: the deck of a bridge over a hole (its
 * `cover`), the terrain elsewhere.
 * @param {(x: number, z: number) => number} heightAt
 * @param {ReturnType<typeof makeGroundHoles>} holes
 */
export function surfaceSampler(heightAt, holes) {
  if (holes.empty) return heightAt;
  return (x, z) => {
    const h = holes.at(x, z);
    if (h?.cover == null) return heightAt(x, z);
    const { base } = h;
    return (base.y ?? heightAt(base.x, base.z)) + h.cover;
  };
}

/** Does the segment a–b touch the rectangle? (Liang–Barsky clipping) */
function segmentCrossesRect(ax, az, bx, bz, x0, z0, x1, z1) {
  const dx = bx - ax,
    dz = bz - az;
  let t0 = 0,
    t1 = 1;
  const clip = (p, q) => {
    if (p === 0) return q >= 0;
    const r = q / p;
    if (p < 0) {
      if (r > t1) return false;
      if (r > t0) t0 = r;
    } else {
      if (r < t0) return false;
      if (r < t1) t1 = r;
    }
    return true;
  };
  return clip(-dx, ax - x0) && clip(dx, x1 - ax) && clip(-dz, az - z0) && clip(dz, z1 - az);
}

function segmentDistance(x, z, [ax, az, bx, bz]) {
  const dx = bx - ax,
    dz = bz - az,
    L2 = dx * dx + dz * dz || 1;
  const t = Math.max(0, Math.min(1, ((x - ax) * dx + (z - az) * dz) / L2));
  return Math.hypot(x - (ax + dx * t), z - (az + dz * t));
}
