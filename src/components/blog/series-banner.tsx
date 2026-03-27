import type { Post } from "#site/content";
import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/i18n";

interface SeriesBannerProps {
  seriesPosts: Post[];
  currentPermalink: string;
  locale: Locale;
  seriesTitle?: { name: string; suffix: string };
}

export function SeriesBanner({
  seriesPosts,
  currentPermalink,
  locale,
  seriesTitle,
}: SeriesBannerProps) {
  if (seriesPosts.length < 2) return null;

  const t = getDictionary(locale);
  const currentIndex = seriesPosts.findIndex(
    (p) => p.permalink === currentPermalink
  );
  const prev = currentIndex > 0 ? seriesPosts[currentIndex - 1] : null;
  const next =
    currentIndex < seriesPosts.length - 1
      ? seriesPosts[currentIndex + 1]
      : null;

  return (
    <nav
      aria-label={seriesTitle ? `${seriesTitle.name}${seriesTitle.suffix}` : t.series.title}
      className="mb-8 overflow-hidden rounded-lg border border-border"
    >
      <div className="px-5 py-3">
        <div className="flex items-center justify-between">
          <span className="text-[0.9375rem] font-bold tracking-tight">
            {seriesTitle ? (
              <>
                {seriesTitle.name}
                <span className="font-normal">{seriesTitle.suffix}</span>
              </>
            ) : (
              t.series.title
            )}
          </span>
          <span className="text-sm text-muted-foreground">
            {currentIndex + 1} / {seriesPosts.length}
          </span>
        </div>
        <div className="mt-2 flex gap-1">
          {seriesPosts.map((post, index) => (
            <div
              key={post.permalink}
              className={`h-1 flex-1 rounded-full ${
                index <= currentIndex ? "bg-foreground" : "bg-border"
              }`}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between text-sm">
          {prev ? (
            <Link
              href={prev.permalink}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              ← {t.series.prev}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={next.permalink}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {t.series.next} →
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>
    </nav>
  );
}
