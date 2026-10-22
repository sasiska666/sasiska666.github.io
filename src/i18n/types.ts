export const LANGS = ['ru', 'en', 'zh'] as const;
export type Lang = (typeof LANGS)[number];

/** A string that exists in every supported language. Used by data/ and content/ files. */
export type L = Record<Lang, string>;
/** A list of strings in every supported language. */
export type LList = Record<Lang, string[]>;

export const DEFAULT_LANG: Lang = 'ru';

export const LANG_META: Record<Lang, { label: string; htmlLang: string; locale: string; name: string }> = {
  ru: { label: 'RU', htmlLang: 'ru', locale: 'ru-RU', name: 'Русский' },
  en: { label: 'EN', htmlLang: 'en', locale: 'en-US', name: 'English' },
  zh: { label: '中文', htmlLang: 'zh-CN', locale: 'zh-CN', name: '简体中文' },
};

export function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && (LANGS as readonly string[]).includes(value);
}
