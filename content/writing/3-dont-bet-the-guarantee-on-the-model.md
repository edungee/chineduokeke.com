---
title: "Don't Bet the Guarantee on the Model"
date: "2026-07-06"
description: "Trustworthy AI products don't come from a smarter model, but from minimising how much of the guarantee depends on it."
published: true
tags:
  - AI
  - product management
  - enterprise
  - AI architecture
---

**Most enterprises are building AI products in one of two ways.**
In the first, they bolt a large language model onto an existing workflow, wire it to some data, and ship — then spend the next year discovering that a system which is right 95% of the time is, for anything that matters, wrong. In the second, they recognise that the model is non-deterministic, conclude it can't be trusted, and quietly kill the project. Both camps are making the same mistake. They are treating the language model as the product, and its reliability as the thing to be fixed.

It isn't, and it can't be.

**The more useful frame is that any serious AI product is built from three roles, and the entire discipline of building well lies in deciding what each role is *allowed* to be responsible for.**

## Three roles, not three technologies

Call them presentation, reasoning, and ground truth.

- **Presentation** — how a human's intent gets in and how results come back out.
- **Reasoning** — interpretation, planning, and orchestration; the probabilistic work the model is very good at.
- **Ground truth** — everything that must be exact, auditable, and consistent: computation, business rules, validated data; the operations where the same input must produce the same output every single time.

It is tempting to draw these as a stack, with the model in the middle resting on a deterministic engine below — resist that picture. In a working system these roles turn into a loop — reasoning calls ground truth mid-thought, gets an exact result, reasons again, calls it once more. The model doesn't sit *on top of* the deterministic engine; it *orchestrates* it. Thinking in roles rather than layers matters because it survives contact with reality, where the architecture rarely looks like three tidy boxes.

![Diagram showing reasoning orchestrating ground truth in a loop, with every guaranteed output tracing back to the deterministic engine](/img/ai-product-roles-diagram.svg)

*[I asked Claude to visualise my thoughts and it came up with this image. Reasoning sits in the middle and orchestrates ground truth — calling it and being constrained by it in a loop — while every guaranteed output traces back to the deterministic engine, not through the model.]*

The reason this distinction is important is that it tells you where to put each kind of work. A tax calculation, a pricing rule, an eligibility check, a compliance constraint — these belong in ground truth, expressed as code or rules, not entrusted to a model that will approximate them. The interpretation of a messy request, the decision about which calculation applies, the assembly of a coherent answer — these belong to reasoning.

**Get an operation in the wrong role and no amount of prompt engineering will save you.**

## Reliability is won at the seams

Here is the part most frameworks miss. Naming the three roles is one thing but nearly useless on its own, because the real value is in the *contracts between them* — the seams. That is where products succeed or fail.

There are three seams worth making explicit.

The first is the **intent contract**, between presentation and reasoning: how ambiguous human input becomes a structured goal the system can act on. The second is the **grounding contract**, between ground truth and reasoning: how exact results flow back and *constrain* further reasoning, so the model can't silently talk its way past a number the engine already computed.

The third seam is the one that decides whether your product is trustworthy: the **execution contract**, between reasoning and ground truth. This is the constrained, validated interface through which the model is *only allowed* to invoke deterministic operations. Not "the model can call any function" but a defined set of operations, with validated inputs, enforcement, and ideally a check on the model's choice before anything runs.

**Reliability is not a property you get by making the model better. It is a property you engineer into this seam.**

To see why, consider what ground truth actually guarantees. It guarantees that for a given input, it returns the same output every time. It does *not* guarantee that the model chose the right operation or fed it the right inputs. A perfectly deterministic calculation engine will happily produce a perfectly consistent answer to the wrong question, because the model decided which question to ask. The determinism is real, but if the seam above it is loose, the guarantee is hollow. **Consistency in the engine and correctness in the system are different things, and only the seam connects them.**

## The thesis: minimise what the guarantee rests on

All of this points to a single, slightly counterintuitive principle, and it is the one enterprises should build around:

> **You get more trustworthy AI not by making the model more reliable, but by minimising how much of the guarantee depends on the model.**

This inverts the instinct most teams start with. They ask, "how good does the model need to get before we can hand it the important stuff?" The better question is the opposite: "how do we keep the model away from the stuff we can't afford to get wrong?" Every claim your product needs to stand behind — every number, every rule, every commitment a customer or regulator will hold you to — should be traceable to a deterministic operation, not to a generation. The model's job is to be the flexible, fallible interpreter that decides *which* guarantees to invoke. The guarantees themselves live below it.

This is not an argument for using less AI. It is an argument for being deliberate about where the AI's fallibility is *permitted* to matter. In a financial tool, the model can explain a result in plain English, but the result itself must come from a formula. In a medical triage assistant, the model can gather and summarise symptoms, but the escalation thresholds that decide who sees a doctor should be deterministic and auditable. In each case the pattern is identical: let the model reason, but let ground truth be accountable.

## What this means for how you build

If you accept the thesis, some practical consequences follow, and they run against common habits. Building well comes down to four moves:

1. **Decide what your product must *guarantee* before you decide anything about the model.** The sharpest design question is: which outputs are guaranteed, and by what? Answer that first and the architecture largely designs itself — the guaranteed outputs define your ground-truth layer, and everything else is free to be probabilistic.
2. **Push work down, not up.** When you find yourself trying to make the model handle something exact — reconciling figures, enforcing a policy, applying a rule — that's a signal the work belongs in ground truth. Solving reliability problems with a better prompt is usually a misplaced-role problem in disguise.
3. **Invest in the execution seam disproportionately.** Most teams spend their effort on the model and the interface. The seam between reasoning and ground truth — input validation, the constrained operation set, verification before execution — is where trust is actually manufactured, and it's chronically under-built because it's invisible when it works.
4. **Separate deterministic computation from domain knowledge.** Exact rules and formulas are one thing; retrieved knowledge, heuristics, and context are another — and the latter isn't always deterministic, nor always something that sits below the model. Knowing which is which for *your* domain is most of the work.

## The honest caveat

Three-role diagrams are everywhere and cheap, and most of them die on a slide because they're too clean to survive being used. This one earns its place only if you carry the thesis with it — that trustworthiness comes from shrinking the guarantee's dependence on the model, not from perfecting it. Without that principle, "presentation, reasoning, ground truth" is just another box diagram.

There is also a real cost. Building a strong ground-truth layer and a disciplined execution seam is slower and less glamorous than shipping a chat interface over a model. Enterprises that want the demo will resent the work. **But the demo is not the product.** The product is the thing a customer, an auditor, or a regulator can rely on — and reliance is precisely what a language model cannot provide on its own, and precisely what a well-drawn deterministic layer can.

The enterprises that win the AI era will not be the ones with the best model access. Everyone will have that.

**They will be the ones who were most disciplined about what they refused to let the model be responsible for.**