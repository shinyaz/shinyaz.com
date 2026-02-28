import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MobileNav } from "@/components/layout/mobile-nav";
import { getDictionary } from "@/lib/i18n";

vi.mock("@/components/theme/theme-toggle", () => ({
  ThemeToggle: () => <button>theme-toggle</button>,
}));

vi.mock("@/components/layout/language-switcher", () => ({
  LanguageSwitcher: () => <button>language-switcher</button>,
}));

describe("MobileNav", () => {
  const t = getDictionary("en");

  beforeEach(() => {
    document.body.style.overflow = "";
  });

  it("renders hamburger button", () => {
    render(<MobileNav locale="en" t={t} />);
    const button = screen.getByRole("button", { name: "Menu" });
    expect(button).toBeDefined();
  });

  it("hamburger button has aria-expanded=false initially", () => {
    render(<MobileNav locale="en" t={t} />);
    const button = screen.getByRole("button", { name: "Menu" });
    expect(button.getAttribute("aria-expanded")).toBe("false");
  });

  it("opens drawer on click and sets aria-expanded=true", () => {
    render(<MobileNav locale="en" t={t} />);
    const button = screen.getByRole("button", { name: "Menu" });
    fireEvent.click(button);
    expect(button.getAttribute("aria-expanded")).toBe("true");
  });

  it("shows nav links when drawer is open", () => {
    render(<MobileNav locale="en" t={t} />);
    fireEvent.click(screen.getByRole("button", { name: "Menu" }));

    expect(screen.getByText("Blog")).toBeDefined();
    expect(screen.getByText("Projects")).toBeDefined();
    expect(screen.getByText("Uses")).toBeDefined();
    expect(screen.getByText("About")).toBeDefined();
    expect(screen.getByText("Search")).toBeDefined();
  });

  it("nav links have correct hrefs for en locale", () => {
    render(<MobileNav locale="en" t={t} />);
    fireEvent.click(screen.getByRole("button", { name: "Menu" }));

    const blogLink = screen.getByText("Blog").closest("a");
    expect(blogLink?.getAttribute("href")).toBe("/en/blog");
    const aboutLink = screen.getByText("About").closest("a");
    expect(aboutLink?.getAttribute("href")).toBe("/en/about");
  });

  it("nav links have correct hrefs for ja locale", () => {
    const tJa = getDictionary("ja");
    render(<MobileNav locale="ja" t={tJa} />);
    fireEvent.click(screen.getByRole("button", { name: "メニュー" }));

    const blogLink = screen.getByText("ブログ").closest("a");
    expect(blogLink?.getAttribute("href")).toBe("/ja/blog");
  });

  it("closes drawer on Escape key", () => {
    render(<MobileNav locale="en" t={t} />);
    fireEvent.click(screen.getByRole("button", { name: "Menu" }));
    expect(screen.getByRole("button", { name: "Close menu" }).getAttribute("aria-expanded")).toBe("true");

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.getByRole("button", { name: "Menu" }).getAttribute("aria-expanded")).toBe("false");
  });

  it("locks body scroll when open", () => {
    render(<MobileNav locale="en" t={t} />);
    fireEvent.click(screen.getByRole("button", { name: "Menu" }));
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("unlocks body scroll when closed", () => {
    render(<MobileNav locale="en" t={t} />);
    const button = screen.getByRole("button", { name: "Menu" });
    fireEvent.click(button);
    expect(document.body.style.overflow).toBe("hidden");
    fireEvent.click(screen.getByRole("button", { name: "Close menu" }));
    expect(document.body.style.overflow).toBe("");
  });
});
