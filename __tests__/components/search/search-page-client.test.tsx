import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchPageClient } from "@/components/search/search-page-client";
import { getDictionary } from "@/lib/i18n";
import type { SearchablePost } from "@/lib/search";

const mockReplace = vi.fn();
let mockSearchParams = new URLSearchParams();

vi.mock("next/navigation", () => ({
  useSearchParams: () => mockSearchParams,
  useRouter: () => ({ replace: mockReplace }),
}));

const posts: SearchablePost[] = [
  {
    title: "TypeScript Guide",
    description: "Learn TypeScript",
    date: "2026-01-15T00:00:00.000Z",
    permalink: "/en/blog/2026/01/15/typescript-guide",
    categories: ["programming"],
    tags: ["typescript"],
  },
  {
    title: "Docker Basics",
    description: "Getting started with Docker",
    date: "2026-02-01T00:00:00.000Z",
    permalink: "/en/blog/2026/02/01/docker-basics",
    categories: ["devops"],
    tags: ["docker"],
  },
];

describe("SearchPageClient", () => {
  const t = getDictionary("en");

  beforeEach(() => {
    mockSearchParams = new URLSearchParams();
    mockReplace.mockClear();
  });

  it("renders search input with placeholder", () => {
    render(<SearchPageClient posts={posts} locale="en" t={t} />);
    expect(screen.getByPlaceholderText("Search posts...")).toBeDefined();
  });

  it("shows no results initially when query is empty", () => {
    render(<SearchPageClient posts={posts} locale="en" t={t} />);
    expect(screen.queryByText(/post\(s\) found/)).toBeNull();
  });

  it("filters posts based on search input", () => {
    render(<SearchPageClient posts={posts} locale="en" t={t} />);
    const input = screen.getByPlaceholderText("Search posts...");
    fireEvent.change(input, { target: { value: "TypeScript" } });
    expect(screen.getByText("TypeScript Guide")).toBeDefined();
    expect(screen.queryByText("Docker Basics")).toBeNull();
    expect(screen.getByText("1 post(s) found")).toBeDefined();
  });

  it("shows no results message for non-matching query", () => {
    render(<SearchPageClient posts={posts} locale="en" t={t} />);
    const input = screen.getByPlaceholderText("Search posts...");
    fireEvent.change(input, { target: { value: "python" } });
    expect(
      screen.getByText('No posts found matching "python".'),
    ).toBeDefined();
  });

  it("updates URL when typing", () => {
    render(<SearchPageClient posts={posts} locale="en" t={t} />);
    const input = screen.getByPlaceholderText("Search posts...");
    fireEvent.change(input, { target: { value: "docker" } });
    expect(mockReplace).toHaveBeenCalledWith("/en/search?q=docker", {
      scroll: false,
    });
  });

  it("initializes query from URL search params", () => {
    mockSearchParams = new URLSearchParams("q=TypeScript");
    render(<SearchPageClient posts={posts} locale="en" t={t} />);
    expect(screen.getByText("TypeScript Guide")).toBeDefined();
  });

  it("works with Japanese locale", () => {
    const tJa = getDictionary("ja");
    render(<SearchPageClient posts={posts} locale="ja" t={tJa} />);
    expect(screen.getByPlaceholderText("記事を検索...")).toBeDefined();
  });
});
