# Claude Code Skills for shinyaz.com

This directory contains reusable skills for Claude Code to help with common development tasks.

## Available Skills

### Claude Code Management

#### `/optimizing-agent-instructions` - Analyze and optimize CLAUDE.md and skills
Analyzes and optimizes CLAUDE.md and skill files for quality and best practices.
- Phase 1: Analyze — measure, audit, generate report
- Phase 2: Optimize — CLAUDE.md, skills, descriptions
- Phase 3: Sync to Kiro
- Phase 4: Validate

#### `/creating-skill` - Create new skills
Standardized workflow for creating new Claude Code skills.
- Proper frontmatter setup
- Template selection
- Documentation updates

#### `/syncing-agent-config` - Sync config between Claude Code & Kiro
Synchronizes configuration between Claude Code and Kiro IDE.
- Detects drift between agent configs
- Compares project-level config and skills
- Generates sync reports

### Content Management

#### `/writing-posts` - Blog post writing guide & creation
Writing guidelines auto-loaded when editing posts, and creation workflow when explicitly invoked.
- Writing principles (title, description, structure, voice)
- Bilingual conventions (ja/en)
- Validates tags, categories, and build

#### `/writing-tils` - TIL writing guide & creation
Writing guidelines auto-loaded when editing TILs, and creation workflow when explicitly invoked.
- 100-300 words, no `##` headings, 1-2 code blocks
- Title conveys the discovery, not just the topic
- Casual tone, search-optimized content

#### `/writing-pages` - Static page writing guide & creation
Writing guidelines for creating and editing static pages.
- Frontmatter, route setup, bilingual parity
- MDX content structure

#### `/syncing-i18n` - Synchronize bilingual content
Checks and reports on translation status between Japanese and English content.
- Identifies missing translations
- Verifies frontmatter consistency
- Validates permalink structure

### Development Workflow

#### `/fixing-lint` - Fix linting errors
Automatically fixes ESLint and Prettier issues.
- Runs auto-fix first
- Handles remaining manual fixes
- Validates with build

#### `/debugging-build` - Debug build errors
Troubleshoots common Next.js build issues.
- Google Fonts network errors
- Velite content generation
- TypeScript errors
- Memory issues

#### `/running-tests` - Run appropriate tests
Executes the right test suite based on changes.
- Unit tests for components/utilities
- E2E tests for routing/pages
- Skip for content-only changes

#### `/deploying-app` - Pre-deployment validation
Runs lint, type check, unit tests, build, and E2E tests in sequence.
- Step-by-step checklist
- Skip matrix by change type

### Component Development

#### `/adding-mdx-component` - Add MDX component
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
   ---
   ```
3. Define the workflow steps
4. Use `/your-skill` to invoke

## Best Practices

- Use gerund form for naming: `processing-pdfs`, `analyzing-data`
- Keep skills focused on a single task
- Include validation steps
- Add example commands
- Document expected outcomes

## Local-Only Skills

Create `.claude/skills/*.local/` directories for personal skills that shouldn't be committed:
- Personal workflow preferences
- Environment-specific scripts
- Experimental skills

These are already in `.gitignore`.
