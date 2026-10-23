/** Full-screen loader with a progress bar; call done() or fail() at the end. */
export function createLoadingScreen(root, t) {
  const el = document.createElement('div');
  el.className = 'loader';
  el.innerHTML = `<div class="loader-ring"></div><p>${t('loading')}</p><div class="loader-bar"><span></span></div>`;
  root.appendChild(el);
  const bar = el.querySelector('.loader-bar span');
  return {
    /** @param {number} fraction 0..1 */
    progress(fraction) {
      bar.style.width = `${Math.round(fraction * 100)}%`;
    },
    done() {
      el.classList.add('done');
      setTimeout(() => el.remove(), 600);
    },
    fail(message) {
      el.innerHTML = `<p class="loader-error">${message}</p>`;
    },
  };
}
