# 11. Valid Anagram

**Topic:** hashing · **Difficulty:** Easy · **Needs:** Lesson 3

[Canonical version](https://leetcode.com/problems/valid-anagram/) · Grind 75 #7.

## Problem

Return `true` if `t` is an anagram of `s` — the same characters, the
same number of times, in any order.

## Constraints

- `1 <= s.length, t.length <= 5 x 10^4`
- `s and t consist of lowercase English letters`

## Complexity

Not machine-checked, and the reason is worth knowing: the counting solution's first move is to build a Map from the input, so everything after that happens somewhere the read-counter cannot see. An `indexOf` inside a loop over `s` is O(n^2) here and the tests will not catch it. You have to catch it.

## Before you write any code

Fill in the contract block at the top of `solution.mjs`. All five lines, and
**Bounds must end in a verdict**, not a number — that is the gap Lesson 5 exists
to close.

<details>
<summary>The verdict for this one, once you have written your own</summary>

n = 5 x 10^4. Sorting both strings is O(n log n) and passes; counting characters is O(n) and also gives you the early exit on unequal lengths. Both are acceptable — say which you chose and why.

</details>

<details>
<summary>Hint</summary>

Different lengths mean no. Otherwise count each character of `s` in a Map, then decrement while walking `t`; if a count goes negative or a character is missing, the answer is no.

</details>

## Run it

```bash
npm test -- 11
```

Reference solution, once you have a working one of your own:

```bash
npm run solution -- 11
```
