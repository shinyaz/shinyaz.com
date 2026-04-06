import { describe, it, expect } from "vitest";
import { generateTilStaticParams } from "@/lib/til-params";

describe("generateTilStaticParams", () => {
  it("returns params for all published TILs across locales", () => {
    const params = generateTilStaticParams();
    expect(params.length).toBeGreaterThan(0);
  });

  it("each param has locale, year, month, day, and slug", () => {
    const params = generateTilStaticParams();
    for (const p of params) {
      expect(p).toHaveProperty("locale");
      expect(p).toHaveProperty("year");
      expect(p).toHaveProperty("month");
      expect(p).toHaveProperty("day");
      expect(p).toHaveProperty("slug");
    }
  });

  it("does not include draft TILs", () => {
    const params = generateTilStaticParams();
    const hasDraft = params.some((p) => p.slug === "draft-til");
    expect(hasDraft).toBe(false);
  });

  it("includes both en and ja locales", () => {
    const params = generateTilStaticParams();
    const locales = new Set(params.map((p) => p.locale));
    expect(locales.has("en")).toBe(true);
    expect(locales.has("ja")).toBe(true);
  });

  it("includes known published TIL slugs", () => {
    const params = generateTilStaticParams();
    const slugs = params.map((p) => p.slug);
    expect(slugs).toContain("nextjs-use-cache-directive");
  });
});
