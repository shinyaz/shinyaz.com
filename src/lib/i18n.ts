export const locales = ["ja", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

const dictionaries = {
  ja: {
    site: {
      name: "shinyaz.com",
      description: "shinyazの個人技術ブログ",
    },
    home: {
      subtitle: "技術に関するメモや学びを記録するブログです。",
      featuredPosts: "注目記事",
      latestPosts: "最新記事",
      allPosts: "すべての記事",
      aboutRole: "ソリューションアーキテクト @ AWS",
      aboutBio:
        "AWS ソリューションアーキテクトとして金融業界のお客様を中心に技術支援を行っています。クラウドアーキテクチャや AI/ML に関する学びをこのブログで発信しています。",
      aboutReadMore: "もっと見る",
    },
    blog: {
      title: "ブログ",
      description: "すべてのブログ記事一覧",
      empty: "記事がありません。",
      browseCategories: "カテゴリ一覧",
      browseTags: "タグ一覧",
    },
    nav: {
      blog: "ブログ",
      projects: "プロジェクト",
      uses: "使用ツール",
      about: "自己紹介",
      menu: "メニュー",
      closeMenu: "メニューを閉じる",
    },
    projects: {
      description: "個人プロジェクトやオープンソースの取り組み",
    },
    category: {
      title: "カテゴリ",
      description: "すべてのカテゴリ一覧",
      postCount: "{count}件の記事",
    },
    tag: {
      title: "タグ",
      description: "「{tag}」タグが付いた記事一覧",
      indexTitle: "タグ",
      indexDescription: "すべてのタグ一覧",
    },
    share: {
      label: "共有する",
      copyLink: "リンクをコピー",
      copied: "コピーしました",
    },
    pagination: {
      prev: "Prev",
      next: "Next",
    },
    notFound: {
      message: "ページが見つかりませんでした。",
      backHome: "ホームに戻る",
    },
    offline: {
      title: "Offline",
      message:
        "インターネットに接続されていません。接続を確認して再度お試しください。",
    },
    search: {
      title: "検索",
      placeholder: "記事を検索...",
      noResults: "「{query}」に一致する記事はありませんでした。",
      resultsCount: "{count}件の記事が見つかりました",
      label: "検索",
    },
    toc: {
      title: "目次",
    },
    relatedPosts: {
      title: "関連記事",
    },
    about: {
      authorName: "田原 慎也",
    },
    footer: {
      copyright: "All rights reserved.",
    },
  },
  en: {
    site: {
      name: "shinyaz.com",
      description: "A personal tech blog by shinyaz",
    },
    home: {
      subtitle: "A blog where I record notes and learnings about technology.",
      featuredPosts: "Featured",
      latestPosts: "Latest Posts",
      allPosts: "All Posts",
      aboutRole: "Solutions Architect @ AWS",
      aboutBio:
        "I'm a Solutions Architect at AWS, providing technical guidance primarily to financial industry customers. I share learnings about cloud architecture and AI/ML on this blog.",
      aboutReadMore: "Read more",
    },
    blog: {
      title: "Blog",
      description: "All blog posts",
      empty: "No posts found.",
      browseCategories: "Categories",
      browseTags: "Tags",
    },
    nav: {
      blog: "Blog",
      projects: "Projects",
      uses: "Uses",
      about: "About",
      menu: "Menu",
      closeMenu: "Close menu",
    },
    projects: {
      description: "Personal projects and open-source work",
    },
    category: {
      title: "Categories",
      description: "Browse all categories",
      postCount: "{count} post(s)",
    },
    tag: {
      title: "Tag",
      description: 'Posts tagged with "{tag}"',
      indexTitle: "Tags",
      indexDescription: "Browse all tags",
    },
    share: {
      label: "Share this post",
      copyLink: "Copy link",
      copied: "Copied!",
    },
    pagination: {
      prev: "Prev",
      next: "Next",
    },
    notFound: {
      message: "The page you are looking for could not be found.",
      backHome: "Back to Home",
    },
    offline: {
      title: "Offline",
      message:
        "You are not connected to the internet. Please check your connection and try again.",
    },
    search: {
      title: "Search",
      placeholder: "Search posts...",
      noResults: 'No posts found matching "{query}".',
      resultsCount: "{count} post(s) found",
      label: "Search",
    },
    toc: {
      title: "Table of Contents",
    },
    relatedPosts: {
      title: "Related Posts",
    },
    about: {
      authorName: "Shinya Tahara",
    },
    footer: {
      copyright: "All rights reserved.",
    },
  },
} as const;

export type Dictionary = (typeof dictionaries)[Locale];

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
