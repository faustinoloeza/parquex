import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { nonIndexed } from '../../graphics/geometry.js';

function tinted(g, hex) {
  g = nonIndexed(g);
  const c = new THREE.Color(hex);
  const n = g.getAttribute('position').count;
  const arr = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) arr.set([c.r, c.g, c.b], i * 3);
  g.setAttribute('color', new THREE.BufferAttribute(arr, 3));
  for (const k of Object.keys(g.attributes)) if (!['position', 'normal', 'color'].includes(k)) g.deleteAttribute(k);
  return g;
}

// Coach bus, long axis on +x. White parts take the per-instance livery color;
// windows, wheels and bumpers keep their own dark tones.
export function busGeometry() {
  const L = 12,
    W = 2.5,
    H = 3.3;
  const parts = [];
  const body = new THREE.BoxGeometry(L, H - 0.9, W);
  body.translate(0, 0.45 + (H - 0.9) / 2, 0);
  parts.push(tinted(body, '#ffffff'));
  const roof = new THREE.CylinderGeometry(W / 2, W / 2, L - 0.4, 10, 1, false, 0, Math.PI);
  roof.rotateZ(Math.PI / 2);
  roof.scale(1, 0.22, 1);
  roof.translate(0, H - 0.45, 0);
  parts.push(tinted(roof, '#f4f4f4'));
  // window band on both sides + windshield
  for (const s of [-1, 1]) {
    const w = new THREE.BoxGeometry(L - 2.2, 1.05, 0.05);
    w.translate(-0.4, H - 1.15, s * (W / 2 + 0.01));
    parts.push(tinted(w, '#1d2733'));
  }
  const ws = new THREE.BoxGeometry(0.05, 1.5, W - 0.3);
  ws.translate(L / 2 + 0.01, H - 1.3, 0);
  parts.push(tinted(ws, '#1d2733'));
  // livery stripe (lighter) along the sides
  for (const s of [-1, 1]) {
    const st = new THREE.BoxGeometry(L - 0.6, 0.35, 0.04);
    st.translate(0, 1.1, s * (W / 2 + 0.02));
    parts.push(tinted(st, '#fff6c8'));
  }
  // wheels
  for (const x of [-L / 2 + 2, -L / 2 + 3.2, L / 2 - 2.2])
    for (const s of [-1, 1]) {
      const wh = new THREE.CylinderGeometry(0.5, 0.5, 0.3, 10);
      wh.rotateX(Math.PI / 2);
      wh.translate(x, 0.5, s * (W / 2 - 0.1));
      parts.push(tinted(wh, '#15171a'));
    }
  return mergeGeometries(parts);
}
