import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTagsIncludingTils, getPostsByTag } from "@/lib/posts";
import { getTilsByTag } from "@/lib/tils";
import { locales, isValidLocale, getDictionary } from "@/lib/i18n";
import { SITE_URL } from "@/lib/constants";
import { buildAlternateLanguages } from "@/lib/seo";

interface TagIndexPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: TagIndexPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    title: t.tag.indexTitle,
    description: t.tag.indexDescription,
    openGraph: {
      title: t.tag.indexTitle,
      description: t.tag.indexDescription,
      url: `${SITE_URL}/${locale}/tag`,
      type: "website",
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/tag`,
      languages: buildAlternateLanguages((l) => `/${l}/tag`),
    },
  };
}

export default async function TagIndexPage({ params }: TagIndexPageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const t = getDictionary(locale);
  const tags = getAllTagsIncludingTils(locale);

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 md:py-12">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{t.tag.indexTitle}</h1>
        <p className="mt-2 text-muted-foreground">{t.tag.indexDescription}</p>
      </header>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => {
          const count = getPostsByTag(tag, locale).length + getTilsByTag(tag, locale).length;
          return (
            <Link
              key={tag}
              href={`/${locale}/tag/${tag}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              #{tag}
              <span className="text-xs">({count})</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
