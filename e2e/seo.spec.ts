import { test, expect } from "@playwright/test";

test.describe("SEO Meta Tags", () => {
  test.describe("Blog Post", () => {
    let postUrl: string;

    test.beforeEach(async ({ page }) => {
      await page.goto("/en/blog");
      const href = await page.locator("article a").first().getAttribute("href");
      expect(href).toBeTruthy();
      postUrl = href!;
      await page.goto(postUrl);
    });

    test("has canonical link", async ({ page }) => {
      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveCount(1);
      const href = await canonical.getAttribute("href");
      expect(href).toContain("/en/blog/");
    });

    test("has hreflang alternate links", async ({ page }) => {
      const alternates = page.locator('link[rel="alternate"][hreflang]');
      const count = await alternates.count();
      expect(count).toBeGreaterThanOrEqual(1);

      const hreflangs = await alternates.evaluateAll((els) =>
        els.map((el) => el.getAttribute("hreflang")),
      );
      expect(hreflangs).toContain("en");
    });

    test("has BlogPosting JSON-LD", async ({ page }) => {
      const scripts = page.locator('script[type="application/ld+json"]');
      const contents = await scripts.evaluateAll((els) =>
        els.map((el) => el.textContent),
      );
      const blogPosting = contents.find((c) => c?.includes('"BlogPosting"'));
      expect(blogPosting).toBeTruthy();

      const data = JSON.parse(blogPosting!);
      expect(data["@type"]).toBe("BlogPosting");
      expect(data.headline).toBeTruthy();
      expect(data.datePublished).toBeTruthy();
      expect(data.author.name).toBeTruthy();
      expect(data.url).toContain("/en/blog/");
      expect(data.inLanguage).toBe("en");
    });

    test("has BreadcrumbList JSON-LD", async ({ page }) => {
      const scripts = page.locator('script[type="application/ld+json"]');
      const contents = await scripts.evaluateAll((els) =>
        els.map((el) => el.textContent),
      );
      const breadcrumb = contents.find((c) => c?.includes('"BreadcrumbList"'));
      expect(breadcrumb).toBeTruthy();

      const data = JSON.parse(breadcrumb!);
      expect(data["@type"]).toBe("BreadcrumbList");
      expect(data.itemListElement.length).toBeGreaterThanOrEqual(3);
    });
  });

  test.describe("TIL Entry", () => {
    let tilUrl: string;

    test.beforeEach(async ({ page }) => {
      await page.goto("/en/til");
      const href = await page.locator("article a").first().getAttribute("href");
      expect(href).toBeTruthy();
      tilUrl = href!;
      await page.goto(tilUrl);
    });

    test("has canonical link", async ({ page }) => {
      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveCount(1);
      const href = await canonical.getAttribute("href");
      expect(href).toContain("/en/til/");
    });

    test("has TechArticle JSON-LD", async ({ page }) => {
      const scripts = page.locator('script[type="application/ld+json"]');
      const contents = await scripts.evaluateAll((els) =>
        els.map((el) => el.textContent),
      );
      const techArticle = contents.find((c) => c?.includes('"TechArticle"'));
      expect(techArticle).toBeTruthy();

      const data = JSON.parse(techArticle!);
      expect(data["@type"]).toBe("TechArticle");
      expect(data.headline).toBeTruthy();
      expect(data.inLanguage).toBe("en");
    });

    test("has OG image meta tag", async ({ page }) => {
      const ogImage = page.locator('meta[property="og:image"]');
      await expect(ogImage).toHaveCount(1);
      const content = await ogImage.getAttribute("content");
      expect(content).toBeTruthy();
    });
  });

  test.describe("Japanese Blog Post", () => {
    test("has correct inLanguage in JSON-LD", async ({ page }) => {
      await page.goto("/ja/blog");
      const href = await page.locator("article a").first().getAttribute("href");
      expect(href).toBeTruthy();
      await page.goto(href!);

      const scripts = page.locator('script[type="application/ld+json"]');
      const contents = await scripts.evaluateAll((els) =>
        els.map((el) => el.textContent),
      );
      const blogPosting = contents.find((c) => c?.includes('"BlogPosting"'));
      expect(blogPosting).toBeTruthy();

      const data = JSON.parse(blogPosting!);
      expect(data.inLanguage).toBe("ja");
    });
  });
});
