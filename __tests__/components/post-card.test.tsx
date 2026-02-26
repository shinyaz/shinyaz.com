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
});
