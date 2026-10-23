import * as THREE from 'three';
import { releaseAfterUpload } from './memory.js';

/**
 * Loads an image as a texture with low memory use:
 *  - the image is decoded off the main thread (createImageBitmap), so big
 *    images do not freeze the page;
 *  - the decoded pixels are released as soon as they are on the GPU, so each
 *    texture is held once (in video memory) instead of twice.
 * Rows run north → south (flipY = false): v = 0 is the top of the image.
 *
 * @param {string} url
 * @param {{ signal?: AbortSignal, data?: boolean, mipmaps?: boolean, anisotropy?: number }} [options]
 *        data: raw values (masks, distance fields) — no color conversion, linear
 * @returns {Promise<THREE.Texture>}
 */
export async function loadTexture(url, { signal, data = false, mipmaps = !data, anisotropy = 1 } = {}) {
  const res = await fetch(url, { signal, mode: 'cors' });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const blob = await res.blob();
  const bitmap = await createImageBitmap(blob, {
    premultiplyAlpha: 'none',
    colorSpaceConversion: data ? 'none' : 'default',
  });
  const texture = new THREE.Texture(bitmap);
  texture.flipY = false;
  texture.colorSpace = data ? THREE.NoColorSpace : THREE.SRGBColorSpace;
  texture.generateMipmaps = mipmaps;
  texture.minFilter = mipmaps ? THREE.LinearMipmapLinearFilter : THREE.LinearFilter;
  texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.anisotropy = anisotropy;
  texture.needsUpdate = true;
  releaseAfterUpload(texture);
  return texture;
}
