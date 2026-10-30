import { describe, expect, it } from 'vitest';
import { GZIP_SUFFIX, WATER_WEBP, startupFiles } from '../../pipeline/vite-fast-load.js';

describe('fast start (pipeline/vite-fast-load.js)', () => {
  it('preloads the files loadParkAssets asks for, packed in production', () => {
    expect(startupFiles(false)).toEqual([
      'park.json',
      'height.bin',
      'vegetation.bin',
      'ground/0-0-0.webp',
      'water.png',
      'buildings.json',
      'paving.png',
    ]);
    const packed = startupFiles(true);
    expect(packed).toContain('height.bin' + GZIP_SUFFIX);
    expect(packed).toContain('vegetation.bin' + GZIP_SUFFIX);
    expect(packed).toContain(WATER_WEBP);
    expect(packed.filter((f) => f.endsWith('.bin') || f === 'water.png')).toEqual([]);
  });
});
