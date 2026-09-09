# 06. Merge Two Sorted Arrays

**Topic:** sorting · **Difficulty:** Foundational · **Needs:** Lesson 4

From the course — Lesson 4. The engine of merge sort.

## Problem

Given two arrays that are **each already sorted** ascending, return one
new sorted array containing every element of both. Do not modify the inputs.

## Constraints

- `0 <= left.length, right.length <= 10^5`
- `both inputs are sorted ascending`
- `duplicates are allowed`

## Complexity

**Machine-checked:** must be O(n log n). The test counts comparisons at n and 2n; a quadratic sort quadruples and gets rejected even though its output is sorted.

## Before you write any code

Fill in the contract block at the top of `solution.mjs`. All five lines, and
**Bounds must end in a verdict**, not a number — that is the gap Lesson 5 exists
to close.

<details>
<summary>The verdict for this one, once you have written your own</summary>

Both inputs are already sorted, so concatenating and re-sorting at O(n log n) throws away information you were handed. Merging is O(n + m), and it is the whole reason merge sort works.

</details>

<details>
<summary>Hint</summary>

One index into each array. While both still have elements, take the smaller and advance only that index. Then append whatever remains of the other.

</details>

## Run it

```bash
npm test -- 06
```

Reference solution, once you have a working one of your own:

```bash
npm run solution -- 06
```
