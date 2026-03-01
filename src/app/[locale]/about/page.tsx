import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPageBySlug } from "@/lib/posts";
import { MdxContent } from "@/components/mdx/mdx-content";
import { SITE_URL } from "@/lib/constants";
import { locales, isValidLocale } from "@/lib/i18n";
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

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 md:py-12">
      <article>
        <header className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6">
          <Image
            src="/images/profile.jpeg"
            alt={page.title}
            width={96}
            height={96}
            className="rounded-full"
            priority
          />
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
