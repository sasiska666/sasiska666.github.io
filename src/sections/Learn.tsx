import { useEffect, useMemo, useRef, useState } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import { SectionHead } from '../components/SectionHead';
import { ARTICLES } from '../content/articles';
import { CATEGORIES, type CategoryId } from '../content/types';
import { articleHaystack, matches } from '../utils/search';
import { articleHref } from '../hooks/useHashRoute';
import { Icon } from '../components/Icon';

type Filter = 'all' | CategoryId;

export function Learn() {
  const { t, lang } = useI18n();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  // "/" focuses search, like many developer tools.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      const typing = el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);
      if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey) {
        const section = document.getElementById('learn');
        if (!section) return;
        const r = section.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) {
          e.preventDefault();
          inputRef.current?.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const index = useMemo(
    () => ARTICLES.map((a) => ({ a, hay: articleHaystack(a, lang, t.learn.categories[a.category]) })),
    [lang, t],
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: 0 };
    for (const { a, hay } of index) {
      if (!matches(hay, query)) continue;
      c.all++;
      c[a.category] = (c[a.category] ?? 0) + 1;
    }
    return c;
  }, [index, query]);

  const results = index
    .filter(({ a, hay }) => (filter === 'all' || a.category === filter) && matches(hay, query))
    .map((x) => x.a);

  const reset = () => {
    setQuery('');
    setFilter('all');
    inputRef.current?.focus();
  };

  return (
    <section id="learn" className="section learn" aria-labelledby="learn-title">
      <div className="wrap">
        <SectionHead id="learn" index="03" kicker={t.learn.kicker} title={t.learn.title} intro={t.learn.intro} />

        <div className="lib" data-reveal>
          <div className="lib__controls">
            <label className="search">
              <span className="sr-only">{t.learn.searchLabel}</span>
              <Icon name="search" size={18} />
              <input
                ref={inputRef}
                type="search"
                value={query}
                placeholder={t.learn.searchPlaceholder}
                onChange={(e) => setQuery(e.target.value)}
                autoComplete="off"
                spellCheck={false}
              />
              {query ? (
                <button
                  type="button"
                  className="search__clear"
                  onClick={() => setQuery('')}
                  aria-label={t.learn.clearSearch}
                >
                  <Icon name="x" size={16} />
                </button>
              ) : (
                <kbd aria-hidden="true">/</kbd>
              )}
            </label>

            <div className="chips" role="group" aria-label={t.learn.filtersLabel}>
              {(['all', ...CATEGORIES] as Filter[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  className="chip"
                  aria-pressed={filter === c}
                  onClick={() => setFilter(c)}
                  disabled={c !== 'all' && !counts[c] && filter !== c}
                >
                  {c === 'all' ? t.learn.all : t.learn.categories[c]}
                  <span className="chip__count">{counts[c] ?? 0}</span>
                </button>
              ))}
            </div>
          </div>

          <p className="lib__count" aria-live="polite">
            {t.learn.results(results.length)}
          </p>

          {results.length > 0 ? (
            <ol className="lib__list">
              <li className="lib__row lib__row--head" aria-hidden="true">
                <span>{t.learn.cols.no}</span>
                <span>{t.learn.cols.title}</span>
                <span>{t.learn.cols.category}</span>
                <span>{t.learn.cols.time}</span>
              </li>
              {results.map((a) => {
                const c = a.i18n[lang];
                const n = ARTICLES.indexOf(a) + 1;
                return (
                  <li key={a.slug}>
                    <a className="lib__row" href={articleHref(a.slug)}>
                      <span className="lib__num">{String(n).padStart(2, '0')}</span>
                      <span className="lib__main">
                        <span className="lib__title">{c.title}</span>
                        <span className="lib__intro">{c.intro}</span>
                      </span>
                      <span className="lib__cat">{t.learn.categories[a.category]}</span>
                      <span className="lib__time">
                        {t.learn.minutes(a.minutes)}
                        <Icon name="arrowRight" size={16} />
                      </span>
                    </a>
                  </li>
                );
              })}
            </ol>
          ) : (
            <div className="empty">
              <pre className="empty__art" aria-hidden="true">{`  ┌─────────────┐
  │  0 results  │
  └──────┬──────┘
         ▼
    ¯\\_(ツ)_/¯`}</pre>
              <div>
                <p className="empty__title">{t.learn.empty.title}</p>
                <p className="muted">{t.learn.empty.text}</p>
                <button type="button" className="btn btn--ghost btn--sm" onClick={reset}>
                  {t.learn.empty.reset}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
