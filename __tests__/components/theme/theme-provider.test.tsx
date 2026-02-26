import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next-themes", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="next-theme-provider">{children}</div>
  ),
}));

import { ThemeProvider } from "@/components/theme/theme-provider";

describe("ThemeProvider", () => {
  it("renders children", () => {
    render(
      <ThemeProvider>
        <p>child content</p>
      </ThemeProvider>
    );
    expect(screen.getByText("child content")).toBeDefined();
  });

  it("wraps children with NextThemeProvider", () => {
    render(
      <ThemeProvider>
        <p>wrapped</p>
      </ThemeProvider>
    );
    const wrapper = screen.getByTestId("next-theme-provider");
    expect(wrapper).toBeDefined();
    expect(wrapper.textContent).toContain("wrapped");
  });
});
