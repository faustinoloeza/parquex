import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { minstd } from '#shared/random.js';
import { m4, solidColor, trianglesGeometry } from '../../graphics/geometry.js';
import { chainLinkTexture } from '../../graphics/textures.js';
import { bigCat } from '../parts/creatures.js';
import { rock } from '../parts/rock.js';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/** Height of the moat's water above its floor (m). */
const MOAT_WATER = 1.0;
/** Moat walls: coping overhang into the moat and width over the ground behind (m). */
const OVERHANG = 0.22,
  COPING = 0.3;
/** Spacing (m) of the pointed stones along the wall tops. */
const TOOTH_STEP = 0.55;
/** Bridge: rise of the stairs' steps, their run, height of the chain-link sides and post spacing (m). */
const RISE = 0.18,
  RUN = 0.3,
  NET = 1.65,
  POST_STEP = 2.4;

/**
 * Isolated habitat of the big cats (puma and jaguar): islands of lawn, fan
 * palms and white rocks, each with a pond along the canyon between them,
 * inside a sunken moat ~4.5 m deep. The moat is cut out of the ground
 * (`groundHoles`): dark wet masonry walls crowned by a row of pointed white
 * stones, the moat filled with water from wall to wall. A suspension
 * footbridge with chain-link sides runs over the canyon between the islands,
 * from a limestone tower with a roofed landing to a smaller landing, both
 * reached by stairs that go down their side, along the moat wall. Visitors'
 * photos (2026) and OSM (cliffs, ponds, bridge).
 *
 * Coordinates are absolute (the model is not rotated).
 */
export default defineModel({
  type: 'habitat',
  label: 'Hábitat de felinos con fosos',
  params: {
    outer: [], // visitors' rim of the moat (closed ring)
    islands: [], // { animal: 'puma' | 'jaguar', at: resting rock, rim: closed ring, pond?: closed ring }
    depth: 4.6, // moat floor below the model's base (m)
    // { from, to: deck ends on the rims, height, sag, width, tower, landing,
    //   stairs?: [[dx, dz], [dx, dz]] way each end's stairs go down (default: along the bridge) }
    bridge: null,
  },
  groundHoles: (p) => [
    { rings: [p.outer, ...p.islands.map((i) => i.rim)], cover: p.bridge ? p.bridge.height - p.bridge.sag * 0.6 : undefined },
    ...p.islands.filter((i) => i.pond).map((i) => ({ rings: [i.pond] })),
  ],
  // the deck from tower to landing and both flights of stairs
  walkable: (p) => {
    if (!p.bridge) return [];
    const ends = bridgeEnds(p.bridge);
    const run = Math.max(1, Math.round(p.bridge.height / RISE)) * RUN;
    return [
      { line: [ends[0].center, ends[1].center], width: 2 },
      ...ends.map(({ center, start: [x, z], dir: [dx, dz] }) => ({ line: [center, [x, z], [x + dx * run, z + dz * run]], width: 2 })),
    ];
  },
  build(p, ctx) {
    const k = new ModelKit();
    const group = new THREE.Group();
    const updates = [];
    const base = ctx.heightAt(p.x, p.z);
    const L = ([x, z]) => [x - p.x, z - p.z]; // absolute → local
    const hAt = (x, z) => ctx.heightAt(x + p.x, z + p.z) - base; // terrain, local
    const rand = minstd(4242);
    const floorY = -p.depth;

    const outer = p.outer.map(L);
    const islands = p.islands.map((i) => ({ ...i, rim: i.rim.map(L), pond: i.pond?.map(L), at: L(i.at) }));

    // ------------------------------------------------------------ the moat
    // filled with water from wall to wall, a meter above the floor
    const water = flatShape(
      outer,
      islands.map((i) => i.rim),
    );
    k.add('pool', water, 0, floorY + MOAT_WATER, 0, 0, false);
    moatWall(k, outer, 1, { hAt, floorY, back: 0.8, rand });
    for (const island of islands) moatWall(k, island.rim, -1, { hAt, floorY, back: 0.9, rand });

    // ------------------------------------------------------------ islands
    for (const island of islands) {
      const { rim, pond } = island;
      const [ax, az] = island.at;
      // rocky outcrop where the animal rests, plus scattered boulders
      const ay = hAt(ax, az);
      k.add('rock', rock(3.2, 1), ax, ay + 0.6, az, 0, true);
      k.add('rock', rock(2.2, 2), ax + 3.5, ay + 0.3, az - 2, 0.7, true);
      k.add('rock', rock(1.6, 3), ax - 3, ay + 0.2, az + 2.5, 1.4, true);
      for (let b = 0; b < 6; b++) {
        const a = b * 1.9,
          d = 5 + (b % 3) * 2;
        const bx = ax + Math.cos(a) * d,
          bz = az + Math.sin(a) * d;
        k.add('rock', rock(0.8 + (b % 2) * 0.6, b + 4), bx, hAt(bx, bz), bz, a, true);
      }
      if (pond) islandPond(k, pond, rim, hAt, rand);
      // chit palms over the lawn (the islands' photos)
      const ib = bounds(rim);
      for (let n = 0, placed = 0; n < 600 && placed < 16; n++) {
        const x = ib[0] + rand() * (ib[2] - ib[0]),
          z = ib[1] + rand() * (ib[3] - ib[1]);
        if (!inside(rim, x, z) || ringDistance(rim, x, z) < 2.2 || Math.hypot(x - ax, z - az) < 6.5) continue;
        if (pond && (inside(pond, x, z) || ringDistance(pond, x, z) < 1.2)) continue;
        k.addTransformed('vertex', fanPalm(rand), m4(x, hAt(x, z) - 0.05, z, rand() * 6.3));
        placed++;
      }
      // the animal patrols around the outcrop
      const cat = bigCat(island.animal);
      group.add(cat.group);
      const phase = island.animal === 'jaguar' ? 2 : 0;
      updates.push((t) => {
        const T = t * 0.18 + phase,
          cycle = T % (Math.PI * 2);
        const resting = Math.sin(T * 0.5) > 0.55; // sometimes lies on the rock
        const r = 4.6;
        if (resting) {
          cat.group.position.set(ax, ay + 2.1, az);
          cat.group.rotation.set(0, phase, 0);
          cat.legs.forEach((l) => {
            l.rotation.z = 0;
          });
          cat.head.rotation.y = Math.sin(t * 0.6) * 0.5;
        } else {
          const cx = ax + Math.cos(cycle) * r,
            cz = az + Math.sin(cycle) * r;
          cat.group.position.set(cx, hAt(cx, cz) + 0.05, cz);
          cat.group.rotation.set(0, -cycle - Math.PI / 2, 0);
          const sw = Math.sin(t * 6);
          cat.legs.forEach((l, i) => {
            l.rotation.z = (i === 0 || i === 3 ? sw : -sw) * 0.5;
          });
          cat.head.rotation.y = 0;
        }
        cat.tail.rotation.y = Math.sin(t * 1.3) * 0.3;
      });
    }

    // ------------------------------------------------------------ bridge
    if (p.bridge) group.add(suspensionBridge(k, { ...p.bridge, from: L(p.bridge.from), to: L(p.bridge.to) }, hAt, floorY));

    group.add(k.build());
    return { object: group, update: (t) => updates.forEach((u) => u(t)) };
  },
});

/**
 * Masonry wall along a ring, from the moat floor up to just above the ground,
 * with a coping and a row of pointed stones. `side` +1: the moat is inside the
 * ring (visitors' rim), −1: outside (an island). Returns the wall's vertices
 * { x, z, nx, nz (towards the moat), top } for what goes along its foot.
 */
function moatWall(k, ring, side, { hAt, floorY, back, rand }) {
  const pts = vertexNormals(densify(ring, 1.6), side);
  const quads = [],
    cap = [];
  pts.forEach((v) => (v.top = hAt(v.x, v.z) + 0.18));
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i],
      b = pts[(i + 1) % pts.length];
    const at = (v, d, y) => [v.x + v.nx * d, y, v.z + v.nz * d];
    const toMoat = [(a.nx + b.nx) / 2, 0, (a.nz + b.nz) / 2];
    // face towards the moat, under the coping
    quads.push([at(a, 0, floorY), at(b, 0, floorY), at(b, 0, b.top - COPING), at(a, 0, a.top - COPING), toMoat]);
    // coping: front, underside, top and back
    cap.push([at(a, OVERHANG, a.top - COPING), at(b, OVERHANG, b.top - COPING), at(b, OVERHANG, b.top), at(a, OVERHANG, a.top), toMoat]);
    cap.push([
      at(a, 0, a.top - COPING),
      at(b, 0, b.top - COPING),
      at(b, OVERHANG, b.top - COPING),
      at(a, OVERHANG, a.top - COPING),
      [0, -1, 0],
    ]);
    cap.push([at(a, OVERHANG, a.top), at(b, OVERHANG, b.top), at(b, -back, b.top), at(a, -back, a.top), [0, 1, 0]]);
    const ya = hAt(a.x - a.nx * back, a.z - a.nz * back) - 0.4,
      yb = hAt(b.x - b.nx * back, b.z - b.nz * back) - 0.4;
    cap.push([at(a, -back, ya), at(b, -back, yb), at(b, -back, b.top), at(a, -back, a.top), [-toMoat[0], 0, -toMoat[2]]]);
  }
  k.add('darkRubble', quadsGeometry(quads), 0, 0, 0);
  k.add('darkRubble', quadsGeometry(cap), 0, 0, 0);
  // pointed white stones along the top (anti-climbing crest of the photos)
  walkRing(pts, TOOTH_STEP, (x, z, nx, nz, top) => {
    const h = 0.42 + rand() * 0.28,
      r = 0.22 + rand() * 0.08;
    const tooth = new THREE.ConeGeometry(r, h, 4, 1, true).translate(0, h / 2, 0);
    k.add('limestone', tooth, x - nx * 0.12, top - 0.04, z - nz * 0.12, rand() * 1.6);
  });
  return pts;
}

/** Sunken pond with a low rim of pale stone and white boulders on the lawn side. */
function islandPond(k, pond, rim, hAt, rand) {
  const pts = vertexNormals(densify(pond, 1.2), 1);
  pts.forEach((v) => (v.top = hAt(v.x, v.z) + 0.06));
  const level = Math.min(...pts.map((v) => v.top)) - 0.42;
  const quads = [];
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i],
      b = pts[(i + 1) % pts.length];
    const at = (v, d, y) => [v.x + v.nx * d, y, v.z + v.nz * d];
    const toWater = [(a.nx + b.nx) / 2, 0, (a.nz + b.nz) / 2];
    quads.push([at(a, 0, level - 0.3), at(b, 0, level - 0.3), at(b, 0, b.top), at(a, 0, a.top), toWater]);
    quads.push([at(a, 0, a.top), at(b, 0, b.top), at(b, -0.35, b.top), at(a, -0.35, a.top), [0, 1, 0]]);
  }
  k.add('sandstone', quadsGeometry(quads), 0, 0, 0);
  k.add('pool', flatShape(pond, []), 0, level, 0, 0, false);
  // white boulders where the pond meets the lawn (not along the moat wall)
  walkRing(pts, 1.4, (x, z, nx, nz, top) => {
    if (ringDistance(rim, x, z) < 1.8) return;
    const r = 0.3 + rand() * 0.25;
    k.add('sandstone', rock(r, Math.floor(rand() * 50)), x - nx * 0.45, top - 0.05, z - nz * 0.45, rand() * 6.3);
  });
}

/**
 * Suspension footbridge: plank deck hanging between a limestone tower with a
 * roofed landing (at `from`) and a smaller landing (at `to`), steel posts and
 * cables, chain-link sides. Static parts go into the kit; the see-through mesh
 * is returned as its own object.
 */
function suspensionBridge(k, b, hAt, floorY) {
  const { from, to, height, sag, width: W } = b;
  const [dx, dz] = unit(from, to);
  const [nx, nz] = [-dz, dx];
  const len = Math.hypot(to[0] - from[0], to[1] - from[1]);
  const ang = -Math.atan2(dz, dx);
  const y0 = hAt(...from) + height,
    y1 = hAt(...to) + height;
  const deckY = (t) => y0 + (y1 - y0) * t - 4 * sag * t * (1 - t);
  const point = (t, side, y) => [from[0] + dx * len * t + nx * side, y, from[1] + dz * len * t + nz * side];
  const along = (s, side = 0) => [from[0] + dx * s + nx * side, from[1] + dz * s + nz * side];

  // plank deck on two steel stringers
  const planks = Math.round(len / 0.5);
  for (let i = 0; i < planks; i++) {
    const t = (i + 0.5) / planks;
    const [x, z] = along(t * len);
    k.add('wood', new THREE.BoxGeometry(len / planks - 0.07, 0.08, W), x, deckY(t) - 0.08, z, ang);
  }
  const posts = Math.max(2, Math.round(len / POST_STEP));
  const ts = Array.from({ length: posts + 1 }, (_, j) => j / posts);
  for (const side of [-W / 2, W / 2]) {
    for (let j = 0; j < posts; j++) {
      const [t0, t1] = [ts[j], ts[j + 1]];
      k.rod('steel', point(t0, side, deckY(t0) - 0.12), point(t1, side, deckY(t1) - 0.12), 0.06);
      k.rod('steel', point(t0, side, deckY(t0) + NET), point(t1, side, deckY(t1) + NET), 0.03);
    }
    for (const t of ts) k.rod('steel', point(t, side, deckY(t) - 0.12), point(t, side, deckY(t) + NET + 0.05), 0.04);
  }
  // chain-link sides: one see-through strip per side
  const net = [];
  for (const side of [-W / 2, W / 2]) {
    for (let i = 0; i < planks; i++) {
      const [t0, t1] = [i / planks, (i + 1) / planks];
      net.push([
        point(t0, side, deckY(t0)),
        point(t1, side, deckY(t1)),
        point(t1, side, deckY(t1) + NET),
        point(t0, side, deckY(t0) + NET),
      ]);
    }
  }
  const mesh = new THREE.Mesh(
    netGeometry(net),
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: chainLinkTexture(),
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      roughness: 0.55,
      metalness: 0.3,
    }),
  );
  mesh.name = 'habitat:chain-link';
  mesh.renderOrder = 2;

  // tower at `from`: masonry from the moat floor to the deck, an open landing
  // under a flat roof on four square pillars, stairs down to the path
  const [tower, landing] = bridgeEnds(b);
  const T = b.tower ?? 4.3,
    TW = TOWER_WIDTH;
  const [tx, tz] = tower.center;
  k.add('limestone', new THREE.BoxGeometry(T, y0 - floorY, TW).translate(0, (y0 - floorY) / 2, 0), tx, floorY, tz, ang);
  k.add('paving', new THREE.BoxGeometry(T - 0.2, 0.06, TW - 0.2), tx, y0 + 0.03, tz, ang);
  for (const [u, v] of [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ]) {
    const [px, pz] = along(-T / 2 + u * (T / 2 - 0.35), v * (TW / 2 - 0.35));
    k.add('limestone', new THREE.BoxGeometry(0.6, 2.6, 0.6).translate(0, 1.3, 0), px, y0, pz, ang);
  }
  k.add('limestone', new THREE.BoxGeometry(T + 0.5, 0.35, TW + 0.5).translate(0, 0.175, 0), tx, y0 + 2.6, tz, ang);
  k.add('limestone', new THREE.BoxGeometry(T + 0.2, 0.18, TW + 0.2).translate(0, 0.09, 0), tx, y0 + 2.95, tz, ang);
  stairs(k, tower.start, tower.dir, y0, hAt);

  // landing at `to`: masonry block and a pair of pillars with a lintel at the deck
  const Lg = b.landing ?? 2.8,
    LW = LANDING_WIDTH;
  const [lx, lz] = landing.center;
  k.add('limestone', new THREE.BoxGeometry(Lg, y1 - floorY, LW).translate(0, (y1 - floorY) / 2, 0), lx, floorY, lz, ang);
  k.add('paving', new THREE.BoxGeometry(Lg - 0.2, 0.06, LW - 0.2), lx, y1 + 0.03, lz, ang);
  for (const v of [-1, 1]) {
    const [px, pz] = along(len + 0.3, v * (LW / 2 - 0.3));
    k.add('limestone', new THREE.BoxGeometry(0.5, 2.3, 0.5).translate(0, 1.15, 0), px, y1, pz, ang);
  }
  const [gx, gz] = along(len + 0.3);
  k.add('limestone', new THREE.BoxGeometry(0.6, 0.4, LW).translate(0, 0.2, 0), gx, y1 + 2.3, gz, ang);
  stairs(k, landing.start, landing.dir, y1, hAt);
  return mesh;
}

/** Across the bridge (m): its tower and its landing. */
const TOWER_WIDTH = 4.4,
  LANDING_WIDTH = 3.2;

/**
 * The bridge's tower (at `from`) and landing (at `to`): their centers, and
 * where their stairs leave from (middle of the face they go down from) and
 * which way, in the frame of `from` / `to`.
 */
function bridgeEnds(b) {
  const [dx, dz] = unit(b.from, b.to);
  const [nx, nz] = [-dz, dx];
  const len = Math.hypot(b.to[0] - b.from[0], b.to[1] - b.from[1]);
  const T = b.tower ?? 4.3,
    Lg = b.landing ?? 2.8;
  const ends = [
    { s: -T / 2, long: T, wide: TOWER_WIDTH, dir: b.stairs?.[0] ?? [-dx, -dz] },
    { s: len + Lg / 2, long: Lg, wide: LANDING_WIDTH, dir: b.stairs?.[1] ?? [dx, dz] },
  ];
  return ends.map(({ s, long, wide, dir }) => {
    const center = [b.from[0] + dx * s, b.from[1] + dz * s];
    const [ux, uz] = unit([0, 0], dir);
    const half = (Math.abs(ux * dx + uz * dz) * long + Math.abs(ux * nx + uz * nz) * wide) / 2;
    return { center, start: [center[0] + ux * half, center[1] + uz * half], dir: [ux, uz] };
  });
}

/** Steps from a landing at height `top` down to the ground, going along `dir` from `start`. */
function stairs(k, [sx, sz], [dx, dz], top, hAt) {
  const ang = -Math.atan2(dz, dx);
  const foot = hAt(sx + dx * 4, sz + dz * 4);
  const n = Math.max(1, Math.round((top - foot) / RISE));
  const rise = (top - foot) / n;
  for (let j = 0; j < n - 1; j++) {
    const x = sx + dx * (j + 0.5) * RUN,
      z = sz + dz * (j + 0.5) * RUN;
    const y = top - (j + 1) * rise;
    k.add('limestone', new THREE.BoxGeometry(RUN, y - foot + 0.4, 1.9).translate(0, (y - foot + 0.4) / 2, 0), x, foot - 0.4, z, ang);
  }
}

/** Fan palm (chit): slim trunk and a crown of spiky fronds, vertex-colored. */
function fanPalm(rand) {
  const h = 1.3 + rand() * 1.7;
  const parts = [solidColor(new THREE.CylinderGeometry(0.06, 0.09, h, 5, 1, true).translate(0, h / 2, 0), '#7a6b57')];
  const n = 9 + Math.floor(rand() * 4);
  for (let i = 0; i < n; i++) {
    const len = 0.85 + rand() * 0.45;
    const g = new THREE.ConeGeometry(0.3, len, 4, 1);
    g.rotateZ(-Math.PI / 2)
      .translate(len / 2, 0, 0)
      .scale(1, 0.18, 1);
    g.rotateZ(0.15 + rand() * 0.7);
    g.rotateY((i / n) * Math.PI * 2 + rand() * 0.4);
    g.translate(0, h, 0);
    parts.push(solidColor(g, rand() < 0.5 ? '#4f8c36' : '#679f45'));
  }
  return mergeGeometries(parts.map((g) => g.toNonIndexed()));
}

/** Quads [a, b, c, d, facing] → triangles facing `facing` (winding fixed per quad). */
function quadsGeometry(quads) {
  const tris = [];
  for (const [a, b, c, d, want] of quads) {
    const u = [b[0] - a[0], b[1] - a[1], b[2] - a[2]],
      v = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
    const n = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
    if (n[0] * want[0] + n[1] * want[1] + n[2] * want[2] >= 0) tris.push([...a, ...b, ...c], [...a, ...c, ...d]);
    else tris.push([...a, ...c, ...b], [...a, ...d, ...c]);
  }
  return trianglesGeometry(tris);
}

/** Double-sided strip of quads with UVs in meters (the chain-link texture repeats every 0.8 m). */
function netGeometry(quads) {
  const pos = [],
    uv = [];
  let s = 0;
  for (const [a, b, c, d] of quads) {
    const w = Math.hypot(b[0] - a[0], b[2] - a[2]) / 0.8,
      h = (d[1] - a[1]) / 0.8;
    pos.push(...a, ...b, ...c, ...a, ...c, ...d);
    uv.push(s, 0, s + w, 0, s + w, h, s, 0, s + w, h, s, h);
    s += w;
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.computeVertexNormals();
  return g;
}

/** Horizontal polygon with holes at y = 0, facing up. */
function flatShape(ring, holes) {
  const shape = new THREE.Shape(ring.map(([x, z]) => new THREE.Vector2(x, -z)));
  for (const h of holes) shape.holes.push(new THREE.Path(h.map(([x, z]) => new THREE.Vector2(x, -z))));
  return new THREE.ShapeGeometry(shape).rotateX(-Math.PI / 2);
}

/** Calls fn(x, z, nx, nz, top) every `step` meters along a ring of vertexNormals() points. */
function walkRing(pts, step, fn) {
  let next = step / 2,
    run = 0;
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i],
      b = pts[(i + 1) % pts.length];
    const l = Math.hypot(b.x - a.x, b.z - a.z);
    for (; next <= run + l; next += step) {
      const t = (next - run) / l;
      fn(a.x + (b.x - a.x) * t, a.z + (b.z - a.z) * t, a.nx + (b.nx - a.nx) * t, a.nz + (b.nz - a.nz) * t, a.top + (b.top - a.top) * t);
    }
    run += l;
  }
}

/** Ring with no segment longer than `step`. */
function densify(ring, step) {
  const out = [];
  for (let i = 0; i < ring.length; i++) {
    const [x0, z0] = ring[i],
      [x1, z1] = ring[(i + 1) % ring.length];
    const n = Math.max(1, Math.ceil(Math.hypot(x1 - x0, z1 - z0) / step));
    for (let j = 0; j < n; j++) out.push([x0 + ((x1 - x0) * j) / n, z0 + ((z1 - z0) * j) / n]);
  }
  return out;
}

/**
 * Ring vertices with mitered unit normals pointing inside the ring (`side`
 * +1) or outside (−1), whatever the ring's winding.
 */
function vertexNormals(ring, side) {
  const area = ring.reduce((s, [x0, z0], i) => {
    const [x1, z1] = ring[(i + 1) % ring.length];
    return s + x0 * z1 - x1 * z0;
  }, 0);
  const s = Math.sign(area) * side;
  const edge = (i) => {
    const [x0, z0] = ring[i],
      [x1, z1] = ring[(i + 1) % ring.length];
    const l = Math.hypot(x1 - x0, z1 - z0) || 1;
    return [(-(z1 - z0) / l) * s, ((x1 - x0) / l) * s];
  };
  return ring.map(([x, z], i) => {
    const a = edge((i - 1 + ring.length) % ring.length),
      b = edge(i);
    let mx = a[0] + b[0],
      mz = a[1] + b[1];
    const ml = Math.hypot(mx, mz) || 1;
    mx /= ml;
    mz /= ml;
    const k = 1 / Math.max(0.5, mx * b[0] + mz * b[1]); // miter, capped at sharp corners
    return { x, z, nx: mx * k, nz: mz * k };
  });
}

function inside(ring, x, z) {
  let c = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, zi] = ring[i],
      [xj, zj] = ring[j];
    if (zi > z !== zj > z && x < ((xj - xi) * (z - zi)) / (zj - zi) + xi) c = !c;
  }
  return c;
}

function ringDistance(ring, x, z) {
  let d = Infinity;
  for (let i = 0; i < ring.length; i++) {
    const [ax, az] = ring[i],
      [bx, bz] = ring[(i + 1) % ring.length];
    const ex = bx - ax,
      ez = bz - az,
      l2 = ex * ex + ez * ez || 1;
    const t = Math.max(0, Math.min(1, ((x - ax) * ex + (z - az) * ez) / l2));
    d = Math.min(d, Math.hypot(x - ax - ex * t, z - az - ez * t));
  }
  return d;
}

function bounds(ring) {
  const xs = ring.map((q) => q[0]),
    zs = ring.map((q) => q[1]);
  return [Math.min(...xs), Math.min(...zs), Math.max(...xs), Math.max(...zs)];
}

function unit([x0, z0], [x1, z1]) {
  const l = Math.hypot(x1 - x0, z1 - z0) || 1;
  return [(x1 - x0) / l, (z1 - z0) / l];
}
