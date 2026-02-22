"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";

interface LanguageSwitcherProps {
  locale: Locale;
}

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const targetLocale = locale === "ja" ? "en" : "ja";
  const targetPath = pathname.replace(`/${locale}`, `/${targetLocale}`);

  return (
    <Link
      href={targetPath}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-xs font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
    >
      {locale === "ja" ? "EN" : "JP"}
    </Link>
  );
}
