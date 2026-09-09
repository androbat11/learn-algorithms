# 08. Majority Element

**Topic:** array · **Difficulty:** Easy · **Needs:** Lesson 3

[Canonical version](https://leetcode.com/problems/majority-element/) · Grind 75 #19.

## Problem

Return the element that appears **more than** `n/2` times. You may
assume it always exists.

The O(n) counting solution is the expected answer. If you finish early, look up
Boyer-Moore voting, which does it in O(1) space.

## Constraints

- `1 <= a.length <= 5 x 10^4`
- `-10^9 <= a[i] <= 10^9`
- `the majority element always exists`

## Complexity

**Machine-checked:** must be O(n) or O(n log n). The test runs your code at n and 2n and compares the work; a nested loop quadruples and gets rejected even though its output is right.

## Before you write any code

Fill in the contract block at the top of `solution.mjs`. All five lines, and
**Bounds must end in a verdict**, not a number — that is the gap Lesson 5 exists
to close.

<details>
<summary>The verdict for this one, once you have written your own</summary>

n = 5 x 10^4, so n^2 is 2.5 x 10^9 — too slow. Counting occurrences in a Map is one pass and O(n) space; Boyer-Moore is one pass and O(1) space.

</details>

<details>
<summary>Hint</summary>

Count occurrences in a Map, then return the key whose count exceeds `a.length / 2`. Or: keep a candidate and a counter, increment on a match and decrement otherwise — when the counter hits zero, adopt the current element.

</details>

## Run it

```bash
npm test -- 08
```

Reference solution, once you have a working one of your own:

```bash
npm run solution -- 08
```
