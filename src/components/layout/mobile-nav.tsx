"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { LanguageSwitcher } from "@/components/layout/language-switcher";

interface MobileNavProps {
  locale: Locale;
  t: Dictionary;
}

export function MobileNav({ locale, t }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const navLinks = [
    { href: `/${locale}/blog`, label: t.nav.blog },
    { href: `/${locale}/projects`, label: t.nav.projects },
    { href: `/${locale}/uses`, label: t.nav.uses },
    { href: `/${locale}/about`, label: t.nav.about },
    { href: `/${locale}/search`, label: t.search.title },
  ];

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        aria-expanded={isOpen}
        aria-label={isOpen ? t.nav.closeMenu : t.nav.menu}
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        )}
      </button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed top-14 right-0 bottom-0 left-0 z-40 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer */}
          <nav className="fixed top-14 right-0 bottom-0 z-50 w-3/4 max-w-xs border-l border-border bg-background p-6 transition-transform motion-reduce:transition-none">
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block text-base text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center gap-3 border-t border-border pt-6">
              <LanguageSwitcher locale={locale} />
              <ThemeToggle />
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
