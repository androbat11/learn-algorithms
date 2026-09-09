/* Move Zeroes — two-pointers
   Run:  npm test -- 09
   These tests are the spec. Read them when the statement is ambiguous. */

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { moveZeroes } from './solution.mjs';
import { assertSubQuadratic } from '../../lib/measure.mjs';

const CASES = [
  {
    "name": "zeroes interleaved",
    "args": [
      [
        0,
        1,
        0,
        3,
        12
      ]
    ],
    "expect": [
      1,
      3,
      12,
      0,
      0
    ],
    "mutates": true
  },
  {
    "name": "single zero",
    "args": [
      [
        0
      ]
    ],
    "expect": [
      0
    ],
    "mutates": true
  },
  {
    "name": "no zeroes",
    "args": [
      [
        1,
        2,
        3
      ]
    ],
    "expect": [
      1,
      2,
      3
    ],
    "mutates": true
  },
  {
    "name": "all zeroes",
    "args": [
      [
        0,
        0,
        0
      ]
    ],
    "expect": [
      0,
      0,
      0
    ],
    "mutates": true
  },
  {
    "name": "leading zeroes",
    "args": [
      [
        0,
        0,
        1
      ]
    ],
    "expect": [
      1,
      0,
      0
    ],
    "mutates": true
  },
  {
    "name": "trailing zeroes",
    "args": [
      [
        1,
        0,
        0
      ]
    ],
    "expect": [
      1,
      0,
      0
    ],
    "mutates": true
  },
  {
    "name": "negatives preserved",
    "args": [
      [
        0,
        -1,
        0,
        -2
      ]
    ],
    "expect": [
      -1,
      -2,
      0,
      0
    ],
    "mutates": true
  }
];

test('Move Zeroes — correctness', async (t) => {
  for (const c of CASES) {
    await t.test(c.name, () => {
      const args = structuredClone(c.args);
      const returned = moveZeroes(...args);
      const actual = c.mutates ? args[0] : returned;
      assert.deepEqual(actual, c.expect);
    });
  }
});

test('Move Zeroes — written by hand', () => {
  const src = readFileSync(new URL('./solution.mjs', import.meta.url), 'utf8');
  assert.ok(!new RegExp("\\.filter\\s*\\(").test(src), "do not use Array.prototype.filter (build it in place) here \u2014 write the algorithm by hand");
  assert.ok(!new RegExp("\\.splice\\s*\\(").test(src), "do not use Array.prototype.splice here \u2014 write the algorithm by hand");
});

test('Move Zeroes — complexity is O(n) or O(n log n)', () => {
  assertSubQuadratic({
    makeInput: (n) => Array.from({ length: n }, (_, i) => (i % 3 === 0 ? 0 : i)),
    call: (a) => moveZeroes(a),
  });
});

test('move zeroes — returns the same array it was given (in place)', () => {
  const a = [0, 1, 2];
  assert.equal(moveZeroes(a), a, 'return the array you were handed, not a copy');
});
