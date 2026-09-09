/* Contains Duplicate — hashing
   Run:  npm test -- 03
   These tests are the spec. Read them when the statement is ambiguous. */

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { containsDuplicate } from './solution.mjs';
import { assertSubQuadratic } from '../../lib/measure.mjs';

const CASES = [
  {
    "name": "duplicate present",
    "args": [
      [
        1,
        2,
        3,
        1
      ]
    ],
    "expect": true
  },
  {
    "name": "all distinct",
    "args": [
      [
        1,
        2,
        3,
        4
      ]
    ],
    "expect": false
  },
  {
    "name": "many duplicates",
    "args": [
      [
        1,
        1,
        1,
        3,
        3,
        4,
        3,
        2,
        4,
        2
      ]
    ],
    "expect": true
  },
  {
    "name": "single element",
    "args": [
      [
        1
      ]
    ],
    "expect": false
  },
  {
    "name": "adjacent duplicates",
    "args": [
      [
        5,
        5
      ]
    ],
    "expect": true
  },
  {
    "name": "negatives and zero",
    "args": [
      [
        -1,
        0,
        1,
        -1
      ]
    ],
    "expect": true
  },
  {
    "name": "distinct negatives",
    "args": [
      [
        -3,
        -2,
        -1,
        0
      ]
    ],
    "expect": false
  }
];

test('Contains Duplicate — correctness', async (t) => {
  for (const c of CASES) {
    await t.test(c.name, () => {
      const args = structuredClone(c.args);
      const returned = containsDuplicate(...args);
      const actual = c.mutates ? args[0] : returned;
      assert.deepEqual(actual, c.expect);
    });
  }
});

test('Contains Duplicate — complexity is O(n) or O(n log n)', () => {
  assertSubQuadratic({
    makeInput: (n) => Array.from({ length: n }, (_, i) => i),
    call: (a) => containsDuplicate(a),
  });
});
