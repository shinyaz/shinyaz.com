import { SITE_URL } from "./constants";
import { locales, defaultLocale, getDictionary, type Locale } from "./i18n";

export function buildAlternateLanguages(
  pathFn: (locale: string) => string,
): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = `${SITE_URL}${pathFn(l)}`;
  }
  languages["x-default"] = `${SITE_URL}${pathFn(defaultLocale)}`;
  return languages;
}

export function buildBreadcrumbJsonLd(
  locale: Locale,
  pageName: string,
  pageSlug: string,
) {
  const t = getDictionary(locale);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t.site.name,
        item: `${SITE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: pageName,
        item: `${SITE_URL}/${locale}/${pageSlug}`,
      },
    ],
  };
}
