/* Reference solution — Majority Element.
   Print with: npm run solution -- 08
   Yours does not have to match this. If yours passes, yours is correct. */

export function majorityElement(a) {
  let candidate = a[0];
  let count = 0;
  for (const x of a) {
    if (count === 0) candidate = x;
    count += x === candidate ? 1 : -1;
  }
  return candidate;
}
