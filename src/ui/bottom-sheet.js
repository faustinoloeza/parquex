// Modal bottom sheet for phones, like the Android app's (Material 3
// ModalBottomSheet in Parquex, ui/ActivitiesSheet.kt): a dimmed backdrop over
// the map, a drag handle, a half and a full height, and it closes by swiping
// down, tapping the backdrop, Escape or the browser's back button.

const DRAG_PX = 56; // M3 positional threshold: distance to leave an anchor
const FLING_PX_S = 125; // M3 velocity threshold
const SLOP_PX = 6; // finger movement before a touch becomes a drag
const SAMPLE_MS = 100; // the release velocity comes from the last 100 ms

/**
 * Anchors are translateY offsets in px: 0 = full height, `half` = the top half
 * of the screen free (only when the content is taller than that), `hidden` =
 * below the screen.
 *
 * @param {HTMLElement} root
 * @param {{ label: string, handleLabel: string, onClose?: () => void }} options
 * @returns {{ el: HTMLElement, head: HTMLElement, body: HTMLElement, open(): void, close(): void, expand(): void,
 *   readonly isOpen: boolean, remove(): void }}
 */
export function createBottomSheet(root, { label, handleLabel, onClose }) {
  const scrim = document.createElement('div');
  scrim.className = 'sheet-scrim';
  scrim.hidden = true;
  const el = document.createElement('section');
  el.className = 'sheet';
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-modal', 'true');
  el.setAttribute('aria-label', label);
  el.tabIndex = -1;
  el.hidden = true;
  el.innerHTML = `<button type="button" class="sheet-handle" aria-label="${handleLabel}"><span></span></button>
    <div class="sheet-head"></div><div class="sheet-body"></div>`;
  root.append(scrim, el);
  const handle = el.querySelector('.sheet-handle');
  const head = el.querySelector('.sheet-head');
  const body = el.querySelector('.sheet-body');

  let isOpen = false;
  let state = 'hidden'; // 'half' | 'full' | 'hidden'
  let anchors = { full: 0, half: null, hidden: 0 };
  let pos = 0;
  let hideTimer = 0;
  let returnFocus = null;

  /** Fixes the sheet at its natural height (capped by CSS) and derives the anchors. */
  function measure() {
    el.style.height = '';
    const screen = root.clientHeight;
    const h = el.offsetHeight;
    el.style.height = `${h}px`;
    anchors = { full: 0, half: h > screen / 2 ? h - screen / 2 : null, hidden: h + 16 };
  }

  function setPos(px, animate = true) {
    pos = px;
    el.style.transition = scrim.style.transition = animate ? '' : 'none';
    el.style.transform = `translateY(${px}px)`;
    // the backdrop fades out between the opening height and the bottom of the screen
    const from = anchors.half ?? anchors.full;
    scrim.style.opacity = String(Math.min(1, Math.max(0, (anchors.hidden - px) / (anchors.hidden - from))));
  }

  function snap(to) {
    state = to;
    setPos(anchors[to]);
  }

  function open() {
    if (isOpen) return;
    isOpen = true;
    clearTimeout(hideTimer);
    returnFocus = document.activeElement;
    el.classList.remove('is-closing');
    scrim.hidden = el.hidden = false;
    measure();
    setPos(anchors.hidden, false);
    void el.offsetHeight; // start the slide from below the screen
    snap(anchors.half != null ? 'half' : 'full');
    history.pushState({ sheet: true }, '');
    addEventListener('popstate', onPopState);
    document.addEventListener('keydown', onKey);
    addEventListener('resize', onResize);
    visualViewport?.addEventListener('resize', onViewport);
    visualViewport?.addEventListener('scroll', onViewport);
    el.focus({ preventScroll: true });
  }

  function close({ fromHistory = false } = {}) {
    if (!isOpen) return;
    isOpen = false;
    state = 'hidden';
    removeEventListener('popstate', onPopState);
    document.removeEventListener('keydown', onKey);
    removeEventListener('resize', onResize);
    visualViewport?.removeEventListener('resize', onViewport);
    visualViewport?.removeEventListener('scroll', onViewport);
    if (!fromHistory && history.state?.sheet) history.back();
    el.classList.add('is-closing');
    setPos(anchors.hidden);
    hideTimer = setTimeout(() => {
      scrim.hidden = el.hidden = true;
      el.classList.remove('is-closing');
    }, 220);
    if (el.contains(document.activeElement)) returnFocus?.focus({ preventScroll: true });
    onClose?.();
  }

  function expand() {
    if (isOpen && state !== 'full') snap('full');
  }

  const onPopState = () => close({ fromHistory: true });
  const onKey = (e) => {
    if (e.key === 'Escape') close();
  };
  const onResize = () => {
    measure();
    snap(state === 'half' && anchors.half == null ? 'full' : state);
  };
  // on-screen keyboard: the list can scroll its last rows above it
  const onViewport = () => {
    const vv = visualViewport;
    el.style.setProperty('--kb', `${Math.max(0, innerHeight - vv.height - vv.offsetTop)}px`);
  };

  // ------------------------------------------------------------------ drag
  let drag = null; // { y0, start, active, inBody, samples: [[ms, y]] }
  let dragged = false; // a mouse drag on the handle is not a click

  function begin(y, ms, target) {
    if (!isOpen) return;
    drag = { y0: y, start: pos, active: false, inBody: body.contains(target), samples: [[ms, y]] };
  }

  /** @returns {boolean} true when the sheet takes the movement (the list does not scroll) */
  function move(y, ms) {
    if (!drag) return false;
    if (!drag.active) {
      const dy = y - drag.y0;
      if (Math.abs(dy) < SLOP_PX) return false;
      // in the list the sheet moves only when the list cannot scroll that way:
      // down with the list at the top, or up while the sheet is not full yet
      if (drag.inBody && !((dy > 0 && body.scrollTop <= 0) || (dy < 0 && state === 'half'))) {
        drag = null;
        return false;
      }
      drag.active = true;
      drag.y0 = y;
    }
    setPos(Math.min(anchors.hidden, Math.max(anchors.full, drag.start + y - drag.y0)), false);
    drag.samples.push([ms, y]);
    while (drag.samples.length > 2 && ms - drag.samples[0][0] > SAMPLE_MS) drag.samples.shift();
    return true;
  }

  function end(ms) {
    const d = drag;
    drag = null;
    if (!d?.active) return;
    dragged = true;
    const recent = d.samples.filter(([t]) => ms - t <= SAMPLE_MS);
    const [t0, y0] = recent[0] ?? [ms, 0],
      [t1, y1] = recent.at(-1) ?? [ms, 0];
    const v = t1 > t0 ? ((y1 - y0) / (t1 - t0)) * 1000 : 0; // px/s, positive = down
    const stops = ['full', 'half', 'hidden'].filter((k) => anchors[k] != null);
    const fling = Math.abs(v) > FLING_PX_S;
    const down = fling ? v > 0 : pos >= d.start;
    // the anchor it comes from and the next one in the direction of the movement
    const next = down ? (stops.find((k) => anchors[k] > pos) ?? 'hidden') : (stops.findLast((k) => anchors[k] < pos) ?? 'full');
    const prev = down ? (stops.findLast((k) => anchors[k] <= pos) ?? 'full') : (stops.find((k) => anchors[k] >= pos) ?? 'hidden');
    const target = fling || Math.abs(pos - anchors[prev]) > DRAG_PX ? next : prev;
    if (target === 'hidden') close();
    else snap(target);
  }

  el.addEventListener('touchstart', (e) => e.touches.length === 1 && begin(e.touches[0].clientY, e.timeStamp, e.target), {
    passive: true,
  });
  el.addEventListener(
    'touchmove',
    (e) => {
      if (e.touches.length === 1 && move(e.touches[0].clientY, e.timeStamp) && e.cancelable) e.preventDefault();
    },
    { passive: false },
  );
  el.addEventListener('touchend', (e) => end(e.timeStamp));
  el.addEventListener('touchcancel', (e) => end(e.timeStamp));
  // mouse (desktop browsers in a narrow window): drag the handle or the header
  for (const area of [handle, head]) {
    area.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse' || e.button !== 0 || e.target.closest('input, button:not(.sheet-handle)')) return;
      area.setPointerCapture(e.pointerId);
      begin(e.clientY, e.timeStamp, e.target);
    });
    area.addEventListener('pointermove', (e) => e.pointerType === 'mouse' && move(e.clientY, e.timeStamp));
    area.addEventListener('pointerup', (e) => e.pointerType === 'mouse' && end(e.timeStamp));
  }

  // the handle alone toggles half / full (or closes when there is no half)
  handle.addEventListener('click', () => {
    if (dragged) return void (dragged = false);
    if (state === 'half') snap('full');
    else if (anchors.half != null) snap('half');
    else close();
  });
  el.addEventListener('pointerdown', () => (dragged = false), true);
  scrim.addEventListener('click', () => close());

  return {
    el,
    head,
    body,
    open,
    close,
    expand,
    get isOpen() {
      return isOpen;
    },
    /** Takes the sheet out of the page (the chrome is rebuilt). */
    remove() {
      if (isOpen) close();
      scrim.remove();
      el.remove();
    },
  };
}
