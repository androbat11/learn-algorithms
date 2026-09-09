/* Merge Two Sorted Arrays — sorting
   Run:  npm test -- 06
   These tests are the spec. Read them when the statement is ambiguous. */

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { merge } from './solution.mjs';
import { assertLinearithmic } from '../../lib/measure.mjs';

const CASES = [
  {
    "name": "interleaved",
    "args": [
      [
        1,
        3,
        5
      ],
      [
        2,
        4,
        6
      ]
    ],
    "expect": [
      1,
      2,
      3,
      4,
      5,
      6
    ]
  },
  {
    "name": "uneven lengths",
    "args": [
      [
        1,
        2
      ],
      [
        3,
        4,
        5,
        6
      ]
    ],
    "expect": [
      1,
      2,
      3,
      4,
      5,
      6
    ]
  },
  {
    "name": "all of left first",
    "args": [
      [
        1,
        2,
        3
      ],
      [
        8,
        9
      ]
    ],
    "expect": [
      1,
      2,
      3,
      8,
      9
    ]
  },
  {
    "name": "duplicates across both",
    "args": [
      [
        2,
        2,
        4
      ],
      [
        1,
        2,
        5
      ]
    ],
    "expect": [
      1,
      2,
      2,
      2,
      4,
      5
    ]
  },
  {
    "name": "left empty",
    "args": [
      [],
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
    ]
  },
  {
    "name": "right empty",
    "args": [
      [
        1,
        2,
        3
      ],
      []
    ],
    "expect": [
      1,
      2,
      3
    ]
  },
  {
    "name": "both empty",
    "args": [
      [],
      []
    ],
    "expect": []
  },
  {
    "name": "negatives",
    "args": [
      [
        -5,
        -1
      ],
      [
        -3,
        0
      ]
    ],
    "expect": [
      -5,
      -3,
      -1,
      0
    ]
  }
];

test('Merge Two Sorted Arrays — correctness', async (t) => {
  for (const c of CASES) {
    await t.test(c.name, () => {
      const args = structuredClone(c.args);
      const returned = merge(...args);
      const actual = c.mutates ? args[0] : returned;
      assert.deepEqual(actual, c.expect);
    });
  }
});

test('Merge Two Sorted Arrays — written by hand', () => {
  const src = readFileSync(new URL('./solution.mjs', import.meta.url), 'utf8');
  assert.ok(!new RegExp("\\.sort\\s*\\(").test(src), "do not use Array.prototype.sort here \u2014 write the algorithm by hand");
});

test('Merge Two Sorted Arrays — complexity is O(n log n)', () => {
  assertLinearithmic({
    makeValues: (n) => Array.from({ length: n }, (_, i) => i * 2),
    call: (a) => merge(a.filter((_, i) => i % 2 === 0), a.filter((_, i) => i % 2 === 1)),
  });
});

test('merge — does not modify its inputs', () => {
  const l = [1, 3], r = [2, 4];
  merge(l, r);
  assert.deepEqual(l, [1, 3], 'left was mutated');
  assert.deepEqual(r, [2, 4], 'right was mutated');
});
