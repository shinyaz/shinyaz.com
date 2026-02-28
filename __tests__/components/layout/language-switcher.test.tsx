import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { LanguageSwitcher } from "@/components/layout/language-switcher";

let mockPathname = "/en/blog";
vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname,
}));

describe("LanguageSwitcher", () => {
  it("shows 'JP' when current locale is en", () => {
    mockPathname = "/en/blog";
    render(<LanguageSwitcher locale="en" />);
    expect(screen.getByText("JP")).toBeDefined();
  });

  it("shows 'EN' when current locale is ja", () => {
    mockPathname = "/ja/blog";
    render(<LanguageSwitcher locale="ja" />);
    expect(screen.getByText("EN")).toBeDefined();
  });

  it("links to ja path when current locale is en", () => {
    mockPathname = "/en/blog";
    render(<LanguageSwitcher locale="en" />);
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe("/ja/blog");
  });

  it("links to en path when current locale is ja", () => {
    mockPathname = "/ja/blog";
    render(<LanguageSwitcher locale="ja" />);
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe("/en/blog");
  });

  it("replaces locale in nested paths correctly", () => {
    mockPathname = "/en/blog/2026/01/15/test-post";
    render(<LanguageSwitcher locale="en" />);
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe("/ja/blog/2026/01/15/test-post");
  });

  it("only replaces the leading locale segment, not occurrences elsewhere in the path", () => {
    mockPathname = "/en/blog/2026/01/15/en-post";
    render(<LanguageSwitcher locale="en" />);
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe("/ja/blog/2026/01/15/en-post");
  });

  it("handles root locale path", () => {
    mockPathname = "/ja";
    render(<LanguageSwitcher locale="ja" />);
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe("/en");
  });
});
