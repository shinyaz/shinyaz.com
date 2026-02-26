import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TagBadge } from "@/components/blog/tag-badge";

describe("TagBadge", () => {
  it("renders a link with correct href", () => {
    render(<TagBadge slug="typescript" locale="en" />);
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe("/en/tag/typescript");
  });

  it("shows #slug text", () => {
    render(<TagBadge slug="typescript" locale="en" />);
    expect(screen.getByText("#typescript")).toBeDefined();
  });

  it("uses correct locale prefix", () => {
    render(<TagBadge slug="react" locale="ja" />);
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe("/ja/tag/react");
  });
});
