import { test, expect } from "@playwright/test";

test.describe("OG Image", () => {
  test("English blog post has og:image meta tag", async ({ page }) => {
    await page.goto("/en/blog");
    const firstPostLink = page.locator("article a").first();
    const href = await firstPostLink.getAttribute("href");
    expect(href).toBeTruthy();

    await page.goto(href!);
    const ogImage = page.locator('meta[property="og:image"]');
    await expect(ogImage).toHaveCount(1);

    const content = await ogImage.getAttribute("content");
    expect(content).toBeTruthy();
    expect(content).toContain("opengraph-image");
  });

  test("Japanese blog post has og:image meta tag", async ({ page }) => {
    await page.goto("/ja/blog");
    const firstPostLink = page.locator("article a").first();
    const href = await firstPostLink.getAttribute("href");
    expect(href).toBeTruthy();

    await page.goto(href!);
    const ogImage = page.locator('meta[property="og:image"]');
    await expect(ogImage).toHaveCount(1);

    const content = await ogImage.getAttribute("content");
    expect(content).toBeTruthy();
    expect(content).toContain("opengraph-image");
  });

  test("OG image URL returns a PNG image", async ({ page, request, baseURL }) => {
    await page.goto("/en/blog");
    const firstPostLink = page.locator("article a").first();
    const href = await firstPostLink.getAttribute("href");
    expect(href).toBeTruthy();

    await page.goto(href!);
    const ogImage = page.locator('meta[property="og:image"]');
    const imageUrl = await ogImage.getAttribute("content");
    expect(imageUrl).toBeTruthy();

    // The og:image URL uses the production domain; rewrite to local server
    const localUrl = imageUrl!.replace(/^https?:\/\/[^/]+/, baseURL!);
    const response = await request.get(localUrl);
    expect(response.status()).toBe(200);
    const contentType = response.headers()["content-type"];
    expect(contentType).toContain("image/png");
  });

  test("og:image:width and og:image:height are set", async ({ page }) => {
    await page.goto("/en/blog");
    const firstPostLink = page.locator("article a").first();
    const href = await firstPostLink.getAttribute("href");
    expect(href).toBeTruthy();

    await page.goto(href!);
    const ogWidth = page.locator('meta[property="og:image:width"]');
    const ogHeight = page.locator('meta[property="og:image:height"]');
    await expect(ogWidth).toHaveCount(1);
    await expect(ogHeight).toHaveCount(1);

    expect(await ogWidth.getAttribute("content")).toBe("1200");
    expect(await ogHeight.getAttribute("content")).toBe("630");
  });

  test("twitter:image meta tag is present", async ({ page }) => {
    await page.goto("/en/blog");
    const firstPostLink = page.locator("article a").first();
    const href = await firstPostLink.getAttribute("href");
    expect(href).toBeTruthy();

    await page.goto(href!);
    const twitterImage = page.locator('meta[name="twitter:image"]');
    await expect(twitterImage).toHaveCount(1);
  });
});
