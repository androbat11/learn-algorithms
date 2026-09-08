# Verified baseline: mid-rustlings Rust, no classical algorithm implementations

Established 2026-09-07 from the filesystem rather than self-report, which matters
because the self-report alone would have led to the wrong course.

**Rust.** `~/Documents/rustlings/.rustlings-state.txt` shows **46 exercises
completed, currently on `hashmaps3`** — through section 11 of 23. Completed:
intro, variables, functions, if, primitive types, vecs, move semantics, structs,
enums, strings, modules, and most of hashmaps. **Not yet reached:** options (12),
error handling (13), generics (14), traits (15), lifetimes (16), tests (17),
iterators (18), **smart pointers (19)**, threads, macros, conversions.

**Professional code.** 225 commits authored in the ProDoctivity monorepo
(`git log --author`), so he is a working engineer. Note for the record: `~/buzz`
is a *clone* of github.com/block/buzz and contains none of his commits — an
earlier session mistakenly read it as his work. Do not cite it as evidence of his
Rust ability.

**Algorithms.** Self-reported and consistent with the above: has binary search
and bubble sort, a partial linked list. Has never implemented insertion sort,
merge sort, a binary tree, or a doubly linked list. Does not know the interview
pattern vocabulary.

**Implications — this is the record that drives sequencing**

- Anything requiring `Box`, `Rc`, or `RefCell` is **out of reach in Rust until he
  finishes rustlings section 19.** That gates the binary tree and the doubly
  linked list specifically.
- The sorts are **in reach in Rust right now**: they need only slices, `Vec`,
  loops, and recursion, all of which he has. Teaching those in TypeScript would
  be wasted motion.
- Generic code (`fn sort<T: Ord>`) is out of reach until sections 14–15. Use
  concrete types like `&mut [i32]` in lessons until then, and say why.
- His pace through rustlings is unknown. If lessons reach the tree before he
  reaches section 19, the TypeScript version is the fallback, not a failure.
