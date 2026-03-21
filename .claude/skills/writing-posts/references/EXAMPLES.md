# Post Guide — Detailed Examples

## Contents

- [Title Examples](#title-examples)
- [Description Examples](#description-examples)
- [Closing Examples](#closing-examples)
- [Frontmatter Template](#frontmatter-template)
- [Series Articles](#series-articles)
- [Collapsible Sections](#collapsible-sections)
- [Verification Article Template](#verification-article-template)

## Title Examples

- Bad: "About OG images"
- Good: "Auto-generate dynamic OG images for a Next.js blog"

## Description Examples

- Bad: "Learn how to dynamically generate OG images with Next.js."
- Good: "Static-generate per-post OG images at build time with opengraph-image.tsx and Satori. The biggest gotcha is Satori's inline-style constraint."

## Closing Examples

- Bad: "Added X" (action listing)
- Good: "`default(false)` makes schema changes safe" (transferable principle)

Format:
```markdown
## Summary / まとめ

- **Bold insight** — Why it matters and how to apply it.
- **Bold insight** — Why it matters and how to apply it.
```

## Frontmatter Template

```yaml
---
title: "Specific, outcome-oriented title"
description: "120-200 chars: what it does + unique insight"
date: YYYY-MM-DD
published: true
featured: false # Reserve for major milestones only
categories: [programming] # Available: ai-agents, ai-tools, infrastructure, programming, writing
tags: ["nextjs", "typescript", "tailwindcss"] # lowercase, hyphenated
series: "my-series" # optional: series identifier (shared across posts in the same series)
seriesOrder: 1 # optional: position within the series
seriesExtra: true # optional: mark as bonus/extra entry (default: false)
---
```

## Series Articles

- Posts sharing the same `series` identifier automatically get a series navigation component
- `seriesOrder` controls display order (starting from 1)
- Bonus entries use `seriesExtra: true` to appear in a separate section
- Include introductory links to previous/next articles at the beginning of the body

## Collapsible Sections

Use `<details>` to keep the narrative readable while providing full reproducibility. Collapse these:

- **Full source code** — e.g. "Full server code (server.py)", "Complete Rust function (Cargo.toml + source)"
- **Deploy/setup steps** — e.g. "Deploy steps (reproduce the test environment)", "Deploy steps (IAM + Lambda)"
- **IAM/infra scaffolding** — e.g. "IAM policy and role creation commands", "VPC resource deletion"
- **Raw data/cleanup** — e.g. "All 16 measurement data points", "Resource deletion commands"

Format (consistent CSS classes):

```markdown
<details className="my-4 rounded-lg border border-border bg-muted/30 p-4">
<summary className="cursor-pointer font-medium">Deploy steps (reproduce the test environment)</summary>

Content here (code blocks, text, etc.)

</details>
```

Rules:
- Summary text should describe what's inside, not just "Details"
- Always leave a blank line after `<summary>` and before `</details>`
- Keep the main narrative outside — explain what the code does before the collapsible, put the full code inside

## Verification Article Template

For AWS new feature / service hands-on articles (most common article type on this blog).

### Opening pattern

The introduction follows a consistent 3-part structure:

1. **Date + What's New link** — Announce the feature with a link to the AWS What's New post
2. **Background** — Why this matters, what problem it solves
3. **Scope + official docs link** — What this article covers, link to official documentation

```markdown
## Introduction / はじめに

On YYYY-MM-DD, AWS [announced Feature X](https://aws.amazon.com/about-aws/whats-new/...). Background explanation.

This article shares the results of verifying ... . See the official documentation at [Doc Title](https://docs.aws.amazon.com/...).
```

### Prerequisites pattern

Inline format (short list):

```markdown
Prerequisites:

- AWS CLI configured (`service:*`, `iam:*` permissions)
- Test region: ap-northeast-1 (Tokyo)
```

Or as a heading for longer lists:

```markdown
## Prerequisites

- Python 3.12+
- AWS CLI configured
- Access permissions for the target service
```

### Skip link pattern

When setup is long, add at the end of the setup intro:

```markdown
If you only want the results, skip to [Verification Results](#verification-results).
```

### Numbered verification pattern

For multiple verification scenarios:

```markdown
## Verification 1: Basic behavior
## Verification 2: Error handling
## Verification 3: Performance measurement
```

### Cleanup section

Always at the end, after the summary:

```markdown
## Cleanup

Delete resources in reverse creation order.

\`\`\`bash title="Terminal"
# example commands
\`\`\`
```

### Frontmatter example (verification article)

```yaml
---
title: "Build a voice agent with Bedrock AgentCore Runtime WebRTC support"
description: "Build and deploy a bidirectional voice streaming agent using Nova Sonic via AgentCore Runtime's new WebRTC support. Verified that TURN-only configuration is critical."
date: YYYY-MM-DD
published: true
featured: false
categories: [ai-agents]
tags: ["bedrock", "agentcore", "webrtc", "nova-sonic", "ai-agents"]
---
```
