import type { Metadata } from "next";
import { getPublishedPosts, getFeaturedPosts } from "@/lib/posts";
import { getPublishedTils } from "@/lib/tils";
import { PostList } from "@/components/blog/post-list";
import { TilCard } from "@/components/blog/til-card";
import { FeaturedPostCard } from "@/components/blog/featured-post-card";
import { ProfileCard } from "@/components/common/profile-card";
import { StarIcon, BookIcon, LightbulbIcon } from "@/components/common/section-icons";
import { getDictionary, isValidLocale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/constants";
import { buildAlternateLanguages } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const canonicalUrl = `${SITE_URL}/${locale}`;

  return {
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ...buildAlternateLanguages((l) => `/${l}`),
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
      <section aria-labelledby="home-title">
        <h1 id="home-title" className="text-2xl font-bold tracking-tight md:text-3xl">{t.site.name}</h1>
        <p className="mt-2 text-muted-foreground">
          {t.home.subtitle}
        </p>
      </section>
      <div className="mt-8 md:mt-12">
        <ProfileCard locale={locale} />
      </div>
      {featuredPosts.length > 0 && (
        <section className="mt-8 md:mt-12" aria-labelledby="featured-posts">
          <h2 id="featured-posts" className="text-xl font-semibold mb-4 flex items-center gap-2">
            <StarIcon />
            {t.home.featuredPosts}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {featuredPosts.map((post) => (
              <FeaturedPostCard key={post.permalink} {...post} locale={locale} />
            ))}
          </div>
        </section>
      )}
      {posts.length > 0 && (
        <section className="mt-8 md:mt-12" aria-labelledby="latest-posts">
          <h2 id="latest-posts" className="text-xl font-semibold mb-4 flex items-center gap-2">
            <BookIcon />
            {t.home.latestPosts}
          </h2>
          <PostList posts={posts} locale={locale} />
          <div className="mt-4 text-center">
            <Link href={`/${locale}/blog`} className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-sm text-foreground hover:bg-muted transition-colors">
              {t.home.allPosts} &rarr;
            </Link>
          </div>
        </section>
      )}
      {latestTils.length > 0 && (
        <section className="mt-8 md:mt-12" aria-labelledby="latest-tils">
          <h2 id="latest-tils" className="text-xl font-semibold mb-4 flex items-center gap-2">
            <LightbulbIcon />
            {t.home.latestTils}
          </h2>
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
          <div className="mt-4 text-center">
            <Link href={`/${locale}/til`} className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-sm text-foreground hover:bg-muted transition-colors">
              {t.home.allTils} &rarr;
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
