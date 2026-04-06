import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";

describe("sitemap", () => {
  const entries = sitemap();

  it("returns a non-empty array", () => {
    expect(entries.length).toBeGreaterThan(0);
  });

  it("includes home pages for both locales", () => {
    const urls = entries.map((e) => e.url);
    expect(urls).toContain("https://shinyaz.com/en");
    expect(urls).toContain("https://shinyaz.com/ja");
  });

  it("includes blog listing pages for both locales", () => {
    const urls = entries.map((e) => e.url);
    expect(urls).toContain("https://shinyaz.com/en/blog");
    expect(urls).toContain("https://shinyaz.com/ja/blog");
  });

  it("includes static pages for both locales", () => {
    const urls = entries.map((e) => e.url);
    for (const page of ["about", "projects", "uses", "privacy", "now", "colophon"]) {
      expect(urls).toContain(`https://shinyaz.com/en/${page}`);
      expect(urls).toContain(`https://shinyaz.com/ja/${page}`);
    }
  });

  it("includes category and tag index pages", () => {
    const urls = entries.map((e) => e.url);
    expect(urls).toContain("https://shinyaz.com/en/category");
    expect(urls).toContain("https://shinyaz.com/en/tag");
  });

  it("includes TIL index pages", () => {
    const urls = entries.map((e) => e.url);
    expect(urls).toContain("https://shinyaz.com/en/til");
    expect(urls).toContain("https://shinyaz.com/ja/til");
  });

  it("includes blog post entries", () => {
    const postEntries = entries.filter((e) => e.url.includes("/blog/2026/"));
    expect(postEntries.length).toBeGreaterThan(0);
  });

  it("includes TIL entries", () => {
    const tilEntries = entries.filter((e) => e.url.includes("/til/2026/"));
    expect(tilEntries.length).toBeGreaterThan(0);
  });

  it("home page has hreflang alternates with x-default", () => {
    const home = entries.find((e) => e.url === "https://shinyaz.com/en");
    expect(home?.alternates?.languages).toBeDefined();
    const langs = home!.alternates!.languages as Record<string, string>;
    expect(langs["en"]).toBe("https://shinyaz.com/en");
    expect(langs["ja"]).toBe("https://shinyaz.com/ja");
    expect(langs["x-default"]).toBe("https://shinyaz.com/en");
  });

  it("does not include draft posts", () => {
    const urls = entries.map((e) => e.url);
    const hasDraft = urls.some((u) => u.includes("draft-post"));
    expect(hasDraft).toBe(false);
  });

  it("post entries have lastModified", () => {
    const postEntry = entries.find((e) => e.url.includes("/blog/2026/01/15/first-post"));
    expect(postEntry?.lastModified).toBeDefined();
  });
});
