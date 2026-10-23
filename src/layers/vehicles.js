import * as THREE from 'three';
import { expandBusRows } from '#shared/vehicles.js';
import { busGeometry } from '../models/parts/bus.js';

/**
 * Parked tour buses (src/parks/<park>/vehicles.js) as one instanced mesh; the
 * white parts of the bus take each instance's livery color.
 * @returns {import('./index.js').Layer}
 */
export function createVehiclesLayer({ rows, heightAt }) {
  const buses = expandBusRows(rows);
  const object = new THREE.Group();
  object.name = 'vehicles';
  if (buses.length) {
    const material = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.45, metalness: 0.1 });
    const mesh = new THREE.InstancedMesh(busGeometry(), material, buses.length);
    const m = new THREE.Matrix4(),
      q = new THREE.Quaternion(),
      up = new THREE.Vector3(0, 1, 0),
      one = new THREE.Vector3(1, 1, 1);
    const c = new THREE.Color();
    buses.forEach((bus, i) => {
      q.setFromAxisAngle(up, -THREE.MathUtils.degToRad(bus.heading));
      m.compose(new THREE.Vector3(bus.x, Math.max(heightAt(bus.x, bus.z), 0.3), bus.z), q, one);
      mesh.setMatrixAt(i, m);
      mesh.setColorAt(i, c.set(bus.color));
    });
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.computeBoundingSphere();
    object.add(mesh);
  }
  return { name: 'vehicles', object, occludesRoutes: true };
}
