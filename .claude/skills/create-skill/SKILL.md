---
name: create-skill
description: Create a new Claude Code skill with proper structure
disable-model-invocation: true
---

Create a new skill: $ARGUMENTS

## Skill Creation Workflow

1. **Determine skill details**
   - Name: kebab-case (e.g., `fix-lint`, `new-post`)
   - Purpose: Clear, single responsibility
   - Side effects: Does it modify files or run commands?

2. **Create skill directory**
   ```bash
   mkdir -p .claude/skills/{skill-name}
   ```

3. **Create SKILL.md with proper frontmatter**
   ```markdown
   ---
   name: {skill-name}
   description: {concise description}
   disable-model-invocation: {true if has side effects}
   ---
   ```

4. **Define skill content**

   ### For workflow skills:
   ```markdown
   {Description of what this skill does}: $ARGUMENTS

   ## Workflow

   1. **Step name**
      - Detail 1
      - Detail 2
      ```bash
      command if needed
      ```

   2. **Next step**
      [Continue...]
   ```

   ### For knowledge skills:
   ```markdown
   # {Topic}

   ## Key Information
   - Point 1
   - Point 2

   ## Guidelines
   [Domain-specific knowledge]
   ```

5. **Set disable-model-invocation**

   | Set to `true` when: | Leave unset when: |
   |-------------------|------------------|
   | Creates/modifies files | Read-only operations |
   | Runs tests or builds | Provides information |
   | Executes commands | Analysis only |
   | Has system side effects | Pure computation |

6. **Add to skills documentation**
   Update `.claude/skills/README.md`:
   ```markdown
   #### `/{skill-name}` - {brief description}
   {1-2 sentences about what it does}
   - {key feature 1}
   - {key feature 2}
   ```

7. **Test the skill**
   ```bash
   # Invoke the skill
   /{skill-name} test-argument
   ```

## Skill Types and Templates

### 1. **Workflow Skill** (step-by-step procedures)
   Examples: `/new-post`, `/fix-lint`, `/deploy`
   - Clear numbered steps
   - Command examples
   - Validation steps
   - Usually needs `disable-model-invocation: true`

### 2. **Diagnostic Skill** (troubleshooting)
   Examples: `/debug-build`, `/analyze-performance`
   - Problem identification
   - Solution strategies
   - Common issues and fixes

### 3. **Knowledge Skill** (domain information)
   Examples: `/api-conventions`, `/architecture`
   - Reference information
   - Best practices
   - Conventions and standards
   - Usually no `disable-model-invocation` needed

### 4. **Validation Skill** (checking and reporting)
   Examples: `/sync-i18n`, `/audit-security`
   - Check procedures
   - Reporting format
   - Action items

## Best Practices

### Naming Conventions
- Use kebab-case: `my-skill-name`
- Be specific: `fix-typescript-errors` not `fix-errors`
- Use verbs for actions: `create-`, `fix-`, `debug-`, `deploy-`
- Use nouns for knowledge: `conventions`, `architecture`

### Documentation
- First line: What the skill does
- Include examples of usage
- List prerequisites if any
- Specify expected outcomes

### Organization
- Group related skills in subdirectories if needed
- Keep individual skills focused (single responsibility)
- Avoid overlapping functionality between skills

### Maintenance
- Regular review: Remove unused skills
- Update outdated procedures
- Consolidate similar skills
- Version control all changes

## Common Skill Patterns

### File Generation
```markdown
1. Determine file location
2. Create file with template
3. Validate syntax
4. Run tests if applicable
```

### Debugging
```markdown
1. Identify symptoms
2. Check common causes
3. Run diagnostic commands
4. Apply fixes
5. Verify resolution
```

### Validation
```markdown
1. Gather data
2. Check against criteria
3. Generate report
4. Suggest actions
```

## Skill Testing Checklist

- [ ] Skill is invocable with `/{skill-name}`
- [ ] Clear, actionable steps
- [ ] No ambiguous instructions
- [ ] Side effects properly marked
- [ ] Works with various inputs
- [ ] Error cases considered
- [ ] Documentation updated