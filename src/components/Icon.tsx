/**
 * Tiny in-house icon set (24×24, stroke-based, Lucide-compatible proportions).
 * Kept local to avoid an icon dependency; add paths here when you need more.
 */
const PATHS = {
  arrowUpRight: 'M7 17 17 7M8 7h9v9',
  arrowRight: 'M4 12h16M14 6l6 6-6 6',
  arrowLeft: 'M20 12H4M10 6l-6 6 6 6',
  arrowUp: 'M12 20V4M6 10l6-6 6 6',
  copy: 'M9 9h11v11H9zM5 15H4V4h11v1',
  check: 'M4 12.5 9.5 18 20 6',
  search: 'M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM20 20l-4.8-4.8',
  x: 'M6 6l12 12M18 6 6 18',
  menu: 'M3 7h18M3 12h18M3 17h12',
  terminal: 'M4 5h16v14H4zM8 10l2.5 2L8 14M12.5 14H16',
  alert: 'M12 3 2.5 20h19L12 3zM12 10v4.5M12 17.2v.3',
  link: 'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1',
  book: 'M4 4h6a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4zM20 4h-6a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h6z',
  github:
    'M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21',
  instagram: 'M3 3h18v18H3zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM17.5 6.5v.1',
  telegram: 'M21.5 3.5 2.5 11l7 2.5m12-10-4 17-8-7m12-10-12 10m0 0v6l3.5-3.5',
  globe:
    'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3z',
  shield: 'M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6l-8-3z',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
} as const;

export type IconName = keyof typeof PATHS;

export function Icon({ name, size = 18, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      focusable="false"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
