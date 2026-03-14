# Create Skill — Templates and Conventions

## Full Frontmatter Schema

```yaml
---
name: {skill-name}          # Required. Must match directory name
description: >-              # Required. Max 1024 chars
  What it does + when to use it + keywords for agent discovery.
license: MIT                 # Optional
compatibility: ""            # Optional. Environment requirements
metadata:                    # Optional. Arbitrary key-value pairs
  author: ""
  version: "1.0"
---
```

### Description Best Practices

Claude tends to undertrigger skills, so descriptions should be slightly pushy about when to activate.

**Structure:** What it does (1-2 sentences) + "Use when ..." clause with specific triggers.

**Rules:**
- Third person only (not "I help" or "You can use")
- Must include explicit "Use when ..." with specific trigger conditions
- Include casual/edge-case phrasing users might actually type
- Max 1024 chars

**Bad:**
- `Helps with PDFs.` (vague, no triggers)
- `Loaded when editing posts.` (passive, no "Use when")

**Good:**
```
Extracts text and tables from PDF files, fills PDF forms,
and merges multiple PDFs. Use when working with PDF documents
or when the user mentions PDFs, forms, or document extraction.
```

**Better** (pushy, covers edge cases):
```
Blog post writing guidelines and creation workflow. Covers title,
description, structure, voice, and bilingual conventions. Use when
the user wants to write a new blog post, asks about post format
or structure, edits files in content/posts/, or mentions writing
an article. Even if the user just says "write about X" or gives
a topic, use this skill to guide the post creation.
```

## Body Content Templates

### Workflow skill (with checklist and feedback loop):

````markdown
{Description}: $ARGUMENTS

Copy this checklist to track progress:

```
Task Progress:
- [ ] Step 1: Do X
- [ ] Step 2: Validate X
- [ ] Step 3: Do Y
```

## Workflow

1. **Step name**
   - Detail
   ```bash
   command if needed
   ```

2. **Validate**
   ```bash
   validation command
   ```
   If validation fails, fix and re-run before continuing.
````

### Knowledge skill:

```markdown
## Key Information
- Point 1
- Point 2

## Guidelines
[Domain-specific knowledge]
```

### Conditional workflow skill:

```markdown
## Workflow

1. Determine the task type:

   **Creating new?** → Follow "Creation workflow" below
   **Editing existing?** → Follow "Editing workflow" below

2. Creation workflow:
   - Step A
   - Step B

3. Editing workflow:
   - Step C
   - Step D
```

### Examples pattern (for output-format-sensitive skills):

````markdown
## Format

**Example 1:**
Input: Added user authentication with JWT tokens
Output:
```
feat(auth): implement JWT-based authentication
```

**Example 2:**
Input: Fixed bug where dates displayed incorrectly
Output:
```
fix(reports): correct date formatting in timezone conversion
```
````

## Skill Types

| Type | Examples | Characteristics |
|------|----------|-----------------|
| Workflow | writing-posts, fixing-lint | Step-by-step procedures, checklists, feedback loops |
| Diagnostic | debugging-build | Problem identification, solutions |
| Knowledge | api-conventions | Reference info, best practices |
| Validation | syncing-i18n | Check procedures, reporting |

## Naming Conventions

- Use gerund form (verb + -ing): `processing-pdfs`, `analyzing-data`
- Use kebab-case: `my-skill-name`
- Be specific: `fixing-typescript-errors` not `fixing-errors`
- Consistent pattern within the collection is the most important rule

**Avoid:**
- Vague names: `helper`, `utils`, `tools`
- Overly generic: `documents`, `data`, `files`
- Reserved words: `anthropic-helper`, `claude-tools`

## Optional Directories

```
skill-name/
├── SKILL.md              # Required
├── scripts/              # Executable code agents can run
├── references/           # Additional documentation loaded on demand (1 level deep)
└── assets/               # Templates, images, data files
```

References must link directly from SKILL.md — never chain references from other reference files.
