import { useState } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import { SectionHead } from '../components/SectionHead';
import { FOCUS } from '../data/focus';
import { Icon } from '../components/Icon';

export function About() {
  const { t, pick } = useI18n();
  const [open, setOpen] = useState<string | null>(FOCUS[0]?.id ?? null);

  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="wrap about__grid">
        <SectionHead id="about" index="01" kicker={t.about.kicker} title={t.about.title} className="about__head" />

        <div className="about__body">
          <p className="about__lead" data-reveal>
            {t.about.lead}
          </p>

          <div className="about__cols">
            <div className="focus" data-reveal>
              <div className="focus__head">
                <h3 className="label">{t.about.focusTitle}</h3>
                <p className="focus__note">{t.about.focusNote}</p>
              </div>
              <ul className="focus__list">
                {FOCUS.map((f, i) => {
                  const isOpen = open === f.id;
                  return (
                    <li key={f.id} className={isOpen ? 'is-open' : ''}>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`focus-${f.id}`}
                        onClick={() => setOpen(isOpen ? null : f.id)}
                      >
                        <span className="focus__num">{String(i + 1).padStart(2, '0')}</span>
                        <span className="focus__title">{pick(f.title)}</span>
                        <Icon name={isOpen ? 'minus' : 'plus'} size={16} />
                      </button>
                      <p id={`focus-${f.id}`} className="focus__detail" hidden={!isOpen}>
                        {pick(f.detail)}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="principles" data-reveal>
              <h3 className="label">{t.about.principlesTitle}</h3>
              <ol>
                {t.about.principles.map((p, i) => (
                  <li key={i}>
                    <span className="principles__mark" aria-hidden="true">
                      {['//', '>>', '::'][i] ?? '--'}
                    </span>
                    <div>
                      <strong>{p.t}</strong>
                      <p>{p.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
