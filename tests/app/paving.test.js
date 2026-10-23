import { describe, expect, it } from 'vitest';
import { pavingGeometry, PAVING_Y } from '../../src/export/paving.js';

/** Signed area (m²) of the triangles seen from above: > 0 when they face up. */
function upArea(geometry) {
  const p = geometry.getAttribute('position');
  const idx = geometry.index.array;
  let area = 0;
  for (let t = 0; t < idx.length; t += 3) {
    const [a, b, c] = [idx[t], idx[t + 1], idx[t + 2]];
    const [ax, az, bx, bz, cx, cz] = [p.getX(a), p.getZ(a), p.getX(b), p.getZ(b), p.getX(c), p.getZ(c)];
    area += ((bz - az) * (cx - ax) - (bx - ax) * (cz - az)) / 2;
  }
  return area;
}

describe('paving layer (mobile export)', () => {
  const size = 64;
  const extent = { cx: 10, cz: -20, size: 128 }; // 2 m per sample

  it('traces a paved disc facing up, flat at PAVING_Y, with about the right area', () => {
    const cover = new Float32Array(size * size);
    for (let v = 0; v < size; v++) for (let u = 0; u < size; u++) cover[v * size + u] = Math.hypot(u + 0.5 - 32, v + 0.5 - 32) < 20 ? 1 : 0;
    const g = pavingGeometry(cover, size, extent);
    const area = upArea(g);
    expect(area).toBeGreaterThan(0.9 * Math.PI * 40 * 40);
    expect(area).toBeLessThan(1.1 * Math.PI * 40 * 40);
    const pos = g.getAttribute('position'),
      nrm = g.getAttribute('normal');
    for (let i = 0; i < pos.count; i++) {
      expect(pos.getY(i)).toBeCloseTo(PAVING_Y, 6);
      expect(nrm.getY(i)).toBe(1);
    }
    // the disc is centered on the extent center
    g.computeBoundingBox();
    expect((g.boundingBox.min.x + g.boundingBox.max.x) / 2).toBeCloseTo(extent.cx, 0);
    expect((g.boundingBox.min.z + g.boundingBox.max.z) / 2).toBeCloseTo(extent.cz, 0);
  });

  it('merges fully paved rows into a few triangles and returns null when nothing is paved', () => {
    const full = pavingGeometry(new Float32Array(size * size).fill(1), size, extent);
    expect(full.index.count / 3).toBe(2 * (size - 1));
    expect(pavingGeometry(new Float32Array(size * size), size, extent)).toBeNull();
  });
});
