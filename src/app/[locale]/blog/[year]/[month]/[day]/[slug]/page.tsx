import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedPosts, getPostBySlug } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import { MdxContent } from "@/components/mdx/mdx-content";
import { CategoryBadge } from "@/components/blog/category-badge";
import { SITE_URL, AUTHOR } from "@/lib/constants";
import { locales, isValidLocale, getDictionary } from "@/lib/i18n";

interface PostPageProps {
  params: Promise<{ locale: string; year: string; month: string; day: string; slug: string }>;
}

export async function generateStaticParams() {
  const allParams: { locale: string; year: string; month: string; day: string; slug: string }[] = [];
  for (const locale of locales) {
    const posts = getPublishedPosts(locale);
    for (const post of posts) {
      allParams.push({
        locale,
        year: post.year,
        month: post.month,
        day: post.day,
        slug: post.slugName,
      });
    }
  }
  return allParams;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { locale, year, month, day, slug } = await params;
  if (!isValidLocale(locale)) return {};
  const post = getPostBySlug(year, month, day, slug, locale);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated,
      url: `${SITE_URL}${post.permalink}`,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { locale, year, month, day, slug } = await params;
  if (!isValidLocale(locale)) notFound();
  const t = getDictionary(locale);
  const post = getPostBySlug(year, month, day, slug, locale);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    inLanguage: locale,
    author: {
      "@type": "Person",
      name: AUTHOR,
    },
    publisher: {
      "@type": "Organization",
      name: t.site.name,
    },
    url: `${SITE_URL}${post.permalink}`,
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <header className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            {post.title}
          </h1>
          <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
            <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
            {post.categories.length > 0 && (
              <div className="flex gap-1.5">
                {post.categories.map((cat) => (
                  <CategoryBadge key={cat} slug={cat} locale={locale} />
                ))}
              </div>
            )}
          </div>
        </header>
        <div className="prose">
          <MdxContent code={post.body} />
        </div>
      </article>
    </div>
  );
}
