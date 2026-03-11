# Analyzing Agent Instructions — Criteria and Templates

## Table of Contents

- CLAUDE.md Success Metrics
- CLAUDE.md Content Flags (Red / Yellow / Green)
- Skill Quality Checklist
- Optimization Patterns
- Report Template

## CLAUDE.md Success Metrics

### Excellent (<50 lines)
- Only critical, project-specific information
- All procedures extracted to skills
- Maximum clarity and conciseness

### Good (50-100 lines)
- Mostly essential information
- Major procedures in skills
- Clear and scannable

### Needs Work (100-200 lines)
- Some redundancy present
- Procedures mixed with configuration

### Poor (>200 lines)
- Significant redundancy
- Detailed procedures inline
- Needs major refactoring

## CLAUDE.md Content Flags

### Red flags (definitely remove):
- Step-by-step procedures (5+ steps → extract to skill)
- Detailed API documentation (→ links or skills)
- Generic best practices the agent already knows
- File-by-file codebase descriptions
- Long explanations or tutorials
- Frequently changing information

### Yellow flags (consider removing):
- Examples that could be inferred from code
- Standard language conventions
- Verbose descriptions
- Duplicate information

### Green flags (keep):
- Project-specific constraints
- Non-obvious commands
- Custom build/test commands
- Language rules (e.g., "respond in Japanese")
- Critical warnings and common pitfalls
- Repo etiquette (branch naming, PR conventions)

## Skill Quality Checklist

### Core Quality
- [ ] `name`: lowercase, numbers, hyphens only (max 64 chars)
- [ ] `name`: no reserved words ("anthropic", "claude")
- [ ] `description`: third person, specific, includes what + when + trigger keywords
- [ ] `description`: under 1024 characters, no XML tags
- [ ] SKILL.md body under 500 lines
- [ ] Additional details in separate reference files
- [ ] No time-sensitive information
- [ ] Consistent terminology throughout
- [ ] File references are 1 level deep from SKILL.md
- [ ] Workflows have clear steps with checklists

### Progressive Disclosure
- [ ] SKILL.md serves as overview and navigation
- [ ] Reference files loaded only when needed
- [ ] Long reference files (100+ lines) have table of contents
- [ ] No deeply nested references (A → B → C)

## Optimization Patterns

### Transform verbose instructions:

**Before:**
```markdown
When creating new components, always use TypeScript
interfaces for props, place them above the component,
export the component as default if it's the main export...
```

**After:**
```markdown
- TypeScript interfaces for props
- Default export for main components
```

### Extract procedures to skills:

**Before (in CLAUDE.md):**
```markdown
## How to add a new API endpoint
1. Create route file in app/api/
2. Define handler function
3. Add validation
4. Update OpenAPI spec
5. Write tests
```

**After:** Create skill `/adding-api-endpoints`

### Remove inferrable content:

**Remove:** "Use async/await instead of callbacks"
**Why:** Standard modern JavaScript practice the agent already knows

## Report Template

```markdown
## Agent Instructions Analysis Report

### CLAUDE.md
- Lines: {count} — {status}
- Target: <50 (excellent), <100 (good)
- Red flags found: {list}
- Estimated reduction: {percentage}

### Skills Audit
| Skill | Lines | Description | Name | References | Status |
|-------|-------|-------------|------|------------|--------|
| {name} | {n} | {ok/issue} | {ok/issue} | {ok/missing} | {overall} |

### Recommended Actions (priority order)
1. {action}
2. {action}
```
