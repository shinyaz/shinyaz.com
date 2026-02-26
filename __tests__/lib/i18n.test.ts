import { describe, it, expect } from "vitest";
import { isValidLocale, getDictionary, locales, defaultLocale } from "@/lib/i18n";

describe("isValidLocale", () => {
  it("returns true for 'ja'", () => {
    expect(isValidLocale("ja")).toBe(true);
  });

  it("returns true for 'en'", () => {
    expect(isValidLocale("en")).toBe(true);
  });

  it("returns false for unsupported locale", () => {
    expect(isValidLocale("fr")).toBe(false);
    expect(isValidLocale("")).toBe(false);
    expect(isValidLocale("EN")).toBe(false);
  });
});

describe("getDictionary", () => {
  it("returns Japanese dictionary", () => {
    const dict = getDictionary("ja");
    expect(dict.site.name).toBe("shinyaz Blog");
    expect(dict.blog.empty).toBe("記事がありません。");
  });

  it("returns English dictionary", () => {
    const dict = getDictionary("en");
    expect(dict.site.name).toBe("shinyaz Blog");
    expect(dict.blog.empty).toBe("No posts found.");
  });

  it("dictionaries have the same keys", () => {
    const ja = getDictionary("ja");
    const en = getDictionary("en");
    expect(Object.keys(ja)).toEqual(Object.keys(en));
  });
});

describe("locales and defaultLocale", () => {
  it("locales contains ja and en", () => {
    expect(locales).toContain("ja");
    expect(locales).toContain("en");
    expect(locales).toHaveLength(2);
  });

  it("defaultLocale is en", () => {
    expect(defaultLocale).toBe("en");
  });
});
