import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { CategoryBadge } from "./category-badge";
import { TagBadge } from "./tag-badge";
import type { Locale } from "@/lib/i18n";

interface FeaturedPostCardProps {
  title: string;
  description?: string;
  date: string;
  permalink: string;
  categories: string[];
  tags: string[];
  locale: Locale;
}

const MAX_TAGS = 3;

export function FeaturedPostCard({
  title,
  description,
  date,
  permalink,
  categories,
  tags,
  locale,
}: FeaturedPostCardProps) {
  return (
    <article className="group rounded-lg border border-border bg-muted/30 p-4 hover:bg-muted/50 transition-colors">
      <Link href={permalink} className="block">
        <h3 className="font-semibold tracking-tight group-hover:underline">
          {title}
        </h3>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        )}
      </Link>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <time dateTime={date} className="text-xs text-muted-foreground">
          {formatDate(date, locale)}
        </time>
        {categories.length > 0 && (
          <div className="flex gap-1.5">
            {categories.map((cat) => (
              <CategoryBadge key={cat} slug={cat} locale={locale} />
            ))}
          </div>
        )}
        {tags.length > 0 && (
          <div className="flex gap-1.5">
            {tags.slice(0, MAX_TAGS).map((tag) => (
              <TagBadge key={tag} slug={tag} locale={locale} />
            ))}
            {tags.length > MAX_TAGS && (
              <span className="text-xs text-muted-foreground">
                +{tags.length - MAX_TAGS}
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
