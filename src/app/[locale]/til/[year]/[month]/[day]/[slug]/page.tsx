import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTilBySlug } from "@/lib/tils";
import { formatDate, formatReadingTime } from "@/lib/utils";
import { MdxContent } from "@/components/mdx/mdx-content";
import { TagBadge } from "@/components/blog/tag-badge";
import { SocialShare } from "@/components/blog/social-share";
import { SITE_URL, AUTHOR, OG_IMAGE_PATH } from "@/lib/constants";
import { locales, isValidLocale, getDictionary, defaultLocale } from "@/lib/i18n";
import { ProfileCard } from "@/components/common/profile-card";
import { generateTilStaticParams } from "@/lib/til-params";

interface TilPageProps {
  params: Promise<{ locale: string; year: string; month: string; day: string; slug: string }>;
}

export const generateStaticParams = generateTilStaticParams;

export async function generateMetadata({ params }: TilPageProps): Promise<Metadata> {
  const { locale, year, month, day, slug } = await params;
  if (!isValidLocale(locale)) return {};
  const til = getTilBySlug(year, month, day, slug, locale);
  if (!til) return {};

  const languages: Record<string, string> = {};
  for (const l of locales) {
    const translated = getTilBySlug(year, month, day, slug, l);
    if (translated) {
      languages[l] = `${SITE_URL}${translated.permalink}`;
    }
  }
  if (languages[defaultLocale]) {
    languages["x-default"] = languages[defaultLocale];
  }

  return {
    title: til.title,
    description: til.description,
    openGraph: {
      title: til.title,
      description: til.description,
      type: "article",
      publishedTime: til.date,
      modifiedTime: til.date,
      url: `${SITE_URL}${til.permalink}`,
      locale: locale === "ja" ? "ja_JP" : "en_US",
      authors: [AUTHOR],
      tags: til.tags,
    },
    alternates: {
      canonical: `${SITE_URL}${til.permalink}`,
      languages,
    },
  };
}

export default async function TilDetailPage({ params }: TilPageProps) {
  const { locale, year, month, day, slug } = await params;
  if (!isValidLocale(locale)) notFound();
  const t = getDictionary(locale);
  const til = getTilBySlug(year, month, day, slug, locale);
  if (!til) notFound();

  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: til.title,
    description: til.description,
    datePublished: til.date,
    dateModified: til.date,
    inLanguage: locale,
    author: {
      "@type": "Person",
      name: AUTHOR,
    },
    publisher: {
      "@type": "Person",
      name: AUTHOR,
    },
    url: `${SITE_URL}${til.permalink}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}${til.permalink}`,
    },
    image: `${SITE_URL}${OG_IMAGE_PATH}`,
    ...(til.tags.length > 0 ? { keywords: til.tags.join(", ") } : {}),
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
        name: t.til.title,
        item: `${SITE_URL}/${locale}/til`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: til.title,
        item: `${SITE_URL}${til.permalink}`,
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
            {til.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground md:gap-3">
            <time dateTime={til.date}>{formatDate(til.date, locale)}</time>
            {til.metadata.readingTime != null && (
              <span>{formatReadingTime(til.metadata.readingTime, locale)}</span>
            )}
            {til.tags.length > 0 && (
              <div className="flex gap-1.5">
                {til.tags.map((tag) => (
                  <TagBadge key={tag} slug={tag} locale={locale} />
                ))}
              </div>
            )}
          </div>
        </header>
        <div className="prose">
          <MdxContent code={til.body} />
        </div>
        <SocialShare
          url={`${SITE_URL}${til.permalink}`}
          title={til.title}
          locale={locale}
        />
      </article>
      <div className="mt-12">
        <ProfileCard locale={locale} />
      </div>
    </div>
  );
}
