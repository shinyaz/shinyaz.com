import { test, expect } from "@playwright/test";

test.describe("Internationalization", () => {
  test("English pages render English content", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("text=Latest Posts")).toBeVisible();
  });

  test("Japanese pages render Japanese content", async ({ page }) => {
    await page.goto("/ja");
    await expect(page.locator("text=最新記事")).toBeVisible();
  });

  test("language switcher changes locale in URL", async ({ page }) => {
    await page.goto("/en");
    // Find and click language switcher (link to Japanese version)
    const jaSwitcher = page.locator('a[href="/ja"], a[hreflang="ja"]').first();
    if (await jaSwitcher.isVisible()) {
      await jaSwitcher.click();
      await expect(page).toHaveURL(/\/ja/);
    }
  });

  test("English blog page shows English labels", async ({ page }) => {
    await page.goto("/en/blog");
    await expect(page.locator("h1")).toContainText("Blog");
  });

  test("Japanese blog page shows Japanese labels", async ({ page }) => {
    await page.goto("/ja/blog");
    await expect(page.locator("h1")).toContainText("ブログ");
  });
});
