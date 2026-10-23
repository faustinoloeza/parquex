// Floating map buttons: zoom in/out, 2D/3D and reset view (with a compass
// that follows the camera heading).

const ICONS = {
  plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
  minus: '<svg viewBox="0 0 24 24"><path d="M5 12h14"/></svg>',
  compass:
    '<svg viewBox="0 0 24 24"><path d="M12 3l3.5 9L12 21l-3.5-9z" fill="currentColor" stroke="none" opacity=".35"/><path d="M12 3l3.5 9h-7z" fill="#f08a24" stroke="none"/></svg>',
  tilt: '<svg viewBox="0 0 24 24"><path d="M4 17l8-4 8 4-8 4z"/><path d="M12 3v10"/></svg>',
};

/**
 * @param {HTMLElement} root
 * @param {import('../app/MapApp.js').MapApp} app
 * @param {(key: string) => string} t
 */
export function createToolbar(root, app, t) {
  const el = document.createElement('div');
  el.className = 'map-tools';
  const button = (act, key, icon, cls = '') =>
    `<button data-act="${act}" title="${t(key)}" aria-label="${t(key)}"${cls ? ` class="${cls}"` : ''}>${icon}</button>`;
  // zoom in/out share one pill, as in the Android app
  el.innerHTML = [
    `<div class="zoom-pair">${button('in', 'zoomIn', ICONS.plus)}${button('out', 'zoomOut', ICONS.minus)}</div>`,
    button('tilt', 'toggleTilt', ICONS.tilt),
    button('reset', 'resetView', ICONS.compass, 'compass'),
  ].join('');
  const actions = {
    in: () => app.zoom(0.6),
    out: () => app.zoom(1.6),
    tilt: () => app.toggleTilt(),
    reset: () => app.resetView(),
  };
  el.addEventListener('click', (e) => actions[e.target.closest('button')?.dataset.act]?.());
  root.appendChild(el);

  const compass = el.querySelector('.compass svg');
  app.controls.addEventListener('change', () => {
    compass.style.transform = `rotate(${-app.controls.getAzimuthalAngle()}rad)`;
  });
  return el;
}
