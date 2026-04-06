import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TilCard } from "@/components/blog/til-card";

const defaultProps = {
  title: "TIL: Something New",
  date: "2026-03-07T00:00:00.000Z",
  permalink: "/en/til/2026/03/07/something-new",
  tags: ["nextjs"],
  locale: "en" as const,
};

describe("TilCard", () => {
  it("renders title", () => {
    render(<TilCard {...defaultProps} />);
    expect(screen.getByText("TIL: Something New")).toBeDefined();
  });

  it("renders description when provided", () => {
    render(<TilCard {...defaultProps} description="A brief summary" />);
    expect(screen.getByText("A brief summary")).toBeDefined();
  });

  it("does not render description when not provided", () => {
    const { container } = render(<TilCard {...defaultProps} />);
    expect(container.querySelectorAll(".line-clamp-2").length).toBe(0);
  });

  it("renders formatted date", () => {
    render(<TilCard {...defaultProps} />);
    expect(screen.getByText(/March/)).toBeDefined();
  });

  it("renders TIL badge", () => {
    render(<TilCard {...defaultProps} />);
    expect(screen.getByText("TIL")).toBeDefined();
  });

  it("renders at most 3 tags", () => {
    render(<TilCard {...defaultProps} tags={["a", "b", "c", "d", "e"]} />);
    expect(screen.getByText("#a")).toBeDefined();
    expect(screen.getByText("#b")).toBeDefined();
    expect(screen.getByText("#c")).toBeDefined();
    expect(screen.queryByText("#d")).toBeNull();
    expect(screen.getByText("+2")).toBeDefined();
  });

  it("renders reading time when provided", () => {
    render(<TilCard {...defaultProps} readingTime={2} />);
    expect(screen.getByText("2 min read")).toBeDefined();
  });

  it("renders reading time in ja locale", () => {
    render(<TilCard {...defaultProps} locale="ja" readingTime={3} />);
    expect(screen.getByText("約3分")).toBeDefined();
  });

  it("links to permalink", () => {
    render(<TilCard {...defaultProps} />);
    const links = screen.getAllByRole("link");
    const permalinkLink = links.find(
      (l) => l.getAttribute("href") === "/en/til/2026/03/07/something-new"
    );
    expect(permalinkLink).toBeDefined();
  });
});
