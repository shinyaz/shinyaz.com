import type { Metadata } from "next";
import { getPublishedPosts, getFeaturedPosts } from "@/lib/posts";
import { getPublishedTils } from "@/lib/tils";
import { PostList } from "@/components/blog/post-list";
import { TilCard } from "@/components/blog/til-card";
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
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
            {t.home.featuredPosts}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {featuredPosts.map((post) => (
              <FeaturedPostCard key={post.permalink} {...post} locale={locale} />
            ))}
          </div>
        </section>
      )}
      <section className="mt-8 md:mt-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" /></svg>
            {t.home.latestPosts}
          </h2>
          <Link href={`/${locale}/blog`} className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-sm text-foreground hover:bg-muted transition-colors">
            {t.home.allPosts} &rarr;
          </Link>
        </div>
        <PostList posts={posts} locale={locale} />
      </section>
      {latestTils.length > 0 && (
        <section className="mt-8 md:mt-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></svg>
              {t.home.latestTils}
            </h2>
            <Link href={`/${locale}/til`} className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-sm text-foreground hover:bg-muted transition-colors">
              {t.home.allTils} &rarr;
            </Link>
          </div>
          <div>
            {latestTils.map((til) => (
              <TilCard
                key={til.permalink}
                title={til.title}
                description={til.description}
                date={til.date}
                permalink={til.permalink}
                tags={til.tags}
                locale={locale}
                readingTime={til.metadata.readingTime}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
