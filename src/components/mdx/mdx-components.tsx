import Image from "next/image";
import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
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
    const isExternal = href?.startsWith("http");
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
