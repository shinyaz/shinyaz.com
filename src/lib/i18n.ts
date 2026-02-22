export const locales = ["ja", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

const dictionaries = {
  ja: {
    site: {
      name: "shinyaz Blog",
      description: "shinyazの個人技術ブログ",
    },
    home: {
      subtitle: "技術に関するメモや学びを記録するブログです。",
      latestPosts: "最新記事",
      allPosts: "すべての記事",
    },
    blog: {
      title: "Blog",
      description: "すべてのブログ記事一覧",
      empty: "記事がありません。",
    },
    nav: {
      blog: "Blog",
      projects: "Projects",
      uses: "Uses",
      about: "About",
    },
    projects: {
      description: "個人プロジェクトやオープンソースの取り組み",
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
      message: "インターネットに接続されていません。接続を確認して再度お試しください。",
    },
    footer: {
      copyright: "All rights reserved.",
    },
  },
  en: {
    site: {
      name: "shinyaz Blog",
      description: "A personal tech blog by shinyaz",
    },
    home: {
      subtitle: "A blog where I record notes and learnings about technology.",
      latestPosts: "Latest Posts",
      allPosts: "All Posts",
    },
    blog: {
      title: "Blog",
      description: "All blog posts",
      empty: "No posts found.",
    },
    nav: {
      blog: "Blog",
      projects: "Projects",
      uses: "Uses",
      about: "About",
    },
    projects: {
      description: "Personal projects and open-source work",
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
      message: "You are not connected to the internet. Please check your connection and try again.",
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
