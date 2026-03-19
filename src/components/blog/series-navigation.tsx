import type { Post } from "#site/content";
import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/i18n";

interface SeriesNavigationProps {
  seriesPosts: Post[];
  currentPermalink: string;
  locale: Locale;
}

export function SeriesNavigation({
  seriesPosts,
  currentPermalink,
  locale,
}: SeriesNavigationProps) {
  if (seriesPosts.length < 2) return null;

  const t = getDictionary(locale);
  const currentIndex = seriesPosts.findIndex(
    (p) => p.permalink === currentPermalink
  );
  const mainPosts = seriesPosts.filter((p) => !p.seriesExtra);
  const extraPosts = seriesPosts.filter((p) => p.seriesExtra);

  return (
    <nav
      aria-label={t.series.title}
      className="my-10 overflow-hidden rounded-lg border border-border"
    >
      <div className="border-b border-border bg-muted/50 px-5 py-2">
        <div className="flex items-center justify-between">
          <h2 className="text-[0.9375rem] font-bold tracking-tight">
            {t.series.title}
          </h2>
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
      </div>
      <ol className="divide-y divide-border">
        {mainPosts.map((post, index) => (
          <SeriesItem
            key={post.permalink}
            post={post}
            label={String(index + 1)}
            isCurrent={post.permalink === currentPermalink}
            t={t}
          />
        ))}
      </ol>
      {extraPosts.length > 0 && (
        <>
          <div className="border-t border-dashed border-border px-5 py-1.5 text-xs font-medium tracking-wide text-muted-foreground">
            {t.series.extra}
          </div>
          <ol className="divide-y divide-border">
            {extraPosts.map((post, index) => (
              <SeriesItem
                key={post.permalink}
                post={post}
                label={`+${index + 1}`}
                isCurrent={post.permalink === currentPermalink}
                t={t}
              />
            ))}
          </ol>
        </>
      )}
    </nav>
  );
}

function SeriesItem({
  post,
  label,
  isCurrent,
  t,
}: {
  post: Post;
  label: string;
  isCurrent: boolean;
  t: ReturnType<typeof getDictionary>;
}) {
  if (isCurrent) {
    return (
      <li>
        <div className="flex items-start gap-3 bg-muted/30 px-5 py-2">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
            {label}
          </span>
          <span className="mt-1 text-[0.9375rem] font-medium leading-snug">
            {post.title}
            <span className="ml-2 text-sm text-muted-foreground">
              — {t.series.currentPart}
            </span>
          </span>
        </div>
      </li>
    );
  }

  return (
    <li>
      <Link
        href={post.permalink}
        className="flex items-start gap-3 px-5 py-2 transition-colors hover:bg-muted/30"
      >
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-xs text-muted-foreground">
          {label}
        </span>
        <span className="mt-1 text-[0.9375rem] leading-snug text-muted-foreground hover:text-foreground">
          {post.title}
        </span>
      </Link>
    </li>
  );
}
