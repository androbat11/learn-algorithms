/* Reference solution — Merge Sort.
   Print with: npm run solution -- 07
   Yours does not have to match this. If yours passes, yours is correct. */

function merge(left, right) {
  const out = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) out.push(left[i++]);
    else out.push(right[j++]);
  }
  while (i < left.length) out.push(left[i++]);
  while (j < right.length) out.push(right[j++]);
  return out;
}

export function mergeSort(a) {
  if (a.length <= 1) return a.slice();
  const mid = Math.floor(a.length / 2);
  return merge(mergeSort(a.slice(0, mid)), mergeSort(a.slice(mid)));
}
