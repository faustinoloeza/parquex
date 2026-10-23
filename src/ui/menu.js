import { esc } from './dom.js';

const CHECK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"/></svg>';

/**
 * Drop-down menu attached to a button (Material 3 style, like the Android app):
 * radio items with a check mark, optional section titles. Keyboard: Enter/Space/
 * ArrowDown open it, arrows/Home/End move, Escape/Tab close it.
 *
 * @param {HTMLButtonElement} button  the trigger (gets aria-haspopup / aria-expanded)
 * @param {() => Array<{ title: string } | { label: string, checked?: boolean, onSelect: () => void }>} items
 *        built each time the menu opens
 * @param {{ align?: 'start' | 'end', label?: string }} [options]
 */
export function attachMenu(button, items, { align = 'start', label } = {}) {
  const menu = document.createElement('div');
  menu.className = `menu menu-${align}`;
  menu.setAttribute('role', 'menu');
  if (label) menu.setAttribute('aria-label', label);
  menu.hidden = true;
  button.after(menu);
  button.setAttribute('aria-haspopup', 'menu');
  button.setAttribute('aria-expanded', 'false');

  let actions = [];
  const entries = () => [...menu.querySelectorAll('[role^="menuitem"]')];
  const focusAt = (i) => {
    const list = entries();
    list[(i + list.length) % list.length]?.focus();
  };

  const onOutside = (e) => {
    if (!menu.contains(e.target) && !button.contains(e.target)) close();
  };
  function open(focusFirst = false) {
    actions = [];
    menu.innerHTML = items()
      .map((item) => {
        if ('title' in item) return `<div class="menu-title" role="presentation">${esc(item.title)}</div>`;
        actions.push(item.onSelect);
        return `<button type="button" role="menuitemradio" aria-checked="${Boolean(item.checked)}" data-i="${actions.length - 1}" tabindex="-1">
            <span>${esc(item.label)}</span>${item.checked ? CHECK : ''}</button>`;
      })
      .join('');
    menu.hidden = false;
    button.setAttribute('aria-expanded', 'true');
    document.addEventListener('pointerdown', onOutside, true);
    const list = entries();
    if (focusFirst) (list.find((b) => b.getAttribute('aria-checked') === 'true') ?? list[0])?.focus();
  }
  function close(refocus = false) {
    if (menu.hidden) return;
    menu.hidden = true;
    button.setAttribute('aria-expanded', 'false');
    document.removeEventListener('pointerdown', onOutside, true);
    if (refocus) button.focus();
  }

  // e.detail === 0: activated from the keyboard, so focus moves into the menu
  button.addEventListener('click', (e) => (menu.hidden ? open(e.detail === 0) : close()));
  button.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (menu.hidden) open(true);
      else focusAt(0);
    } else if (e.key === 'Escape') close();
  });
  menu.addEventListener('click', (e) => {
    const b = e.target.closest('[data-i]');
    if (!b) return;
    close(true);
    actions[+b.dataset.i]?.();
  });
  menu.addEventListener('keydown', (e) => {
    const list = entries();
    const i = list.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') focusAt(i + 1);
    else if (e.key === 'ArrowUp') focusAt(i - 1);
    else if (e.key === 'Home') focusAt(0);
    else if (e.key === 'End') focusAt(-1);
    else if (e.key === 'Escape') close(true);
    else if (e.key === 'Tab') return close();
    else return;
    e.preventDefault();
  });

  return { open, close, el: menu };
}
