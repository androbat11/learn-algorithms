# Decision: TypeScript first, Rust deferred — reaffirmed by Manuel

On 2026-09-07 Manuel reversed the Rust-first sequencing: *"let's keep with that
one + typescript … I just need to get along with the basic of data structures and
algorithms in order to move to that part. Keep going with the initial plan."*

I had recommended splitting by transferability — sorts in Rust now, pointer
structures in TypeScript. He heard the argument and chose otherwise. **This is
settled; do not re-open it.** He wants the fundamentals learned once, in a
language that does not tax him, and to port to Rust afterwards.

**Status of the Rust argument:** the technical claims still hold — a doubly
linked list genuinely does not transfer, and rustlings section 19 genuinely does
gate it. Those facts are preserved in [[0003-actual-rust-and-algorithms-baseline]]
and become relevant again at the porting phase. They are not a reason to relitigate
the sequence now.

**What actually changed in the teaching**

- All lessons in TypeScript until the fundamentals list is complete.
- The finished Rust insertion-sort lesson is parked at
  `lessons/deferred-rust/insertion-sort-rust.html` rather than deleted. It is
  correct and tested; it is simply early.
- He asked explicitly for **exercises** and to be **taught the algorithms**, not
  only the process. Lessons must now carry real practice, not just explanation.

**Unexpected upside.** Because the target is now JavaScript, exercises can
execute in the browser. `assets/exercise.js` runs the learner's function against
test cases and reports pass/fail instantly. That is a far tighter feedback loop
than "go write it and come back," and it was impossible in Rust. His choice made
the teaching better, not just easier.
