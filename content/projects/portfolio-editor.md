---
title: Portfolio Editor
slug: portfolio-editor
published: true
date: '2026-10-06'
featuredOrder: 6
category: Experiment
stage: Open-source skill — personal pilot running
role: Product definition, workflow design and implementation
format: Agent skill
description: An evidence-backed workflow that turns ongoing work into portfolio proposals, review summaries and previews.
tldr: Keeping a portfolio current without turning every task into an achievement or publishing private work by default.
tools: []
repoUrl: https://github.com/edungee/portfolio-editor
videoUrl: https://www.youtube.com/watch?v=iPAz8Cr8MtU
videoEmbedUrl: https://www.youtube.com/embed/iPAz8Cr8MtU
liveUrl: https://www.skills.sh/edungee/portfolio-editor/portfolio-editor
liveLabel: View skill on skills.sh
milestones:
  - id: first-scheduled-draft-delivery
    date: '2026-10-05'
    title: Completed a scheduled review with draft PR delivery
    kind: Implementation
    summary: A scheduled personal-pilot run collected fresh evidence and delivered portfolio proposals with a verified preview.
    rationale: Test the full path from ongoing work to a reviewable website change while retaining editorial control.
    evidence: The run produced a draft PR and passed a production build. Historical source coverage remained partial, with unfinished reads retained for later runs. This demonstrates one scheduled run, not reliability across every source or host.
workflow:
  - Read approved work sources
  - Compare evidence with the portfolio
  - Prepare changes and a combined preview
  - Review a draft PR before publishing
workflowCaption: The personal pilot runs weekly; publication remains a human decision.
---

## Why this exists

The work that belongs in a portfolio rarely arrives as a finished case study. It is scattered across project notes, conversations, issue trackers and code changes. By the time I update the website, I have to reconstruct what changed, why it mattered and what I can actually substantiate.

Portfolio Editor started as a way to shorten that gap. The product question is whether an agent can prepare a useful editorial review from ongoing work while keeping evidence, uncertainty and publication decisions visible.

## What I built

The project has two parts: an open-source agent skill and a personal pilot using it to maintain this website. The reusable skill provides instructions, structured inputs, validation helpers and review workflows. The pilot supplies my approved sources, private state, schedule and website configuration.

The personal setup reads approved chats, Notion documents, a registered Linear project and scoped repository history. It compares developments with existing content and records whether to include, defer or ignore each candidate. Unfinished source reads remain explicit and can continue on a later run.

## Key decisions

- **Make evidence the starting point.** A task marked done or an assistant’s summary is a lead to investigate, not automatic proof of implementation, release or impact.
- **Separate reading from disclosure.** Source access does not make private material suitable for a public case study. Evidence and configuration stay outside the repository and preview.
- **Keep one reviewable change set.** Accepted updates share a draft PR, a project-by-project summary and a preview of the same committed snapshot.
- **Retain human publication control.** The agent can prepare and deliver a draft; it does not merge or deploy the site automatically.
- **Start with a skill.** Test the editorial workflow before investing in a plugin or standalone web application.

## How it works

A host scheduler starts the personal review each Monday. The agent reads new or changed material with an overlapping lookback and keeps a queue for incomplete historical coverage. It checks proposed claims against current website content, prior decisions and pending changes so the same development is not added repeatedly.

For accepted changes, it writes a private review explaining the evidence and editorial decisions, then prepares public-safe copy. Repository tools assemble an isolated website snapshot, run the production build and check the affected pages. The draft PR contains the change summary and preview for review.

The skill does not supply account access or scheduling by itself. Those capabilities depend on the host and its connected tools. Its scripted adapter handles Markdown project milestones; broader changes, such as this case study, use the host’s repository workflow.

## Evidence and learning

The 5 October personal-pilot run completed the path from fresh evidence to a draft PR and verified preview. It also exposed a practical limit: a bounded review can produce supported proposals while historical source coverage remains incomplete. Queues and honest coverage reports are part of the product, not evidence that every source was reviewed.

The public skill is available under Apache 2.0. The Codex installation target and synthetic demo have been tested; full first-use walkthroughs on other hosts still need validation. A functioning personal pilot does not establish independent-user adoption, time savings or reliable unattended operation across platforms.

## What’s next

Test first use with another person, finish the remaining source backfill and validate more host setups. Improve recovery when a source or preview becomes unavailable. A plugin or web application remains a possible next step if repeated use shows a need for a dedicated interface.

## Related project

[Personal Website V1](/projects/personal-website-v1) is the pilot’s first destination and records how the site itself evolves.
