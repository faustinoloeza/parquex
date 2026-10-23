// Minimal stand-in for <canvas> so models and materials that paint textures
// can be built in Node. Drawing calls do nothing.
const noop = new Proxy(function () {}, {
  get: (_, key) => (key === 'width' ? 10 : noop),
  apply: () => noop,
});

function context2d(canvas) {
  const state = { canvas };
  return new Proxy(state, {
    get(target, key) {
      if (key in target) return target[key];
      if (key === 'measureText') return (text) => ({ width: String(text).length * 10 });
      if (key === 'getImageData') return (x, y, w, h) => ({ width: w, height: h, data: new Uint8ClampedArray(w * h * 4) });
      return noop;
    },
    set(target, key, value) {
      target[key] = value;
      return true;
    },
  });
}

export function installFakeCanvas() {
  if (globalThis.document) return;
  globalThis.document = {
    createElement(tag) {
      if (tag !== 'canvas') throw new Error(`fake document: <${tag}> not supported`);
      const canvas = { width: 300, height: 150, style: {} };
      canvas.getContext = () => context2d(canvas);
      return canvas;
    },
  };
}
