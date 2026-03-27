---
name: verifying-aws-features
description: >-
  End-to-end workflow for verifying AWS new features and writing hands-on blog posts.
  Covers verification planning, environment setup, hands-on testing with AWS CLI/SDK,
  and blog post creation with review. Use when the user shares an AWS What's New
  announcement, wants to verify a new AWS feature, asks to write a verification article,
  or mentions testing an AWS service update. Also use when the user says "verify this",
  "try this feature", or pastes an AWS announcement URL.
---

Verify AWS feature and write blog post: $ARGUMENTS

Copy this checklist to track progress:

```
Task Progress:
- [ ] Phase 1: Research & planning (present reviewed plan)
- [ ] Phase 2: Environment setup & verification
- [ ] Phase 3: Blog post writing (ja + en)
- [ ] Phase 4: Final review
```

## Phase 1: Research & Planning

Research, draft, self-review, and present the final plan in a single pass. Do NOT present intermediate drafts.

1. **Understand the feature**
   - Read the What's New announcement and linked documentation
   - Search AWS docs for details, constraints, and limits

2. **Study recent verification articles** for structure reference
   ```bash
   ls -t content/posts/ja/*.mdx | head -5
   ```
   - Common pattern: Introduction → Prerequisites → Setup (collapsible) → Numbered verifications → Summary → Cleanup

3. **Identify the anchor insight** — Before drafting scenarios, answer:
   - What is the ONE thing readers will remember from this article?
   - What is unique to this feature vs. existing alternatives? (e.g. NLB vs ALB, Serverless vs node-based)
   - Are there undocumented gotchas, constraints, or surprising behaviors in the docs? (e.g. hidden delays, quota differences) — these often become the anchor insight
   - **Reader-value check:** Does the anchor insight go beyond confirming documented facts? If it only restates what the docs say, reframe it around practical impact (e.g. not "10-min delay exists" but "10-min delay makes total deploy time X min — here's what that means for your release cycle")
   - **Hypothesis framing:** The anchor insight at this stage is a hypothesis, not a conclusion. Frame it as "we expect X based on documentation; verification will confirm and quantify." Do NOT state specific recommendations (e.g. "use Canary over Linear") before verification — instead, frame as a decision framework (e.g. "the relationship between step count and delay determines which strategy fits")

4. **Define the target reader** — State explicitly:
   - Who benefits most from this feature? (e.g. "teams using NLB for TCP workloads on ECS")
   - What prior knowledge is assumed? (e.g. "familiar with ECS Blue/Green deployments")
   - What are the top 3 questions this reader would ask about the feature?

5. **Write the core message** — Wrap the anchor insight from step 3 into 1-2 actionable sentences that state what this article delivers. This becomes the guiding filter for all scenarios. If a scenario doesn't support this message, cut it.
   - **Tone check:** Must be actionable, not just observational. Bad: "Feature X works but has limitation Y". Good: "Feature X enables Y; due to constraint Z, design choice A is practical" (gives reader a decision framework)
   - **Differentiation from anchor insight:** Anchor insight = the knowledge readers take away (a finding or decision framework). Core message = the value proposition of the article (what it delivers and how). If they say the same thing, rewrite the core message to describe the article's delivery (e.g. "This article measures X and provides data to choose between Y and Z")

6. **Draft the verification plan** including:
   - Feature overview (1-2 paragraphs, leading with the anchor insight)
   - Core message (1-2 sentences from step 5)
   - Target reader (1 sentence)
   - 2-4 numbered verification scenarios — each scenario must directly support the core message or cover a distinct aspect of the feature. Apply these checks:
     - **Focus test:** Does every scenario relate to the announced feature? Ask: "Would this scenario work identically without the new feature?" — if yes, cut it. For sub-features (e.g. Linear + Canary), pick one as primary and show the other as a diff
     - **Consolidation test:** If two scenarios share the same structure (e.g. "deploy and measure time") or would be observed in the same execution flow (e.g. lifecycle stage transitions), merge them into one richer scenario with a comparison table. Fewer, denser scenarios beat many thin ones
     - **Unique-value test:** Include at least one scenario for feature-specific behavior that readers can't learn from existing docs alone (e.g. measuring actual deployment time with NLB's 10-min delay)
     - **Reader-question coverage:** At least 2 of the top 3 reader questions from step 4 must be answered by the scenarios
     - **Parameter justification:** For every configurable value in a scenario (e.g. stepPercent=33%), state why that value was chosen over alternatives. Readers need to understand the reasoning to adapt settings to their own environment
   - Comparison table definition — if multiple scenarios measure the same dimensions (e.g. time, step count), define the comparison table columns upfront. This ensures scenarios collect the right data
   - Article structure — list the planned section headings in order. When multiple scenarios measure comparable dimensions, insert a comparison/analysis section between the measurement scenarios and any remaining scenarios. The comparison section must appear explicitly in the heading list (e.g. "Comparison: Linear vs Canary on NLB")
   - Required AWS resources and permissions
   - Target region
   - Expected outcomes per scenario

7. **Self-review the draft before presenting** — Review the plan for cross-cutting issues that individual scenario checks cannot catch. Fix all issues found, then present only the final result in step 8:
   - **Anchor insight as hypothesis:** Is the anchor insight framed as a testable hypothesis, not a pre-determined conclusion? If it states specific recommendations (e.g. "use X over Y"), rewrite as a decision framework (e.g. "the relationship between A and B determines which approach fits")
   - **Anchor insight vs core message:** Do they say the same thing? If yes, rewrite the core message to describe the article's value proposition
   - **Scenario flow:** Read the scenario list as a narrative arc. Does each scenario build on the previous one's findings? If two adjacent scenarios feel disconnected, reorder or add a one-sentence bridging rationale to the plan (e.g. "Scenario 1 establishes the baseline delay; Scenario 2 tests whether it scales with step count"). The plan presented to the user must include these bridging rationales between scenarios
   - **Scope creep:** Does any scenario require resources outside the feature being tested (e.g. building an ALB environment for comparison)? If so, replace with a documentation-based note in the article body. For scenarios testing common features (e.g. CloudWatch alarm rollback), ensure the verification focus is on the new feature's behavior (e.g. "does NLB delay affect rollback time?"), not the common feature itself

8. **Present the final plan and wait for user approval**
   - Show the self-reviewed and refined plan (not the raw draft)
   - Do NOT proceed to verification until the user confirms
   - Incorporate feedback and adjust scenarios as needed

## Phase 2: Environment Setup & Verification

9. **Build the test environment**
   - Use AWS CLI to create resources
   - Record all commands for reproducibility
   - Verify the environment is ready before testing

10. **Execute each verification scenario**
    - Run one scenario at a time
    - Capture: commands, outputs, error messages, timing data
    - Compare results against documentation — note any discrepancies
    - If a scenario fails unexpectedly, investigate and document the finding

11. **Summarize findings** — Present key results to user before writing

## Phase 3: Blog Post Writing

12. **Create the post** following [writing-posts skill](../writing-posts/SKILL.md)
    - Create both `content/posts/ja/{slug}.mdx` and `content/posts/en/{slug}.mdx`
    - Use the [verification article template](../writing-posts/references/EXAMPLES.md#verification-article-template)
    - All article structure, voice, and formatting rules are defined in writing-posts — follow them
    - Verification articles tend to have long code blocks — use collapsible `<details>` aggressively for setup steps, full source code, and cleanup commands

## Phase 4: Final Review

Review thoroughly. Read the entire article twice — once for technical accuracy, once for readability.

13. **First pass — Technical accuracy:**
    - [ ] Verification results match what was actually observed
    - [ ] Commands and outputs are accurate and reproducible by readers
    - [ ] Documentation references are correct and links work
    - [ ] No missing explanations — every step, result, and decision is explained
    - [ ] Tags are lowercase and hyphenated

14. **Second pass — Readability and completeness:**
    - [ ] Article is readable and well-structured for the target audience
    - [ ] Core message from step 5 is reflected in the article's introduction and conclusion
    - [ ] No gaps in the narrative — sufficient context, transitions, and explanations throughout
    - [ ] Both ja/en versions maintain bilingual parity

15. **Build check**
    ```bash
    npm run build
    ```
    If build fails, fix before proceeding.

16. **Commit**
    ```bash
    git add content/posts/
    git commit -m "docs: Add verification article about [feature name]"
    ```
