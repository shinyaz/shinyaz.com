---
name: analyze-claude-md
description: Analyze CLAUDE.md and suggest optimizations
---

Analyze the current CLAUDE.md file and provide optimization recommendations.

## Analysis Steps

1. **Read current CLAUDE.md**
   ```bash
   wc -l CLAUDE.md
   cat CLAUDE.md
   ```

2. **Metrics to check**
   - Total line count (target: <50-100)
   - Section breakdown
   - Instruction density
   - Redundancy with code/docs

3. **Identify issues**

   ### Red flags (definitely remove):
   - [ ] Step-by-step procedures (→ skills)
   - [ ] Detailed API documentation (→ links or skills)
   - [ ] Generic best practices Claude already knows
   - [ ] File-by-file codebase descriptions
   - [ ] Long explanations or tutorials

   ### Yellow flags (consider removing):
   - [ ] Examples that could be inferred
   - [ ] Standard language conventions
   - [ ] Verbose descriptions
   - [ ] Duplicate information

   ### Green flags (keep):
   - [ ] Project-specific constraints
   - [ ] Non-obvious commands
   - [ ] Custom build/test commands
   - [ ] Language rules (e.g., "respond in Japanese")
   - [ ] Critical warnings

4. **Generate optimization report**

   ```markdown
   ## CLAUDE.md Analysis Report

   ### Current State
   - Lines: {count}
   - Sections: {list}
   - Estimated reduction possible: {percentage}

   ### Recommended Extractions to Skills

   1. **{Section name}** ({lines} lines)
      - Suggested skill: `/{skill-name}`
      - Reason: {detailed procedures/domain knowledge}

   2. **{Section name}** ({lines} lines)
      - Suggested skill: `/{skill-name}`
      - Reason: {multi-step workflow}

   ### Recommended Deletions

   - {Line/section}: Claude can infer from {source}
   - {Line/section}: Standard practice, not needed

   ### Recommended Consolidations

   - Combine {section1} and {section2}
   - Simplify {verbose section} to bullet points

   ### Priority Actions

   1. Create `/{skill}` skill for {content}
   2. Remove {redundant section}
   3. Consolidate {related sections}
   ```

5. **Validation questions**
   For each line/section, ask:
   - Would Claude make mistakes without this?
   - Is this used in every session?
   - Can Claude figure this out from context?
   - Is this project-specific?

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

**After (in skill):**
Create skill `/add-api-endpoint`

### Remove inferrable content:
**Remove:** "Use async/await instead of callbacks"
**Why:** Standard modern JavaScript practice

### Consolidate related items:
**Before:**
```markdown
- Run tests with npm test
- Run linting with npm run lint
- Build project with npm run build
```

**After:**
```markdown
Commands: npm test, npm run lint, npm run build
```

## Success Metrics

### Excellent (<50 lines)
- Only critical, project-specific information
- All procedures in skills
- Maximum clarity and conciseness

### Good (50-100 lines)
- Mostly essential information
- Major procedures in skills
- Clear and scannable

### Needs Work (100-200 lines)
- Some redundancy present
- Procedures mixed with configuration
- Could be more concise

### Poor (>200 lines)
- Significant redundancy
- Detailed procedures inline
- Needs major refactoring

## Next Steps After Analysis

1. **Immediate**: Remove obvious redundancies
2. **Short-term**: Create skills for procedures
3. **Long-term**: Maintain and refine based on usage