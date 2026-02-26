import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CategoryBadge } from "@/components/blog/category-badge";

describe("CategoryBadge", () => {
  it("renders a link with correct href", () => {
    render(<CategoryBadge slug="programming" locale="en" />);
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe("/en/category/programming");
  });

  it("shows name when provided", () => {
    render(<CategoryBadge slug="programming" name="Programming" locale="en" />);
    expect(screen.getByText("Programming")).toBeDefined();
  });

  it("falls back to slug when name is not provided", () => {
    render(<CategoryBadge slug="programming" locale="en" />);
    expect(screen.getByText("programming")).toBeDefined();
  });

  it("uses correct locale prefix", () => {
    render(<CategoryBadge slug="devops" locale="ja" />);
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe("/ja/category/devops");
  });
});
