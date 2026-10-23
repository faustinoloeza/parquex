import * as THREE from 'three';
import { m4 } from './geometry.js';

// Building pieces used by the generic buildings layer: facade walls, parapets,
// posts and thatched roofs.

/** Vertical walls for a polygon with UVs in facade bays (u: 3.2 m, v: 3.3 m). */
export function facadeWalls(poly, y0, height) {
  const pos = [],
    uv = [];
  for (let i = 0; i < poly.length; i++) {
    const [x0, z0] = poly[i],
      [x1, z1] = poly[(i + 1) % poly.length];
    const len = Math.hypot(x1 - x0, z1 - z0);
    // whole bays per wall so windows are not cut at the corners
    const bays = Math.max(1, Math.round(len / 3.2));
    const u0 = 0,
      u1 = bays,
      v0 = 0,
      v1 = height / 3.3;
    const y1 = y0 + height;
    // polygons with positive shoelace area (x, z) face outward with this winding
    pos.push(x0, y0, z0, x1, y1, z1, x1, y0, z1, x0, y0, z0, x0, y1, z0, x1, y1, z1);
    uv.push(u0, v0, u1, v1, u1, v0, u0, v0, u0, v1, u1, v1);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.computeVertexNormals();
  return g;
}

/** Thin parapet ring around a flat roof; returns [geometry, matrix] pairs. */
export function parapet(poly, y, h = 0.6, t = 0.25) {
  const parts = [];
  for (let i = 0; i < poly.length; i++) {
    const [x0, z0] = poly[i],
      [x1, z1] = poly[(i + 1) % poly.length];
    const len = Math.hypot(x1 - x0, z1 - z0);
    const g = new THREE.BoxGeometry(len + t, h, t);
    g.translate(0, h / 2, 0);
    parts.push([g, m4((x0 + x1) / 2, y, (z0 + z1) / 2, -Math.atan2(z1 - z0, x1 - x0))]);
  }
  return parts;
}

/** Posts along the edges of a rotated rectangle (open-sided palapas). */
export function posts(batch, x, y, z, length, width, angle, height, step = 3.5) {
  const nx = Math.max(1, Math.round(length / step)),
    nz = Math.max(1, Math.round(width / step));
  const c = Math.cos(-angle),
    s = Math.sin(-angle);
  const post = new THREE.CylinderGeometry(0.14, 0.16, height, 5);
  post.translate(0, height / 2, 0);
  const add = (lx, lz) => batch.add('wood', post.clone(), m4(x + lx * c + lz * s, y, z - lx * s + lz * c));
  for (let i = 0; i <= nx; i++) for (const lz of [-width / 2, width / 2]) add(-length / 2 + (i / nx) * length, lz);
  for (let j = 1; j < nz; j++) for (const lx of [-length / 2, length / 2]) add(lx, -width / 2 + (j / nz) * width);
}

/** Thatched cone (or cone section when `top` > 0) with UVs in meters / 3. */
export function coneRoof(radius, height, segments = 14, top = 0) {
  const g =
    top > 0
      ? new THREE.CylinderGeometry(top, radius, height, segments, 2, true)
      : new THREE.ConeGeometry(radius, height, segments, 2, true);
  const slope = Math.hypot(radius - top, height);
  const uv = g.getAttribute('uv');
  for (let i = 0; i < uv.count; i++) uv.setXY(i, (uv.getX(i) * (Math.PI * 2 * radius)) / 3, (uv.getY(i) * slope) / 3);
  g.translate(0, height / 2, 0);
  return g;
}

/** Big round palapas in Xcaret have stepped (two or three tier) thatched roofs. */
export function tieredRoof(batch, x, y, z, r, h) {
  const tiers = r > 14 ? 3 : 2;
  let rr = r,
    yy = y;
  for (let t = 0; t < tiers; t++) {
    const last = t === tiers - 1;
    const th = last ? h * 0.55 : h * 0.32;
    const topR = last ? 0 : rr * 0.52;
    batch.add('thatch', coneRoof(rr, th, Math.max(12, Math.round(rr * 1.5)), topR), m4(x, yy, z));
    yy += th * 0.82;
    rr = topR * 1.22;
  }
}
