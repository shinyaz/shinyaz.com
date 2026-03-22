import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Pagination } from "@/components/blog/pagination";

describe("Pagination", () => {
  it("returns null when totalPages <= 1", () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} basePath="/en/blog" locale="en" />
    );
    expect(container.innerHTML).toBe("");
  });

  it("shows disabled prev on first page", () => {
    render(
      <Pagination currentPage={1} totalPages={3} basePath="/en/blog" locale="en" />
    );
    const prevSpan = screen.getByText("Prev");
    expect(prevSpan.tagName).toBe("SPAN");
    expect(prevSpan.className).toContain("opacity-40");
  });

  it("shows disabled next on last page", () => {
    render(
      <Pagination currentPage={3} totalPages={3} basePath="/en/blog" locale="en" />
    );
    const nextSpan = screen.getByText("Next");
    expect(nextSpan.tagName).toBe("SPAN");
    expect(nextSpan.className).toContain("opacity-40");
  });

  it("shows clickable prev and next on middle pages", () => {
    render(
      <Pagination currentPage={2} totalPages={3} basePath="/en/blog" locale="en" />
    );
    const prevLink = screen.getByRole("link", { name: "Prev" });
    const nextLink = screen.getByRole("link", { name: "Next" });
    expect(prevLink).toBeDefined();
    expect(nextLink).toBeDefined();
  });

  it("displays all page numbers when totalPages <= 7", () => {
    render(
      <Pagination currentPage={2} totalPages={5} basePath="/en/blog" locale="en" />
    );
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByText(String(i))).toBeDefined();
    }
  });

  it("highlights current page without link", () => {
    render(
      <Pagination currentPage={3} totalPages={5} basePath="/en/blog" locale="en" />
    );
    const current = screen.getByText("3");
    expect(current.tagName).toBe("SPAN");
    expect(current.getAttribute("aria-current")).toBe("page");
  });

  it("renders page number as link for non-current page", () => {
    render(
      <Pagination currentPage={1} totalPages={5} basePath="/en/blog" locale="en" />
    );
    const link = screen.getByRole("link", { name: "3" });
    expect(link.getAttribute("href")).toBe("/en/blog?page=3");
  });

  it("uses basePath without query for page 1", () => {
    render(
      <Pagination currentPage={3} totalPages={5} basePath="/en/blog" locale="en" />
    );
    const link = screen.getByRole("link", { name: "1" });
    expect(link.getAttribute("href")).toBe("/en/blog");
  });

  it("shows ellipsis when totalPages > 7", () => {
    render(
      <Pagination currentPage={5} totalPages={10} basePath="/en/blog" locale="en" />
    );
    const ellipses = screen.getAllByText("…");
    expect(ellipses).toHaveLength(2);
    expect(screen.getByText("1")).toBeDefined();
    expect(screen.getByText("10")).toBeDefined();
    expect(screen.getByText("4")).toBeDefined();
    expect(screen.getByText("5")).toBeDefined();
    expect(screen.getByText("6")).toBeDefined();
  });
});
