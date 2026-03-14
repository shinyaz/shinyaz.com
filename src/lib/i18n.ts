export const locales = ["ja", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

const dictionaries = {
  ja: {
    site: {
      name: "@shinyaz",
      description: "shinyazの個人技術ブログ",
    },
    home: {
      subtitle: "技術に関するメモや学びを記録するブログです。",
      featuredPosts: "注目記事",
      latestPosts: "最新記事",
      allPosts: "すべての記事",
      latestTils: "最新 TIL",
      allTils: "すべての TIL",
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
    til: {
      title: "TIL",
      description: "Today I Learned — 日々の学びを記録",
      empty: "TIL がありません。",
      browseTags: "タグ一覧",
    },
    nav: {
      blog: "ブログ",
      til: "TIL",
      projects: "プロジェクト",
      uses: "使用ツール",
      now: "Now",
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
      browseAll: "すべてのカテゴリ",
    },
    tag: {
      title: "タグ",
      description: "「{tag}」タグが付いたコンテンツ一覧",
      indexTitle: "タグ",
      indexDescription: "すべてのタグ一覧",
      postsSection: "ブログ記事",
      tilsSection: "TIL",
      browseAll: "すべてのタグ",
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
    now: {
      lastUpdated: "最終更新",
    },
    about: {
      authorName: "田原 慎也",
    },
    footer: {
      copyright: "All rights reserved.",
      privacy: "プライバシーポリシー",
    },
  },
  en: {
    site: {
      name: "@shinyaz",
      description: "A personal tech blog by shinyaz",
    },
    home: {
      subtitle: "A blog where I record notes and learnings about technology.",
      featuredPosts: "Featured",
      latestPosts: "Latest Posts",
      allPosts: "All Posts",
      latestTils: "Latest TILs",
      allTils: "All TILs",
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
    til: {
      title: "TIL",
      description: "Today I Learned — Daily learnings",
      empty: "No TILs found.",
      browseTags: "Tags",
    },
    nav: {
      blog: "Blog",
      til: "TIL",
      projects: "Projects",
      uses: "Uses",
      now: "Now",
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
      browseAll: "All Categories",
    },
    tag: {
      title: "Tag",
      description: 'Content tagged with "{tag}"',
      indexTitle: "Tags",
      indexDescription: "Browse all tags",
      postsSection: "Blog Posts",
      tilsSection: "TIL",
      browseAll: "All Tags",
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
    now: {
      lastUpdated: "Last updated",
    },
    about: {
      authorName: "Shinya Tahara",
    },
    footer: {
      copyright: "All rights reserved.",
      privacy: "Privacy Policy",
    },
  },
} as const;

export type Dictionary = (typeof dictionaries)[Locale];

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
