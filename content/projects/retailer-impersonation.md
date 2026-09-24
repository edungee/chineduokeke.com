---
title: When a store gets cloned
slug: retailer-impersonation
published: true
date: '2026-09-24'
featuredOrder: 4
category: Discovery
stage: Pre-validation — manual pilot proposed
role: Research, product definition and pilot design
description: Investigating whether better evidence and coordinated complaints can help small retailers respond to impersonation.
tldr: Testing an incident-response approach before deciding whether to build software around it.
tools: []
milestones:
  - id: manual-validation-proposal
    date: '2026-09-23'
    title: Defined a manual pilot before building
    kind: Product definition
    summary: Proposed five to ten authorised cases to test whether better evidence improves incident response.
    rationale: Test effectiveness, effort and willingness to pay before automating the workflow. Define stop criteria and owner approval requirements at the outset.
    evidence: The draft v0.1 PRD is dated 23 September and explicitly marked pre-validation. The cases, takedown outcomes and commercial assumptions remain untested.
workflow: [Confirm the owner and originals, Gather dated evidence, Prepare route-specific complaints, Owner approves and outcomes are tracked]
workflowCaption: 'Proposed manual pilot — no takedown outcomes have been established.'
---

## Why this exists

The research brief examines small retailers who discover a store impersonating them and struggle to get an effective response. The working hypothesis is that preparing evidence and navigating reporting routes may be a more useful starting point than another detection tool.

The intended user is a small retailer dealing with a live incident and limited time to coordinate a response.

## What I’m testing

Before building software, the proposed pilot is to help with five to ten authorised cases manually. It would record what the owner has already tried, prepare evidence and complaints, and track the response on each route.

The central question is whether this approach helps stop a clone taking money faster than the owner’s existing attempts. That remains unproven.

## Key decisions

- **Validate manually first.** Learn whether the intervention works before automating it.
- **Measure the practical outcome.** Track interruption of the fraudulent operation, alongside time, effort and response by route.
- **Treat false complaints as a product risk.** Identity checks, legitimate-seller exclusions and owner approval belong in the design from the start.

## How it would work

An owner reports the suspected clone and confirms their original materials. Dated evidence supports a comparison and proposed complaints. Unclear matches are escalated for review. The owner approves each complaint, and the response is tracked separately for each route.

The proposed agent would assist with preparation. It would not independently decide to accuse a business or submit complaints.

## Evidence and learning

The current artifact is a research-led product brief, not a working enforcement service. Public incident accounts informed the problem framing, but the effectiveness of this approach, the effort required and willingness to pay are still hypotheses.

The proposed pilot must also test whether the reporting routes and evidence requirements work in practice. Removal cannot be assumed or guaranteed.

## What’s next

Validate the pilot approach and recruit authorised participants. Record the owner’s previous attempts, preparation time, approval effort and outcomes over a defined observation period.

The proposal calls for stopping or rethinking if there is no clear speed advantage, fewer than half of cases stop taking money within fourteen days, effort stays above six hours per case without a way to reduce it, or fewer than three owners say they would pay. These are proposed decision criteria, not achieved results.

## Related writing

[Don’t Bet the Guarantee on the Model](/writing/3-dont-bet-the-guarantee-on-the-model) explores the separation between model reasoning, reliable evidence and controlled actions.
