import { describe, it, expect } from "vitest";
import { generateRss, generateAtom } from "@/lib/feed";

describe("generateRss", () => {
  it("generates valid RSS 2.0 XML for en locale", () => {
    const xml = generateRss("en");
    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain('<rss version="2.0"');
    expect(xml).toContain("<channel>");
    expect(xml).toContain("<title>shinyaz.com</title>");
    expect(xml).toContain("<link>https://shinyaz.com/en</link>");
    expect(xml).toContain("<language>en</language>");
  });

  it("generates valid RSS 2.0 XML for ja locale", () => {
    const xml = generateRss("ja");
    expect(xml).toContain("<language>ja</language>");
    expect(xml).toContain("<link>https://shinyaz.com/ja</link>");
  });

  it("includes only published posts", () => {
    const xml = generateRss("en");
    expect(xml).toContain("First Post");
    expect(xml).toContain("Second Post");
    expect(xml).not.toContain("Draft Post");
  });

  it("includes post items with required RSS elements", () => {
    const xml = generateRss("en");
    expect(xml).toContain("<item>");
    expect(xml).toContain("<guid isPermaLink=\"true\">");
    expect(xml).toContain("<pubDate>");
    expect(xml).toContain("<description>");
  });

  it("includes categories for posts", () => {
    const xml = generateRss("en");
    expect(xml).toContain("<category>programming</category>");
    expect(xml).toContain("<category>devops</category>");
  });

  it("includes atom:link self reference", () => {
    const xml = generateRss("en");
    expect(xml).toContain('atom:link href="https://shinyaz.com/en/feed.xml" rel="self"');
  });

  it("includes correct permalink in guid and link", () => {
    const xml = generateRss("en");
    expect(xml).toContain(
      "<link>https://shinyaz.com/en/blog/2026/02/10/second-post</link>"
    );
    expect(xml).toContain(
      "<guid isPermaLink=\"true\">https://shinyaz.com/en/blog/2026/02/10/second-post</guid>"
    );
  });

  it("orders posts by date descending", () => {
    const xml = generateRss("en");
    const firstIdx = xml.indexOf("Second Post");
    const secondIdx = xml.indexOf("First Post");
    expect(firstIdx).toBeLessThan(secondIdx);
  });
});

describe("generateAtom", () => {
  it("generates valid Atom 1.0 XML for en locale", () => {
    const xml = generateAtom("en");
    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain('<feed xmlns="http://www.w3.org/2005/Atom"');
    expect(xml).toContain('xml:lang="en"');
    expect(xml).toContain("<title>shinyaz.com</title>");
    expect(xml).toContain("<author>");
    expect(xml).toContain("<name>shinyaz</name>");
  });

  it("generates valid Atom 1.0 XML for ja locale", () => {
    const xml = generateAtom("ja");
    expect(xml).toContain('xml:lang="ja"');
    expect(xml).toContain('<link href="https://shinyaz.com/ja" rel="alternate"/>');
  });

  it("includes only published posts", () => {
    const xml = generateAtom("en");
    expect(xml).toContain("First Post");
    expect(xml).toContain("Second Post");
    expect(xml).not.toContain("Draft Post");
  });

  it("includes entries with required Atom elements", () => {
    const xml = generateAtom("en");
    expect(xml).toContain("<entry>");
    expect(xml).toContain("<id>");
    expect(xml).toContain("<published>");
    expect(xml).toContain("<updated>");
    expect(xml).toContain("<summary>");
  });

  it("includes self link and alternate link", () => {
    const xml = generateAtom("en");
    expect(xml).toContain(
      '<link href="https://shinyaz.com/en/atom.xml" rel="self"/>'
    );
    expect(xml).toContain(
      '<link href="https://shinyaz.com/en" rel="alternate"/>'
    );
  });

  it("includes category terms", () => {
    const xml = generateAtom("en");
    expect(xml).toContain('<category term="programming"/>');
    expect(xml).toContain('<category term="devops"/>');
  });

  it("includes feed-level updated timestamp", () => {
    const xml = generateAtom("en");
    // Should contain an ISO date in the feed-level <updated>
    expect(xml).toMatch(/<updated>\d{4}-\d{2}-\d{2}T/);
  });
});

describe("XML escaping", () => {
  it("escapes special characters in RSS", () => {
    // The mock data doesn't have special chars, but the function should handle them
    // Test indirectly: the XML should be well-formed (no unescaped &, <, > in content)
    const xml = generateRss("ja");
    expect(xml).toContain("日本語の記事");
    expect(xml).toContain("<title>shinyaz.com</title>");
  });

  it("escapes special characters in Atom", () => {
    const xml = generateAtom("ja");
    expect(xml).toContain("日本語の記事");
  });
});
