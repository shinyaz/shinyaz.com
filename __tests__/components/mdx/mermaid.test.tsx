import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { Mermaid } from "@/components/mdx/mermaid";

const mockRender = vi.fn().mockResolvedValue({ svg: "<svg>mocked</svg>" });
const mockInitialize = vi.fn();

vi.mock("mermaid", () => ({
  default: {
    initialize: (...args: unknown[]) => mockInitialize(...args),
    render: (...args: unknown[]) => mockRender(...args),
  },
}));

vi.mock("next-themes", () => ({
  useTheme: () => ({ resolvedTheme: "light" }),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("Mermaid", () => {
  it("renders mermaid chart svg", async () => {
    render(<Mermaid chart="graph TD; A-->B;" />);
    await waitFor(() => {
      expect(screen.getByText("mocked")).toBeDefined();
    });
    expect(mockInitialize).toHaveBeenCalledWith(
      expect.objectContaining({ theme: "default" }),
    );
    expect(mockRender).toHaveBeenCalledWith(expect.any(String), "graph TD; A-->B;");
  });

  it("renders container div with correct class", () => {
    const { container } = render(<Mermaid chart="graph TD;" />);
    const div = container.firstElementChild as HTMLElement;
    expect(div.className).toContain("justify-center");
  });
});
