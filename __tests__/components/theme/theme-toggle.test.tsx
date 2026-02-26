import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

const setThemeMock = vi.fn();

vi.mock("next-themes", () => ({
  useTheme: () => ({
    resolvedTheme: "light",
    setTheme: setThemeMock,
  }),
}));

import { ThemeToggle } from "@/components/theme/theme-toggle";

describe("ThemeToggle", () => {
  it("renders a button with accessible label", () => {
    render(<ThemeToggle />);
    expect(screen.getByRole("button", { name: "Toggle theme" })).toBeDefined();
  });

  it("renders moon icon in light mode", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button", { name: "Toggle theme" });
    const svg = button.querySelector("svg");
    // Moon icon has a single path element (d="M12 3a6...")
    expect(svg?.querySelector("path")).toBeDefined();
    expect(svg?.querySelector("circle")).toBeNull();
  });

  it("switches to dark theme on click when in light mode", () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button", { name: "Toggle theme" }));
    expect(setThemeMock).toHaveBeenCalledWith("dark");
  });
});

describe("ThemeToggle (dark mode)", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("renders sun icon in dark mode and switches to light on click", async () => {
    vi.doMock("next-themes", () => ({
      useTheme: () => ({
        resolvedTheme: "dark",
        setTheme: setThemeMock,
      }),
    }));
    const { ThemeToggle: DarkToggle } = await import(
      "@/components/theme/theme-toggle"
    );
    render(<DarkToggle />);
    const button = screen.getByRole("button", { name: "Toggle theme" });
    // Sun icon has a circle element
    const svg = button.querySelector("svg");
    expect(svg?.querySelector("circle")).toBeDefined();

    fireEvent.click(button);
    expect(setThemeMock).toHaveBeenCalledWith("light");
  });
});
