/* Insertion Sort — sorting
   Run:  npm test -- 01
   These tests are the spec. Read them when the statement is ambiguous. */

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { insertionSort } from './solution.mjs';

const CASES = [
  {
    "name": "mixed",
    "args": [
      [
        5,
        2,
        4,
        1
      ]
    ],
    "expect": [
      1,
      2,
      4,
      5
    ],
    "mutates": true
  },
  {
    "name": "empty",
    "args": [
      []
    ],
    "expect": [],
    "mutates": true
  },
  {
    "name": "single element",
    "args": [
      [
        42
      ]
    ],
    "expect": [
      42
    ],
    "mutates": true
  },
  {
    "name": "already sorted",
    "args": [
      [
        1,
        2,
        3,
        4
      ]
    ],
    "expect": [
      1,
      2,
      3,
      4
    ],
    "mutates": true
  },
  {
    "name": "reverse sorted",
    "args": [
      [
        4,
        3,
        2,
        1
      ]
    ],
    "expect": [
      1,
      2,
      3,
      4
    ],
    "mutates": true
  },
  {
    "name": "all identical",
    "args": [
      [
        7,
        7,
        7
      ]
    ],
    "expect": [
      7,
      7,
      7
    ],
    "mutates": true
  },
  {
    "name": "negatives",
    "args": [
      [
        3,
        -1,
        0,
        -5,
        2
      ]
    ],
    "expect": [
      -5,
      -1,
      0,
      2,
      3
    ],
    "mutates": true
  },
  {
    "name": "duplicates",
    "args": [
      [
        3,
        1,
        3,
        1,
        2
      ]
    ],
    "expect": [
      1,
      1,
      2,
      3,
      3
    ],
    "mutates": true
  }
];

test('Insertion Sort — correctness', async (t) => {
  for (const c of CASES) {
    await t.test(c.name, () => {
      const args = structuredClone(c.args);
      const returned = insertionSort(...args);
      const actual = c.mutates ? args[0] : returned;
      assert.deepEqual(actual, c.expect);
    });
  }
});

test('Insertion Sort — written by hand', () => {
  const src = readFileSync(new URL('./solution.mjs', import.meta.url), 'utf8');
  assert.ok(!new RegExp("\\.sort\\s*\\(").test(src), "do not use Array.prototype.sort here \u2014 write the algorithm by hand");
});

test('insertion sort — returns the same array it was given (in place)', () => {
  const a = [3, 1, 2];
  assert.equal(insertionSort(a), a, 'return the array you were handed, not a copy');
});
