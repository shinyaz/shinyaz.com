import { describe, it, expect } from "vitest";
import { OgImageLayout } from "@/lib/og-image";

describe("OgImageLayout", () => {
  const baseProps = {
    title: "Test Blog Post",
    date: "January 15, 2026",
    author: "shinyaz",
    siteName: "shinyaz.com",
    locale: "en" as const,
  };

  it("returns JSX with the provided title", () => {
    const result = OgImageLayout(baseProps);
    expect(result).toBeDefined();
    expect(result.props.children).toBeDefined();
  });

  it("renders category badge when category is provided", () => {
    const result = OgImageLayout({ ...baseProps, category: "Programming" });
    const topBar = result.props.children[0];
    // First child of top bar is the category badge
    const categoryBadge = topBar.props.children[0];
    expect(categoryBadge).toBeTruthy();
    expect(categoryBadge.props.children).toBe("Programming");
  });

  it("does not render category badge when category is not provided", () => {
    const result = OgImageLayout(baseProps);
    const topBar = result.props.children[0];
    const categoryBadge = topBar.props.children[0];
    // When no category, the expression evaluates to undefined/false
    expect(categoryBadge).toBeFalsy();
  });

  it("uses smaller font size for long titles", () => {
    const longTitle = "This is a very long title that exceeds forty characters in total";
    const result = OgImageLayout({ ...baseProps, title: longTitle });
    const centerSection = result.props.children[1];
    const titleDiv = centerSection.props.children;
    expect(titleDiv.props.style.fontSize).toBe("42px");
  });

  it("uses larger font size for short titles", () => {
    const shortTitle = "Short Title";
    const result = OgImageLayout({ ...baseProps, title: shortTitle });
    const centerSection = result.props.children[1];
    const titleDiv = centerSection.props.children;
    expect(titleDiv.props.style.fontSize).toBe("52px");
  });

  it("renders author and site name in footer", () => {
    const result = OgImageLayout(baseProps);
    const footer = result.props.children[2];
    const authorDiv = footer.props.children[0];
    const siteDiv = footer.props.children[1];
    expect(authorDiv.props.children).toBe("shinyaz");
    expect(siteDiv.props.children).toBe("shinyaz.com");
  });

  it("renders date text", () => {
    const result = OgImageLayout(baseProps);
    const topBar = result.props.children[0];
    const dateDiv = topBar.props.children[1];
    expect(dateDiv.props.children).toBe("January 15, 2026");
  });

  it("renders with Japanese locale props", () => {
    const jaProps = {
      ...baseProps,
      title: "日本語のテスト記事タイトル",
      date: "2026年1月15日",
      category: "プログラミング",
      locale: "ja" as const,
    };
    const result = OgImageLayout(jaProps);
    expect(result).toBeDefined();
    const topBar = result.props.children[0];
    const categoryBadge = topBar.props.children[0];
    expect(categoryBadge.props.children).toBe("プログラミング");
  });
});
