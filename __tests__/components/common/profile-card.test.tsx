import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProfileCard } from "@/components/common/profile-card";

describe("ProfileCard", () => {
  it("renders author name for en locale", () => {
    render(<ProfileCard locale="en" />);
    expect(screen.getByText("Shinya Tahara")).toBeDefined();
  });

  it("renders author name for ja locale", () => {
    render(<ProfileCard locale="ja" />);
    expect(screen.getByText("田原 慎也")).toBeDefined();
  });

  it("renders role text", () => {
    render(<ProfileCard locale="en" />);
    expect(screen.getByText("Solutions Architect @ AWS")).toBeDefined();
  });

  it("renders bio text", () => {
    render(<ProfileCard locale="en" />);
    expect(screen.getByText(/Solutions Architect at AWS/)).toBeDefined();
  });

  it("renders profile image", () => {
    render(<ProfileCard locale="en" />);
    const img = screen.getByAltText("Shinya Tahara");
    expect(img).toBeDefined();
    expect(img.getAttribute("src")).toContain("profile");
  });

  it("renders profile image with Japanese alt text", () => {
    render(<ProfileCard locale="ja" />);
    const img = screen.getByAltText("田原 慎也");
    expect(img).toBeDefined();
  });

  it("renders GitHub link", () => {
    render(<ProfileCard locale="en" />);
    const githubLink = screen.getByLabelText("GitHub");
    expect(githubLink).toBeDefined();
    expect(githubLink.getAttribute("href")).toContain("github.com");
  });

  it("renders X link", () => {
    render(<ProfileCard locale="en" />);
    const xLink = screen.getByLabelText("X");
    expect(xLink).toBeDefined();
    expect(xLink.getAttribute("href")).toContain("x.com");
  });

  it("renders LinkedIn link", () => {
    render(<ProfileCard locale="en" />);
    const linkedinLink = screen.getByLabelText("LinkedIn");
    expect(linkedinLink).toBeDefined();
    expect(linkedinLink.getAttribute("href")).toContain("linkedin.com");
  });

  it("renders about page link for en locale", () => {
    render(<ProfileCard locale="en" />);
    const readMoreLink = screen.getByText(/Read more/);
    expect(readMoreLink.closest("a")?.getAttribute("href")).toBe("/en/about");
  });

  it("renders about page link for ja locale", () => {
    render(<ProfileCard locale="ja" />);
    const readMoreLink = screen.getByText(/もっと見る/);
    expect(readMoreLink.closest("a")?.getAttribute("href")).toBe("/ja/about");
  });
});
