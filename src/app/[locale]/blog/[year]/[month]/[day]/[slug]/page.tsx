import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getRelatedPosts } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import { MdxContent } from "@/components/mdx/mdx-content";
import { CategoryBadge } from "@/components/blog/category-badge";
import { TagBadge } from "@/components/blog/tag-badge";
import { SocialShare } from "@/components/blog/social-share";
import { RelatedPosts } from "@/components/blog/related-posts";
import { SITE_URL, AUTHOR } from "@/lib/constants";
import { locales, isValidLocale, getDictionary } from "@/lib/i18n";
import { extractHeadings } from "@/lib/toc";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { ProfileCard } from "@/components/common/profile-card";
import { generateBlogStaticParams } from "@/lib/blog-params";

interface PostPageProps {
  params: Promise<{ locale: string; year: string; month: string; day: string; slug: string }>;
}

export const generateStaticParams = generateBlogStaticParams;

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { locale, year, month, day, slug } = await params;
  if (!isValidLocale(locale)) return {};
  const post = getPostBySlug(year, month, day, slug, locale);
  if (!post) return {};

  const languages: Record<string, string> = {};
  for (const l of locales) {
    const translated = getPostBySlug(year, month, day, slug, l);
    if (translated) {
      languages[l] = `${SITE_URL}${translated.permalink}`;
    }
  }

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
      authors: [AUTHOR],
    },
    alternates: {
      canonical: `${SITE_URL}${post.permalink}`,
      languages,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { locale, year, month, day, slug } = await params;
  if (!isValidLocale(locale)) notFound();
  const t = getDictionary(locale);
  const post = getPostBySlug(year, month, day, slug, locale);
  if (!post) notFound();

  const headings = extractHeadings(post.content);
  const relatedPosts = getRelatedPosts(post);

  const blogPostingJsonLd = {
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
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}${post.permalink}`,
    },
    ...(post.cover ? { image: `${SITE_URL}${post.cover}` } : {}),
    ...(post.tags.length > 0 ? { keywords: post.tags.join(", ") } : {}),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t.site.name,
        item: `${SITE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t.blog.title,
        item: `${SITE_URL}/${locale}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE_URL}${post.permalink}`,
      },
    ],
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <article>
        <header className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            {post.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground md:gap-3">
            <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
            {post.categories.length > 0 && (
              <div className="flex gap-1.5">
                {post.categories.map((cat) => (
                  <CategoryBadge key={cat} slug={cat} locale={locale} />
                ))}
              </div>
            )}
            {post.tags.length > 0 && (
              <div className="flex gap-1.5">
                {post.tags.map((tag) => (
                  <TagBadge key={tag} slug={tag} locale={locale} />
                ))}
              </div>
            )}
          </div>
        </header>
        {headings.length >= 2 && (
          <TableOfContents headings={headings} locale={locale} />
        )}
        <div className="prose">
          <MdxContent code={post.body} />
        </div>
        <SocialShare
          url={`${SITE_URL}${post.permalink}`}
          title={post.title}
          locale={locale}
        />
      </article>
      <div className="mt-12">
        <ProfileCard locale={locale} />
      </div>
      <RelatedPosts posts={relatedPosts} locale={locale} />
    </div>
  );
}
