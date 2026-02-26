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
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
    const prevLink = links.find((l) => l.textContent === "Prev");
    const nextLink = links.find((l) => l.textContent === "Next");
    expect(prevLink).toBeDefined();
    expect(nextLink).toBeDefined();
  });

  it("displays correct page info", () => {
    render(
      <Pagination currentPage={2} totalPages={5} basePath="/en/blog" locale="en" />
    );
    expect(screen.getByText("2 / 5")).toBeDefined();
  });
});
