/* Valid Palindrome — two-pointers
   Run:  npm test -- 10
   These tests are the spec. Read them when the statement is ambiguous. */

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { isPalindrome } from './solution.mjs';

const CASES = [
  {
    "name": "classic with punctuation",
    "args": [
      "A man, a plan, a canal: Panama"
    ],
    "expect": true
  },
  {
    "name": "not a palindrome",
    "args": [
      "race a car"
    ],
    "expect": false
  },
  {
    "name": "only punctuation",
    "args": [
      " "
    ],
    "expect": true
  },
  {
    "name": "single character",
    "args": [
      "a"
    ],
    "expect": true
  },
  {
    "name": "mixed case",
    "args": [
      "Aa"
    ],
    "expect": true
  },
  {
    "name": "digits included",
    "args": [
      "ab1ba"
    ],
    "expect": true
  },
  {
    "name": "digits mismatched",
    "args": [
      "ab1cba"
    ],
    "expect": false
  },
  {
    "name": "two different characters",
    "args": [
      "ab"
    ],
    "expect": false
  },
  {
    "name": "alphanumeric mix",
    "args": [
      "0P"
    ],
    "expect": false
  }
];

test('Valid Palindrome — correctness', async (t) => {
  for (const c of CASES) {
    await t.test(c.name, () => {
      const args = structuredClone(c.args);
      const returned = isPalindrome(...args);
      const actual = c.mutates ? args[0] : returned;
      assert.deepEqual(actual, c.expect);
    });
  }
});
