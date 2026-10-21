---
title: CloneBrake — when a store gets copied
slug: retailer-impersonation
published: true
date: '2026-09-24'
featuredOrder: 5
category: Discovery
stage: MVP evolving — outcomes unvalidated
role: Product definition, branding and workflow design
description: Developing CloneBrake, an evidence-first workflow for finding copied stores and turning owner authorisation into operator-reviewed action.
tldr: From a manual-response proposal to a named product with evidence-first review, checkout authorisation and a payment-linked case workflow.
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
  - id: clonebrake-naming-decision
    date: '2026-10-01'
    title: Selected CloneBrake after naming checks
    kind: Brand decision
    summary: Used Brand Launch Agent to compare names, investigate collisions and select CloneBrake; purchased the matching .com domain.
    rationale: Find a distinctive name that suggests intervention without promising removal, with room beyond the initial retail use case.
    evidence: The naming exercise rejected Cloneward and Impostra after domain or social-name conflicts. Checks informed the choice but did not establish trademark clearance or ownership of unclaimed-looking social handles.
  - id: evidence-first-review-design
    date: '2026-10-16'
    title: Put the evidence before the agent’s recommendation
    kind: Design decision
    summary: Revised the report and operator review around side-by-side evidence, plain-language explanations and a separate decision panel.
    rationale: Make it easier to inspect the underlying comparison before accepting the agent’s call, reducing the risk of rubber-stamping its recommendation.
    evidence: The approved redesign replaces customer-facing scores with explanations of what was copied and puts proof before the payment decision. This records the design direction, not a measured improvement in review accuracy.
  - id: authorisation-and-payment-workflow
    date: '2026-10-17'
    title: Revised authorisation and the paid-case workflow
    kind: Product decision
    summary: Moved from approving each complaint to authorisation at checkout, followed by operator confirmation of paid cases before filing.
    rationale: Reduce repeated owner approval steps while retaining an explicit evidence check and a clear route for rejecting unsupported cases.
    evidence: The revised requirements place paid cases in a confirmation queue, call for a refund when a copy cannot be confirmed, and measure the proposed 24-hour filing window from payment. These are workflow requirements, not evidence of achieved response times or successful removals.
workflow:
  - Find suspected copies
  - Review and explain the evidence
  - Owner authorises at checkout
  - Operator confirms the paid case
  - File supported complaints and track outcomes
workflowCaption: 'Evolving product design — implementation tracking does not establish a validated service or removal outcomes.'
---

## Why this exists

Small retailers who find copies of their stores can struggle to assemble evidence and coordinate an effective response. The September proposal began with a manual incident-response pilot. It evolved into CloneBrake: a detection-first product concept that helps an owner understand what has been copied before deciding what to do.

## What I’m testing

Can clear evidence help a retailer decide whether to act, and can a controlled workflow turn that decision into supported complaints? Detection quality, operating effort, willingness to pay and enforcement outcomes still need validation.

## Key decisions

- **Choose the name through evidence.** Brand Launch Agent compared candidates and checked domain, social-name and company/product collisions. CloneBrake was selected and the matching domain purchased; those steps do not imply full legal clearance.
- **Lead with the comparison.** The revised design shows the copied material before the agent’s recommendation. Customer reports explain the evidence in sentences rather than exposing a confidence score.
- **Separate authorisation from confirmation.** The newer workflow replaces approval of every complaint with owner authorisation at checkout and an operator check before filing.
- **Make the paid-case boundary explicit.** The design gives paid cases their own confirmation queue and starts the proposed filing clock at payment, including the team’s check.
- **Keep validation staged.** Reporting, outbound validation, self-service and monitoring remain separate steps rather than one assumed launch.

## How the design evolved

The original plan kept the owner involved in approving every complaint. The later design moves that authorisation to checkout, while retaining operator confirmation of the evidence. A case that cannot be confirmed should be refunded rather than filed. Routes that require the owner to submit directly remain a separate handoff.

The visual direction evolved too. The October redesign uses annotated comparisons and plain-language explanations to make evidence easier to inspect. Its operator layout places the comparison beside a decision panel, so checking the evidence does not require scrolling past the recommendation.

## Evidence and learning

The project history preserves the manual-pilot proposal, detection-first plan, naming decision and subsequent workflow revisions. The naming exercise is also a concrete internal use of [Brand Launch Agent](/projects/brand-launch-agent): availability observations changed the shortlist before a name was chosen.

Product and design decisions are supported by the working records. Engineering tasks are tracked separately; this case study does not yet establish a complete working service, public launch, achieved filing times or successful enforcement outcomes. Naming checks were observations at the time, not a continuing guarantee of availability.

## What’s next

Validate the evidence review and paid-case flow with real cases, measuring detection quality, operator effort and owner understanding. Test willingness to pay and filing performance before treating the proposed service window or broader rollout as proven.

## Related writing

[Don’t Bet the Guarantee on the Model](/writing/3-dont-bet-the-guarantee-on-the-model) explores the separation between model reasoning, reliable evidence and controlled actions.
