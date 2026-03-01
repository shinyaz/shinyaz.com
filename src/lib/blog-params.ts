import { getPublishedPosts } from "./posts";
import { locales } from "./i18n";

export function generateBlogStaticParams() {
  const allParams: { locale: string; year: string; month: string; day: string; slug: string }[] = [];
  for (const locale of locales) {
    const posts = getPublishedPosts(locale);
    for (const post of posts) {
      allParams.push({
        locale,
        year: post.year,
        month: post.month,
        day: post.day,
        slug: post.slugName,
      });
    }
  }
  return allParams;
}
