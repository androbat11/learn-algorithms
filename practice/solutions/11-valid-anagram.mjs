/* Reference solution — Valid Anagram.
   Print with: npm run solution -- 11
   Yours does not have to match this. If yours passes, yours is correct. */

export function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const counts = new Map();
  for (const c of s) counts.set(c, (counts.get(c) ?? 0) + 1);
  for (const c of t) {
    const n = counts.get(c);
    if (!n) return false;
    counts.set(c, n - 1);
  }
  return true;
}
