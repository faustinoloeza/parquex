import { readPreference, writePreference } from '../app/preferences.js';
import { esc } from './dom.js';

/** Bump when the text changes enough to show it again to everyone. */
const VERSION = '1';
const SEEN = 'disclaimer-seen';

const MAP_ICON =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4L3 6.5v13.5l6-2.5 6 2.5 6-2.5V4l-6 2.5z"/><path d="M9 4v13.5M15 6.5V20"/></svg>';

/**
 * Notice that this map is an independent, unofficial project: a card over a
 * blurred backdrop (native <dialog>: focus stays inside, Escape closes it).
 * open({ force }) shows it once per device (preferences: disclaimer-seen),
 * or again on demand from the sidebar's footer.
 * @param {HTMLElement} root
 * @param {() => (key: string) => string} getT  current translator (the language can change)
 */
export function createDisclaimer(root, getT) {
  const dialog = document.createElement('dialog');
  dialog.className = 'disclaimer';
  dialog.setAttribute('aria-labelledby', 'disclaimer-title');
  dialog.setAttribute('aria-describedby', 'disclaimer-body');
  root.appendChild(dialog);

  const close = () => {
    writePreference(SEEN, VERSION);
    dialog.classList.add('closing');
    setTimeout(() => {
      dialog.classList.remove('closing');
      dialog.close();
    }, 180);
  };
  dialog.addEventListener('cancel', (e) => {
    e.preventDefault(); // Escape: same fade as the button
    close();
  });
  dialog.addEventListener('click', (e) => {
    if (e.target.closest('[data-ok]') || e.target === dialog) close(); // the button, or a tap on the backdrop
  });

  return {
    /** Shows the notice; without `force` only when this device has not seen it yet. */
    open({ force = false } = {}) {
      if (dialog.open || (!force && readPreference(SEEN, '') === VERSION)) return;
      const t = getT();
      dialog.innerHTML = `
        <div class="disclaimer-card">
          <div class="disclaimer-icon">${MAP_ICON}</div>
          <p class="disclaimer-eyebrow">${esc(t('disclaimerEyebrow'))}</p>
          <h2 id="disclaimer-title">${esc(t('disclaimerTitle'))}</h2>
          <div id="disclaimer-body" class="disclaimer-body">
            <p>${esc(t('disclaimerBody'))}</p>
            <p>${esc(t('disclaimerData'))}</p>
          </div>
          <p class="disclaimer-official">${esc(t('disclaimerOfficial'))}
            <a href="https://www.xcaret.com" target="_blank" rel="noopener">xcaret.com</a></p>
          <button type="button" class="disclaimer-ok" data-ok>${esc(t('disclaimerOk'))}</button>
          <p class="disclaimer-fine">${esc(t('disclaimerTrademarks'))}</p>
        </div>`;
      dialog.showModal();
      dialog.querySelector('[data-ok]').focus();
    },
  };
}
