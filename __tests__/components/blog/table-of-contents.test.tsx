import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { TableOfContents } from "@/components/blog/table-of-contents";
import type { TocItem } from "@/lib/toc";

const mockObserve = vi.fn();
const mockDisconnect = vi.fn();

beforeEach(() => {
  mockObserve.mockClear();
  mockDisconnect.mockClear();
  vi.stubGlobal(
    "IntersectionObserver",
    vi.fn(() => ({
      observe: mockObserve,
      disconnect: mockDisconnect,
      unobserve: vi.fn(),
    }))
  );
});

const sampleHeadings: TocItem[] = [
  { id: "introduction", text: "Introduction", level: 2 },
  { id: "setup", text: "Setup", level: 3 },
  { id: "conclusion", text: "Conclusion", level: 2 },
];

describe("TableOfContents", () => {
  it("renders heading links correctly", () => {
    render(<TableOfContents headings={sampleHeadings} locale="en" />);
    expect(screen.getByText("Introduction")).toBeDefined();
    expect(screen.getByText("Setup")).toBeDefined();
    expect(screen.getByText("Conclusion")).toBeDefined();
  });

  it("renders links with correct href attributes", () => {
    render(<TableOfContents headings={sampleHeadings} locale="en" />);
    const introLink = screen.getByText("Introduction");
    expect(introLink.getAttribute("href")).toBe("#introduction");
    const setupLink = screen.getByText("Setup");
    expect(setupLink.getAttribute("href")).toBe("#setup");
  });

  it("shows English title for en locale", () => {
    render(<TableOfContents headings={sampleHeadings} locale="en" />);
    expect(screen.getByText("Table of Contents")).toBeDefined();
  });

  it("shows Japanese title for ja locale", () => {
    render(<TableOfContents headings={sampleHeadings} locale="ja" />);
    expect(screen.getByText("目次")).toBeDefined();
  });

  it("indents h3 headings with ml-4 class", () => {
    render(<TableOfContents headings={sampleHeadings} locale="en" />);
    const setupItem = screen.getByText("Setup").closest("li");
    expect(setupItem?.className).toContain("ml-4");
  });

  it("does not indent h2 headings", () => {
    render(<TableOfContents headings={sampleHeadings} locale="en" />);
    const introItem = screen.getByText("Introduction").closest("li");
    expect(introItem?.className).not.toContain("ml-4");
  });

  it("renders nothing when headings array is empty", () => {
    const { container } = render(
      <TableOfContents headings={[]} locale="en" />
    );
    expect(container.innerHTML).toBe("");
  });

  it("renders a nav element with aria-label", () => {
    render(<TableOfContents headings={sampleHeadings} locale="en" />);
    const nav = screen.getByRole("navigation");
    expect(nav.getAttribute("aria-label")).toBe("Table of Contents");
  });
});
