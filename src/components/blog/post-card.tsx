import Link from "next/link";
import { formatDate, formatReadingTime } from "@/lib/utils";
import { CategoryBadge } from "./category-badge";
import { TagBadge } from "./tag-badge";
import { type Locale, getDictionary } from "@/lib/i18n";

interface PostCardProps {
  title: string;
  description?: string;
  date: string;
  permalink: string;
  categories: string[];
  tags: string[];
  locale: Locale;
  readingTime?: number;
}

const MAX_TAGS = 3;

export function PostCard({ title, description, date, permalink, categories, tags, locale, readingTime }: PostCardProps) {
  const t = getDictionary(locale);
  return (
    <article className="group border-b border-border py-6 first:pt-0 last:border-b-0 border-l-3 border-l-foreground pl-4">
      <div className="flex items-center gap-2 mb-1.5">
        <span className="inline-flex items-center rounded-sm bg-foreground/10 px-1.5 py-0.5 text-xs font-semibold text-foreground">
          {t.blog.title}
        </span>
      </div>
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
        {readingTime != null && (
          <span className="text-xs text-muted-foreground">
            {formatReadingTime(readingTime, locale)}
          </span>
        )}
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
              <span className="text-xs text-muted-foreground">+{tags.length - MAX_TAGS}</span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
