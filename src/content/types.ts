import type { Lang } from '../i18n/types';

export type CategoryId = 'networking' | 'linux' | 'websec' | 'blueteam' | 'programming' | 'fundamentals';

export const CATEGORIES: CategoryId[] = ['networking', 'linux', 'websec', 'blueteam', 'programming', 'fundamentals'];

/**
 * Article content blocks. Text supports inline `code` with backticks.
 * Code blocks are never translated — keep commands identical across languages.
 */
export type Block =
  | { t: 'h'; text: string }
  | { t: 'p'; text: string }
  | { t: 'list'; items: string[]; ordered?: boolean }
  | { t: 'code'; code: string; lang?: string }
  | { t: 'table'; head: string[]; rows: string[][] }
  | { t: 'note'; text: string };

export interface ArticleBody {
  title: string;
  intro: string;
  body: Block[];
  example: Block[];
  takeaways: string[];
}

export interface Article {
  slug: string;
  category: CategoryId;
  minutes: number;
  /** Extra search keywords (any language). */
  tags: string[];
  related: string[];
  docs: { label: string; url: string }[];
  i18n: Record<Lang, ArticleBody>;
}
