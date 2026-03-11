# Optimizing Agent Instructions — Best Practices

## What Stays in CLAUDE.md

| Include | Exclude |
|---------|---------|
| Bash commands the agent can't guess | What the agent can understand from reading code |
| Code style rules that differ from defaults | Standard language conventions |
| Test instructions and recommended runners | Detailed API documentation (link instead) |
| Repo etiquette (branch naming, PR conventions) | Frequently changing information |
| Project-specific architecture decisions | Long explanations or tutorials |
| Dev environment quirks (required env vars) | File-by-file codebase descriptions |
| Common pitfalls or non-obvious behavior | Self-evident practices like "write clean code" |

## What Becomes a Skill

- Multi-step procedures (5+ steps)
- Build/test/deploy workflows
- Content creation guides
- Debugging procedures
- Code generation patterns
- Domain knowledge not needed every session

## Skill Description Best Practices

Write in **third person**. Descriptions are inserted into system prompts.

```yaml
# Good: third person, specific, includes when
description: Extracts text and tables from PDF files, fills PDF forms,
  and merges multiple PDFs. Use when working with PDF documents or
  when the user mentions PDFs, forms, or document extraction.

# Bad: first person
description: I help with PDF processing.

# Bad: second person
description: You can use this to process PDFs.

# Bad: too vague
description: Helps with documents.
```

## Progressive Disclosure Pattern

SKILL.md serves as an overview that points Claude to detailed materials:

```
skill-name/
├── SKILL.md              # Overview + navigation (under 500 lines)
├── references/
│   ├── guide.md          # Detailed reference (loaded on demand)
│   └── examples.md       # Examples and templates
└── scripts/
    └── validate.py       # Executable scripts (run, not loaded)
```

Key rules:
- **1 level deep only** — All references linked directly from SKILL.md
- **Table of contents** for reference files over 100 lines
- **Scripts are executed**, not read into context (saves tokens)

## Naming Conventions

Recommended: **gerund form** (verb + -ing)
- `processing-pdfs`, `analyzing-data`, `testing-code`

Acceptable alternatives:
- Noun phrases: `pdf-processing`, `data-analysis`
- Action-oriented: `process-pdfs`, `analyze-data`

Avoid:
- Vague: `helper`, `utils`, `tools`
- Too generic: `documents`, `data`, `files`
- Reserved words in name: `anthropic-*`, `claude-*`

## Workflow Skills Checklist

- [ ] Clear step-by-step instructions
- [ ] Copyable progress checklist for Claude to track
- [ ] Validation/feedback loop (validate → fix → repeat)
- [ ] `disable-model-invocation: true` for skills with side effects

## Final Optimization Checklist

- [ ] CLAUDE.md under 100 lines (ideally under 50)
- [ ] All procedures extracted to skills
- [ ] All skill names: lowercase, numbers, hyphens, no reserved words
- [ ] All descriptions: third person, what + when + keywords
- [ ] SKILL.md files under 500 lines
- [ ] References 1 level deep, with TOC if 100+ lines
- [ ] No time-sensitive information
- [ ] Consistent terminology throughout
- [ ] Shared skills synced to `.kiro/skills/`
