// Regions (src/parks/xcr): built like a satellite-mode park, with a lighter output.
import { describe, expect, it } from 'vitest';
import { REGION_MAX_TREES, thinTrees } from '../../pipeline/stages/vegetation.js';
import { TREE_STRIDE } from '#shared/formats/vegetation.js';

describe('thinTrees', () => {
  const trees = (n) => Array.from({ length: n * TREE_STRIDE }, (_, i) => Math.floor(i / TREE_STRIDE));

  it('keeps an even subset of whole trees, at most `max`', () => {
    const out = thinTrees(trees(1000), 300);
    expect(out.length % TREE_STRIDE).toBe(0);
    expect(out.length / TREE_STRIDE).toBeLessThanOrEqual(300);
    expect(out.length / TREE_STRIDE).toBeGreaterThan(200);
    // every kept tree is intact (all its values from the same tree)
    for (let i = 0; i < out.length; i += TREE_STRIDE) expect(new Set(out.slice(i, i + TREE_STRIDE)).size).toBe(1);
  });

  it('returns the same array when it already fits', () => {
    const t = trees(10);
    expect(thinTrees(t, REGION_MAX_TREES)).toBe(t);
  });
});
