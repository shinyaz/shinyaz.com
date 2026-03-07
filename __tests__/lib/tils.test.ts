import { describe, it, expect } from "vitest";
import {
  getPublishedTils,
  getTilBySlug,
  getTilsByTag,
  getPaginatedTils,
  getAllTilTags,
} from "@/lib/tils";

describe("getPublishedTils", () => {
  it("excludes unpublished TILs", () => {
    const tils = getPublishedTils();
    expect(tils.every((t) => t.published)).toBe(true);
    expect(tils.find((t) => t.slugName === "draft-til")).toBeUndefined();
  });

  it("sorts by date descending", () => {
    const tils = getPublishedTils();
    for (let i = 1; i < tils.length; i++) {
      expect(new Date(tils[i - 1].date).getTime()).toBeGreaterThanOrEqual(
        new Date(tils[i].date).getTime()
      );
    }
  });

  it("filters by locale", () => {
    const enTils = getPublishedTils("en");
    expect(enTils.every((t) => t.locale === "en")).toBe(true);

    const jaTils = getPublishedTils("ja");
    expect(jaTils.every((t) => t.locale === "ja")).toBe(true);
  });

  it("returns all locales when no locale is specified", () => {
    const all = getPublishedTils();
    const locales = new Set(all.map((t) => t.locale));
    expect(locales.size).toBeGreaterThan(1);
  });
});

describe("getTilBySlug", () => {
  it("returns a TIL by date and slug", () => {
    const til = getTilBySlug("2026", "03", "07", "nextjs-use-cache-directive", "en");
    expect(til).toBeDefined();
    expect(til?.title).toBe("TIL: Next.js use cache directive");
  });

  it("returns undefined for a non-existent slug", () => {
    const til = getTilBySlug("2026", "03", "07", "non-existent", "en");
    expect(til).toBeUndefined();
  });

  it("returns undefined for a wrong locale", () => {
    const til = getTilBySlug("2026", "03", "07", "nextjs-use-cache-directive", "ja");
    expect(til).toBeDefined();
    expect(til?.locale).toBe("ja");
  });

  it("returns undefined for unpublished TIL", () => {
    const til = getTilBySlug("2026", "03", "06", "draft-til", "en");
    expect(til).toBeUndefined();
  });
});

describe("getTilsByTag", () => {
  it("returns TILs with the specified tag", () => {
    const tils = getTilsByTag("nextjs");
    expect(tils.length).toBeGreaterThan(0);
    expect(tils.every((t) => t.tags.includes("nextjs"))).toBe(true);
  });

  it("returns empty array for a non-existent tag", () => {
    const tils = getTilsByTag("nonexistent-tag");
    expect(tils).toHaveLength(0);
  });

  it("filters by locale when provided", () => {
    const enTils = getTilsByTag("nextjs", "en");
    expect(enTils.every((t) => t.locale === "en")).toBe(true);
  });
});

describe("getPaginatedTils", () => {
  it("returns first page of TILs", () => {
    const { tils, currentPage, totalPages } = getPaginatedTils(1);
    expect(currentPage).toBe(1);
    expect(totalPages).toBeGreaterThanOrEqual(1);
    expect(tils.length).toBeGreaterThan(0);
  });

  it("uses provided TILs array", () => {
    const allTils = getPublishedTils("en");
    const { tils } = getPaginatedTils(1, allTils);
    expect(tils.every((t) => t.locale === "en")).toBe(true);
  });

  it("returns empty array for out-of-range page", () => {
    const { tils } = getPaginatedTils(999);
    expect(tils).toHaveLength(0);
  });
});

describe("getAllTilTags", () => {
  it("returns unique sorted tags from published TILs", () => {
    const tags = getAllTilTags();
    expect(tags.length).toBeGreaterThan(0);
    expect(tags).toEqual([...tags].sort());
    expect(new Set(tags).size).toBe(tags.length);
  });

  it("excludes tags from unpublished TILs", () => {
    const tags = getAllTilTags("en");
    expect(tags).not.toContain("draft");
  });

  it("filters by locale when provided", () => {
    const enTags = getAllTilTags("en");
    const jaTags = getAllTilTags("ja");
    expect(enTags.length).toBeGreaterThan(0);
    expect(jaTags.length).toBeGreaterThan(0);
  });
});
