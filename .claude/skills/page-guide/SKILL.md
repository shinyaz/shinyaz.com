---
name: page-guide
description: Static page writing guidelines and creation workflow. Loaded when creating, editing, or reviewing pages in content/pages/. Covers frontmatter, route setup, bilingual parity, and MDX content structure. Use when the user wants to add a new page like about, uses, or any standalone page.
---

Static page writing guide: $ARGUMENTS

## Page Architecture

### Velite Schema (frontmatter fields)

```yaml
---
title: "Page Title"              # Required. Max 200 chars
description: "What this page is" # Optional. Max 500 chars
---
```

No `date`, `published`, `tags`, or `categories`.

### Permalink

Generated from file path: `/{locale}/{slug}`
- `content/pages/en/about.mdx` → `/en/about`
- `content/pages/ja/uses.mdx` → `/ja/uses`

## Writing Guidelines

- Use `##` headings to structure content (rendered inside `<div className="prose">`)
- MDX components from `src/components/mdx-components.tsx` are available
- Keep content factual and up-to-date — pages are evergreen, not time-stamped
- Japanese pages: だ/である体 is NOT required (pages are informational, not blog posts)

## New Page Creation Workflow

1. Create MDX files: `content/pages/{en,ja}/{slug}.mdx`
2. Set frontmatter (title + description)
3. Write content in both languages (parallel but not literal translations)
4. Create route at `src/app/[locale]/{slug}/page.tsx` (see [route template](references/ROUTE-TEMPLATE.md))
5. Add navigation link if needed
6. Build: `npm run build`
7. Commit: `git add content/pages/ src/app/ && git commit -m "feat: Add {slug} page"`

## Checklist

- [ ] MDX exists in both `content/pages/en/` and `content/pages/ja/`
- [ ] Frontmatter has `title` and `description`
- [ ] Route file at `src/app/[locale]/{slug}/page.tsx`
- [ ] `generateStaticParams` returns all locales
- [ ] `generateMetadata` sets title, description, OG, alternates
- [ ] `buildAlternateLanguages` used for hreflang
- [ ] Build passes without warnings

See [route template and existing pages](references/ROUTE-TEMPLATE.md).
