import Link from "next/link";
import type { Locale } from "@/lib/i18n";

interface TagBadgeProps {
  slug: string;
  locale: Locale;
}

export function TagBadge({ slug, locale }: TagBadgeProps) {
  return (
    <Link
      href={`/${locale}/tag/${slug}`}
      className="inline-block rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
    >
      #{slug}
    </Link>
  );
}
