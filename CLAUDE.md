# CLAUDE.md

**Language rule:** Think in English internally. Always respond to the user in Japanese.

## Commands

```bash
npm run dev          # Dev server (http://localhost:3000)
npm run build        # Production build (next build --turbopack)
npm start            # Start production server
npm run lint         # ESLint + Prettier check
npm test             # Unit/component tests (Vitest)
npm run test:e2e     # E2E tests (Playwright, requires build)
```

## Skills

Use `/skill-name` for common tasks:
- `/new-post` — Create blog post
- `/fix-lint` — Fix linting errors
- `/sync-i18n` — Check bilingual content
- `/debug-build` — Troubleshoot builds
- `/run-tests` — Run appropriate tests
- `/add-mdx-component` — Add MDX component

## Architecture

Next.js 16 App Router + Velite MDX + Tailwind CSS v4

```
content/{posts,tils,pages}/{en,ja}/ → MDX content
src/app/[locale]/                   → Pages (all under locale prefix)
.velite/                            → Generated (do not edit)
```

**Path aliases:**
- `@/*` → `./src/*`
- `#site/content` → `./.velite`

## Critical Rules

- **Server Components by default** — `"use client"` only for interactivity
- **TypeScript strict** — No `any` without justification
- **Tailwind only** — No custom CSS
- **Build must pass** — No warnings allowed
- **Bilingual parity** — ja/en features work equally
- **Tags** — lowercase, hyphenated (`nextjs` not `Next.js`)

## Git Workflow

- Feature branches for code: `feat/`, `fix/`
- Direct to main for `content/` only
- Commit prefixes: `feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `chore:`

## Project-Specific

- **No external i18n lib** — Custom TypeScript dictionaries
- **Velite over CMS** — Version-controlled content
- **Tailwind v4** — Use theme tokens: `rgb(var(--foreground))`
- **Google Fonts errors** — `rm -rf .next` and retry (max 3x)