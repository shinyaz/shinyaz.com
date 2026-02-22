# shinyaz Blog

[English / 英語](./README.md)

Next.js と MDX で構築された、ミニマル・モノトーンの個人技術ブログです。日本語と英語の2言語に対応しています (i18n)。

## 技術スタック

| カテゴリ | 技術 |
|---|---|
| フレームワーク | [Next.js](https://nextjs.org/) 16 (App Router) |
| 言語 | TypeScript 5 |
| フォント | [IBM Plex](https://www.ibm.com/plex/) (Sans + Mono: 英文, Sans JP: 和文) |
| スタイリング | Tailwind CSS v4 |
| コンテンツ管理 | MDX ([Velite](https://velite.js.org/) 経由) |
| コードハイライト | [Shiki](https://shiki.style/) + rehype-pretty-code (デュアルテーマ) |
| 数式レンダリング | remark-math + rehype-katex |
| ダークモード | [next-themes](https://github.com/pacocoursey/next-themes) (クラスベース) |
| PWA | [Serwist](https://serwist.pages.dev/) |
| i18n | カスタム辞書方式 (外部ライブラリ不要) |
| デプロイ | [Vercel](https://vercel.com/) |

## 始め方

### 前提条件

- Node.js 20+
- npm

### インストール & 起動

```bash
npm install
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。ブラウザの言語設定に応じて `/en` または `/ja` にリダイレクトされます。

### ビルド

```bash
npm run build
npm start
```

## i18n アーキテクチャ

このブログは日本語 (`ja`) と英語 (`en`) に対応しており、デフォルト言語は英語です。

### URL 構成

全ページがロケールプレフィックス付きで配信されます:

- `/en/` - 英語ホーム
- `/ja/` - 日本語ホーム
- `/en/blog` - 英語ブログ一覧
- `/ja/blog/2026/02/22/hello-world` - 日本語ブログ記事
- `/en/about` - 英語 About ページ
- `/ja/about` - 日本語 About ページ

ロケールプレフィックスなしで `/` にアクセスすると `/en` にリダイレクトされます (ブラウザの `Accept-Language` ヘッダーに `ja` が含まれる場合は `/ja`)。

### UI 翻訳

UI 文字列は `src/lib/i18n.ts` の軽量な辞書オブジェクトで管理されています。外部 i18n ライブラリは不要です。

### コンテンツ翻訳

ブログ記事と固定ページはコンテンツディレクトリ内でロケール別に整理されています:

```
content/posts/
  en/
    hello-world.mdx
    docker-basics.mdx
    ...
  ja/
    hello-world.mdx
    docker-basics.mdx
    ...
content/pages/
  en/
    about.mdx
  ja/
    about.mdx
```

ロケールはディレクトリ名から自動判定されます。同名ファイルは対訳として扱われます。

### カテゴリ翻訳

カテゴリは英語をベースとし、日本語のオーバーライドをオプションで指定します:

```yaml
name: Programming
description: Articles about programming
nameJa: プログラミング
descriptionJa: プログラミングに関する記事
```

### 言語切替

ヘッダーに言語切替ボタン ("EN" / "JP") が表示され、同じページに留まったまま言語を切り替えられます。

## 記事の書き方

`content/posts/en/` または `content/posts/ja/` に `.mdx` ファイルを作成します:

```markdown
---
title: "記事タイトル"
description: "記事の簡単な説明。"
date: 2026-01-01
published: true
updated: 2026-01-15          # 任意: 最終更新日
cover: "/images/cover.png"   # 任意: カバー画像
categories:
  - programming
tags:
  - nextjs
---

ここに本文を書きます。**Markdown**、シンタックスハイライト付きコードブロック、$E = mc^2$ のような数式が使えます。
```

ファイル名が URL スラッグになります (例: `hello-world.mdx` -> `/ja/blog/2026/01/01/hello-world`)。翻訳版を作成するには、もう一方のロケールディレクトリに同名ファイルを配置します。

### 固定ページの書き方

About などの固定ページは `content/pages/en/` または `content/pages/ja/` で管理します。記事よりシンプルなフロントマターを使用します:

```markdown
---
title: "About"
description: "このサイトについて。"
---

ページの本文をここに書きます。
```

ファイル名が URL スラッグになります (例: `about.mdx` -> `/ja/about`)。

### カテゴリの追加

`content/categories/` に `.yml` ファイルを作成します:

```yaml
name: Programming
slug: programming
description: Articles about programming
nameJa: プログラミング
descriptionJa: プログラミングに関する記事
```

## ディレクトリ構成

```
src/
  middleware.ts                # ロケール検出 & リダイレクト
  app/
    layout.tsx                 # ルートレイアウト (パススルー)
    not-found.tsx              # ルート 404 -> /en にリダイレクト
    globals.css                # Tailwind v4 テーマ & プロースタイル
    manifest.ts                # PWA マニフェスト
    robots.ts                  # robots.txt
    sitemap.ts                 # 動的サイトマップ (全ロケール)
    sw.ts                      # Service Worker (Serwist)
    [locale]/
      layout.tsx               # ロケールレイアウト (html, body, Header, Footer, メタデータ)
      page.tsx                 # ホームページ (最新記事)
      not-found.tsx            # 404 ページ
      about/
        page.tsx               # About ページ (MDX)
      blog/
        page.tsx               # ブログ一覧 (ページネーション付き)
        [year]/[month]/[day]/[slug]/
          page.tsx             # 記事詳細 (SSG, JSON-LD に inLanguage 含む)
      category/[slug]/
        page.tsx               # カテゴリ別一覧 (ページネーション付き)
      ~offline/
        page.tsx               # オフラインフォールバック
  components/
    layout/                    # Header, Footer, LanguageSwitcher
    theme/                     # ThemeProvider, ThemeToggle
    blog/                      # PostCard, PostList, Pagination, CategoryBadge
    mdx/                       # MdxContent, MdxComponents
    common/                    # GTM
  lib/
    i18n.ts                    # ロケール型, 辞書, getDictionary()
    constants.ts               # サイト URL, 著者名, 1ページあたり記事数
    posts.ts                   # コンテンツクエリユーティリティ (ロケール対応)
    utils.ts                   # cn(), formatDate(date, locale)
content/
  posts/
    en/                        # 英語記事 (MDX)
    ja/                        # 日本語記事 (MDX)
  pages/
    en/                        # 英語固定ページ (MDX)
    ja/                        # 日本語固定ページ (MDX)
  categories/                  # カテゴリ定義 (YAML)
velite.config.ts               # Velite コレクションスキーマ & MDX プラグイン
```

## 環境変数

| 変数名 | 説明 | 必須 |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | サイト URL (デフォルト: `https://shinyaz.com`) | いいえ |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager コンテナ ID | いいえ |

## デプロイ

Git リポジトリにプッシュし、[Vercel](https://vercel.com/) に接続します。ビルドコマンド (`next build --webpack`) は `package.json` で設定済みです。

## ライセンス

プライベートプロジェクト。
