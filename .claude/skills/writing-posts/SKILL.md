---
name: writing-posts
description: Blog post writing guidelines and creation workflow. Covers title, description, structure, voice, and bilingual conventions. Use when the user wants to write a new blog post, asks about post format or structure, edits files in content/posts/, or mentions writing an article. Even if the user just says "write about X" or gives a topic, use this skill to guide the post creation.
---

Blog post writing guide: $ARGUMENTS

## Writing Principles

- **Title** — Include tech name, lead with outcome, remove filler words
- **Description** — What it does + unique insight, 120-200 chars
- **Opening** — Why the reader should care in 3 sentences. Use `## 課題` or `## はじめに`
- **Anchor Insight** — ONE core insight per post. No common thread → split posts
- **Body** — Descriptive `##` headings, choose structure by article type
- **Content** — Include gotchas, design decisions, before/after. Omit file dumps, boilerplate
- **Code blocks** — Target 3-5. Over 7 → consolidate. Always specify a language (e.g. `tsx`, `bash`, `text`); bare ` ``` ` breaks `rehype-pretty-code`. Add `title=` to distinguish code types: language name for source code (`title="Python"`, `title="TypeScript"` etc.), `title="ターミナル"` / `title="Terminal"` for shell commands, `title="出力結果"` / `title="Output"` for execution results. Use file names when specific (`title="main.py"`) or add context (`title="ターミナル（事前準備）"`)
- **Closing** — Transferable insights (not action listing). Bold phrase + dash + explanation, 3-4 items
- **Length** — Japanese: 800-1500 words, English: 600-1200 words

## Article Types

- **Build log** / **Problem→Solution** / **Deep dive** / **Comparison** / **Migration** / **Lessons learned**

## Voice & Tone

- First person, share opinions, conversational but precise
- **Japanese:** だ/である体（not ですます体）
- **Bilingual:** Parallel but not literal translations. Same info, natural expression per language

## New Post Creation Workflow

1. Create MDX: `content/posts/{locale}/{slug}.mdx` (both locales for bilingual)
2. Set frontmatter (see [examples](references/EXAMPLES.md))
3. Write applying principles above
4. Verify tags: `grep -h "^  - " content/posts/**/*.mdx | sort -u`
5. Build: `npm run build`
6. Commit: `git add content/posts/ && git commit -m "docs: Add blog post about [topic]"`

See [detailed examples and frontmatter template](references/EXAMPLES.md) for good/bad patterns.
