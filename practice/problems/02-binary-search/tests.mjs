/* Binary Search — binary-search
   Run:  npm test -- 02
   These tests are the spec. Read them when the statement is ambiguous. */

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { search } from './solution.mjs';
import { assertLogarithmic } from '../../lib/measure.mjs';

const CASES = [
  {
    "name": "found in middle",
    "args": [
      [
        -1,
        0,
        3,
        5,
        9,
        12
      ],
      9
    ],
    "expect": 4
  },
  {
    "name": "not present",
    "args": [
      [
        -1,
        0,
        3,
        5,
        9,
        12
      ],
      2
    ],
    "expect": -1
  },
  {
    "name": "first element",
    "args": [
      [
        1,
        2,
        3,
        4,
        5
      ],
      1
    ],
    "expect": 0
  },
  {
    "name": "last element",
    "args": [
      [
        1,
        2,
        3,
        4,
        5
      ],
      5
    ],
    "expect": 4
  },
  {
    "name": "single element, hit",
    "args": [
      [
        5
      ],
      5
    ],
    "expect": 0
  },
  {
    "name": "single element, miss",
    "args": [
      [
        5
      ],
      -5
    ],
    "expect": -1
  },
  {
    "name": "below the range",
    "args": [
      [
        2,
        4,
        6
      ],
      1
    ],
    "expect": -1
  },
  {
    "name": "above the range",
    "args": [
      [
        2,
        4,
        6
      ],
      7
    ],
    "expect": -1
  }
];

test('Binary Search — correctness', async (t) => {
  for (const c of CASES) {
    await t.test(c.name, () => {
      const args = structuredClone(c.args);
      const returned = search(...args);
      const actual = c.mutates ? args[0] : returned;
      assert.deepEqual(actual, c.expect);
    });
  }
});

test('Binary Search — written by hand', () => {
  const src = readFileSync(new URL('./solution.mjs', import.meta.url), 'utf8');
  assert.ok(!new RegExp("\\.indexOf\\s*\\(").test(src), "do not use Array.prototype.indexOf here \u2014 write the algorithm by hand");
  assert.ok(!new RegExp("\\.includes\\s*\\(").test(src), "do not use Array.prototype.includes here \u2014 write the algorithm by hand");
  assert.ok(!new RegExp("\\.find(Index)?\\s*\\(").test(src), "do not use Array.prototype.find/findIndex here \u2014 write the algorithm by hand");
});

test('Binary Search — complexity is O(log n)', () => {
  assertLogarithmic({
    makeInput: (n) => Array.from({ length: n }, (_, i) => i * 2),
    call: (a) => search(a, -1),
  });
});
