# 10. Valid Palindrome

**Topic:** two-pointers · **Difficulty:** Easy · **Needs:** Lesson 7

[Canonical version](https://leetcode.com/problems/valid-palindrome/) · Grind 75 #5.

## Problem

Return `true` if the string is a palindrome, considering only
alphanumeric characters and ignoring case.

An empty string, once filtered, counts as a palindrome.

## Constraints

- `1 <= s.length <= 2 x 10^5`
- `s consists of printable ASCII`

## Complexity

Not machine-checked. The two-pointer version and the filter-then-reverse version are both O(n); the difference is O(1) vs O(n) *space*, which this harness cannot see. State which resource you optimised and why — that is the interview answer.

## Before you write any code

Fill in the contract block at the top of `solution.mjs`. All five lines, and
**Bounds must end in a verdict**, not a number — that is the gap Lesson 5 exists
to close.

<details>
<summary>The verdict for this one, once you have written your own</summary>

n = 2 x 10^5. Building a filtered copy is O(n) and fine; the reason to prefer two pointers is O(1) space, not speed. Say which resource you are optimising.

</details>

<details>
<summary>Hint</summary>

Two pointers from both ends. Skip anything non-alphanumeric on either side, then compare lowercased. Stop when they meet.

</details>

## Run it

```bash
npm test -- 10
```

Reference solution, once you have a working one of your own:

```bash
npm run solution -- 10
```
