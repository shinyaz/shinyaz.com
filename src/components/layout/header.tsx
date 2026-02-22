import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/i18n";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { LanguageSwitcher } from "@/components/layout/language-switcher";

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
        <nav className="flex items-center gap-4">
          <Link href={`/${locale}/blog`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {t.nav.blog}
          </Link>
          <LanguageSwitcher locale={locale} />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
