import { describe, expect, it } from 'vitest';
import { LANGS, LANG_NAMES, LOCALES, loadLanguage, localized, translator } from '../../src/i18n/index.js';
import en from '../../src/i18n/en.js';

describe('UI languages', () => {
  it('offers Spanish first and ten languages with names and locales', () => {
    expect(LANGS).toEqual(['es', 'en', 'zh', 'ja', 'fr', 'pt', 'ko', 'ar', 'it', 'hi']);
    for (const l of LANGS) {
      expect(LANG_NAMES[l], l).toBeTruthy();
      expect(LOCALES[l], l).toBeTruthy();
    }
  });

  it('translates every string, keeping the placeholders', async () => {
    for (const l of LANGS) {
      const { default: strings } = await import(`../../src/i18n/${l}.js`);
      expect(Object.keys(strings).sort(), l).toEqual(Object.keys(en).sort());
      for (const [key, text] of Object.entries(en)) {
        expect(strings[key], `${l}.${key}`).toBeTruthy();
        const holes = (s) => (s.match(/\{\w+\}/g) ?? []).sort();
        expect(holes(strings[key]), `${l}.${key}`).toEqual(holes(text));
      }
    }
  });

  it('falls back to English (Spanish for Spanish), then to the key', async () => {
    await loadLanguage('ja');
    const t = translator('ja', { ja: { lbl_map_prefix_xc: 'パーク' } });
    expect(t('lbl_map_prefix_xc')).toBe('パーク'); // the park's own labels first
    expect(t('nav_go')).toBe('行く');
    expect(t('nope')).toBe('nope');
  });

  it('shows data in English for languages the official data lacks', () => {
    const name = { es: 'Río Subterráneo', en: 'Underground River' };
    expect(localized(name, 'es')).toBe('Río Subterráneo');
    expect(localized(name, 'fr')).toBe('Underground River');
    expect(localized({ es: 'Ruta del Río', en: '' }, 'ko')).toBe('Ruta del Río');
    expect(localized({ es: 'Baños', en: 'Restrooms', ja: 'トイレ' }, 'ja')).toBe('トイレ');
  });
});
