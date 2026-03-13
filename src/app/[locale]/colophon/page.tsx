import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageBySlug } from "@/lib/posts";
import { MdxContent } from "@/components/mdx/mdx-content";
import { SITE_URL } from "@/lib/constants";
import { locales, isValidLocale } from "@/lib/i18n";
import { buildAlternateLanguages } from "@/lib/seo";

interface ColophonPageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: ColophonPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const page = getPageBySlug("colophon", locale);
  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      type: "website",
      url: `${SITE_URL}/${locale}/colophon`,
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/colophon`,
      languages: buildAlternateLanguages((l) => `/${l}/colophon`),
    },
  };
}

export default async function ColophonPage({ params }: ColophonPageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const page = getPageBySlug("colophon", locale);
  if (!page) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 md:py-12">
      <article>
        <header className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            {page.title}
          </h1>
        </header>
        <div className="prose">
          <MdxContent code={page.body} />
        </div>
      </article>
    </div>
  );
}
