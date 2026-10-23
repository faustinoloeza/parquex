import * as THREE from 'three';
import { solidColor } from '../../graphics/geometry.js';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

const DARK = 0x3b3a36, // black river pebbles
  LIGHT = 0xe9e5da, // white pebbles
  GREY = 0xa7a091;

/** Flat ring (or disc) lying on the ground, colored per vertex. */
function ring(r0, r1, color, y) {
  const g = r0 > 0 ? new THREE.RingGeometry(r0, r1, 48) : new THREE.CircleGeometry(r1, 48);
  g.rotateX(-Math.PI / 2);
  g.translate(0, y, 0);
  return solidColor(g, color);
}

/** One half of a compass point: triangle center → tip → side, flat at y. */
function halfPoint(angle, len, width, side, color, y) {
  const tip = [Math.sin(angle) * len, Math.cos(angle) * len];
  const a2 = angle + side * (Math.PI / 2);
  const base = [Math.sin(a2) * width, Math.cos(a2) * width];
  let pts = [[0, 0], base, tip];
  // wind counter-clockwise seen from above so the face points up (+y)
  const ny = base[1] * tip[0] - base[0] * tip[1];
  if (ny < 0) pts = [pts[0], pts[2], pts[1]];
  const g = new THREE.BufferGeometry();
  g.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(
      pts.flatMap(([x, z]) => [x, y, z]),
      3,
    ),
  );
  g.computeVertexNormals();
  return solidColor(g, color);
}

/**
 * Pebble-mosaic compass rose set in the paving of the entrance plaza (where
 * the flamingos are walked): dark disc with a white ring ("XCARET" lettering
 * in the real one) and an eight-point star, each point half dark, half light.
 * Flat, vertex-colored: it merges with the other painted geometry for free.
 */
export default defineModel({
  type: 'compassRose',
  label: 'Rosa de los vientos de piedra (mosaico)',
  params: { radius: 5 },
  build(p) {
    const k = new ModelKit();
    const R = p.radius,
      y = 0.08;
    k.add('vertex', ring(0, R * 0.7, DARK, y), 0, 0, 0, 0, false);
    k.add('vertex', ring(R * 0.5, R * 0.58, LIGHT, y + 0.01), 0, 0, 0, 0, false);
    k.add('vertex', ring(0, R * 0.42, GREY, y + 0.01), 0, 0, 0, 0, false);
    for (let i = 0; i < 8; i++) {
      const a = (i * Math.PI) / 4;
      const long = i % 2 === 0;
      const len = long ? R : R * 0.78,
        w = long ? R * 0.16 : R * 0.12,
        lift = long ? 0.03 : 0.02;
      k.add('vertex', halfPoint(a, len, w, 1, DARK, y + lift), 0, 0, 0, 0, false);
      k.add('vertex', halfPoint(a, len, w, -1, LIGHT, y + lift), 0, 0, 0, 0, false);
    }
    return { object: k.build() };
  },
});
