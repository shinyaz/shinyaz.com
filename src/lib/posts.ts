import { posts, categories, pages, projects, tils, series } from "#site/content";
import type { Post } from "#site/content";
import { POSTS_PER_PAGE } from "./constants";
import { getDictionary, type Locale } from "./i18n";

export function getPublishedPosts(locale?: Locale) {
  return posts
    .filter((post) => post.published && (locale == null || post.locale === locale))
    .sort((a, b) => {
      const diff = new Date(b.date).getTime() - new Date(a.date).getTime();
      if (diff !== 0) return diff;
      const seriesCmp = (a.series ?? "").localeCompare(b.series ?? "");
      if (seriesCmp !== 0) return seriesCmp;
      return (b.seriesOrder ?? 0) - (a.seriesOrder ?? 0);
    });
}

export function getFeaturedPosts(locale?: Locale) {
  return getPublishedPosts(locale).filter((post) => post.featured);
}

export function getPostBySlug(year: string, month: string, day: string, slug: string, locale?: Locale) {
  return posts.find(
    (post) =>
      post.published &&
      post.year === year &&
      post.month === month &&
      post.day === day &&
      post.slugName === slug &&
      (locale == null || post.locale === locale)
  );
}

export function getPostsByCategory(categorySlug: string, locale?: Locale) {
  return getPublishedPosts(locale).filter((post) =>
    post.categories.includes(categorySlug)
  );
}

export function getPaginatedPosts(page: number, allPosts?: ReturnType<typeof getPublishedPosts>) {
  const source = allPosts ?? getPublishedPosts();
  const totalPages = Math.ceil(source.length / POSTS_PER_PAGE);
  const start = (page - 1) * POSTS_PER_PAGE;
  const paginatedPosts = source.slice(start, start + POSTS_PER_PAGE);
  return { posts: paginatedPosts, totalPages, currentPage: page };
}

export function getAllCategories() {
  return categories;
}

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryName(category: { name: string; nameJa?: string }, locale: Locale) {
  return locale === "ja" && category.nameJa ? category.nameJa : category.name;
}

export function getCategoryDescription(category: { description?: string; descriptionJa?: string }, locale: Locale) {
  return locale === "ja" && category.descriptionJa ? category.descriptionJa : category.description;
}

export function getAllTags(locale?: Locale) {
  const publishedPosts = getPublishedPosts(locale);
  const tagSet = new Set<string>();
  for (const post of publishedPosts) {
    for (const tag of post.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet).sort();
}

export function getAllTagsIncludingTils(locale?: Locale) {
  const tagSet = new Set<string>();
  const publishedPosts = getPublishedPosts(locale);
  for (const post of publishedPosts) {
    for (const tag of post.tags) {
      tagSet.add(tag);
    }
  }
  const publishedTils = tils.filter(
    (til) => til.published && (locale == null || til.locale === locale)
  );
  for (const til of publishedTils) {
    for (const tag of til.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet).sort();
}

export function getPostsByTag(tag: string, locale?: Locale) {
  return getPublishedPosts(locale).filter((post) => post.tags.includes(tag));
}

export function getSeriesPosts(post: Post): Post[] {
  if (!post.series) return [];
  return getPublishedPosts(post.locale as Locale)
    .filter((p) => p.series === post.series)
    .sort((a, b) => (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0));
}

export function getSeriesTitle(slug: string, locale: Locale): { name: string; suffix: string; description?: string } | undefined {
  const s = series.find((item) => item.slug === slug);
  if (!s) return undefined;
  const name = locale === "ja" && s.nameJa ? s.nameJa : s.name;
  const description = locale === "ja" && s.descriptionJa ? s.descriptionJa : s.description;
  const { seriesSuffix } = getDictionary(locale).series;
  return { name, suffix: seriesSuffix, description };
}

export function getAllSeries() {
  return series;
}

export function getSeriesPostCount(seriesSlug: string, locale: Locale): number {
  return getPublishedPosts(locale).filter((p) => p.series === seriesSlug).length;
}

export function getRelatedPosts(post: Post, limit = 3): Post[] {
  const candidates = getPublishedPosts(post.locale as Locale).filter(
    (p) => p.permalink !== post.permalink
  );

  const scored = candidates.map((p) => {
    let score = 0;
    for (const cat of p.categories) {
      if (post.categories.includes(cat)) score += 2;
    }
    for (const tag of p.tags) {
      if (post.tags.includes(tag)) score += 1;
    }
    return { post: p, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        new Date(b.post.date).getTime() - new Date(a.post.date).getTime()
    )
    .slice(0, limit)
    .map((s) => s.post);
}

export function getPageBySlug(slug: string, locale?: Locale) {
  return pages.find(
    (page) =>
      page.slugName === slug &&
      (locale == null || page.locale === locale)
  );
}

export function getAllProjects() {
  return projects.slice().sort((a, b) => a.order - b.order);
}

export function getProjectName(project: { name: string; nameJa?: string }, locale: Locale) {
  return locale === "ja" && project.nameJa ? project.nameJa : project.name;
}

export function getProjectDescription(project: { description: string; descriptionJa?: string }, locale: Locale) {
  return locale === "ja" && project.descriptionJa ? project.descriptionJa : project.description;
}
