import { describe, it, expect } from "vitest";
import manifest from "@/app/manifest";

describe("manifest", () => {
  const result = manifest();

  it("returns required PWA fields", () => {
    expect(result.name).toBe("@shinyaz");
    expect(result.short_name).toBe("@shinyaz");
    expect(result.display).toBe("standalone");
  });

  it("includes 192x192 icon as PNG", () => {
    const icon192 = result.icons?.find((i) => i.sizes === "192x192");
    expect(icon192).toBeDefined();
    expect(icon192?.src).toBe("/icons/icon-192");
    expect(icon192?.type).toBe("image/png");
  });

  it("includes 512x512 icon as PNG", () => {
    const icon512 = result.icons?.find((i) => i.sizes === "512x512");
    expect(icon512).toBeDefined();
    expect(icon512?.src).toBe("/icons/icon-512");
    expect(icon512?.type).toBe("image/png");
  });

  it("has exactly 2 icons", () => {
    expect(result.icons).toHaveLength(2);
  });
});
