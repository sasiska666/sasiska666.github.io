import { useI18n } from '../i18n/I18nProvider';
import { SectionHead } from '../components/SectionHead';
import { SERVICES } from '../data/services';
import { SITE } from '../data/site';
import { Icon } from '../components/Icon';

export function Services() {
  const { t, pick } = useI18n();
  return (
    <section id="services" className="section services" aria-labelledby="services-title">
      <div className="wrap services__grid">
        <div className="services__side">
          <SectionHead
            id="services"
            index="07"
            kicker={t.services.kicker}
            title={t.services.title}
            intro={t.services.intro}
          />
          <div className="services__box" data-reveal>
            <p className="services__disclaimer">
              <Icon name="shield" size={20} />
              <span>{t.services.disclaimer}</span>
            </p>
            <div className="services__not">
              <h3 className="label">{t.services.notTitle}</h3>
              <ul>
                {t.services.not.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <a className="btn btn--primary" href={SITE.links.telegram} target="_blank" rel="noopener noreferrer">
              <Icon name="telegram" size={18} />
              {t.services.cta}
              <span className="sr-only">{t.a11y.newTab}</span>
            </a>
          </div>
        </div>

        <ol className="slist" data-reveal>
          {SERVICES.map((s, i) => (
            <li key={s.id} className="slist__item">
              <span className="slist__num">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="slist__title">{pick(s.title)}</h3>
                <p className="slist__text">{pick(s.text)}</p>
              </div>
              <span className="slist__scope">{t.services.scope}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
