---
name: new-til
description: Create a new TIL (Today I Learned) entry with style guide conventions
---

Create a new TIL entry: $ARGUMENTS

## Workflow

1. **Determine TIL basics**
   - Date: YYYY-MM-DD (today)
   - Slug: kebab-case describing the discovery
   - Language: ja/en or both

2. **Create MDX file(s)**
   - Path: `content/tils/{locale}/{slug}.mdx`

3. **Set frontmatter**

   ```yaml
   ---
   title: "[tech/context] + [what was learned / solution]"
   description: "1-2 sentences with specific symptoms and solution"
   date: "YYYY-MM-DD"
   published: true
   tags: ["lowercase", "hyphenated"]
   ---
   ```

   - No `categories` field (TILs don't use categories)
   - Title must convey what the reader will learn, not just the topic
     - Bad: "Table layout issue"
     - Good: "Markdown table column wrapping is fixed with CSS white-space: nowrap"

4. **Write the body (no `##` headings)**

   Follow this natural flow — no section headings needed:
   - **Context (1-2 sentences):** What were you doing when you discovered this?
   - **Discovery (body):** The learned thing itself. Code examples add credibility.
   - **One-liner (optional):** Why it matters or what it replaces. Omit if obvious.

   Do NOT add a summary/conclusion section — TILs are short enough already.

5. **Constraints — check these before committing**
   - **Length:** 100-300 words ideal. If over 500, convert to a blog post (`/new-post`)
   - **Headings:** No `##` in the body. Needing headings = blog post territory
   - **Code blocks:** 1-2 ideal, max 3. 4+ = blog post territory
   - **Tone:** Casual, like a Slack message. Express surprise ("I didn't expect X to work on Y"), mention what failed first (1-2 sentences)
   - **Let code speak:** Don't repeat in prose what the code already shows

6. **Optimize for search**
   - Quote error messages verbatim
   - Use exact tech terms (function names, CLI flags, CSS properties)
   - Describe symptoms specifically ("Japanese 2-char columns wrap vertically" not "table layout problem")

7. **Verify tag consistency**
   - Check existing tags: `grep -h "^  - " content/tils/**/*.mdx | sort -u`
   - Reuse existing tags when applicable

8. **Validate build**

   ```bash
   npm run build
   ```

9. **Commit directly to main** (content-only change)
   ```bash
   git add content/tils/
   git commit -m "docs: Add TIL about [topic]"
   ```

## Good TIL Topics

- Non-obvious API behavior
- Config options buried in docs
- CSS rendering workarounds
- Version-to-version behavior changes
- Useful CLI flags or tool options
- Error messages with non-obvious solutions

## NOT a TIL (use `/new-post` instead)

- Step-by-step tutorials
- Multi-option comparisons
- Topics with prominent existing documentation

## Japanese Writing Style

- **だ/である体を使用**（ブログ記事と同じ）
- Express discoveries naturally: 「〜とは知らなかった」「〜が効かなかった」
- Surprise and failed attempts are encouraged: share the "huh" moment

## Title Patterns

- Japanese: `〜できる`, `〜で解決する`, `〜は〜だった`, `〜には〜を使う`
- English: State the fact or technique directly
