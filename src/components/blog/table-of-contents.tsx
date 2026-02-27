"use client";

import { useEffect, useRef, useState } from "react";
import type { TocItem } from "@/lib/toc";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";

interface TableOfContentsProps {
  headings: TocItem[];
  locale: Locale;
}

export function TableOfContents({ headings, locale }: TableOfContentsProps) {
  const t = getDictionary(locale);
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "0px 0px -80% 0px", threshold: 0 }
    );

    for (const el of elements) {
      observerRef.current.observe(el);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <details className="toc mb-8 rounded-lg border border-border bg-muted/50 p-4" open>
      <summary className="cursor-pointer text-sm font-semibold">
        {t.toc.title}
      </summary>
      <nav aria-label={t.toc.title} className="mt-3">
        <ul className="space-y-1 text-sm">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={heading.level === 3 ? "ml-4" : ""}
            >
              <a
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(heading.id)?.scrollIntoView({
                    behavior: "smooth",
                  });
                  setActiveId(heading.id);
                }}
                className={`block py-0.5 transition-colors hover:text-foreground ${
                  activeId === heading.id
                    ? "font-bold text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  );
}
