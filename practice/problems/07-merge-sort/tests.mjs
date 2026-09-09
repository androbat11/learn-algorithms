/* Merge Sort — sorting
   Run:  npm test -- 07
   These tests are the spec. Read them when the statement is ambiguous. */

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { mergeSort } from './solution.mjs';
import { assertLinearithmic } from '../../lib/measure.mjs';

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
    ]
  },
  {
    "name": "empty",
    "args": [
      []
    ],
    "expect": []
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
    ]
  },
  {
    "name": "already sorted",
    "args": [
      [
        1,
        2,
        3,
        4,
        5
      ]
    ],
    "expect": [
      1,
      2,
      3,
      4,
      5
    ]
  },
  {
    "name": "reverse sorted",
    "args": [
      [
        5,
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
      4,
      5
    ]
  },
  {
    "name": "odd length",
    "args": [
      [
        3,
        1,
        2
      ]
    ],
    "expect": [
      1,
      2,
      3
    ]
  },
  {
    "name": "all identical",
    "args": [
      [
        7,
        7,
        7,
        7
      ]
    ],
    "expect": [
      7,
      7,
      7,
      7
    ]
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
    ]
  },
  {
    "name": "duplicates",
    "args": [
      [
        4,
        2,
        4,
        1,
        2
      ]
    ],
    "expect": [
      1,
      2,
      2,
      4,
      4
    ]
  }
];

test('Merge Sort — correctness', async (t) => {
  for (const c of CASES) {
    await t.test(c.name, () => {
      const args = structuredClone(c.args);
      const returned = mergeSort(...args);
      const actual = c.mutates ? args[0] : returned;
      assert.deepEqual(actual, c.expect);
    });
  }
});

test('Merge Sort — written by hand', () => {
  const src = readFileSync(new URL('./solution.mjs', import.meta.url), 'utf8');
  assert.ok(!new RegExp("\\.sort\\s*\\(").test(src), "do not use Array.prototype.sort here \u2014 write the algorithm by hand");
});

test('Merge Sort — complexity is O(n log n)', () => {
  assertLinearithmic({
    makeValues: (n) => Array.from({ length: n }, (_, i) => (i * 7919) % n),
    call: (a) => mergeSort(a),
  });
});
