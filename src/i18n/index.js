// UI strings, one file per language, each loaded only when it is used
// (loadLanguage): the app ships the strings of the page's language alone.

/** Supported languages, in the order of the settings menu; the first one is the default. */
const LOADERS = {
  es: () => import('./es.js'),
  en: () => import('./en.js'),
  zh: () => import('./zh.js'),
  ja: () => import('./ja.js'),
  fr: () => import('./fr.js'),
  pt: () => import('./pt.js'),
  ko: () => import('./ko.js'),
  ar: () => import('./ar.js'),
  it: () => import('./it.js'),
  hi: () => import('./hi.js'),
};
export const LANGS = Object.keys(LOADERS);

/** Language names in their own language (not translated). */
export const LANG_NAMES = {
  es: 'Español',
  en: 'English',
  zh: '简体中文',
  ja: '日本語',
  fr: 'Français',
  pt: 'Português',
  ko: '한국어',
  ar: 'العربية',
  it: 'Italiano',
  hi: 'हिन्दी',
};

/** Locale of each language for dates and numbers (Intl). */
export const LOCALES = {
  es: 'es-MX',
  en: 'en-US',
  zh: 'zh-CN',
  ja: 'ja-JP',
  fr: 'fr-FR',
  pt: 'pt-BR',
  ko: 'ko-KR',
  ar: 'ar',
  it: 'it-IT',
  hi: 'hi-IN',
};

/** Languages written right to left (html dir="rtl"). */
export const RTL = new Set(['ar']);

/** Strings loaded so far, by language. */
const STRINGS = {};

/** The language a language falls back to for a missing string: English (Spanish has none). */
const fallbackOf = (lang) => (lang === 'es' ? null : 'en');

/**
 * Loads the strings of a language (and of its fallback) before translator()
 * is used with it.
 * @param {string} lang
 */
export async function loadLanguage(lang) {
  const needed = [lang, fallbackOf(lang)].filter((l) => l && LOADERS[l] && !STRINGS[l]);
  await Promise.all(needed.map(async (l) => (STRINGS[l] = (await LOADERS[l]()).default)));
}

/**
 * Returns t(key): park labels (official data, park.json) first, then the UI
 * strings of the language, then English, then the key itself. The language
 * must be loaded (loadLanguage).
 * @param {string} lang
 * @param {Record<string, Record<string, string>>} [labels] park.json → labels
 */
export function translator(lang, labels = {}) {
  const own = STRINGS[lang] ?? {},
    fallback = STRINGS[fallbackOf(lang)] ?? {};
  return (key) => labels[lang]?.[key] ?? own[key] ?? fallback[key] ?? key;
}

/**
 * Picks the value for `lang` from a { es, en, … } object: the official data
 * comes in Spanish and English only, so other languages show English; an
 * empty value falls back to Spanish.
 */
export const localized = (value, lang) => value?.[lang] || (lang !== 'es' && value?.en) || value?.es || '';
