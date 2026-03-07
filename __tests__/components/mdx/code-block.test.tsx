import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { CodeBlock } from "@/components/mdx/code-block";

const mockWriteText = vi.fn().mockResolvedValue(undefined);
Object.assign(navigator, {
  clipboard: { writeText: mockWriteText },
});

beforeEach(() => {
  vi.clearAllMocks();
  vi.useFakeTimers();
});

describe("CodeBlock", () => {
  it("renders children inside a pre element", () => {
    render(
      <CodeBlock>
        <code>const x = 1;</code>
      </CodeBlock>
    );
    expect(screen.getByRole("code")).toBeDefined();
  });

  it("renders a copy button", () => {
    render(<CodeBlock>hello</CodeBlock>);
    expect(screen.getByRole("button", { name: "Copy code" })).toBeDefined();
  });

  it("copies textContent to clipboard on button click", async () => {
    render(
      <CodeBlock>
        <code>console.log(hi)</code>
      </CodeBlock>
    );
    const button = screen.getByRole("button", { name: "Copy code" });
    await act(async () => {
      fireEvent.click(button);
    });
    expect(mockWriteText).toHaveBeenCalledWith("console.log(hi)");
  });

  it("shows Copied state after click and reverts after 2s", async () => {
    render(<CodeBlock>code</CodeBlock>);
    const button = screen.getByRole("button", { name: "Copy code" });

    await act(async () => {
      fireEvent.click(button);
    });
    expect(screen.getByRole("button", { name: "Copied" })).toBeDefined();

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByRole("button", { name: "Copy code" })).toBeDefined();
  });
});
