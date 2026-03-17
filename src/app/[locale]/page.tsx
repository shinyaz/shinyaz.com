import type { Metadata } from "next";
import { getPublishedPosts, getFeaturedPosts } from "@/lib/posts";
import { getPublishedTils } from "@/lib/tils";
import { PostList } from "@/components/blog/post-list";
import { FeaturedPostCard } from "@/components/blog/featured-post-card";
import { ProfileCard } from "@/components/common/profile-card";
import { getDictionary, isValidLocale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/constants";
import { defaultLocale } from "@/lib/i18n";
import { buildAlternateLanguages } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const canonicalUrl = locale === defaultLocale ? SITE_URL : `${SITE_URL}/${locale}`;

  return {
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ...buildAlternateLanguages((l) => `/${l}`),
        "x-default": SITE_URL,
      },
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const t = getDictionary(locale);
  const featuredPosts = getFeaturedPosts(locale);
  const posts = getPublishedPosts(locale).slice(0, 5);
  const latestTils = getPublishedTils(locale).slice(0, 5);

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 md:py-12">
      <section className="mb-8 md:mb-12">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{t.site.name}</h1>
        <p className="mt-2 text-muted-foreground">
          {t.home.subtitle}
        </p>
      </section>
      <ProfileCard locale={locale} />
      {featuredPosts.length > 0 && (
        <section className="mt-8 md:mt-12">
          <h2 className="text-xl font-semibold mb-4">{t.home.featuredPosts}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {featuredPosts.map((post) => (
              <FeaturedPostCard key={post.permalink} {...post} locale={locale} />
            ))}
          </div>
        </section>
      )}
      <section className="mt-8 md:mt-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">{t.home.latestPosts}</h2>
          <Link href={`/${locale}/blog`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {t.home.allPosts} &rarr;
          </Link>
        </div>
        <PostList posts={posts} locale={locale} />
      </section>
      {latestTils.length > 0 && (
        <section className="mt-8 md:mt-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">{t.home.latestTils}</h2>
            <Link href={`/${locale}/til`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t.home.allTils} &rarr;
            </Link>
          </div>
          <PostList
            posts={latestTils.map((til) => ({
              title: til.title,
              description: til.description,
              date: til.date,
              permalink: til.permalink,
              categories: [] as string[],
              tags: til.tags,
              metadata: { readingTime: til.metadata.readingTime },
            }))}
            locale={locale}
          />
        </section>
      )}
    </div>
  );
}
