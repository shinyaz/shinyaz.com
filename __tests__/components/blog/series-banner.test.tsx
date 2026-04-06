import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SeriesBanner } from "@/components/blog/series-banner";
import type { Post } from "#site/content";

const makePosts = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    title: `Post ${i + 1}`,
    permalink: `/en/blog/2026/01/${String(i + 1).padStart(2, "0")}/post-${i + 1}`,
  })) as unknown as Post[];

describe("SeriesBanner", () => {
  it("renders nothing when fewer than 2 posts", () => {
    const { container } = render(
      <SeriesBanner seriesPosts={makePosts(1)} currentPermalink="/en/blog/2026/01/01/post-1" locale="en" />
    );
    expect(container.innerHTML).toBe("");
  });

  it("renders nav with progress and counter", () => {
    const posts = makePosts(3);
    render(
      <SeriesBanner seriesPosts={posts} currentPermalink={posts[1].permalink} locale="en" />
    );
    expect(screen.getByText("2 / 3")).toBeDefined();
    expect(screen.getByRole("navigation")).toBeDefined();
  });

  it("shows prev and next links on middle post", () => {
    const posts = makePosts(3);
    render(
      <SeriesBanner seriesPosts={posts} currentPermalink={posts[1].permalink} locale="en" />
    );
    expect(screen.getByText(/Previous/)).toBeDefined();
    expect(screen.getByText(/Next/)).toBeDefined();
  });

  it("hides prev on first post", () => {
    const posts = makePosts(3);
    render(
      <SeriesBanner seriesPosts={posts} currentPermalink={posts[0].permalink} locale="en" />
    );
    expect(screen.queryByText(/Previous/)).toBeNull();
    expect(screen.getByText(/Next/)).toBeDefined();
  });

  it("hides next on last post", () => {
    const posts = makePosts(3);
    render(
      <SeriesBanner seriesPosts={posts} currentPermalink={posts[2].permalink} locale="en" />
    );
    expect(screen.getByText(/Previous/)).toBeDefined();
    expect(screen.queryByText(/Next/)).toBeNull();
  });

  it("uses custom seriesTitle when provided", () => {
    const posts = makePosts(2);
    render(
      <SeriesBanner
        seriesPosts={posts}
        currentPermalink={posts[0].permalink}
        locale="en"
        seriesTitle={{ name: "My Series", suffix: " Series" }}
      />
    );
    expect(screen.getByText("My Series")).toBeDefined();
    const nav = screen.getByRole("navigation");
    expect(nav.getAttribute("aria-label")).toBe("My Series Series");
  });

  it("renders Japanese labels for ja locale", () => {
    const posts = makePosts(3);
    render(
      <SeriesBanner seriesPosts={posts} currentPermalink={posts[1].permalink} locale="ja" />
    );
    expect(screen.getByText(/前の記事/)).toBeDefined();
    expect(screen.getByText(/次の記事/)).toBeDefined();
  });
});
