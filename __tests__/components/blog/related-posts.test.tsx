import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RelatedPosts } from "@/components/blog/related-posts";
import type { Post } from "#site/content";

const mockPosts = [
  {
    title: "Related Post 1",
    description: "Description 1",
    date: "2026-01-15T00:00:00.000Z",
    permalink: "/en/blog/2026/01/15/related-1",
    categories: ["programming"],
    tags: ["typescript"],
    locale: "en",
  },
  {
    title: "Related Post 2",
    description: "Description 2",
    date: "2026-02-10T00:00:00.000Z",
    permalink: "/en/blog/2026/02/10/related-2",
    categories: ["programming"],
    tags: ["react"],
    locale: "en",
  },
] as unknown as Post[];

describe("RelatedPosts", () => {
  it("renders nothing when posts array is empty", () => {
    const { container } = render(<RelatedPosts posts={[]} locale="en" />);
    expect(container.innerHTML).toBe("");
  });

  it("renders section with title when posts exist", () => {
    render(<RelatedPosts posts={mockPosts} locale="en" />);
    expect(screen.getByText("Related Posts")).toBeDefined();
  });

  it("renders Japanese title for ja locale", () => {
    render(<RelatedPosts posts={mockPosts} locale="ja" />);
    expect(screen.getByText("関連記事")).toBeDefined();
  });

  it("renders the correct number of post cards", () => {
    render(<RelatedPosts posts={mockPosts} locale="en" />);
    expect(screen.getByText("Related Post 1")).toBeDefined();
    expect(screen.getByText("Related Post 2")).toBeDefined();
  });
});
