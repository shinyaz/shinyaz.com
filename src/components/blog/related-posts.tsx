import type { Post } from "#site/content";
import { PostCard } from "./post-card";
import { getDictionary, type Locale } from "@/lib/i18n";

interface RelatedPostsProps {
  posts: Post[];
  locale: Locale;
}

export function RelatedPosts({ posts, locale }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  const t = getDictionary(locale);

  return (
    <section className="mt-12 border-t border-border pt-8">
      <h2 className="mb-6 text-xl font-bold tracking-tight">
        {t.relatedPosts.title}
      </h2>
      <div className="divide-y divide-border">
        {posts.map((post) => (
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
    </section>
  );
}
