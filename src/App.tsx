import { useEffect, useLayoutEffect, useRef } from 'react';
import { useI18n } from './i18n/I18nProvider';
import { useHashRoute, prefersReducedMotion, type Route } from './hooks/useHashRoute';
import { useReveal } from './hooks/useReveal';
import { useActiveSection } from './hooks/useActiveSection';
import { ARTICLE_MAP } from './content/articles';
import { Nav } from './components/Nav';
import { Footer, BackToTop } from './components/Footer';
import { Hero, Marquee } from './sections/Hero';
import { About } from './sections/About';
import { Projects } from './sections/Projects';
import { Learn } from './sections/Learn';
import { ArticleView } from './sections/ArticleView';
import { SurvivalKit } from './sections/SurvivalKit';
import { Toolbox } from './sections/Toolbox';
import { Terminal } from './sections/Terminal';
import { Services } from './sections/Services';
import { Contact } from './sections/Contact';

function setMeta(selector: string, content: string) {
  document.querySelector(selector)?.setAttribute('content', content);
}

export function App() {
  const { t, lang } = useI18n();
  const route = useHashRoute();
  const mainRef = useRef<HTMLElement>(null);
  const prev = useRef<Route | null>(null);
  const isArticle = route.kind === 'article';
  const active = useActiveSection(!isArticle);

  useReveal([route.kind === 'article' ? route.slug : 'page', lang]);

  // Localized document metadata.
  useEffect(() => {
    const art = route.kind === 'article' ? ARTICLE_MAP[route.slug] : undefined;
    const title = art ? t.meta.articleTitle(art.i18n[lang].title) : t.meta.title;
    const desc = art ? art.i18n[lang].intro : t.meta.description;
    document.title = title;
    setMeta('meta[name="description"]', desc);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', desc);
    setMeta('meta[property="og:locale"]', { ru: 'ru_RU', en: 'en_US', zh: 'zh_CN' }[lang]);
  }, [route, lang, t]);

  // Scroll handling when the route changes (never on language change).
  useLayoutEffect(() => {
    const before = prev.current;
    prev.current = route;
    if (route.kind === 'article') {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    const comingFromArticle = !before || before.kind === 'article';
    if (route.id === 'home' && comingFromArticle && !window.location.hash) return;
    const el = document.getElementById(route.id);
    if (!el) return;
    const smooth = !comingFromArticle && !prefersReducedMotion();
    // 'instant' bypasses the CSS `scroll-behavior: smooth` when jumping back from an article.
    el.scrollIntoView({ behavior: smooth ? 'smooth' : 'instant', block: 'start' });
  }, [route]);

  return (
    <>
      <a
        className="skip"
        href="#home"
        onClick={(e) => {
          e.preventDefault();
          mainRef.current?.focus();
        }}
      >
        {t.a11y.skip}
      </a>
      <Nav active={isArticle ? 'learn' : active} />
      <main id="main" ref={mainRef} tabIndex={-1}>
        {route.kind === 'article' ? (
          <ArticleView slug={route.slug} />
        ) : (
          <>
            <Hero />
            <Marquee />
            <About />
            <Projects />
            <Learn />
            <SurvivalKit />
            <Toolbox />
            <Terminal />
            <Services />
            <Contact />
          </>
        )}
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
