import * as THREE from 'three';
import { markShared, releaseAfterUpload } from './memory.js';
import { mulberry32 } from '#shared/random.js';

// Procedural textures drawn on a canvas once and cached. Each one uses its own
// seeded generator so the result is identical on every load.

const cache = new Map();

/** Draws (once) and caches a square canvas texture. */
export function canvasTexture(key, size, draw, repeat = true) {
  if (cache.has(key)) return cache.get(key);
  const c = document.createElement('canvas');
  c.width = c.height = size;
  draw(c.getContext('2d'), size);
  const t = releaseAfterUpload(new THREE.CanvasTexture(c));
  t.colorSpace = THREE.SRGBColorSpace;
  if (repeat) t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 4;
  cache.set(key, markShared(t));
  return t;
}

// Thatch: dense vertical strands, used with UVs running down the roof slope.
export function thatchTexture() {
  const rnd = mulberry32(11);
  return canvasTexture('thatch', 256, (g, s) => {
    g.fillStyle = '#c4a066';
    g.fillRect(0, 0, s, s);
    for (let i = 0; i < 1400; i++) {
      const x = rnd() * s,
        y = rnd() * s,
        l = 10 + rnd() * 30;
      const v = 150 + rnd() * 70;
      g.strokeStyle = `rgba(${v},${v * 0.82},${v * 0.52},0.55)`;
      g.lineWidth = 1 + rnd() * 1.5;
      g.beginPath();
      g.moveTo(x, y);
      g.lineTo(x + (rnd() - 0.5) * 3, y + l);
      g.stroke();
    }
    for (let y = 0; y < s; y += 32) {
      g.fillStyle = 'rgba(90,60,30,0.18)';
      g.fillRect(0, y, s, 3);
    }
  });
}

// Clay tiles: rows of rounded tiles.
export function tileTexture() {
  const rnd = mulberry32(12);
  return canvasTexture('tiles', 256, (g, s) => {
    g.fillStyle = '#e39572';
    g.fillRect(0, 0, s, s);
    const rows = 16,
      cols = 16,
      rh = s / rows,
      cw = s / cols;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * cw + (r % 2 ? cw / 2 : 0);
        const grd = g.createLinearGradient(x, 0, x + cw, 0);
        const k = 0.9 + rnd() * 0.2;
        grd.addColorStop(0, `rgb(${202 * k},${118 * k},${90 * k})`);
        grd.addColorStop(0.5, `rgb(${240 * k},${162 * k},${126 * k})`);
        grd.addColorStop(1, `rgb(${202 * k},${118 * k},${90 * k})`);
        g.fillStyle = grd;
        g.fillRect(x, r * rh, cw - 1, rh - 2);
      }
      g.fillStyle = 'rgba(90,40,28,0.25)';
      g.fillRect(0, r * rh + rh - 2, s, 2);
    }
  });
}

// Cut limestone blocks (kept for reference; the library now uses rubble masonry).
export function stoneTexture() {
  const rnd = mulberry32(13);
  return canvasTexture('stone', 256, (g, s) => {
    g.fillStyle = '#d6ccb2';
    g.fillRect(0, 0, s, s);
    const rh = 16;
    for (let y = 0; y < s; y += rh) {
      let x = (y / rh) % 2 ? -12 : 0;
      while (x < s) {
        const w = 20 + rnd() * 26,
          k = 0.86 + rnd() * 0.2;
        g.fillStyle = `rgb(${214 * k},${204 * k},${178 * k})`;
        g.fillRect(x + 1, y + 1, w - 2, rh - 2);
        x += w;
      }
    }
    for (let i = 0; i < 300; i++) {
      g.fillStyle = `rgba(90,110,60,${rnd() * 0.12})`;
      g.beginPath();
      g.arc(rnd() * s, rnd() * s, rnd() * 8, 0, Math.PI * 2);
      g.fill();
    }
  });
}

/**
 * Seamless Voronoi cells over a size² tile: for every pixel the id of its
 * cell and the distance (px) to the cell border. `cols` × `rows` jittered
 * seeds; distances wrap around the tile edges so the texture repeats.
 */
function voronoiCells(size, cols, rows, rnd, jitter = 0.8) {
  const cw = size / cols,
    ch = size / rows;
  const seeds = [];
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const shift = j % 2 ? 0.5 : 0; // staggered rows read as coursed stone
      seeds.push([(i + shift + 0.5 + (rnd() - 0.5) * jitter) * cw, (j + 0.5 + (rnd() - 0.5) * jitter) * ch]);
    }
  }
  const id = new Int32Array(size * size),
    edge = new Float32Array(size * size);
  for (let y = 0; y < size; y++) {
    const cj = Math.floor(y / ch);
    for (let x = 0; x < size; x++) {
      const ci = Math.floor(x / cw);
      let d1 = Infinity,
        d2 = Infinity,
        best = 0;
      for (let dj = -2; dj <= 2; dj++) {
        for (let di = -2; di <= 2; di++) {
          const jj = cj + dj,
            ii = ci + di;
          const wj = ((jj % rows) + rows) % rows,
            wi = ((ii % cols) + cols) % cols;
          const sd = seeds[wj * cols + wi];
          const sx = sd[0] + (ii - wi) * cw,
            sy = sd[1] + (jj - wj) * ch;
          const d = Math.hypot(x + 0.5 - sx, y + 0.5 - sy);
          if (d < d1) {
            d2 = d1;
            d1 = d;
            best = wj * cols + wi;
          } else if (d < d2) d2 = d;
        }
      }
      id[y * size + x] = best;
      edge[y * size + x] = (d2 - d1) / 2;
    }
  }
  return { id, edge, count: seeds.length };
}

/** Paints `shade(cellTone, edgeDistance, x, y) → [r, g, b]` into the canvas pixel by pixel. */
function paintCells(g, s, cells, tones, shade) {
  const img = g.getImageData(0, 0, s, s);
  const d = img.data;
  if (!d?.length) return; // no real canvas (unit tests)
  for (let i = 0; i < s * s; i++) {
    const [r, gg, b] = shade(tones[cells.id[i]], cells.edge[i], i % s, (i / s) | 0);
    d[i * 4] = r;
    d[i * 4 + 1] = gg;
    d[i * 4 + 2] = b;
    d[i * 4 + 3] = 255;
  }
  g.putImageData(img, 0, 0);
}

// Rubble masonry ("mampostería"): irregular rounded limestone stones with deep
// dark joints, the walls seen all over the park. 4 m per repeat (worldUV),
// stones of ~35 cm. Light so materials can tint it (limestone, rockwall).
export function rubbleTexture() {
  const rnd = mulberry32(17);
  return canvasTexture('rubble', 256, (g, s) => {
    const cells = voronoiCells(s, 12, 14, rnd, 0.9);
    const tones = Array.from({ length: cells.count }, () => {
      const k = 0.8 + rnd() * 0.24,
        warm = rnd() * 10;
      return [228 * k + warm, 222 * k + warm * 0.6, 204 * k];
    });
    paintCells(g, s, cells, tones, ([r, gg, b], e, x, y) => {
      const n = (((x * 73856093) ^ (y * 19349663)) >>> 0) % 23; // grain
      if (e < 1.2) return [126, 119, 106]; // joint
      const bevel = Math.min(1, (e - 1.2) / 4); // rounded stone faces
      const k = (0.8 + 0.2 * bevel) * (0.95 + n / 230);
      return [r * k, gg * k, b * k];
    });
  });
}

// Flagstone paving ("piedra laja"): irregular slabs with thin joints, as on the
// plazas and walkways. Light limestone grey; 256² per repeat (4 m with worldUV).
export function pavingTexture() {
  const rnd = mulberry32(19);
  return canvasTexture('paving', 256, (g, s) => {
    const cells = voronoiCells(s, 8, 8, rnd, 1);
    const tones = Array.from({ length: cells.count }, () => {
      const k = 0.92 + rnd() * 0.12;
      return [222 * k, 219 * k, 208 * k];
    });
    paintCells(g, s, cells, tones, ([r, gg, b], e, x, y) => {
      const n = (((x * 2654435761) ^ (y * 40503)) >>> 0) % 17;
      if (e < 0.9) return [160, 155, 143];
      const k = (e < 2.5 ? 0.95 : 1) * (0.97 + n / 400);
      return [r * k, gg * k, b * k];
    });
  });
}

// One facade bay (3.2 m wide x 3.3 m storey): plaster with a framed window.
// White so it can be tinted by the material color.
export function facadeTexture() {
  return canvasTexture('facade', 128, (g, s) => {
    g.fillStyle = '#ffffff';
    g.fillRect(0, 0, s, s);
    const n = g.createLinearGradient(0, 0, 0, s);
    n.addColorStop(0, 'rgba(0,0,0,0.05)');
    n.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = n;
    g.fillRect(0, 0, s, s);
    // window with frame and sill
    g.fillStyle = '#d9cfbd';
    g.fillRect(38, 30, 52, 62);
    g.fillStyle = '#3b4b57';
    g.fillRect(42, 34, 44, 54);
    g.fillStyle = 'rgba(160,205,225,0.55)';
    g.fillRect(44, 36, 18, 50);
    g.fillStyle = '#d9cfbd';
    g.fillRect(62, 34, 4, 54);
    g.fillStyle = '#bfb39d';
    g.fillRect(34, 92, 60, 6);
    // storey band
    g.fillStyle = 'rgba(0,0,0,0.08)';
    g.fillRect(0, 0, s, 5);
  });
}

/** Facade bays per side of facadeGlowTexture(). */
const GLOW_BAYS = 4;

// Night windows of facadeTexture(): its emissive map (black wall, glowing
// glass). One texture holds 4 × 4 bays, most lit (warm, of varying
// brightness), some dark, so a wall does not glow in a uniform grid; its
// repeat (1/4) makes one facade UV unit still one bay.
export function facadeGlowTexture() {
  const rnd = mulberry32(23);
  const t = canvasTexture('facade-glow', 128 * GLOW_BAYS, (g, s) => {
    g.fillStyle = '#000000';
    g.fillRect(0, 0, s, s);
    const b = s / GLOW_BAYS;
    for (let j = 0; j < GLOW_BAYS; j++) {
      for (let i = 0; i < GLOW_BAYS; i++) {
        const lit = rnd() < 0.72;
        const k = lit ? 0.6 + rnd() * 0.4 : 0.05;
        const x = i * b,
          y = j * b;
        // same window as facadeTexture (glass 44 × 54 px at 42, 34), brighter low in the room
        const grd = g.createLinearGradient(0, y + 34, 0, y + 88);
        grd.addColorStop(0, `rgb(${255 * k * 0.8},${214 * k * 0.8},${150 * k * 0.8})`);
        grd.addColorStop(1, `rgb(${255 * k},${226 * k},${170 * k})`);
        g.fillStyle = grd;
        g.fillRect(x + 42, y + 34, 44, 54);
        g.fillStyle = '#000000';
        g.fillRect(x + 62, y + 34, 4, 54); // mullion
      }
    }
  });
  t.repeat.set(1 / GLOW_BAYS, 1 / GLOW_BAYS);
  t.name = 'facade-glow';
  return t;
}

// Net for aviaries / butterfly pavilion.
// Interlocking concrete pavers (adoquín) in running bond: grey blocks with a
// little tone variation and dark joints. 256² px per repeat (4 m with worldUV):
// blocks of 0.25 × 0.125 m.
export function paversTexture() {
  const rnd = mulberry32(29);
  return canvasTexture('pavers', 256, (g, s) => {
    g.fillStyle = '#8e8d88';
    g.fillRect(0, 0, s, s);
    const bw = s / 16,
      bh = s / 32;
    for (let j = 0; j < 32; j++)
      for (let i = -1; i < 16; i++) {
        const v = 196 + Math.floor(rnd() * 24);
        g.fillStyle = `rgb(${v},${v - 1},${v - 5})`;
        g.fillRect(i * bw + (j % 2 ? bw / 2 : 0) + 1, j * bh + 1, bw - 2, bh - 2);
      }
  });
}

// Mexican textile patterns (the XCARET letters at the river exit): 4 × 4
// tiles, each a stepped diamond, zigzag, cross or stripes in its own palette.
// 256² px; with worldUV (0.25) one tile is 1 m.
export function textileTexture() {
  const palettes = [
    ['#1d4f9c', '#f2c33a', '#f6f1e4'],
    ['#b8482a', '#f0a63a', '#3a2418'],
    ['#f6f1e4', '#222222', '#c43c3c'],
    ['#2a8f8a', '#f6f1e4', '#e0662e'],
    ['#7a3a8c', '#f2c33a', '#2fb5c9'],
  ];
  return canvasTexture('textile', 256, (g, s) => {
    const t = s / 4;
    for (let j = 0; j < 4; j++)
      for (let i = 0; i < 4; i++) {
        const [bg, a, b] = palettes[(i * 3 + j * 2) % palettes.length];
        const x0 = i * t,
          y0 = j * t,
          c = t / 2;
        g.fillStyle = bg;
        g.fillRect(x0, y0, t, t);
        const kind = (i + j * 2) % 4;
        if (kind === 0) {
          // stepped diamonds
          for (let r = 4; r > 0; r--) {
            g.fillStyle = r % 2 ? a : b;
            const w = (r / 4) * c * 0.9;
            for (let st = 0; st < 4; st++) {
              const h = (w * (4 - st)) / 4;
              g.fillRect(x0 + c - h, y0 + c - w + (st * w) / 4, 2 * h, (w / 4) * 0.9);
              g.fillRect(x0 + c - h, y0 + c + w - ((st + 1) * w) / 4, 2 * h, (w / 4) * 0.9);
            }
          }
        } else if (kind === 1) {
          // zigzag bands
          g.lineWidth = t / 12;
          for (let r = 0; r < 4; r++) {
            g.strokeStyle = r % 2 ? a : b;
            g.beginPath();
            for (let k = 0; k <= 8; k++) g.lineTo(x0 + (k * t) / 8, y0 + (r + 0.5) * (t / 4) + (k % 2 ? -t / 14 : t / 14));
            g.stroke();
          }
        } else if (kind === 2) {
          // stepped cross (star flower)
          g.fillStyle = a;
          g.fillRect(x0 + c - t * 0.1, y0 + t * 0.12, t * 0.2, t * 0.76);
          g.fillRect(x0 + t * 0.12, y0 + c - t * 0.1, t * 0.76, t * 0.2);
          g.fillStyle = b;
          g.fillRect(x0 + c - t * 0.2, y0 + c - t * 0.2, t * 0.4, t * 0.4);
          g.fillStyle = a;
          g.fillRect(x0 + c - t * 0.07, y0 + c - t * 0.07, t * 0.14, t * 0.14);
        } else {
          // stripes with small squares
          for (let r = 0; r < 6; r++) {
            g.fillStyle = r % 2 ? a : b;
            g.fillRect(x0, y0 + (r * t) / 6, t, t / 14);
            for (let k = 0; k < 5; k++) g.fillRect(x0 + (k + 0.3) * (t / 5), y0 + (r + 0.45) * (t / 6), t / 16, t / 16);
          }
        }
      }
  });
}

// Chain-link fence: pale galvanized wire diamonds on transparency (64² px per
// repeat; the bridge of the felines' habitat maps one repeat to 0.8 m).
export function chainLinkTexture() {
  return canvasTexture('chainLink', 64, (g, s) => {
    g.clearRect(0, 0, s, s);
    g.strokeStyle = 'rgba(214,219,221,0.9)';
    g.lineWidth = 1.6;
    const n = 6; // diamonds per side
    for (let i = -n; i <= n; i++) {
      const o = (i * s) / n;
      g.beginPath();
      g.moveTo(o, 0);
      g.lineTo(o + s, s);
      g.moveTo(o, s);
      g.lineTo(o + s, 0);
      g.stroke();
    }
  });
}

export function netTexture() {
  return canvasTexture('net', 128, (g, s) => {
    g.clearRect(0, 0, s, s);
    g.strokeStyle = 'rgba(35,45,40,0.55)';
    g.lineWidth = 1.2;
    for (let i = 0; i <= s; i += 16) {
      g.beginPath();
      g.moveTo(i, 0);
      g.lineTo(i, s);
      g.stroke();
      g.beginPath();
      g.moveTo(0, i);
      g.lineTo(s, i);
      g.stroke();
    }
  });
}
