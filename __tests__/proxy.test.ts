import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock next/server with class-based NextRequest
vi.mock("next/server", () => {
  class MockNextRequest {
    nextUrl: URL & { clone: () => URL };
    headers: Map<string, string>;
    constructor(url: string, init?: { headers?: Record<string, string> }) {
      const parsed = new URL(url);
      this.nextUrl = Object.assign(parsed, {
        clone: () => new URL(url),
      });
      this.headers = new Map(Object.entries(init?.headers ?? {}));
    }
  }
  return {
    NextRequest: MockNextRequest,
    NextResponse: {
      next: vi.fn(() => ({
        headers: new Map<string, string>(),
      })),
      redirect: vi.fn((url: URL) => ({
        type: "redirect",
        url,
        headers: new Map<string, string>(),
      })),
    },
  };
});

import { NextRequest, NextResponse } from "next/server";
import { proxy } from "@/proxy";

function createRequest(pathname: string, headers: Record<string, string> = {}) {
  return new NextRequest(`https://shinyaz.com${pathname}`, { headers });
}

beforeEach(() => {
  vi.mocked(NextResponse.next).mockClear();
  vi.mocked(NextResponse.redirect).mockClear();
});

describe("proxy", () => {
  describe("skip prefixes", () => {
    it.each([
      "/_next/static/chunk.js",
      "/api/csp-report",
      "/static/file.txt",
      "/icons/icon-192",
      "/icons/icon-512",
      "/images/photo.jpg",
      "/favicon.ico",
      "/icon",
      "/apple-icon",
      "/serwist/sw.js",
      "/sitemap.xml",
      "/robots.txt",
      "/manifest.webmanifest",
    ])("skips %s without redirect", (path) => {
      proxy(createRequest(path));
      expect(NextResponse.next).toHaveBeenCalled();
      expect(NextResponse.redirect).not.toHaveBeenCalled();
    });
  });

  describe("locale prefix detection", () => {
    it("passes through requests with valid locale prefix", () => {
      proxy(createRequest("/ja/blog"));
      expect(NextResponse.next).toHaveBeenCalled();
      expect(NextResponse.redirect).not.toHaveBeenCalled();
    });

    it("passes through /en paths", () => {
      proxy(createRequest("/en/about"));
      expect(NextResponse.next).toHaveBeenCalled();
      expect(NextResponse.redirect).not.toHaveBeenCalled();
    });
  });

  describe("locale redirect", () => {
    it("redirects to default locale when no Accept-Language", () => {
      proxy(createRequest("/blog"));
      expect(NextResponse.redirect).toHaveBeenCalled();
      const redirectUrl = vi.mocked(NextResponse.redirect).mock.calls[0][0] as URL;
      expect(redirectUrl.pathname).toBe("/en/blog");
    });

    it("redirects to ja when Accept-Language includes ja", () => {
      proxy(createRequest("/blog", { "accept-language": "ja,en;q=0.9" }));
      expect(NextResponse.redirect).toHaveBeenCalled();
      const redirectUrl = vi.mocked(NextResponse.redirect).mock.calls[0][0] as URL;
      expect(redirectUrl.pathname).toBe("/ja/blog");
    });
  });
});
