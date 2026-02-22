import { AUTHOR } from "@/lib/constants";
import { getDictionary, type Locale } from "@/lib/i18n";

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const t = getDictionary(locale);

  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto max-w-3xl px-4 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} {AUTHOR}. {t.footer.copyright}
      </div>
    </footer>
  );
}
