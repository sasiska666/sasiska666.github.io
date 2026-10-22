import { useEffect, useState } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import { SECTIONS, SITE, SOCIALS } from '../data/site';
import { LogoMark, Wordmark } from './Logo';
import { Icon } from './Icon';

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div className="footer__brand">
          <LogoMark size={44} title={t.a11y.logo} />
          <Wordmark />
          <p>{t.footer.tagline}</p>
        </div>
        <nav aria-label={t.footer.sections}>
          <p className="label">{t.footer.sections}</p>
          <ul>
            {SECTIONS.map((id) => (
              <li key={id}>
                <a href={`#${id}`}>{t.nav[id]}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="label">{t.footer.elsewhere}</p>
          <ul>
            {SOCIALS.map((s) => (
              <li key={s.id}>
                <a href={SITE.links[s.id]} target="_blank" rel="noopener noreferrer">
                  {s.name}
                  <Icon name="arrowUpRight" size={13} />
                  <span className="sr-only">{t.a11y.newTab}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="wrap footer__base">
        <span>
          © {new Date().getFullYear()} {SITE.brand} · {t.footer.note}
        </span>
        <span>{t.footer.privacy}</span>
        <span>{t.footer.stack}</span>
      </div>
    </footer>
  );
}

export function BackToTop() {
  const { t } = useI18n();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 1.2);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      type="button"
      className={`totop ${show ? 'is-visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0 })}
      aria-label={t.a11y.backToTop}
      title={t.a11y.backToTop}
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
    >
      <Icon name="arrowUp" size={18} />
    </button>
  );
}
