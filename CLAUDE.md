# CLAUDE.md

**Language rule:** Think in English internally. Always respond to the user in Japanese.

## Commands

```bash
npm run dev          # Dev server (http://localhost:3000)
npm run build        # Production build (next build --turbopack)
npm run lint         # ESLint + Prettier check
npm test             # Unit/component tests (Vitest)
npm run test:e2e     # E2E tests (Playwright, requires build)
```

## Skills

- `/post-guide` — Blog post writing guide & creation
- `/til-guide` — TIL writing guide & creation
- `/fix-lint` — Fix linting errors
- `/sync-i18n` — Check bilingual content
- `/debug-build` — Troubleshoot builds
- `/run-tests` — Run appropriate tests
- `/add-mdx-component` — Add MDX component
- `/page-guide` — Static page writing guide & creation
- `/deploy-checklist` — Pre-deployment full validation pass
- `/sync-agent-config` — Sync config between Claude Code & Kiro
- `/create-skill` — Create new agent skill
- `/analyzing-agent-instructions` — Analyze CLAUDE.md and skills quality
- `/optimizing-agent-instructions` — Optimize CLAUDE.md and skills

## Architecture

Next.js 16 App Router + Velite MDX + Tailwind CSS v4

```
content/{posts,tils,pages}/{en,ja}/ → MDX content
src/app/[locale]/                   → Pages (all under locale prefix)
.velite/                            → Generated (do not edit)
```

**Path aliases:** `@/*` → `./src/*`, `#site/content` → `./.velite`

**Project-specific:** No external i18n lib (custom TS dictionaries). Tailwind v4 theme tokens: `rgb(var(--foreground))`

## Critical Rules

- **Server Components by default** — `"use client"` only for interactivity
- **TypeScript strict** — No `any` without justification
- **Tailwind only** — No custom CSS
- **Build must pass** — No warnings allowed
- **Bilingual parity** — ja/en features work equally
- **Japanese style** — だ/である体 for all blog posts (not ですます体)
- **Tags** — lowercase, hyphenated (`nextjs` not `Next.js`)

## Git Workflow

- Feature branches for code: `feat/`, `fix/`
- Direct to main for `content/` only
- Commit prefixes: `feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `chore:`
