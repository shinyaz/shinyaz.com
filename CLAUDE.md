# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**Language rule:** Think in English internally. Always respond to the user in Japanese.

## Quick Reference

### Commands

```bash
npm run dev          # Dev server (http://localhost:3000)
npm run build        # Production build (next build --turbopack)
npm start            # Start production server
npm run lint         # ESLint + Prettier check
npm test             # Unit/component tests (Vitest)
npm run test:e2e     # E2E tests (Playwright, requires build)
```

### Code Change Checklist

When modifying code, complete these steps in order:

1. **Run tests if applicable:**
   - `src/lib/` or `src/components/` changes → `npm test`
   - Routing, pages, or i18n changes → `npm run test:e2e`
   - Content-only changes → skip tests
2. **Lint:** `npm run lint` (fix all errors)
3. **Build:** `npm run build` (must succeed without warnings)
   - Network errors on Google Fonts? → `rm -rf .next` and retry (max 3x)
4. **Update docs:** Changes to architecture/commands → update README.md & README.ja.md

## Architecture

Bilingual (ja/en) personal tech blog built with Next.js 16 App Router, Velite for MDX processing, and full static generation.

### Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Framework** | Next.js 16 (App Router) | React framework with SSG support |
| **Content** | Velite + MDX | Static content generation from Markdown |
| **Styling** | Tailwind CSS v4 | Utility-first CSS with theme tokens |
| **i18n** | Custom implementation | TypeScript dictionaries, no external lib |
| **PWA** | @serwist/turbopack | Service worker with precaching |
| **Testing** | Vitest + Playwright | Unit/component + E2E tests |

### Content Pipeline

```
content/
├── posts/{en,ja}/*.mdx     → Blog posts with frontmatter
├── tils/{en,ja}/*.mdx      → TIL entries
├── pages/{en,ja}/*.mdx     → Static pages (About, etc.)
└── categories/*.yml        → Category metadata

↓ Velite build (prebuild step)

.velite/                     → Generated TypeScript modules
└── imported via #site/content alias in components
```

**Key behaviors:**
- Locale extracted from directory path (`posts/ja/hello` → locale: `"ja"`)
- Permalinks: `/{locale}/blog/{year}/{month}/{day}/{slug}`
- MDX pipeline: rehype-slug → remark-math → rehype-katex → rehype-pretty-code
- Runtime queries via `src/lib/posts.ts` helpers

### Routing & i18n

**URL structure:** All pages under `/[locale]/` prefix (no bare routes)

```
/ja/blog/2024/03/07/post-slug   → Japanese blog post
/en/til/discovery-slug           → English TIL entry
/ja/about                        → Japanese about page
/                                → Redirects based on Accept-Language
```

**Implementation:**
- `src/proxy.ts` — Locale detection and bare path redirects
- `src/lib/i18n.ts` — TypeScript dictionaries (`getDictionary(locale)`)
- Locale passed via props, not React context
- Supported locales: `ja`, `en`

### Styling System

**Tailwind CSS v4 with CSS-first configuration:**

```css
/* src/app/globals.css */
:root {
  --background: 255 255 255;  /* Light theme */
  --foreground: 10 10 10;
}

.dark {
  --background: 10 10 10;      /* Dark theme */
  --foreground: 250 250 250;
}

@theme inline {
  --color-background: rgb(var(--background));
  --color-foreground: rgb(var(--foreground));
}
```

**Key features:**
- Dark mode via `next-themes` (class strategy)
- Fonts: IBM Plex Sans/Mono (Latin), IBM Plex Sans JP (Japanese)
- MDX styling: Custom `.prose` classes (not @tailwindcss/typography)
- `cn()` utility for className merging (clsx + tailwind-merge)

### Path Aliases

```typescript
@/*           → ./src/*          // Application code
#site/content → ./.velite        // Generated content
```

### Component Strategy

**Server Components (default):**
- All pages and layouts
- Blog/TIL list and detail views
- Static content rendering

**Client Components (interactive only):**
- `ThemeToggle`, `ThemeProvider` — Dark mode switching
- `LanguageSwitcher` — Locale switching
- `SearchPageClient` — Client-side search
- `TableOfContents` — Scroll-synced navigation
- `SerwistProvider` — PWA registration

### Features

**RSS/Atom Feeds:**
- Routes: `/{locale}/feed.xml`, `/{locale}/atom.xml`
- Implementation: `src/lib/feed.ts` + route handlers
- 20 most recent posts per locale

**PWA Support:**
- Service worker: `src/app/sw.ts`
- Route handler: `/serwist/sw.js`
- Automatic precache manifest injection at build time

**Search:**
- Client-side search with Flexsearch
- Indexes built at runtime from content
- Searches across title, description, and content

## Testing

### Structure

```
__tests__/
├── __mocks__/velite.ts      # Mock Velite data
├── lib/                     # Unit tests for src/lib/
├── components/              # Component tests (mirrors src/components/)
│   ├── blog/
│   ├── layout/
│   ├── search/
│   ├── mdx/
│   ├── projects/
│   ├── theme/
│   └── common/
e2e/                         # Playwright E2E tests
├── vitest.config.mts        # Vitest config
└── playwright.config.ts     # Playwright config
```

### Test Conventions

- Mock `#site/content` → `__tests__/__mocks__/velite.ts`
- New functions in `src/lib/` → add tests in `__tests__/lib/`
- Component changes → add tests in `__tests__/components/<subdirectory>/`
- Page/routing changes → add E2E tests in `e2e/`
- Tests must be independent, fast, and deterministic
- Always test error cases

## Content Writing

### Common Conventions

**Frontmatter:**
- `title` — Specific and outcome-oriented
- `description` — 80–200 chars, conveys unique value
- `date` — YYYY-MM-DD format
- `published` — true/false
- `tags` — lowercase, hyphenated technology names

**Code blocks:**
```markdown
```typescript title="src/lib/example.ts"
// Code here
```

**Tags:** Use precise technology names (`nextjs`, `typescript`, `tailwindcss`) or established terms (`pwa`, `i18n`, `a11y`). Avoid generic terms.

### Blog Posts (`content/posts/{en,ja}/`)

**Goal:** Concrete, scannable, genuinely useful posts. A reader should understand the value from the title and first paragraph.

**Frontmatter additions:**
- `featured: false` — Reserve for major milestones only
- `categories: [programming]` — Single category in use

**Structure:**
1. **Hook** (1–2 paragraphs) — Start with the problem or outcome
2. **Body** — Logical sections with descriptive headings
3. **Closing** — Transferable insights in 3–4 bullets

**Article types:** Build log, Problem→Solution, Deep dive, Comparison, Migration, Lessons learned

**Voice:** First person ("I discovered"), share opinions, acknowledge limitations

**Length:** 800–1500 words (Japanese), 600–1200 words (English)

### TIL Entries (`content/tils/{en,ja}/`)

**Goal:** Capture "oh, I didn't know that!" moments. Quick to write, high value to read.

**Characteristics:**
- 100–300 words
- Single discovery focus
- No section headings needed
- 1–3 code blocks max

**Structure:**
1. Context (1–2 sentences)
2. The discovery (core content)
3. Brief takeaway (optional)

**Voice:** Casual, like a Slack message to a teammate

## Development Guidelines

### Project-Specific Practices

**This blog's patterns:**
- **Content-first development** — Features exist to enhance content, not vice versa
- **Progressive enhancement** — Core content readable without JavaScript
- **Bilingual parity** — Features must work equally well in both locales
- **Static-first** — Prefer build-time generation over runtime computation

### Git Workflow

**Code changes** (features, fixes, refactors):
```bash
git checkout -b feat/add-search  # Create feature branch
# Make changes
git push origin feat/add-search
gh pr create                      # Create PR
# Vercel creates preview deployment
# After review, merge to main
```

**Content changes** (blog posts, TILs, pages):
```bash
# Direct commits to main allowed for content/
git add content/posts/ja/new-post.mdx
git commit -m "docs: Add blog post about X"
git push origin main
```

**Commit conventions:**
- `feat:` — New features
- `fix:` — Bug fixes
- `docs:` — Documentation/content changes
- `test:` — Test additions/changes
- `refactor:` — Code restructuring
- `chore:` — Maintenance tasks

### Code Quality Standards

**TypeScript:**
- Strict mode enabled
- No `any` types without justification
- Prefer type inference over explicit types
- Use discriminated unions for state

**React/Next.js:**
- Server Components by default
- Client Components only for interactivity
- Avoid prop drilling — compose at the page level
- Use `loading.tsx` and `error.tsx` for better UX

**Styling:**
- Use Tailwind utilities, avoid custom CSS
- Consistent spacing scale (4, 8, 12, 16, 24, 32, 48, 64)
- Mobile-first responsive design
- Respect user's motion preferences

**Performance:**
- Images: Use Next.js `<Image>` with proper sizes
- Fonts: Subset and preload critical fonts
- Bundle: Lazy load heavy client components
- Cache: Use appropriate `Cache-Control` headers

### Error Handling

**User-facing errors:**
- Show helpful error messages, not stack traces
- Provide recovery actions when possible
- Log errors for debugging but don't expose internals

**Development errors:**
- Fix root causes, don't suppress warnings
- Treat console errors as bugs
- Keep dev and prod behavior consistent

### Accessibility

- Semantic HTML elements
- Proper heading hierarchy
- Alt text for images
- Keyboard navigation support
- ARIA labels where needed
- Color contrast compliance

### Security

**Content Security Policy (CSP):**
- Defined in `next.config.mjs`
- Allow only necessary external resources
- Use nonces for inline scripts

**Dependencies:**
- Regular security audits (`npm audit`)
- Update patches promptly
- Review new dependencies carefully

### Documentation

**Code comments:**
- Explain "why", not "what"
- Document complex algorithms
- Note workarounds with issue links

**README updates:**
- Keep both English and Japanese versions in sync
- Update when architecture changes
- Include setup instructions for new contributors

### Trade-offs & Decisions

**Documented trade-offs in this project:**
- **No external i18n library** — Simpler for two languages
- **Velite over CMS** — Developer-friendly, version-controlled content
- **Custom search** — Avoids external service dependency
- **Tailwind v4** — Early adoption for modern CSS features

When making new architectural decisions, document the reasoning in comments or this guide.
