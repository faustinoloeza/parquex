// Vertex animation for wings: vertices beyond `threshold` along `axis` rotate
// up and down; each instance gets its own phase (gl_InstanceID), so a whole
// flock or swarm is a single draw call.

/** Shared clock for every flapping material (set once per frame). */
export const flapTime = { value: 0 };

/**
 * @param {new (params: object) => import('three').Material} Base material class
 * @param {object} params material parameters
 * @param {{ axis?: 'x' | 'z', speed?: number, amp?: number, threshold?: number }} [opts]
 */
export function flapMaterial(Base, params, { axis = 'z', speed = 9, amp = 0.7, threshold = 0.15 } = {}) {
  const m = new Base(params);
  m.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = flapTime;
    shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nuniform float uTime;').replace(
      '#include <begin_vertex>',
      `#include <begin_vertex>
        {
          float side = transformed.${axis};
          if (abs(side) > ${threshold.toFixed(3)}) {
            float a = sign(side) * sin(uTime * ${speed.toFixed(2)} + float(gl_InstanceID) * 1.731) * ${amp.toFixed(3)};
            float c = cos(a), s = sin(a);
            float p = transformed.${axis}, q = transformed.y;
            transformed.${axis} = p * c - q * s;
            transformed.y = p * s + q * c;
          }
        }`,
    );
  };
  m.customProgramCacheKey = () => `flap-${axis}-${speed}-${amp}-${threshold}`;
  return m;
}
