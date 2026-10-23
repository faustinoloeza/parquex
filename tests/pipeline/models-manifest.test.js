import { afterAll, describe, expect, it } from 'vitest';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { APP_FILES, MANIFEST_FORMAT, assetName, buildManifest } from '../../pipeline/lib/models-manifest.js';

const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'xh-manifest-'));
afterAll(() => fs.rm(dir, { recursive: true, force: true }));

describe('buildManifest', () => {
  it('lists the app files of each park with size, SHA-256 and asset name', async () => {
    await fs.mkdir(path.join(dir, 'xc'), { recursive: true });
    await fs.writeFile(path.join(dir, 'xc', 'park.json'), '{"key":"xc"}');
    await fs.writeFile(path.join(dir, 'xc', 'park-models.glb'), Buffer.from([1, 2, 3]));
    await fs.writeFile(path.join(dir, 'xc', 'park-preview.png'), 'not for the app');
    const m = await buildManifest(dir, ['xc', 'xh'], { tag: 'models-test', published: '2026-10-23T00:00:00Z' });
    expect(m).toMatchObject({ format: MANIFEST_FORMAT, tag: 'models-test', published: '2026-10-23T00:00:00Z' });
    expect(Object.keys(m.parks)).toEqual(['xc']); // no folder for xh
    expect(Object.keys(m.parks.xc.files)).toEqual(['park.json', 'park-models.glb']);
    expect(m.parks.xc.files['park-models.glb']).toEqual({
      size: 3,
      sha256: crypto
        .createHash('sha256')
        .update(Buffer.from([1, 2, 3]))
        .digest('hex'),
      asset: 'xc.park-models.glb',
    });
    expect(APP_FILES).not.toContain('park-preview.png');
    expect(assetName('xh', 'context.json')).toBe('xh.context.json');
  });
});
