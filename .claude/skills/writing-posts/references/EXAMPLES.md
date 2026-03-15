# Post Guide — Detailed Examples

## Title Examples

- Bad: "OG 画像について"
- Good: "Next.js ブログに動的 OG 画像を自動生成する"

## Description Examples

- Bad: "Next.js で OG 画像を動的に生成する方法を学びましょう。"
- Good: "opengraph-image.tsx と Satori でビルド時に記事ごとの OG 画像を静的生成する。最大の落とし穴は Satori のインラインスタイル制約。"

## Closing Examples

- Bad: "X を追加した" (action listing)
- Good: "`default(false)` でスキーマ変更を安全に" (transferable principle)

Format:
```markdown
## まとめ

- **Bold insight** — Why it matters and how to apply it.
- **Bold insight** — Why it matters and how to apply it.
```

## Frontmatter Template

```yaml
---
title: "Specific, outcome-oriented title"
description: "120-200 chars: what it does + unique insight"
date: "YYYY-MM-DD"
published: true
featured: false # Reserve for major milestones only
categories: [ai-tools] # Available: ai-tools, infrastructure, programming, writing
tags: ["nextjs", "typescript", "tailwindcss"] # lowercase, hyphenated
---
```

## Series Articles

- シリーズの場合、末尾に全記事へのリンク一覧を追加する
- 現在の記事には「（本記事）」/ `(this article)` を付記
- 前後の記事への導入リンクを本文冒頭に含める
