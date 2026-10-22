/** Public brand identity. These are the only personal details the site shows. */
export const SITE = {
  brand: 'B1t_g0r1lla',
  handle: '@B1t_g0r1lla404',
  links: {
    github: 'https://github.com/sasiska666',
    instagram: 'https://www.instagram.com/pdqvxu/',
    telegram: 'https://t.me/B1t_g0r1lla404',
  },
} as const;

export type SocialId = keyof typeof SITE.links;

export const SOCIALS: { id: SocialId; name: string; display: string }[] = [
  { id: 'telegram', name: 'Telegram', display: 't.me/B1t_g0r1lla404' },
  { id: 'github', name: 'GitHub', display: 'github.com/sasiska666' },
  { id: 'instagram', name: 'Instagram', display: 'instagram.com/pdqvxu' },
];

/** Hash routes used by the navigation. Order = order of sections on the page. */
export const SECTIONS = [
  'home',
  'about',
  'projects',
  'learn',
  'kit',
  'tools',
  'terminal',
  'services',
  'contact',
] as const;
export type SectionId = (typeof SECTIONS)[number];

/** Sections shown in the top navigation. */
export const NAV_SECTIONS: SectionId[] = ['home', 'about', 'projects', 'learn', 'services', 'contact'];
