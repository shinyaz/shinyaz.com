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

3. **Create SKILL.md with frontmatter**
   ```yaml
   ---
   name: {skill-name}
   description: >-
     What it does + when to use it + keywords for agent discovery.
   ---
   ```

4. **Write the body content** — step-by-step instructions, examples, edge cases

5. **Keep SKILL.md under 500 lines**
   - Move detailed reference material to `references/` directory
   - Reference with relative paths: `See [details](references/REFERENCE.md)`

6. **Copy to both agent directories**
   ```bash
   cp .claude/skills/{skill-name}/SKILL.md .kiro/skills/{skill-name}/SKILL.md
   ```
   - Claude Code specific skills (not shared) go only in `.claude/skills/`

7. **Update CLAUDE.md skills list** (Claude Code only)
   ```markdown
   - `/{skill-name}` — Brief description
   ```
   Kiro auto-discovers skills from `.kiro/skills/`, no listing needed.

## Validation Checklist

- [ ] `name` matches directory name
- [ ] `name` is lowercase, alphanumeric + hyphens, no leading/trailing/consecutive hyphens
- [ ] `description` includes what + when + keywords for agent auto-selection
- [ ] SKILL.md under 500 lines — detailed docs in `references/`
- [ ] Exists in both `.claude/skills/` and `.kiro/skills/` (if shared)
- [ ] CLAUDE.md skills list updated

See [templates, skill types, and naming conventions](references/TEMPLATES.md).
