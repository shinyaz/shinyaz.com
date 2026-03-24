import React from "react";
import Image from "next/image";
import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "./code-block";
import { Mermaid } from "./mermaid";
import { HeadingH2, HeadingH3, HeadingH4 } from "./heading-link";

/**
 * Extract plain text from rehype-pretty-code's span tree.
 * Each line is wrapped in `<span data-line>` containing styled `<span>`s.
 */
function extractTextFromChildren(children: React.ReactNode): string {
  const parts: string[] = [];

  function walk(node: React.ReactNode) {
    if (typeof node === "string") {
      parts.push(node);
      return;
    }
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }
    if (React.isValidElement(node)) {
      const props = node.props as { children?: React.ReactNode };
      if (props.children != null) {
        walk(props.children);
      }
    }
  }

  walk(children);
  return parts.join("");
}

function isMermaidBlock(
  props: Record<string, unknown>,
  child: React.ReactElement<Record<string, unknown>> | undefined,
): boolean {
  // rehype-pretty-code sets data-language on pre
  if (props["data-language"] === "mermaid") return true;
  // Standard MDX without rehype-pretty-code
  if (child?.props?.className === "language-mermaid") return true;
  return false;
}

export const mdxComponents: MDXComponents = {
  h2: HeadingH2,
  h3: HeadingH3,
  h4: HeadingH4,
  pre: ({ children, ...props }) => {
    const child = children as
      | React.ReactElement<{
          className?: string;
          children?: React.ReactNode;
          [key: string]: unknown;
        }>
      | undefined;

    if (isMermaidBlock(props, child)) {
      const chart = child?.props?.children
        ? extractTextFromChildren(child.props.children).trim()
        : "";
      if (chart) {
        return <Mermaid chart={chart} />;
      }
    }

    return (
      <CodeBlock {...(props as React.HTMLAttributes<HTMLPreElement>)}>
        {children}
      </CodeBlock>
    );
  },
  img: ({ src, alt, ...props }) => {
    if (!src) return null;
    return (
      <Image
        src={src}
        alt={alt ?? ""}
        width={800}
        height={400}
        className="rounded-lg"
        {...props}
      />
    );
  },
  a: ({ href, children, ...props }) => {
    if (href && !/^(https?:\/\/|\/|#|mailto:)/.test(href)) {
      return <span {...props}>{children}</span>;
    }
    const isExternal =
      href?.startsWith("http://") || href?.startsWith("https://");
    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
      </a>
    );
  },
};
