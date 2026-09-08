# Mission changed: the target is a Rust developer job

Confirmed by Manuel on 2026-09-07: *"The goal is to get a job as a Rust
developer, but I can start doing stuff with Typescript since it is
transferable."* The original mission — generic technical-interview preparation in
TypeScript — is replaced. [[MISSION.md]] has been rewritten.

**Why this changes the teaching, not just the syntax highlighting**

Research on Rust hiring indicates live coding rounds weight heavily toward
ownership, borrowing and lifetimes rather than algorithm puzzles. So the usual
advice — grind Blind 75 — is a poorer fit here than it would be for a generic
software role. The algorithm work still has to happen, because he genuinely
cannot implement the fundamentals, but it should be delivered *in Rust wherever
possible* so that each lesson pays into both accounts at once.

**The transferability claim, examined**

Manuel's instinct that TypeScript transfers is *half* right, and the dividing
line is sharp enough to schedule around:

- **Transfers well:** sorting logic, searching, recursion, complexity reasoning,
  pattern recognition. The Rust version is the same algorithm.
- **Does not transfer:** anything with interior pointers. A doubly linked list in
  TypeScript is twenty easy lines; in Rust it is a famously hard ownership
  problem requiring `Rc<RefCell<_>>` or `unsafe`. Same name, different exercise.

So the plan splits by transferability rather than doing all of one language.
Recorded in [[MISSION.md]] as the language policy table.

**Scope, as he set it:** insertion sort, merge sort, binary tree, doubly linked
list, patterns. He said explicitly this is everything he needs right now. Do not
widen it without asking.
