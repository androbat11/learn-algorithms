# 07. Merge Sort

**Topic:** sorting · **Difficulty:** Foundational · **Needs:** Lesson 4

From the course — Lesson 4.

## Problem

Return a **new** array containing the input sorted ascending, using
merge sort. Must be O(n log n) — the test measures this, so an accidental
quadratic implementation will be caught even though its output is correct.

You will need `merge` again. Write it here; that repetition is deliberate.

## Constraints

- `0 <= a.length <= 10^5`
- `-10^9 <= a[i] <= 10^9`

## Complexity

**Machine-checked:** must be O(n log n). The test counts comparisons at n and 2n; a quadratic sort quadruples and gets rejected even though its output is sorted.

## Before you write any code

Fill in the contract block at the top of `solution.mjs`. All five lines, and
**Bounds must end in a verdict**, not a number — that is the gap Lesson 5 exists
to close.

<details>
<summary>The verdict for this one, once you have written your own</summary>

n = 10^5 makes quadratic sorting impossible (10^10) and n log n trivial (~1.7 x 10^6). This is the bound that forces the second sorting algorithm to exist.

</details>

<details>
<summary>Hint</summary>

Base case first: an array of 0 or 1 elements is already sorted, so return a copy. Otherwise split at the midpoint, sort each half recursively, and merge the two sorted halves.

</details>

## Run it

```bash
npm test -- 07
```

Reference solution, once you have a working one of your own:

```bash
npm run solution -- 07
```
