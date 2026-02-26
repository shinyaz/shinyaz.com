import type { Metadata } from "next";
import { getPublishedPosts } from "@/lib/posts";
import { PostList } from "@/components/blog/post-list";
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

  return {
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: buildAlternateLanguages((l) => `/${l}`),
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const t = getDictionary(locale);
  const posts = getPublishedPosts(locale).slice(0, 5);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <section className="mb-12">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{t.site.name}</h1>
        <p className="mt-2 text-muted-foreground">
          {t.home.subtitle}
        </p>
      </section>
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">{t.home.latestPosts}</h2>
          <Link href={`/${locale}/blog`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {t.home.allPosts} &rarr;
          </Link>
        </div>
        <PostList posts={posts} locale={locale} />
      </section>
    </div>
  );
}
