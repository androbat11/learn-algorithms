# 03. Contains Duplicate

**Topic:** hashing · **Difficulty:** Easy · **Needs:** Lesson 3

[Canonical version](https://leetcode.com/problems/contains-duplicate/) · Grind 75 #24.

## Problem

Return `true` if any value appears at least twice in the array, and
`false` if every element is distinct.

## Constraints

- `1 <= a.length <= 10^5`
- `-10^9 <= a[i] <= 10^9`

## Complexity

**Machine-checked:** must be O(n) or O(n log n). The test runs your code at n and 2n and compares the work; a nested loop quadruples and gets rejected even though its output is right.

## Before you write any code

Fill in the contract block at the top of `solution.mjs`. All five lines, and
**Bounds must end in a verdict**, not a number — that is the gap Lesson 5 exists
to close.

<details>
<summary>The verdict for this one, once you have written your own</summary>

n = 10^5, so n^2 is 10^10 — about a hundred seconds. The bound rules out the double loop before you write it, and rules out `.includes()` inside a loop, which is the same thing in disguise.

</details>

<details>
<summary>Hint</summary>

A Set answers 'have I seen this?' in O(1). One pass: if the set already has the value, you are done; otherwise add it and continue.

</details>

## Run it

```bash
npm test -- 03
```

Reference solution, once you have a working one of your own:

```bash
npm run solution -- 03
```
