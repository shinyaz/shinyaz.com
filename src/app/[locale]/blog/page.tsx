import type { Metadata } from "next";
import Link from "next/link";
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

export async function generateMetadata({ params, searchParams }: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const t = getDictionary(locale);
  const { page } = await searchParams;
  const pageNum = Math.max(1, Number(page) || 1);
  const suffix = pageNum > 1 ? `?page=${pageNum}` : "";
  return {
    title: t.blog.title,
    description: t.blog.description,
    ...(pageNum > 1 ? { robots: { index: false } } : {}),
    openGraph: {
      title: t.blog.title,
      description: t.blog.description,
      url: `${SITE_URL}/${locale}/blog${suffix}`,
      type: "website",
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/blog${suffix}`,
      languages: buildAlternateLanguages((l) => `/${l}/blog${suffix}`),
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
    <div className="mx-auto max-w-3xl px-4 py-6 md:py-12">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{t.blog.title}</h1>
        <p className="mt-2 text-muted-foreground">{t.blog.description}</p>
        <div className="mt-4 flex gap-3">
          <Link
            href={`/${locale}/category`}
            className="inline-block rounded-full border border-border px-3 py-1 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            {t.blog.browseCategories}
          </Link>
          <Link
            href={`/${locale}/tag`}
            className="inline-block rounded-full border border-border px-3 py-1 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            {t.blog.browseTags}
          </Link>
        </div>
      </header>
      <PostList posts={posts} locale={locale} />
      <Pagination currentPage={currentPage} totalPages={totalPages} basePath={`/${locale}/blog`} locale={locale} />
    </div>
  );
}
