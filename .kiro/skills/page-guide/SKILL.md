---
name: page-guide
description: Static page writing guidelines and creation workflow. Loaded when creating, editing, or reviewing pages in content/pages/. Covers frontmatter, route setup, bilingual parity, and MDX content structure. Use when the user wants to add a new page like about, uses, or any standalone page.
---

Static page writing guide: $ARGUMENTS

## Page Architecture

Pages use a simpler schema than posts/TILs — no date, tags, or categories.

### Velite Schema (frontmatter fields)

```yaml
---
title: "Page Title"              # Required. Max 200 chars
description: "What this page is" # Optional. Max 500 chars
---
```

That's it. No `date`, `published`, `tags`, or `categories`.

### Permalink

Generated automatically from file path: `/{locale}/{slug}`
- `content/pages/en/about.mdx` → `/en/about`
- `content/pages/ja/uses.mdx` → `/ja/uses`

## Writing Guidelines

- Use `##` headings to structure content (rendered inside `<div className="prose">`)
- MDX components from `src/components/mdx-components.tsx` are available
- Keep content factual and up-to-date — pages are evergreen, not time-stamped
- Japanese pages: だ/である体 is NOT required (pages are informational, not blog posts)

## New Page Creation Workflow

1. **Create MDX files** for both locales:
   ```
   content/pages/en/{slug}.mdx
   content/pages/ja/{slug}.mdx
   ```

2. **Set frontmatter** (see schema above)

3. **Write content** in both languages
   - Parallel but not literal translations
   - Same structure and sections in both

4. **Create the route** at `src/app/[locale]/{slug}/page.tsx`

   Required pattern:
   ```typescript
   import type { Metadata } from "next";
   import { notFound } from "next/navigation";
   import { getPageBySlug } from "@/lib/posts";
   import { MdxContent } from "@/components/mdx/mdx-content";
   import { SITE_URL } from "@/lib/constants";
   import { locales, isValidLocale } from "@/lib/i18n";
   import { buildAlternateLanguages } from "@/lib/seo";

   interface PageProps {
     params: Promise<{ locale: string }>;
   }

   export function generateStaticParams() {
     return locales.map((locale) => ({ locale }));
   }

   export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
     const { locale } = await params;
     if (!isValidLocale(locale)) return {};
     const page = getPageBySlug("{slug}", locale);
     if (!page) return {};

     return {
       title: page.title,
       description: page.description,
       openGraph: {
         title: page.title,
         description: page.description,
         type: "website",
         url: `${SITE_URL}/${locale}/{slug}`,
       },
       alternates: {
         canonical: `${SITE_URL}/${locale}/{slug}`,
         languages: buildAlternateLanguages((l) => `/${l}/{slug}`),
       },
     };
   }

   export default async function YourPage({ params }: PageProps) {
     const { locale } = await params;
     if (!isValidLocale(locale)) notFound();
     const page = getPageBySlug("{slug}", locale);
     if (!page) notFound();

     return (
       <div className="mx-auto max-w-3xl px-4 py-6 md:py-12">
         <article>
           <header className="mb-8">
             <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
               {page.title}
             </h1>
           </header>
           <div className="prose">
             <MdxContent code={page.body} />
           </div>
         </article>
       </div>
     );
   }
   ```

5. **Add navigation link** (if needed) in the site header/footer

6. **Build and verify**
   ```bash
   npm run build
   ```

7. **Commit**
   ```bash
   git add content/pages/ src/app/
   git commit -m "feat: Add {slug} page"
   ```

## Existing Pages

| Slug  | EN Title | JA Title   | Special Layout          |
|-------|----------|------------|-------------------------|
| about | About    | 自己紹介   | Profile image + author  |
| uses  | Uses     | 使用ツール | Standard prose           |

## Checklist

- [ ] MDX exists in both `content/pages/en/` and `content/pages/ja/`
- [ ] Frontmatter has `title` and `description`
- [ ] Route file at `src/app/[locale]/{slug}/page.tsx`
- [ ] `generateStaticParams` returns all locales
- [ ] `generateMetadata` sets title, description, OG, alternates
- [ ] `buildAlternateLanguages` used for hreflang
- [ ] Build passes without warnings
