import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import { ARTICLES, ARTICLE_MAP } from '../content/articles';
import { Blocks } from '../components/Blocks';
import { RichText } from '../components/RichText';
import { Icon } from '../components/Icon';
import { CopyButton } from '../components/CopyButton';
import { articleHref, prefersReducedMotion } from '../hooks/useHashRoute';

const PARTS = ['intro', 'content', 'example', 'takeaways', 'related'] as const;
type Part = (typeof PARTS)[number];

export function ArticleView({ slug }: { slug: string }) {
  const { t, lang } = useI18n();
  const article = ARTICLE_MAP[slug];
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState<Part>('intro');

  // Move focus to the title when a new article opens (not on language change).
  useEffect(() => {
    titleRef.current?.focus({ preventScroll: true });
  }, [slug]);

  useEffect(() => {
    const onScroll = () => {
      const el = bodyRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 1;
      setProgress(p);
      let cur: Part = 'intro';
      for (const part of PARTS) {
        const sec = document.getElementById(`art-${part}`);
        if (sec && sec.getBoundingClientRect().top < window.innerHeight * 0.35) cur = part;
      }
      setCurrent(cur);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [slug, lang]);

  if (!article) {
    return (
      <section className="article article--missing wrap">
        <p className="label">404</p>
        <h1 ref={titleRef} tabIndex={-1} className="article__title">
          {t.learn.article.notFound}
        </h1>
        <p className="muted">{t.learn.article.notFoundText}</p>
        <a className="btn btn--ghost" href="#learn">
          <Icon name="arrowLeft" size={18} />
          {t.learn.article.back}
        </a>
      </section>
    );
  }

  const c = article.i18n[lang];
  const idx = ARTICLES.indexOf(article);
  const prev = ARTICLES[idx - 1];
  const next = ARTICLES[idx + 1];
  const shareUrl = `${window.location.origin}${window.location.pathname}${articleHref(article.slug)}`;
  const partLabel: Record<Part, string> = {
    intro: t.learn.article.intro,
    content: t.learn.article.content,
    example: t.learn.article.example,
    takeaways: t.learn.article.takeaways,
    related: t.learn.article.related,
  };
  const jump = (part: Part) => {
    document
      .getElementById(`art-${part}`)
      ?.scrollIntoView({ block: 'start', behavior: prefersReducedMotion() ? 'instant' : 'smooth' });
  };

  return (
    <article className="article" aria-labelledby="article-title">
      <div
        className="readbar"
        role="progressbar"
        aria-label={t.learn.article.progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
      >
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>

      <header className="article__head wrap">
        <a className="article__back" href="#learn">
          <Icon name="arrowLeft" size={16} />
          {t.learn.article.back}
        </a>
        <dl className="article__meta">
          <div>
            <dt>{t.learn.article.category}</dt>
            <dd>{t.learn.categories[article.category]}</dd>
          </div>
          <div>
            <dt>{t.learn.article.readTime}</dt>
            <dd>{t.learn.minutes(article.minutes)}</dd>
          </div>
          <div>
            <dt>#</dt>
            <dd translate="no">{String(idx + 1).padStart(2, '0')}</dd>
          </div>
        </dl>
        <h1 id="article-title" ref={titleRef} tabIndex={-1} className="article__title">
          {c.title}
        </h1>
      </header>

      <div className="article__layout wrap" ref={bodyRef}>
        <aside className="article__aside">
          <nav aria-label={t.learn.article.toc}>
            <p className="label">{t.learn.article.toc}</p>
            <ol className="toc">
              {PARTS.map((part) => (
                <li key={part}>
                  <button type="button" className={current === part ? 'is-current' : ''} onClick={() => jump(part)}>
                    {partLabel[part]}
                  </button>
                </li>
              ))}
            </ol>
          </nav>
          <CopyButton text={shareUrl} label={t.learn.article.copyLink} showLabel className="article__share" />
        </aside>

        <div className="article__main prose">
          <section id="art-intro" className="article__part" aria-label={t.learn.article.intro}>
            <p className="article__intro">
              <RichText text={c.intro} />
            </p>
          </section>

          <section id="art-content" className="article__part">
            <h2 className="article__part-title">
              <span>01</span>
              {t.learn.article.content}
            </h2>
            <Blocks blocks={c.body} />
          </section>

          <section id="art-example" className="article__part">
            <h2 className="article__part-title">
              <span>02</span>
              {t.learn.article.example}
            </h2>
            <Blocks blocks={c.example} />
          </section>

          <section id="art-takeaways" className="article__part">
            <h2 className="article__part-title">
              <span>03</span>
              {t.learn.article.takeaways}
            </h2>
            <ul className="takeaways">
              {c.takeaways.map((k, i) => (
                <li key={i}>
                  <Icon name="check" size={16} />
                  <span>
                    <RichText text={k} />
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section id="art-related" className="article__part">
            <h2 className="article__part-title">
              <span>04</span>
              {t.learn.article.related}
            </h2>
            <ul className="related">
              {article.related
                .map((s) => ARTICLE_MAP[s])
                .filter(Boolean)
                .map((r) => (
                  <li key={r.slug}>
                    <a href={articleHref(r.slug)}>
                      <span className="related__cat">{t.learn.categories[r.category]}</span>
                      <span className="related__title">{r.i18n[lang].title}</span>
                      <Icon name="arrowRight" size={16} />
                    </a>
                  </li>
                ))}
            </ul>

            {article.docs.length > 0 && (
              <>
                <h3 className="label docs-label">{t.learn.article.docs}</h3>
                <ul className="docs">
                  {article.docs.map((d) => (
                    <li key={d.url}>
                      <a href={d.url} target="_blank" rel="noopener noreferrer">
                        <Icon name="book" size={16} />
                        <span translate="no">{d.label}</span>
                        <Icon name="arrowUpRight" size={14} />
                        <span className="sr-only">{t.a11y.newTab}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>

          <nav className="pager" aria-label={`${t.learn.article.prev} / ${t.learn.article.next}`}>
            {prev ? (
              <a href={articleHref(prev.slug)} className="pager__link">
                <span className="label">
                  <Icon name="arrowLeft" size={14} /> {t.learn.article.prev}
                </span>
                <span>{prev.i18n[lang].title}</span>
              </a>
            ) : (
              <span />
            )}
            {next ? (
              <a href={articleHref(next.slug)} className="pager__link pager__link--next">
                <span className="label">
                  {t.learn.article.next} <Icon name="arrowRight" size={14} />
                </span>
                <span>{next.i18n[lang].title}</span>
              </a>
            ) : (
              <span />
            )}
          </nav>
        </div>
      </div>
    </article>
  );
}
