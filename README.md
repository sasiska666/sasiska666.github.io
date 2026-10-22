# B1t_g0r1lla — personal site

Static, multilingual (RU / EN / 中文) personal website for **B1t_g0r1lla** — a junior cybersecurity & development enthusiast.
React + TypeScript + Vite. No backend, no database, no trackers.

```
LEARN SYSTEMS. BUILD TOOLS. STAY CURIOUS.
```

Live: **https://sasiska666.github.io**

## Repository layout

| Path | What it is |
| --- | --- |
| `source/` | The site's source code (React + TypeScript + Vite). **Edit here.** |
| repository root (`index.html`, `assets/`, images) | The built site that GitHub Pages serves. Generated — don't edit by hand. |
| `.github/workflows/build.yml` | Rebuilds the site when anything in `source/` changes and commits the result to the root. |

So the whole workflow is: change something in `source/`, commit, push. About a minute later the site is updated.

## Run locally

Requires Node.js 20.19+ (or 22.12+).

```bash
cd source
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + build into source/dist/
```

## Where to edit things

| What | File |
| --- | --- |
| All interface text (3 languages) | `source/src/i18n/translations.ts` |
| Social links, handle, nav sections | `source/src/data/site.ts` |
| CURRENT FOCUS topics | `source/src/data/focus.ts` |
| Projects (status, description, tags, links) | `source/src/data/projects.ts` |
| Services | `source/src/data/services.ts` |
| Toolbox (status: `learning` / `exploring` / `used`) | `source/src/data/tools.ts` |
| Junior Survival Kit | `source/src/data/survivalKit.ts` |
| Learning hub articles | `source/src/content/articles/*.ts` (register new ones in `index.ts`) |
| Colours, fonts, spacing | `source/src/styles/tokens.css` |
| Logo / favicon | `source/src/components/Logo.tsx`, `source/public/favicon.svg` |

Every content field is typed as `{ ru, en, zh }`, so TypeScript reports a missing translation at build time.
`translations.ts` uses the Russian dictionary as the reference shape — `en` and `zh` must have exactly the same keys.

### Adding an article

1. Copy an existing file in `source/src/content/articles/`, change `slug`, `category`, `minutes`, `tags`, `related`, `docs`.
2. Write `ru`, `en` and `zh` bodies. Blocks: `h`, `p`, `list`, `code`, `table`, `note`; wrap inline code in backticks.
3. Add it to the `ARTICLES` array in `source/src/content/articles/index.ts`.
   The article is then reachable at `#learn/<slug>`.

## How it works

- **i18n** — `I18nProvider` keeps the current language, stores it in `localStorage` (`b1t.lang`) when available,
  updates `<html lang>`, the document title and meta description. Default language: Russian.
  Switching language never changes the URL, so the current section or article stays open.
- **Routing** — hash based: `#about`, `#projects`, `#learn`, `#kit`, `#tools`, `#terminal`, `#services`, `#contact`,
  and `#learn/<slug>` for shareable article links.
- **Terminal** — a pure simulation (`source/src/utils/terminal.ts`): a fixed list of commands mapped to canned, localized
  text. No `eval`, no shell, no network, nothing is sent anywhere.
- **Hero diagram** — fictional demo network in a private address range; it reads nothing from the visitor's system.
- **Fonts** — loaded from Google Fonts (Geologica, Inter, JetBrains Mono, Noto Sans SC) with system fallbacks.
  For maximum privacy you can self-host them: `npm i @fontsource-variable/geologica @fontsource/inter
  @fontsource/jetbrains-mono @fontsource/noto-sans-sc`, import them in `source/src/main.tsx`, and remove the
  `<link>` tags from `source/index.html`.
- **Accessibility** — semantic landmarks, skip link, keyboard-operable controls, visible focus, `aria-live` for
  search results / terminal / copy feedback, `prefers-reduced-motion` support (animations stop, content stays).

## Honesty rules baked into the content

- Project statuses are real: *concept* is not working software.
- Toolbox labels describe familiarity, never mastery.
- Services are scoped for a junior; security work only with explicit authorization and an agreed scope.
- No invented names, clients, prices, testimonials, certifications or contact details.
