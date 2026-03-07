import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeaturedPostCard } from "@/components/blog/featured-post-card";

const defaultProps = {
  title: "Featured Post",
  description: "A featured post description",
  date: "2026-01-15T00:00:00.000Z",
  permalink: "/en/blog/2026/01/15/featured-post",
  categories: ["programming"],
  tags: ["typescript"],
  locale: "en" as const,
};

describe("FeaturedPostCard", () => {
  it("renders title", () => {
    render(<FeaturedPostCard {...defaultProps} />);
    expect(screen.getByText("Featured Post")).toBeDefined();
  });

  it("renders description", () => {
    render(<FeaturedPostCard {...defaultProps} />);
    expect(screen.getByText("A featured post description")).toBeDefined();
  });

  it("renders formatted date", () => {
    render(<FeaturedPostCard {...defaultProps} />);
    expect(screen.getByText(/January/)).toBeDefined();
  });

  it("links to permalink", () => {
    render(<FeaturedPostCard {...defaultProps} />);
    const links = screen.getAllByRole("link");
    const permalinkLink = links.find(
      (l) => l.getAttribute("href") === "/en/blog/2026/01/15/featured-post"
    );
    expect(permalinkLink).toBeDefined();
  });

  it("renders category badges", () => {
    render(<FeaturedPostCard {...defaultProps} />);
    expect(screen.getByText("programming")).toBeDefined();
  });

  it("renders tag badges", () => {
    render(<FeaturedPostCard {...defaultProps} />);
    expect(screen.getByText("#typescript")).toBeDefined();
  });

  it("shows at most 3 tags and a +N indicator for overflow", () => {
    render(
      <FeaturedPostCard
        {...defaultProps}
        tags={["a", "b", "c", "d", "e"]}
      />
    );
    expect(screen.getByText("#a")).toBeDefined();
    expect(screen.getByText("#b")).toBeDefined();
    expect(screen.getByText("#c")).toBeDefined();
    expect(screen.queryByText("#d")).toBeNull();
    expect(screen.queryByText("#e")).toBeNull();
    expect(screen.getByText("+2")).toBeDefined();
  });

  it("does not show +N when tags are within the limit", () => {
    render(<FeaturedPostCard {...defaultProps} tags={["a", "b", "c"]} />);
    expect(screen.queryByText(/^\+/)).toBeNull();
  });
});
