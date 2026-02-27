export interface SearchablePost {
  title: string;
  description?: string;
  date: string;
  permalink: string;
  categories: string[];
  tags: string[];
}

export interface SearchResult {
  post: SearchablePost;
  matchedFields: string[];
}

export function searchPosts(
  posts: SearchablePost[],
  query: string,
): SearchResult[] {
  const trimmed = query.trim();
  if (trimmed === "") return [];

  const tokens = trimmed.toLowerCase().split(/\s+/);

  return posts.reduce<SearchResult[]>((results, post) => {
    const fields: Record<string, string> = {
      title: post.title.toLowerCase(),
      description: (post.description ?? "").toLowerCase(),
      categories: post.categories.join(" ").toLowerCase(),
      tags: post.tags.join(" ").toLowerCase(),
    };

    const matchedFields = new Set<string>();
    const allTokensMatch = tokens.every((token) => {
      let tokenFound = false;
      for (const [field, value] of Object.entries(fields)) {
        if (value.includes(token)) {
          matchedFields.add(field);
          tokenFound = true;
        }
      }
      return tokenFound;
    });

    if (allTokensMatch) {
      results.push({ post, matchedFields: Array.from(matchedFields) });
    }

    return results;
  }, []);
}
