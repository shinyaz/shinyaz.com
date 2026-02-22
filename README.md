# shinyaz Blog

[Japanese / 日本語](./README.ja.md)

A minimal, monochrome personal tech blog built with Next.js and MDX. Supports Japanese and English (i18n).

## Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org/) 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Content | MDX via [Velite](https://velite.js.org/) |
| Code Highlighting | [Shiki](https://shiki.style/) + rehype-pretty-code (dual theme) |
| Math Rendering | remark-math + rehype-katex |
| Dark Mode | [next-themes](https://github.com/pacocoursey/next-themes) (class-based) |
| PWA | [Serwist](https://serwist.pages.dev/) |
| i18n | Custom dictionary-based (no external library) |
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

## i18n Architecture

This blog supports Japanese (`ja`) and English (`en`) with English as the default language.

### URL Structure

All pages are served under a locale prefix:

- `/en/` - English home
- `/ja/` - Japanese home
- `/en/blog` - English blog listing
- `/ja/blog/2026/02/22/hello-world` - Japanese blog post

Accessing `/` without a locale prefix redirects to `/en` (or `/ja` if the browser's `Accept-Language` header contains `ja`).

### UI Translations

UI strings are managed via a lightweight dictionary object in `src/lib/i18n.ts`. No external i18n library is required.

### Content Translations

Blog posts are organized by locale in the content directory:

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
```

The locale is automatically derived from the directory name. Posts with the same filename across locales are treated as translations of each other.

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
categories:
  - programming
tags:
  - nextjs
---

Your content here. Supports **Markdown**, code blocks with syntax highlighting, and math expressions like $E = mc^2$.
```

The filename becomes the URL slug (e.g., `hello-world.mdx` -> `/en/blog/2026/01/01/hello-world`). To create a translated version, place a file with the same name in the other locale directory.

### Adding Categories

Create a `.yml` file in `content/categories/`:

```yaml
name: Programming
slug: programming
description: Articles about programming
nameJa: プログラミング
descriptionJa: プログラミングに関する記事
```

## Project Structure

```
src/
  middleware.ts                # Locale detection & redirect
  app/
    layout.tsx                 # Root layout (passthrough)
    not-found.tsx              # Root 404 -> redirect to /en
    globals.css                # Tailwind v4 theme & prose styles
    manifest.ts                # PWA manifest
    robots.ts                  # robots.txt
    sitemap.ts                 # Dynamic sitemap (all locales)
    sw.ts                      # Service worker (Serwist)
    [locale]/
      layout.tsx               # Locale layout (html, body, Header, Footer, metadata)
      page.tsx                 # Home page (latest posts)
      not-found.tsx            # 404 page
      blog/
        page.tsx               # Blog listing with pagination
        [year]/[month]/[day]/[slug]/
          page.tsx             # Post detail (SSG, JSON-LD with inLanguage)
      category/[slug]/
        page.tsx               # Category listing with pagination
      ~offline/
        page.tsx               # Offline fallback
  components/
    layout/                    # Header, Footer, LanguageSwitcher
    theme/                     # ThemeProvider, ThemeToggle
    blog/                      # PostCard, PostList, Pagination, CategoryBadge
    mdx/                       # MdxContent, MdxComponents
    common/                    # GTM
  lib/
    i18n.ts                    # Locale types, dictionaries, getDictionary()
    constants.ts               # Site URL, author, posts per page
    posts.ts                   # Content query utilities (locale-aware)
    utils.ts                   # cn(), formatDate(date, locale)
content/
  posts/
    en/                        # English articles (MDX)
    ja/                        # Japanese articles (MDX)
  categories/                  # Category definitions (YAML)
velite.config.ts               # Velite collection schemas & MDX plugins
```

## Environment Variables

| Variable | Description | Required |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Site URL (default: `https://shinyaz.com`) | No |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container ID | No |

## Deployment

Push to a Git repository and connect it to [Vercel](https://vercel.com/). The build command (`next build --webpack`) is configured in `package.json`.

## License

Private project.
