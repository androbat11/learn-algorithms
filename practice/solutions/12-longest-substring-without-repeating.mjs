/* Reference solution — Longest Substring Without Repeating Characters.
   Print with: npm run solution -- 12
   Yours does not have to match this. If yours passes, yours is correct. */

export function lengthOfLongestSubstring(s) {
  const lastSeen = new Map();
  let left = 0, best = 0;
  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    if (lastSeen.has(c) && lastSeen.get(c) >= left) left = lastSeen.get(c) + 1;
    lastSeen.set(c, right);
    if (right - left + 1 > best) best = right - left + 1;
  }
  return best;
}
