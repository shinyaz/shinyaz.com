import { test, expect } from "@playwright/test";

test.describe("Static Pages", () => {
  test("English Now page loads", async ({ page }) => {
    await page.goto("/en/now");
    await expect(page.locator("h1")).toBeVisible();
  });

  test("Japanese Now page loads", async ({ page }) => {
    await page.goto("/ja/now");
    await expect(page.locator("h1")).toBeVisible();
  });

  test("English Colophon page loads", async ({ page }) => {
    await page.goto("/en/colophon");
    await expect(page.locator("h1")).toBeVisible();
  });

  test("Japanese Colophon page loads", async ({ page }) => {
    await page.goto("/ja/colophon");
    await expect(page.locator("h1")).toBeVisible();
  });

  test("English Privacy page loads", async ({ page }) => {
    await page.goto("/en/privacy");
    await expect(page.locator("h1")).toBeVisible();
  });

  test("Japanese Privacy page loads", async ({ page }) => {
    await page.goto("/ja/privacy");
    await expect(page.locator("h1")).toBeVisible();
  });

  test("English About page has content", async ({ page }) => {
    await page.goto("/en/about");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("article, .prose").first()).toBeVisible();
  });

  test("Japanese About page has content", async ({ page }) => {
    await page.goto("/ja/about");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("article, .prose").first()).toBeVisible();
  });

  test("English Projects page shows project cards", async ({ page }) => {
    await page.goto("/en/projects");
    await expect(page.locator("h1")).toBeVisible();
  });

  test("Japanese Projects page shows project cards", async ({ page }) => {
    await page.goto("/ja/projects");
    await expect(page.locator("h1")).toBeVisible();
  });

  test("English Uses page has content", async ({ page }) => {
    await page.goto("/en/uses");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("article, .prose").first()).toBeVisible();
  });

  test("Japanese Uses page has content", async ({ page }) => {
    await page.goto("/ja/uses");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("article, .prose").first()).toBeVisible();
  });
});
