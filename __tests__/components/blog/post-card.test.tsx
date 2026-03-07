import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PostCard } from "@/components/blog/post-card";

const defaultProps = {
  title: "Test Post",
  description: "A test description",
  date: "2026-01-15T00:00:00.000Z",
  permalink: "/en/blog/2026/01/15/test-post",
  categories: ["programming"],
  tags: ["typescript"],
  locale: "en" as const,
};

describe("PostCard", () => {
  it("renders title", () => {
    render(<PostCard {...defaultProps} />);
    expect(screen.getByText("Test Post")).toBeDefined();
  });

  it("renders description", () => {
    render(<PostCard {...defaultProps} />);
    expect(screen.getByText("A test description")).toBeDefined();
  });

  it("renders formatted date", () => {
    render(<PostCard {...defaultProps} />);
    expect(screen.getByText(/January/)).toBeDefined();
  });

  it("links to permalink", () => {
    render(<PostCard {...defaultProps} />);
    const links = screen.getAllByRole("link");
    const permalinkLink = links.find(
      (l) => l.getAttribute("href") === "/en/blog/2026/01/15/test-post"
    );
    expect(permalinkLink).toBeDefined();
  });

  it("renders category badges", () => {
    render(<PostCard {...defaultProps} />);
    expect(screen.getByText("programming")).toBeDefined();
  });

  it("renders tag badges", () => {
    render(<PostCard {...defaultProps} />);
    expect(screen.getByText("#typescript")).toBeDefined();
  });

  it("shows at most 3 tags and a +N indicator for overflow", () => {
    render(
      <PostCard
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
    render(<PostCard {...defaultProps} tags={["a", "b", "c"]} />);
    expect(screen.queryByText(/^\+/)).toBeNull();
  });

  it("renders reading time when provided", () => {
    render(<PostCard {...defaultProps} readingTime={5} />);
    expect(screen.getByText("5 min read")).toBeDefined();
  });

  it("renders reading time in ja locale", () => {
    render(<PostCard {...defaultProps} locale="ja" readingTime={3} />);
    expect(screen.getByText("約3分")).toBeDefined();
  });

  it("does not render reading time when not provided", () => {
    render(<PostCard {...defaultProps} />);
    expect(screen.queryByText(/min read/)).toBeNull();
    expect(screen.queryByText(/約/)).toBeNull();
  });
});
