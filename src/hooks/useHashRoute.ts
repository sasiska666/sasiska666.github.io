import { useEffect, useState } from 'react';
import { SECTIONS, type SectionId } from '../data/site';

/**
 * Static-hosting friendly routing based on the URL fragment.
 *   #about            → scroll to a section
 *   #learn/tcp-ip     → open an article (shareable)
 * Language is NOT part of the URL, so switching it never changes the route.
 */
export type Route = { kind: 'section'; id: SectionId } | { kind: 'article'; slug: string };

export function parseHash(hash: string): Route {
  const raw = decodeURIComponent(hash.replace(/^#\/?/, '')).trim();
  if (raw.startsWith('learn/')) {
    const slug = raw.slice('learn/'.length).replace(/\/+$/, '');
    if (slug) return { kind: 'article', slug };
  }
  if ((SECTIONS as readonly string[]).includes(raw)) return { kind: 'section', id: raw as SectionId };
  return { kind: 'section', id: 'home' };
}

export const articleHref = (slug: string) => `#learn/${slug}`;

export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash));

  useEffect(() => {
    const onHash = () => setRoute(parseHash(window.location.hash));
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return route;
}

export function prefersReducedMotion(): boolean {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}
