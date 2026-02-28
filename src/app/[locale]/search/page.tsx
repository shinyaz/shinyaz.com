import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedPosts } from "@/lib/posts";
import { getDictionary, isValidLocale, locales } from "@/lib/i18n";
import { SITE_URL } from "@/lib/constants";
import { buildAlternateLanguages } from "@/lib/seo";
import { SearchPageClient } from "@/components/search/search-page-client";
import type { SearchablePost } from "@/lib/search";

interface SearchPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: SearchPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    title: t.search.title,
    robots: { index: false },
    alternates: {
      canonical: `${SITE_URL}/${locale}/search`,
      languages: buildAlternateLanguages((l) => `/${l}/search`),
    },
  };
}

export default async function SearchPage({ params }: SearchPageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const t = getDictionary(locale);

  const allPosts = getPublishedPosts(locale);
  const searchablePosts: SearchablePost[] = allPosts.map((post) => ({
    title: post.title,
    description: post.description,
    date: post.date,
    permalink: post.permalink,
    categories: post.categories,
    tags: post.tags,
  }));

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 md:py-12">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          {t.search.title}
        </h1>
      </header>
      <Suspense>
        <SearchPageClient posts={searchablePosts} locale={locale} t={t} />
      </Suspense>
    </div>
  );
}
