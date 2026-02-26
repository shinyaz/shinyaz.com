import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedPosts, getPaginatedPosts } from "@/lib/posts";
import { PostList } from "@/components/blog/post-list";
import { Pagination } from "@/components/blog/pagination";
import { getDictionary, isValidLocale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/constants";
import { buildAlternateLanguages } from "@/lib/seo";

interface BlogPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    title: t.blog.title,
    description: t.blog.description,
    openGraph: {
      title: t.blog.title,
      description: t.blog.description,
      url: `${SITE_URL}/${locale}/blog`,
      type: "website",
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/blog`,
      languages: buildAlternateLanguages((l) => `/${l}/blog`),
    },
  };
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const t = getDictionary(locale);
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const allPosts = getPublishedPosts(locale);
  const { posts, totalPages, currentPage } = getPaginatedPosts(page, allPosts);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{t.blog.title}</h1>
        <p className="mt-2 text-muted-foreground">{t.blog.description}</p>
      </header>
      <PostList posts={posts} locale={locale} />
      <Pagination currentPage={currentPage} totalPages={totalPages} basePath={`/${locale}/blog`} locale={locale} />
    </div>
  );
}
