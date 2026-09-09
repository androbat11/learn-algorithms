/* Reference solution — Two Sum.
   Print with: npm run solution -- 04
   Yours does not have to match this. If yours passes, yours is correct. */

export function twoSum(a, target) {
  const seen = new Map();
  for (let i = 0; i < a.length; i++) {
    const need = target - a[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(a[i], i);
  }
  return [];
}
