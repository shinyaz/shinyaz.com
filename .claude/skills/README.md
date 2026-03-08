# Claude Code Skills for shinyaz.com

This directory contains reusable skills for Claude Code to help with common development tasks.

## Available Skills

### Claude Code Management

#### `/optimize-claude-md` - Optimize CLAUDE.md file
Reduces CLAUDE.md size by extracting procedures to skills.
- Analyzes current content
- Identifies extractable procedures
- Creates appropriate skills
- Updates CLAUDE.md to reference skills

#### `/create-skill` - Create new skills
Standardized workflow for creating new Claude Code skills.
- Proper frontmatter setup
- Template selection
- disable-model-invocation guidance
- Documentation updates

#### `/analyze-claude-md` - Analyze CLAUDE.md
Analyzes current CLAUDE.md and suggests optimizations.
- Line count metrics
- Identifies redundancies
- Suggests skill extractions
- Provides optimization report

### Content Management

#### `/new-post` - Create a new blog post
Creates a new blog post with proper frontmatter, structure, and validation.
- Sets up bilingual content (ja/en)
- Validates tags and categories
- Ensures proper build

#### `/new-til` - Create a new TIL entry
Creates a TIL (Today I Learned) entry following the style guide conventions.
- 100-300 words, no `##` headings, 1-2 code blocks
- Title conveys the discovery, not just the topic
- Casual tone, search-optimized content
- Bilingual support (ja/en)

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