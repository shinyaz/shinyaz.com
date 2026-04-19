import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSeries, getSeriesTitle, getPublishedPosts } from "@/lib/posts";
import { locales, isValidLocale, getDictionary } from "@/lib/i18n";
import { SITE_URL } from "@/lib/constants";
import { buildAlternateLanguages } from "@/lib/seo";

interface SeriesIndexPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: SeriesIndexPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    title: t.series.indexTitle,
    description: t.series.indexDescription,
    openGraph: {
      title: t.series.indexTitle,
      description: t.series.indexDescription,
      url: `${SITE_URL}/${locale}/series`,
      type: "website",
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/series`,
      languages: buildAlternateLanguages((l) => `/${l}/series`),
    },
  };
}

export default async function SeriesIndexPage({ params }: SeriesIndexPageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const t = getDictionary(locale);
  const allSeries = getAllSeries();

  const seriesWithCounts = allSeries
    .map((s) => {
      const seriesPosts = getPublishedPosts(locale)
        .filter((p) => p.series === s.slug)
        .sort((a, b) => (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0));
      return {
        ...s,
        postCount: seriesPosts.length,
        title: getSeriesTitle(s.slug, locale),
        firstPostPermalink: seriesPosts[0]?.permalink,
        latestDate: seriesPosts.reduce((max, p) => {
          const d = new Date(p.date).getTime();
          return d > max ? d : max;
        }, 0),
      };
    })
    .filter((s) => s.postCount > 0)
    .sort((a, b) => b.latestDate - a.latestDate);

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 md:py-12">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{t.series.indexTitle}</h1>
        <p className="mt-2 text-muted-foreground">{t.series.indexDescription}</p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2">
        {seriesWithCounts.map((s) => {
          const name = s.title?.name ?? s.name;
          const href = s.firstPostPermalink ?? `/${locale}/blog`;
          return (
            <Link
              key={s.slug}
              href={href}
              className="rounded-lg border border-border p-4 transition-colors hover:bg-accent"
            >
              <h2 className="font-semibold">{name}</h2>
              {s.title?.description && (
                <p className="mt-1 text-sm text-muted-foreground">{s.title.description}</p>
              )}
              <p className="mt-2 text-xs text-muted-foreground">
                {t.series.postCount.replace("{count}", String(s.postCount))}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
