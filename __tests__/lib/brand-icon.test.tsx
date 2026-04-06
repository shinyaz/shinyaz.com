import { describe, it, expect, vi } from "vitest";

vi.mock("next/og", () => ({
  ImageResponse: class {
    constructor(
      public element: React.ReactNode,
      public options: Record<string, unknown>,
    ) {}
  },
}));

const mockReadFile = vi.fn().mockResolvedValue(Buffer.from("fake-font-data"));

vi.mock("node:fs/promises", () => ({
  default: { readFile: mockReadFile },
  readFile: mockReadFile,
}));

describe("renderBrandIcon", () => {
  it("returns an ImageResponse with correct dimensions", async () => {
    const { renderBrandIcon } = await import("@/lib/brand-icon");
    const result = (await renderBrandIcon(180)) as unknown as {
      options: { width: number; height: number };
    };
    expect(result.options.width).toBe(180);
    expect(result.options.height).toBe(180);
  });

  it("scales correctly for different sizes", async () => {
    const { renderBrandIcon } = await import("@/lib/brand-icon");
    const result = (await renderBrandIcon(512)) as unknown as {
      options: { width: number; height: number };
    };
    expect(result.options.width).toBe(512);
    expect(result.options.height).toBe(512);
  });

  it("includes font configuration", async () => {
    const { renderBrandIcon } = await import("@/lib/brand-icon");
    const result = (await renderBrandIcon(32)) as unknown as {
      options: { fonts: Array<{ name: string; weight: number }> };
    };
    expect(result.options.fonts[0].name).toBe("IBM Plex Sans");
    expect(result.options.fonts[0].weight).toBe(700);
  });
});
