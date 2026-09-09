/* Reference solution — Move Zeroes.
   Print with: npm run solution -- 09
   Yours does not have to match this. If yours passes, yours is correct. */

export function moveZeroes(a) {
  let write = 0;
  for (let read = 0; read < a.length; read++) {
    if (a[read] !== 0) a[write++] = a[read];
  }
  while (write < a.length) a[write++] = 0;
  return a;
}
