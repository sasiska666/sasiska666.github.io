import { useI18n } from '../i18n/I18nProvider';
import { HeroVisual } from '../components/HeroVisual';
import { Icon } from '../components/Icon';
import { SITE } from '../data/site';

export function Hero() {
  const { t } = useI18n();
  return (
    <section id="home" className="hero" aria-labelledby="home-title">
      <div className="hero__grid wrap">
        <div className="hero__copy">
          <p className="hero__label">
            <span className="pulse" aria-hidden="true" />
            {t.hero.label}
          </p>
          <h1 className="hero__title" id="home-title">
            <span className="hero__line">{t.hero.line1}</span>
            <span className="hero__line hero__line--alt">
              <LastWordWithCaret text={t.hero.line2} />
            </span>
          </h1>
          <p className="hero__text">{t.hero.text}</p>
          <div className="hero__cta">
            <a className="btn btn--primary" href="#projects">
              {t.hero.ctaPrimary}
              <Icon name="arrowRight" size={18} />
            </a>
            <a className="btn btn--ghost" href="#learn">
              <Icon name="book" size={18} />
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>
        <div className="hero__visual">
          <HeroVisual />
        </div>
      </div>
      <div className="hero__foot wrap" aria-hidden="true">
        <span translate="no" className="hero__handle">
          {SITE.handle}
        </span>
        <span className="hero__scroll">
          {t.hero.scroll}
          <i />
        </span>
        <span translate="no">N 10.10.0.0/24</span>
      </div>
    </section>
  );
}

/** Keeps the blinking caret glued to the last word so it never wraps onto its own line. */
function LastWordWithCaret({ text }: { text: string }) {
  const i = text.lastIndexOf(' ');
  const head = i >= 0 ? text.slice(0, i + 1) : '';
  const tail = i >= 0 ? text.slice(i + 1) : text;
  return (
    <>
      {head}
      <span className="nowrap">
        {tail}
        <span className="caret" aria-hidden="true" />
      </span>
    </>
  );
}

export function Marquee() {
  const { t } = useI18n();
  const words = [...t.marquee, ...t.marquee];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {[0, 1].map((k) => (
          <div className="marquee__group" key={k}>
            {words.map((w, i) => (
              <span key={i} className={i % 3 === 1 ? 'is-solid' : ''}>
                {w}
                <em>/</em>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
