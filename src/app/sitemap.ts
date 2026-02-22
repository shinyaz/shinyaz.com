import type { MetadataRoute } from "next";
import { getPublishedPosts, getAllCategories } from "@/lib/posts";
import { SITE_URL } from "@/lib/constants";
import { locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Home and blog pages for each locale
  for (const locale of locales) {
    const alternateLanguages: Record<string, string> = {};
    for (const l of locales) {
      alternateLanguages[l] = `${SITE_URL}/${l}`;
    }
    entries.push({
      url: `${SITE_URL}/${locale}`,
      changeFrequency: "daily",
      priority: 1.0,
      alternates: { languages: alternateLanguages },
    });

    const blogAlternates: Record<string, string> = {};
    for (const l of locales) {
      blogAlternates[l] = `${SITE_URL}/${l}/blog`;
    }
    entries.push({
      url: `${SITE_URL}/${locale}/blog`,
      changeFrequency: "daily",
      priority: 0.8,
      alternates: { languages: blogAlternates },
    });
  }

  // Static pages: About, Projects, Uses
  const staticPages = ["about", "projects", "uses"];
  for (const page of staticPages) {
    for (const locale of locales) {
      const pageAlternates: Record<string, string> = {};
      for (const l of locales) {
        pageAlternates[l] = `${SITE_URL}/${l}/${page}`;
      }
      entries.push({
        url: `${SITE_URL}/${locale}/${page}`,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: { languages: pageAlternates },
      });
    }
  }

  // Post entries for each locale, with hreflang alternates
  // Group posts by slugName + date to find cross-locale translations
  const postsByKey = new Map<string, Map<string, string>>();
  for (const locale of locales) {
    const posts = getPublishedPosts(locale);
    for (const post of posts) {
      const key = `${post.year}-${post.month}-${post.day}-${post.slugName}`;
      if (!postsByKey.has(key)) {
        postsByKey.set(key, new Map());
      }
      postsByKey.get(key)!.set(locale, `${SITE_URL}${post.permalink}`);
    }
  }

  for (const locale of locales) {
    const posts = getPublishedPosts(locale);
    for (const post of posts) {
      const key = `${post.year}-${post.month}-${post.day}-${post.slugName}`;
      const translations = postsByKey.get(key);
      const alternates: Record<string, string> = {};
      if (translations) {
        for (const [l, url] of translations) {
          alternates[l] = url;
        }
      }
      entries.push({
        url: `${SITE_URL}${post.permalink}`,
        lastModified: new Date(post.updated ?? post.date),
        changeFrequency: "weekly",
        priority: 0.7,
        ...(Object.keys(alternates).length > 1
          ? { alternates: { languages: alternates } }
          : {}),
      });
    }
  }

  // Category entries for each locale
  const categories = getAllCategories();
  for (const locale of locales) {
    for (const cat of categories) {
      const catAlternates: Record<string, string> = {};
      for (const l of locales) {
        catAlternates[l] = `${SITE_URL}/${l}/category/${cat.slug}`;
      }
      entries.push({
        url: `${SITE_URL}/${locale}/category/${cat.slug}`,
        changeFrequency: "weekly",
        priority: 0.5,
        alternates: { languages: catAlternates },
      });
    }
  }

  return entries;
}
