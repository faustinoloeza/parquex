import es from './es.js';
import en from './en.js';

const STRINGS = { es, en };

/** Supported languages; the first one is the default. */
export const LANGS = Object.keys(STRINGS);

/**
 * Returns t(key): park labels (official data, park.json) first, then the UI
 * strings of the language, then Spanish, then the key itself.
 * @param {string} lang
 * @param {Record<string, Record<string, string>>} [labels] park.json → labels
 */
export function translator(lang, labels = {}) {
  return (key) => labels[lang]?.[key] ?? STRINGS[lang]?.[key] ?? STRINGS.es[key] ?? key;
}

/** Picks the value for `lang` from a { es, en } object. */
export const localized = (value, lang) => value?.[lang] ?? value?.es ?? '';
