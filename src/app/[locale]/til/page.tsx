import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedTils, getPaginatedTils } from "@/lib/tils";
import { TilCard } from "@/components/blog/til-card";
import { Pagination } from "@/components/blog/pagination";
import { getDictionary, isValidLocale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/constants";
import { buildAlternateLanguages } from "@/lib/seo";

interface TilPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: TilPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    title: t.til.title,
    description: t.til.description,
    openGraph: {
      title: t.til.title,
      description: t.til.description,
      url: `${SITE_URL}/${locale}/til`,
      type: "website",
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/til`,
      languages: buildAlternateLanguages((l) => `/${l}/til`),
    },
  };
}

export default async function TilPage({ params, searchParams }: TilPageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const t = getDictionary(locale);
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const allTils = getPublishedTils(locale);
  const { tils, totalPages, currentPage } = getPaginatedTils(page, allTils);

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 md:py-12">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{t.til.title}</h1>
        <p className="mt-2 text-muted-foreground">{t.til.description}</p>
        <div className="mt-4 flex gap-3">
          <Link
            href={`/${locale}/tag`}
            className="inline-block rounded-full border border-border px-3 py-1 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            {t.til.browseTags}
          </Link>
        </div>
      </header>
      {tils.length === 0 ? (
        <p className="text-muted-foreground">{t.til.empty}</p>
      ) : (
        <>
          <div>
            {tils.map((til) => (
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
          <Pagination currentPage={currentPage} totalPages={totalPages} basePath={`/${locale}/til`} locale={locale} />
        </>
      )}
    </div>
  );
}
