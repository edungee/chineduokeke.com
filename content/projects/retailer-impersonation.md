---
title: When a store gets cloned
slug: retailer-impersonation
published: true
date: '2026-09-24'
featuredOrder: 4
category: Discovery
stage: MVP defined — validation pending
role: Research, product definition and MVP planning
description: Exploring a detection-first workflow that helps small retailers review suspected store copies and approve evidence-backed complaints.
tldr: Developing a detection, review and takedown workflow, with validation gates before broader rollout.
tools: []
milestones:
  - id: manual-validation-proposal
    date: '2026-09-23'
    title: Defined a manual pilot before building
    kind: Product definition
    summary: Proposed five to ten authorised cases to test whether better evidence improves incident response.
    rationale: Test effectiveness, effort and willingness to pay before automating the workflow. Define stop criteria and owner approval requirements at the outset.
    evidence: The draft v0.1 PRD is dated 23 September and explicitly marked pre-validation. The cases, takedown outcomes and commercial assumptions remain untested.
  - id: detection-first-mvp-plan
    date: '2026-10-01'
    title: Defined a detection-first MVP
    kind: Product definition
    summary: Expanded the initial manual-pilot proposal into a staged plan for detection, operator review, customer reports and owner-approved complaints.
    rationale: Test whether finding and explaining suspected copies creates a useful starting point before scaling takedown workflows or monitoring.
    evidence: The October plan separates setup, detection and reporting, outbound validation, self-service and monitoring. Stage gates are targets to test, not achieved customer or enforcement outcomes.
workflow: [Find suspected copies, Operator reviews evidence, Owner reviews the report, Owner approves complaints and outcomes are tracked]
workflowCaption: 'Staged MVP plan — validation gates and takedown outcomes remain unproven.'
---

## Why this exists

Small retailers who find copies of their stores can struggle to assemble evidence and coordinate an effective response. The original September proposal began with a manual incident-response pilot. The October plan broadens the starting point to finding suspected copies, reviewing evidence and producing a report before preparing complaints.

## What I’m testing

The current direction is a detection-first MVP with operator review. The hypothesis is that a useful report can help an owner decide whether to pursue a takedown. Effectiveness, operating effort and willingness to pay remain unproven.

## Key decisions

- **Review evidence before presenting an accusation.** Candidate scores order the operator’s queue; they do not decide what the customer sees.
- **Keep owner approval in the workflow.** The owner approves each complaint before it is sent.
- **Use staged validation.** Detection and reporting are followed by outbound and self-service experiments; monitoring comes later.

## How it would work

The workflow finds suspected copies and collects comparison evidence. An operator reviews candidates before a customer report is released. The owner reviews the evidence and approves proposed complaints; responses and outcomes are tracked separately.

## Evidence and learning

A current MVP plan defines detection, triage, reporting and takedown workflows. Engineering progress is being tracked, but this case study does not yet establish a complete working service, public launch or successful enforcement outcomes. The earlier manual-pilot proposal remains in the project history as the starting point.

## What’s next

Validate detection quality, operator effort and the usefulness of the report before scaling the service. Test willingness to pay and owner-approved case handling, then use the results to decide whether to expand into self-service and monitoring. The plan’s stage gates remain proposed decision criteria.

## Related writing

[Don’t Bet the Guarantee on the Model](/writing/3-dont-bet-the-guarantee-on-the-model) explores the separation between model reasoning, reliable evidence and controlled actions.
