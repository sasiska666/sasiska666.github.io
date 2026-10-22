import { useI18n } from '../i18n/I18nProvider';
import { LANGS, LANG_META } from '../i18n/types';

export function LangSwitch({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useI18n();
  return (
    <div className={`lang ${className}`} role="group" aria-label={t.a11y.language}>
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          className="lang__btn"
          aria-pressed={l === lang}
          lang={LANG_META[l].htmlLang}
          title={LANG_META[l].name}
          onClick={() => setLang(l)}
        >
          {LANG_META[l].label}
        </button>
      ))}
    </div>
  );
}
