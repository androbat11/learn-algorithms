/* ==========================================================================
   measure.mjs — empirical complexity checks.

   The idea is the one from Lesson 5: Big-O answers exactly one question,
   "what happens when n doubles?" So instead of inspecting your code, we run
   it at n and at 2n, count how many times it reads the input array, and look
   at the ratio.

       O(1)        ratio ~ 1
       O(log n)    ratio ~ 1
       O(n)        ratio ~ 2
       O(n log n)  ratio ~ 2.2
       O(n^2)      ratio ~ 4
       O(n^3)      ratio ~ 8

   A threshold of 3 cleanly separates "linear-ish" from "quadratic or worse",
   and it is immune to constant factors — which is the whole point of Big-O
   and the reason this is a fair test rather than a style check.

   WHAT IS COUNTED: reads of numeric indices on the input array, including
   the ones library methods do internally (includes, indexOf, slice, spread,
   sort). Hash-map work is deliberately NOT counted, so the O(n) hash-map
   solution to a pairs problem shows ~2 while the double loop shows ~4.
   ========================================================================== */

/** Wrap an array so numeric-index reads are counted. */
export function watchArray(arr) {
  let reads = 0;
  const proxy = new Proxy(arr, {
    get(target, key, recv) {
      if (typeof key === 'string' && /^(0|[1-9]\d*)$/.test(key)) reads++;
      return Reflect.get(target, key, recv);
    },
  });
  return { proxy, reads: () => reads };
}

/**
 * Run `call(input)` at size n and 2n, returning the read counts and ratio.
 *   makeInput(n) -> array
 *   call(watchedArray) -> anything (return value ignored)
 */
export function measureGrowth({ makeInput, call, n = 400 }) {
  const at = (size) => {
    const w = watchArray(makeInput(size));
    call(w.proxy);
    return w.reads();
  };
  const small = at(n);
  const large = at(n * 2);

  if (small === 0) {
    throw new Error(
      'Complexity check could not run: your function never read the input ' +
      'array by index, so there is nothing to measure. If you copied the ' +
      'array first, measure the copy or drop this check.'
    );
  }
  return { n, small, large, ratio: large / small };
}

/** Assert the solution is linear-ish: O(n), O(n log n), O(log n) or O(1). */
export function assertSubQuadratic(opts) {
  const { n, small, large, ratio } = measureGrowth(opts);
  if (ratio >= 3) {
    throw new Error(
      `Too slow. Doubling the input multiplied the work by ${ratio.toFixed(2)}x ` +
      `(${small} reads at n=${n}, ${large} at n=${n * 2}).\n` +
      `  A linear pass roughly doubles (~2x). A nested loop roughly ` +
      `quadruples (~4x), which is what this looks like.\n` +
      `  The answer is correct — it is the complexity that fails. ` +
      `See reference/complexity.html.`
    );
  }
  return { ratio, small, large };
}

/** Assert the solution is genuinely logarithmic — barely grows at all. */
export function assertLogarithmic(opts) {
  const { n, small, large, ratio } = measureGrowth({ ...opts, n: opts.n ?? 4096 });
  if (ratio >= 1.5) {
    throw new Error(
      `Not logarithmic. Doubling the input multiplied the work by ` +
      `${ratio.toFixed(2)}x (${small} reads at n=${n}, ${large} at n=${n * 2}).\n` +
      `  Halving the search space each step should add ONE read when n ` +
      `doubles, so the ratio stays near 1. A ratio near 2 means you scanned.`
    );
  }
  return { ratio, small, large };
}

/* --------------------------------------------------------------------------
   LIMITATION, stated plainly: the counters above see reads of the array they
   wrapped. An algorithm that copies the input first and then works on the
   copy is invisible to them — insertion sort written as
   `const b = a.slice()` reads the input exactly n times and then does its
   quadratic work somewhere the proxy cannot see.

   So index counting is used only for problems whose natural solutions read
   the input directly: searching, scanning, pair-finding, sliding windows.

   Sorting is measured a different way. Instead of counting reads, we count
   *comparisons*, by filling the array with boxes whose `valueOf` increments a
   counter. `a[j] > k` calls valueOf on both sides, so the count tracks the
   comparisons your algorithm actually performs — whether it works on the
   input or on a copy of it.
   -------------------------------------------------------------------------- */

/** Build an array of comparable boxes that count every comparison. */
export function watchComparisons(values) {
  let compares = 0;
  const boxed = values.map((v) => ({
    valueOf() { compares++; return v; },
    toJSON() { return v; },
  }));
  return { boxed, compares: () => compares };
}

/**
 * Measure comparison growth for a sort or any comparison-driven algorithm.
 *   makeValues(n) -> number[]
 *   call(boxedArray) -> anything
 * Each comparison touches two boxes, so counts are ~2x the true comparison
 * count. The ratio is unaffected, which is all we look at.
 */
export function measureComparisonGrowth({ makeValues, call, n = 300 }) {
  const at = (size) => {
    const w = watchComparisons(makeValues(size));
    call(w.boxed);
    return w.compares();
  };
  const small = at(n);
  const large = at(n * 2);

  if (small === 0) {
    throw new Error(
      'Complexity check could not run: your function never compared two ' +
      'elements. If you called .sort() or a built-in, write the algorithm ' +
      'by hand — that is the exercise.'
    );
  }
  return { n, small, large, ratio: large / small };
}

/** Assert a sort is O(n log n) rather than O(n^2). */
export function assertLinearithmic(opts) {
  const { n, small, large, ratio } = measureComparisonGrowth(opts);
  if (ratio >= 3) {
    throw new Error(
      `Too slow. Doubling the input multiplied the comparisons by ` +
      `${ratio.toFixed(2)}x (${small} at n=${n}, ${large} at n=${n * 2}).\n` +
      `  O(n log n) roughly doubles (~2.2x). O(n^2) roughly quadruples ` +
      `(~4x), which is what this looks like.\n` +
      `  The output is correctly sorted — it is the complexity that fails.`
    );
  }
  return { ratio, small, large };
}
