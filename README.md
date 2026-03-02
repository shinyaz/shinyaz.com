# shinyaz.com

[Japanese / 日本語](./README.ja.md)

A minimal, monochrome personal tech blog built with Next.js and MDX. Supports Japanese and English (i18n).

## Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org/) 16 (App Router) |
| Language | TypeScript 5 |
| Fonts | [IBM Plex](https://www.ibm.com/plex/) (Sans + Mono for Latin, Sans JP for Japanese) |
| Styling | Tailwind CSS v4 |
| Content | MDX via [Velite](https://velite.js.org/) |
| Code Highlighting | [Shiki](https://shiki.style/) + rehype-pretty-code (dual theme) |
| Heading Anchors | rehype-slug |
| Math Rendering | remark-math + rehype-katex |
| Dark Mode | [next-themes](https://github.com/pacocoursey/next-themes) (class-based) |
| PWA | [Serwist](https://serwist.pages.dev/) |
| i18n | Custom dictionary-based (no external library) |
| Testing | [Vitest](https://vitest.dev/) + [Playwright](https://playwright.dev/) |
| Deployment | [Vercel](https://vercel.com/) |

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You will be redirected to `/en` or `/ja` based on your browser's language settings.

### Build

```bash
npm run build
npm start
```

### Testing

```bash
# Unit & component tests (Vitest)
npm test

# E2E tests (Playwright, requires a production build)
npm run test:e2e
```

## i18n Architecture

This blog supports Japanese (`ja`) and English (`en`) with English as the default language.

### URL Structure

All pages are served under a locale prefix (`[locale]` = `en` | `ja`):

- `/[locale]/` - Home
- `/[locale]/blog` - Blog listing
- `/[locale]/blog/2026/02/22/hello-world` - Blog post
- `/[locale]/projects` - Projects page
- `/[locale]/uses` - Uses page
- `/[locale]/about` - About page
- `/[locale]/search` - Search page
- `/[locale]/category` - Category index
- `/[locale]/tag` - Tag index
- `/[locale]/tag/nextjs` - Tag listing
- `/[locale]/feed.xml` - RSS feed
- `/[locale]/atom.xml` - Atom feed

Accessing `/` without a locale prefix redirects to `/en` (or `/ja` if the browser's `Accept-Language` header contains `ja`).

### UI Translations

UI strings are managed via a lightweight dictionary object in `src/lib/i18n.ts`. No external i18n library is required.

### Content Translations

Blog posts and pages are organized by locale in the content directory:

```
content/posts/
  en/
    hello-world.mdx
    docker-basics.mdx
    ...
  ja/
    hello-world.mdx
    docker-basics.mdx
    ...
content/pages/
  en/
    about.mdx
    uses.mdx
  ja/
    about.mdx
    uses.mdx
```

The locale is automatically derived from the directory name. Files with the same name across locales are treated as translations of each other.

### Category Translations

Categories use English as the base language with optional Japanese overrides:

```yaml
name: Programming
description: Articles about programming
nameJa: プログラミング
descriptionJa: プログラミングに関する記事
```

### Language Switcher

A language switcher button ("EN" / "JP") is displayed in the header, allowing users to toggle between locales while staying on the same page.

## Writing Posts

Create a new `.mdx` file in `content/posts/en/` or `content/posts/ja/`:

```markdown
---
title: "Post Title"
description: "A short description."
date: 2026-01-01
published: true
updated: 2026-01-15          # optional: last updated date
cover: "/images/cover.png"   # optional: cover image
categories:
  - programming
tags:
  - nextjs
---

Your content here. Supports **Markdown**, code blocks with syntax highlighting, and math expressions like $E = mc^2$.
```

The filename becomes the URL slug (e.g., `hello-world.mdx` -> `/en/blog/2026/01/01/hello-world`). To create a translated version, place a file with the same name in the other locale directory.

### Writing Pages

Static pages (e.g., About) are managed in `content/pages/en/` or `content/pages/ja/`. Pages use a simpler frontmatter schema than posts:

```markdown
---
title: "About"
description: "About this site."
---

Page content here.
```

The filename becomes the URL slug (e.g., `about.mdx` -> `/en/about`).

### Adding Projects

Create a `.yml` file in `content/projects/`:

```yaml
name: My Project
slug: my-project
description: A short description of the project.
nameJa: 私のプロジェクト
descriptionJa: プロジェクトの簡単な説明。
url: https://example.com
github: https://github.com/user/repo
techStack:
  - TypeScript
  - Next.js
featured: true
order: 1
```

Fields: `name` and `description` are required. `nameJa`, `descriptionJa`, `url`, `github`, `techStack`, `featured`, and `order` are optional. Projects are sorted by `order` (ascending).

### Adding Categories

Create a `.yml` file in `content/categories/`:

```yaml
name: Programming
slug: programming
description: Articles about programming
nameJa: プログラミング
descriptionJa: プログラミングに関する記事
```

## SEO

- **OG image**: A default Open Graph image (`public/icons/og-default.png`, 1200×630) is applied to all pages via the layout. Individual posts with a `cover` field use that as the image in BlogPosting JSON-LD.
- **Structured data**: WebSite JSON-LD on the layout, BlogPosting + BreadcrumbList JSON-LD on each post.
- **hreflang / canonical**: Every page emits `<link rel="canonical">` and `<link rel="alternate" hreflang="...">` tags. The sitemap also includes hreflang alternates for cross-locale translation pairs.
- **Twitter cards**: `twitter:site` and `twitter:creator` are set globally.
- **RSS / Atom feeds**: Per-locale feeds at `/{locale}/feed.xml` (RSS 2.0) and `/{locale}/atom.xml` (Atom 1.0). Autodiscovery `<link>` tags are included in the layout `<head>`. Feeds contain the 20 most recent published posts.

## Security

HTTP security headers are configured in `next.config.ts` via the `headers()` function and applied to all routes:

- **Content-Security-Policy**: Restricts resource origins (allows GTM/GA, inline scripts/styles needed by Next.js and next-themes)
- **Strict-Transport-Security**: Enforces HTTPS with 2-year max-age, includeSubDomains, and preload
- **X-Content-Type-Options**: `nosniff` — prevents MIME type sniffing
- **X-Frame-Options**: `DENY` — prevents clickjacking via iframes
- **Referrer-Policy**: `strict-origin-when-cross-origin` — limits referrer information
- **Permissions-Policy**: Disables camera, microphone, and geolocation APIs
- **X-DNS-Prefetch-Control**: Enables DNS prefetching for external links

## Project Structure

```
src/
  proxy.ts                    # Locale detection & redirect
  app/
    layout.tsx                 # Root layout (passthrough)
    not-found.tsx              # Root 404 -> redirect to /en
    globals.css                # Tailwind v4 theme & prose styles
    manifest.ts                # PWA manifest
    robots.ts                  # robots.txt
    sitemap.ts                 # Dynamic sitemap (all locales)
    sw.ts                      # Service worker source (Serwist)
    serwist/
      [path]/
        route.ts               # Serwist route handler (SW build + precache manifest)
    [locale]/
      layout.tsx               # Locale layout (html, body, Header, Footer, metadata)
      page.tsx                 # Home page (latest posts)
      not-found.tsx            # 404 page
      feed.xml/
        route.ts               # RSS 2.0 feed (SSG)
      atom.xml/
        route.ts               # Atom 1.0 feed (SSG)
      about/
        page.tsx               # About page (MDX)
      projects/
        page.tsx               # Projects page (YAML data)
      uses/
        page.tsx               # Uses page (MDX)
      blog/
        page.tsx               # Blog listing with pagination
        [year]/[month]/[day]/[slug]/
          page.tsx             # Post detail (SSG, JSON-LD with inLanguage)
      category/
        page.tsx               # Category index (all categories)
        [slug]/
          page.tsx             # Category listing with pagination
      search/
        page.tsx               # Search page (client-side filtering)
      tag/
        page.tsx               # Tag index (all tags)
        [slug]/
          page.tsx             # Tag listing with pagination
      ~offline/
        page.tsx               # Offline fallback
  components/
    layout/                    # Header, Footer, LanguageSwitcher
    theme/                     # ThemeProvider, ThemeToggle
    pwa/                       # SerwistProvider
    blog/                      # PostCard, PostList, Pagination, CategoryBadge, TagBadge, SocialShare, TableOfContents, RelatedPosts
    search/                    # SearchPageClient
    projects/                  # ProjectCard
    mdx/                       # MdxContent, MdxComponents
    common/                    # GTM
  lib/
    i18n.ts                    # Locale types, dictionaries, getDictionary()
    constants.ts               # Site URL, author, posts per page, OG image path, social links
    posts.ts                   # Content query utilities (locale-aware, includes getRelatedPosts())
    search.ts                  # Client-side search logic (AND match, case-insensitive)
    toc.ts                     # Table of contents heading extraction
    feed.ts                    # RSS 2.0 / Atom 1.0 XML generation
    seo.ts                     # SEO helpers (hreflang alternate builder)
    utils.ts                   # cn(), formatDate(date, locale)
content/
  posts/
    en/                        # English articles (MDX)
    ja/                        # Japanese articles (MDX)
  pages/
    en/                        # English pages (MDX)
    ja/                        # Japanese pages (MDX)
  categories/                  # Category definitions (YAML)
  projects/                    # Project definitions (YAML)
velite.config.ts               # Velite collection schemas & MDX plugins
vitest.config.mts              # Vitest configuration
playwright.config.ts           # Playwright E2E configuration
__tests__/
  __mocks__/
    velite.ts                  # Mock Velite data for unit tests
  lib/                         # Unit tests for lib/ utilities
  components/                  # Component tests (mirrors src/components/ structure)
    blog/                      # Blog component tests
    layout/                    # Layout component tests
    search/                    # Search component tests
    mdx/                       # MDX component tests
    projects/                  # Projects component tests
    theme/                     # Theme component tests
    common/                    # Common component tests
e2e/                           # E2E tests (Playwright)
```

## Environment Variables

| Variable | Description | Required |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Site URL (default: `https://shinyaz.com`) | No |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container ID | No |

## Deployment

Push to a Git repository and connect it to [Vercel](https://vercel.com/). The build command (`next build --turbopack`) is configured in `package.json`.

## License

Private project.
