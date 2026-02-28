import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostsByCategory, getAllCategories, getCategoryBySlug, getPaginatedPosts, getCategoryName, getCategoryDescription } from "@/lib/posts";
import { PostList } from "@/components/blog/post-list";
import { Pagination } from "@/components/blog/pagination";
import { locales, isValidLocale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/constants";
import { buildAlternateLanguages } from "@/lib/seo";

interface CategoryPageProps {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  const allParams: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const cat of categories) {
      allParams.push({ locale, slug: cat.slug });
    }
  }
  return allParams;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  const name = getCategoryName(category, locale);
  const description = getCategoryDescription(category, locale);

  return {
    title: name,
    description: description ?? `${name}`,
    openGraph: {
      title: name,
      description: description ?? `${name}`,
      url: `${SITE_URL}/${locale}/category/${slug}`,
      type: "website",
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/category/${slug}`,
      languages: buildAlternateLanguages((l) => `/${l}/category/${slug}`),
    },
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();
  const { page: pageParam } = await searchParams;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const name = getCategoryName(category, locale);
  const description = getCategoryDescription(category, locale);

  const allPosts = getPostsByCategory(slug, locale);
  const page = Math.max(1, Number(pageParam) || 1);
  const { posts, totalPages, currentPage } = getPaginatedPosts(page, allPosts);

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 md:py-12">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{name}</h1>
        {description && (
          <p className="mt-2 text-muted-foreground">{description}</p>
        )}
      </header>
      <PostList posts={posts} locale={locale} />
      <Pagination currentPage={currentPage} totalPages={totalPages} basePath={`/${locale}/category/${slug}`} locale={locale} />
    </div>
  );
}
