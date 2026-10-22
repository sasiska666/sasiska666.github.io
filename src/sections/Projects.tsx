import { useState } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import { SectionHead } from '../components/SectionHead';
import { PROJECTS } from '../data/projects';
import { ProjectCover } from '../components/ProjectCover';
import { Icon } from '../components/Icon';
import { SITE } from '../data/site';

export function Projects() {
  const { t, pick } = useI18n();
  const [activeId, setActiveId] = useState(PROJECTS[0].id);
  const p = PROJECTS.find((x) => x.id === activeId) ?? PROJECTS[0];

  return (
    <section id="projects" className="section projects" aria-labelledby="projects-title">
      <div className="wrap">
        <SectionHead
          id="projects"
          index="02"
          kicker={t.projects.kicker}
          title={t.projects.title}
          intro={t.projects.intro}
        />

        <div className="projects__grid" data-reveal>
          <ul className="plist" aria-label={t.projects.listLabel}>
            {PROJECTS.map((x, i) => (
              <li key={x.id}>
                <button
                  type="button"
                  className={`plist__item ${x.id === activeId ? 'is-active' : ''}`}
                  aria-pressed={x.id === activeId}
                  aria-controls="project-detail"
                  onClick={() => setActiveId(x.id)}
                >
                  <span className="plist__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="plist__name" translate="no">
                    {x.name}
                  </span>
                  <span className={`status status--${x.status}`}>{t.projects.status[x.status]}</span>
                  <span className="plist__sum">{pick(x.summary)}</span>
                </button>
              </li>
            ))}
          </ul>

          <article id="project-detail" className="pdetail" aria-live="polite" key={p.id}>
            <div className="pdetail__cover">
              <ProjectCover seed={p.seed} status={p.status} label={`${t.projects.visualAria}: ${p.name}`} />
              <span className="pdetail__file" translate="no" aria-hidden="true">
                /projects/{p.id}
              </span>
            </div>
            <div className="pdetail__body">
              <div className="pdetail__status">
                <span className={`status status--${p.status}`}>{t.projects.status[p.status]}</span>
                <span>{t.projects.statusHint[p.status]}</span>
              </div>
              <h3 className="pdetail__name" translate="no">
                {p.name}
              </h3>
              <p className="pdetail__summary">{pick(p.summary)}</p>
              <div className="pdetail__details">
                <h4 className="label">{t.projects.details}</h4>
                {pick(p.details).map((d, i) => (
                  <p key={i}>{d}</p>
                ))}
              </div>
              <div className="pdetail__meta">
                <div>
                  <h4 className="label">{t.projects.tags}</h4>
                  <ul className="tags">
                    {p.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="label">{t.projects.links}</h4>
                  {p.links.length > 0 ? (
                    <ul className="plinks">
                      {p.links.map((l) => (
                        <li key={l.url}>
                          <a href={l.url} target="_blank" rel="noopener noreferrer">
                            {l.label} <Icon name="arrowUpRight" size={14} />
                            <span className="sr-only">{t.a11y.newTab}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="muted">{t.projects.noLinks}</p>
                  )}
                </div>
              </div>
            </div>
          </article>
        </div>

        <a className="projects__gh" href={SITE.links.github} target="_blank" rel="noopener noreferrer" data-reveal>
          <Icon name="github" size={20} />
          <span>{t.projects.github}</span>
          <span className="projects__gh-url" translate="no">
            github.com/sasiska666
          </span>
          <Icon name="arrowUpRight" size={20} />
          <span className="sr-only">{t.a11y.newTab}</span>
        </a>
      </div>
    </section>
  );
}
