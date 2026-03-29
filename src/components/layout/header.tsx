import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/i18n";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { MobileNav } from "@/components/layout/mobile-nav";

interface HeaderProps {
  locale: Locale;
}

export function Header({ locale }: HeaderProps) {
  const t = getDictionary(locale);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
        <Link href={`/${locale}`} className="text-lg font-bold tracking-tight">
          {t.site.name}
        </Link>
        <nav className="hidden items-center gap-4 md:flex">
          <Link href={`/${locale}/blog`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {t.nav.blog}
          </Link>
          <Link href={`/${locale}/til`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {t.nav.til}
          </Link>
          <Link href={`/${locale}/series`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {t.nav.series}
          </Link>
          <Link href={`/${locale}/now`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {t.nav.now}
          </Link>
          <Link href={`/${locale}/about`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {t.nav.about}
          </Link>
          <Link
            href={`/${locale}/search`}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label={t.search.label}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </Link>
          <LanguageSwitcher locale={locale} />
          <ThemeToggle />
        </nav>
        <MobileNav locale={locale} t={t} />
      </div>
    </header>
  );
}
