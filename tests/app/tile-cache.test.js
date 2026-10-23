import { describe, expect, it } from 'vitest';
import { TileCache } from '../../src/graphics/tile-cache.js';

/** Loader whose downloads the test resolves by hand. */
function manualLoader() {
  const calls = new Map();
  const load = (key, signal) =>
    new Promise((resolve, reject) => {
      calls.set(key, {
        resolve: () =>
          resolve({
            key,
            disposed: false,
            dispose() {
              this.disposed = true;
            },
          }),
        reject,
        signal,
      });
      signal.addEventListener('abort', () => reject(Object.assign(new Error('aborted'), { name: 'AbortError' })));
    });
  return { load, calls };
}
const flush = () => new Promise((r) => setTimeout(r));

describe('TileCache', () => {
  it('downloads the most important tiles first, a few at a time', () => {
    const { load, calls } = manualLoader();
    const cache = new TileCache({ load, concurrency: 2 });
    cache.beginFrame();
    cache.request('far', 30);
    cache.request('near', 10);
    cache.request('mid', 20);
    cache.endFrame();
    expect([...calls.keys()]).toEqual(['near', 'mid']);
  });

  it('serves loaded tiles and evicts the least recently used beyond capacity', async () => {
    const { load, calls } = manualLoader();
    const cache = new TileCache({ load, capacity: 2, concurrency: 8 });
    cache.beginFrame();
    for (const k of ['a', 'b', 'c']) cache.request(k);
    cache.endFrame();
    for (const k of ['a', 'b', 'c']) calls.get(k).resolve();
    await flush();
    cache.beginFrame();
    const a = cache.get('a'); // used this frame
    cache.get('c');
    cache.endFrame();
    expect(cache.loaded.size).toBe(2);
    expect(cache.has('b')).toBe(false);
    expect(a.disposed).toBe(false);
  });

  it('aborts downloads that are no longer requested', async () => {
    const { load, calls } = manualLoader();
    const cache = new TileCache({ load });
    cache.beginFrame();
    cache.request('x');
    cache.endFrame();
    for (let i = 0; i < 40; i++) {
      cache.beginFrame();
      cache.endFrame();
    }
    expect(calls.get('x').signal.aborted).toBe(true);
    expect(cache.busy).toBe(false);
  });

  it('does not retry tiles that failed', async () => {
    const { load, calls } = manualLoader();
    const cache = new TileCache({ load });
    cache.beginFrame();
    cache.request('bad');
    cache.endFrame();
    calls.get('bad').reject(new Error('404'));
    await flush();
    calls.clear();
    cache.beginFrame();
    cache.request('bad');
    cache.endFrame();
    expect(calls.size).toBe(0);
  });
});
