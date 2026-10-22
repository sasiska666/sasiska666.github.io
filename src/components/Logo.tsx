/**
 * Original B1t_g0r1lla monogram: a faceted gorilla head (crest, heavy brow, muzzle).
 * Same geometry as public/favicon.svg. `fg` = shape colour, `bg` = cut-out colour.
 */
export function LogoMark({
  size = 32,
  fg = 'var(--accent)',
  bg = 'var(--bg)',
  title,
  className,
}: {
  size?: number;
  fg?: string;
  bg?: string;
  title?: string;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path fill={fg} d="M25 4H39L50 11 54 23 60 32 56 45 49 56 38 62H26L15 56 8 45 4 32 10 23 14 11Z" />
      <path fill={bg} d="M13 26 30 28 32 31 34 28 51 26 47 35 36 35 32 33 28 35 17 35Z" />
      <path fill={fg} d="M20 30H27L26 32.5H21ZM44 30H37L38 32.5H43Z" />
      <path fill={bg} d="M19 39H45L52 48 45 58H19L12 48Z" />
      <path fill={fg} d="M22 42H42L47 48 42 55H22L17 48Z" />
      <path fill={bg} d="M25 44H30L29 47.5H26ZM34 44H39L38 47.5H35ZM23 51H41L40 53H24Z" />
    </svg>
  );
}

/** Wordmark with the digit-substitutions highlighted: B[1]t_g[0]r[1]lla */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={`wordmark ${className ?? ''}`} translate="no">
      B<b>1</b>t<i>_</i>g<b>0</b>r<b>1</b>lla
    </span>
  );
}
