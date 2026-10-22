/**
 * Command parser for the SIMULATED terminal.
 * Pure function: it only maps known command names to canned, localized text.
 * No eval, no shell, no network, no access to the visitor's system.
 */
import type { Dict } from '../i18n/translations';
import type { Lang } from '../i18n/types';
import { LANG_META } from '../i18n/types';
import { FOCUS } from '../data/focus';
import { PROJECTS } from '../data/projects';
import { SERVICES } from '../data/services';
import { ARTICLES } from '../content/articles';
import { SITE, SOCIALS } from '../data/site';

export const COMMANDS = [
  'help',
  'about',
  'whoami',
  'skills',
  'projects',
  'services',
  'learn',
  'contact',
  'date',
  'clear',
] as const;
export type CommandName = (typeof COMMANDS)[number];

export interface TLine {
  kind: 'in' | 'out' | 'head' | 'err' | 'muted' | 'link';
  text: string;
  href?: string;
  external?: boolean;
}

export type TResult = { type: 'clear' } | { type: 'lines'; lines: TLine[] };

const MAX_INPUT = 200;

export function runCommand(rawInput: string, t: Dict, lang: Lang): TResult {
  const input = rawInput.slice(0, MAX_INPUT).trim();
  const echo: TLine = { kind: 'in', text: input };
  if (!input) return { type: 'lines', lines: [echo] };

  const name = input.split(/\s+/)[0].toLowerCase();
  const out = (lines: TLine[]): TResult => ({ type: 'lines', lines: [echo, ...lines] });
  const T = t.terminal;

  switch (name) {
    case 'help': {
      const width = Math.max(...COMMANDS.map((c) => c.length)) + 3;
      return out([
        { kind: 'head', text: T.helpHeader },
        ...COMMANDS.map((c) => ({ kind: 'out' as const, text: `  ${c.padEnd(width)}${T.commands[c]}` })),
      ]);
    }
    case 'about':
      return out(T.about.map((text) => ({ kind: 'out' as const, text })));
    case 'whoami':
      return out([{ kind: 'out', text: T.whoami }]);
    case 'skills':
      return out([
        { kind: 'head', text: T.skillsHeader },
        ...FOCUS.map((f) => ({ kind: 'out' as const, text: `  - ${f.title[lang]}` })),
      ]);
    case 'projects':
      return out([
        { kind: 'head', text: T.projectsHeader },
        ...PROJECTS.map((p) => ({
          kind: 'out' as const,
          text: `  [${t.projects.status[p.status]}] ${p.name} — ${p.summary[lang]}`,
        })),
      ]);
    case 'services':
      return out([
        { kind: 'head', text: T.servicesHeader },
        ...SERVICES.map((s) => ({ kind: 'out' as const, text: `  - ${s.title[lang]}` })),
        { kind: 'muted', text: T.servicesNote },
      ]);
    case 'learn':
      return out([
        { kind: 'head', text: T.learnHeader },
        ...ARTICLES.map((a, i) => ({
          kind: 'link' as const,
          text: `  ${String(i + 1).padStart(2, '0')}  ${a.i18n[lang].title}`,
          href: `#learn/${a.slug}`,
        })),
      ]);
    case 'contact':
      return out([
        { kind: 'head', text: T.contactHeader },
        ...SOCIALS.map((s) => ({
          kind: 'link' as const,
          text: `  ${s.name.padEnd(10)}${SITE.links[s.id]}`,
          href: SITE.links[s.id],
          external: true,
        })),
      ]);
    case 'date':
      return out([
        {
          kind: 'out',
          text: new Date().toLocaleString(LANG_META[lang].locale, { dateStyle: 'full', timeStyle: 'medium' }),
        },
      ]);
    case 'clear':
    case 'cls':
      return { type: 'clear' };
    case 'sudo':
    case 'su':
      return out([{ kind: 'err', text: T.sudo }]);
    default:
      return out([{ kind: 'err', text: T.notFound(name.slice(0, 40)) }]);
  }
}

/** Tab completion: returns the single matching command, or null. */
export function complete(prefix: string): string | null {
  const p = prefix.trim().toLowerCase();
  if (!p) return null;
  const hits = COMMANDS.filter((c) => c.startsWith(p));
  return hits.length === 1 ? hits[0] : null;
}
