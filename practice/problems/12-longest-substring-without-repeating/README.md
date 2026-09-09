# 12. Longest Substring Without Repeating Characters

**Topic:** sliding-window · **Difficulty:** Medium · **Needs:** Lesson 8

[Canonical version](https://leetcode.com/problems/longest-substring-without-repeating-characters/) · Grind 75 #30. The canonical sliding-window problem.

## Problem

Return the length of the longest substring of `s` containing no repeated
characters.

A **substring** is contiguous — `"abc"` is a substring of `"abcd"`, `"acd"` is
not.

## Constraints

- `0 <= s.length <= 5 x 10^4`
- `s consists of letters, digits, symbols and spaces`

## Complexity

Not machine-checked — a solution that slices out substrings works on copies, which the read-counter cannot follow. This one matters more than most: checking every substring is O(n^2) substrings before you even test one, and at n = 5 x 10^4 that is far too slow. The window must move forward and never restart.

## Before you write any code

Fill in the contract block at the top of `solution.mjs`. All five lines, and
**Bounds must end in a verdict**, not a number — that is the gap Lesson 5 exists
to close.

<details>
<summary>The verdict for this one, once you have written your own</summary>

n = 5 x 10^4 rules out checking every substring (that is O(n^2) substrings before you even test one). The window must move forward and never restart — which is the whole idea of the pattern.

</details>

<details>
<summary>Hint</summary>

A window `[left, right]` and a Map from character to its last index. Advance `right`; if the character is already inside the window, jump `left` to just past its previous position. The answer is the widest the window ever got.

</details>

## Run it

```bash
npm test -- 12
```

Reference solution, once you have a working one of your own:

```bash
npm run solution -- 12
```
