/**
 * Streams tiles (ground detail, map tiles…) with bounded memory:
 *  - request(key, priority) every frame for the tiles the view needs;
 *  - at most `concurrency` downloads at a time, most important first;
 *  - downloads no longer requested are aborted;
 *  - beyond `capacity` loaded tiles, the least recently used are disposed.
 *
 *   const cache = new TileCache({ load: (key, signal) => loadTexture(urlOf(key), { signal }) });
 *   cache.beginFrame();
 *   const tex = cache.get(key) ?? (cache.request(key, priority), fallback);
 *   cache.endFrame();
 *
 * @template T
 */
export class TileCache {
  /**
   * @param {object} options
   * @param {(key: string, signal: AbortSignal) => Promise<T>} options.load
   * @param {(value: T) => void} [options.dispose]
   * @param {number} [options.capacity]     loaded tiles kept
   * @param {number} [options.concurrency]  parallel downloads
   */
  constructor({ load, dispose = (value) => value?.dispose?.(), capacity = 64, concurrency = 6 }) {
    this.load = load;
    this.disposeValue = dispose;
    this.capacity = capacity;
    this.concurrency = concurrency;
    /** @type {Map<string, { value: T, used: number }>} */
    this.loaded = new Map();
    /** @type {Map<string, { controller: AbortController, requested: number }>} */
    this.pending = new Map();
    /** @type {Map<string, number>} key → priority (lower first), this frame */
    this.wanted = new Map();
    this.failed = new Set();
    this.frame = 0;
    this.onLoad = null; // called when a tile arrives (e.g. to redraw)
  }

  beginFrame() {
    this.frame++;
    this.wanted.clear();
  }

  /** Loaded value for `key` (marks it as used), or undefined. */
  get(key) {
    const entry = this.loaded.get(key);
    if (!entry) return undefined;
    entry.used = this.frame;
    return entry.value;
  }

  has(key) {
    return this.loaded.has(key);
  }

  /** Asks for `key` this frame; lower priority values load first. */
  request(key, priority = 0) {
    if (this.loaded.has(key) || this.failed.has(key)) return;
    const p = this.wanted.get(key);
    if (p === undefined || priority < p) this.wanted.set(key, priority);
    const pending = this.pending.get(key);
    if (pending) pending.requested = this.frame;
  }

  /** Starts downloads, aborts stale ones and evicts old tiles. */
  endFrame() {
    for (const [key, p] of this.pending) {
      if (this.frame - p.requested > 30) {
        p.controller.abort();
        this.pending.delete(key);
      }
    }
    if (this.pending.size < this.concurrency && this.wanted.size) {
      const queue = [...this.wanted].filter(([key]) => !this.pending.has(key)).sort((a, b) => a[1] - b[1]);
      for (const [key] of queue.slice(0, this.concurrency - this.pending.size)) this.start(key);
    }
    if (this.loaded.size > this.capacity) {
      const old = [...this.loaded].filter(([, e]) => e.used < this.frame).sort((a, b) => a[1].used - b[1].used);
      for (const [key, entry] of old.slice(0, this.loaded.size - this.capacity)) {
        this.loaded.delete(key);
        this.disposeValue(entry.value);
      }
    }
  }

  start(key) {
    const controller = new AbortController();
    this.pending.set(key, { controller, requested: this.frame });
    this.load(key, controller.signal).then(
      (value) => {
        if (this.pending.get(key)?.controller !== controller) return this.disposeValue(value);
        this.pending.delete(key);
        this.loaded.set(key, { value, used: this.frame });
        this.onLoad?.(key);
      },
      (err) => {
        if (this.pending.get(key)?.controller === controller) this.pending.delete(key);
        if (err?.name !== 'AbortError') this.failed.add(key); // do not retry broken tiles
      },
    );
  }

  /** True while downloads are in flight or waiting. */
  get busy() {
    return this.pending.size > 0 || [...this.wanted.keys()].some((k) => !this.loaded.has(k) && !this.failed.has(k));
  }

  dispose() {
    for (const p of this.pending.values()) p.controller.abort();
    for (const e of this.loaded.values()) this.disposeValue(e.value);
    this.pending.clear();
    this.loaded.clear();
  }
}
