/* Reference solution — Contains Duplicate.
   Print with: npm run solution -- 03
   Yours does not have to match this. If yours passes, yours is correct. */

export function containsDuplicate(a) {
  const seen = new Set();
  for (const x of a) {
    if (seen.has(x)) return true;
    seen.add(x);
  }
  return false;
}
