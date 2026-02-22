import { PostCard } from "./post-card";
import { getDictionary, type Locale } from "@/lib/i18n";

interface Post {
  title: string;
  description?: string;
  date: string;
  permalink: string;
  categories: string[];
}

interface PostListProps {
  posts: Post[];
  locale: Locale;
}

export function PostList({ posts, locale }: PostListProps) {
  const t = getDictionary(locale);

  if (posts.length === 0) {
    return <p className="text-muted-foreground py-8">{t.blog.empty}</p>;
  }

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.permalink} {...post} locale={locale} />
      ))}
    </div>
  );
}
