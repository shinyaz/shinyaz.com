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
      className="rounded-md border border-border px-2 py-0.5 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
    >
      {locale === "ja" ? "EN" : "JP"}
    </Link>
  );
}
