import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";

// next/script renders a regular script tag in test environment
vi.mock("next/script", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    const { dangerouslySetInnerHTML, ...rest } = props;
    if (dangerouslySetInnerHTML) {
      return <script {...rest} data-testid="gtm-script" />;
    }
    return <script {...rest} />;
  },
}));

describe("GTM", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("renders nothing when NEXT_PUBLIC_GTM_ID is not set", async () => {
    vi.stubEnv("NEXT_PUBLIC_GTM_ID", "");
    const { GTM } = await import("@/components/common/gtm");
    const { container } = render(<GTM />);
    expect(container.innerHTML).toBe("");
  });

  it("renders script tag when NEXT_PUBLIC_GTM_ID is set", async () => {
    vi.stubEnv("NEXT_PUBLIC_GTM_ID", "GTM-TEST123");
    const { GTM } = await import("@/components/common/gtm");
    const { container } = render(<GTM />);
    const script = container.querySelector("[data-testid='gtm-script']");
    expect(script).not.toBeNull();
    expect(script?.getAttribute("id")).toBe("gtm");
  });
});

describe("GTMNoScript", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("renders nothing when NEXT_PUBLIC_GTM_ID is not set", async () => {
    vi.stubEnv("NEXT_PUBLIC_GTM_ID", "");
    const { GTMNoScript } = await import("@/components/common/gtm");
    const { container } = render(<GTMNoScript />);
    expect(container.innerHTML).toBe("");
  });

  it("renders noscript with iframe when NEXT_PUBLIC_GTM_ID is set", async () => {
    vi.stubEnv("NEXT_PUBLIC_GTM_ID", "GTM-TEST123");
    const { GTMNoScript } = await import("@/components/common/gtm");
    // jsdom strips noscript children when scripting is enabled,
    // so use server-side rendering to verify the full output
    const html = renderToStaticMarkup(<GTMNoScript />);
    expect(html).toContain("<noscript>");
    expect(html).toContain("iframe");
    expect(html).toContain(
      "https://www.googletagmanager.com/ns.html?id=GTM-TEST123"
    );
  });
});
