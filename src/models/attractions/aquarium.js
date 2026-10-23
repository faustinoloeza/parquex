import { extrudePolygon } from '../../graphics/geometry.js';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/**
 * Acuario de Arrecife de Coral: low flat-roofed white building with an
 * angular plan, a glazed wall on its diagonal side, a dark wooden roof over
 * the court and a separate block with a strip of panels on its roof.
 * Shapes in local meters (satellite imagery + official map):
 *   outline      main building [[x, z], ...]
 *   glass        [[x, z], [x, z]] glazed edge of the outline
 *   court        [x0, z0, x1, z1] wooden roof
 *   annex        [x0, z0, x1, z1] block with panels on the southern half of its roof
 */
export default defineModel({
  type: 'aquarium',
  label: 'Acuario (edificio de techo plano)',
  params: { outline: [], glass: null, court: null, annex: null, height: 6 },
  build(p) {
    const k = new ModelKit();
    const H = p.height;
    k.add('concrete', extrudePolygon(p.outline, H + 1), 0, -1, 0);
    // parapet band around the roof
    k.add('white', extrudePolygon(p.outline, 0.5, { top: false }), 0, H, 0);
    if (p.glass) {
      const [[ax, az], [bx, bz]] = p.glass;
      const dx = bx - ax,
        dz = bz - az,
        len = Math.hypot(dx, dz);
      // just outside the edge (outwards for an outline listed clockwise seen from above, north up)
      const nx = dz / len,
        nz = -dx / len;
      k.box('glass', len - 1, H - 2, 0.2, (ax + bx) / 2 + nx * 0.12, 0.6, (az + bz) / 2 + nz * 0.12, -Math.atan2(dz, dx));
    }
    if (p.court) {
      const [x0, z0, x1, z1] = p.court;
      k.box('weatheredWood', x1 - x0, H + 0.2, z1 - z0, (x0 + x1) / 2, -1, (z0 + z1) / 2);
    }
    if (p.annex) {
      const [x0, z0, x1, z1] = p.annex;
      const h = H - 1;
      k.box('concrete', x1 - x0, h + 1, z1 - z0, (x0 + x1) / 2, -1, (z0 + z1) / 2);
      k.box('dark', x1 - x0 - 1.2, 0.25, (z1 - z0) / 2 - 0.6, (x0 + x1) / 2, h, z1 - (z1 - z0) / 4 - 0.3);
    }
    return { object: k.build() };
  },
});
