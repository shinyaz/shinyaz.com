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
series: "my-series" # optional: series identifier (shared across posts in the same series)
seriesOrder: 1 # optional: position within the series
seriesExtra: true # optional: mark as bonus/extra entry (default: false)
---
```

## Series Articles

- Posts sharing the same `series` identifier automatically get a series navigation component
- `seriesOrder` controls display order (starting from 1)
- Bonus entries use `seriesExtra: true` to appear in a separate section
- Include introductory links to previous/next articles at the beginning of the body
