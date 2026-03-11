---
name: analyzing-agent-instructions
description: Analyzes project.md steering file and skill files for quality, conciseness, and adherence to best practices. Generates optimization reports with specific recommendations. Use when project.md grows beyond 100 lines, after adding new skills, or when reviewing agent instruction quality.
---

Analyze agent instructions (project.md and skills) and provide optimization recommendations.

## Analysis Workflow

Copy this checklist to track progress:

```
Analysis Progress:
- [ ] Step 1: Measure project.md
- [ ] Step 2: Audit skills
- [ ] Step 3: Check descriptions
- [ ] Step 4: Generate report
```

### Step 1: Measure project.md

```bash
wc -l .kiro/steering/project.md
```

For each line/section (excluding YAML frontmatter), ask:
- Would removing this cause the agent to make a mistake?
- Is this used in every session?
- Can the agent figure this out from context?
- Is this project-specific?

### Step 2: Audit Skills

```bash
for f in .kiro/skills/*/SKILL.md; do
  printf "%-50s %s lines\n" "$f" "$(wc -l < "$f")"
done
```

For each skill, verify:
- SKILL.md body under 500 lines
- Reference files are 1 level deep (no nested references)
- Long reference files (100+ lines) have a table of contents
- No time-sensitive information

### Step 3: Check Descriptions

For each skill's `description` field, verify:
- Written in third person (not "I help" or "You can use")
- Includes what the skill does AND when to use it
- Contains specific trigger keywords for agent auto-discovery
- Under 1024 characters
- `name` field: lowercase, numbers, hyphens only, no reserved words ("anthropic", "claude")

### Step 4: Generate Report

See [report template and detailed criteria](references/PATTERNS.md) for the full report format, red/yellow/green flags, and success metrics.
