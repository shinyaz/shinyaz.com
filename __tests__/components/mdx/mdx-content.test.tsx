/* eslint-disable @next/next/no-img-element */
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock react/jsx-runtime to provide the runtime the component needs
vi.mock("@/components/mdx/mdx-components", () => ({
  mdxComponents: {
    img: (props: Record<string, string>) => (
      <img alt={props.alt} src={props.src} />
    ),
  },
}));

import { MdxContent } from "@/components/mdx/mdx-content";

// Build a simple MDX code string that mimics Velite's compiled output
// The compiled MDX code is a function that receives jsx-runtime and returns a component
function buildMdxCode(jsxContent: string) {
  return `const {jsx, Fragment} = arguments[0];
function MDXContent(props) {
  return jsx("div", { children: "${jsxContent}" });
}
return { default: MDXContent };`;
}

describe("MdxContent", () => {
  it("renders the compiled MDX content", () => {
    const code = buildMdxCode("Hello MDX");
    render(<MdxContent code={code} />);
    expect(screen.getByText("Hello MDX")).toBeDefined();
  });

  it("renders different content based on code prop", () => {
    const code = buildMdxCode("Another content");
    render(<MdxContent code={code} />);
    expect(screen.getByText("Another content")).toBeDefined();
  });

  it("passes shared components to the MDX component", () => {
    // Code that uses the components prop
    const code = `const {jsx} = arguments[0];
function MDXContent(props) {
  const Img = props.components.img;
  return jsx(Img, { src: "/test.png", alt: "test image" });
}
return { default: MDXContent };`;
    render(<MdxContent code={code} />);
    const img = screen.getByAltText("test image");
    expect(img).toBeDefined();
    expect(img.getAttribute("src")).toBe("/test.png");
  });
});
