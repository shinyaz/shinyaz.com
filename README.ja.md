# shinyaz.com

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
| 見出しアンカー | rehype-slug |
| 数式レンダリング | remark-math + rehype-katex |
| ダークモード | [next-themes](https://github.com/pacocoursey/next-themes) (クラスベース) |
| PWA | [Serwist](https://serwist.pages.dev/) |
| i18n | カスタム辞書方式 (外部ライブラリ不要) |
| テスト | [Vitest](https://vitest.dev/) + [Playwright](https://playwright.dev/) |
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

### テスト

```bash
# ユニットテスト & コンポーネントテスト (Vitest)
npm test

# E2E テスト (Playwright、プロダクションビルドが必要)
npm run test:e2e
```

## i18n アーキテクチャ

このブログは日本語 (`ja`) と英語 (`en`) に対応しており、デフォルト言語は英語です。

### URL 構成

全ページがロケールプレフィックス付きで配信されます:

- `/en/` - 英語ホーム
- `/ja/` - 日本語ホーム
- `/en/blog` - 英語ブログ一覧
- `/ja/blog/2026/02/22/hello-world` - 日本語ブログ記事
- `/en/projects` - 英語 Projects ページ
- `/ja/projects` - 日本語 Projects ページ
- `/en/uses` - 英語 Uses ページ
- `/ja/uses` - 日本語 Uses ページ
- `/en/about` - 英語 About ページ
- `/ja/about` - 日本語 About ページ
- `/en/search` - 英語検索ページ
- `/ja/search` - 日本語検索ページ
- `/en/category` - 英語カテゴリ一覧
- `/ja/category` - 日本語カテゴリ一覧
- `/en/tag` - 英語タグ一覧
- `/ja/tag` - 日本語タグ一覧
- `/en/tag/nextjs` - 英語タグ別一覧
- `/ja/tag/nextjs` - 日本語タグ別一覧
- `/en/feed.xml` - 英語 RSS フィード
- `/ja/feed.xml` - 日本語 RSS フィード
- `/en/atom.xml` - 英語 Atom フィード
- `/ja/atom.xml` - 日本語 Atom フィード

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
    uses.mdx
  ja/
    about.mdx
    uses.mdx
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

### プロジェクトの追加

`content/projects/` に `.yml` ファイルを作成します:

```yaml
name: My Project
slug: my-project
description: A short description of the project.
nameJa: 私のプロジェクト
descriptionJa: プロジェクトの簡単な説明。
url: https://example.com
github: https://github.com/user/repo
techStack:
  - TypeScript
  - Next.js
featured: true
order: 1
```

フィールド: `name` と `description` は必須です。`nameJa`、`descriptionJa`、`url`、`github`、`techStack`、`featured`、`order` は任意です。プロジェクトは `order` の昇順でソートされます。

### カテゴリの追加

`content/categories/` に `.yml` ファイルを作成します:

```yaml
name: Programming
slug: programming
description: Articles about programming
nameJa: プログラミング
descriptionJa: プログラミングに関する記事
```

## SEO

- **OG 画像**: デフォルトの Open Graph 画像 (`public/icons/og-default.png`, 1200×630) がレイアウト経由で全ページに適用されます。`cover` フィールドを持つ記事は BlogPosting JSON-LD でその画像を使用します。
- **構造化データ**: レイアウトに WebSite JSON-LD、各記事に BlogPosting + BreadcrumbList JSON-LD を出力します。
- **hreflang / canonical**: 全ページで `<link rel="canonical">` と `<link rel="alternate" hreflang="...">` タグを出力します。サイトマップにもロケール間の対訳ペアに hreflang alternates を含みます。
- **Twitter カード**: `twitter:site` と `twitter:creator` をグローバルに設定しています。
- **RSS / Atom フィード**: ロケールごとに `/{locale}/feed.xml` (RSS 2.0) と `/{locale}/atom.xml` (Atom 1.0) を配信します。レイアウトの `<head>` にオートディスカバリー用の `<link>` タグを含みます。フィードには最新20件の公開記事が含まれます。

## セキュリティ

HTTP セキュリティヘッダーは `next.config.ts` の `headers()` 関数で設定され、全ルートに適用されます:

- **Content-Security-Policy**: リソースの読み込み元を制限 (GTM/GA、Next.js・next-themes に必要なインラインスクリプト/スタイルを許可)
- **Strict-Transport-Security**: HTTPS を強制 (max-age 2年、includeSubDomains、preload)
- **X-Content-Type-Options**: `nosniff` — MIME タイプスニッフィングを防止
- **X-Frame-Options**: `DENY` — iframe によるクリックジャッキングを防止
- **Referrer-Policy**: `strict-origin-when-cross-origin` — リファラー情報を制限
- **Permissions-Policy**: カメラ・マイク・位置情報 API を無効化
- **X-DNS-Prefetch-Control**: 外部リンクの DNS プリフェッチを有効化

## ディレクトリ構成

```
src/
  proxy.ts                    # ロケール検出 & リダイレクト
  app/
    layout.tsx                 # ルートレイアウト (パススルー)
    not-found.tsx              # ルート 404 -> /en にリダイレクト
    globals.css                # Tailwind v4 テーマ & プロースタイル
    manifest.ts                # PWA マニフェスト
    robots.ts                  # robots.txt
    sitemap.ts                 # 動的サイトマップ (全ロケール)
    sw.ts                      # Service Worker ソース (Serwist)
    serwist/
      [path]/
        route.ts               # Serwist ルートハンドラー (SW ビルド + プリキャッシュマニフェスト)
    [locale]/
      layout.tsx               # ロケールレイアウト (html, body, Header, Footer, メタデータ)
      page.tsx                 # ホームページ (最新記事)
      not-found.tsx            # 404 ページ
      feed.xml/
        route.ts               # RSS 2.0 フィード (SSG)
      atom.xml/
        route.ts               # Atom 1.0 フィード (SSG)
      about/
        page.tsx               # About ページ (MDX)
      projects/
        page.tsx               # Projects ページ (YAML データ)
      uses/
        page.tsx               # Uses ページ (MDX)
      blog/
        page.tsx               # ブログ一覧 (ページネーション付き)
        [year]/[month]/[day]/[slug]/
          page.tsx             # 記事詳細 (SSG, JSON-LD に inLanguage 含む)
      category/
        page.tsx               # カテゴリ一覧 (全カテゴリ)
        [slug]/
          page.tsx             # カテゴリ別一覧 (ページネーション付き)
      search/
        page.tsx               # 検索ページ (クライアントサイドフィルタリング)
      tag/
        page.tsx               # タグ一覧 (全タグ)
        [slug]/
          page.tsx             # タグ別一覧 (ページネーション付き)
      ~offline/
        page.tsx               # オフラインフォールバック
  components/
    layout/                    # Header, Footer, LanguageSwitcher
    theme/                     # ThemeProvider, ThemeToggle
    pwa/                       # SerwistProvider
    blog/                      # PostCard, PostList, Pagination, CategoryBadge, TagBadge, SocialShare, TableOfContents
    search/                    # SearchPageClient
    projects/                  # ProjectCard
    mdx/                       # MdxContent, MdxComponents
    common/                    # GTM
  lib/
    i18n.ts                    # ロケール型, 辞書, getDictionary()
    constants.ts               # サイト URL, 著者名, 1ページあたり記事数, OG 画像パス, ソーシャルリンク
    posts.ts                   # コンテンツクエリユーティリティ (ロケール対応)
    search.ts                  # クライアントサイド検索ロジック (AND マッチ, 大小文字区別なし)
    toc.ts                     # 目次用の見出し抽出
    feed.ts                    # RSS 2.0 / Atom 1.0 XML 生成
    seo.ts                     # SEO ヘルパー (hreflang alternate ビルダー)
    utils.ts                   # cn(), formatDate(date, locale)
content/
  posts/
    en/                        # 英語記事 (MDX)
    ja/                        # 日本語記事 (MDX)
  pages/
    en/                        # 英語固定ページ (MDX)
    ja/                        # 日本語固定ページ (MDX)
  categories/                  # カテゴリ定義 (YAML)
  projects/                    # プロジェクト定義 (YAML)
velite.config.ts               # Velite コレクションスキーマ & MDX プラグイン
vitest.config.mts              # Vitest 設定
playwright.config.ts           # Playwright E2E 設定
__tests__/
  __mocks__/
    velite.ts                  # ユニットテスト用の Velite モックデータ
  lib/                         # lib/ ユーティリティのユニットテスト
  components/                  # コンポーネントテスト (src/components/ と同じ構造)
    blog/                      # ブログコンポーネントテスト
    layout/                    # レイアウトコンポーネントテスト
    search/                    # 検索コンポーネントテスト
    mdx/                       # MDX コンポーネントテスト
    projects/                  # プロジェクトコンポーネントテスト
    theme/                     # テーマコンポーネントテスト
    common/                    # 共通コンポーネントテスト
e2e/                           # E2E テスト (Playwright)
```

## 環境変数

| 変数名 | 説明 | 必須 |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | サイト URL (デフォルト: `https://shinyaz.com`) | いいえ |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager コンテナ ID | いいえ |

## デプロイ

Git リポジトリにプッシュし、[Vercel](https://vercel.com/) に接続します。ビルドコマンド (`next build --turbopack`) は `package.json` で設定済みです。

## ライセンス

プライベートプロジェクト。
