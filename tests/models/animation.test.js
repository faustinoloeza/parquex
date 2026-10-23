// Moving parts of the mobile export (src/export/animated.js): the models say
// what update() moves, the exporter takes it out of the static meshes as
// prototypes in their own frame, with boxes that hold the whole motion, and
// the bird flocks keep the random layout the web draws.
import { beforeAll, describe, expect, it } from 'vitest';
import { installFakeCanvas } from '../helpers/fake-canvas.js';
import { PARKS } from '#parks/index.js';
import { minstd } from '#shared/random.js';
import { createLandmarksLayer } from '../../src/layers/landmarks.js';
import { faunaLayout } from '../../src/layers/fauna.js';
import { exportAnimated } from '../../src/export/animated.js';

beforeAll(installFakeCanvas);

describe('fauna layout', () => {
  it('draws flamingos, then birds, from minstd(3) as the layer always did', () => {
    const cfg = PARKS.xc.fauna;
    const { flamingos, flocks, rnd } = faunaLayout(cfg);
    const r = minstd(3);
    for (const [k, f] of cfg.flamingos.entries())
      for (let i = 0; i < f.count; i++) {
        const a = r() * Math.PI * 2,
          d = Math.sqrt(r()) * f.r;
        expect(flamingos[k][i]).toEqual({ x: f.x + Math.cos(a) * d, z: f.z + Math.sin(a) * d, yaw: r() * 6.28, s: 0.1 + r() * 0.3 });
      }
    for (const [k, flock] of cfg.birds.entries())
      for (let i = 0; i < flock.count; i++)
        expect(flocks[k][i]).toEqual({
          phase: (i / flock.count) * Math.PI * 2,
          speed: (0.18 + r() * 0.08) * (flock.speed ?? 1),
          rr: flock.r * (0.7 + r() * 0.5),
          hh: flock.h + r() * 8,
        });
    expect(rnd()).toBe(r()); // the dolphins go on with the same sequence
  });
});

describe('animated export (xc)', () => {
  const ANIMATED = new Set(['voladores', 'scenicTower', 'flagpole', 'netDome']);
  const landmarks = PARKS.xc.landmarks.filter((l) => ANIMATED.has(l.type));
  const POSE = 2;
  let layer, parts, result;
  beforeAll(() => {
    layer = createLandmarksLayer({ landmarks, park: { key: 'xc', center: { lat: 20.58, lng: -87.12 } }, heightAt: () => 0 });
    layer.update({ t: POSE, dt: 0 });
    parts = layer.animations.flatMap((a) => a.pieces.flatMap((p) => p.parts.map((part) => (part.isObject3D ? part : part.object))));
    result = exportAnimated({ key: 'xc', landmarks: layer, fauna: PARKS.xc.fauna, poseTime: POSE });
  });
  const piece = (id) => result.json.pieces.find((p) => p.id === id);

  it('describes the tower, the voladores, the flag, the domes and the flocks', () => {
    const ids = result.json.pieces.map((p) => p.id);
    for (const id of ['torre:cabin', 'torre:flag', 'voladores:dance', 'bandera:flag', 'mariposario:flies', 'aviario:flies', 'fauna:birds0'])
      expect(ids).toContain(id);
    expect(ids.filter((id) => id.startsWith('fauna:birds'))).toHaveLength(PARKS.xc.fauna.birds.length);
    expect(piece('voladores:dance').parts).toHaveLength(5); // caporal + 4 flyers
    expect(piece('mariposario:flies').params.flies).toHaveLength(26);
    expect(result.json.nightActivity.birds).toBeLessThan(1);
  });

  it('gives one plain prototype per part, in its own frame and with COLOR_0', () => {
    const names = result.prototypes.map((m) => m.name);
    expect(new Set(names).size).toBe(names.length);
    expect(result.json.pieces.flatMap((p) => p.parts).sort()).toEqual([...names].sort());
    for (const mesh of result.prototypes) {
      expect(mesh.name.startsWith('anim:')).toBe(true);
      expect(mesh.position.length() + mesh.rotation.x + mesh.rotation.y + mesh.rotation.z).toBe(0);
      expect(mesh.geometry.getAttribute('color'), mesh.name).toBeTruthy();
    }
    // the cabin keeps its three materials (glass ring, floor, roof): one primitive each
    expect(result.prototypes.find((m) => m.name === 'anim:torre:cabin:0').material).toHaveLength(3);
  });

  it('takes the moving parts out of the landmarks (not frozen in the static meshes)', () => {
    expect(parts.length).toBeGreaterThan(0);
    for (const p of parts) expect(p.parent).toBeNull();
  });

  it('bounds the whole motion', () => {
    const torre = landmarks.find((l) => l.id === 'torre');
    const H = torre.height;
    const cabin = piece('torre:cabin');
    const drop = 4.4; // the cabin's shell hangs below the moving point (scenic-tower.js → CABIN_DROP): on the ground at rest
    expect(cabin.box[1]).toBeLessThanOrEqual(cabin.position[1] + 5 - drop + 0.1);
    expect(cabin.box[4]).toBeGreaterThanOrEqual(cabin.position[1] + 5 - drop + (H - 18) + 3.8); // top of the climb + roof
    const voladores = piece('voladores:dance');
    const reach = 1.2 + 7.5; // widest circle, at the bottom of the descent
    expect(voladores.box[3] - voladores.box[0]).toBeGreaterThanOrEqual(2 * reach);
    expect(voladores.box[1]).toBeLessThanOrEqual(voladores.position[1] + 3.5 - 1);
    for (const p of result.json.pieces) {
      expect(p.box[3]).toBeGreaterThan(p.box[0]);
      expect(p.size).toBeGreaterThan(0);
    }
  });
});
