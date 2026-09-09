# 09. Move Zeroes

**Topic:** two-pointers · **Difficulty:** Easy · **Needs:** Lesson 7

[Canonical version](https://leetcode.com/problems/move-zeroes/) · A standard two-pointer warm-up; not in Grind 75, but the cleanest introduction to the pattern.

## Problem

Move every `0` to the end of the array **in place**, keeping the relative
order of the non-zero elements. Return the same array.

Do not build a new array.

## Constraints

- `1 <= a.length <= 10^4`
- `-2^31 <= a[i] <= 2^31 - 1`

## Complexity

**Machine-checked:** must be O(n) or O(n log n). The test runs your code at n and 2n and compares the work; a nested loop quadruples and gets rejected even though its output is right.

## Before you write any code

Fill in the contract block at the top of `solution.mjs`. All five lines, and
**Bounds must end in a verdict**, not a number — that is the gap Lesson 5 exists
to close.

<details>
<summary>The verdict for this one, once you have written your own</summary>

n = 10^4 permits quadratic (10^8, borderline), so the bound is not what rules out the naive repeated-splice approach — the in-place requirement is. Read constraints and requirements as one thing.

</details>

<details>
<summary>Hint</summary>

A write pointer and a read pointer, both starting at 0. Sweep with the read pointer; every time you see a non-zero, write it at the write pointer and advance it. Then fill the tail with zeroes.

</details>

## Run it

```bash
npm test -- 09
```

Reference solution, once you have a working one of your own:

```bash
npm run solution -- 09
```
