/* Majority Element — array
   Run:  npm test -- 08
   These tests are the spec. Read them when the statement is ambiguous. */

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { majorityElement } from './solution.mjs';
import { assertSubQuadratic } from '../../lib/measure.mjs';

const CASES = [
  {
    "name": "simple majority",
    "args": [
      [
        3,
        2,
        3
      ]
    ],
    "expect": 3
  },
  {
    "name": "majority at the end",
    "args": [
      [
        2,
        2,
        1,
        1,
        1,
        2,
        2
      ]
    ],
    "expect": 2
  },
  {
    "name": "single element",
    "args": [
      [
        1
      ]
    ],
    "expect": 1
  },
  {
    "name": "all identical",
    "args": [
      [
        4,
        4,
        4,
        4
      ]
    ],
    "expect": 4
  },
  {
    "name": "exactly over half",
    "args": [
      [
        1,
        2,
        1
      ]
    ],
    "expect": 1
  },
  {
    "name": "negatives",
    "args": [
      [
        -1,
        -1,
        2
      ]
    ],
    "expect": -1
  },
  {
    "name": "zero as majority",
    "args": [
      [
        0,
        0,
        0,
        5
      ]
    ],
    "expect": 0
  }
];

test('Majority Element — correctness', async (t) => {
  for (const c of CASES) {
    await t.test(c.name, () => {
      const args = structuredClone(c.args);
      const returned = majorityElement(...args);
      const actual = c.mutates ? args[0] : returned;
      assert.deepEqual(actual, c.expect);
    });
  }
});

test('Majority Element — complexity is O(n) or O(n log n)', () => {
  assertSubQuadratic({
    makeInput: (n) => Array.from({ length: n }, (_, i) => (i < n / 2 - 1 ? -(i + 1) : 7)),
    call: (a) => majorityElement(a),
  });
});
