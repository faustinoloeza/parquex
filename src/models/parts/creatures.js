import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { nonIndexed } from '../../graphics/geometry.js';
import { materials } from '../../graphics/materials.js';

// Low-poly people and animals used by the models and the fauna layer.

function colored(g, hex) {
  g = nonIndexed(g);
  const c = new THREE.Color(hex);
  const arr = new Float32Array(g.getAttribute('position').count * 3);
  for (let i = 0; i < arr.length; i += 3) arr.set([c.r, c.g, c.b], i);
  g.setAttribute('color', new THREE.BufferAttribute(arr, 3));
  if (!g.getAttribute('uv')) g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(g.getAttribute('position').count * 2), 2));
  return g;
}

/** Shared material of the animated figures (colors are per vertex). */
const figureMaterial = () => materials().vertex;

/** Applies a transform to a geometry and paints it (for merging parts). */
function part(geometry, hex, { x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0, sx = 1, sy = 1, sz = 1 } = {}) {
  const m = new THREE.Matrix4().compose(
    new THREE.Vector3(x, y, z),
    new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz)),
    new THREE.Vector3(sx, sy, sz),
  );
  return colored(geometry.applyMatrix4(m), hex);
}

/** Standing person (body, head, hat) about 1.5 m tall, as a single mesh. */
export function person(colors) {
  const geometry = mergeGeometries([
    part(new THREE.CapsuleGeometry(0.28, 0.9, 3, 6), colors[0]),
    part(new THREE.SphereGeometry(0.22, 8, 6), 0x8a5a3b, { y: 0.85 }),
    part(new THREE.ConeGeometry(0.3, 0.6, 6), colors[1], { y: 1.2 }),
  ]);
  const mesh = new THREE.Mesh(geometry, figureMaterial());
  mesh.castShadow = true;
  return mesh;
}

/**
 * Puma or jaguar (rosettes). One mesh per moving part — body, head, tail and
 * four legs on pivots — so animating it costs a handful of draw calls.
 */
export function bigCat(kind) {
  const group = new THREE.Group();
  const coat = kind === 'jaguar' ? 0xe2a63c : 0xc89c64;
  const belly = kind === 'jaguar' ? 0xf3e2b8 : 0xe7d2ad;
  const dark = 0x2b2118;
  const mesh = (parts) => {
    const m = new THREE.Mesh(mergeGeometries(parts), figureMaterial());
    m.castShadow = true;
    return m;
  };

  const bodyParts = [
    part(new THREE.CapsuleGeometry(0.32, 1.1, 4, 8), coat, { y: 0.75, rz: Math.PI / 2 }),
    part(new THREE.SphereGeometry(0.3, 10, 8), belly, { x: 0.55, y: 0.68 }),
  ];
  if (kind === 'jaguar') {
    // rosettes
    for (let i = 0; i < 26; i++) {
      const a = (i * 2.399) % (Math.PI * 2),
        t = (i / 26) * 1.4 - 0.7;
      const spot = new THREE.SphereGeometry(0.06, 5, 4);
      spot.scale(1, 0.4, 1);
      spot.lookAt(new THREE.Vector3(0, -Math.cos(a), -Math.sin(a)));
      bodyParts.push(part(spot, dark, { x: t, y: 0.75 + Math.cos(a) * 0.3, z: Math.sin(a) * 0.3 }));
    }
  }
  group.add(mesh(bodyParts));

  const headParts = [
    part(new THREE.SphereGeometry(0.24, 12, 10), coat),
    part(new THREE.SphereGeometry(0.13, 10, 8), belly, { x: 0.18, y: -0.06 }),
    part(new THREE.SphereGeometry(0.04, 6, 6), dark, { x: 0.3, y: -0.02 }),
  ];
  for (const sz of [-1, 1]) {
    headParts.push(part(new THREE.ConeGeometry(0.08, 0.14, 6), coat, { x: -0.02, y: 0.22, z: sz * 0.13 }));
    headParts.push(part(new THREE.SphereGeometry(0.03, 6, 6), dark, { x: 0.18, y: 0.07, z: sz * 0.09 }));
  }
  const head = mesh(headParts);
  head.position.set(0.95, 1.0, 0);
  group.add(head);

  const legs = [];
  for (const [x, sz] of [
    [0.5, -1],
    [0.5, 1],
    [-0.5, -1],
    [-0.5, 1],
  ]) {
    const leg = mesh([
      part(new THREE.CylinderGeometry(0.08, 0.07, 0.7, 6), coat, { y: -0.35 }),
      part(new THREE.SphereGeometry(0.09, 6, 6), belly, { y: -0.7 }),
    ]);
    leg.position.set(x, 0.72, sz * 0.18);
    legs.push(leg);
    group.add(leg);
  }

  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.85, 0.85, 0),
    new THREE.Vector3(-1.3, 0.6, 0),
    new THREE.Vector3(-1.6, 0.35, 0.1),
    new THREE.Vector3(-1.8, 0.5, 0.2),
  ]);
  const tailParts = [part(new THREE.TubeGeometry(curve, 8, 0.06, 5), coat)];
  if (kind !== 'jaguar') tailParts.push(part(new THREE.SphereGeometry(0.08, 6, 6), dark, { x: -1.8, y: 0.5, z: 0.2 }));
  const tail = mesh(tailParts);
  group.add(tail);

  group.scale.setScalar(1.6);
  return { group, legs, head, tail };
}

/** Flamingo standing in water, as one vertex-colored geometry. */
export function flamingoGeometry() {
  const pink = '#f3866e'; // coral, as the Caribbean flamingos in visitors' photos
  const body = new THREE.SphereGeometry(0.5, 8, 6);
  body.scale(1.3, 0.75, 0.8);
  body.translate(0, 1.55, 0);
  const neck = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.55, 1.65, 0),
      new THREE.Vector3(0.75, 2.2, 0),
      new THREE.Vector3(0.5, 2.7, 0),
      new THREE.Vector3(0.75, 3.0, 0),
    ]),
    6,
    0.08,
    4,
  );
  const head = new THREE.SphereGeometry(0.16, 6, 5);
  head.translate(0.8, 3.02, 0);
  const beak = new THREE.ConeGeometry(0.07, 0.3, 4);
  beak.rotateZ(-Math.PI / 2 - 0.5);
  beak.translate(0.98, 2.94, 0);
  const legA = new THREE.CylinderGeometry(0.03, 0.03, 1.3, 3);
  legA.translate(0, 0.65, 0.1);
  const legB = legA.clone();
  legB.translate(0, 0, -0.2);
  return mergeGeometries([
    colored(body, pink),
    colored(neck, pink),
    colored(head, pink),
    colored(beak, '#222222'),
    colored(legA, '#e9808a'),
    colored(legB, '#e9808a'),
  ]);
}

/**
 * Standing horse, head towards +x, about 1.6 m at the withers; with `rider` a
 * charro (white shirt, black suit, wide sombrero) sits on it. One geometry,
 * colored per vertex.
 */
export function horseGeometry(coat = '#7a4a2a', rider = false) {
  const mane = '#2a1c14';
  const parts = [
    part(new THREE.CapsuleGeometry(0.36, 1.1, 4, 8), coat, { y: 1.3, rz: Math.PI / 2 }),
    part(new THREE.CylinderGeometry(0.17, 0.26, 0.85, 6), coat, { x: 0.82, y: 1.72, rz: -0.75 }),
    part(new THREE.CapsuleGeometry(0.14, 0.42, 3, 6), coat, { x: 1.18, y: 1.95, rz: 1.1 }),
    part(new THREE.BoxGeometry(0.5, 0.08, 0.06), mane, { x: 0.72, y: 1.92, rz: -0.75 }),
    part(new THREE.ConeGeometry(0.12, 0.7, 5), mane, { x: -0.92, y: 1.15, rz: -0.5 }),
  ];
  for (const [x, z] of [
    [0.55, 0.17],
    [0.55, -0.17],
    [-0.55, 0.17],
    [-0.55, -0.17],
  ])
    parts.push(
      part(new THREE.CylinderGeometry(0.07, 0.08, 1.05, 5), coat, { x, y: 0.52, z }),
      part(new THREE.CylinderGeometry(0.09, 0.09, 0.12, 5), mane, { x, y: 0.06, z }),
    );
  if (rider) {
    parts.push(
      part(new THREE.CapsuleGeometry(0.2, 0.45, 3, 6), '#f4f1ea', { y: 2.05 }),
      part(new THREE.BoxGeometry(0.3, 0.42, 0.44), '#1d1d1f', { y: 1.82 }),
      part(new THREE.SphereGeometry(0.14, 8, 6), 0x8a5a3b, { y: 2.6 }),
      part(new THREE.CylinderGeometry(0.42, 0.42, 0.05, 12), '#1d1d1f', { y: 2.7 }),
      part(new THREE.ConeGeometry(0.16, 0.3, 8), '#1d1d1f', { y: 2.86 }),
    );
  }
  return mergeGeometries(parts);
}

/** Bird with the body along +x and wings spanning ±z, colored per part. */
export function birdGeometry(colors, span = 1.6) {
  const body = new THREE.CapsuleGeometry(0.18, 0.7, 3, 6);
  body.rotateZ(Math.PI / 2);
  const tail = new THREE.ConeGeometry(0.16, 0.9, 4);
  tail.rotateZ(Math.PI / 2);
  tail.translate(-0.75, 0, 0);
  const wing = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0.25, 0, 0.16),
    new THREE.Vector3(-0.25, 0, 0.16),
    new THREE.Vector3(-0.05, 0, span),
    new THREE.Vector3(-0.25, 0, -0.16),
    new THREE.Vector3(0.25, 0, -0.16),
    new THREE.Vector3(-0.05, 0, -span),
  ]);
  wing.computeVertexNormals();
  return mergeGeometries([colored(body, colors[0]), colored(tail, colors[1] ?? colors[0]), colored(wing, colors[2] ?? colors[0])]);
}

/** Dolphin, body along +x. */
export function dolphinGeometry() {
  const body = new THREE.SphereGeometry(0.5, 10, 6);
  body.scale(2.2, 0.55, 0.6);
  const fin = new THREE.ConeGeometry(0.18, 0.5, 4);
  fin.translate(-0.1, 0.45, 0);
  fin.rotateZ(0.4);
  const tail = new THREE.ConeGeometry(0.25, 0.6, 4);
  tail.rotateZ(Math.PI / 2);
  tail.scale(1, 0.4, 1.6);
  tail.translate(-1.25, 0, 0);
  return mergeGeometries([colored(body, '#6f8fa6'), colored(fin, '#5c7a90'), colored(tail, '#5c7a90')]);
}
