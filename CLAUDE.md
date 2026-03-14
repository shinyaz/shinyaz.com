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

- `/writing-posts` — Blog post writing guide & creation
- `/writing-tils` — TIL writing guide & creation
- `/fixing-lint` — Fix linting errors
- `/syncing-i18n` — Check bilingual content
- `/debugging-build` — Troubleshoot builds
- `/running-tests` — Run appropriate tests
- `/adding-mdx-component` — Add MDX component
- `/writing-pages` — Static page writing guide & creation
- `/deploying-app` — Pre-deployment full validation pass
- `/syncing-agent-config` — Sync config between Claude Code & Kiro
- `/creating-skill` — Create new agent skill
- `/optimizing-agent-instructions` — Analyze and optimize CLAUDE.md and skills

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
- **Build must pass** — No warnings allowed. Build fails → `/debugging-build`
- **Bilingual parity** — ja/en features work equally. Drift check → `/syncing-i18n`
- **Japanese style** — だ/である体 for all blog posts (not ですます体)
- **Tags** — lowercase, hyphenated (`nextjs` not `Next.js`)
- **Lint clean** — Commit前に `/fixing-lint` でエラーゼロを確認
- **Test clean** — コード変更時は既存テストの更新も行い `npm test` パスを確認
- **Content writing** — Posts → `/writing-posts`, TILs → `/writing-tils`, Pages → `/writing-pages`

## Git Workflow

- Feature branches for code: `feat/`, `fix/`
- Direct to main for `content/` only
- Commit prefixes: `feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `chore:`
- Pre-merge validation → `/deploying-app`
