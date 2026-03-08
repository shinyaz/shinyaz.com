---
name: post-guide
description: Blog post writing guidelines and creation workflow. Loaded when creating, editing, or reviewing blog posts in content/posts/. Covers title, description, structure, voice, and bilingual conventions.
---

## Writing Principles

These principles apply to both new and existing blog posts.

### Title (Principle 1)
- Include the technology name
- Lead with the outcome, not the topic
- Remove filler words ("〜について", "How to", "Introduction to")
- Bad: "OG 画像について" / Good: "Next.js ブログに動的 OG 画像を自動生成する"

### Description (Principle 2)
- Two required elements: **what it does** + **unique insight**
- The unique insight is what differentiates this post from docs
- 120-200 chars
- Bad: "Next.js で OG 画像を動的に生成する方法を学びましょう。"
- Good: "opengraph-image.tsx と Satori でビルド時に記事ごとの OG 画像を静的生成する。最大の落とし穴は Satori のインラインスタイル制約。"

### Opening (Principle 3)
- State why the reader should care within 3 sentences
- Choose one opening pattern:
  - **`## 課題`** — When there's a clear problem to solve (most common)
  - **`## はじめに`** — When motivation comes before a problem

### Anchor Insight (Principle 7)
- Every post needs ONE core insight the reader will remember
- Multiple topics are fine, but they must connect to this anchor
- If there's no common thread, split into separate posts

### Body Structure (Principle 4)
- Choose structure based on article type (see Article Types below)
- Use descriptive `##` headings that enable skim-reading

### Content Curation (Principle 5)

**Include:**
- Gotchas and surprising behaviors — saves reader's debugging time
- "I chose X over Y because..." — design decision context
- Before/after comparisons
- Error messages and symptoms — for searchability

**Omit:**
- Full file dumps — show the interesting 20%, summarize the rest
- Complete test code — describe what was tested unless testing is the topic
- File change lists — belongs in a PR
- Boilerplate setup — link to official docs

**Code blocks:** Target 3-5. If over 7, consolidate or replace some with prose.

### Closing (Principle 6)
- NOT a summary of what you did — extract **transferable insights**
- Format: bold lead phrase + dash + explanation
- 3-4 items. If 5+, the post scope may be too broad.

```markdown
## まとめ

- **Bold insight** — Why it matters and how to apply it.
- **Bold insight** — Why it matters and how to apply it.
```

- Bad: "X を追加した" (action listing)
- Good: "`default(false)` でスキーマ変更を安全に" (transferable principle)

### Target Length
- Japanese: 800-1500 words
- English: 600-1200 words

## Article Types

Choose structure based on type — most posts mix types, but pick a primary:

- **Build log**: Document the process of building something
- **Problem→Solution**: Problem investigation through to resolution
- **Deep dive**: Gradually deepen understanding of a mechanism
- **Comparison**: Evaluate options and explain the decision
- **Migration**: Motivation, steps, results
- **Lessons learned**: Reflections and insights from a project

## Voice & Tone

- Use first person ("I discovered")
- Share opinions and acknowledge limitations
- Conversational but precise — not academic, not sloppy

### Japanese Writing Style

- **だ/である体を使用**（「〜だ」「〜した」「〜である」）
- ですます体（「〜です」「〜ます」「〜しました」）は使わない
- シリーズ記事では全記事で文体を統一する

### Bilingual Principle (Principle 8)

- Two versions are **parallel but not literal translations**
- Technical content, code examples, and structure must match
- Prose expressions adapt to what reads naturally in each language
- Goal: same information found when switching languages, not word-for-word match

### Series Articles

- シリーズの場合、末尾に全記事へのリンク一覧を追加する
- 現在の記事には「（本記事）」/ `(this article)` を付記
- 前後の記事への導入リンクを本文冒頭に含める

## New Post Creation Workflow

When explicitly invoked with `/post-guide`, follow these steps to create a new post: $ARGUMENTS

1. **Determine post basics**
   - Date format: YYYY-MM-DD
   - Slug: kebab-case (lowercase with hyphens)
   - Language: ja/en or both

2. **Create MDX file(s)**
   - Path: `content/posts/{locale}/{slug}.mdx`
   - Create in both directories for bilingual posts

3. **Set proper frontmatter**

   ```yaml
   ---
   title: "Specific, outcome-oriented title"
   description: "120-200 chars: what it does + unique insight"
   date: "YYYY-MM-DD"
   published: true
   featured: false # Reserve for major milestones only
   categories: [ai-tools] # Available: ai-tools, programming, writing
   tags: ["nextjs", "typescript", "tailwindcss"] # lowercase, hyphenated
   ---
   ```

4. **Write the post** applying the Writing Principles above

5. **Verify tag consistency**
   - Check existing tags: `grep -h "^  - " content/posts/**/*.mdx | sort -u`
   - Use precise technology names (nextjs, typescript, tailwindcss)
   - Avoid generic terms

6. **Validate build**

   ```bash
   npm run build
   ```

7. **Commit directly to main** (content-only change)
   ```bash
   git add content/posts/
   git commit -m "docs: Add blog post about [topic]"
   ```
