import type { Article, Block } from '../content/types';
import type { Lang } from '../i18n/types';

function blockText(b: Block): string {
  switch (b.t) {
    case 'h':
    case 'p':
    case 'note':
      return b.text;
    case 'list':
      return b.items.join(' ');
    case 'table':
      return [...b.head, ...b.rows.flat()].join(' ');
    case 'code':
      return '';
  }
}

/** Builds a lowercase search haystack for an article in one language. */
export function articleHaystack(a: Article, lang: Lang, categoryLabel: string): string {
  const c = a.i18n[lang];
  return [c.title, c.intro, categoryLabel, a.tags.join(' '), c.takeaways.join(' '), ...c.body.map(blockText)]
    .join(' ')
    .replace(/`/g, '')
    .toLowerCase();
}

/** Every whitespace-separated term must be present (AND search). */
export function matches(haystack: string, query: string): boolean {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  return terms.every((term) => haystack.includes(term));
}
