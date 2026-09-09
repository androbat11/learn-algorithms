/* Two Sum — hashing
   Run:  npm test -- 04
   These tests are the spec. Read them when the statement is ambiguous. */

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { twoSum } from './solution.mjs';
import { assertSubQuadratic } from '../../lib/measure.mjs';

const CASES = [
  {
    "name": "answer at the front",
    "args": [
      [
        2,
        7,
        11,
        15
      ],
      9
    ],
    "expect": [
      0,
      1
    ]
  },
  {
    "name": "answer spans the array",
    "args": [
      [
        2,
        7,
        11,
        15
      ],
      17
    ],
    "expect": [
      0,
      3
    ]
  },
  {
    "name": "answer at the back",
    "args": [
      [
        3,
        2,
        4
      ],
      6
    ],
    "expect": [
      1,
      2
    ]
  },
  {
    "name": "identical values",
    "args": [
      [
        3,
        3
      ],
      6
    ],
    "expect": [
      0,
      1
    ]
  },
  {
    "name": "negatives",
    "args": [
      [
        -3,
        4,
        3,
        90
      ],
      0
    ],
    "expect": [
      0,
      2
    ]
  },
  {
    "name": "zeroes",
    "args": [
      [
        0,
        4,
        3,
        0
      ],
      0
    ],
    "expect": [
      0,
      3
    ]
  },
  {
    "name": "long array, late answer",
    "args": [
      [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        17
      ],
      26
    ],
    "expect": [
      8,
      9
    ]
  }
];

test('Two Sum — correctness', async (t) => {
  for (const c of CASES) {
    await t.test(c.name, () => {
      const args = structuredClone(c.args);
      const returned = twoSum(...args);
      const actual = c.mutates ? args[0] : returned;
      assert.deepEqual(actual, c.expect);
    });
  }
});

test('Two Sum — complexity is O(n) or O(n log n)', () => {
  assertSubQuadratic({
    makeInput: (n) => Array.from({ length: n }, (_, i) => i),
    call: (a) => twoSum(a, 2 * a.length - 3),
  });
});
