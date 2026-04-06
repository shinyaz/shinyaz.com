import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { HeadingH2, HeadingH3, HeadingH4 } from "@/components/mdx/heading-link";

const mockWriteText = vi.fn(() => Promise.resolve());

beforeEach(() => {
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText: mockWriteText },
    writable: true,
    configurable: true,
  });
  mockWriteText.mockClear();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("HeadingLink", () => {
  it("renders h2 with correct id and children", () => {
    render(<HeadingH2 id="test-heading">Hello</HeadingH2>);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading.id).toBe("test-heading");
    expect(heading.textContent).toContain("Hello");
  });

  it("renders h3 tag", () => {
    render(<HeadingH3 id="h3">H3</HeadingH3>);
    expect(screen.getByRole("heading", { level: 3 })).toBeDefined();
  });

  it("renders h4 tag", () => {
    render(<HeadingH4 id="h4">H4</HeadingH4>);
    expect(screen.getByRole("heading", { level: 4 })).toBeDefined();
  });

  it("shows copy button when id is present", () => {
    render(<HeadingH2 id="test">Text</HeadingH2>);
    expect(screen.getByRole("button", { name: "Copy link to section" })).toBeDefined();
  });

  it("does not show copy button when id is absent", () => {
    render(<HeadingH2>No ID</HeadingH2>);
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("copies URL to clipboard on click", async () => {
    render(<HeadingH2 id="my-section">Title</HeadingH2>);
    fireEvent.click(screen.getByRole("button", { name: "Copy link to section" }));
    // Wait for the promise to resolve
    await vi.waitFor(() => {
      expect(mockWriteText).toHaveBeenCalledWith(
        expect.stringContaining("#my-section")
      );
    });
  });
});
