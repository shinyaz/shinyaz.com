import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { mdxComponents } from "@/components/mdx/mdx-components";

const MdxImg = mdxComponents.img!;
const MdxA = mdxComponents.a!;

describe("mdxComponents.img", () => {
  it("renders image with src and alt", () => {
    // @ts-expect-error -- MDX component props
    render(<MdxImg src="/test.png" alt="Test image" />);
    const img = screen.getByAltText("Test image");
    expect(img).toBeDefined();
    expect(img.getAttribute("src")).toContain("test.png");
  });

  it("defaults alt to empty string when not provided", () => {
    // @ts-expect-error -- MDX component props
    render(<MdxImg src="/test.png" />);
    const img = screen.getByAltText("");
    expect(img).toBeDefined();
  });

  it("returns null when src is not provided", () => {
    // @ts-expect-error -- MDX component props
    const { container } = render(<MdxImg />);
    expect(container.innerHTML).toBe("");
  });
});

describe("mdxComponents.a", () => {
  it("renders external links with target=_blank", () => {
    // @ts-expect-error -- MDX component props
    render(<MdxA href="https://example.com">External</MdxA>);
    const link = screen.getByText("External");
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toBe("noopener noreferrer");
  });

  it("renders internal links without target=_blank", () => {
    // @ts-expect-error -- MDX component props
    render(<MdxA href="/en/about">Internal</MdxA>);
    const link = screen.getByText("Internal");
    expect(link.getAttribute("target")).toBeNull();
    expect(link.getAttribute("rel")).toBeNull();
  });

  it("renders http links as external", () => {
    // @ts-expect-error -- MDX component props
    render(<MdxA href="http://example.com">HTTP Link</MdxA>);
    const link = screen.getByText("HTTP Link");
    expect(link.getAttribute("target")).toBe("_blank");
  });

  it("blocks javascript: protocol and renders as span", () => {
    // @ts-expect-error -- MDX component props
    render(<MdxA href="javascript:void(0)">JS Link</MdxA>);
    const el = screen.getByText("JS Link");
    expect(el.tagName).toBe("SPAN");
    expect(el.getAttribute("href")).toBeNull();
  });

  it("blocks data: protocol and renders as span", () => {
    // @ts-expect-error -- MDX component props
    render(<MdxA href="data:text/html,<h1>hi</h1>">Data Link</MdxA>);
    const el = screen.getByText("Data Link");
    expect(el.tagName).toBe("SPAN");
    expect(el.getAttribute("href")).toBeNull();
  });

  it("blocks vbscript: protocol and renders as span", () => {
    // @ts-expect-error -- MDX component props
    render(<MdxA href="vbscript:MsgBox('xss')">VB Link</MdxA>);
    const el = screen.getByText("VB Link");
    expect(el.tagName).toBe("SPAN");
  });

  it("allows mailto: links", () => {
    // @ts-expect-error -- MDX component props
    render(<MdxA href="mailto:test@example.com">Email</MdxA>);
    const link = screen.getByText("Email");
    expect(link.tagName).toBe("A");
    expect(link.getAttribute("href")).toBe("mailto:test@example.com");
  });

  it("allows anchor fragment links", () => {
    // @ts-expect-error -- MDX component props
    render(<MdxA href="#section">Anchor</MdxA>);
    const link = screen.getByText("Anchor");
    expect(link.tagName).toBe("A");
    expect(link.getAttribute("href")).toBe("#section");
  });
});
