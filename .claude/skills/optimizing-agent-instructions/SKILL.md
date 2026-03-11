---
name: optimizing-agent-instructions
description: Optimizes CLAUDE.md and skill files by extracting procedures to skills, improving descriptions, and applying progressive disclosure. Use after running /analyzing-agent-instructions, when CLAUDE.md exceeds 100 lines, or when adding new project workflows.
---

Optimize agent instructions (CLAUDE.md and skills): $ARGUMENTS

Copy this checklist to track progress:

```
Optimization Progress:
- [ ] Phase 1: CLAUDE.md optimization
- [ ] Phase 2: Skill optimization (naming, descriptions, disclosure)
- [ ] Phase 3: Sync to Kiro
- [ ] Phase 4: Validation
```

## CLAUDE.md Optimization

1. **Measure current state**
   ```bash
   wc -l CLAUDE.md
   ```

2. **Identify removable content** — For each section, ask:
   - "Would removing this cause the agent to make a mistake?"
   - "Can the agent infer this from the code?"
   - "Is this used in every session?"

3. **Extract to skills** — Candidates:
   - Procedures with 5+ steps
   - Content taking 10+ lines
   - Tasks repeated 3+ times
   - Domain knowledge not needed every session

4. **Update CLAUDE.md** — Remove migrated content, add skill reference

## Skill Optimization

1. **Fix naming violations**
   - Rename to gerund form: `processing-pdfs`, `analyzing-data`
   - Lowercase, numbers, hyphens only (max 64 chars)
   - No reserved words: "anthropic", "claude"

2. **Improve descriptions** — Must be third person and include:
   - What the skill does
   - When to use it (trigger conditions)
   - Specific keywords for agent auto-discovery

3. **Apply progressive disclosure** — If SKILL.md > 100 lines:
   - Extract examples, templates, reference data to `references/`
   - Keep SKILL.md as overview with links to details
   - Reference files must be 1 level deep from SKILL.md
   - Add table of contents to reference files over 100 lines

4. **Add feedback loops** — For workflow skills:
   - Include validation steps (run tests, check output)
   - Add checklists Claude can copy to track progress

## Sync to Kiro

```bash
# Copy shared skills (skip agent-specific ones)
for skill in .claude/skills/*/; do
  name=$(basename "$skill")
  # Skip Claude Code specific skills
  [[ "$name" == "analyzing-agent-instructions" || "$name" == "optimizing-agent-instructions" ]] && continue
  cp -r "$skill" ".kiro/skills/$name"
done
```

## Validation

```bash
wc -l CLAUDE.md  # Target: under 100 (ideally under 50)
for f in .claude/skills/*/SKILL.md; do printf "%-50s %s\n" "$f" "$(wc -l < "$f") lines"; done
```

See [best practices, extraction patterns, and checklist](references/BEST-PRACTICES.md).
