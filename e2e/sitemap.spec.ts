import { test, expect } from "@playwright/test";

test.describe("Sitemap", () => {
  test("sitemap.xml returns valid XML", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain("<urlset");
    expect(body).toContain("<url>");
    expect(body).toContain("<loc>");
  });

  test("sitemap contains both locale home pages", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    const body = await response.text();
    expect(body).toContain("/en</loc>");
    expect(body).toContain("/ja</loc>");
  });

  test("sitemap contains hreflang alternates", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    const body = await response.text();
    expect(body).toContain("xhtml:link");
    expect(body).toContain('hreflang="en"');
    expect(body).toContain('hreflang="ja"');
  });
});
