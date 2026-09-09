/* Best Time to Buy and Sell Stock — array
   Run:  npm test -- 05
   These tests are the spec. Read them when the statement is ambiguous. */

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { maxProfit } from './solution.mjs';
import { assertSubQuadratic } from '../../lib/measure.mjs';

const CASES = [
  {
    "name": "classic",
    "args": [
      [
        7,
        1,
        5,
        3,
        6,
        4
      ]
    ],
    "expect": 5
  },
  {
    "name": "monotonically falling",
    "args": [
      [
        7,
        6,
        4,
        3,
        1
      ]
    ],
    "expect": 0
  },
  {
    "name": "single day",
    "args": [
      [
        5
      ]
    ],
    "expect": 0
  },
  {
    "name": "two days, rising",
    "args": [
      [
        1,
        5
      ]
    ],
    "expect": 4
  },
  {
    "name": "two days, falling",
    "args": [
      [
        5,
        1
      ]
    ],
    "expect": 0
  },
  {
    "name": "best is last",
    "args": [
      [
        2,
        4,
        1,
        10
      ]
    ],
    "expect": 9
  },
  {
    "name": "flat prices",
    "args": [
      [
        3,
        3,
        3
      ]
    ],
    "expect": 0
  },
  {
    "name": "dip then peak",
    "args": [
      [
        9,
        1,
        2,
        8
      ]
    ],
    "expect": 7
  }
];

test('Best Time to Buy and Sell Stock — correctness', async (t) => {
  for (const c of CASES) {
    await t.test(c.name, () => {
      const args = structuredClone(c.args);
      const returned = maxProfit(...args);
      const actual = c.mutates ? args[0] : returned;
      assert.deepEqual(actual, c.expect);
    });
  }
});

test('Best Time to Buy and Sell Stock — complexity is O(n) or O(n log n)', () => {
  assertSubQuadratic({
    makeInput: (n) => Array.from({ length: n }, (_, i) => (i * 7919) % n),
    call: (a) => maxProfit(a),
  });
});
