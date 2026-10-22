import { useState } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import { SectionHead } from '../components/SectionHead';
import { TOOLS } from '../data/tools';
import { Icon } from '../components/Icon';

export function Toolbox() {
  const { t, pick } = useI18n();
  const [activeId, setActiveId] = useState(TOOLS[0].id);
  const tool = TOOLS.find((x) => x.id === activeId) ?? TOOLS[0];
  const n = TOOLS.indexOf(tool) + 1;

  return (
    <section id="tools" className="section tools" aria-labelledby="tools-title">
      <div className="wrap">
        <SectionHead id="tools" index="05" kicker={t.tools.kicker} title={t.tools.title} intro={t.tools.intro} />

        <div className="tools__grid" data-reveal>
          <ul className="ptable" aria-label={t.tools.gridLabel}>
            {TOOLS.map((x, i) => (
              <li key={x.id}>
                <button
                  type="button"
                  className={`element ${x.id === activeId ? 'is-active' : ''}`}
                  aria-pressed={x.id === activeId}
                  aria-controls="tool-detail"
                  onClick={() => setActiveId(x.id)}
                >
                  <span className="element__n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="element__sym" translate="no">
                    {x.symbol}
                  </span>
                  <span className="element__name" translate="no">
                    {x.name}
                  </span>
                  <span className={`element__status status-dot status-dot--${x.status}`} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>

          <div id="tool-detail" className="tdetail" aria-live="polite" key={tool.id}>
            <div className="tdetail__big" aria-hidden="true">
              <span className="tdetail__n">{String(n).padStart(2, '0')}</span>
              <span className="tdetail__sym" translate="no">
                {tool.symbol}
              </span>
            </div>
            <h3 className="tdetail__name" translate="no">
              {tool.name}
            </h3>
            <dl className="tdetail__meta">
              <div>
                <dt>{t.tools.category}</dt>
                <dd>{t.tools.categories[tool.category]}</dd>
              </div>
              <div>
                <dt>{t.tools.status_label}</dt>
                <dd>
                  <span className={`status status--tool-${tool.status}`}>{t.tools.status[tool.status]}</span>
                </dd>
              </div>
            </dl>
            <p className="tdetail__text">{pick(tool.text)}</p>
            <a className="btn btn--ghost btn--sm" href={tool.docs} target="_blank" rel="noopener noreferrer">
              <Icon name="book" size={16} />
              {t.tools.docs}
              <Icon name="arrowUpRight" size={14} />
              <span className="sr-only">{t.a11y.newTab}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
