import { useEffect } from 'react';

/**
 * Adds `.is-in` to every `[data-reveal]` element when it scrolls into view.
 * Content is visible by default; the hidden start state only applies when
 * `html.js-reveal` is set, so nothing is lost without IntersectionObserver.
 */
export function useReveal(deps: unknown[]) {
  useEffect(() => {
    const root = document.documentElement;
    if (!('IntersectionObserver' in window)) return;
    root.classList.add('js-reveal');

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    document.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
