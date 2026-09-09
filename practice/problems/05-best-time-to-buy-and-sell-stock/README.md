# 05. Best Time to Buy and Sell Stock

**Topic:** array · **Difficulty:** Easy · **Needs:** Lesson 3

[Canonical version](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) · Grind 75 #4.

## Problem

`prices[i]` is the price of a stock on day `i`. Buy on one day and sell
on a **later** day. Return the maximum profit, or `0` if no profit is possible.

## Constraints

- `1 <= prices.length <= 10^5`
- `0 <= prices[i] <= 10^4`

## Complexity

**Machine-checked:** must be O(n) or O(n log n). The test runs your code at n and 2n and compares the work; a nested loop quadruples and gets rejected even though its output is right.

## Before you write any code

Fill in the contract block at the top of `solution.mjs`. All five lines, and
**Bounds must end in a verdict**, not a number — that is the gap Lesson 5 exists
to close.

<details>
<summary>The verdict for this one, once you have written your own</summary>

n = 10^5 rules out comparing every pair (10^10). One pass only — which forces the real insight: at each day you only need the cheapest price seen so far.

</details>

<details>
<summary>Hint</summary>

Track two things as you sweep left to right: the lowest price so far, and the best profit so far. Today's best sale is `price - lowestSoFar`.

</details>

## Run it

```bash
npm test -- 05
```

Reference solution, once you have a working one of your own:

```bash
npm run solution -- 05
```
