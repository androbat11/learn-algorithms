/* Valid Anagram — hashing
   Run:  npm test -- 11
   These tests are the spec. Read them when the statement is ambiguous. */

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { isAnagram } from './solution.mjs';

const CASES = [
  {
    "name": "valid anagram",
    "args": [
      "anagram",
      "nagaram"
    ],
    "expect": true
  },
  {
    "name": "not an anagram",
    "args": [
      "rat",
      "car"
    ],
    "expect": false
  },
  {
    "name": "different lengths",
    "args": [
      "a",
      "ab"
    ],
    "expect": false
  },
  {
    "name": "identical strings",
    "args": [
      "abc",
      "abc"
    ],
    "expect": true
  },
  {
    "name": "single characters",
    "args": [
      "a",
      "a"
    ],
    "expect": true
  },
  {
    "name": "repeated letters",
    "args": [
      "aacc",
      "ccac"
    ],
    "expect": false
  },
  {
    "name": "same letters, wrong counts",
    "args": [
      "aabb",
      "abbb"
    ],
    "expect": false
  }
];

test('Valid Anagram — correctness', async (t) => {
  for (const c of CASES) {
    await t.test(c.name, () => {
      const args = structuredClone(c.args);
      const returned = isAnagram(...args);
      const actual = c.mutates ? args[0] : returned;
      assert.deepEqual(actual, c.expect);
    });
  }
});
