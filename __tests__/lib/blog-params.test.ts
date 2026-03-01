import { describe, it, expect } from "vitest";
import { generateBlogStaticParams } from "@/lib/blog-params";

describe("generateBlogStaticParams", () => {
  it("returns params for all published posts across locales", () => {
    const params = generateBlogStaticParams();
    expect(params.length).toBeGreaterThan(0);
  });

  it("each param has locale, year, month, day, and slug", () => {
    const params = generateBlogStaticParams();
    for (const p of params) {
      expect(p).toHaveProperty("locale");
      expect(p).toHaveProperty("year");
      expect(p).toHaveProperty("month");
      expect(p).toHaveProperty("day");
      expect(p).toHaveProperty("slug");
    }
  });

  it("does not include draft posts", () => {
    const params = generateBlogStaticParams();
    const hasDraft = params.some((p) => p.slug === "draft-post");
    expect(hasDraft).toBe(false);
  });

  it("includes both en and ja locales", () => {
    const params = generateBlogStaticParams();
    const locales = new Set(params.map((p) => p.locale));
    expect(locales.has("en")).toBe(true);
    expect(locales.has("ja")).toBe(true);
  });

  it("includes known published post slugs", () => {
    const params = generateBlogStaticParams();
    const slugs = params.map((p) => p.slug);
    expect(slugs).toContain("first-post");
    expect(slugs).toContain("japanese-post");
  });
});
