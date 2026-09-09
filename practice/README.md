# Practice

Twelve problems with tests that check **correctness and complexity**. No
dependencies, no install, no network — Node 18+ and nothing else.

The lessons in [`../lessons/`](../lessons/) teach; this is where it becomes a
skill. The plan always said roughly two thirds of your sessions should be
practice, and this is that two thirds.

```bash
cd practice
npm run next          # what to do now
```

## The commands

| | |
|---|---|
| `npm run next` | The next problem, with the three paths you need |
| `npm run list` | The whole ladder, and what you have started |
| `npm test` | Run every problem you have started |
| `npm test -- 04` | Run one problem — id, slug fragment, or title fragment |
| `npm test -- --all` | Run everything, untouched stubs included |
| `npm run drill` | **Cold re-solve** of something you already solved |
| `npm run reset -- 04` | Back to the stub, your attempt archived |
| `npm run solution -- 04` | The reference solution, after you have attempted it |

Your attempts are never deleted. `reset` and `drill` copy the current file into
`.attempts/` first.

## How a problem works

Each problem is a directory:

```
problems/04-two-sum/
  README.md        the problem, the constraints, a hint behind a fold
  solution.mjs     ← you write here
  tests.mjs        the spec. Read it when the statement is ambiguous
  template.mjs     the pristine stub, for reset
```

`solution.mjs` opens with a contract block to fill in before you write code:

```js
 *   Given:
 *   Goal:
 *   Bounds:            <- convert the numbers into a VERDICT:
 *                         which complexities are allowed here?
 *   Trace:             <- one concrete input AND its output
 *   Breaks:
```

That is Lesson 1 made unavoidable, on every single rep. **Bounds must end in a
verdict, not a number** — that is the one gap left in the contract you sent me,
and the reason it is a comment rather than a checkbox is that nothing can grade
it but you.

## The complexity tests

This is the part you will not find in a LeetCode clone. Eight of the twelve
problems assert complexity, and they do it by measurement rather than by reading
your code.

The method is Lesson 5's claim taken literally — *Big-O answers exactly one
question: what happens when n doubles?* So the test runs your solution at `n`
and at `2n` and compares the work:

| Growth | What it means |
|---|---|
| ~1x | O(1) or O(log n) |
| ~2x | O(n) |
| ~2.2x | O(n log n) |
| ~4x | **O(n²) — rejected** |

A correct-but-quadratic solution therefore fails, and the message says so
plainly rather than pretending the answer was wrong:

```
Too slow. Doubling the input multiplied the work by 4.01x
(159600 reads at n=400, 639200 at n=800).
  A linear pass roughly doubles (~2x). A nested loop roughly quadruples
  (~4x), which is what this looks like.
  The answer is correct — it is the complexity that fails.
```

Two ways of counting, because one is not enough:

- **Index reads.** The input array is wrapped in a `Proxy` that counts reads.
  Used for searching, scanning, and pair-finding — anything whose natural
  solution keeps reading the input.
- **Comparisons.** The array is filled with boxes whose `valueOf` increments a
  counter. Used for sorting, because a sort that starts with `a.slice()` does
  its work on a copy, where read counting is blind — but the boxes travel into
  the copy, so comparisons are still counted.

### What is *not* checked, and why

Problems **01, 10, 11, 12** have no complexity assertion, and each one says so
in its README. Being straight about this matters more than the feature does:

- **01 Insertion Sort** — it *is* O(n²). That is the algorithm, not a bug.
  Problem 07 checks that merge sort beats it.
- **10, 11, 12** are string problems, and their natural first move is to build a
  filtered string or a frequency Map. Everything after that happens on a copy,
  which neither counter can follow. Time budgets were tried instead and
  **failed honestly**: a quadratic palindrome and a quadratic anagram both
  finished inside the budget, so the check would have passed code it should have
  rejected. A check that can be fooled is worse than no check, so it was
  removed.

On those four, complexity is on you. Problem 12 is the one to watch — checking
every substring is O(n²) substrings before you even test one, and nothing here
will stop you.

### A few problems also forbid the shortcut

`01`, `02`, `06`, `07` and `09` read your source and reject
`.sort()`, `.indexOf()`, `.includes()`, `.filter()` or `.splice()` where the
point of the exercise is to write the thing by hand. The failure message names
which one you used.

## The ladder

Ordered by what each problem needs, not by difficulty. `needs` is advice, not a
lock — nothing is gated, and skipping ahead is your call.

| # | Problem | Topic | Complexity check | Needs |
|---|---|---|---|---|
| 01 | Insertion Sort | sorting | — (it is O(n²)) | Lesson 2 |
| 02 | Binary Search | binary-search | O(log n) | — |
| 03 | Contains Duplicate | hashing | O(n) / O(n log n) | Lesson 3 |
| 04 | Two Sum | hashing | O(n) / O(n log n) | Lesson 3 |
| 05 | Best Time to Buy and Sell Stock | array | O(n) / O(n log n) | Lesson 3 |
| 06 | Merge Two Sorted Arrays | sorting | O(n log n) comparisons | Lesson 4 |
| 07 | Merge Sort | sorting | O(n log n) comparisons | Lesson 4 |
| 08 | Majority Element | array | O(n) / O(n log n) | Lesson 3 |
| 09 | Move Zeroes | two-pointers | O(n) / O(n log n) | Lesson 7 |
| 10 | Valid Palindrome | two-pointers | — | Lesson 7 |
| 11 | Valid Anagram | hashing | — | Lesson 3 |
| 12 | Longest Substring Without Repeating | sliding-window | — | Lesson 8 |

Nine come from [Grind 75](https://www.techinterviewhandbook.org/grind75/), in
its own recommended order, with each problem's README linking the canonical
version. Three (01, 06, 07) come from the course itself. Statements are written
here rather than copied, because reading constraints is the skill and the
constraints are the interesting half.

## Why `drill` is the important command

Solving twelve problems once produces the feeling of competence. Solving one of
them again, cold, three weeks later, produces the thing itself.

`npm run drill` picks a problem you have already got passing, files your working
solution away, and hands you back an empty stub. It is meant to be mildly
annoying — see
[Bjork & Bjork on desirable difficulties](https://www.unh.edu/teaching-learning-resource-hub/sites/default/files/media/2023-06/itow-introducing-desirable-difficulties-into-practice-and-instruction-bjork-and-bjork.pdf),
which is why the whole course is built around generating from a blank page
rather than recognising a correct answer.

A reasonable rhythm against 20 minutes a day: one new problem, then `drill`
every third session.

## Adding more problems

The set is generated from one data file so the twelve stay consistent. To add a
thirteenth, ask in a `/teach` session — the generator lives outside this
directory and knows the format, the complexity-check wiring, and the
verification pass (every reference solution is run against its own tests, and
every stub is confirmed to fail, before anything ships).

## Related

- [`../reference/complexity.html`](../reference/complexity.html) — shape → Big-O, and bound → verdict
- [`../reference/problem-contract.html`](../reference/problem-contract.html) — the five lines
- [`../reference/curriculum.html`](../reference/curriculum.html) — the full plan
- [`../lessons/`](../lessons/) — the lessons these problems practise
