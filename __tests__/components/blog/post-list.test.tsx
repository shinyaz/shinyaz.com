import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PostList } from "@/components/blog/post-list";

const samplePosts = [
  {
    title: "Post A",
    description: "Description A",
    date: "2026-01-01T00:00:00.000Z",
    permalink: "/en/blog/2026/01/01/post-a",
    categories: ["programming"],
    tags: ["typescript"],
  },
  {
    title: "Post B",
    date: "2026-02-01T00:00:00.000Z",
    permalink: "/en/blog/2026/02/01/post-b",
    categories: [],
    tags: [],
  },
];

describe("PostList", () => {
  it("shows empty message when no posts", () => {
    render(<PostList posts={[]} locale="en" />);
    expect(screen.getByText("No posts found.")).toBeDefined();
  });

  it("shows Japanese empty message for ja locale", () => {
    render(<PostList posts={[]} locale="ja" />);
    expect(screen.getByText("記事がありません。")).toBeDefined();
  });

  it("renders PostCards for each post", () => {
    render(<PostList posts={samplePosts} locale="en" />);
    expect(screen.getByText("Post A")).toBeDefined();
    expect(screen.getByText("Post B")).toBeDefined();
  });
});
