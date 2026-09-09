# 01. Insertion Sort

**Topic:** sorting · **Difficulty:** Foundational · **Needs:** Lesson 2

From the course — Lesson 2.

## Problem

Sort the array of numbers into ascending order **in place**, using
insertion sort. Return the same array.

Insertion sort maintains a sorted prefix and grows it by one element each pass:
take the next element, walk it backwards over the sorted prefix until it is in
position.

## Constraints

- `0 <= a.length <= 5000`
- `-10^9 <= a[i] <= 10^9`

## Complexity

Deliberately not checked: insertion sort *is* O(n^2). That is the algorithm, not a bug. Problem 07 checks that merge sort beats it.

## Before you write any code

Fill in the contract block at the top of `solution.mjs`. All five lines, and
**Bounds must end in a verdict**, not a number — that is the gap Lesson 5 exists
to close.

<details>
<summary>The verdict for this one, once you have written your own</summary>

n <= 5000, so n^2 is 2.5 x 10^7 — comfortably under a second. Quadratic is allowed here, which is why this algorithm is a legitimate answer and not just a teaching toy.

</details>

<details>
<summary>Hint</summary>

Outer loop from i = 1. Save `a[i]` as the key, then shift every element greater than the key one slot right, and drop the key into the hole.

</details>

## Run it

```bash
npm test -- 01
```

Reference solution, once you have a working one of your own:

```bash
npm run solution -- 01
```
