import { useEffect, useState } from 'react';
import { SECTIONS, type SectionId } from '../data/site';

/** Tracks which page section is currently in the middle of the viewport. */
export function useActiveSection(enabled: boolean): SectionId {
  const [active, setActive] = useState<SectionId>('home');

  useEffect(() => {
    if (!enabled || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id as SectionId);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [enabled]);

  return active;
}
