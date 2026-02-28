import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag, getPaginatedPosts } from "@/lib/posts";
import { PostList } from "@/components/blog/post-list";
import { Pagination } from "@/components/blog/pagination";
import { locales, isValidLocale, getDictionary } from "@/lib/i18n";
import { SITE_URL } from "@/lib/constants";
import { buildAlternateLanguages } from "@/lib/seo";

interface TagPageProps {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateStaticParams() {
  const allParams: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    const tags = getAllTags(locale);
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

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();
  const { page: pageParam } = await searchParams;

  const t = getDictionary(locale);
  const allPosts = getPostsByTag(slug, locale);
  if (allPosts.length === 0) notFound();

  const page = Math.max(1, Number(pageParam) || 1);
  const { posts, totalPages, currentPage } = getPaginatedPosts(page, allPosts);

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
      <PostList posts={posts} locale={locale} />
      <Pagination currentPage={currentPage} totalPages={totalPages} basePath={`/${locale}/tag/${slug}`} locale={locale} />
    </div>
  );
}
