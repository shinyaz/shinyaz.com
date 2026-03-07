import { describe, it, expect } from "vitest";
import { cn, formatDate, formatReadingTime } from "@/lib/utils";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles conditional classes", () => {
    expect(cn("foo", false && "bar", "baz")).toBe("foo baz");
  });

  it("resolves Tailwind conflicts via tailwind-merge", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });
});

describe("formatDate", () => {
  it("formats date for en locale", () => {
    const result = formatDate("2026-01-15T00:00:00.000Z", "en");
    expect(result).toContain("January");
    expect(result).toContain("15");
    expect(result).toContain("2026");
  });

  it("formats date for ja locale", () => {
    const result = formatDate("2026-01-15T00:00:00.000Z", "ja");
    expect(result).toContain("2026");
    expect(result).toContain("1");
    expect(result).toContain("15");
  });

  it("defaults to ja locale", () => {
    const result = formatDate("2026-06-01T00:00:00.000Z");
    expect(result).toContain("2026");
  });
});

describe("formatReadingTime", () => {
  it("formats for en locale", () => {
    expect(formatReadingTime(5, "en")).toBe("5 min read");
  });

  it("formats for ja locale", () => {
    expect(formatReadingTime(5, "ja")).toBe("約5分");
  });
});
