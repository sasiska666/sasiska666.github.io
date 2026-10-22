import { useState } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import { LogoMark } from './Logo';
import { prefersReducedMotion } from '../hooks/useHashRoute';

/**
 * FIG.01 — a fictional home-lab topology. All names and addresses are made-up
 * demo data from a private range; nothing here reads or scans real systems.
 */
type Role = 'hub' | 'gateway' | 'workstation' | 'vm' | 'server' | 'sensor' | 'nas';
interface Node {
  id: string;
  x: number;
  y: number;
  addr: string;
  role: Role;
}

const NODES: Node[] = [
  { id: 'core', x: 260, y: 272, addr: '10.10.0.1', role: 'hub' },
  { id: 'gw-01', x: 432, y: 96, addr: '10.10.0.254', role: 'gateway' },
  { id: 'ws-ape', x: 92, y: 118, addr: '10.10.0.21', role: 'workstation' },
  { id: 'lab-vm', x: 66, y: 326, addr: '10.10.0.42', role: 'vm' },
  { id: 'lab-web', x: 448, y: 352, addr: '10.10.0.80', role: 'server' },
  { id: 'sensor', x: 318, y: 476, addr: '10.10.0.99', role: 'sensor' },
  { id: 'notes', x: 136, y: 486, addr: '10.10.0.12', role: 'nas' },
];

const EDGES: [string, string][] = [
  ['core', 'gw-01'],
  ['core', 'ws-ape'],
  ['core', 'lab-vm'],
  ['core', 'lab-web'],
  ['core', 'sensor'],
  ['core', 'notes'],
  ['ws-ape', 'gw-01'],
  ['lab-vm', 'notes'],
  ['lab-web', 'sensor'],
  ['lab-web', 'gw-01'],
];

const byId = Object.fromEntries(NODES.map((n) => [n.id, n]));
const edgePath = ([a, b]: [string, string]) => `M${byId[a].x} ${byId[a].y}L${byId[b].x} ${byId[b].y}`;

/** Edges that carry animated "packets" and their durations. */
const PACKETS: { edge: number; dur: number; reverse?: boolean }[] = [
  { edge: 0, dur: 3.2 },
  { edge: 2, dur: 4.1, reverse: true },
  { edge: 3, dur: 3.6 },
  { edge: 6, dur: 5.2 },
  { edge: 4, dur: 2.8, reverse: true },
];

export function HeroVisual() {
  const { t } = useI18n();
  const [activeId, setActiveId] = useState<string>('core');
  const [motion] = useState(() => !prefersReducedMotion());
  const active = byId[activeId];

  return (
    <figure className="hv" aria-label={t.hero.figAria}>
      <div className="hv__bar">
        <span>{t.hero.fig}</span>
        <span className="hv__demo">
          <i aria-hidden="true" /> {t.hero.demo}
        </span>
      </div>

      <div className="hv__stage">
        <svg viewBox="0 0 520 560" className="hv__svg" role="group" aria-label={t.hero.figAria}>
          <defs>
            <pattern id="hv-grid" width="26" height="26" patternUnits="userSpaceOnUse">
              <path d="M26 0H0V26" fill="none" stroke="var(--line)" strokeWidth="1" />
            </pattern>
            <linearGradient id="hv-scan" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--accent)" stopOpacity="0" />
              <stop offset="1" stopColor="var(--accent)" stopOpacity=".1" />
            </linearGradient>
          </defs>
          <rect width="520" height="560" fill="url(#hv-grid)" opacity=".55" />

          {/* range rings around the hub */}
          <g className="hv__rings" aria-hidden="true">
            <circle cx="260" cy="272" r="92" />
            <circle cx="260" cy="272" r="168" />
            <circle cx="260" cy="272" r="244" />
          </g>

          <g aria-hidden="true">
            {EDGES.map((e, i) => {
              const hot = e[0] === activeId || e[1] === activeId;
              return <path key={i} id={`hv-e${i}`} d={edgePath(e)} className={`hv__edge ${hot ? 'is-hot' : ''}`} />;
            })}
          </g>

          {motion && (
            <g aria-hidden="true">
              {PACKETS.map((p, i) => (
                <rect key={i} width="6" height="6" x="-3" y="-3" className="hv__packet">
                  <animateMotion
                    dur={`${p.dur}s`}
                    repeatCount="indefinite"
                    keyPoints={p.reverse ? '1;0' : '0;1'}
                    keyTimes="0;1"
                    calcMode="linear"
                  >
                    <mpath href={`#hv-e${p.edge}`} />
                  </animateMotion>
                </rect>
              ))}
            </g>
          )}

          {NODES.map((n) => {
            const isActive = n.id === activeId;
            const label = `${n.id} · ${n.addr} · ${t.hero.roles[n.role]}`;
            return (
              <g
                key={n.id}
                className={`hv__node ${isActive ? 'is-active' : ''} ${n.role === 'hub' ? 'is-hub' : ''}`}
                transform={`translate(${n.x} ${n.y})`}
                tabIndex={0}
                role="button"
                aria-pressed={isActive}
                aria-label={label}
                onMouseEnter={() => setActiveId(n.id)}
                onFocus={() => setActiveId(n.id)}
                onClick={() => setActiveId(n.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveId(n.id);
                  }
                }}
              >
                {n.role === 'hub' ? (
                  <>
                    <rect x="-38" y="-38" width="76" height="76" className="hv__hubframe" />
                    <g transform="translate(-30 -30)">
                      <LogoMark size={60} bg="var(--bg)" />
                    </g>
                  </>
                ) : (
                  <>
                    <rect x="-16" y="-16" width="32" height="32" className="hv__hit" />
                    <rect x="-7" y="-7" width="14" height="14" className="hv__dot" />
                    <rect x="-13" y="-13" width="26" height="26" className="hv__halo" />
                  </>
                )}
                <text
                  x={n.role === 'hub' ? 46 : n.x > 400 ? -20 : 20}
                  y={n.role === 'hub' ? -30 : n.x > 400 ? 30 : 4}
                  textAnchor={n.role !== 'hub' && n.x > 400 ? 'end' : 'start'}
                  className="hv__label"
                >
                  {n.id}
                </text>
              </g>
            );
          })}

          {motion && (
            <rect className="hv__scan" x="0" y="-80" width="520" height="80" fill="url(#hv-scan)" aria-hidden="true" />
          )}
        </svg>
        <span className="hv__corner hv__corner--tl" aria-hidden="true" />
        <span className="hv__corner hv__corner--br" aria-hidden="true" />
      </div>

      <figcaption className="hv__readout" aria-live="polite">
        <span className="hv__prompt" aria-hidden="true">
          &gt;
        </span>
        <span>
          <b>{t.hero.fields.node}</b> {active.id}
        </span>
        <span>
          <b>{t.hero.fields.addr}</b> {active.addr}
        </span>
        <span>
          <b>{t.hero.fields.role}</b> {t.hero.roles[active.role]}
        </span>
        <span className="hv__hint">{t.hero.hint}</span>
      </figcaption>
    </figure>
  );
}
