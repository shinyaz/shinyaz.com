import { getPublishedPosts } from "./posts";
import { getPublishedTils } from "./tils";
import { SITE_URL, AUTHOR } from "./constants";
import { getDictionary, type Locale } from "./i18n";

const FEED_MAX_ITEMS = 20;

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

interface FeedItem {
  title: string;
  description?: string;
  date: string;
  permalink: string;
  categories: string[];
  tags: string[];
  updated?: string;
}

function getMergedFeedItems(locale: Locale): FeedItem[] {
  const posts = getPublishedPosts(locale).map((post) => ({
    title: post.title,
    description: post.description,
    date: post.date,
    permalink: post.permalink,
    categories: post.categories,
    tags: post.tags,
    updated: post.updated,
  }));
  const tilItems = getPublishedTils(locale).map((til) => ({
    title: til.title,
    description: til.description,
    date: til.date,
    permalink: til.permalink,
    categories: [] as string[],
    tags: til.tags,
    updated: undefined,
  }));
  return [...posts, ...tilItems]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, FEED_MAX_ITEMS);
}

export function generateRss(locale: Locale): string {
  const items = getMergedFeedItems(locale);
  const t = getDictionary(locale);
  const feedUrl = `${SITE_URL}/${locale}/feed.xml`;
  const siteLink = `${SITE_URL}/${locale}`;
  const lastBuildDate =
    items.length > 0
      ? new Date(items[0].date).toUTCString()
      : new Date().toUTCString();

  const xmlItems = items
    .map((item) => {
      const link = `${SITE_URL}${item.permalink}`;
      const pubDate = new Date(item.date).toUTCString();
      const categories = item.categories
        .map((cat) => `      <category>${escapeXml(cat)}</category>`)
        .join("\n");

      return `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>${escapeXml(AUTHOR)}</author>
${item.description ? `      <description>${escapeXml(item.description)}</description>\n` : ""}${categories}
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(t.site.name)}</title>
    <link>${siteLink}</link>
    <description>${escapeXml(t.site.description)}</description>
    <language>${locale}</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
${xmlItems}
  </channel>
</rss>`;
}

export function generateAtom(locale: Locale): string {
  const items = getMergedFeedItems(locale);
  const t = getDictionary(locale);
  const feedUrl = `${SITE_URL}/${locale}/atom.xml`;
  const siteLink = `${SITE_URL}/${locale}`;
  const updated =
    items.length > 0
      ? new Date(items[0].updated ?? items[0].date).toISOString()
      : new Date().toISOString();

  const entries = items
    .map((item) => {
      const link = `${SITE_URL}${item.permalink}`;
      const itemUpdated = new Date(
        item.updated ?? item.date
      ).toISOString();
      const published = new Date(item.date).toISOString();
      const categories = item.categories
        .map((cat) => `      <category term="${escapeXml(cat)}"/>`)
        .join("\n");

      return `    <entry>
      <title>${escapeXml(item.title)}</title>
      <link href="${link}" rel="alternate"/>
      <id>${link}</id>
      <published>${published}</published>
      <updated>${itemUpdated}</updated>
      <author><name>${escapeXml(AUTHOR)}</name></author>
${item.description ? `      <summary>${escapeXml(item.description)}</summary>\n` : ""}${categories}
    </entry>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="${locale}">
  <title>${escapeXml(t.site.name)}</title>
  <link href="${siteLink}" rel="alternate"/>
  <link href="${feedUrl}" rel="self"/>
  <id>${siteLink}</id>
  <updated>${updated}</updated>
  <author>
    <name>${escapeXml(AUTHOR)}</name>
  </author>
${entries}
</feed>`;
}
