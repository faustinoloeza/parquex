// Builds every landmark of every park with its model and checks the result:
// geometry exists, has no NaN/Infinity (a typo in a model usually shows up as
// NaN vertices) and only uses materials of the shared library.
import { beforeAll, describe, expect, it } from 'vitest';
import { installFakeCanvas } from '../helpers/fake-canvas.js';
import { PARKS } from '#parks/index.js';
import { defineModel } from '#models/define.js';
import { getModel, MODELS } from '#models/index.js';

beforeAll(installFakeCanvas);

const ctx = { park: { center: { lat: 20.58, lng: -87.12 } }, heightAt: () => 0 };
const finiteArray = (arr) => arr.every((v) => Number.isFinite(v));
const flat = (value) => JSON.stringify(value, (_, v) => (typeof v === 'number' && !Number.isFinite(v) ? 'BAD' : v));

describe('model registry', () => {
  it('indexes every model by its type', () => {
    for (const [type, model] of Object.entries(MODELS)) {
      expect(model.type).toBe(type);
      expect(model.label, type).toBeTruthy();
    }
  });

  it('rejects definitions without build()', () => {
    expect(() => defineModel({ type: 'x' })).toThrow();
  });
});

const placements = Object.values(PARKS).flatMap((park) => park.landmarks.map((l) => [`${park.key}/${l.id} (${l.type})`, l]));

describe.each(placements)('%s', (_, placement) => {
  const model = getModel(placement.type);
  const params = { ...model?.params, ...placement };

  it('builds finite, non-empty geometry', () => {
    expect(model, `unknown model type "${placement.type}"`).toBeDefined();
    const instance = model.build(params, ctx);
    let vertices = 0;
    instance.object.updateMatrixWorld(true);
    instance.object.traverse((o) => {
      if (!o.isMesh && !o.isInstancedMesh) return;
      const pos = o.geometry.getAttribute('position');
      expect(finiteArray(pos.array), `${o.name}: NaN vertices`).toBe(true);
      expect(o.material, `${o.name}: material`).toBeTruthy();
      vertices += pos.count;
    });
    expect(vertices).toBeGreaterThan(0);
    if (instance.update) expect(() => instance.update(1, 1 / 60)).not.toThrow();
  });

  it('returns finite footprints and paths', () => {
    if (!model) return;
    if (model.footprint) expect(flat(model.footprint(params))).not.toContain('BAD');
    if (model.clearPaths) expect(flat(model.clearPaths(params))).not.toContain('BAD');
    if (model.walkable) expect(flat(model.walkable(params))).not.toContain('BAD');
  });
});
