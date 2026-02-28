import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { CategoryBadge } from "./category-badge";
import { TagBadge } from "./tag-badge";
import type { Locale } from "@/lib/i18n";

interface PostCardProps {
  title: string;
  description?: string;
  date: string;
  permalink: string;
  categories: string[];
  tags: string[];
  locale: Locale;
}

export function PostCard({ title, description, date, permalink, categories, tags, locale }: PostCardProps) {
  return (
    <article className="group border-b border-border py-6 first:pt-0 last:border-b-0">
      <Link href={permalink} className="block">
        <h2 className="text-lg font-semibold tracking-tight group-hover:underline">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        )}
      </Link>
      <div className="mt-2 flex flex-wrap items-center gap-2 md:gap-3">
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
            {tags.map((tag) => (
              <TagBadge key={tag} slug={tag} locale={locale} />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
