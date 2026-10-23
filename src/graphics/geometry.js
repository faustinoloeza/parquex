import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

// Geometry builders shared by the models and the generic buildings. Shapes are
// given as [x, z] point lists in meters; y is up.

/** Translation + rotation around Y (+ optional scale) as a Matrix4. */
export const m4 = (x = 0, y = 0, z = 0, ry = 0, sx = 1, sy = 1, sz = 1) =>
  new THREE.Matrix4().compose(
    new THREE.Vector3(x, y, z),
    new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), ry),
    new THREE.Vector3(sx, sy, sz),
  );

/** Non-indexed copy (three warns when converting an already non-indexed geometry). */
export const nonIndexed = (g) => (g.index ? g.toNonIndexed() : g);

/** Ellipse (or circle) outline with n points. */
export function ellipse(rx, rz, n = 40) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    pts.push([Math.cos(a) * rx, Math.sin(a) * rz]);
  }
  return pts;
}

/** Open cylinder / cone section with its base at y = 0. */
export function frustum(r0, r1, h, segs) {
  const g = r1 > 0 ? new THREE.CylinderGeometry(r1, r0, h, segs, 3, true) : new THREE.ConeGeometry(r0, h, segs, 3, true);
  g.translate(0, h / 2, 0);
  return g;
}

/** Fills the `color` attribute with one solid color. */
export function solidColor(g, hex) {
  const c = new THREE.Color(hex);
  const n = g.getAttribute('position').count;
  const arr = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) arr.set([c.r, c.g, c.b], i * 3);
  g.setAttribute('color', new THREE.BufferAttribute(arr, 3));
  return g;
}

// Builds a non-indexed geometry from a list of triangles with explicit UVs.
// tris: [[ax,ay,az, bx,by,bz, cx,cy,cz], ...]; uvs: [[au,av, bu,bv, cu,cv], ...]
export function trianglesGeometry(tris, uvs) {
  const pos = new Float32Array(tris.length * 9);
  const uv = new Float32Array(tris.length * 6);
  tris.forEach((t, i) => pos.set(t, i * 9));
  (uvs ?? []).forEach((t, i) => uv.set(t, i * 6));
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  g.computeVertexNormals();
  return g;
}

// Planar quad split in two triangles, uv in meters / texScale.
function quad(tris, uvs, a, b, c, d, texScale, slopeLen) {
  // a-b eave, d-c top edge
  const ab = Math.hypot(b[0] - a[0], b[2] - a[2]);
  const u0 = 0,
    u1 = ab / texScale;
  const offD = ((d[0] - a[0]) * (b[0] - a[0]) + (d[2] - a[2]) * (b[2] - a[2])) / Math.max(ab, 1e-6) / texScale;
  const offC = ((c[0] - a[0]) * (b[0] - a[0]) + (c[2] - a[2]) * (b[2] - a[2])) / Math.max(ab, 1e-6) / texScale;
  const v1 = slopeLen / texScale;
  tris.push([...a, ...b, ...c], [...a, ...c, ...d]);
  uvs.push([u0, 0, u1, 0, offC, v1], [u0, 0, offC, v1, offD, v1]);
}

// Hip roof over a length × width rectangle centered at the origin (length on X).
export function hipRoof(length, width, height, overhang = 0.6, texScale = 3) {
  let L = length + overhang * 2,
    W = width + overhang * 2;
  const swap = W > L;
  if (swap) [L, W] = [W, L];
  const r = (L - W) / 2;
  const hx = L / 2,
    hz = W / 2;
  const tris = [],
    uvs = [];
  const slope = Math.hypot(hz, height);
  const p = (x, y, z) => (swap ? [z, y, -x] : [x, y, z]);
  // south & north trapezoids
  quad(tris, uvs, p(-hx, 0, hz), p(hx, 0, hz), p(r, height, 0), p(-r, height, 0), texScale, slope);
  quad(tris, uvs, p(hx, 0, -hz), p(-hx, 0, -hz), p(-r, height, 0), p(r, height, 0), texScale, slope);
  // end triangles (degenerate quads)
  const slopeEnd = Math.hypot(hx - r, height);
  quad(tris, uvs, p(hx, 0, hz), p(hx, 0, -hz), p(r, height, 0), p(r, height, 0), texScale, slopeEnd);
  quad(tris, uvs, p(-hx, 0, -hz), p(-hx, 0, hz), p(-r, height, 0), p(-r, height, 0), texScale, slopeEnd);
  return trianglesGeometry(tris, uvs);
}

// Pyramid roof over a convex polygon [[x, z], ...] (counter-clockwise seen from above).
export function polygonPyramid(points, height, apex = [0, 0], texScale = 3) {
  const tris = [],
    uvs = [];
  for (let i = 0; i < points.length; i++) {
    const a = points[i],
      b = points[(i + 1) % points.length];
    const A = [a[0], 0, a[1]],
      B = [b[0], 0, b[1]],
      T = [apex[0], height, apex[1]];
    const mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const slope = Math.hypot(Math.hypot(mid[0] - apex[0], mid[1] - apex[1]), height);
    quad(tris, uvs, B, A, T, T, texScale, slope);
  }
  return trianglesGeometry(tris, uvs);
}

/** Annular sector [[x, z], ...] between radii r0 < r1 and angles a0 < a1 (0 = +x, π/2 = +z). */
export function annularSector(r0, r1, a0, a1, segs = 24) {
  const pts = [];
  for (let i = 0; i <= segs; i++) {
    const a = a0 + ((a1 - a0) * i) / segs;
    pts.push([Math.cos(a) * r1, Math.sin(a) * r1]);
  }
  for (let i = segs; i >= 0; i--) {
    const a = a0 + ((a1 - a0) * i) / segs;
    pts.push([Math.cos(a) * r0, Math.sin(a) * r0]);
  }
  return pts;
}

export function regularPolygon(n, radius, rotation = 0) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const a = rotation + (i / n) * Math.PI * 2;
    pts.push([Math.cos(a) * radius, Math.sin(a) * radius]);
  }
  return pts;
}

// Vertical prism walls (and optional top cap) for a polygon [[x, z], ...].
export function extrudePolygon(points, height, { top = true, bottom = false } = {}) {
  const shape = new THREE.Shape(points.map(([x, z]) => new THREE.Vector2(x, -z)));
  const g = new THREE.ExtrudeGeometry(shape, { depth: height, bevelEnabled: false, steps: 1 });
  g.rotateX(-Math.PI / 2);
  if (!top || !bottom) {
    // ExtrudeGeometry groups: 0 = caps, 1 = sides
    const keep = g.index ? g.toNonIndexed() : g;
    const pos = keep.getAttribute('position');
    const out = [];
    for (let i = 0; i < pos.count; i += 3) {
      const y0 = pos.getY(i),
        y1 = pos.getY(i + 1),
        y2 = pos.getY(i + 2);
      const flat = Math.abs(y0 - y1) < 1e-4 && Math.abs(y1 - y2) < 1e-4;
      if (flat && ((y0 > height / 2 && !top) || (y0 < height / 2 && !bottom))) continue;
      out.push(i);
    }
    const res = new THREE.BufferGeometry();
    for (const name of ['position', 'normal', 'uv']) {
      const src = keep.getAttribute(name);
      const arr = new Float32Array(out.length * 3 * src.itemSize);
      out.forEach((i, k) => {
        for (let j = 0; j < 3; j++)
          for (let c = 0; c < src.itemSize; c++) arr[(k * 3 + j) * src.itemSize + c] = src.array[(i + j) * src.itemSize + c];
      });
      res.setAttribute(name, new THREE.BufferAttribute(arr, src.itemSize));
    }
    return scaleUV(res, 0.25);
  }
  return scaleUV(g.index ? g.toNonIndexed() : g, 0.25);
}

export function scaleUV(g, s) {
  const uv = g.getAttribute('uv');
  if (uv) for (let i = 0; i < uv.array.length; i++) uv.array[i] *= s;
  return g;
}

// Planar-projected UVs in meters (box mapping), for textured stone & walls.
export function worldUV(g, scale = 0.25) {
  const pos = g.getAttribute('position');
  const nrm = g.getAttribute('normal');
  const uv = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) {
    const nx = Math.abs(nrm.getX(i)),
      ny = Math.abs(nrm.getY(i)),
      nz = Math.abs(nrm.getZ(i));
    const x = pos.getX(i),
      y = pos.getY(i),
      z = pos.getZ(i);
    let u, v;
    if (ny >= nx && ny >= nz) {
      u = x;
      v = z;
    } else if (nx >= nz) {
      u = z;
      v = y;
    } else {
      u = x;
      v = y;
    }
    uv[i * 2] = u * scale;
    uv[i * 2 + 1] = v * scale;
  }
  g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  return g;
}

// Extruded shape with holes: outer/holes are [[x, z], ...] lists.
export function extrudeWithHoles(outer, holes, height) {
  const shape = new THREE.Shape(outer.map(([x, z]) => new THREE.Vector2(x, -z)));
  for (const h of holes) shape.holes.push(new THREE.Path(h.map(([x, z]) => new THREE.Vector2(x, -z))));
  const g = new THREE.ExtrudeGeometry(shape, { depth: height, bevelEnabled: false, curveSegments: 16 });
  g.rotateX(-Math.PI / 2);
  return g;
}

// Extrudes a 2D profile (in the z/y plane) along +x for `length` meters, centered.
export function extrudeProfile(profile, length) {
  // rotating +90° about Y maps shape x -> world -z and depth -> world +x
  const shape = new THREE.Shape(profile.map(([z, y]) => new THREE.Vector2(-z, y)));
  const g = new THREE.ExtrudeGeometry(shape, { depth: length, bevelEnabled: false });
  g.rotateY(Math.PI / 2);
  g.translate(-length / 2, 0, 0);
  return g;
}

// Hipped roof for any simple polygon: slopes from the eaves up to the polygon
// inset by `inset` meters, closed by a flat top. points must be counter-
// clockwise in (x, z) shoelace terms (positive area), as written by the pipeline.
export function insetRoof(points, inset, height, overhang = 0.6, texScale = 3) {
  const n = points.length;
  const offset = (d) =>
    points.map((p, i) => {
      const a = points[(i - 1 + n) % n],
        b = points[(i + 1) % n];
      const e1 = [p[0] - a[0], p[1] - a[1]],
        e2 = [b[0] - p[0], b[1] - p[1]];
      const l1 = Math.hypot(...e1) || 1,
        l2 = Math.hypot(...e2) || 1;
      const n1 = [-e1[1] / l1, e1[0] / l1],
        n2 = [-e2[1] / l2, e2[0] / l2]; // inward normals
      let bx = n1[0] + n2[0],
        bz = n1[1] + n2[1];
      const bl = Math.hypot(bx, bz) || 1;
      bx /= bl;
      bz /= bl;
      const cos = Math.max(0.35, bx * n1[0] + bz * n1[1]);
      return [p[0] + (bx * d) / cos, p[1] + (bz * d) / cos];
    });
  const outer = offset(-overhang),
    inner = offset(inset);
  const tris = [],
    uvs = [];
  const slope = Math.hypot(inset + overhang, height);
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    const A = [outer[i][0], 0, outer[i][1]],
      B = [outer[j][0], 0, outer[j][1]];
    const C = [inner[j][0], height, inner[j][1]],
      D = [inner[i][0], height, inner[i][1]];
    const len = Math.hypot(B[0] - A[0], B[2] - A[2]) / texScale;
    tris.push([...A, ...C, ...B], [...A, ...D, ...C]);
    uvs.push([0, 0, len, slope / texScale, len, 0], [0, 0, 0, slope / texScale, len, slope / texScale]);
  }
  const shape = new THREE.Shape(inner.map(([x, z]) => new THREE.Vector2(x, -z)));
  const cap = new THREE.ShapeGeometry(shape);
  cap.rotateX(-Math.PI / 2);
  cap.translate(0, height, 0);
  const capNI = cap.index ? cap.toNonIndexed() : cap;
  const sides = trianglesGeometry(tris, uvs);
  const capUV = capNI.getAttribute('uv');
  for (let i = 0; i < capUV.count; i++) capUV.setXY(i, capUV.getX(i) / texScale, capUV.getY(i) / texScale);
  return mergeGeometries([sides, capNI]);
}

/**
 * Quadrilateral [a, b, c, d] ([x, z] corners in order) draped over the
 * terrain: a grid of about `cell` m, `lift` m above `heightAt`, facing up,
 * with a skirt along its edges down to `skirt` m below the ground so it reads
 * as a slab and no gap shows. The lift must clear coarser copies of the
 * terrain (the mobile export's is 5.3 m cells, its positions quantized).
 * UVs in meters × `uvScale` (top: x, z; skirt: along the edge, y).
 */
export function drapeQuad(corners, heightAt, { cell = 2, lift = 0.2, skirt = 0.4, uvScale = 0.25 } = {}) {
  const [a, b, c, d] = corners;
  const len = (p, q) => Math.hypot(q[0] - p[0], q[1] - p[1]);
  const nu = Math.max(1, Math.ceil(Math.max(len(a, b), len(d, c)) / cell)),
    nv = Math.max(1, Math.ceil(Math.max(len(a, d), len(b, c)) / cell));
  const at = (u, v) => [0, 1].map((k) => (1 - v) * ((1 - u) * a[k] + u * b[k]) + v * ((1 - u) * d[k] + u * c[k]));
  const top = ([x, z]) => [x, heightAt(x, z) + lift, z];
  const pos = [],
    uv = [];
  // triangle facing `want` ([x, y, z]); UVs from `uvOf`
  const tri = (p, q, r, want, uvOf) => {
    const u = [q[0] - p[0], q[1] - p[1], q[2] - p[2]],
      v = [r[0] - p[0], r[1] - p[1], r[2] - p[2]];
    const n = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
    const pts = n[0] * want[0] + n[1] * want[1] + n[2] * want[2] >= 0 ? [p, q, r] : [p, r, q];
    for (const s of pts) {
      pos.push(...s);
      uv.push(...uvOf(s));
    }
  };
  const flatUV = ([x, , z]) => [x * uvScale, z * uvScale];
  for (let i = 0; i < nu; i++)
    for (let j = 0; j < nv; j++) {
      const p00 = top(at(i / nu, j / nv)),
        p10 = top(at((i + 1) / nu, j / nv)),
        p01 = top(at(i / nu, (j + 1) / nv)),
        p11 = top(at((i + 1) / nu, (j + 1) / nv));
      tri(p00, p10, p01, [0, 1, 0], flatUV);
      tri(p10, p11, p01, [0, 1, 0], flatUV);
    }
  // skirt: walls under the edges, facing away from the middle
  const mid = at(0.5, 0.5);
  const edges = [
    [(t) => at(t, 0), nu],
    [(t) => at(1, t), nv],
    [(t) => at(1 - t, 1), nu],
    [(t) => at(0, 1 - t), nv],
  ];
  let run = 0;
  for (const [edge, n] of edges)
    for (let i = 0; i < n; i++) {
      const p = edge(i / n),
        q = edge((i + 1) / n);
      const pt = top(p),
        qt = top(q);
      const pb = [p[0], heightAt(p[0], p[1]) - skirt, p[1]],
        qb = [q[0], heightAt(q[0], q[1]) - skirt, q[1]];
      const out = [(p[0] + q[0]) / 2 - mid[0], 0, (p[1] + q[1]) / 2 - mid[1]];
      const l = len(p, q);
      const wallUV = (s) => [(run + (s === qt || s === qb ? l : 0)) * uvScale, s[1] * uvScale];
      tri(pt, qt, pb, out, wallUV);
      tri(qt, qb, pb, out, wallUV);
      run += l;
    }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.computeVertexNormals();
  return g;
}
