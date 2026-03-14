import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllTagsIncludingTils, getPostsByTag } from "@/lib/posts";
import { getTilsByTag } from "@/lib/tils";
import { PostList } from "@/components/blog/post-list";
import { locales, isValidLocale, getDictionary } from "@/lib/i18n";
import { SITE_URL } from "@/lib/constants";
import { buildAlternateLanguages } from "@/lib/seo";

interface TagPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const allParams: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    const tags = getAllTagsIncludingTils(locale);
    for (const tag of tags) {
      allParams.push({ locale, slug: tag });
    }
  }
  return allParams;
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};

  const t = getDictionary(locale);
  const title = `${t.tag.title}: ${slug}`;
  const description = t.tag.description.replace("{tag}", slug);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/tag/${slug}`,
      type: "website",
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/tag/${slug}`,
      languages: buildAlternateLanguages((l) => `/${l}/tag/${slug}`),
    },
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();

  const t = getDictionary(locale);
  const posts = getPostsByTag(slug, locale);
  const tilItems = getTilsByTag(slug, locale);

  if (posts.length === 0 && tilItems.length === 0) notFound();

  const tilsAsPostCards = tilItems.map((til) => ({
    title: til.title,
    description: til.description,
    date: til.date,
    permalink: til.permalink,
    categories: [] as string[],
    tags: til.tags,
    metadata: { readingTime: til.metadata.readingTime },
  }));

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 md:py-12">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          {t.tag.title}: #{slug}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {t.tag.description.replace("{tag}", slug)}
        </p>
      </header>
      {posts.length > 0 && (
        <section>
          {tilItems.length > 0 && (
            <h2 className="mb-4 text-xl font-semibold">{t.tag.postsSection}</h2>
          )}
          <PostList posts={posts} locale={locale} />
        </section>
      )}
      {tilItems.length > 0 && (
        <section className={posts.length > 0 ? "mt-10" : ""}>
          {posts.length > 0 && (
            <h2 className="mb-4 text-xl font-semibold">{t.tag.tilsSection}</h2>
          )}
          <PostList posts={tilsAsPostCards} locale={locale} />
        </section>
      )}
    </div>
  );
}
