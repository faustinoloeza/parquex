import es from './es.js';
import en from './en.js';
import zh from './zh.js';
import ja from './ja.js';
import fr from './fr.js';
import pt from './pt.js';
import ko from './ko.js';
import ar from './ar.js';
import it from './it.js';
import hi from './hi.js';

const STRINGS = { es, en, zh, ja, fr, pt, ko, ar, it, hi };

/** Supported languages, in the order of the settings menu; the first one is the default. */
export const LANGS = Object.keys(STRINGS);

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

/**
 * Returns t(key): park labels (official data, park.json) first, then the UI
 * strings of the language, then English (Spanish for Spanish), then Spanish,
 * then the key itself.
 * @param {string} lang
 * @param {Record<string, Record<string, string>>} [labels] park.json → labels
 */
export function translator(lang, labels = {}) {
  const fallback = lang === 'es' ? STRINGS.es : STRINGS.en;
  return (key) => labels[lang]?.[key] ?? STRINGS[lang]?.[key] ?? fallback[key] ?? STRINGS.es[key] ?? key;
}

/**
 * Picks the value for `lang` from a { es, en, … } object: the official data
 * comes in Spanish and English only, so other languages show English; an
 * empty value falls back to Spanish.
 */
export const localized = (value, lang) => value?.[lang] || (lang !== 'es' && value?.en) || value?.es || '';
