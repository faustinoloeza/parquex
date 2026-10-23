import * as THREE from 'three';

// Gentle wind sway for vegetation: the higher a vertex, the more it bends.
// Instances get a phase from their position, so neighbouring trees differ.

/**
 * @param {{ value: number }} time shared uniform (seconds)
 * @param {object} [opts] extra MeshLambertMaterial parameters
 */
export function swayMaterial(time, opts = {}) {
  const m = new THREE.MeshLambertMaterial({ vertexColors: true, ...opts });
  m.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = time;
    shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nuniform float uTime;').replace(
      '#include <begin_vertex>',
      `#include <begin_vertex>
        #ifdef USE_INSTANCING
          vec2 seed = instanceMatrix[3].xz;
        #else
          vec2 seed = vec2(0.0);
        #endif
        float bend = max(position.y - 2.5, 0.0) / 8.0;
        float sway = sin(uTime * 1.1 + seed.x * 0.13 + seed.y * 0.07) * 0.18 + sin(uTime * 2.3 + seed.y * 0.21) * 0.06;
        transformed.x += sway * bend;
        transformed.z += sway * 0.6 * bend;`,
    );
  };
  return m;
}
