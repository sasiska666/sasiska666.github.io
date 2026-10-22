import { useI18n } from '../i18n/I18nProvider';
import { SectionHead } from '../components/SectionHead';
import { SITE, SOCIALS } from '../data/site';
import { Icon } from '../components/Icon';
import { CopyButton } from '../components/CopyButton';

export function Contact() {
  const { t } = useI18n();
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="wrap">
        <SectionHead
          id="contact"
          index="08"
          kicker={t.contact.kicker}
          title={t.contact.title}
          intro={t.contact.intro}
        />

        <div className="handle" data-reveal>
          <span className="handle__text" translate="no">
            {SITE.handle}
          </span>
          <CopyButton text={SITE.handle} label={t.contact.copyHandle} showLabel className="handle__copy" />
        </div>

        <ul className="socials" data-reveal>
          {SOCIALS.map((s, i) => (
            <li key={s.id}>
              <a className="social" href={SITE.links[s.id]} target="_blank" rel="noopener noreferrer">
                <span className="social__num">{String(i + 1).padStart(2, '0')}</span>
                <Icon name={s.id} size={26} className="social__icon" />
                <span className="social__name" translate="no">
                  {s.name}
                </span>
                <span className="social__role">{t.contact.roles[s.id]}</span>
                <span className="social__url" translate="no">
                  {s.display}
                </span>
                <span className="social__go">
                  <span className="sr-only">
                    {t.contact.open} {t.a11y.newTab}
                  </span>
                  <Icon name="arrowUpRight" size={26} />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
