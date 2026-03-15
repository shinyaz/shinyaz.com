# Page Guide — Route Template

## Required Pattern for `src/app/[locale]/{slug}/page.tsx`

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

## Existing Pages

| Slug  | EN Title | JA Title   | Special Layout          |
|-------|----------|------------|-------------------------|
| about | About    | 自己紹介   | Profile image + author  |
| uses  | Uses     | 使用ツール | Standard prose           |
| now   | Now      | Now        | lastUpdated display     |
