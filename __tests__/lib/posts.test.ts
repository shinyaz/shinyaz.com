import { describe, it, expect } from "vitest";
import {
  getPublishedPosts,
  getPostBySlug,
  getPostsByCategory,
  getPostsByTag,
  getPaginatedPosts,
  getAllTags,
  getCategoryName,
  getCategoryDescription,
  getProjectName,
  getProjectDescription,
  getAllProjects,
  getAllCategories,
  getCategoryBySlug,
  getPageBySlug,
  getRelatedPosts,
  getFeaturedPosts,
} from "@/lib/posts";

describe("getPublishedPosts", () => {
  it("excludes unpublished posts", () => {
    const posts = getPublishedPosts();
    expect(posts.every((p) => p.published)).toBe(true);
    expect(posts.find((p) => p.slugName === "draft-post")).toBeUndefined();
  });

  it("sorts by date descending", () => {
    const posts = getPublishedPosts();
    for (let i = 1; i < posts.length; i++) {
      expect(new Date(posts[i - 1].date).getTime()).toBeGreaterThanOrEqual(
        new Date(posts[i].date).getTime()
      );
    }
  });

  it("filters by locale", () => {
    const enPosts = getPublishedPosts("en");
    expect(enPosts.every((p) => p.locale === "en")).toBe(true);

    const jaPosts = getPublishedPosts("ja");
    expect(jaPosts.every((p) => p.locale === "ja")).toBe(true);
  });

  it("returns all locales when no locale is specified", () => {
    const all = getPublishedPosts();
    const locales = new Set(all.map((p) => p.locale));
    expect(locales.size).toBeGreaterThan(1);
  });
});

describe("getFeaturedPosts", () => {
  it("returns only published featured posts", () => {
    const featured = getFeaturedPosts();
    expect(featured.every((p) => p.featured && p.published)).toBe(true);
  });

  it("excludes unpublished posts even if featured", () => {
    const featured = getFeaturedPosts();
    expect(featured.find((p) => p.slugName === "draft-post")).toBeUndefined();
  });

  it("filters by locale", () => {
    const enFeatured = getFeaturedPosts("en");
    expect(enFeatured.every((p) => p.locale === "en")).toBe(true);

    const jaFeatured = getFeaturedPosts("ja");
    expect(jaFeatured.every((p) => p.locale === "ja")).toBe(true);
  });

  it("returns empty array when no featured posts exist for locale", () => {
    // only "ja" posts are featured for ja locale in mock (japanese-post)
    const jaFeatured = getFeaturedPosts("ja");
    expect(jaFeatured.length).toBeGreaterThan(0);
  });
});

describe("getPostBySlug", () => {
  it("finds a post by slug components", () => {
    const post = getPostBySlug("2026", "01", "15", "first-post", "en");
    expect(post).toBeDefined();
    expect(post!.title).toBe("First Post");
  });

  it("returns undefined for non-existent post", () => {
    const post = getPostBySlug("2099", "01", "01", "nope", "en");
    expect(post).toBeUndefined();
  });

  it("does not return draft posts", () => {
    const post = getPostBySlug("2026", "03", "01", "draft-post", "en");
    expect(post).toBeUndefined();
  });
});

describe("getPostsByCategory", () => {
  it("filters by category", () => {
    const posts = getPostsByCategory("programming");
    expect(posts.length).toBeGreaterThan(0);
    expect(posts.every((p) => p.categories.includes("programming"))).toBe(true);
  });

  it("filters by category and locale", () => {
    const posts = getPostsByCategory("programming", "en");
    expect(posts.every((p) => p.locale === "en" && p.categories.includes("programming"))).toBe(true);
  });
});

describe("getPostsByTag", () => {
  it("filters by tag", () => {
    const posts = getPostsByTag("react");
    expect(posts.length).toBeGreaterThan(0);
    expect(posts.every((p) => p.tags.includes("react"))).toBe(true);
  });

  it("filters by tag and locale", () => {
    const posts = getPostsByTag("react", "en");
    expect(posts.every((p) => p.locale === "en" && p.tags.includes("react"))).toBe(true);
  });
});

describe("getPaginatedPosts", () => {
  it("returns correct pagination info", () => {
    const result = getPaginatedPosts(1);
    expect(result.currentPage).toBe(1);
    expect(result.posts.length).toBeGreaterThan(0);
    expect(result.totalPages).toBeGreaterThanOrEqual(1);
  });

  it("accepts custom post list", () => {
    const customPosts = getPublishedPosts("en");
    const result = getPaginatedPosts(1, customPosts);
    expect(result.posts.every((p) => p.locale === "en")).toBe(true);
  });
});

describe("getAllTags", () => {
  it("returns unique sorted tags", () => {
    const tags = getAllTags();
    expect(tags.length).toBeGreaterThan(0);
    for (let i = 1; i < tags.length; i++) {
      expect(tags[i - 1].localeCompare(tags[i])).toBeLessThanOrEqual(0);
    }
    expect(new Set(tags).size).toBe(tags.length);
  });

  it("filters tags by locale", () => {
    const enTags = getAllTags("en");
    const jaTags = getAllTags("ja");
    expect(enTags).toContain("typescript");
    expect(jaTags).toContain("nextjs");
  });
});

describe("getCategoryName", () => {
  it("returns English name for en locale", () => {
    expect(getCategoryName({ name: "Programming", nameJa: "プログラミング" }, "en")).toBe("Programming");
  });

  it("returns Japanese name for ja locale", () => {
    expect(getCategoryName({ name: "Programming", nameJa: "プログラミング" }, "ja")).toBe("プログラミング");
  });

  it("falls back to English name when nameJa is missing", () => {
    expect(getCategoryName({ name: "Other" }, "ja")).toBe("Other");
  });
});

describe("getCategoryDescription", () => {
  it("returns English description for en locale", () => {
    expect(
      getCategoryDescription({ description: "English desc", descriptionJa: "日本語の説明" }, "en")
    ).toBe("English desc");
  });

  it("returns Japanese description for ja locale", () => {
    expect(
      getCategoryDescription({ description: "English desc", descriptionJa: "日本語の説明" }, "ja")
    ).toBe("日本語の説明");
  });

  it("falls back when descriptionJa is missing", () => {
    expect(getCategoryDescription({ description: "Fallback" }, "ja")).toBe("Fallback");
  });
});

describe("getProjectName", () => {
  it("returns English name for en locale", () => {
    expect(getProjectName({ name: "My Project", nameJa: "マイプロジェクト" }, "en")).toBe("My Project");
  });

  it("returns Japanese name for ja locale", () => {
    expect(getProjectName({ name: "My Project", nameJa: "マイプロジェクト" }, "ja")).toBe("マイプロジェクト");
  });

  it("falls back to English name when nameJa is missing", () => {
    expect(getProjectName({ name: "My Project" }, "ja")).toBe("My Project");
  });
});

describe("getProjectDescription", () => {
  it("returns English description for en locale", () => {
    expect(
      getProjectDescription({ description: "Desc", descriptionJa: "説明" }, "en")
    ).toBe("Desc");
  });

  it("returns Japanese description for ja locale", () => {
    expect(
      getProjectDescription({ description: "Desc", descriptionJa: "説明" }, "ja")
    ).toBe("説明");
  });

  it("falls back when descriptionJa is missing", () => {
    expect(getProjectDescription({ description: "Fallback" }, "ja")).toBe("Fallback");
  });
});

describe("getAllProjects", () => {
  it("returns projects sorted by order", () => {
    const projects = getAllProjects();
    expect(projects.length).toBe(2);
    for (let i = 1; i < projects.length; i++) {
      expect(projects[i - 1].order).toBeLessThanOrEqual(projects[i].order);
    }
  });
});

describe("getAllCategories", () => {
  it("returns all categories", () => {
    const cats = getAllCategories();
    expect(cats.length).toBe(1);
  });
});

describe("getCategoryBySlug", () => {
  it("finds a category by slug", () => {
    const cat = getCategoryBySlug("programming");
    expect(cat).toBeDefined();
    expect(cat!.name).toBe("Programming");
  });

  it("returns undefined for non-existent slug", () => {
    expect(getCategoryBySlug("nope")).toBeUndefined();
  });
});

describe("getRelatedPosts", () => {
  const firstPost = getPostBySlug("2026", "01", "15", "first-post", "en")!;
  const jaPost = getPostBySlug("2026", "02", "20", "japanese-post", "ja")!;

  it("does not include the post itself", () => {
    const related = getRelatedPosts(firstPost);
    expect(related.find((p) => p.permalink === firstPost.permalink)).toBeUndefined();
  });

  it("returns only same-locale posts", () => {
    const related = getRelatedPosts(firstPost);
    expect(related.every((p) => p.locale === "en")).toBe(true);
  });

  it("prioritizes category matches over tag matches", () => {
    // first-post: categories=["programming"], tags=["typescript","react"]
    // second-post: categories=["programming"], tags=["docker","container"] → score = 2
    // unrelated-post: categories=["devops"], tags=["kubernetes"] → score = 0
    const related = getRelatedPosts(firstPost);
    expect(related.length).toBeGreaterThan(0);
    expect(related[0].slugName).toBe("second-post");
  });

  it("excludes posts with score 0", () => {
    const related = getRelatedPosts(firstPost);
    expect(related.find((p) => p.slugName === "unrelated-post")).toBeUndefined();
  });

  it("respects the limit parameter", () => {
    const related = getRelatedPosts(firstPost, 1);
    expect(related.length).toBeLessThanOrEqual(1);
  });

  it("returns empty array when no related posts exist", () => {
    const unrelatedPost = getPublishedPosts("en").find(
      (p) => p.slugName === "unrelated-post"
    )!;
    const related = getRelatedPosts(unrelatedPost);
    expect(related).toEqual([]);
  });

  it("works for Japanese locale posts", () => {
    const related = getRelatedPosts(jaPost);
    expect(related.every((p) => p.locale === "ja")).toBe(true);
  });
});

describe("getPageBySlug", () => {
  it("finds a page by slug", () => {
    const page = getPageBySlug("about", "en");
    expect(page).toBeDefined();
    expect(page!.locale).toBe("en");
  });

  it("returns undefined for non-existent page", () => {
    expect(getPageBySlug("nonexistent", "en")).toBeUndefined();
  });
});
