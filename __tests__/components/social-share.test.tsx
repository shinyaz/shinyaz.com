import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SocialShare } from "@/components/blog/social-share";

const defaultProps = {
  url: "https://shinyaz.com/en/blog/2026/01/15/test-post",
  title: "Test Post Title",
  locale: "en" as const,
};

beforeEach(() => {
  Object.assign(navigator, {
    clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
  });
});

describe("SocialShare", () => {
  it("renders share label in English", () => {
    render(<SocialShare {...defaultProps} />);
    expect(screen.getByText("Share this post")).toBeDefined();
  });

  it("renders share label in Japanese", () => {
    render(<SocialShare {...defaultProps} locale="ja" />);
    expect(screen.getByText("共有する")).toBeDefined();
  });

  it("renders X share link with encoded URL and title", () => {
    render(<SocialShare {...defaultProps} />);
    const xLink = screen.getByLabelText("Share on X");
    const href = xLink.getAttribute("href")!;
    expect(href).toContain("https://x.com/intent/tweet");
    expect(href).toContain(encodeURIComponent(defaultProps.url));
    expect(href).toContain(encodeURIComponent(defaultProps.title));
  });

  it("renders Hatena Bookmark link with stripped https prefix", () => {
    render(<SocialShare {...defaultProps} />);
    const hatenaLink = screen.getByLabelText("Share on Hatena Bookmark");
    const href = hatenaLink.getAttribute("href")!;
    expect(href).toContain("https://b.hatena.ne.jp/entry/s/");
    expect(href).toContain("shinyaz.com/en/blog/2026/01/15/test-post");
    expect(href).not.toContain("https://shinyaz.com");
  });

  it("renders LinkedIn share link with encoded URL", () => {
    render(<SocialShare {...defaultProps} />);
    const linkedinLink = screen.getByLabelText("Share on LinkedIn");
    const href = linkedinLink.getAttribute("href")!;
    expect(href).toContain("https://www.linkedin.com/sharing/share-offsite/");
    expect(href).toContain(encodeURIComponent(defaultProps.url));
  });

  it("all external links open in new tab", () => {
    render(<SocialShare {...defaultProps} />);
    const externalLinks = [
      screen.getByLabelText("Share on X"),
      screen.getByLabelText("Share on Hatena Bookmark"),
      screen.getByLabelText("Share on LinkedIn"),
    ];
    for (const link of externalLinks) {
      expect(link.getAttribute("target")).toBe("_blank");
      expect(link.getAttribute("rel")).toBe("noopener noreferrer");
    }
  });

  it("copy button copies URL to clipboard", async () => {
    render(<SocialShare {...defaultProps} />);
    const copyButton = screen.getByLabelText("Copy link");
    fireEvent.click(copyButton);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(defaultProps.url);
  });

  it("copy button shows copied state after click", async () => {
    render(<SocialShare {...defaultProps} />);
    const copyButton = screen.getByLabelText("Copy link");
    fireEvent.click(copyButton);
    // State updates after the async clipboard.writeText resolves
    await waitFor(() => {
      expect(screen.getByLabelText("Copied!")).toBeDefined();
    });
  });
});
