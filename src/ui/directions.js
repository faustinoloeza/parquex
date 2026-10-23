import { ICON } from './icons.js';
import { esc } from './dom.js';
import { formatDistance } from '#shared/navigation.js';
import { SIM_SPEEDS } from '../app/navigation.js';

const svg = (d) => `<svg viewBox="0 0 24 24" aria-hidden="true">${d}</svg>`;

/** Maneuver arrows (Google-Maps-like). */
export const TURN_ICONS = {
  straight: svg('<path d="M12 21V4M6 9.5L12 4l6 5.5"/>'),
  right: svg('<path d="M7 21v-7.5A4.5 4.5 0 0 1 11.5 9H20M15.5 4.5L20 9l-4.5 4.5"/>'),
  left: svg('<path d="M17 21v-7.5A4.5 4.5 0 0 0 12.5 9H4M8.5 4.5L4 9l4.5 4.5"/>'),
  slight_right: svg('<path d="M9 21v-7l8-8M11 5.5h6.5V12"/>'),
  slight_left: svg('<path d="M15 21v-7L7 6M13 5.5H6.5V12"/>'),
  arrive: svg('<path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>'),
};
const turnIcon = (step) => TURN_ICONS[step.slight ? `slight_${step.turn}` : step.turn] ?? TURN_ICONS.straight;

/**
 * Directions UI (app/navigation.js drives it):
 *  - preview panel: side card on desktop, bottom sheet on phones — destination,
 *    walking time and distance, where the walk starts (with "Choose start" and
 *    the far-away / no-permission note), Start / Simulate, the list of steps;
 *  - active guidance: big instruction banner at the top, a bottom bar with the
 *    remaining time and distance, simulation speed and End; "Re-center" when
 *    the user moved the map; the arrival banner;
 *  - "tap the map to choose the start" hint.
 *
 * @param {HTMLElement} root
 * @param {{ t: () => (key: string) => string, lang: string, onStart: () => void, onSimulate: () => void, onEnd: () => void,
 *   onPick: () => void, onCancelPick: () => void, onClearManual: () => void, onSpeed: (k: number) => void, onRecenter: () => void }} handlers
 *   t: returns the current translator (park labels change with the focused park)
 */
export function createDirections(
  root,
  { t: tr, lang, onStart, onSimulate, onEnd, onPick, onCancelPick, onClearManual, onSpeed, onRecenter },
) {
  const t = (k) => tr()(k);
  const panel = document.createElement('section');
  panel.className = 'nav-panel';
  panel.hidden = true;
  const top = document.createElement('div');
  top.className = 'nav-top';
  top.setAttribute('role', 'status');
  top.setAttribute('aria-live', 'polite');
  top.hidden = true;
  const bottom = document.createElement('div');
  bottom.className = 'nav-bottom';
  bottom.hidden = true;
  const recenter = document.createElement('button');
  recenter.type = 'button';
  recenter.className = 'nav-recenter';
  recenter.hidden = true;
  const toast = document.createElement('div');
  toast.className = 'nav-toast';
  toast.hidden = true;
  root.append(panel, top, bottom, recenter, toast);

  let speed = 4;
  let simulate = false;

  // ------------------------------------------------------------- preview
  panel.addEventListener('click', (e) => {
    const b = e.target.closest('[data-act]');
    if (!b) return;
    ({ close: onEnd, start: onStart, sim: onSimulate, pick: onPick, real: onClearManual })[b.dataset.act]?.();
  });
  panel.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') onEnd();
  });

  function showPreview({ poi, name, distance, minutes, steps, from, direct }) {
    const fromLabel = { gps: 'nav_from_gps', manual: 'nav_from_manual' }[from.reason] ?? 'nav_from_sim';
    const note = { far: 'nav_far', denied: 'nav_denied', unavailable: 'nav_unavailable', waiting: 'nav_locating', manual: 'nav_manual' }[
      from.reason
    ];
    panel.innerHTML = `
      <div class="np-handle" aria-hidden="true"></div>
      <header class="np-head">
        <span class="np-num${poi.extraCost ? ' is-extra' : ''}">${poi.number}</span>
        <div class="np-dest"><small>${esc(t('nav_goTo'))}</small><b>${esc(name)}</b></div>
        <button type="button" class="np-close" data-act="close" aria-label="${esc(t('close'))}">${ICON.close}</button>
      </header>
      <div class="np-summary">
        <span class="np-time">${minutes} ${esc(t('nav_min'))}</span>
        <span class="np-dist">${ICON.walk}${esc(formatDistance(distance, lang))} · ${esc(t('nav_walk'))}</span>
      </div>
      <div class="np-from">
        <span class="np-from-dot${from.simulated ? ' is-sim' : ''}" aria-hidden="true"></span>
        <span class="np-from-text">${esc(t('nav_from'))}: <b>${esc(t(fromLabel))}</b></span>
        ${
          from.reason === 'manual'
            ? `<button type="button" class="link" data-act="real">${esc(t('nav_cancel'))}</button>`
            : `<button type="button" class="link" data-act="pick">${esc(t('nav_pick'))}</button>`
        }
      </div>
      ${note ? `<p class="np-note${from.reason === 'waiting' ? ' is-info' : ''}">${esc(t(note))}</p>` : ''}
      ${direct ? `<p class="np-note is-info">${esc(t('nav_direct'))}</p>` : ''}
      <div class="np-actions">
        <button type="button" class="np-start" data-act="start">${TURN_ICONS.straight}${esc(t('nav_start'))}</button>
        <button type="button" class="np-sim" data-act="sim">${esc(t('nav_simulate'))}</button>
      </div>
      <h3 class="np-steps-title">${esc(t('nav_steps'))}</h3>
      <ol class="np-steps">${steps
        .map(
          (s) => `<li class="np-step is-${s.turn}">
            <span class="np-step-icon">${turnIcon(s)}</span>
            <span class="np-step-text">${esc(s.instruction)}${s.distance ? `<small>${esc(formatDistance(s.distance, lang))}</small>` : ''}</span>
          </li>`,
        )
        .join('')}</ol>`;
    panel.hidden = false;
    top.hidden = bottom.hidden = recenter.hidden = true;
  }

  // -------------------------------------------------------------- active
  bottom.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    if (b.dataset.speed) {
      speed = +b.dataset.speed;
      onSpeed(speed);
      renderSpeeds();
    } else if (b.dataset.act === 'end') onEnd();
  });
  recenter.addEventListener('click', () => onRecenter());

  function renderSpeeds() {
    for (const b of bottom.querySelectorAll('[data-speed]')) b.setAttribute('aria-pressed', String(+b.dataset.speed === speed));
  }

  function showActive({ simulate: sim, speed: k }) {
    simulate = sim;
    speed = k;
    panel.hidden = true;
    top.hidden = false;
    top.className = 'nav-top';
    top.innerHTML = `<span class="nt-icon"></span><div class="nt-text"><b></b><small hidden></small></div>`;
    bottom.innerHTML = `
      <div class="nb-info"><b class="nb-time"></b><span class="nb-dist"></span>${simulate ? `<em class="nb-sim">${esc(t('nav_simulating'))}</em>` : ''}</div>
      ${
        simulate
          ? `<div class="nb-speed" role="group" aria-label="${esc(t('nav_speed'))}">${SIM_SPEEDS.map(
              (s) => `<button type="button" data-speed="${s}" aria-pressed="false">${s}×</button>`,
            ).join('')}</div>`
          : ''
      }
      <button type="button" class="nb-end" data-act="end">${esc(t('nav_end'))}</button>`;
    renderSpeeds();
    bottom.hidden = false;
    recenter.innerHTML = `${TURN_ICONS.straight}<span>${esc(t('nav_recenter'))}</span>`;
  }

  let lastText = '';
  function setBanner({ text, turn, slight, then, remaining, minutes }) {
    if (top.hidden || top.classList.contains('is-arrived')) return;
    if (text !== lastText) {
      lastText = text;
      top.querySelector('.nt-text b').textContent = text;
      top.querySelector('.nt-icon').innerHTML = turnIcon({ turn, slight });
    }
    const small = top.querySelector('.nt-text small');
    small.hidden = !then;
    if (then) small.textContent = `${t('nav_then')}: ${then.instruction}`;
    if (remaining !== undefined) {
      bottom.querySelector('.nb-time').textContent = `${minutes} ${t('nav_min')}`;
      bottom.querySelector('.nb-dist').textContent = formatDistance(remaining, lang);
    }
  }

  function showArrived(name) {
    top.classList.add('is-arrived');
    top.querySelector('.nt-icon').innerHTML = TURN_ICONS.arrive;
    top.querySelector('.nt-text b').textContent = t('nav_arrived');
    const small = top.querySelector('.nt-text small');
    small.hidden = false;
    small.textContent = name;
    lastText = '';
    const time = bottom.querySelector('.nb-time');
    if (time) time.textContent = '0 ' + t('nav_min');
    const dist = bottom.querySelector('.nb-dist');
    if (dist) dist.textContent = '';
  }

  function setPicking(on) {
    toast.hidden = !on;
    if (on) {
      toast.innerHTML = `<span>${esc(t('nav_pick_hint'))}</span><button type="button">${esc(t('nav_cancel'))}</button>`;
      toast.querySelector('button').addEventListener('click', () => onCancelPick());
    }
    document.documentElement.classList.toggle('gx-nav-picking', on);
  }

  return {
    showPreview,
    showActive,
    setBanner,
    showArrived,
    setPicking,
    setFollowPaused(on) {
      recenter.hidden = !on || top.hidden;
    },
    hide() {
      panel.hidden = top.hidden = bottom.hidden = recenter.hidden = toast.hidden = true;
      lastText = '';
    },
    /** Height (px) the preview sheet covers at the bottom on phones. */
    sheetHeight: () => (panel.hidden ? 0 : panel.offsetHeight),
    panel,
  };
}
