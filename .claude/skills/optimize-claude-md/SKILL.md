---
name: optimize-claude-md
description: Optimize CLAUDE.md by moving detailed procedures to skills
---

Optimize CLAUDE.md following Claude Code best practices.

## Analysis Phase

1. **Measure current state**

   ```bash
   wc -l CLAUDE.md
   ```

   - Target: Under 100 lines (ideally under 50)

2. **Identify removable content**
   For each section, ask:
   - "Would removing this cause Claude to make a mistake?"
   - "Can Claude infer this from the code?"
   - "Is this used in every session?"

3. **Categorize content**
   | Keep in CLAUDE.md | Move to Skills |
   |------------------|----------------|
   | Project-specific constraints | Detailed procedures |
   | Non-default settings | Step-by-step workflows |
   | Essential commands | Domain knowledge |
   | Critical rules | Occasional tasks |

## Migration Process

1. **Identify candidates for skills**
   - Procedures with 5+ steps
   - Content taking 10+ lines
   - Tasks repeated 3+ times
   - Team-shared workflows

2. **Create skill structure**

   ```bash
   # For each identified workflow
   mkdir -p .claude/skills/skill-name
   ```

3. **Extract content to skills**
   - Move detailed procedures to SKILL.md files
   - Add appropriate frontmatter
   - Set `disable-model-invocation: true` for side effects

4. **Update CLAUDE.md**
   - Remove migrated content
   - Add skill references in "Skills" section
   - Keep only essential information

## Validation

1. **Check reduction**

   ```bash
   wc -l CLAUDE.md  # Should be significantly reduced
   ls -la .claude/skills/  # Should have new skills
   ```

2. **Test skills**

   ```bash
   # Try each new skill
   /skill-name test-argument
   ```

3. **Verify completeness**
   - All important workflows accessible via skills
   - CLAUDE.md still contains critical rules
   - No duplicate information

## Best Practices

### What stays in CLAUDE.md

- Language rules (e.g., "respond in Japanese")
- Non-obvious commands
- Project-specific architecture decisions
- Critical constraints
- Skill directory listing

### What becomes a skill

- Multi-step procedures
- Build/test/deploy workflows
- Content creation guides
- Debugging procedures
- Code generation patterns

## Common Patterns to Extract

1. **Testing procedures** → `/run-tests`
2. **Build troubleshooting** → `/debug-build`
3. **Content guidelines** → `/post-guide`, `/til-guide`
4. **Code style guides** → `/code-style`
5. **Deployment steps** → `/deploy`
6. **Git workflows** → `/git-workflow`

## Final Checklist

- [ ] CLAUDE.md under 100 lines (ideally under 50)
- [ ] All procedures moved to skills
- [ ] Skills have clear names and descriptions
- [ ] `disable-model-invocation` set appropriately
- [ ] .gitignore updated for local skills
- [ ] README.md in skills directory
- [ ] Team notified of changes
