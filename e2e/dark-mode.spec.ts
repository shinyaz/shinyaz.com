import { test, expect } from "@playwright/test";

test.describe("Dark Mode", () => {
  test("theme toggle button is visible", async ({ page }) => {
    await page.goto("/en");
    const toggle = page.locator('button[aria-label*="theme"], button[aria-label*="Theme"], button[aria-label*="テーマ"]');
    await expect(toggle.first()).toBeVisible();
  });

  test("clicking theme toggle changes html class", async ({ page }) => {
    await page.goto("/en");
    const toggle = page.locator('button[aria-label*="theme"], button[aria-label*="Theme"], button[aria-label*="テーマ"]').first();
    const htmlEl = page.locator("html");

    const classBefore = await htmlEl.getAttribute("class");
    await toggle.click();
    await page.waitForTimeout(500);
    const classAfter = await htmlEl.getAttribute("class");

    // Class should have changed (dark added or removed)
    expect(classBefore).not.toBe(classAfter);
  });

  test("theme persists after navigation", async ({ page }) => {
    await page.goto("/en");
    const toggle = page.locator('button[aria-label*="theme"], button[aria-label*="Theme"], button[aria-label*="テーマ"]').first();
    await toggle.click();
    await page.waitForTimeout(500);
    const classAfterToggle = await page.locator("html").getAttribute("class");

    await page.goto("/en/blog");
    await page.waitForLoadState("networkidle");
    const classAfterNav = await page.locator("html").getAttribute("class");
    expect(classAfterNav).toBe(classAfterToggle);
  });
});
