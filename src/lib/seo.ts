import { SITE_URL } from "./constants";
import { locales, defaultLocale } from "./i18n";

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
