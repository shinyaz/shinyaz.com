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
});
