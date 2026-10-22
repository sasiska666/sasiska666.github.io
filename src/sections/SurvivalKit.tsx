import { useState } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import { SectionHead } from '../components/SectionHead';
import { KIT, KIT_GROUPS, type KitGroup } from '../data/survivalKit';
import { RichText } from '../components/RichText';
import { CopyButton } from '../components/CopyButton';
import { Icon } from '../components/Icon';

type Filter = 'all' | KitGroup;

export function SurvivalKit() {
  const { t, pick } = useI18n();
  const [filter, setFilter] = useState<Filter>('all');
  const items = KIT.filter((k) => filter === 'all' || k.groups.includes(filter));

  return (
    <section id="kit" className="section kit" aria-labelledby="kit-title">
      <div className="wrap">
        <SectionHead
          id="kit"
          index="04"
          kicker={t.kit.kicker}
          title={t.kit.title}
          intro={t.kit.intro}
          className="kit__head"
        />

        <div className="chips kit__chips" role="group" aria-label={t.kit.filtersLabel} data-reveal>
          {(['all', ...KIT_GROUPS] as Filter[]).map((g) => (
            <button key={g} type="button" className="chip" aria-pressed={filter === g} onClick={() => setFilter(g)}>
              {t.kit.groups[g]}
              <span className="chip__count">
                {g === 'all' ? KIT.length : KIT.filter((k) => k.groups.includes(g)).length}
              </span>
            </button>
          ))}
        </div>

        <div className="kit__grid">
          {items.map((k) => {
            const points = k.points ? pick(k.points) : null;
            const ListTag = k.ordered ? 'ol' : 'ul';
            return (
              <article key={k.id} className="kcard">
                <div className="kcard__groups">
                  {k.groups.map((g) => (
                    <span key={g}>{t.kit.groups[g]}</span>
                  ))}
                </div>
                <h3 className="kcard__title">{pick(k.title)}</h3>
                <p className="kcard__text">
                  <RichText text={pick(k.text)} />
                </p>

                {k.commands && (
                  <ul className="kcmds">
                    {k.commands.map((c) => (
                      <li key={c.cmd}>
                        <span className="kcmds__os">
                          {c.os.map((o) => (
                            <span key={o} className={`os os--${o}`}>
                              {t.kit.os[o]}
                            </span>
                          ))}
                        </span>
                        <code translate="no">
                          <span aria-hidden="true">{c.os.includes('windows') && c.os.length === 1 ? '> ' : '$ '}</span>
                          {c.cmd}
                        </code>
                        <CopyButton text={c.cmd} label={`${t.copy.code}: ${c.cmd}`} />
                      </li>
                    ))}
                  </ul>
                )}

                {k.pairs && (
                  <dl className="kpairs">
                    {k.pairs.map((p) => (
                      <div key={p.k}>
                        <dt translate="no">{p.k}</dt>
                        <dd>{pick(p.v)}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                {points && (
                  <ListTag className={k.ordered ? 'kpoints kpoints--ol' : 'kpoints'}>
                    {points.map((p, i) => (
                      <li key={i}>
                        <RichText text={p} />
                      </li>
                    ))}
                  </ListTag>
                )}

                {k.links && (
                  <ul className="klinks">
                    {k.links.map((l) => (
                      <li key={l.url}>
                        <a href={l.url} target="_blank" rel="noopener noreferrer">
                          <span translate="no">{l.label}</span>
                          <Icon name="arrowUpRight" size={14} />
                          <span className="sr-only">{t.a11y.newTab}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}

                {k.warning && (
                  <p className="kwarn">
                    <Icon name="alert" size={16} />
                    <span>
                      <b>{t.kit.warning}:</b> <RichText text={pick(k.warning)} />
                    </span>
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
