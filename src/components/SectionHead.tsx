import type { ReactNode } from 'react';

/** Editorial section header: index number, kicker, big title, optional intro and aside. */
export function SectionHead({
  index,
  kicker,
  title,
  intro,
  id,
  aside,
  className = '',
}: {
  index: string;
  kicker: string;
  title: string;
  intro?: string;
  id: string;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <header className={`shead ${className}`} data-reveal>
      <div className="shead__meta">
        <span className="shead__index">{index}</span>
        <span className="shead__kicker">{kicker}</span>
      </div>
      <h2 className="shead__title" id={`${id}-title`}>
        {title}
      </h2>
      {intro && <p className="shead__intro">{intro}</p>}
      {aside}
    </header>
  );
}
