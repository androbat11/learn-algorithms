# First problem contract returned — indices/values ambiguity caught unprompted

Manuel completed the Lesson 1 rep and sent a contract for Two Sum on
2026-09-07. He also correctly pointed out that I had never chased him for it,
which is a process failure on my side, not his.

**Evidence of real understanding.** His Goal line reads *"Return a number[] with
the indexes of the values that sum up to target."* Lesson 1 argued that
values-versus-indices is the single most important clarifying question on this
problem, and he asked it without being prompted, on his first attempt. That is
transfer, not recall. His Breaks line also names the duplicate-sum case
(`[3,3]`, target 6), which the lesson flagged as the most common way a Two Sum
solution fails.

**The gaps, which set the next lesson.**

1. **Trace was not a line.** He folded his example into Bounds and — the real
   issue — wrote an input with **no output**. `nums = [3,4,5,6], target = 7` with
   nothing after it. Lesson 1's claim is that a trace you cannot complete by hand
   means you do not yet understand the problem; an unfinished trace is the same
   failure in a quieter form.
2. **Bounds recorded but not cashed in.** He wrote `2 <= nums.length <= 1000` and
   drew no conclusion from it. The number is only useful once converted into a
   verdict about acceptable complexity — and at n = 1000, O(n²) is 10⁶ and
   genuinely fine, which is a more interesting answer than the expected one.
3. **Goal is silent on failure.** No statement of what to return when no pair
   exists, or whether several valid pairs are possible.
4. **Breaks conflates two distinct bugs.** "Two identical numbers summing up"
   (`[3,3]`) and "reusing the same element twice" (`[3, x]`, index 0 used twice)
   are different failures with different fixes. He named one and appears to have
   merged the other into it.
5. **"positive numbers" asserted without a source.** Given, or assumed? Lesson 1
   recommended marking assumptions as *had to ask*; he stated it as fact.

**Implication.** He is ready to move from writing contracts to *executing* them.
Lesson 3 is therefore re-planned as Two Sum end to end — grade the contract,
repair it, then derive brute force and the hash-map solution from the repaired
version. Merge sort slips to Lesson 4. This also pulls the hashing pattern
forward, which is on his scoped list.
