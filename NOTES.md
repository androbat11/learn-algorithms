# Working Notes

## Baseline (verified 2026-09-07)

- **Goal:** Rust developer job, ~December 2026.
- **Rust level:** rustlings exercise 46, on `hashmaps3`. Section 11 of 23.
  No generics, traits, lifetimes, iterators, or smart pointers yet.
- **Algorithms:** has binary search, bubble sort, partial linked list. Has never
  written insertion sort, merge sort, a binary tree, or a doubly linked list.
- **Also:** freezes at a blank editor. Both deficits are real — see LR-0001 and
  LR-0003.
- **Cadence:** daily, ~20 minutes.
- **Professional:** 225 commits in the ProDoctivity monorepo.

## Scope — set by Manuel, do not widen without asking

Insertion sort · merge sort · binary tree · doubly linked list · patterns.

> *"That is everything I need right now. The fundamentals on that topic."*

## Planned sequence — TypeScript

Full curriculum with mastery criteria: `reference/curriculum.html`. That document
is canonical; this table is just the lesson mapping.

**Two columns, and never one.** *Written* is my output. *Taken* is his. Only
Taken is evidence of anything. Conflating them is LR-0008 — the single worst
bookkeeping error in this workspace so far.

| # | Lesson | Tier | Written | Taken |
|---|---|---|---|---|
| 1 | The problem contract | 0 | ✅ | ✅ contract returned |
| 2 | Insertion sort — the loop invariant | 1 | ✅ 3 exercises | ⬜ **he is here** |
| 3 | From contract to code — Two Sum &amp; hashing | 1 | ✅ 3 exercises | ⬜ |
| 4 | Merge sort — divide and conquer | 1 | ✅ 3 exercises | ⬜ |
| 5 | Complexity — reading Big-O off the code | 0 | ✅ 3 exercises | ⬜ |
| 6 | Arrays &amp; strings — the cost of every built-in | 0 | | ⬜ |
| 7 | Two pointers | 1 | | ⬜ |
| 8 | Sliding window | 1 | | ⬜ |
| 9 | Binary search — arrays and answer spaces | 1 | | ⬜ |
| 10 | Stack — matching and monotonic | 1 | | ⬜ |
| 11 | Queue — and the engine of BFS | 1 | | ⬜ |
| 12 | Linked lists — singly, and pointer discipline | 1 | | ⬜ |
| 13 | Doubly linked lists — insert and delete | 1 | | ⬜ |
| 14 | Binary trees — building and traversing | 1 | | ⬜ |
| 15 | Binary search trees | 1 | | ⬜ |
| 16 | Heaps and top-k | 1 | | ⬜ |
| 17 | Graphs — representation, DFS, BFS | 2 | | ⬜ |
| 18 | Backtracking | 2 | | ⬜ |
| 19 | Intervals | 2 | | ⬜ |
| 20 | 1-D dynamic programming | 2 | | ⬜ |
| — | Tier 3 deferred: 2-D DP, tries, advanced graphs, greedy, bits | 3 | | ⬜ |
| — | **Phase 2: port to Rust** — LR-0003 constraints apply | | | ⬜ |

Twenty lessons against a 60–85 session budget leaves roughly two thirds of
sessions for practice problems, which is the right ratio. Do not add lessons
without removing something.

**Standing rule as of 2026-09-08: stop writing lessons.** Four written lessons
are unopened. Writing a fifth was production without delivery. The next session
teaches from the backlog — Lesson 2 — and no new lesson gets written until Taken
catches up to Written.

Parked: `lessons/deferred-rust/insertion-sort-rust.html` — finished and tested,
for the porting phase.

## Teaching implications

- Two real deficits, not one. Implementation gap (never built these) *and*
  retrieval/process gap (freezes). Lessons should close both at once: implement
  from a blank file, which is generation, which serves both.
- **He asked for exercises and to be taught the algorithms.** Every lesson from
  2 onward carries live in-browser exercises via `assets/exercise.js` — write a
  function, press Run, see pass/fail per case. Explanation alone is not enough.
- **Ladder the exercises.** Lesson 2's shape worked: build the primitive first
  (`insertOne`), then the whole algorithm, then instrument it to measure a claim
  the lesson made. The third kind is the best — it replaces trust with evidence.
- Keep noting where a structure will be hard in Rust later, as a sidenote only.
  Useful foreshadowing, but it is not the current lesson.
- Open each lesson with a retrieval check on the previous one. Daily cadence
  makes this cheap and it is the main spacing mechanism available.
- Keep to ~20 minutes. Roughly 900–1400 words plus one drill.

## Preferences observed

- **Prefers decisions made and executed** over being asked to choose. He handed
  back both the language and scope questions with *"let's just keep the plan you
  suggested."* Recommend, then proceed.
- **But he does course-correct, clearly, and he means it.** He reversed the Rust
  sequencing the next turn. When he states a preference plainly, take it as
  settled and stop arguing — the case was already made and heard.
- Wants to be **taught**, not only coached on process: *"I need you to teach me
  the algorithms to[o]."* Lesson 1 was pure method; that was right for one
  lesson, not for the course.

## Practice harness — added 2026-09-09

He asked for *"a repository of exercises with test so I can also practice
everything, since right now there's lot of theory and I also need practice."*
That is `practice/` — 12 problems, zero dependencies, `node:test`.

**This does not violate the no-new-lessons rule.** The rule is about lessons.
The curriculum always budgeted two thirds of sessions for practice and there was
nowhere to do it, so the backlog was theory-only by construction. His instinct
was right and it was a real gap in the workspace.

**The distinctive feature is measured complexity.** 8 of 12 problems run the
solution at n and 2n and compare the work, rejecting a correct-but-quadratic
answer. Two counters: index reads via `Proxy` (search/scan/pairs) and
comparisons via `valueOf` boxes (sorts, which copy the array and defeat read
counting).

**Four problems have no complexity check and say so** — 01 is inherently O(n²);
10, 11 and 12 are string problems whose solutions build a filtered copy that
neither counter can follow. Time budgets were tried and *demonstrably failed* — a
quadratic palindrome and a quadratic anagram both came in under budget. Removed
rather than shipped. Do not re-add a check here without proving it rejects a
slow-but-correct solution first.

**Verification protocol, apply it to any new problem.** Every reference solution
must pass its own tests; every stub must fail; every machine-checked problem must
reject a slow-but-correct implementation. That last one caught four real bugs
during the build — a double-escaped regex, a too-kind perf input on 12, a
read-counter blind to 06's copy, and an input on 08 that let the naive solution
short-circuit on the first element.

The generator is not in the repo (it lives in session scratch). To add problems,
regenerate from the same data shape — the format is documented in
`practice/README.md`.

## The workspace is a git repo

`~/learn-algorithms` is a git repository, pushed to
**https://github.com/androbat11/learn-algorithms** (private, `main`). He set it
up on 2026-09-08 so he can continue from another computer.

- `.claude/skills/teach/` is committed *inside* the repo, so a clone is
  self-contained and `/teach` works on any machine with Claude Code.
- **Commit at the end of every session.** The learning records and `NOTES.md` are
  the only durable state; if they are not pushed, the next machine starts blind.
- His curriculum tick state is `localStorage` and does *not* travel. It was never
  evidence anyway — see [[0008-written-is-not-taken]].

## Standing process rule

**Always chase the rep.** Each lesson ends with work to bring back; if the next
message does not contain it, ask before teaching anything new. He returned his
first contract only after pointing out that I had never asked — the feedback loop
is the product here, and it does not close by itself.

## Outstanding reps

**There is exactly one rep outstanding: Lesson 2.** Everything else is
downstream of it and should not be mentioned until it lands.

The reps embedded in Lessons 3, 4 and 5 are not owed, because he has not taken
those lessons. Do not chase them. Specifically, stop asking for the repaired Two
Sum contract — asked twice already, and Lesson 3 grades it for him anyway when he
gets there.

**Why chasing in chat kept failing.** The rep lived in a message, and messages
scroll away. Every lesson now collects the previous lesson's rep as its opening
in-browser exercise — Lesson 5 opens with `merge` from a blank textarea, which is
the Lesson 4 rep, graded automatically. That mechanism is right and should stay.
It just cannot help when the lessons themselves go unopened, which was the real
failure (LR-0008).

**What to check next session:** did he run Lesson 2's three exercises? Ask for
the `countShifts` numbers specifically — sorted vs reversed input. That is a
number he cannot produce without having done the work, which makes it the
cheapest honest completion check available.

## Open questions

1. Mock interviews / community — wants them or not? Matters more than usual,
   since freezing only appears under observation.
2. What kind of Rust roles? Systems, backend, blockchain, embedded — the loops
   differ enough to matter.
3. Pace through rustlings? Relevant again at the porting phase, not before.
