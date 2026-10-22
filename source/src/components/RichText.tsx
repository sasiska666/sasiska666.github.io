import { Fragment } from 'react';

/** Renders text with `inline code` segments (backticks). No HTML injection. */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('`') && p.endsWith('`') && p.length > 2 ? (
          <code key={i} className="ic" translate="no">
            {p.slice(1, -1)}
          </code>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  );
}

/** Plain-text version for search indexes and clipboard output. */
export const stripTicks = (text: string) => text.replace(/`/g, '');
