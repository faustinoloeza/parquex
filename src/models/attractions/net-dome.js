import { NIGHT_ACTIVITY, nightActivity } from '../../graphics/night.js';
import * as THREE from 'three';
import { minstd } from '#shared/random.js';
import { ellipse, extrudeWithHoles } from '../../graphics/geometry.js';
import { netTexture } from '../../graphics/textures.js';
import { flapMaterial } from '../../graphics/shaders/flap.js';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/** netted pavilions (mariposario) */
export default defineModel({
  type: 'netDome',
  label: 'Domo de malla (mariposario / aviario)',
  params: { rx: 20, rz: 16, height: 14, arcade: false },
  footprint: (p) => ({ ellipse: [p.rx + 1, p.rz + 1] }),
  build(p) {
    const group = new THREE.Group();
    const k = new ModelKit();
    const { rx, rz, height } = p;
    k.add('limestone', extrudeWithHoles(ellipse(rx + 1, rz + 1), [ellipse(rx - 0.6, rz - 0.6)], 1.6), 0, -0.6, 0);
    // arches
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI;
      const arch = new THREE.TorusGeometry(1, 0.012, 4, 24, Math.PI);
      arch.scale(Math.hypot(Math.cos(a) * rx, Math.sin(a) * rz), height, 18);
      arch.rotateY(-a);
      k.add('green', arch, 0, 0.9, 0, 0, false);
    }
    group.add(k.build());
    const net = netTexture().clone();
    net.needsUpdate = true;
    net.repeat.set(rx * 0.9, height * 0.6);
    const dome = new THREE.Mesh(
      new THREE.SphereGeometry(1, 40, 14, 0, Math.PI * 2, 0, Math.PI / 2),
      new THREE.MeshStandardMaterial({
        color: 0xf4f7f5,
        map: net,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
        depthWrite: false,
        roughness: 1,
      }),
    );
    dome.scale.set(rx, height, rz);
    dome.position.y = 0.9;
    dome.renderOrder = 2;
    group.add(dome);
    // tall masts holding the net (butterfly pavilion photos) or a white arcade (aviary)
    const mk = new ModelKit();
    if (p.arcade) {
      const n = Math.round((rx + rz) * 1.6);
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2;
        mk.box('white', 1.1, 4.2, 0.9, Math.cos(a) * (rx + 0.4), 0.4, Math.sin(a) * (rz + 0.4), -a);
      }
      mk.add('white', extrudeWithHoles(ellipse(rx + 1.1, rz + 1.1), [ellipse(rx - 0.3, rz - 0.3)], 1), 0, 4.5, 0);
    } else {
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2 + 0.3;
        mk.cyl('white', 0.25, 0.35, height + 5, Math.cos(a) * rx * 0.45, 0, Math.sin(a) * rz * 0.45, 8);
      }
    }
    group.add(mk.build());

    // butterflies fluttering inside (one instanced draw, wings flap in the shader)
    const wing = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0.05, 0, -0.3),
      new THREE.Vector3(0.95, 0, -0.45),
      new THREE.Vector3(0.6, 0, 0.35),
      new THREE.Vector3(-0.05, 0, -0.3),
      new THREE.Vector3(-0.6, 0, 0.35),
      new THREE.Vector3(-0.95, 0, -0.45),
    ]);
    wing.computeVertexNormals();
    const COUNT = 26;
    const FLAP = { axis: 'x', speed: 14, amp: 0.9, threshold: 0.04 };
    const flyMat = flapMaterial(THREE.MeshBasicMaterial, { color: 0xffffff, side: THREE.DoubleSide }, FLAP);
    const flyMesh = new THREE.InstancedMesh(wing, flyMat, COUNT);
    flyMesh.frustumCulled = false;
    const cols = [0xff8c1a, 0x2f7de1, 0xf5d020, 0xe0457b, 0x8c4fd6, 0x24c1a5];
    const flies = [];
    const rnd = minstd(5);
    for (let i = 0; i < COUNT; i++) {
      flyMesh.setColorAt(i, new THREE.Color(cols[i % cols.length]));
      flies.push({ a: rnd() * 6.28, s: 0.2 + rnd() * 0.3, h: 2 + rnd() * (height * 0.6), rr: 0.2 + rnd() * 0.65 });
    }
    group.add(flyMesh);
    const fm = new THREE.Matrix4(),
      fq = new THREE.Quaternion(),
      fp = new THREE.Vector3(),
      fs = new THREE.Vector3(1.6, 1.6, 1.6),
      fup = new THREE.Vector3(0, 1, 0);
    // at night most butterflies / birds rest and the rest fly slowly
    let pace = 0,
      last = null;
    return {
      object: group,
      update(time) {
        pace += last === null ? 0 : Math.min(0.1, time - last) * nightActivity(NIGHT_ACTIVITY.pace);
        last = time;
        const t = pace;
        flyMesh.count = Math.max(1, Math.round(COUNT * nightActivity(NIGHT_ACTIVITY.birds)));
        flies.forEach((f, i) => {
          const a = f.a + t * f.s;
          fp.set(Math.cos(a) * rx * f.rr, f.h + Math.sin(t * 1.7 + f.a) * 1.2, Math.sin(a * 1.3) * rz * f.rr);
          fq.setFromAxisAngle(fup, -a);
          flyMesh.setMatrixAt(i, fm.compose(fp, fq, fs));
        });
        flyMesh.instanceMatrix.needsUpdate = true;
      },
      // the app's driver "netDome" redoes update() and the wing beats of flap.js
      animation: [
        {
          name: 'flies',
          driver: 'netDome',
          params: {
            rx,
            rz,
            scale: fs.x,
            flap: FLAP,
            flies: flies.map((f, i) => ({ ...f, color: `#${cols[i % cols.length].toString(16).padStart(6, '0')}` })),
          },
          size: 1.9 * fs.x, // wing span
          parts: [flyMesh],
        },
      ],
    };
  },
});
