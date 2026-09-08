# Algorithms & Data Structures Resources

Curated, verified sources. Lessons draw knowledge from here, not from guesswork.
Every link below was checked and resolved on 2026-09-07.

## Knowledge

### Process & interview craft

- [Tech Interview Handbook — Yangshun Tay](https://www.techinterviewhandbook.org/)
  Free, open-source, written by an ex-Meta staff engineer who also created the
  Blind 75 list. The most trustworthy general guide available and it is not
  selling anything. Use for: interview technique, what to say out loud, cheat
  sheets, per-topic best practices.
  ([source repo](https://github.com/yangshun/tech-interview-handbook))

- [Grind 75 — customisable problem list](https://www.techinterviewhandbook.org/grind75/)
  Blind 75's successor by the same author. Unlike Blind 75 it is prioritised and
  it takes your available hours as input. Use for: deciding *which* problems to
  practice given a 3-month, 20-minute-a-day budget.

- [Pólya's four phases of problem solving](https://home.sandiego.edu/~pmyers/foursteps.htm)
  George Pólya, *How to Solve It* (1945). The ancestor of every coding-interview
  framework in existence: Understand → Devise a plan → Carry out the plan → Look
  back. Use for: the underlying discipline behind the problem contract, and the
  guiding questions for each phase.

### Patterns & problem sets

- [NeetCode roadmap](https://neetcode.io/roadmap)
  A free dependency tree ordering ~18 topics from Arrays & Hashing through to
  2-D Dynamic Programming. The ordering is the valuable part: each topic points
  at the topics you need first. Use for: deciding what is teachable next, and
  for confirming a topic is not being taught out of order.

- [NeetCode practice sets](https://neetcode.io/practice)
  The NeetCode 150 and related lists, with video walkthroughs. Use for: volume
  practice once a pattern has been taught.

### Reference & foundations

- [Big-O Cheat Sheet](https://www.bigocheatsheet.com/)
  Complexity tables for common data structures and sorting algorithms. Use for:
  checking a complexity claim before asserting it in a lesson.

- [USACO Guide — Time Complexity](https://usaco.guide/bronze/time-comp)
  Free, by the Competitive Programming Initiative. Carries the input-size →
  required-complexity table and the operations-per-second estimate that turns a
  constraint line into a verdict: *"A conservative estimate for the number of
  operations the grading server can handle per second is 10⁸, but it could be
  closer to 5·10⁸ given good constant factors."* Use for: the bound → verdict
  skill, which interview-prep material states far less explicitly than
  competitive-programming material does.

- [Competitive Programmer's Handbook — Antti Laaksonen](https://cses.fi/book/book.pdf) (PDF)
  §2.3 "Estimating efficiency" carries the corroborating table (n ≤ 10 → O(n!),
  n ≤ 20 → O(2ⁿ), n ≤ 500 → O(n³), n ≤ 5000 → O(n²), n ≤ 10⁶ → O(n log n) or
  O(n), n large → O(1) or O(log n)) and the underlying claim that *"a modern
  computer can perform some hundreds of millions of operations in a second."*
  Use for: a second independent source on complexity budgets. Note it disagrees
  with USACO at the edges (5,000 vs 7,500 for O(n²)) — that disagreement is worth
  teaching, since the real choice is between orders of magnitude.

- [Getting things sorted in V8](https://v8.dev/blog/array-sort)
  The V8 team on why `Array.prototype.sort` became TimSort — an adaptive, stable
  merge sort variant — and stable as of V8 7.0 / Chrome 70. Use for: justifying
  the cost of any built-in claim about `.sort()`, and as the bridge between the
  hand-written sorts and the one he will actually call.

- [MIT 6.006 Introduction to Algorithms (OpenCourseWare, Spring 2020)](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/)
  Full university course, free, with lecture videos and problem sets. Python,
  not TypeScript — read it for the ideas, not the syntax. Use for: genuine depth
  on why an algorithm works, when a lesson needs more than an interview-level
  explanation.

- [Algorithms, 4th Edition — Sedgewick & Wayne (Princeton)](https://algs4.cs.princeton.edu/home/)
  Free companion site to the book, with rigorous, well-illustrated treatments of
  each data structure. Use for: authoritative data-structure internals.

- [The Algorithm Design Manual — Steven Skiena](https://www.algorist.com/)
  Companion site to the book. Skiena's "war stories" are the best available
  writing on *recognising* which algorithm a real problem needs. Use for:
  pattern recognition and problem classification.

### Rust — language and data structures

- [The Rust Programming Language ("the Book")](https://doc.rust-lang.org/book/)
  The official text. Authoritative, free, and the thing to cite when a lesson
  needs to justify a language claim. Use for: ownership, borrowing, `Box`, and
  anything where guessing is not acceptable.

- [Rustlings](https://rust-lang.github.io/rustlings/)
  Already in progress locally at `~/Documents/rustlings` — currently `hashmaps3`.
  Section 19 (smart pointers) is the gate for the binary tree and the doubly
  linked list. Use for: tracking when those topics become teachable in Rust.

- [Learning Rust With Entirely Too Many Linked Lists](https://rust-unofficial.github.io/too-many-lists/)
  The canonical treatment of why linked structures are hard in Rust, written as a
  book-length joke at the language's expense that is also the best explanation
  available. Its own warning — that a linked list is "absolutely the worst way to
  learn Rust" — is why the doubly linked list is sequenced last here.
  Use for: the doubly linked list lesson, and nothing before it.

- [Why Writing a Linked List in (safe) Rust is So Damned Hard — R. Cohen](https://rcoh.me/posts/rust-linked-list-basically-impossible/)
  Short companion piece to the above. Clearest single explanation of the
  ownership conflict: if `prev` and `next` both point at a middle node, neither
  can own it. Use for: motivating `Rc<RefCell<_>>` when the time comes.

- [Rust std — `slice` primitive](https://doc.rust-lang.org/std/primitive.slice.html)
  and [`slice::swap`](https://doc.rust-lang.org/std/primitive.slice.html#method.swap).
  Use for: idiomatic in-place sorting without index gymnastics.

- [Rust std source — `sort/shared/smallsort.rs`](https://doc.rust-lang.org/src/core/slice/sort/shared/smallsort.rs.html)
  The standard library's own `insertion_sort_shift_left`, used below
  `SMALL_SORT_FALLBACK_THRESHOLD`. Use for: proving to a sceptical learner that
  insertion sort is production code, not a toy.

- [Driftsort introduction — Voultapher/sort-research-rs](https://github.com/Voultapher/sort-research-rs/blob/main/writeup/driftsort_introduction/text.md)
  Design writeup for Rust's current stable sort. Notes the insertion-sort
  fallback for slices of roughly 20 elements or fewer. Use for: why small-input
  behaviour matters in real sorting implementations.

### Algorithms — foundations

- [Stanford CS161 Lecture 1 (PDF)](https://web.stanford.edu/class/archive/cs/cs161/cs161.1168/lecture1.pdf)
  Insertion sort and the loop-invariant proof, from a university course rather
  than a blog. Use for: correctness reasoning.

- [YCP CS360 — Insertion Sort and loop invariants](https://ycpcs.github.io/cs360-spring2015/lectures/lecture02.html)
  CLRS Chapter 2 material presented cleanly: initialization, maintenance,
  termination. Use for: the invariant framing used throughout these lessons.

### Learning science

- [Bjork & Bjork, *Introducing Desirable Difficulties Into Practice and Instruction*](https://www.unh.edu/teaching-learning-resource-hub/sites/default/files/media/2023-06/itow-introducing-desirable-difficulties-into-practice-and-instruction-bjork-and-bjork.pdf) (PDF)
  Robert Bjork (UCLA) on why conditions that slow practice down — spacing,
  retrieval, interleaving, generation, variation — produce more durable learning,
  and why fluent practice creates a convincing illusion of mastery. The
  distinction between *storage strength* and *retrieval strength* is the reason
  lessons here demand generation from a blank page. Use for: justifying lesson
  design, and for explaining to Manuel why a drill is deliberately uncomfortable.

## Wisdom (Communities)

- [r/leetcode](https://www.reddit.com/r/leetcode/)
  High traffic, mixed signal, but the best place to post a solution and get it
  critiqued, and to calibrate against what interviews currently ask. Use for:
  reality-checking difficulty and getting solution reviews.

- [r/cscareerquestions](https://www.reddit.com/r/cscareerquestions/)
  Use for: process questions — what a given company's loop looks like, how
  offers work. Weak on algorithms themselves.

- **Mock interviews with a human.** The single highest-value wisdom source for
  this mission, because the failure mode being treated (freezing) only appears
  under observation. Practising alone cannot reproduce it.
  *Not yet chosen — see Gaps.*

> **Community preference:** not yet stated. Ask before investing further in this
> section.

## Gaps

- **No mock-interview partner or platform selected yet.** Freezing is a
  performance failure and cannot be rehearsed alone. Needs a decision by roughly
  week 4. Not yet discussed with Manuel.
- **No verified source on what Rust interviews actually ask.** Current
  understanding — that live coding rounds weight ownership and borrowing over
  algorithm puzzles — traces to secondary aggregator sites, not to primary
  reports. Find first-hand accounts before rebalancing the course around it.
- **No Rust-native curated problem set identified.** NeetCode and Grind 75 are
  Python/Java-shaped. Lessons must carry their own Rust reference code.
- **Community preference not yet stated.** Ask before investing in that section.
