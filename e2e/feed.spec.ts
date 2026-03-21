import { test, expect } from "@playwright/test";

test.describe("RSS and Atom Feeds", () => {
  test("English RSS feed returns valid XML", async ({ request }) => {
    const response = await request.get("/en/feed.xml");
    expect(response.status()).toBe(200);
    const contentType = response.headers()["content-type"] ?? "";
    expect(contentType).toContain("xml");
    const body = await response.text();
    expect(body).toContain("<rss");
    expect(body).toContain("<channel>");
    expect(body).toContain("<item>");
  });

  test("Japanese RSS feed returns valid XML", async ({ request }) => {
    const response = await request.get("/ja/feed.xml");
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain("<rss");
    expect(body).toContain("<item>");
  });

  test("English Atom feed returns valid XML", async ({ request }) => {
    const response = await request.get("/en/atom.xml");
    expect(response.status()).toBe(200);
    const contentType = response.headers()["content-type"] ?? "";
    expect(contentType).toContain("xml");
    const body = await response.text();
    expect(body).toContain("<feed");
    expect(body).toContain("<entry>");
  });

  test("Japanese Atom feed returns valid XML", async ({ request }) => {
    const response = await request.get("/ja/atom.xml");
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain("<feed");
    expect(body).toContain("<entry>");
  });
});
