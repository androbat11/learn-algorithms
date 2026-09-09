# 02. Binary Search

**Topic:** binary-search · **Difficulty:** Easy · **Needs:** nothing — you already have this

[Canonical version](https://leetcode.com/problems/binary-search/) · Grind 75 #8.

## Problem

Given a **sorted** array of distinct integers and a target, return the
index of the target, or `-1` if it is not present.

Must run in O(log n).

## Constraints

- `1 <= a.length <= 10^4`
- `-10^4 < a[i], target < 10^4`
- `a is sorted ascending, all values distinct`

## Complexity

**Machine-checked:** must be O(log n). The test runs your code at n and 2n; halving the search space should add about one comparison, so a scan gets rejected.

## Before you write any code

Fill in the contract block at the top of `solution.mjs`. All five lines, and
**Bounds must end in a verdict**, not a number — that is the gap Lesson 5 exists
to close.

<details>
<summary>The verdict for this one, once you have written your own</summary>

The O(log n) requirement is stated outright, so the bound is not the interesting part here — the off-by-one is. At n = 10^4 you get about 14 comparisons.

</details>

<details>
<summary>Hint</summary>

Two indices, `lo` and `hi`, both inclusive. Loop while `lo <= hi`. Compare the midpoint, then move `lo = mid + 1` or `hi = mid - 1` — never leave the midpoint inside the range, or you will loop forever.

</details>

## Run it

```bash
npm test -- 02
```

Reference solution, once you have a working one of your own:

```bash
npm run solution -- 02
```
