import * as THREE from 'three';
import { minstd } from '#shared/random.js';
import { flapMaterial, flapTime } from '../graphics/shaders/flap.js';
import { flamingoGeometry, birdGeometry, dolphinGeometry } from '../models/parts/creatures.js';
import { NIGHT_ACTIVITY, nightActivity } from '../graphics/night.js';

/** Material and wing beat (graphics/shaders/flap.js) of the bird flocks; also for the mobile export (export/animated.js). */
export const BIRD_MATERIAL = { vertexColors: true, roughness: 0.8, side: THREE.DoubleSide };
export const BIRD_FLAP = { axis: 'z', speed: 9, amp: 0.7, threshold: 0.2 };
export const BIRD_SCALE = 1.4;

/** Geometry of a flock's birds (its colors, wing span). */
export const flockGeometry = (flock) =>
  birdGeometry(
    flock.colors.map((c) => new THREE.Color(c).getStyle()),
    flock.span ?? 1.6,
  );

/**
 * Random layout of the wildlife, drawn from minstd(3) in a fixed order
 * (flamingos, then birds; `rnd` goes on for the dolphins), so the web and the
 * mobile export (export/animated.js, the app's driver "flock") agree.
 * @param {object} cfg src/parks/<park>/fauna.js
 */
export function faunaLayout(cfg = {}) {
  const rnd = minstd(3);
  const flamingos = (cfg.flamingos ?? []).map((f) => {
    const birds = [];
    for (let i = 0; i < f.count; i++) {
      const a = rnd() * Math.PI * 2,
        r = Math.sqrt(rnd()) * f.r;
      birds.push({ x: f.x + Math.cos(a) * r, z: f.z + Math.sin(a) * r, yaw: rnd() * 6.28, s: 0.1 + rnd() * 0.3 });
    }
    return birds;
  });
  const flocks = (cfg.birds ?? []).map((flock) => {
    const birds = [];
    for (let i = 0; i < flock.count; i++) {
      birds.push({
        phase: (i / flock.count) * Math.PI * 2,
        speed: (0.18 + rnd() * 0.08) * (flock.speed ?? 1),
        rr: flock.r * (0.7 + rnd() * 0.5),
        hh: flock.h + rnd() * 8,
      });
    }
    return birds;
  });
  return { rnd, flamingos, flocks };
}

/**
 * Animated wildlife (src/parks/<park>/fauna.js):
 *   flamingos  { x, z, r, count }               standing flock that turns slowly
 *   birds      { x, z, r, h, count, colors, span?, speed?, scale? }  circling flock
 *   dolphins   { x, z, rx, rz, count }          jumping out of a pool
 * Hidden (and not animated) on the low quality preset. At night (graphics/night.js)
 * they rest: flamingos barely move, most birds roost and the rest fly slowly,
 * dolphins seldom jump (NIGHT_ACTIVITY), blended with the day/night transition.
 * @returns {import('./index.js').Layer}
 */
export function createFaunaLayer({ fauna: cfg = {} }) {
  const group = new THREE.Group();
  group.name = 'fauna';
  const updaters = [];
  const layout = faunaLayout(cfg);
  const { rnd } = layout;

  for (const [k, f] of (cfg.flamingos ?? []).entries()) {
    const mesh = new THREE.InstancedMesh(
      flamingoGeometry(),
      new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.7 }),
      f.count,
    );
    const birds = layout.flamingos[k];
    group.add(mesh);
    const m = new THREE.Matrix4(),
      q = new THREE.Quaternion(),
      up = new THREE.Vector3(0, 1, 0),
      one = new THREE.Vector3(1, 1, 1);
    updaters.push((t, dt, life) => {
      birds.forEach((b, i) => {
        q.setFromAxisAngle(up, b.yaw + Math.sin(t * b.s + i) * 0.8 * life.sway);
        m.compose(new THREE.Vector3(b.x, -0.6, b.z), q, one);
        mesh.setMatrixAt(i, m);
      });
      mesh.instanceMatrix.needsUpdate = true;
    });
  }

  for (const [k, flock] of (cfg.birds ?? []).entries()) {
    const mat = flapMaterial(THREE.MeshStandardMaterial, BIRD_MATERIAL, BIRD_FLAP);
    const mesh = new THREE.InstancedMesh(flockGeometry(flock), mat, flock.count);
    mesh.frustumCulled = false;
    group.add(mesh);
    const birds = layout.flocks[k];
    const m = new THREE.Matrix4(),
      q = new THREE.Quaternion(),
      up = new THREE.Vector3(0, 1, 0);
    const sc = new THREE.Vector3().setScalar(flock.scale ?? BIRD_SCALE),
      p = new THREE.Vector3();
    updaters.push((t, dt, life) => {
      mesh.count = Math.max(1, Math.round(flock.count * life.birds));
      birds.forEach((b, i) => {
        const a = b.phase + t * b.speed;
        p.set(flock.x + Math.cos(a) * b.rr, b.hh + Math.sin(t * 0.7 + b.phase) * 3, flock.z + Math.sin(a) * b.rr * 0.8);
        q.setFromAxisAngle(up, Math.atan2(-Math.cos(a) * 0.8, -Math.sin(a)));
        mesh.setMatrixAt(i, m.compose(p, q, sc));
      });
      mesh.instanceMatrix.needsUpdate = true;
    });
  }

  for (const pod of cfg.dolphins ?? []) {
    const geo = dolphinGeometry();
    const mat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.4 });
    for (let i = 0; i < pod.count; i++) {
      const d = new THREE.Mesh(geo, mat);
      group.add(d);
      const period = 7 + rnd() * 5,
        offset = rnd() * period;
      let jump = null,
        last = -1;
      updaters.push((t, dt, life) => {
        // real time for the jump itself, so a jump never plays in slow motion
        t = life.clock;
        const k = Math.floor((t + offset) / period);
        if (k !== last) {
          last = k;
          const a = rnd() * Math.PI * 2;
          jump = { x: pod.x + (rnd() - 0.5) * pod.rx * 1.4, z: pod.z + (rnd() - 0.5) * pod.rz * 1.4, dx: Math.cos(a), dz: Math.sin(a) };
          jump.skip = rnd() > life.jumps; // at night most periods pass without a jump
        }
        const p = ((t + offset) % period) / 1.6; // 1.6 s jump
        if (p > 1 || jump.skip) {
          d.visible = false;
          return;
        }
        d.visible = true;
        const s = (p - 0.5) * 6;
        d.position.set(jump.x + jump.dx * s, Math.sin(p * Math.PI) * 2.6 - 0.4, jump.z + jump.dz * s);
        d.rotation.set(0, Math.atan2(-jump.dz, jump.dx), Math.cos(p * Math.PI) * 0.9);
      });
    }
  }

  // activity clock: runs slower at night, so flocks drift and turn slowly
  let pace = 0;
  const life = { clock: 0, sway: 1, birds: 1, jumps: 1 };
  return {
    name: 'fauna',
    object: group,
    setQuality(preset) {
      group.visible = preset.fauna;
    },
    update({ t, dt = 0 }) {
      if (!group.visible) return;
      pace += dt * nightActivity(NIGHT_ACTIVITY.pace);
      life.clock = t;
      life.sway = nightActivity(NIGHT_ACTIVITY.pace);
      life.birds = nightActivity(NIGHT_ACTIVITY.birds);
      life.jumps = nightActivity(NIGHT_ACTIVITY.jumps);
      flapTime.value = t; // wing beats keep their real speed
      for (const u of updaters) u(pace, dt, life);
    },
  };
}
