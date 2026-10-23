import * as THREE from 'three';
import { hipRoof, m4, solidColor } from '../../graphics/geometry.js';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/** Slides from the launch tower: color, tube radius and the path down. */
const SLIDES = [
  {
    color: 0xe63946,
    radius: 0.55,
    points: [
      [-7, 8.6, -6],
      [-3, 7.5, -7],
      [1, 6, -4],
      [2, 4.6, 0],
      [-1, 3.2, 3],
      [-4, 2, 1],
      [-2, 1.2, -2],
      [3, 0.4, -1],
      [7, 0.1, 2],
    ],
  },
  {
    color: 0x3a86ff,
    radius: 0.5,
    points: [
      [-9, 8.6, -3.5],
      [-9, 7, 1],
      [-6, 5.2, 5],
      [-1, 3.6, 6],
      [3, 2.2, 4],
      [5, 1.2, 0],
      [8, 0.3, -3],
    ],
  },
  {
    color: 0xffbe0b,
    radius: 0.5,
    points: [
      [-11, 8.6, -6],
      [-13, 6.5, -1],
      [-12, 4.2, 4],
      [-8, 2.2, 7],
      [-3, 0.5, 8],
    ],
  },
];

/** Glossy slide tube painted per vertex (all slides share one material). */
function slideTube({ points, color, radius }) {
  const curve = new THREE.CatmullRomCurve3(points.map(([x, y, z]) => new THREE.Vector3(x, y, z)));
  return solidColor(new THREE.TubeGeometry(curve, Math.max(24, points.length * 10), radius, 8, false), color);
}

/** Toboganes */
export default defineModel({
  type: 'waterSlides',
  label: 'Toboganes',
  params: {},
  footprint: () => ({ circle: 12 }),
  build() {
    const k = new ModelKit();
    // launch tower
    k.box('wall', 5, 9, 5, -9, -0.5, -6);
    k.box('red', 6, 0.5, 6, -9, 8.5, -6);
    k.addTransformed('tile', hipRoof(5.5, 5.5, 2.6, 0.4), m4(-9, 10.6, -6));
    for (let i = 0; i < 4; i++) k.box('yellow', 0.3, 10.6, 0.3, -9 + (i % 2 ? 2.6 : -2.6), -0.5, -6 + (i < 2 ? 2.6 : -2.6));
    for (const slide of SLIDES) k.addTransformed('plastic', slideTube(slide));
    return { object: k.build() };
  },
});
