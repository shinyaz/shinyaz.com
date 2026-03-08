---
name: create-skill
description: Create a new Agent Skill following the agentskills.io standard. Use when the user wants to add a new skill, automate a workflow, or package reusable instructions for AI coding agents.
---

Create a new skill: $ARGUMENTS

## Skill Creation Workflow

1. **Determine skill details**
   - Name: kebab-case, 1-64 chars, lowercase alphanumeric + hyphens only
   - No leading/trailing hyphens, no consecutive hyphens (`--`)
   - Purpose: Clear, single responsibility

2. **Create skill in both agent directories**

   ```bash
   mkdir -p .claude/skills/{skill-name}
   mkdir -p .kiro/skills/{skill-name}
   ```

3. **Create SKILL.md with agentskills.io frontmatter**

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

   ### Description best practices
   - Include: what the skill does, when to use it, relevant keywords
   - Bad: `Helps with PDFs.`
   - Good: `Extracts text and tables from PDF files, fills PDF forms, and merges multiple PDFs. Use when working with PDF documents or when the user mentions PDFs, forms, or document extraction.`

4. **Write the body content**

   No format restrictions. Write whatever helps agents perform the task.

   ### Recommended sections:
   - Step-by-step instructions
   - Examples of inputs and outputs
   - Common edge cases

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

5. **Keep SKILL.md under 500 lines**
   - Move detailed reference material to `references/` directory
   - Move executable code to `scripts/` directory
   - Move templates and data files to `assets/` directory
   - Reference with relative paths: `See [details](references/REFERENCE.md)`

6. **Copy to both agent directories**
   ```bash
   cp .claude/skills/{skill-name}/SKILL.md .kiro/skills/{skill-name}/SKILL.md
   ```
   - Or create in one and copy to the other
   - Claude Code specific skills (not shared) go only in `.claude/skills/`

7. **Update CLAUDE.md skills list** (Claude Code only)
   ```markdown
   ## Skills
   - `/{skill-name}` — Brief description
   ```
   Kiro auto-discovers skills from `.kiro/skills/`, no listing needed.

## Optional Directories

```
skill-name/
├── SKILL.md              # Required
├── scripts/              # Executable code agents can run
├── references/           # Additional documentation loaded on demand
└── assets/               # Templates, images, data files
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

## Validation Checklist

- [ ] `name` matches directory name
- [ ] `name` is lowercase, alphanumeric + hyphens, no leading/trailing/consecutive hyphens
- [ ] `description` includes what + when + keywords for agent auto-selection
- [ ] SKILL.md focused — detailed docs in `references/`, scripts in `scripts/`
- [ ] SKILL.md under 500 lines
- [ ] Deterministic tasks (validation, file generation) use `scripts/` not inline instructions
- [ ] Scope is correct — global (`~/.kiro/skills/`) for personal, workspace for team
- [ ] Exists in both `.claude/skills/` and `.kiro/skills/` (if shared)
- [ ] CLAUDE.md skills list updated
