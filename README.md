# learn-algorithms

A self-contained teaching workspace: algorithm and data-structure fundamentals in
TypeScript, aimed at a Rust developer role. Everything needed to continue on
another machine is in this repository, including the `/teach` skill that drives
it.

**Mission:** [`MISSION.md`](MISSION.md) · **Plan:** [`reference/curriculum.html`](reference/curriculum.html)

---

## Where I am right now

Updated 2026-09-08.

| | |
|---|---|
| **Taken** | Lesson 1 — the problem contract |
| **Next** | **[Lesson 2 — Insertion Sort](lessons/0002-insertion-sort.html)** |
| **Written and waiting** | Lessons 3, 4, 5 |
| **Target** | December 2026, ~20 minutes daily |

Four lessons are written and unopened. **The backlog is the plan** — no new
lessons get written until this catches up. See
[`learning-records/0008-written-is-not-taken.md`](learning-records/0008-written-is-not-taken.md)
for why that rule exists.

### Start here

Two things, and they alternate. **Lessons** teach; **practice** makes it a skill.

```bash
cd practice && npm run next     # 12 problems, tests included, no install
```

Open [`lessons/0002-insertion-sort.html`](lessons/0002-insertion-sort.html) in a
browser. Double-clicking the file works — there is no build step, no server, and
no dependencies. Three exercises; write each function in the textarea and press
**Run tests**.

When you finish, the thing to bring back is the `countShifts` numbers for sorted
versus reversed input. That is the whole feedback loop.

---

## Resuming on another computer

```bash
git clone https://github.com/androbat11/learn-algorithms.git
cd learn-algorithms
```

Private repo — `gh auth login` or a GitHub credential is needed on the new
machine.

**To read lessons:** open any file in `lessons/` or `reference/` directly in a
browser. Static HTML, works offline, works from `file://`.

**To continue being taught:** run Claude Code in this directory and invoke the
skill.

```bash
claude
```

Then type `/teach`. The skill ships in
[`.claude/skills/teach/`](.claude/skills/teach/) inside this repo, so it is
picked up as a project skill on any machine with Claude Code installed — nothing
to configure. [`SKILL.md`](.claude/skills/teach/SKILL.md) is the prompt that
defines how the teaching works.

The skill reads `MISSION.md`, `NOTES.md`, and `learning-records/` to work out
what to teach next, so a fresh session on a new machine picks up with full
context.

### One thing that does not travel

The progress checkboxes on
[`reference/curriculum.html`](reference/curriculum.html) are stored in browser
`localStorage`, so they are per-machine and per-browser. They are a scratch
convenience, not the record. The real record is `NOTES.md` and
`learning-records/`, which are in git.

---

## Layout

| Path | What it is |
|---|---|
| `MISSION.md` | Why this exists. Grounds every teaching decision. |
| `NOTES.md` | Working notes, the lesson table, observed preferences, standing rules. |
| `RESOURCES.md` | Curated, link-checked sources. Lessons cite these rather than guessing. |
| `lessons/*.html` | The lessons. One tightly-scoped thing each, ~20–25 minutes, with live in-browser exercises. |
| `reference/*.html` | Reference cards — the compressed essence of the lessons. Built to be printed and revisited. |
| `learning-records/*.md` | What was actually learned, and decisions about the course. Numbered, append-only, like ADRs. |
| `practice/` | **Practice problems with tests.** Correctness *and* measured complexity. `cd practice && npm run next`. |
| `assets/` | Shared components: stylesheet, quiz and recall widgets, the exercise runner. |
| `lessons/deferred-rust/` | Finished Rust material, parked until the porting phase. |
| `.claude/skills/teach/` | The teaching skill itself, so the workspace is portable. |

### The reference cards

| Card | For |
|---|---|
| [Curriculum](reference/curriculum.html) | The full plan, tiered, with mastery criteria and the honest time budget |
| [Complexity](reference/complexity.html) | Shape → Big-O, and bound → verdict. The one to print |
| [Sorting](reference/sorting.html) | Every sort built so far, with invariants and complexities |
| [Patterns](reference/patterns.html) | Pattern families and the tell for each |
| [The Problem Contract](reference/problem-contract.html) | Given, Goal, Bounds, Trace, Breaks |

---

## Practice

[`practice/`](practice/README.md) holds 12 problems — 9 from
[Grind 75](https://www.techinterviewhandbook.org/grind75/) in its own order, 3
from the course. Zero dependencies; Node 18+ and nothing else.

What makes it more than a stub folder: **8 of the 12 assert complexity by
measurement.** The test runs your solution at n and at 2n and compares the work,
so a correct-but-quadratic answer is rejected with an explanation rather than
silently accepted. Every problem's stub also opens with the five-line contract
block, which puts Lesson 1 on every rep.

`npm run drill` is the one to build a habit around: it takes a problem you
already solved, files your solution away, and hands back an empty stub.

## How the exercises work

`assets/exercise.js` is a dependency-free runner. Each exercise declares a
function name and a set of test cases; you write the function, press Run, and get
per-case pass/fail immediately. It compares the return value, or the mutated
first argument when the function returns `undefined`, so in-place and returning
implementations both pass. If you paste TypeScript, it strips the type
annotations and runs the logic.

Every reference solution in this repository is executed against its own test
cases before release — 86 assertions across the four lessons, all passing as of
2026-09-08.

## Design principles

Set out in full in [`SKILL.md`](.claude/skills/teach/SKILL.md). The two that
shape these lessons most:

- **Generation over recognition.** Exercises start from a blank or near-blank
  file. Recognising a correct solution is the illusion of competence this course
  is built to defeat — see
  [Bjork & Bjork on desirable difficulties](https://www.unh.edu/teaching-learning-resource-hub/sites/default/files/media/2023-06/itow-introducing-desirable-difficulties-into-practice-and-instruction-bjork-and-bjork.pdf).
- **Measure, do not assert.** The third exercise in a lesson usually instruments
  the algorithm to verify a claim the lesson made, so the numbers are ones you
  produced rather than ones you were told.
