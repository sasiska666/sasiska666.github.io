import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { translations, type Dict } from './translations';
import { DEFAULT_LANG, LANG_META, isLang, type Lang, type L } from './types';
import { readStorage, writeStorage } from '../utils/storage';

const STORAGE_KEY = 'b1t.lang';

interface I18nValue {
  lang: Lang;
  t: Dict;
  setLang: (lang: Lang) => void;
  /** Picks the current-language value from a localized data field. */
  pick: <T>(value: Record<Lang, T>) => T;
}

const I18nContext = createContext<I18nValue | null>(null);

function initialLang(): Lang {
  const stored = readStorage(STORAGE_KEY);
  return isLang(stored) ? stored : DEFAULT_LANG;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    writeStorage(STORAGE_KEY, next);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = LANG_META[lang].htmlLang;
    root.dataset.lang = lang;
  }, [lang]);

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      t: translations[lang],
      setLang,
      pick: <T,>(v: Record<Lang, T>) => v[lang] ?? v[DEFAULT_LANG],
    }),
    [lang, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>');
  return ctx;
}

export type { L };
