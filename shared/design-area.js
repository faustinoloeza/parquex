// The designed area of a park: the part of the official illustration that is
// not covered by its clouds, stored in park.json as a polar profile
// { cx, cz, radii[] } (radii at evenly spaced angles, counter-clockwise from +x
// seen with z pointing down, i.e. the angle of atan2(z, x)).
//
// Inside it the app draws the stylized 3D park; outside, the real map
// (OpenStreetMap tiles). Both blend across a band around the outline:
//
//   signed distance  -FADE.inner ........ 0 (outline) ........ +FADE.outer
//   fade             0 (3D park)                               1 (real map)

/** Width (m) of the blend band inside and outside the outline. */
export const FADE = { inner: 45, outer: 5 };

/** Generated objects (trees, buildings) stay this far (m) inside the outline. */
export const OBJECT_MARGIN = 30;

/**
 * @param {{ cx: number, cz: number, radii: number[] }} clear
 */
export function makeDesignArea({ cx, cz, radii }) {
  const n = radii.length;
  const minRadius = Math.min(...radii);
  const maxRadius = Math.max(...radii);

  /** Radius of the outline at `angle` (radians, atan2(z, x)), interpolated. */
  function radiusAt(angle) {
    const f = ((((angle / (Math.PI * 2)) * n) % n) + n) % n;
    const i = Math.floor(f),
      t = f - i;
    return radii[i] * (1 - t) + radii[(i + 1) % n] * t;
  }

  /** Signed distance (m, approximated radially) to the outline: < 0 inside. */
  function signedDistance(x, z) {
    const dx = x - cx,
      dz = z - cz;
    return Math.hypot(dx, dz) - radiusAt(Math.atan2(dz, dx));
  }

  return {
    cx,
    cz,
    radii,
    minRadius,
    maxRadius,
    radiusAt,
    signedDistance,
    /** 0 inside the designed area … 1 where only the real map shows. */
    fade(x, z) {
      const t = Math.min(1, Math.max(0, (signedDistance(x, z) + FADE.inner) / (FADE.inner + FADE.outer)));
      return t * t * (3 - 2 * t);
    },
    /** Is (x, z) at least `margin` meters inside the outline? */
    contains: (x, z, margin = 0) => signedDistance(x, z) < -margin,
    /**
     * Does the rectangle [x0, x1] × [z0, z1] show any of the designed area
     * (fade < 1 somewhere)? Sampled, conservative by a few meters.
     */
    touchesRect(x0, z0, x1, z1) {
      // quick rejects with the extreme radii
      const nx = Math.max(x0, Math.min(cx, x1)),
        nz = Math.max(z0, Math.min(cz, z1));
      if (Math.hypot(nx - cx, nz - cz) > maxRadius + FADE.outer) return false;
      const steps = 24;
      for (let j = 0; j <= steps; j++) {
        for (let i = 0; i <= steps; i++) {
          const x = x0 + ((x1 - x0) * i) / steps,
            z = z0 + ((z1 - z0) * j) / steps;
          if (signedDistance(x, z) < FADE.outer + 10) return true;
        }
      }
      return false;
    },
    /** Is the whole rectangle fully inside the designed area (fade = 0)? */
    coversRect(x0, z0, x1, z1) {
      const fx = Math.max(Math.abs(x0 - cx), Math.abs(x1 - cx)),
        fz = Math.max(Math.abs(z0 - cz), Math.abs(z1 - cz));
      return Math.hypot(fx, fz) < minRadius - FADE.inner;
    },
  };
}
