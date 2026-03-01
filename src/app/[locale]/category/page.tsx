import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllCategories, getPostsByCategory, getCategoryName, getCategoryDescription } from "@/lib/posts";
import { locales, isValidLocale, getDictionary } from "@/lib/i18n";
import { SITE_URL } from "@/lib/constants";
import { buildAlternateLanguages } from "@/lib/seo";

interface CategoryIndexPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: CategoryIndexPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    title: t.category.title,
    description: t.category.description,
    openGraph: {
      title: t.category.title,
      description: t.category.description,
      url: `${SITE_URL}/${locale}/category`,
      type: "website",
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/category`,
      languages: buildAlternateLanguages((l) => `/${l}/category`),
    },
  };
}

export default async function CategoryIndexPage({ params }: CategoryIndexPageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const t = getDictionary(locale);
  const categories = getAllCategories();

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 md:py-12">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{t.category.title}</h1>
        <p className="mt-2 text-muted-foreground">{t.category.description}</p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2">
        {categories.map((category) => {
          const name = getCategoryName(category, locale);
          const description = getCategoryDescription(category, locale);
          const postCount = getPostsByCategory(category.slug, locale).length;
          return (
            <Link
              key={category.slug}
              href={`/${locale}/category/${category.slug}`}
              className="rounded-lg border border-border p-4 transition-colors hover:bg-accent"
            >
              <h2 className="font-semibold">{name}</h2>
              {description && (
                <p className="mt-1 text-sm text-muted-foreground">{description}</p>
              )}
              <p className="mt-2 text-xs text-muted-foreground">
                {t.category.postCount.replace("{count}", String(postCount))}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
