# Claude Code Skills for shinyaz.com

This directory contains reusable skills for Claude Code to help with common development tasks.

## Available Skills

### Content Management

#### `/new-post` - Create a new blog post
Creates a new blog post with proper frontmatter, structure, and validation.
- Sets up bilingual content (ja/en)
- Validates tags and categories
- Ensures proper build

#### `/sync-i18n` - Synchronize bilingual content
Checks and reports on translation status between Japanese and English content.
- Identifies missing translations
- Verifies frontmatter consistency
- Validates permalink structure

### Development Workflow

#### `/fix-lint` - Fix linting errors
Automatically fixes ESLint and Prettier issues.
- Runs auto-fix first
- Handles remaining manual fixes
- Validates with build

#### `/debug-build` - Debug build errors
Troubleshoots common Next.js build issues.
- Google Fonts network errors
- Velite content generation
- TypeScript errors
- Memory issues

#### `/run-tests` - Run appropriate tests
Executes the right test suite based on changes.
- Unit tests for components/utilities
- E2E tests for routing/pages
- Skip for content-only changes

### Component Development

#### `/add-mdx-component` - Add MDX component
Creates a new MDX component with proper setup.
- Component creation and registration
- Tailwind v4 styling
- Test file generation
- Usage documentation

## Creating Custom Skills

To add a new skill:

1. Create a directory: `.claude/skills/your-skill/`
2. Add `SKILL.md` with frontmatter:
   ```markdown
   ---
   name: your-skill
   description: What this skill does
   disable-model-invocation: true  # Optional: prevent automatic triggering
   ---
   ```
3. Define the workflow steps
4. Use `/your-skill` to invoke

## Best Practices

- Keep skills focused on a single task
- Include validation steps
- Add example commands
- Document expected outcomes
- Use `disable-model-invocation: true` for skills with side effects

## Local-Only Skills

Create `.claude/skills/*.local/` directories for personal skills that shouldn't be committed:
- Personal workflow preferences
- Environment-specific scripts
- Experimental skills

These are already in `.gitignore`.