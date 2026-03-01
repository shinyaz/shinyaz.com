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
    expect(dict.site.name).toBe("shinyaz.com");
    expect(dict.blog.empty).toBe("記事がありません。");
  });

  it("returns English dictionary", () => {
    const dict = getDictionary("en");
    expect(dict.site.name).toBe("shinyaz.com");
    expect(dict.blog.empty).toBe("No posts found.");
  });

  it("dictionaries have the same keys", () => {
    const ja = getDictionary("ja");
    const en = getDictionary("en");
    expect(Object.keys(ja)).toEqual(Object.keys(en));
  });

  it("has category section with required keys", () => {
    const ja = getDictionary("ja");
    const en = getDictionary("en");
    expect(ja.category.title).toBe("カテゴリ");
    expect(ja.category.description).toBeTruthy();
    expect(ja.category.postCount).toContain("{count}");
    expect(en.category.title).toBe("Categories");
    expect(en.category.description).toBeTruthy();
    expect(en.category.postCount).toContain("{count}");
  });

  it("has tag index keys", () => {
    const ja = getDictionary("ja");
    const en = getDictionary("en");
    expect(ja.tag.indexTitle).toBe("タグ");
    expect(ja.tag.indexDescription).toBeTruthy();
    expect(en.tag.indexTitle).toBe("Tags");
    expect(en.tag.indexDescription).toBeTruthy();
  });

  it("has blog browse links keys", () => {
    const ja = getDictionary("ja");
    const en = getDictionary("en");
    expect(ja.blog.browseCategories).toBeTruthy();
    expect(ja.blog.browseTags).toBeTruthy();
    expect(en.blog.browseCategories).toBeTruthy();
    expect(en.blog.browseTags).toBeTruthy();
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
