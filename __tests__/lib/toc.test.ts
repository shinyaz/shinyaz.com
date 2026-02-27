import { describe, it, expect } from "vitest";
import { extractHeadings } from "@/lib/toc";

describe("extractHeadings", () => {
  it("extracts h2 and h3 headings with IDs and text", () => {
    const html = `
      <h2 id="intro">Introduction</h2>
      <p>Some content</p>
      <h3 id="sub-topic">Sub Topic</h3>
      <p>More content</p>
      <h2 id="conclusion">Conclusion</h2>
    `;
    const result = extractHeadings(html);
    expect(result).toEqual([
      { id: "intro", text: "Introduction", level: 2 },
      { id: "sub-topic", text: "Sub Topic", level: 3 },
      { id: "conclusion", text: "Conclusion", level: 2 },
    ]);
  });

  it("strips inline HTML tags from heading text", () => {
    const html = `
      <h2 id="styled">Hello <code>World</code></h2>
      <h3 id="linked"><a href="#">Link Text</a></h3>
    `;
    const result = extractHeadings(html);
    expect(result).toEqual([
      { id: "styled", text: "Hello World", level: 2 },
      { id: "linked", text: "Link Text", level: 3 },
    ]);
  });

  it("returns empty array when no headings are present", () => {
    const html = "<p>Just a paragraph</p>";
    expect(extractHeadings(html)).toEqual([]);
  });

  it("returns empty array for empty string", () => {
    expect(extractHeadings("")).toEqual([]);
  });

  it("ignores h1 and h4+ headings", () => {
    const html = `
      <h1 id="title">Title</h1>
      <h2 id="section">Section</h2>
      <h4 id="deep">Deep</h4>
      <h5 id="deeper">Deeper</h5>
      <h6 id="deepest">Deepest</h6>
    `;
    const result = extractHeadings(html);
    expect(result).toEqual([
      { id: "section", text: "Section", level: 2 },
    ]);
  });

  it("handles headings with extra attributes", () => {
    const html = `<h2 id="test" class="heading" data-foo="bar">Test Heading</h2>`;
    const result = extractHeadings(html);
    expect(result).toEqual([
      { id: "test", text: "Test Heading", level: 2 },
    ]);
  });
});
