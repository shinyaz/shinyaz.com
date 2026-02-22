import Link from "next/link";
import type { Locale } from "@/lib/i18n";

interface CategoryBadgeProps {
  slug: string;
  name?: string;
  locale: Locale;
}

export function CategoryBadge({ slug, name, locale }: CategoryBadgeProps) {
  return (
    <Link
      href={`/${locale}/category/${slug}`}
      className="inline-block rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
    >
      {name ?? slug}
    </Link>
  );
}
