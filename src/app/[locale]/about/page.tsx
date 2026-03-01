import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPageBySlug } from "@/lib/posts";
import { MdxContent } from "@/components/mdx/mdx-content";
import { SITE_URL, AUTHOR } from "@/lib/constants";
import { locales, isValidLocale, getDictionary } from "@/lib/i18n";
import { buildAlternateLanguages } from "@/lib/seo";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const page = getPageBySlug("about", locale);
  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      type: "profile",
      url: `${SITE_URL}/${locale}/about`,
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/about`,
      languages: buildAlternateLanguages((l) => `/${l}/about`),
    },
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const page = getPageBySlug("about", locale);
  if (!page) notFound();
  const t = getDictionary(locale);

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 md:py-12">
      <article>
        <header className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            {page.title}
          </h1>
          <div className="mt-6 flex items-center gap-5">
            <Image
              src="/images/profile.jpeg"
              alt={t.about.authorName}
              width={120}
              height={120}
              className="shrink-0 rounded-full"
              priority
            />
            <div>
              <p className="text-xl font-bold">{t.about.authorName}</p>
              <p className="mt-1 text-sm text-muted-foreground">@{AUTHOR}</p>
            </div>
          </div>
        </header>
        <div className="prose">
          <MdxContent code={page.body} />
        </div>
      </article>
    </div>
  );
}
