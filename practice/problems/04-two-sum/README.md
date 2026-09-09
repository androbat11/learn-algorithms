# 04. Two Sum

**Topic:** hashing · **Difficulty:** Easy · **Needs:** Lesson 3

[Canonical version](https://leetcode.com/problems/two-sum/) · Grind 75 #1. The problem you wrote your first contract for.

## Problem

Given an array of integers and a target, return the **indices** of the
two numbers that add up to the target.

Exactly one solution exists, and you may not use the same element twice. Return
the indices in ascending order.

## Constraints

- `2 <= a.length <= 10^4`
- `-10^9 <= a[i], target <= 10^9`
- `exactly one valid answer exists`

## Complexity

**Machine-checked:** must be O(n) or O(n log n). The test runs your code at n and 2n and compares the work; a nested loop quadruples and gets rejected even though its output is right.

## Before you write any code

Fill in the contract block at the top of `solution.mjs`. All five lines, and
**Bounds must end in a verdict**, not a number — that is the gap Lesson 5 exists
to close.

<details>
<summary>The verdict for this one, once you have written your own</summary>

n = 10^4, so n^2 is 10^8 — right on the edge of a second. Tighter than the version in your contract (n <= 1000, where quadratic was fine). Same problem, different verdict, because the bound changed.

</details>

<details>
<summary>Hint</summary>

For each element, the value you need is `target - a[i]`. A Map from value to index lets you ask whether you have already seen it. Check before inserting, or an element will pair with itself.

</details>

## Run it

```bash
npm test -- 04
```

Reference solution, once you have a working one of your own:

```bash
npm run solution -- 04
```
