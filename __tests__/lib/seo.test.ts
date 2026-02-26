import { describe, it, expect } from "vitest";
import { buildAlternateLanguages } from "@/lib/seo";

describe("buildAlternateLanguages", () => {
  it("generates URLs for all locales", () => {
    const result = buildAlternateLanguages((locale) => `/${locale}/blog`);
    expect(result).toHaveProperty("ja");
    expect(result).toHaveProperty("en");
    expect(result.ja).toContain("/ja/blog");
    expect(result.en).toContain("/en/blog");
  });

  it("prepends SITE_URL to paths", () => {
    const result = buildAlternateLanguages((locale) => `/${locale}`);
    expect(result.en).toMatch(/^https?:\/\//);
  });
});
