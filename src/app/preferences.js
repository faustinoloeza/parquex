// Per-device preferences in localStorage (may be unavailable in private mode).
const PREFIX = 'gx3d-';

export function readPreference(key, fallback) {
  try {
    return localStorage.getItem(PREFIX + key) ?? fallback;
  } catch {
    return fallback;
  }
}

export function writePreference(key, value) {
  try {
    localStorage.setItem(PREFIX + key, value);
  } catch {
    /* private mode */
  }
}
