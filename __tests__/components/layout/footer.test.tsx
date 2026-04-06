import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/layout/footer";

describe("Footer", () => {
  it("renders GitHub link", () => {
    render(<Footer locale="en" />);
    const githubLink = screen.getByLabelText("GitHub");
    expect(githubLink).toBeDefined();
    expect(githubLink.getAttribute("href")).toContain("github.com");
  });

  it("renders X link", () => {
    render(<Footer locale="en" />);
    const xLink = screen.getByLabelText("X");
    expect(xLink).toBeDefined();
    expect(xLink.getAttribute("href")).toContain("x.com");
  });

  it("renders LinkedIn link", () => {
    render(<Footer locale="en" />);
    const linkedinLink = screen.getByLabelText("LinkedIn");
    expect(linkedinLink).toBeDefined();
    expect(linkedinLink.getAttribute("href")).toContain("linkedin.com");
  });

  it("renders copyright text", () => {
    render(<Footer locale="en" />);
    expect(screen.getByText(/All rights reserved/)).toBeDefined();
  });

  it("renders author name", () => {
    render(<Footer locale="en" />);
    expect(screen.getByText(/shinyaz/)).toBeDefined();
  });

  it("renders RSS feed icon link", () => {
    render(<Footer locale="en" />);
    const rssIcon = screen.getByLabelText("RSS Feed");
    expect(rssIcon).toBeDefined();
    expect(rssIcon.getAttribute("href")).toBe("/en/feed.xml");
  });

  it("renders RSS text link", () => {
    render(<Footer locale="en" />);
    const rssLink = screen.getByText("RSS");
    expect(rssLink.getAttribute("href")).toBe("/en/feed.xml");
  });

  it("renders Privacy Policy link for en locale", () => {
    render(<Footer locale="en" />);
    const privacyLink = screen.getByText("Privacy Policy");
    expect(privacyLink.getAttribute("href")).toBe("/en/privacy");
  });

  it("renders Privacy Policy link for ja locale", () => {
    render(<Footer locale="ja" />);
    const privacyLink = screen.getByText("プライバシーポリシー");
    expect(privacyLink.getAttribute("href")).toBe("/ja/privacy");
  });

  it("renders Colophon link", () => {
    render(<Footer locale="en" />);
    const colophonLink = screen.getByText("Colophon");
    expect(colophonLink.getAttribute("href")).toBe("/en/colophon");
  });

  it("renders footer links with correct ja locale prefix", () => {
    render(<Footer locale="ja" />);
    const rssIcon = screen.getByLabelText("RSS Feed");
    expect(rssIcon.getAttribute("href")).toBe("/ja/feed.xml");
    const colophonLink = screen.getByText("サイト構成");
    expect(colophonLink.getAttribute("href")).toBe("/ja/colophon");
  });
});
