---
name: creating-skill
description: Create a new Agent Skill following the agentskills.io standard. Use when the user wants to add a new skill, automate a recurring workflow, package reusable instructions for AI coding agents, or turn a conversation pattern into a repeatable procedure.
---

Create a new skill: $ARGUMENTS

## Skill Creation Workflow

1. **Determine skill details**
   - Name: gerund form (verb + -ing), kebab-case, 1-64 chars, lowercase alphanumeric + hyphens only
   - Examples: `writing-posts`, `fixing-lint`, `debugging-build`
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
   Description rules (Claude tends to undertrigger, so be pushy):
   - Third person only (not "I help" or "You can use")
   - Must include explicit "Use when ..." clause with specific trigger conditions
   - Add edge-case triggers: casual phrasing, adjacent keywords, common user expressions
   - Max 1024 chars

4. **Write the body content** — step-by-step instructions, examples, edge cases
   - Do NOT include `git add -A` or auto-commit steps (let the user decide when to commit)
   - Explain *why* behind instructions rather than heavy-handed MUSTs

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

8. **Add context hints to CLAUDE.md** — Link the skill from relevant Critical Rules or workflow sections so Claude reaches for it in context. Example:
   ```markdown
   - **Build must pass** — No warnings allowed. Build fails → `/debugging-build`
   ```

## Validation Checklist

- [ ] `name` uses gerund form and matches directory name
- [ ] `name` is lowercase, alphanumeric + hyphens, no leading/trailing/consecutive hyphens
- [ ] `description` includes what + when + keywords for agent auto-selection
- [ ] `description` has explicit "Use when ..." clause (pushy, not passive)
- [ ] SKILL.md under 500 lines — detailed docs in `references/`
- [ ] No `git add -A` or auto-commit in workflow steps
- [ ] Exists in both `.claude/skills/` and `.kiro/skills/` (if shared)
- [ ] CLAUDE.md skills list updated with context hints

See [templates, skill types, and naming conventions](references/TEMPLATES.md).
