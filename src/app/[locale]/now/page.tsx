import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageBySlug } from "@/lib/posts";
import { MdxContent } from "@/components/mdx/mdx-content";
import { SITE_URL } from "@/lib/constants";
import { locales, isValidLocale, getDictionary } from "@/lib/i18n";
import { buildAlternateLanguages } from "@/lib/seo";

interface NowPageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: NowPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const page = getPageBySlug("now", locale);
  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      type: "website",
      url: `${SITE_URL}/${locale}/now`,
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/now`,
      languages: buildAlternateLanguages((l) => `/${l}/now`),
    },
  };
}

export default async function NowPage({ params }: NowPageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const page = getPageBySlug("now", locale);
  if (!page) notFound();

  const t = getDictionary(locale);

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 md:py-12">
      <article>
        <header className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            {page.title}
          </h1>
          {page.lastUpdated && (
            <p className="mt-2 text-sm text-muted-foreground">
              {t.now.lastUpdated}:{" "}
              <time dateTime={page.lastUpdated}>
                {new Intl.DateTimeFormat(locale, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }).format(new Date(page.lastUpdated))}
              </time>
            </p>
          )}
        </header>
        <div className="prose">
          <MdxContent code={page.body} />
        </div>
      </article>
    </div>
  );
}
