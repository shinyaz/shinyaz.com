"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PostCard } from "@/components/blog/post-card";
import { searchPosts, type SearchablePost } from "@/lib/search";
import type { Dictionary, Locale } from "@/lib/i18n";

interface SearchPageClientProps {
  posts: SearchablePost[];
  locale: Locale;
  t: Dictionary;
}

export function SearchPageClient({ posts, locale, t }: SearchPageClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  const results = useMemo(() => searchPosts(posts, query), [posts, query]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value);
    const params = new URLSearchParams();
    if (value.trim()) {
      params.set("q", value.trim());
    }
    router.replace(`/${locale}/search${params.size > 0 ? `?${params}` : ""}`, {
      scroll: false,
    });
  }

  const trimmed = query.trim();

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={handleChange}
        placeholder={t.search.placeholder}
        aria-label={t.search.label}
        className="w-full rounded-md border border-border bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
        autoFocus
      />
      {trimmed !== "" && (
        <div className="mt-6">
          {results.length > 0 ? (
            <>
              <p className="mb-4 text-sm text-muted-foreground">
                {t.search.resultsCount.replace(
                  "{count}",
                  String(results.length),
                )}
              </p>
              <div>
                {results.map(({ post }) => (
                  <PostCard
                    key={post.permalink}
                    title={post.title}
                    description={post.description}
                    date={post.date}
                    permalink={post.permalink}
                    categories={post.categories}
                    tags={post.tags}
                    locale={locale}
                  />
                ))}
              </div>
            </>
          ) : (
            <p className="text-muted-foreground py-8">
              {t.search.noResults.replace("{query}", trimmed)}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
