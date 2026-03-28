import type { Metadata } from "next";
import { getAllProjects } from "@/lib/posts";
import { ProjectCard } from "@/components/projects/project-card";
import { SITE_URL } from "@/lib/constants";
import { locales, isValidLocale, getDictionary } from "@/lib/i18n";
import { buildAlternateLanguages, buildBreadcrumbJsonLd } from "@/lib/seo";
import { notFound } from "next/navigation";

interface ProjectsPageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: ProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const t = getDictionary(locale);

  return {
    title: t.nav.projects,
    description: t.projects.description,
    openGraph: {
      title: t.nav.projects,
      description: t.projects.description,
      type: "website",
      url: `${SITE_URL}/${locale}/projects`,
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/projects`,
      languages: buildAlternateLanguages((l) => `/${l}/projects`),
    },
  };
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const t = getDictionary(locale);
  const projects = getAllProjects();
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(locale, t.nav.projects, "projects");

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          {t.nav.projects}
        </h1>
        <p className="mt-2 text-muted-foreground">{t.projects.description}</p>
      </header>
      <div className="grid gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} locale={locale} />
        ))}
      </div>
    </div>
  );
}
