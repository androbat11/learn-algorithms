# Written is not taken: four lessons were delivered to nobody

On 2026-09-08 Manuel asked *"But what about the lesson 2, I haven't take it."*
He has worked through **Lesson 1 only**. Lessons 2, 3, 4 and 5 are written,
tested, and unopened.

This is a bookkeeping failure with real teaching consequences, not a filing
problem. `NOTES.md` carried a single **Status** column, and `✅ 3 exercises`
meant *"I wrote three exercises"* while reading as *"he completed three
exercises."* Nothing in the workspace distinguished my output from his. Five
sessions of writing compounded on that ambiguity.

**What it corrupted**

- `reference/curriculum.html` told him sorting and hashing were `done`, in
  green, for lessons he had never opened. That card is the progress dashboard —
  it was lying to the learner about the learner.
- Lesson 4 opened with a retrieval check on *"the zero you measured in Exercise
  3"* of Lesson 2. He had measured nothing. Lesson 5 then built on Lesson 4's
  merge-sort numbers the same way. Two lessons rest on evidence he never
  generated, which would have read as gaslighting rather than as spacing.
- Lesson 5's Part Three grades the Bounds gap from
  [[0006-first-contract-returned]] — genuinely his next gap, but four lessons
  ahead of where he actually is.
- Every rep chased in chat (LR-0006's process rule, *"always chase the rep"*)
  was chasing work from lessons he had not read.

**The correction, already applied**

- `NOTES.md` now has two columns, **Written** and **Taken**, and only Taken is
  evidence. The Taken column is the one that steers the zone of proximal
  development; Written steers nothing.
- Curriculum tags for unopened lessons changed from `done` (green) to `ready`
  (neutral). Only Lesson 1 is green.
- **Standing rule: no new lessons until Taken catches up to Written.** There are
  four in the backlog. Writing a fifth was production mistaken for progress.

**Implications for how to read this workspace**

1. A written lesson is inventory, not instruction. The unit of teaching is a
   lesson *taken*, and the only proof is a number or an artefact he returns that
   he could not have produced otherwise — hence the `countShifts` check now
   recorded in `NOTES.md`.
2. **Never infer completion from delivery, and never infer it from a tick.**
   `assets/progress.js` writes to localStorage, so his tick state does not
   travel between machines and was never evidence either. LR-0007 already said
   "verify against work he actually returns"; that instruction was correct and I
   did not follow it.
3. The `assets/exercise.js` mechanism — each lesson opening with the previous
   lesson's rep as a graded exercise — is still the right design. It failed here
   for an unrelated reason: an unopened lesson collects nothing.
4. Volume of material is not the constraint on this mission. **Attendance is.**
   Four unopened lessons at roughly 22 minutes each is more than an hour of
   prepared teaching sitting idle against a 20-minute daily budget. Any future
   impulse to widen scope or write ahead should be checked against this record
   first.
