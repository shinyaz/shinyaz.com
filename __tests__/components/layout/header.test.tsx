import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "@/components/layout/header";

// Mock the client components that Header imports
vi.mock("@/components/theme/theme-toggle", () => ({
  ThemeToggle: () => <button>theme-toggle</button>,
}));

vi.mock("@/components/layout/language-switcher", () => ({
  LanguageSwitcher: () => <button>language-switcher</button>,
}));

describe("Header", () => {
  it("renders site name", () => {
    render(<Header locale="en" />);
    expect(screen.getByText("shinyaz Blog")).toBeDefined();
  });

  it("renders navigation links", () => {
    render(<Header locale="en" />);
    expect(screen.getByText("Blog")).toBeDefined();
    expect(screen.getByText("Projects")).toBeDefined();
    expect(screen.getByText("Uses")).toBeDefined();
    expect(screen.getByText("About")).toBeDefined();
  });

  it("links use correct en locale prefix", () => {
    render(<Header locale="en" />);
    const blogLink = screen.getByText("Blog").closest("a");
    expect(blogLink?.getAttribute("href")).toBe("/en/blog");
  });

  it("links use correct ja locale prefix", () => {
    render(<Header locale="ja" />);
    const blogLink = screen.getByText("Blog").closest("a");
    expect(blogLink?.getAttribute("href")).toBe("/ja/blog");
  });

  it("site name links to locale root", () => {
    render(<Header locale="en" />);
    const homeLink = screen.getByText("shinyaz Blog").closest("a");
    expect(homeLink?.getAttribute("href")).toBe("/en");
  });

  it("renders search icon link for en locale", () => {
    render(<Header locale="en" />);
    const searchLink = screen.getByLabelText("Search");
    expect(searchLink.closest("a")?.getAttribute("href")).toBe("/en/search");
  });

  it("renders search icon link for ja locale", () => {
    render(<Header locale="ja" />);
    const searchLink = screen.getByLabelText("検索");
    expect(searchLink.closest("a")?.getAttribute("href")).toBe("/ja/search");
  });
});
