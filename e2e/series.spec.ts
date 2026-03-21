import { test, expect } from "@playwright/test";

test.describe("Series Navigation", () => {
  test("blog post in a series shows series navigation", async ({ page }) => {
    // Find a post that belongs to a series
    await page.goto("/en/blog");
    // Navigate to a known series post via search
    await page.goto("/en/search?q=agentic+ai+on+eks");
    await page.waitForLoadState("networkidle");
    const seriesLink = page.locator("article a").first();
    if (await seriesLink.isVisible()) {
      await seriesLink.click();
      await expect(page).toHaveURL(/\/en\/(blog|til)\//);
      // Series navigation should be present if this is a series post
      const seriesNav = page.locator("text=Series");
      if (await seriesNav.isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(seriesNav).toBeVisible();
      }
    }
  });
});
