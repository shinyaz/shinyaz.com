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
    const prevSpan = screen.getAllByText("Prev")[0];
    expect(prevSpan.tagName).toBe("SPAN");
    expect(prevSpan.className).toContain("opacity-40");
  });

  it("shows disabled next on last page", () => {
    render(
      <Pagination currentPage={3} totalPages={3} basePath="/en/blog" locale="en" />
    );
    const nextSpan = screen.getAllByText("Next")[0];
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
      expect(screen.getAllByText(String(i)).length).toBeGreaterThanOrEqual(1);
    }
  });

  it("highlights current page without link", () => {
    render(
      <Pagination currentPage={3} totalPages={5} basePath="/en/blog" locale="en" />
    );
    const currents = screen.getAllByText("3");
    const current = currents.find((el) => el.getAttribute("aria-current") === "page");
    expect(current).toBeDefined();
    expect(current!.tagName).toBe("SPAN");
  });

  it("renders page number as link for non-current page", () => {
    render(
      <Pagination currentPage={1} totalPages={5} basePath="/en/blog" locale="en" />
    );
    const links = screen.getAllByRole("link", { name: "3" });
    expect(links.length).toBeGreaterThanOrEqual(1);
    expect(links[0].getAttribute("href")).toBe("/en/blog?page=3");
  });

  it("uses basePath without query for page 1", () => {
    render(
      <Pagination currentPage={3} totalPages={5} basePath="/en/blog" locale="en" />
    );
    const links = screen.getAllByRole("link", { name: "1" });
    expect(links.length).toBeGreaterThanOrEqual(1);
    expect(links[0].getAttribute("href")).toBe("/en/blog");
  });

  it("shows ellipsis when totalPages > 7", () => {
    render(
      <Pagination currentPage={5} totalPages={10} basePath="/en/blog" locale="en" />
    );
    const ellipses = screen.getAllByText("…");
    expect(ellipses.length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText("1").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("10").length).toBeGreaterThanOrEqual(1);
  });
});
