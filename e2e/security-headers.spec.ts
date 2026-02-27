import { test, expect } from "@playwright/test";

test.describe("Security Headers", () => {
  let headers: Record<string, string>;

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    const response = await page.goto("/en");
    const allHeaders = response?.headers() ?? {};
    headers = allHeaders;
    await page.close();
  });

  test("Content-Security-Policy is set", () => {
    expect(headers["content-security-policy"]).toBeDefined();
    const csp = headers["content-security-policy"];
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("script-src 'self' 'unsafe-inline' https://www.googletagmanager.com");
    expect(csp).toContain("style-src 'self' 'unsafe-inline'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("frame-ancestors 'none'");
  });

  test("X-Content-Type-Options is nosniff", () => {
    expect(headers["x-content-type-options"]).toBe("nosniff");
  });

  test("X-Frame-Options is DENY", () => {
    expect(headers["x-frame-options"]).toBe("DENY");
  });

  test("Referrer-Policy is strict-origin-when-cross-origin", () => {
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  });

  test("Permissions-Policy restricts browser features", () => {
    expect(headers["permissions-policy"]).toBe(
      "camera=(), microphone=(), geolocation=()"
    );
  });

  test("Strict-Transport-Security is set with long max-age", () => {
    expect(headers["strict-transport-security"]).toBe(
      "max-age=63072000; includeSubDomains; preload"
    );
  });

  test("X-DNS-Prefetch-Control is on", () => {
    expect(headers["x-dns-prefetch-control"]).toBe("on");
  });
});
