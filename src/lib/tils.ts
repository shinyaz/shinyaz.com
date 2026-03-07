import { tils } from "#site/content";
import type { TIL } from "#site/content";
import { POSTS_PER_PAGE } from "./constants";
import type { Locale } from "./i18n";

export function getPublishedTils(locale?: Locale) {
  return tils
    .filter((til) => til.published && (locale == null || til.locale === locale))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getTilBySlug(year: string, month: string, day: string, slug: string, locale?: Locale) {
  return tils.find(
    (til) =>
      til.published &&
      til.year === year &&
      til.month === month &&
      til.day === day &&
      til.slugName === slug &&
      (locale == null || til.locale === locale)
  );
}

export function getTilsByTag(tag: string, locale?: Locale) {
  return getPublishedTils(locale).filter((til) => til.tags.includes(tag));
}

export function getPaginatedTils(page: number, allTils?: ReturnType<typeof getPublishedTils>) {
  const source = allTils ?? getPublishedTils();
  const totalPages = Math.ceil(source.length / POSTS_PER_PAGE);
  const start = (page - 1) * POSTS_PER_PAGE;
  const paginatedTils = source.slice(start, start + POSTS_PER_PAGE);
  return { tils: paginatedTils, totalPages, currentPage: page };
}

export function getAllTilTags(locale?: Locale) {
  const publishedTils = getPublishedTils(locale);
  const tagSet = new Set<string>();
  for (const til of publishedTils) {
    for (const tag of til.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet).sort();
}

export type { TIL };
