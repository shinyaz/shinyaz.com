---
name: new-post
description: Create a new blog post with standardized workflow
disable-model-invocation: true
---

Create a new blog post: $ARGUMENTS

## Workflow

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
   description: "80-200 chars conveying unique value"
   date: "YYYY-MM-DD"
   published: true
   featured: false  # Reserve for major milestones only
   categories: [ai-tools]  # Available: ai-tools, programming, writing
   tags: ["nextjs", "typescript", "tailwindcss"]  # lowercase, hyphenated
   ---
   ```

4. **Structure the post**
   - **Hook** (1-2 paragraphs): Start with problem or outcome
   - **Body**: Logical sections with descriptive headings
   - **Closing**: 3-4 bullets with transferable insights

5. **Target length**
   - Japanese: 800-1500 words
   - English: 600-1200 words

6. **Verify tag consistency**
   - Check existing tags: `grep -h "^tags:" content/posts/**/*.mdx | sort -u`
   - Use precise technology names (nextjs, typescript, tailwindcss)
   - Avoid generic terms

7. **Validate build**
   ```bash
   npm run build
   ```
   - Ensure no errors
   - Address any warnings

8. **Commit**
   ```bash
   git add content/posts/
   git commit -m "docs: Add blog post about [topic]"
   ```

## Article Types

- **Build log**: Document the process of building something
- **Problem→Solution**: Solve a specific technical challenge
- **Deep dive**: Detailed exploration of a technology or concept
- **Comparison**: Compare technologies or approaches
- **Migration**: Move from one system to another
- **Lessons learned**: Reflections and insights from a project

## Voice & Tone

- Use first person ("I discovered")
- Share opinions
- Acknowledge limitations
- Ensure reader understands value from title and first paragraph

### Japanese Writing Style

- **だ/である体を使用**（「〜だ」「〜した」「〜である」）
- ですます体（「〜です」「〜ます」「〜しました」）は使わない
- シリーズ記事では全記事で文体を統一する
- 例: ✅「〜を実現した」 ❌「〜を実現しました」

### Series Articles

- シリーズの場合、末尾に全記事へのリンク一覧を追加する
- 現在の記事には「（本記事）」/ `(this article)` を付記
- 前後の記事への導入リンクを本文冒頭に含める