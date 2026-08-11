---
title: "The Loop Got Faster, Not Different"
date: "2026-08-10"
description: "What eleven days from raw idea to shipped actually looked like — and how the doc, the design and the code each turned out to be wrong in a different direction."
published: true
tags:
  - product management
  - AI
  - design
  - engineering
---

If you're anything like me — a hip hop fan — you'd have to have been living under a rock to miss the Drake and Kendrick beef. This isn't about the beef though. It's about what came out the other side of it: *Iceman*, an album most fans think is Drake's best since *Views*, and specifically, the naming of four tracks on it.

They're called the "Make Thems." Ask most listeners and they'll tell you those four are the best thing on the record. That's the concept I'm borrowing.

I've [argued before](/writing/2-nothing-changes-in-product-management-even-with-AI) that nothing fundamental changes in product management, and I still stand by it. What I also said is that the tools we use are evolving and we should embrace that — so this is me doing exactly that. What follows is what the loop actually looks like now, using something real: an agent that sets up a customer's data infrastructure for them. It creates their account, works out what their business does, proposes what to build, and provisions it. The building itself took two days. The whole thing — from opening the codebase for the first time to having it working and written up — took eleven.

So — my version of the Make Thems. The "You Shoulds."

## You should write

One of the fundamental ways to drive clarity of thoughts is to write. It helps draw out your thinking in a sheet, document or pad, clear enough to see a semblance of all the random thinking in one place. The great thing about it is that it doesn't have to be a fully fledged document, that could be used as either a white paper or even a requirement document — what it does is define the guardrails and direction for what you should do next, or what you aim to achieve. If anything it should be rough and raw, which makes it both authentic and yours.

![The raw idea dump — no structure, no headings, no attempt to sound finished](/img/writing/raw-idea-dump.png)

For this document, you can see that I have gone down the path of a raw dump of my ideas. It explores the following:

- What I'm thinking
- What problems we see
- The key questions we are looking to answer
- Assumptions and initial bets

This goes without saying, you should have spoken to customers, aligned your thinking with the business direction, and be clear that you're either helping the business make a new bet or adding value to one it has already made. The writing doesn't create that understanding — it organises it.

What you end up with isn't a document anyone else should read yet, and that's fine — it was never for them. It's for you. It's the thing that turns a vague feeling that something is wrong into four or five specific claims you can actually validate or invalidate. Everything after this depends on having that.

## You should accept help

Now, turning that dump into a proper document is work, but if I'm honest with myself it's not particularly *interesting* work. Restructuring, filling in the sections everyone expects to see, writing out the success metrics, adding the phasing table. I've done it enough times to know I'm not thinking very hard while I do it — I'm formatting.

So hand it over. I gave the raw dump to Claude and asked it to turn it into a real PRD. To make it more interesting and precise, I included the existing codebase in that session — I'm using the Claude integration in VS Code.

![The Claude integration running in VS Code with the codebase open alongside the draft](/img/writing/vscode-claude.png)


It went and read the actual codebase. The PRD it came back with cited the specific integration modules we'd already built, referenced the commit where we'd fixed the Snowflake config bug, and pointed at the exact frontend routes the new flows would have to slot into. That's grounding I would have had to go and dig up myself, and it's the difference between a document that sounds plausible and one that's actually anchored to the thing you're building.


![The generated PRD beside the raw dump — same thinking, twenty minutes apart](/img/writing/prd-from-dump.png)


It also wrote the sections I'd have quietly skipped. Success metrics. A roadmap with phases. Open questions — and this is the part I'd flag to anyone doing this — it was upfront about what it *didn't* know. It couldn't tell me our current drop-off baseline, or whether we had feature flagging in place, so it listed those as open questions instead of inventing numbers.

This is the "tools are evolving" thing I keep going on about, and it's worth being precise about what changed. My thinking didn't get outsourced. The dump was still mine, the bets were still mine, the judgement calls were still mine. What got outsourced was the two hours of structuring — and that's a good trade, as long as you do the next bit.

## You should read

Here's where it gets uncomfortable and one you should really pay attention to, so I'll be blunt: the document that comes back looks finished.

That's the trap. It's well-structured, the headings are all there, the reasoning flows, the tables line up. It has the *texture* of a document someone spent a week on. And your brain, which is tired and would quite like this to be done, will happily accept the formatting as evidence of correctness.

It isn't. So read it properly.

When I read ours, the recommendation was to build Option B — the agent connects the infrastructure you already have — and to push Option A, where the agent builds the whole thing for you from nothing, out to "Phase 4 (future PRD)", fourth in line and into other quarter.

![The scope section before and after — 'Recommended v1 scope: Option B', and what it became once I'd actually read it](/img/writing/scope-before-after.png)


And the argument for that was good. Option B reused modules we'd already built, so it was less work. It carried less risk. And it resolved every single customer incident we had on record. If you'd handed me that paragraph cold, I'd have agreed with it.

But here is the problem, Option A was the actual product. An agent that takes someone from nothing to a working data stack is the thing nobody else is doing — the one that connects a warehouse you already own is a convenience. We'd ranked the convenience first and scheduled the differentiator for later.

So why did it get that wrong? Because of the evidence it was reasoning from. Every one of those customer incidents came from someone who *already had infrastructure*. Obviously — those are the only people who get far enough into the product to hit a problem worth complaining about.

> **Nobody raises a support ticket for a product they never managed to start using.**

The entire group Option A was for — turn up, have nothing, leave — was invisible in the data. Not underweighted, completely absent. The document reasoned faultlessly from what it had, and what it had was missing exactly the people we were trying to win.

That's the thing I'd want you to take from this section. Reading isn't proofreading. You're not checking spelling and you're barely checking logic, because the logic is usually fine. You're checking it against what you know that *isn't in the document* — the customer who left before they could complain, the thing everyone in the company knows but nobody wrote down. The doc can only reason about what's in the room. You're the one who knows who's missing.

Which is also, if I'm being fair to it, exactly why this step works. I caught it by reading. That's the whole argument for the section.

## You should show

Here's the thing about writing though — words let you off the hook. You can write "the agent asks the user about their business," read it back, nod, and genuinely believe you've made a decision. However, you've only written a sentence that sounds like one.

A document tells you what you intend. A design shows you what actually happens. And the moment something shows you what happens, you can argue with it — which is the whole point.

So the next step was to take the PRD into Claude Design. And I did the same thing I'd done with the document — I didn't just hand over the requirements, I gave it the frontend codebase as well.

That turns out to matter more than it sounds. It meant the design didn't go off and invent a look for us. It came back using our actual purple, our real logo, the type scale and spacing we already had defined, and the components we'd already built. Same move as before: ground it in the thing that exists, and you get something anchored instead of something merely plausible.

The practical version of that: what came back was buildable. Not a beautiful design that would have quietly meant rewriting half the app to accommodate it, which is the usual tax on a design made in isolation.

And it wasn't a picture of a screen either. It was clickable, with real logic underneath it: the order the steps happen in, the exact words the agent uses, what it does when someone says "actually I already have one of those," what it does when a provider says no.

![A short clip of the prototype being clicked through — choosing an option and watching the card resolve](/img/writing/prototype-mid-flow.mp4)


And immediately it started answering questions the PRD had never thought to ask:

- **How many fields does signup have?** One. Just an email. No name, no company, no password — the design had already decided those could wait until settings.
- **What if they already have a warehouse?** Not a yes/no. Three options — create it, I have one, or leave it out entirely — and if you leave something out, the agent tells you what you're giving up instead of quietly agreeing.
- **What does a question look like after you've answered it?** It collapses into a record of what you decided, so the whole thing reads back like a history rather than a screen full of dead buttons.

While these might pass as visual decisions, they're fundamentally product decisions — the kind you'd normally expect to make in the doc. But the doc never had to answer "how many fields does signup have," so it never noticed it had an opinion. Designing the actual flow forces the question, and forcing the question is the value.

## You should build

Everything up to this point is still a hypothesis. Nice-sounding sentences survive in documents. They survive in prototypes too, honestly. They do not survive in code.

Two things happened when we started building, and I'd have missed both.

**The design asked for one field. The system demanded five.**

Signup wanted an email. Our database wanted first name, last name, password and company, all mandatory. My first instinct was to fix the design — collect all five in one tidy card, note the deviation somewhere, move on. It felt reasonable. The design was "wrong" about what the backend could do.

That instinct was the actual mistake. The design wasn't ignorant of the constraint, it was making an argument: signup should cost you one field. The constraint was just a schema decision someone made a year ago and nobody had revisited. So we bent the system instead — made those columns optional, worked the company name out from the email domain — and the design won, correctly.

**The design assumed the agent could ask a question and wait.**

It couldn't. Our runtime ended a session the moment the model stopped doing things — and asking a question isn't doing a thing. So the agent, with no way to pause, did the only thing available to it: wrote all three of its questions into one message and declared itself finished.

![Every question the agent intended to ask, listed under a green tick saying it had finished asking](/img/writing/all-done-bug.png)


Read that screenshot for a second, because it's the best argument in this whole piece. "The agent asks the user about their business" is a sentence that sounds completely implementable right up until you try it and find out your architecture has no concept of *waiting*. No amount of re-reading the PRD catches that. No amount of staring at the prototype catches it either. Only building does.

And the fix wasn't cosmetic. It was a new capability the system didn't previously have.

## You should go again

None of these things are finished, and pretending otherwise is where this normally falls apart.

While we were building, the design changed three times. It'd be easy to call that churn and get annoyed. But the last revision had a better idea in it than anything we'd come up with: instead of a setup that either succeeds or fails, every single resource carries its own state — live, in progress, parked, unverified, deferred, left out. A broken warehouse login doesn't kill the run anymore. It parks that one thing, keeps everything else moving, and tells you plainly to come back when you've sorted it.

That's a better product than the one I wrote down. It arrived after we'd started building it. And our implementation still can't do it — we track one status for the whole run, so "the warehouse is stuck but the repo is fine" is a sentence our system can't currently say. Worth naming that out loud rather than quietly pretending we shipped it.

And the PRD? Already out of date. When we rewrote it to reflect what we'd learned, it described signup as collecting name, email, company and password in one step — the exact approach we corrected a day later.

Which is the actual point. Each of these was wrong in a different direction:

- **The doc** was wrong about *priority* — it reasoned from the evidence it had, and the evidence didn't include the people we were building for.
- **The design** was wrong about *feasibility* — it asked for something the architecture couldn't do.
- **The build** was wrong about *intent* — I read a constraint as permission to change the design, when it was a problem to fix.

Three cheap corrections instead of one expensive one. That's it. That's the loop. Nothing fundamental about product management changed here — you still write, you still argue, you still ship and find out you were wrong. The tools just got fast enough that you can go round the loop in days instead of quarters.

Not hours, though. Anyone selling you hours is counting the building and quietly leaving out the reading, the arguing, and the going round again. Those are the parts that actually cost you something, and they are also the parts doing the work.

So go round again.
