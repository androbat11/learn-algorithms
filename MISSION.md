# Mission: Algorithm Fundamentals, toward Rust

## Why

Manuel wants a job as a **Rust developer**. He already ships software
professionally (225 commits in the ProDoctivity monorepo) and is working through
rustlings, but he has never implemented the classical fundamentals from scratch —
insertion sort, merge sort, a binary tree, a doubly linked list — and does not
know the recurring interview patterns. On top of that he freezes at a blank
editor when handed an algorithm problem.

The goal is to close the fundamentals gap by *building each structure by hand*,
in Rust wherever Rust teaches the algorithm rather than fighting him, so that the
algorithms and the language become interview-ready together.

## Success looks like

- Implement from a blank file, without reference: **insertion sort**, **merge
  sort**, a **binary tree** with insert/search/traverse, a **doubly linked list**
- State time and space complexity for each, and justify it
- Pass a live test suite for each structure, written from a blank editor
- Name the **pattern family** a problem belongs to before choosing a structure
- Port the finished structures to Rust in phase 2, including the doubly linked
  list, which is genuinely hard there
- Produce a **problem contract** in under three minutes on an unseen problem

## Constraints

- ~20 minutes daily. Targeting **December 2026** (~3 months from 2026-09-07)
- **TypeScript is the working language** for the whole fundamentals phase. Rust
  is the eventual destination, not the current medium
- **Rust level: rustlings exercise 46, currently `hashmaps3`.** Completed through
  section 11 of 23. Has *not* yet reached generics (14), traits (15), lifetimes
  (16), iterators (18), or **smart pointers (19)** — `Box`, `Rc`, `RefCell`
- Freezes at a blank editor. Lessons must demand **generation**, not recognition
- Working practitioner. Never condescend on general programming

## Scope — widened 2026-09-07

Originally five topics. Manuel then asked for *"the most basic algorithms and
data structures that someone must master in order to pass the actual interview
and have good fundaments."* Scope is now the full foundational curriculum,
tiered by value against a fixed time budget.

**The budget is the binding constraint:** 60–85 sessions before December, or
20–28 hours. That funds Tiers 0–2 properly. It does not fund Tier 3 as well, and
the plan says so rather than pretending.

- **Tier 0 — Foundations.** Contract, complexity, arrays/strings, recursion.
- **Tier 1 — The core (~80% of questions).** Hashing, two pointers, sliding
  window, binary search, sorting, stack, queue, linked lists, binary trees, BST,
  heaps.
- **Tier 2 — Expected.** Graphs, backtracking, intervals, 1-D DP.
- **Tier 3 — Deferred, consciously.** 2-D DP, tries, advanced graphs, greedy,
  bit manipulation.

His original five (insertion sort, merge sort, binary tree, doubly linked list,
patterns) are all inside Tiers 0–2. Nothing he asked for has been dropped.

Full plan with mastery criteria: [`reference/curriculum.html`](reference/curriculum.html).

## Language policy

**Phase 1 — TypeScript. Everything.** Learn each structure and algorithm once, in
a language that does not tax him, with live in-browser exercises. Decided by
Manuel on 2026-09-07 and settled (LR-0005).

**Phase 2 — port to Rust.** Once the fundamentals list is complete. At that point
the sequencing constraints in LR-0003 become live again: the sorts port easily,
the binary tree needs `Option<Box<_>>`, and the doubly linked list needs
`Rc<RefCell<_>>` and should be done last, deliberately, as the ownership lesson
it really is.

## Out of scope

- System design, behavioural preparation
- Competitive programming
- Broad Rust language teaching beyond what these five topics require
