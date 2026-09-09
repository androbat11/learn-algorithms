/* Reference solution — Valid Palindrome.
   Print with: npm run solution -- 10
   Yours does not have to match this. If yours passes, yours is correct. */

const isAlnum = (c) =>
  (c >= '0' && c <= '9') || (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');

export function isPalindrome(s) {
  let i = 0, j = s.length - 1;
  while (i < j) {
    while (i < j && !isAlnum(s[i])) i++;
    while (i < j && !isAlnum(s[j])) j--;
    if (s[i].toLowerCase() !== s[j].toLowerCase()) return false;
    i++;
    j--;
  }
  return true;
}
