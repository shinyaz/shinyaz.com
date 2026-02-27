import { describe, it, expect } from "vitest";
import { searchPosts, type SearchablePost } from "@/lib/search";

const posts: SearchablePost[] = [
  {
    title: "Getting Started with TypeScript",
    description: "A beginner guide to TypeScript",
    date: "2026-01-15T00:00:00.000Z",
    permalink: "/en/blog/2026/01/15/getting-started-typescript",
    categories: ["programming"],
    tags: ["typescript", "javascript"],
  },
  {
    title: "Docker入門",
    description: "Dockerの基本的な使い方",
    date: "2026-02-01T00:00:00.000Z",
    permalink: "/ja/blog/2026/02/01/docker-intro",
    categories: ["devops"],
    tags: ["docker", "container"],
  },
  {
    title: "React Hooks Deep Dive",
    description: "Understanding useState and useEffect",
    date: "2026-02-10T00:00:00.000Z",
    permalink: "/en/blog/2026/02/10/react-hooks",
    categories: ["programming"],
    tags: ["react", "javascript"],
  },
];

describe("searchPosts", () => {
  it("returns empty array for empty query", () => {
    expect(searchPosts(posts, "")).toEqual([]);
    expect(searchPosts(posts, "   ")).toEqual([]);
  });

  it("matches title case-insensitively", () => {
    const results = searchPosts(posts, "typescript");
    expect(results).toHaveLength(1);
    expect(results[0].post.title).toBe("Getting Started with TypeScript");
  });

  it("matches description", () => {
    const results = searchPosts(posts, "beginner");
    expect(results).toHaveLength(1);
    expect(results[0].post.title).toBe("Getting Started with TypeScript");
  });

  it("matches tags", () => {
    const results = searchPosts(posts, "docker");
    expect(results).toHaveLength(1);
    expect(results[0].post.title).toBe("Docker入門");
  });

  it("matches categories", () => {
    const results = searchPosts(posts, "devops");
    expect(results).toHaveLength(1);
    expect(results[0].post.title).toBe("Docker入門");
  });

  it("performs AND search with multiple tokens", () => {
    const results = searchPosts(posts, "react javascript");
    expect(results).toHaveLength(1);
    expect(results[0].post.title).toBe("React Hooks Deep Dive");
  });

  it("returns multiple matches", () => {
    const results = searchPosts(posts, "javascript");
    expect(results).toHaveLength(2);
  });

  it("matches Japanese text", () => {
    const results = searchPosts(posts, "入門");
    expect(results).toHaveLength(1);
    expect(results[0].post.title).toBe("Docker入門");
  });

  it("returns no results for non-matching query", () => {
    const results = searchPosts(posts, "python");
    expect(results).toHaveLength(0);
  });

  it("AND search fails when one token does not match", () => {
    const results = searchPosts(posts, "typescript python");
    expect(results).toHaveLength(0);
  });

  it("includes matchedFields in results", () => {
    const results = searchPosts(posts, "typescript");
    expect(results[0].matchedFields).toContain("title");
    expect(results[0].matchedFields).toContain("tags");
  });
});
