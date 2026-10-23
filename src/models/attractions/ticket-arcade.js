import * as THREE from 'three';
import { solidColor } from '../../graphics/geometry.js';
import { markShared } from '../../graphics/memory.js';
import { TREE } from '#shared/formats/vegetation.js';
import { modelTreeGeometry } from '../parts/trees.js';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

let palmGeometry = null;
/** The vegetation layer's palm (vertex colors, fronds two-sided), built once. */
const palm = () => (palmGeometry ??= markShared(modelTreeGeometry(TREE.PALM)));

/**
 * Ticket offices of Xel-Há: a long, low block clad in light rubble stone with
 * a row of tall round arches painted deep blue, slightly taller stepped end
 * blocks and a flat roof; a planted strip with coconut palms and flowering
 * shrubs runs along the front. Only `limestone` and the vertex-painted
 * `plastic` (merged with other models). The front faces +z; length along x.
 */
export default defineModel({
  type: 'ticketArcade',
  label: 'Taquillas con arcos',
  params: { length: 35, width: 11, height: 7.5, arches: 7, archColor: 0x1f3f9a, palms: 7 },
  footprint: (p) => ({ rect: [p.length + 1, p.width + 1] }),
  build(p) {
    const k = new ModelKit();
    const { length: L, width: W, height: H, arches: n } = p;
    const end = 3.6; // end blocks
    // main block and the stepped end blocks
    k.box('limestone', L - 2 * end, H, W, 0, -0.6, 0);
    k.box('limestone', L - 2 * end + 0.3, 0.35, W + 0.3, 0, H - 0.6, 0);
    for (const sx of [-1, 1]) {
      const x = sx * (L / 2 - end / 2);
      k.box('limestone', end, H + 1.4, W + 0.8, x, -0.6, 0);
      k.box('limestone', end - 1.2, 0.8, W - 0.6, x, H + 0.8, 0);
    }
    // blue round-arched openings on the front (deep insets read as painted doors)
    const span = L - 2 * end;
    const archW = 2.5,
      archH = 3.8;
    for (let i = 0; i < n; i++) {
      const x = -span / 2 + ((i + 0.5) / n) * span;
      const rect = new THREE.BoxGeometry(archW, archH, 0.3).translate(0, archH / 2, 0);
      const top = new THREE.CylinderGeometry(archW / 2, archW / 2, 0.3, 14, 1, false, Math.PI / 2, Math.PI)
        .rotateX(Math.PI / 2)
        .translate(0, archH, 0);
      for (const g of [rect, top])
        k.addTransformed('plastic', solidColor(g, p.archColor), new THREE.Matrix4().makeTranslation(x, -0.4, W / 2 + 0.02));
    }
    // planted strip with a stone curb, flowering shrubs and coconut palms
    const zs = W / 2 + 3;
    k.box('limestone', L + 2, 0.35, 3.4, 0, -0.2, zs);
    k.addTransformed(
      'plastic',
      solidColor(new THREE.BoxGeometry(L + 1.4, 0.4, 2.8).translate(0, 0.2, 0), 0x5f9a35),
      new THREE.Matrix4().makeTranslation(0, -0.15, zs),
    );
    for (let i = 0; i < 18; i++) {
      const x = -L / 2 + ((i + 0.5) / 18) * L;
      const shrub = new THREE.IcosahedronGeometry(0.75, 0).scale(1.2, 0.7, 1);
      k.addTransformed(
        'plastic',
        solidColor(shrub, i % 3 ? 0x4f8f2e : 0xe6c229),
        new THREE.Matrix4().makeTranslation(x, 0.5, zs + (i % 2 ? 0.5 : -0.5)),
      );
    }
    for (let i = 0; i < p.palms; i++) {
      const x = -span / 2 + (i / Math.max(1, p.palms - 1)) * span;
      const m = new THREE.Matrix4().makeRotationY(i * 2.1).premultiply(new THREE.Matrix4().makeTranslation(x, 0, zs));
      k.addTransformed('plastic', palm().clone(), m);
    }
    return { object: k.build() };
  },
});
