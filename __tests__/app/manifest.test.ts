import { describe, it, expect, vi } from "vitest";
import { NextRequest } from "next/server";

// Mock next/server NextResponse
vi.mock("next/server", async () => {
  const actual = await vi.importActual("next/server");
  return { ...actual };
});

const { GET } = await import("@/app/[locale]/manifest.webmanifest/route");

async function getManifest(locale: string) {
  const request = new NextRequest(`http://localhost/${locale}/manifest.webmanifest`);
  const response = await GET(request, { params: Promise.resolve({ locale }) });
  return response.json();
}

describe("manifest.webmanifest route", () => {
  describe("Japanese manifest", () => {
    it("returns Japanese description and start_url", async () => {
      const result = await getManifest("ja");
      expect(result.name).toBe("@shinyaz");
      expect(result.description).toBe("shinyaz の技術ノート - 技術を学び、記録し、共有する");
      expect(result.start_url).toBe("/ja");
      expect(result.lang).toBe("ja");
    });
  });

  describe("English manifest", () => {
    it("returns English description and start_url", async () => {
      const result = await getManifest("en");
      expect(result.name).toBe("@shinyaz");
      expect(result.description).toBe("Tech notes by shinyaz - Learn, document, and share technology");
      expect(result.start_url).toBe("/en");
      expect(result.lang).toBe("en");
    });
  });

  describe("common fields", () => {
    it("returns required PWA fields", async () => {
      const result = await getManifest("en");
      expect(result.short_name).toBe("@shinyaz");
      expect(result.display).toBe("standalone");
      expect(result.background_color).toBe("#ffffff");
      expect(result.theme_color).toBe("#111111");
    });

    it("includes 192x192 and 512x512 icons", async () => {
      const result = await getManifest("en");
      expect(result.icons).toHaveLength(2);

      const icon192 = result.icons.find((i: { sizes: string }) => i.sizes === "192x192");
      expect(icon192).toEqual({ src: "/icons/icon-192", sizes: "192x192", type: "image/png" });

      const icon512 = result.icons.find((i: { sizes: string }) => i.sizes === "512x512");
      expect(icon512).toEqual({ src: "/icons/icon-512", sizes: "512x512", type: "image/png" });
    });
  });

  describe("invalid locale", () => {
    it("returns 404 for invalid locale", async () => {
      const request = new NextRequest("http://localhost/xx/manifest.webmanifest");
      const response = await GET(request, { params: Promise.resolve({ locale: "xx" }) });
      expect(response.status).toBe(404);
    });
  });
});
