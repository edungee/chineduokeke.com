---
title: Datangle
slug: datangle
published: true
date: '2026-09-24'
featuredOrder: 1
category: Product
stage: Building
role: Product direction and hands-on development
description: Making data infrastructure easier to set up and work with, starting with the onboarding journey.
tldr: Exploring how a data platform can help people move from a business goal to a working infrastructure setup.
tools: [TypeScript, React, Node.js]
milestones:
  - id: documented-product-loop
    date: '2026-08-10'
    title: Documented the idea-to-implementation loop
    kind: Learning
    summary: Wrote up how the infrastructure-agent idea evolved through documentation, design and code.
    rationale: Make the product decisions visible, including where the proposed design and implementation diverged from the original goal.
    evidence: The article “The Loop Got Faster, Not Different” is dated 10 August 2026. This is the write-up date, not a claim about the product launch date.
  - id: onboarding-execution-and-controls
    date: '2026-09-05'
    title: Added onboarding execution and access controls
    kind: Implementation
    summary: Connected the onboarding service and deterministic step runner with authorization and a feature flag.
    rationale: Give the onboarding journey explicit execution steps, account-level access checks and control over when it is enabled.
    evidence: Repository commits on 5 September record the step runner, controller and service wiring, authorization boundary and onboarding feature flag. These establish implementation history, not public availability or customer outcomes.
workflow: [Understand the business, Propose a setup, Review the plan, Connect and provision]
workflowCaption: 'Conceptual onboarding flow — the infrastructure agent is part of Datangle.'
---

## Why this exists

Setting up data infrastructure involves more than connecting a few services. Someone has to translate a business goal into decisions about what to build, what already exists and how the pieces should fit together.

Datangle is where I am exploring that experience. The onboarding journey is a concrete part of the broader product: helping a customer describe their business, review a proposed setup and work through connecting or provisioning the resources it needs.

## What I’m building

The infrastructure agent sits inside Datangle. It brings discovery, planning and execution into a connected journey, with a stored onboarding session so the work has an explicit state.

For example, a customer can describe what they want to achieve before reviewing the proposed resources. The plan becomes something they can examine and revise before execution.

## Key decisions

- **Begin with the business goal.** Infrastructure choices need context; a list of connectors alone does not provide it.
- **Make the plan explicit.** Keep planning and execution as distinct steps so a proposed setup can be reviewed.
- **Build inside the existing product.** The agent needs to work with the platform’s integrations and account boundaries.

## How it works

The onboarding implementation separates session state, plan derivation, plan revision and step execution. That gives each part a specific responsibility and makes the journey more inspectable than a single open-ended conversation.

My accompanying article follows the process from an initial idea through documentation, design and code, including the points where those representations disagreed.

## Evidence and learning

There is an implementation in the Datangle codebase, including onboarding sessions, planning and step execution. That is evidence of a build, not evidence of customer adoption or a measured reduction in setup time.

The main lesson so far is that faster implementation does not remove the need to read the proposal carefully, test the experience and revisit the original goal.

## What’s next

Evaluate the complete onboarding journey: where people understand the proposed plan, where they need more control, and how well the experience handles a setup that cannot complete in one pass.

## Related writing

[The Loop Got Faster, Not Different](/writing/4-the-loop-got-faster-not-different) documents the thinking and development process.
