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

- Include: what the skill does, when to use it, relevant keywords
- Bad: `Helps with PDFs.`
- Good: `Extracts text and tables from PDF files, fills PDF forms, and merges multiple PDFs. Use when working with PDF documents or when the user mentions PDFs, forms, or document extraction.`

## Body Content Templates

### For workflow skills:

```markdown
{Description}: $ARGUMENTS

## Workflow
1. **Step name**
   - Detail
   ```bash
   command if needed
   ```
```

### For knowledge skills:

```markdown
## Key Information
- Point 1
- Point 2

## Guidelines
[Domain-specific knowledge]
```

## Skill Types

| Type | Examples | Characteristics |
|------|----------|-----------------|
| Workflow | post-guide, fix-lint | Step-by-step procedures, commands |
| Diagnostic | debug-build | Problem identification, solutions |
| Knowledge | api-conventions | Reference info, best practices |
| Validation | sync-i18n | Check procedures, reporting |

## Naming Conventions

- Use kebab-case: `my-skill-name`
- Be specific: `fix-typescript-errors` not `fix-errors`
- Verbs for actions: `create-`, `fix-`, `debug-`, `deploy-`
- Nouns for knowledge: `conventions`, `architecture`

## Optional Directories

```
skill-name/
├── SKILL.md              # Required
├── scripts/              # Executable code agents can run
├── references/           # Additional documentation loaded on demand
└── assets/               # Templates, images, data files
```
