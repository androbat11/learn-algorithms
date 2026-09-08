# Scope widened: from five topics to the full foundational curriculum

On 2026-09-07 Manuel asked for *"a plan of the most basic algorithms and data
structures that someone must master in order to be able to pass the actual
interview and have good fundaments in those topics."* That supersedes the
narrower five-item scope he set earlier the same day (LR-0005 era), and he
flagged it as important.

**What this changes.** The teaching target is no longer "these five things"; it
is coverage of the standard interview foundation, ordered by dependency and cut
against a real time budget. Written up as
[`reference/curriculum.html`](../reference/curriculum.html) with per-topic
mastery criteria.

**The honest constraint, stated in the plan.** 85 sessions if he works daily to
1 December, 60 on weekdays only — 20 to 28 hours. That funds Tiers 0–2. It does
not fund Tier 3 as well, so Tier 3 is marked as *consciously deferred* rather
than quietly omitted. Every curriculum that promises full coverage in this budget
is lying, and saying so is more useful than another topic list.

**Nothing was dropped.** His original five all sit inside Tiers 0–2. The widening
adds structure around them rather than replacing them.

**Design notes for future sessions**

- Mastery is defined as *"can do from a blank file"*, never *"has read about"*.
  This is deliberate given LR-0001: he recognises solutions comfortably and that
  recognition is the illusion the whole course is fighting.
- The plan carries a **practice protocol**, not just a topic list — lesson, then
  a problem the next day, then a second, then a cold re-solve two weeks later.
  Spacing is the part learners skip and it is where the durability comes from.
- Problem selection is delegated to Grind 75 rather than chosen by me. Curation
  is solved and his hours are better spent solving than selecting.
- `reference/curriculum.html` is a live checklist backed by `assets/progress.js`
  (localStorage). Treat his tick state as a signal of self-assessed progress, but
  verify against work he actually returns.
