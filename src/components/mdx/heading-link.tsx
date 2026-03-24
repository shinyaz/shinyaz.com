"use client";

import React, { useState, useCallback } from "react";

type HeadingTag = "h2" | "h3" | "h4";

function HeadingLink({
  as: Tag,
  id,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { as: HeadingTag }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    if (!id) return;
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [id]);

  return (
    <Tag id={id} className="group relative" {...props}>
      {children}
      {id && (
        <button
          type="button"
          onClick={handleCopy}
          className="ml-2 inline-flex translate-y-1 items-center opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
          aria-label="Copy link to section"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className={`size-[1em] ${copied ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            {copied ? (
              <path d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" />
            ) : (
              <path d="M8.914 7.086a2.5 2.5 0 0 1 0 3.536L7.03 12.5a2.5 2.5 0 0 1-3.536-3.536l.879-.878a.75.75 0 1 1 1.06 1.06l-.878.879a1 1 0 1 0 1.414 1.414l1.884-1.878a1 1 0 0 0 0-1.414.75.75 0 1 1 1.06-1.06ZM7.086 8.914a2.5 2.5 0 0 1 0-3.536L8.97 3.5a2.5 2.5 0 0 1 3.536 3.536l-.879.878a.75.75 0 0 1-1.06-1.06l.878-.879a1 1 0 0 0-1.414-1.414L8.147 6.44a1 1 0 0 0 0 1.414.75.75 0 1 1-1.06 1.06Z" />
            )}
          </svg>
        </button>
      )}
    </Tag>
  );
}

export const HeadingH2 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <HeadingLink as="h2" {...props} />
);
export const HeadingH3 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <HeadingLink as="h3" {...props} />
);
export const HeadingH4 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <HeadingLink as="h4" {...props} />
);
