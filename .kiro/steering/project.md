---
inclusion: always
---

# Project Steering

**Language rule:** Think in English internally. Always respond to the user in Japanese.

## Commands

```bash
npm run dev          # Dev server (http://localhost:3000)
npm run build        # Production build (next build --turbopack)
npm run lint         # ESLint + Prettier check
npm test             # Unit/component tests (Vitest)
npm run test:e2e     # E2E tests (Playwright, requires build)
```

## Architecture

Next.js 16 App Router + Velite MDX + Tailwind CSS v4

```
content/{posts,tils,pages}/{en,ja}/ → MDX content
content/{categories,series}/        → YAML definitions
src/app/[locale]/                   → Pages (all under locale prefix)
.velite/                            → Generated (do not edit)
```

**Path aliases:** `@/*` → `./src/*`, `#site/content` → `./.velite`

**Project-specific:** No external i18n lib (custom TS dictionaries). Tailwind v4 theme tokens: `rgb(var(--foreground))`

**OG images:** Blog posts and TILs auto-generate OG images via `opengraph-image.tsx` (Next.js file-based convention). Do NOT suggest adding `openGraph.images` in `generateMetadata` for these pages.

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
- **Internal links** — Posts use `/{locale}/blog/{YYYY}/{MM}/{DD}/{slug}`, TILs use `/{locale}/til/{YYYY}/{MM}/{DD}/{slug}`. NEVER use `/{locale}/posts/{slug}` or `/{locale}/tils/{slug}`. Get dates from the target's frontmatter `date` field.
- **Branch rule** — NEVER commit code directly to main. Code changes (src/, __tests__/, config, etc.) MUST go through a feature branch. Only `content/` changes may be committed directly to main.

## Git Workflow

- Branch prefixes: `feat/`, `fix/`, `test/`, `refactor/`, `chore/`, `docs/`
- Commit prefixes: `feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `chore:`
- Pre-merge validation → `/deploying-app`
