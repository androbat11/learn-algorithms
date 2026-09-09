/* Longest Substring Without Repeating Characters — sliding-window
   Run:  npm test -- 12
   These tests are the spec. Read them when the statement is ambiguous. */

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { lengthOfLongestSubstring } from './solution.mjs';

const CASES = [
  {
    "name": "abcabcbb",
    "args": [
      "abcabcbb"
    ],
    "expect": 3
  },
  {
    "name": "all identical",
    "args": [
      "bbbbb"
    ],
    "expect": 1
  },
  {
    "name": "pwwkew",
    "args": [
      "pwwkew"
    ],
    "expect": 3
  },
  {
    "name": "empty string",
    "args": [
      ""
    ],
    "expect": 0
  },
  {
    "name": "single character",
    "args": [
      "a"
    ],
    "expect": 1
  },
  {
    "name": "all distinct",
    "args": [
      "abcde"
    ],
    "expect": 5
  },
  {
    "name": "repeat far behind window",
    "args": [
      "abba"
    ],
    "expect": 2
  },
  {
    "name": "with a space",
    "args": [
      "a b a"
    ],
    "expect": 3
  },
  {
    "name": "tmmzuxt",
    "args": [
      "tmmzuxt"
    ],
    "expect": 5
  }
];

test('Longest Substring Without Repeating Characters — correctness', async (t) => {
  for (const c of CASES) {
    await t.test(c.name, () => {
      const args = structuredClone(c.args);
      const returned = lengthOfLongestSubstring(...args);
      const actual = c.mutates ? args[0] : returned;
      assert.deepEqual(actual, c.expect);
    });
  }
});
