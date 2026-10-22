import { useEffect, useState } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import { NAV_SECTIONS, SECTIONS, type SectionId } from '../data/site';
import { LogoMark, Wordmark } from './Logo';
import { LangSwitch } from './LangSwitch';
import { Icon } from './Icon';

export function Nav({ active }: { active: SectionId | null }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on route change / Escape, and lock page scroll while it is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onHash = () => setOpen(false);
    document.body.classList.add('no-scroll');
    window.addEventListener('keydown', onKey);
    window.addEventListener('hashchange', onHash);
    return () => {
      document.body.classList.remove('no-scroll');
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('hashchange', onHash);
    };
  }, [open]);

  return (
    <>
      <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
        <div className="nav__inner">
          <a className="nav__brand" href="#home" aria-label={t.a11y.homeLink}>
            <LogoMark size={30} />
            <Wordmark />
          </a>

          <nav className="nav__links" aria-label={t.a11y.primaryNav}>
            <ul>
              {NAV_SECTIONS.map((id, i) => (
                <li key={id}>
                  <a href={`#${id}`} aria-current={active === id ? 'location' : undefined}>
                    <span className="nav__num">{String(i).padStart(2, '0')}</span>
                    {t.nav[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav__end">
            <LangSwitch />
            <button
              type="button"
              className="nav__burger"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
              onClick={() => setOpen((v) => !v)}
            >
              <Icon name={open ? 'x' : 'menu'} size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Rendered outside <header>: its backdrop-filter would otherwise trap this fixed overlay. */}
      <div id="mobile-menu" className="mnav" hidden={!open}>
        <nav aria-label={t.a11y.primaryNav}>
          <ol>
            {SECTIONS.map((id, i) => (
              <li key={id}>
                <a href={`#${id}`} onClick={() => setOpen(false)} aria-current={active === id ? 'location' : undefined}>
                  <span className="nav__num">{String(i).padStart(2, '0')}</span>
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </>
  );
}
