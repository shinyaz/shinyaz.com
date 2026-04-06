import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SeriesNavigation } from "@/components/blog/series-navigation";
import type { Post } from "#site/content";

const makePost = (i: number, extra = false) =>
  ({
    title: `Post ${i + 1}`,
    permalink: `/en/blog/2026/01/${String(i + 1).padStart(2, "0")}/post-${i + 1}`,
    seriesExtra: extra,
  }) as unknown as Post;

describe("SeriesNavigation", () => {
  it("renders nothing when fewer than 2 posts", () => {
    const { container } = render(
      <SeriesNavigation seriesPosts={[makePost(0)]} currentPermalink={makePost(0).permalink} locale="en" />
    );
    expect(container.innerHTML).toBe("");
  });

  it("renders ordered list of posts", () => {
    const posts = [makePost(0), makePost(1), makePost(2)];
    render(
      <SeriesNavigation seriesPosts={posts} currentPermalink={posts[1].permalink} locale="en" />
    );
    expect(screen.getByText("Post 1")).toBeDefined();
    expect(screen.getByText("Post 2")).toBeDefined();
    expect(screen.getByText("Post 3")).toBeDefined();
  });

  it("marks current post with 'this article' label", () => {
    const posts = [makePost(0), makePost(1)];
    render(
      <SeriesNavigation seriesPosts={posts} currentPermalink={posts[0].permalink} locale="en" />
    );
    expect(screen.getByText(/this article/)).toBeDefined();
  });

  it("separates extra posts into a separate section", () => {
    const posts = [makePost(0), makePost(1), makePost(2, true)];
    render(
      <SeriesNavigation seriesPosts={posts} currentPermalink={posts[0].permalink} locale="en" />
    );
    expect(screen.getByText("Extra")).toBeDefined();
    expect(screen.getByText("Post 3")).toBeDefined();
  });

  it("shows counter", () => {
    const posts = [makePost(0), makePost(1), makePost(2)];
    render(
      <SeriesNavigation seriesPosts={posts} currentPermalink={posts[1].permalink} locale="en" />
    );
    expect(screen.getByText("2 / 3")).toBeDefined();
  });

  it("uses custom seriesTitle when provided", () => {
    const posts = [makePost(0), makePost(1)];
    render(
      <SeriesNavigation
        seriesPosts={posts}
        currentPermalink={posts[0].permalink}
        locale="en"
        seriesTitle={{ name: "Custom", suffix: " Series" }}
      />
    );
    expect(screen.getByText("Custom")).toBeDefined();
  });

  it("renders Japanese labels for ja locale", () => {
    const posts = [makePost(0), makePost(1)];
    render(
      <SeriesNavigation seriesPosts={posts} currentPermalink={posts[0].permalink} locale="ja" />
    );
    expect(screen.getByText(/本記事/)).toBeDefined();
  });
});
