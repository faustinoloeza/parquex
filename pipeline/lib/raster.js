// Raster toolkit for the pipeline: images are flat typed arrays of w × h
// pixels, index = y * w + x.

// Separable box blur, repeated `passes` times (3 passes ~ gaussian).
export function blur(src, w, h, r, passes = 3) {
  const a = Float32Array.from(src);
  const b = new Float32Array(a.length);
  if (r < 1) return a;
  const n = 2 * r + 1;
  for (let p = 0; p < passes; p++) {
    for (let y = 0; y < h; y++) {
      const row = y * w;
      let acc = 0;
      for (let x = -r; x <= r; x++) acc += a[row + Math.min(w - 1, Math.max(0, x))];
      for (let x = 0; x < w; x++) {
        b[row + x] = acc / n;
        acc += a[row + Math.min(w - 1, x + r + 1)] - a[row + Math.max(0, x - r)];
      }
    }
    for (let x = 0; x < w; x++) {
      let acc = 0;
      for (let y = -r; y <= r; y++) acc += b[Math.min(h - 1, Math.max(0, y)) * w + x];
      for (let y = 0; y < h; y++) {
        a[y * w + x] = acc / n;
        acc += b[Math.min(h - 1, y + r + 1) * w + x] - b[Math.max(0, y - r) * w + x];
      }
    }
  }
  return a;
}

// Chamfer (3-4) distance in pixels from every pixel to the nearest `inside` pixel.
export function distanceTo(inside, w, h) {
  const INF = 1e9;
  const d = new Float32Array(w * h);
  for (let i = 0; i < d.length; i++) d[i] = inside[i] ? 0 : INF;
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      let v = d[i];
      if (x > 0) v = Math.min(v, d[i - 1] + 3);
      if (y > 0) {
        v = Math.min(v, d[i - w] + 3);
        if (x > 0) v = Math.min(v, d[i - w - 1] + 4);
        if (x < w - 1) v = Math.min(v, d[i - w + 1] + 4);
      }
      d[i] = v;
    }
  for (let y = h - 1; y >= 0; y--)
    for (let x = w - 1; x >= 0; x--) {
      const i = y * w + x;
      let v = d[i];
      if (x < w - 1) v = Math.min(v, d[i + 1] + 3);
      if (y < h - 1) {
        v = Math.min(v, d[i + w] + 3);
        if (x < w - 1) v = Math.min(v, d[i + w + 1] + 4);
        if (x > 0) v = Math.min(v, d[i + w - 1] + 4);
      }
      d[i] = v;
    }
  for (let i = 0; i < d.length; i++) d[i] /= 3;
  return d;
}

// Majority filter over a (2r+1)^2 window.
export function modeFilter(cls, w, h, r, nClasses) {
  const out = new Uint8Array(cls.length);
  const counts = new Int32Array(nClasses);
  for (let y = 0; y < h; y++) {
    counts.fill(0);
    const y0 = Math.max(0, y - r),
      y1 = Math.min(h - 1, y + r);
    for (let yy = y0; yy <= y1; yy++) for (let xx = 0; xx <= Math.min(w - 1, r); xx++) counts[cls[yy * w + xx]]++;
    for (let x = 0; x < w; x++) {
      let best = cls[y * w + x],
        bc = counts[best];
      for (let c = 0; c < nClasses; c++)
        if (counts[c] > bc) {
          bc = counts[c];
          best = c;
        }
      out[y * w + x] = best;
      const xo = x - r,
        xi = x + r + 1;
      for (let yy = y0; yy <= y1; yy++) {
        if (xo >= 0) counts[cls[yy * w + xo]]--;
        if (xi < w) counts[cls[yy * w + xi]]++;
      }
    }
  }
  return out;
}

// Multi-source BFS: every pixel with value `unknown` takes the value of the
// nearest known pixel (4-connected), mapped through `seedMap`. Known pixels
// keep their own value.
export function fillUnknown(cls, w, h, unknown, seedMap = (c) => c) {
  const out = Uint8Array.from(cls);
  const prop = new Uint8Array(cls.length);
  const queue = new Int32Array(cls.length);
  let qh = 0,
    qt = 0;
  const seen = new Uint8Array(cls.length);
  for (let i = 0; i < cls.length; i++) {
    if (cls[i] !== unknown) {
      prop[i] = seedMap(cls[i]);
      seen[i] = 1;
      queue[qt++] = i;
    }
  }
  while (qh < qt) {
    const i = queue[qh++];
    const x = i % w,
      y = (i / w) | 0;
    const nb = [x > 0 ? i - 1 : -1, x < w - 1 ? i + 1 : -1, y > 0 ? i - w : -1, y < h - 1 ? i + w : -1];
    for (const j of nb)
      if (j >= 0 && !seen[j]) {
        seen[j] = 1;
        prop[j] = prop[i];
        out[j] = prop[i];
        queue[qt++] = j;
      }
  }
  return out;
}

// 4-connected components of pixels where `pred(i)` holds.
export function components(n, w, h, pred) {
  const label = new Int32Array(n).fill(-1);
  const comps = [];
  const stack = new Int32Array(n);
  for (let s = 0; s < n; s++) {
    if (label[s] !== -1 || !pred(s)) continue;
    const id = comps.length;
    const pixels = [];
    let sp = 0;
    stack[sp++] = s;
    label[s] = id;
    while (sp) {
      const i = stack[--sp];
      pixels.push(i);
      const x = i % w,
        y = (i / w) | 0;
      if (x > 0 && label[i - 1] === -1 && pred(i - 1)) {
        label[i - 1] = id;
        stack[sp++] = i - 1;
      }
      if (x < w - 1 && label[i + 1] === -1 && pred(i + 1)) {
        label[i + 1] = id;
        stack[sp++] = i + 1;
      }
      if (y > 0 && label[i - w] === -1 && pred(i - w)) {
        label[i - w] = id;
        stack[sp++] = i - w;
      }
      if (y < h - 1 && label[i + w] === -1 && pred(i + w)) {
        label[i + w] = id;
        stack[sp++] = i + w;
      }
    }
    comps.push({ id, pixels });
  }
  return { label, comps };
}

// Scanline polygon fill; poly is [[x, y], ...] in pixel units.
export function rasterizePolygon(poly, w, h, cb) {
  let minY = Infinity,
    maxY = -Infinity;
  for (const [, y] of poly) {
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }
  for (let y = Math.max(0, Math.ceil(minY)); y <= Math.min(h - 1, Math.floor(maxY)); y++) {
    const xs = [];
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const [x0, y0] = poly[j],
        [x1, y1] = poly[i];
      if ((y0 <= y && y1 > y) || (y1 <= y && y0 > y)) xs.push(x0 + ((y - y0) / (y1 - y0)) * (x1 - x0));
    }
    xs.sort((a, b) => a - b);
    for (let k = 0; k + 1 < xs.length; k += 2) {
      for (let x = Math.max(0, Math.ceil(xs[k])); x <= Math.min(w - 1, Math.floor(xs[k + 1])); x++) cb(y * w + x, x, y);
    }
  }
}

// Oriented bounding box via PCA of a point set [[x, y], ...].
export function orientedBox(points) {
  let mx = 0,
    my = 0;
  for (const [x, y] of points) {
    mx += x;
    my += y;
  }
  mx /= points.length;
  my /= points.length;
  let sxx = 0,
    syy = 0,
    sxy = 0;
  for (const [x, y] of points) {
    const dx = x - mx,
      dy = y - my;
    sxx += dx * dx;
    syy += dy * dy;
    sxy += dx * dy;
  }
  const angle = 0.5 * Math.atan2(2 * sxy, sxx - syy);
  const c = Math.cos(angle),
    s = Math.sin(angle);
  let a0 = Infinity,
    a1 = -Infinity,
    b0 = Infinity,
    b1 = -Infinity;
  for (const [x, y] of points) {
    const dx = x - mx,
      dy = y - my;
    const a = dx * c + dy * s,
      b = -dx * s + dy * c;
    a0 = Math.min(a0, a);
    a1 = Math.max(a1, a);
    b0 = Math.min(b0, b);
    b1 = Math.max(b1, b);
  }
  const ca = (a0 + a1) / 2,
    cb = (b0 + b1) / 2;
  return { cx: mx + ca * c - cb * s, cy: my + ca * s + cb * c, length: a1 - a0, width: b1 - b0, angle };
}

export function polygonArea(poly) {
  let a = 0;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) a += poly[j][0] * poly[i][1] - poly[i][0] * poly[j][1];
  return a / 2;
}

export function pointInPolygon(x, y, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i],
      [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

/**
 * Calls fn(du, dv) for every integer offset inside a disc of `radius` pixels.
 */
export function forEachInDisc(radius, fn) {
  const r = Math.ceil(radius);
  for (let dv = -r; dv <= radius; dv++) {
    for (let du = -r; du <= radius; du++) {
      if (du * du + dv * dv <= radius * radius) fn(du, dv);
    }
  }
}
