import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { placeLampsAlong, placeLampsOver } from '#shared/lamps.js';
import { distanceAlong, freeSpot, nearestOnLines, placeBeside, ringPoints, revealOrder, spansAcross } from '#shared/decorations.js';
import { minstd } from '#shared/random.js';
import { GLOW_DISC, obstacles } from '../../layers/lamps.js';
import { nightGlow, nightUniform } from '../../graphics/night.js';
import { decodeVegetation, TREE_SHAPES, TREE_STRIDE } from '#shared/formats/vegetation.js';
import { BLOSSOMS, JARS, PAPEL, altarGeometry, calaverita, part } from './altars.js';

const TAU = 2 * Math.PI;

/** Lets the browser draw a frame between the heavy steps (the map is already on screen). */
const nextFrame = () => new Promise((resolve) => requestAnimationFrame(() => resolve()));

/**
 * Sizes and spacing (m), and the light the decoration adds to the lamps' light
 * map at night (layers/lamps.js → ExtraLight): orange lamps, an orange glow
 * along every path (petal carpets under candle light) and pools around the
 * candles ([radius, alpha]) and the altars.
 */
export const MUERTOS_STYLE = {
  candles: { spacing: 2.2, offset: 1.5, minGap: 1 },
  flame: { radius: 0.32, minPx: 2.4, color: '#ff9326', core: 0.3, above: 0.24 },
  bulb: { radius: 0.14, minPx: 1.6, color: '#ffcf70', core: 0.6, gap: 0.9 }, // string lights over the papel picado
  plazas: { areaSpacing: 6, minGap: 3, threshold: 0.6, pot: 1.6 }, // marigold pots and candles over paved plazas
  skulls: { count: 10, apart: 70, radius: 0.9 }, // giant decorated calaveras on plazas, at least `apart` m from each other
  // rows of altars on the grass beside a stretch of path (festival-places.js → ALTAR_ROWS): offset from the
  // path's center (m), clearance from any path, from tree crowns and from ruins
  rows: { offsets: [7, 17], step: 0.75, minGap: 9, pathClear: 5, treeClear: 0.6, ruinsClear: 1.5 },
  altarScale: 1.3, // altars a bit larger than life, so they read from the map (the camera stays 30 m away or more)
  flowers: { spacing: 1.6, offset: 2.3, minGap: 0.9, scale: [1.2, 1.9] },
  papel: { radius: 45, spacing: 6, width: 7.5, height: 5, sag: 0.8, flag: [0.62, 0.78], gap: 0.8 },
  light: {
    lampColor: '#ff8a2a',
    lampCore: 0.35,
    strokes: { width: 2.2, alpha: 0.26, color: '#ff6a00' },
    candle: [2.4, 0.1],
    altar: [13, 1],
    rowAltar: [8, 0.75],
    cemetery: [10, 0.6],
  },
  // camera distance (m) to a square of the park beyond which its jars / flowers are a pixel or less and hide
  // (only the flames show)
  near: { jars: 200, flowers: 420 },
};

/** Meters; candles and flowers are bucketed in squares so views of part of the park skip the rest. */
const CELL = 300;

/**
 * Items [x, y, z, …] bucketed per CELL m square: each square's fixed ones
 * first, then its share of the path ones (in their order), and its bounds.
 * @returns {{ items: number[][], fixed: number, path: number, box: THREE.Box3 }[]}
 */
function cells(fixed, path) {
  const out = new Map();
  const add = (kind) => (item) => {
    const key = `${Math.floor(item[0] / CELL)},${Math.floor(item[2] / CELL)}`;
    if (!out.has(key)) out.set(key, { fixed: [], path: [] });
    out.get(key)[kind].push(item);
  };
  fixed.forEach(add('fixed'));
  path.forEach(add('path'));
  return [...out.values()].map((c) => {
    const items = [...c.fixed, ...c.path];
    const box = new THREE.Box3();
    for (const [x, y, z] of items) box.expandByPoint(new THREE.Vector3(x, y, z));
    box.max.y += 2;
    return { items, fixed: c.fixed.length, path: c.path.length, box };
  });
}

/**
 * Día de Muertos on the map (src/themes/muertos), shaped after the festival's
 * nights at Xcaret: candles in colored glass jars along every path and on the
 * cemetery's terraces, marigolds lining the walkways, papel picado strung over
 * the paths around the altars, and tiered altars (candles, marigold arch,
 * calaveras, petal carpet) at the festival's places — or at the entrance and a
 * few activities in other parks. The flames are glowing dots like the lamp
 * heads; the light reaches the ground through the lamps' light map. It yields
 * to the browser between steps: on phones it takes a second or more.
 *
 * @param {{ park: object, parkDef: import('../../parks/define.js').ParkDefinition,
 *   heightAt: (x: number, z: number) => number, surfaceAt: (x: number, z: number) => number,
 *   buildings: object[], designArea: { signedDistance: (x: number, z: number) => number },
 *   lamps: ReturnType<typeof import('../../layers/lamps.js').createLampsLayer>,
 *   vegetation?: ArrayBuffer, places?: { x: number, z: number, at?: object | null }[], rows?: object[] }} ctx
 *   places: where the festival altars go (default: entrance + activities); rows: altars beside a stretch of a
 *   route ({ route, from: [x, z], to: [x, z], spacing, styles }); vegetation: the park's trees (kept clear)
 * @returns {Promise<import('../../layers/index.js').Layer & { theme: string }>}
 */
export async function createMuertosLayer({
  park,
  parkDef,
  heightAt,
  surfaceAt,
  buildings,
  designArea,
  lamps,
  vegetation,
  places = [],
  rows = [],
}) {
  const S = MUERTOS_STYLE;
  const rnd = minstd(20261102);
  const pick = (list) => list[Math.floor(rnd() * list.length)];
  const blocked = obstacles(buildings, parkDef.landmarks);
  const accept = (x, z) => heightAt(x, z) > 0.15 && designArea.signedDistance(x, z) < -6 && !blocked(x, z);
  let lines = [...(park.walkways ?? []), ...park.routes.flatMap((r) => r.lines)];
  // a park without mapped paths (Xplor): small loops around its activities
  if (!lines.length)
    lines = park.pois.map((p) => {
      const ring = ringPoints(p.x, p.z, 6, 1.5);
      return [...ring, ring[0]];
    });

  /** [x, y, z, color]: always shown (altars, cemetery) / along the paths (capped by the quality) */
  const fixedCandles = [],
    pathCandles = [];
  /** [x, y, z, scale, rotation, color] */
  const fixedFlowers = [],
    pathFlowers = [];
  const pools = [];

  // ------------------------------------------------------------ the paths
  // both sides: the second pass starts on the other side
  for (const offset of [S.candles.offset, -S.candles.offset])
    for (const [x, z] of placeLampsAlong(lines, { ...S.candles, offset, accept })) {
      pathCandles.push([x, surfaceAt(x, z), z, pick(JARS)]);
      pools.push([x, z, ...S.light.candle]);
    }
  for (const offset of [S.flowers.offset, -S.flowers.offset])
    for (const [x, z] of placeLampsAlong(lines, { ...S.flowers, offset, accept }))
      pathFlowers.push([
        x,
        surfaceAt(x, z),
        z,
        S.flowers.scale[0] + rnd() * (S.flowers.scale[1] - S.flowers.scale[0]),
        rnd() * TAU,
        pick(BLOSSOMS),
      ]);

  await nextFrame();

  // marigold pots, each with a few candles, all over the paved plazas
  const plazaSpots = [];
  if (lamps.cover) {
    const { cx, cz, size } = park.extent;
    const rect = [cx - size / 2, cz - size / 2, cx + size / 2, cz + size / 2];
    for (const [x, z] of placeLampsOver([], lamps.cover, rect, { ...S.plazas, accept })) {
      const y = surfaceAt(x, z);
      plazaSpots.push([x, z]);
      pathFlowers.push([x, y, z, S.plazas.pot * (0.9 + rnd() * 0.3), rnd() * TAU, pick(BLOSSOMS)]);
      for (const [px, pz] of ringPoints(x, z, 0.75, 0.6, rnd() * TAU)) pathCandles.push([px, y, pz, pick(JARS)]);
      pools.push([x, z, 3.5, 0.18]);
    }
  }

  // ------------------------------------------------------- the cemetery
  // (models/attractions/cemetery.js: terraces `step` m high, walls shrinking
  // from `radius` to `top`): a ring of candles and one of marigolds on each
  for (const l of parkDef.landmarks.filter((m) => m.type === 'cemetery')) {
    const p = { radius: 18, levels: 7, top: 6.5, ...l };
    const base = l.y ?? heightAt(l.x, l.z);
    const n = p.levels,
      step = 1.15;
    const wall = (k) => p.radius - (k * (p.radius - p.top)) / (n - 1);
    for (let k = 0; k < n - 1; k++) {
      const y = base + (k + 1) * step;
      for (const [x, z] of ringPoints(l.x, l.z, wall(k + 1) + 1.45, 0.8, k * 0.37)) fixedCandles.push([x, y, z, pick(JARS)]);
      for (const [x, z] of ringPoints(l.x, l.z, wall(k + 1) + 1.75, 1.2, k * 0.21))
        fixedFlowers.push([x, y, z, 0.55 + rnd() * 0.3, rnd() * TAU, pick(BLOSSOMS)]);
    }
    pools.push([l.x, l.z, p.radius + S.light.cemetery[0], S.light.cemetery[1]]);
  }

  await nextFrame();

  // ---------------------------------------------------------- the altars
  const spots = places.length ? places : defaultSpots(park);
  /** where every altar stands, with its style and place (a name, a { es, en } name or 'entrance'), for the markers */
  const altars = spots
    .map((s) => {
      const at = s.at ?? freeSpot(s.x, s.z, { lines, accept, clearance: 3, reach: 14, maxRadius: 28 });
      return at && { ...at, style: 'tiers', place: s.place ?? null };
    })
    .filter(Boolean);
  const altarParts = [];
  const bulbs = [];
  /** Puts an altar of a style at a spot: its geometry, candles, string lights and light. */
  const addAltar = (style, { x, z, rotation }, options, pool = S.light.altar) => {
    const k = S.altarScale;
    const m = new THREE.Matrix4()
      .makeRotationY(rotation)
      .scale(new THREE.Vector3(k, k, k))
      .setPosition(x, heightAt(x, z), z);
    const altar = altarGeometry(style, rnd, options);
    altarParts.push(altar.geometry.applyMatrix4(m));
    const v = new THREE.Vector3();
    for (const [cx, cy, cz, c] of altar.candles) {
      v.set(cx, cy, cz).applyMatrix4(m);
      fixedCandles.push([v.x, v.y, v.z, c]);
    }
    for (const b of altar.bulbs)
      bulbs.push(
        v
          .set(...b)
          .applyMatrix4(m)
          .toArray(),
      );
    pools.push([x, z, ...pool]);
  };
  altars.forEach((a, i) => addAltar('tiers', a, { skull: i < 2 }));

  await nextFrame();

  // rows of altars on the grass beside a stretch of a route, clear of paths, trees and ruins
  if (rows.length) {
    const R = S.rows;
    const nearTree = treeLookup(vegetation);
    const ruins = parkDef.landmarks.flatMap((l) => (l.rooms ?? []).map(([x, z, w, d]) => [l.x + x, l.z + z, w / 2, d / 2]));
    const inRuins = (x, z) =>
      ruins.some(([rx, rz, hw, hd]) => Math.abs(x - rx) < hw + R.ruinsClear && Math.abs(z - rz) < hd + R.ruinsClear);
    const pathDistance = (x, z) => nearestOnLines(x, z, lines)?.d ?? Infinity;
    // probes in the altar's frame: center, sides, back, and the carpet in front
    const probes = [
      [0, 0, R.pathClear],
      [2.3, 0, 2],
      [-2.3, 0, 2],
      [0, -1.6, 2],
      [0, 2.6, 1],
    ];
    const altarAccept = (x, z, rotation) => {
      const c = Math.cos(rotation),
        s = Math.sin(rotation);
      return probes.every(([lx, lz, clear]) => {
        const px = x + (lx * c + lz * s) * S.altarScale,
          pz = z + (-lx * s + lz * c) * S.altarScale;
        return accept(px, pz) && !nearTree(px, pz, R.treeClear) && !inRuins(px, pz) && pathDistance(px, pz) >= clear;
      });
    };
    for (const row of rows) {
      const route = park.routes.find((r) => r.slug === row.route);
      if (!route) continue;
      // the route's line that passes nearest both ends
      const line = route.lines
        .map((l) => ({ l, a: distanceAlong(l, ...row.from), b: distanceAlong(l, ...row.to) }))
        .sort((p, q) => p.a.d + p.b.d - (q.a.d + q.b.d))[0];
      if (!line) continue;
      const spots = placeBeside(line.l, {
        from: line.a.s,
        to: line.b.s,
        spacing: row.spacing,
        offsets: R.offsets,
        step: R.step,
        minGap: R.minGap,
        accept: altarAccept,
      });
      spots.forEach((spot, k) => {
        const style = row.styles[k % row.styles.length];
        addAltar(style, spot, undefined, S.light.rowAltar);
        altars.push({ ...spot, style, place: route.name });
      });
      await nextFrame();
    }
  }

  // giant calaveras on some plazas, away from the altars and from each other
  const taken = altars.map((a) => [a.x, a.z]);
  for (const i of revealOrder(plazaSpots.length, rnd)) {
    if (taken.length >= altars.length + S.skulls.count) break;
    const [x, z] = plazaSpots[i];
    if (taken.some(([tx, tz]) => Math.hypot(x - tx, z - tz) < S.skulls.apart)) continue;
    taken.push([x, z]);
    const near = nearestOnLines(x, z, lines);
    const rotation = near ? Math.atan2(near.x - x, near.z - z) : rnd() * TAU;
    const m = new THREE.Matrix4().makeRotationY(rotation).setPosition(x, heightAt(x, z), z);
    altarParts.push(mergeGeometries(calaverita(0, 0, 0, S.skulls.radius, true)).applyMatrix4(m));
    pools.push([x, z, 6, 0.5]);
  }

  // ------------------------------------------------- papel picado strings
  const spans = spansAcross(lines, { spots: altars.map((a) => [a.x, a.z]), ...S.papel });
  const flagPos = [],
    stringPts = [];
  for (const [[x0, z0], [x1, z1]] of spans) {
    const top = Math.max(surfaceAt(x0, z0), surfaceAt(x1, z1)) + S.papel.height;
    const len = Math.hypot(x1 - x0, z1 - z0);
    const n = Math.max(2, Math.floor(len / S.papel.gap));
    const at = (t) => [x0 + (x1 - x0) * t, top - S.papel.sag * 4 * t * (1 - t), z0 + (z1 - z0) * t];
    for (let k = 0; k < 10; k++) stringPts.push(...at(k / 10), ...at((k + 1) / 10));
    const angle = Math.atan2(-(z1 - z0), x1 - x0);
    for (let k = 1; k < n; k++) flagPos.push([...at(k / n), angle, PAPEL[k % PAPEL.length]]);
    const nb = Math.max(2, Math.floor(len / S.bulb.gap));
    for (let k = 1; k < nb; k++) bulbs.push(at((k - 0.5) / nb));
  }

  // ------------------------------------------------------------- meshes
  const object = new THREE.Group();
  object.name = 'theme:muertos';
  const m = new THREE.Matrix4(),
    q = new THREE.Quaternion(),
    sc = new THREE.Vector3(),
    color = new THREE.Color();
  const Y = new THREE.Vector3(0, 1, 0);

  // candles and flowers per square of the park (cells()): the fixed ones first,
  // then the path ones in a shuffled order (any first n of them are spread over
  // the square: the quality cap keeps a prefix)
  const shuffled = (list) => revealOrder(list.length, rnd).map((i) => list[i]);
  const candleCells = cells(fixedCandles, shuffled(pathCandles));
  const flowerCells = cells(fixedFlowers, shuffled(pathFlowers));
  const jarGeometry = new THREE.CylinderGeometry(0.065, 0.055, 0.15, 5).translate(0, 0.075, 0);
  jarGeometry.deleteAttribute('uv');
  const jarMaterial = new THREE.MeshBasicMaterial();
  const flameUniforms = {
    uNight: nightUniform,
    uColor: { value: new THREE.Color(S.flame.color) },
    uCore: { value: S.flame.core },
    uViewport: { value: new THREE.Vector2(1, 1) },
    uSize: { value: S.flame.radius },
    uMinPx: { value: S.flame.minPx },
  };
  const flameGeometry = new THREE.PlaneGeometry(1, 1);
  const flameMaterial = new THREE.ShaderMaterial({
    uniforms: flameUniforms,
    ...GLOW_DISC,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const bulbUniforms = {
    ...flameUniforms,
    uColor: { value: new THREE.Color(S.bulb.color) },
    uCore: { value: S.bulb.core },
    uSize: { value: S.bulb.radius },
    uMinPx: { value: S.bulb.minPx },
  };
  const lights = new THREE.InstancedMesh(
    flameGeometry,
    new THREE.ShaderMaterial({
      uniforms: bulbUniforms,
      ...GLOW_DISC,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
    Math.max(1, bulbs.length),
  );
  lights.name = 'muertos:string-lights';
  lights.renderOrder = 2;
  bulbs.forEach(([x, y, z], i) => lights.setMatrixAt(i, m.makeTranslation(x, y, z)));
  /** per square: its jars (hidden from afar), its flames and how many of its candles are fixed / on paths */
  const candleSets = candleCells.map((cell) => {
    const jars = new THREE.InstancedMesh(jarGeometry, jarMaterial, cell.items.length);
    jars.name = 'muertos:jars';
    const flames = new THREE.InstancedMesh(flameGeometry, flameMaterial, cell.items.length);
    flames.name = 'muertos:flames';
    flames.renderOrder = 2; // after the water
    cell.items.forEach(([x, y, z, c], i) => {
      jars.setMatrixAt(i, m.makeTranslation(x, y, z));
      jars.setColorAt(i, color.set(c));
      flames.setMatrixAt(i, m.makeTranslation(x, y + S.flame.above, z));
    });
    return { ...cell, jars, flames };
  });

  const flowerMaterial = nightGlow(
    new THREE.MeshLambertMaterial({ vertexColors: true, emissive: '#ff6a00', emissiveIntensity: 0 }),
    0.5,
    0,
  );
  const clump = clumpGeometry();
  const flowerSets = flowerCells.map((cell) => {
    const blossoms = new THREE.InstancedMesh(clump, flowerMaterial, cell.items.length);
    blossoms.name = 'muertos:marigolds';
    cell.items.forEach(([x, y, z, s, r, c], i) => {
      blossoms.setMatrixAt(i, m.compose(new THREE.Vector3(x, y, z), q.setFromAxisAngle(Y, r), sc.set(s, s, s)));
      blossoms.setColorAt(i, color.set(c));
    });
    return { ...cell, blossoms };
  });

  const [fw, fh] = S.papel.flag;
  const flagGeometry = new THREE.PlaneGeometry(fw, fh).translate(0, -fh / 2, 0);
  const flags = new THREE.InstancedMesh(
    flagGeometry,
    new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, transparent: true, opacity: 0.93 }),
    Math.max(1, flagPos.length),
  );
  flags.name = 'muertos:papel-picado';
  flagPos.forEach(([x, y, z, angle, c], i) => {
    flags.setMatrixAt(i, m.compose(new THREE.Vector3(x, y, z), q.setFromAxisAngle(Y, angle), sc.set(1, 1, 1)));
    flags.setColorAt(i, color.set(c));
  });
  const strings = new THREE.LineSegments(
    new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(stringPts, 3)),
    new THREE.LineBasicMaterial({ color: '#4a3426' }),
  );
  strings.name = 'muertos:strings';

  const instanced = [...candleSets.flatMap((s) => [s.jars, s.flames]), ...flowerSets.map((s) => s.blossoms), lights, flags];
  for (const mesh of instanced) {
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.computeBoundingSphere();
    object.add(mesh);
  }
  if (!flagPos.length) flags.count = lights.count = 0;
  object.add(strings);
  if (altarParts.length) {
    const altarMaterial = nightGlow(
      new THREE.MeshLambertMaterial({ vertexColors: true, emissive: '#ff8a3d', emissiveIntensity: 0 }),
      0.12,
      0,
    );
    const altarMesh = new THREE.Mesh(mergeGeometries(altarParts), altarMaterial);
    altarMesh.name = 'muertos:altars';
    altarMesh.castShadow = altarMesh.receiveShadow = true;
    object.add(altarMesh);
  }

  // the light on the ground
  lamps.setExtraLight({ lampColor: S.light.lampColor, lampCore: S.light.lampCore, strokes: { lines, ...S.light.strokes }, pools });

  return {
    name: 'theme:muertos',
    theme: 'muertos',
    object,
    /** where the altars stand ({ x, z, rotation }) */
    altars,
    occludesRoutes: false,
    /** Fewer path candles and flowers on weaker presets (the street lamps' cap as the measure). */
    setQuality(preset) {
      const f = Math.min(1, Math.max(0.35, (preset.lamps ?? 2500) / 2500));
      for (const s of candleSets) s.jars.count = s.flames.count = s.fixed + Math.floor(s.path * f);
      for (const s of flowerSets) s.blossoms.count = s.fixed + Math.floor(s.path * f);
    },
    update({ fovPx, camera }) {
      // jars and flowers only on the squares near the camera (a pixel or less beyond)
      const eye = camera.position;
      for (const s of candleSets) s.jars.visible = s.box.distanceToPoint(eye) < S.near.jars;
      for (const s of flowerSets) s.blossoms.visible = s.box.distanceToPoint(eye) < S.near.flowers;
      const night = nightUniform.value > 0.001;
      for (const s of candleSets) s.flames.visible = night;
      lights.visible = night;
      if (!night) return;
      const h = 2 * fovPx * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      flameUniforms.uViewport.value.set(h * camera.aspect, h);
    },
    dispose() {
      lamps.setExtraLight(null);
    },
  };
}

/** Where the altars go without festival places: the entrance and three activities far from it and each other. */
function defaultSpots(park) {
  const spots = park.entrance ? [{ ...park.entrance, place: 'entrance' }] : [];
  const pois = park.pois.filter((p) => p.active !== false);
  while (spots.length < 4 && pois.length) {
    let best = null,
      bestD = -1;
    for (const p of pois) {
      const d = spots.length ? Math.min(...spots.map((s) => Math.hypot(p.x - s.x, p.z - s.z))) : 0;
      if (d > bestD) [best, bestD] = [p, d];
    }
    spots.push({ x: best.x, z: best.z, place: best.name });
    pois.splice(pois.indexOf(best), 1);
  }
  return spots;
}

/**
 * A clump of marigold blossoms over dark leaves (white blossoms: the instance
 * color paints them). Thousands of them: few triangles each (42).
 */
function clumpGeometry() {
  const blossoms = [
    [0, 0.24, 0, 0.21],
    [0.19, 0.18, 0.09, 0.16],
    [-0.16, 0.17, 0.11, 0.15],
    [0.04, 0.16, -0.18, 0.15],
  ].map(([x, y, z, r]) => part(new THREE.OctahedronGeometry(r, 0).translate(x, y, z), '#ffffff'));
  const leaves = part(new THREE.ConeGeometry(0.3, 0.2, 5).translate(0, 0.1, 0), '#3d6b2c');
  return mergeGeometries([leaves, ...blossoms]);
}

/**
 * `(x, z, margin) => true` within a tree crown (+ margin m), from the park's
 * vegetation.bin (shared/formats/vegetation.js); never without it.
 */
function treeLookup(buffer) {
  if (!buffer) return () => false;
  const trees = decodeVegetation(buffer);
  const CELL = 8;
  const cells = new Map();
  const key = (i, j) => i * 100003 + j;
  for (let i = 0; i < trees.length; i += TREE_STRIDE) {
    const [x, , z, scale, , type] = trees.subarray(i, i + TREE_STRIDE);
    const r = (TREE_SHAPES[type]?.crown ?? 3) * scale;
    const k = key(Math.floor(x / CELL), Math.floor(z / CELL));
    if (!cells.has(k)) cells.set(k, []);
    cells.get(k).push([x, z, r]);
  }
  return (x, z, margin) => {
    const ci = Math.floor(x / CELL),
      cj = Math.floor(z / CELL);
    for (let i = ci - 1; i <= ci + 1; i++)
      for (let j = cj - 1; j <= cj + 1; j++)
        for (const [tx, tz, r] of cells.get(key(i, j)) ?? []) if (Math.hypot(x - tx, z - tz) < r * 0.8 + margin) return true;
    return false;
  };
}
