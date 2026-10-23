import * as THREE from 'three';

const STROKE = 1.5; // meters, like the app's WORLD_WIDTH
const CASING = 2.6;
const LIFT = 0.35; // above the terrain (or the water level)
const STEP = 4; // resampling distance (m), so ribbons follow the terrain
const MAX_MITER = 2;

/**
 * Official routes as flat ribbons (triangles) slightly above the ground: the
 * app draws them as screen-space lines in their own render pass, which a
 * glTF viewer cannot do. One mesh per route ("route:<slug>", outline + stroke
 * in vertex colors) so the mobile app can show, hide or highlight each one;
 * all share one material.
 * @param {{ park: object, heightAt: (x: number, z: number) => number }} options
 * @returns {THREE.Group}
 */
export function exportRoutes({ park, heightAt }) {
  const group = new THREE.Group();
  group.name = 'routes';
  const material = new THREE.MeshStandardMaterial({ name: 'route', vertexColors: true, roughness: 1, metalness: 0 });
  park.routes.forEach((route, ri) => {
    const out = { position: [], color: [], index: [] };
    const lift = LIFT + ri * 0.02; // overlapping routes do not z-fight
    for (const line of route.lines) {
      const pts = resample(line);
      if (pts.length < 2) continue;
      ribbon(out, pts, CASING, new THREE.Color(route.casing), heightAt, lift);
      ribbon(out, pts, STROKE, new THREE.Color(route.color), heightAt, lift + 0.01);
    }
    if (!out.index.length) return;
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(out.position, 3));
    geometry.setAttribute(
      'normal',
      new THREE.Float32BufferAttribute(
        new Float32Array(out.position.length).map((_, i) => (i % 3 === 1 ? 1 : 0)),
        3,
      ),
    );
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(out.color, 3));
    geometry.setIndex(out.index);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = `route:${route.slug}`;
    group.add(mesh);
  });
  return group;
}

/** Points every ~STEP meters along a [x, z] polyline. */
function resample(line) {
  const pts = [];
  for (let i = 1; i < line.length; i++) {
    const [x0, z0] = line[i - 1],
      [x1, z1] = line[i];
    const n = Math.max(1, Math.ceil(Math.hypot(x1 - x0, z1 - z0) / STEP));
    for (let k = 0; k < n; k++) pts.push([x0 + ((x1 - x0) * k) / n, z0 + ((z1 - z0) * k) / n]);
  }
  if (line.length) pts.push(line[line.length - 1]);
  return pts.filter((p, i) => i === 0 || Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]) > 1e-3);
}

/** Appends a mitered strip of `width` along `pts` (counter-clockwise seen from above). */
function ribbon(out, pts, width, color, heightAt, lift) {
  const base = out.position.length / 3;
  const half = width / 2;
  for (let i = 0; i < pts.length; i++) {
    const prev = pts[Math.max(0, i - 1)],
      next = pts[Math.min(pts.length - 1, i + 1)];
    let dx = next[0] - prev[0],
      dz = next[1] - prev[1];
    const l = Math.hypot(dx, dz) || 1;
    dx /= l;
    dz /= l;
    // miter: offset along the averaged normal, longer at bends (capped)
    let scale = 1;
    if (i > 0 && i < pts.length - 1) {
      const ax = pts[i][0] - prev[0],
        az = pts[i][1] - prev[1];
      const al = Math.hypot(ax, az) || 1;
      const cos = (ax / al) * dx + (az / al) * dz;
      scale = Math.min(MAX_MITER, 1 / Math.max(0.2, cos));
    }
    const nx = -dz * half * scale,
      nz = dx * half * scale;
    const [x, z] = pts[i];
    for (const s of [1, -1]) {
      const px = x + nx * s,
        pz = z + nz * s;
      out.position.push(px, Math.max(heightAt(px, pz), heightAt(x, z), 0.3) + lift, pz);
      out.color.push(color.r, color.g, color.b);
    }
  }
  for (let i = 0; i + 1 < pts.length; i++) {
    const a = base + i * 2,
      b = a + 1,
      c = a + 2,
      d = a + 3;
    out.index.push(a, c, b, b, c, d);
  }
}
