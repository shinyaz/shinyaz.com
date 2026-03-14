---
name: syncing-i18n
description: Synchronize and verify bilingual content parity between Japanese and English posts, TILs, and pages. Use when checking translation status, finding missing translations, verifying frontmatter consistency, or when the user mentions i18n, localization, or bilingual content.
---

Synchronize and verify bilingual content across Japanese and English.

## Workflow

1. **Check content parity**
   ```bash
   # List Japanese posts without English equivalent
   comm -23 <(ls content/posts/ja/ | sort) <(ls content/posts/en/ | sort)

   # List English posts without Japanese equivalent
   comm -13 <(ls content/posts/ja/ | sort) <(ls content/posts/en/ | sort)
   ```

2. **Verify frontmatter consistency**
   - Check matching posts have same:
     - `date` field
     - `categories` (single category in use)
     - `tags` (allowing for translation)
     - `published` status

3. **Validate permalink structure**
   - Format: `/{locale}/blog/{year}/{month}/{day}/{slug}`
   - Ensure dates match frontmatter

4. **Check category/tag translations**
   - Categories should be consistent
   - Tags should use appropriate translations
   - Verify against `content/categories/*.yml`

5. **Generate translation status report**
   ```markdown
   ## Translation Status

   ### Missing English translations:
   - post-1.mdx (2024-03-01)
   - post-2.mdx (2024-03-05)

   ### Missing Japanese translations:
   - post-3.mdx (2024-03-07)

   ### Frontmatter inconsistencies:
   - different-tags.mdx: ja has "nextjs", en has "next.js"
   ```

6. **TIL content check**
   - Same process for `content/tils/{ja,en}/`

7. **Static pages check**
   - Verify `content/pages/{ja,en}/` have matching pages
   - About page should exist in both languages

## Best Practices

- Keep slugs consistent between languages when possible
- Use same date for both language versions
- Maintain tag consistency (use exact same technical terms)
- Mark untranslated content as `published: false`