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
  const [isOpen, setIsOpen] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    setIsOpen(window.innerWidth >= 768);
  }, []);

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
    <details className="toc mb-8 overflow-hidden rounded-lg border border-border" open={isOpen} onToggle={(e) => setIsOpen(e.currentTarget.open)}>
      <summary className="cursor-pointer border-b border-border bg-muted/50 px-5 py-2 text-base font-bold tracking-tight">
        {t.toc.title}
      </summary>
      <nav aria-label={t.toc.title} className="px-5 py-3">
        <ul className="space-y-0.5">
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            return (
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
                  className={`block rounded-md px-3 py-1 text-[0.9375rem] transition-colors hover:bg-muted/50 hover:text-foreground ${
                    isActive
                      ? "border-l-2 border-foreground bg-muted/30 font-medium text-foreground"
                      : "border-l-2 border-transparent text-muted-foreground"
                  }`}
                >
                  {heading.text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </details>
  );
}
