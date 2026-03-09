"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

interface MermaidProps {
  chart: string;
}

export function Mermaid({ chart }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    let cancelled = false;

    async function render() {
      const mermaid = (await import("mermaid")).default;
      mermaid.initialize({
        startOnLoad: false,
        theme: resolvedTheme === "dark" ? "dark" : "default",
        fontFamily: "inherit",
      });

      const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
      const { svg: rendered } = await mermaid.render(id, chart);
      if (!cancelled) {
        setSvg(rendered);
      }
    }

    render();
    return () => {
      cancelled = true;
    };
  }, [chart, resolvedTheme]);

  return (
    <div
      ref={containerRef}
      className="my-6 flex justify-center [&>svg]:max-w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
