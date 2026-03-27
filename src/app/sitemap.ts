import type { MetadataRoute } from "next";
import { getPublishedPosts, getAllCategories, getAllTags } from "@/lib/posts";
import { getPublishedTils } from "@/lib/tils";
import { SITE_URL } from "@/lib/constants";
import { locales, defaultLocale } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Home and blog pages for each locale
  for (const locale of locales) {
    const homeUrl = locale === defaultLocale ? SITE_URL : `${SITE_URL}/${locale}`;
    const alternateLanguages: Record<string, string> = {};
    for (const l of locales) {
      alternateLanguages[l] = l === defaultLocale ? SITE_URL : `${SITE_URL}/${l}`;
    }
    alternateLanguages["x-default"] = SITE_URL;
    entries.push({
      url: homeUrl,
      changeFrequency: "daily",
      priority: 1.0,
      alternates: { languages: alternateLanguages },
    });

    const blogAlternates: Record<string, string> = {};
    for (const l of locales) {
      blogAlternates[l] = `${SITE_URL}/${l}/blog`;
    }
    blogAlternates["x-default"] = `${SITE_URL}/${defaultLocale}/blog`;
    entries.push({
      url: `${SITE_URL}/${locale}/blog`,
      changeFrequency: "daily",
      priority: 0.8,
      alternates: { languages: blogAlternates },
    });
  }

  // Static pages: About, Projects, Uses
  const staticPages = ["about", "projects", "uses", "privacy", "now", "colophon"];
  for (const page of staticPages) {
    for (const locale of locales) {
      const pageAlternates: Record<string, string> = {};
      for (const l of locales) {
        pageAlternates[l] = `${SITE_URL}/${l}/${page}`;
      }
      pageAlternates["x-default"] = `${SITE_URL}/${defaultLocale}/${page}`;
      entries.push({
        url: `${SITE_URL}/${locale}/${page}`,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: { languages: pageAlternates },
      });
    }
  }

  // Category and tag index pages
  for (const indexPage of ["category", "tag"]) {
    for (const locale of locales) {
      const indexAlternates: Record<string, string> = {};
      for (const l of locales) {
        indexAlternates[l] = `${SITE_URL}/${l}/${indexPage}`;
      }
      indexAlternates["x-default"] = `${SITE_URL}/${defaultLocale}/${indexPage}`;
      entries.push({
        url: `${SITE_URL}/${locale}/${indexPage}`,
        changeFrequency: "weekly",
        priority: 0.6,
        alternates: { languages: indexAlternates },
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
      if (Object.keys(alternates).length > 1) {
        const defaultUrl = alternates[defaultLocale];
        if (defaultUrl) alternates["x-default"] = defaultUrl;
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
      catAlternates["x-default"] = `${SITE_URL}/${defaultLocale}/category/${cat.slug}`;
      entries.push({
        url: `${SITE_URL}/${locale}/category/${cat.slug}`,
        changeFrequency: "weekly",
        priority: 0.5,
        alternates: { languages: catAlternates },
      });
    }
  }

  // Tag entries for each locale
  const tags = getAllTags();
  for (const locale of locales) {
    for (const tag of tags) {
      const tagAlternates: Record<string, string> = {};
      for (const l of locales) {
        tagAlternates[l] = `${SITE_URL}/${l}/tag/${tag}`;
      }
      tagAlternates["x-default"] = `${SITE_URL}/${defaultLocale}/tag/${tag}`;
      entries.push({
        url: `${SITE_URL}/${locale}/tag/${tag}`,
        changeFrequency: "weekly",
        priority: 0.5,
        alternates: { languages: tagAlternates },
      });
    }
  }

  // TIL index page for each locale
  for (const locale of locales) {
    const tilIndexAlternates: Record<string, string> = {};
    for (const l of locales) {
      tilIndexAlternates[l] = `${SITE_URL}/${l}/til`;
    }
    tilIndexAlternates["x-default"] = `${SITE_URL}/${defaultLocale}/til`;
    entries.push({
      url: `${SITE_URL}/${locale}/til`,
      changeFrequency: "daily",
      priority: 0.8,
      alternates: { languages: tilIndexAlternates },
    });
  }

  // TIL entries for each locale, with hreflang alternates
  const tilsByKey = new Map<string, Map<string, string>>();
  for (const locale of locales) {
    const tilItems = getPublishedTils(locale);
    for (const til of tilItems) {
      const key = `${til.year}-${til.month}-${til.day}-${til.slugName}`;
      if (!tilsByKey.has(key)) {
        tilsByKey.set(key, new Map());
      }
      tilsByKey.get(key)!.set(locale, `${SITE_URL}${til.permalink}`);
    }
  }

  for (const locale of locales) {
    const tilItems = getPublishedTils(locale);
    for (const til of tilItems) {
      const key = `${til.year}-${til.month}-${til.day}-${til.slugName}`;
      const translations = tilsByKey.get(key);
      const alternates: Record<string, string> = {};
      if (translations) {
        for (const [l, url] of translations) {
          alternates[l] = url;
        }
      }
      if (Object.keys(alternates).length > 1) {
        const defaultUrl = alternates[defaultLocale];
        if (defaultUrl) alternates["x-default"] = defaultUrl;
      }
      entries.push({
        url: `${SITE_URL}${til.permalink}`,
        lastModified: new Date(til.date),
        changeFrequency: "monthly",
        priority: 0.6,
        ...(Object.keys(alternates).length > 1
          ? { alternates: { languages: alternates } }
          : {}),
      });
    }
  }

  return entries;
}
