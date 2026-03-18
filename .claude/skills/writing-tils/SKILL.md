---
name: writing-tils
description: TIL (Today I Learned) writing guidelines and creation workflow. Covers format, tone, length constraints, and search optimization. Use when the user wants to write a TIL, asks about TIL format, edits files in content/tils/, or mentions learning something new they want to document. Also use when a topic is too short for a full blog post.
---

TIL writing guide: $ARGUMENTS

## Writing Guidelines

### Format
- **No `##` headings** in the body. Needing headings = blog post territory
- Natural flow: Context (1-2 sentences) → Discovery (body with code) → One-liner (optional)
- Do NOT add a summary/conclusion section

### Length & Scope
- **Length:** 100-300 words ideal. Over 500 → convert to blog post (`/writing-posts`)
- **Code blocks:** 1-2 ideal, max 3. 4+ = blog post territory
- **Code block language:** Always specify (e.g. `tsx`, `bash`, `text`). Bare ` ``` ` breaks `rehype-pretty-code`. Add `title=` to label code blocks: language name for source code (`title="Python"`, `title="TypeScript"` etc.), `title="ターミナル"` / `title="Terminal"` for shell, `title="出力結果"` / `title="Output"` for results, or file names (`title="main.py"`)
- Let code speak — don't repeat in prose what code already shows

### Tone
- Casual, like a Slack message
- Express surprise ("I didn't expect X to work on Y")
- Mention what failed first (1-2 sentences)

### Search Optimization
- Quote error messages verbatim
- Use exact tech terms (function names, CLI flags, CSS properties)
- Describe symptoms specifically ("Japanese 2-char columns wrap vertically" not "table layout problem")

### Japanese Writing Style
- **だ/である体を使用**（ブログ記事と同じ）
- Express discoveries naturally: 「〜とは知らなかった」「〜が効かなかった」

## New TIL Creation Workflow

1. Create MDX: `content/tils/{locale}/{slug}.mdx` (both locales for bilingual)
2. Set frontmatter (see [examples and templates](references/EXAMPLES.md))
3. Write body applying guidelines above
4. Verify tags: `grep -h "^  - " content/tils/**/*.mdx | sort -u`
5. Build: `npm run build`
6. Commit: `git add content/tils/ && git commit -m "docs: Add TIL about [topic]"`

See [topic examples, frontmatter template, and title patterns](references/EXAMPLES.md).
