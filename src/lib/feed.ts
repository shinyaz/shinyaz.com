import { getPublishedPosts } from "./posts";
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

export function generateRss(locale: Locale): string {
  const posts = getPublishedPosts(locale).slice(0, FEED_MAX_ITEMS);
  const t = getDictionary(locale);
  const feedUrl = `${SITE_URL}/${locale}/feed.xml`;
  const siteLink = `${SITE_URL}/${locale}`;
  const lastBuildDate =
    posts.length > 0
      ? new Date(posts[0].date).toUTCString()
      : new Date().toUTCString();

  const items = posts
    .map((post) => {
      const link = `${SITE_URL}${post.permalink}`;
      const pubDate = new Date(post.date).toUTCString();
      const categories = post.categories
        .map((cat) => `      <category>${escapeXml(cat)}</category>`)
        .join("\n");

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
${post.description ? `      <description>${escapeXml(post.description)}</description>\n` : ""}${categories}
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
${items}
  </channel>
</rss>`;
}

export function generateAtom(locale: Locale): string {
  const posts = getPublishedPosts(locale).slice(0, FEED_MAX_ITEMS);
  const t = getDictionary(locale);
  const feedUrl = `${SITE_URL}/${locale}/atom.xml`;
  const siteLink = `${SITE_URL}/${locale}`;
  const updated =
    posts.length > 0
      ? new Date(posts[0].updated ?? posts[0].date).toISOString()
      : new Date().toISOString();

  const entries = posts
    .map((post) => {
      const link = `${SITE_URL}${post.permalink}`;
      const postUpdated = new Date(
        post.updated ?? post.date
      ).toISOString();
      const published = new Date(post.date).toISOString();
      const categories = post.categories
        .map((cat) => `      <category term="${escapeXml(cat)}"/>`)
        .join("\n");

      return `    <entry>
      <title>${escapeXml(post.title)}</title>
      <link href="${link}" rel="alternate"/>
      <id>${link}</id>
      <published>${published}</published>
      <updated>${postUpdated}</updated>
${post.description ? `      <summary>${escapeXml(post.description)}</summary>\n` : ""}${categories}
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
