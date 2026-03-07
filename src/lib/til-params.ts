import { getPublishedTils } from "./tils";
import { locales } from "./i18n";

export function generateTilStaticParams() {
  const allParams: { locale: string; year: string; month: string; day: string; slug: string }[] = [];
  for (const locale of locales) {
    const tils = getPublishedTils(locale);
    for (const til of tils) {
      allParams.push({
        locale,
        year: til.year,
        month: til.month,
        day: til.day,
        slug: til.slugName,
      });
    }
  }
  return allParams;
}
