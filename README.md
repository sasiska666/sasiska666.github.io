# B1t_g0r1lla — personal site

Static, multilingual (RU / EN / 中文) personal website for **B1t_g0r1lla** — a junior cybersecurity & development enthusiast.
React + TypeScript + Vite. No backend, no database, no trackers.

```
LEARN SYSTEMS. BUILD TOOLS. STAY CURIOUS.
```

## Run locally

Requires Node.js 20.19+ (or 22.12+).

```bash
npm install
npm run dev        # http://localhost:5173
```

Production build:

```bash
npm run build      # type-check + build into dist/
npm run preview    # serve dist/ locally to check the build
```

`dist/` contains only static HTML, CSS, JS and images. Asset paths are relative (`base: './'`), so the same build
works at a domain root or in a sub-folder.

## Deploy

**GitHub Pages (automatic).** Push the project to a GitHub repository, then in *Settings → Pages* set
*Source* to **GitHub Actions**. The workflow in `.github/workflows/deploy.yml` builds and publishes on every push to `main`.

**Netlify / Cloudflare Pages.** Build command `npm run build`, output directory `dist`. No redirects are needed —
routing uses the URL hash (`#learn/tcp-ip`), so every page works on static hosting.

**Manual.** Run `npm run build` and upload the contents of `dist/` to any static host.

After deploying, set an absolute URL for the social preview image in `index.html`
(`<meta property="og:image" content="https://your-domain/og-image.png">`) — some platforms ignore relative URLs.

## Where to edit things

| What | File |
| --- | --- |
| All interface text (3 languages) | `src/i18n/translations.ts` |
| Social links, handle, nav sections | `src/data/site.ts` |
| CURRENT FOCUS topics | `src/data/focus.ts` |
| Projects (status, description, tags, links) | `src/data/projects.ts` |
| Services | `src/data/services.ts` |
| Toolbox (status: `learning` / `exploring` / `used`) | `src/data/tools.ts` |
| Junior Survival Kit | `src/data/survivalKit.ts` |
| Learning hub articles | `src/content/articles/*.ts` (register new ones in `index.ts`) |
| Colours, fonts, spacing | `src/styles/tokens.css` |
| Logo / favicon | `src/components/Logo.tsx`, `public/favicon.svg` |

Every content field is typed as `{ ru, en, zh }`, so TypeScript reports a missing translation at build time.
`translations.ts` uses the Russian dictionary as the reference shape — `en` and `zh` must have exactly the same keys.

### Adding an article

1. Copy an existing file in `src/content/articles/`, change `slug`, `category`, `minutes`, `tags`, `related`, `docs`.
2. Write `ru`, `en` and `zh` bodies. Blocks: `h`, `p`, `list`, `code`, `table`, `note`; wrap inline code in backticks.
3. Add it to the `ARTICLES` array in `src/content/articles/index.ts`.
   The article is then reachable at `#learn/<slug>`.

## How it works

- **i18n** — `I18nProvider` keeps the current language, stores it in `localStorage` (`b1t.lang`) when available,
  updates `<html lang>`, the document title and meta description. Default language: Russian.
  Switching language never changes the URL, so the current section or article stays open.
- **Routing** — hash based: `#about`, `#projects`, `#learn`, `#kit`, `#tools`, `#terminal`, `#services`, `#contact`,
  and `#learn/<slug>` for shareable article links.
- **Terminal** — a pure simulation (`src/utils/terminal.ts`): a fixed list of commands mapped to canned, localized
  text. No `eval`, no shell, no network, nothing is sent anywhere.
- **Hero diagram** — fictional demo network in a private address range; it reads nothing from the visitor's system.
- **Fonts** — loaded from Google Fonts (Geologica, Inter, JetBrains Mono, Noto Sans SC) with system fallbacks.
  For maximum privacy you can self-host them: `npm i @fontsource-variable/geologica @fontsource/inter
  @fontsource/jetbrains-mono @fontsource/noto-sans-sc`, import them in `src/main.tsx`, and remove the
  `<link>` tags from `index.html`.
- **Accessibility** — semantic landmarks, skip link, keyboard-operable controls, visible focus, `aria-live` for
  search results / terminal / copy feedback, `prefers-reduced-motion` support (animations stop, content stays).

## Honesty rules baked into the content

- Project statuses are real: *concept* is not working software.
- Toolbox labels describe familiarity, never mastery.
- Services are scoped for a junior; security work only with explicit authorization and an agreed scope.
- No invented names, clients, prices, testimonials, certifications or contact details.
