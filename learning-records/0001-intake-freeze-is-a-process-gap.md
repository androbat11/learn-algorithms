---
Status: partially superseded by LR-0003
---

# Intake: the blocker is process and retrieval, not knowledge

Manuel self-assessed as *"knows the words, freezes on problems"* — he can read
and follow a solution, and he has the vocabulary (Big-O, hash maps, recursion),
but a blank editor is paralysing. He ships production software professionally,
so carrying out a plan is demonstrably not the weak phase.

This locates the deficit precisely in Pólya's phase one and two — understanding
and planning — rather than in knowledge or implementation. It is the single most
important fact for choosing what to teach: lessons that define data structures
would be re-teaching what he already has, and would produce fluency without
touching the actual failure.

**Implications**

- Do not spend lessons defining terminology. Teach retrieval and classification.
- Prefer generation (blank page, write it yourself) over recognition (pick the
  right answer from a list). He can already recognise correct solutions, which is
  exactly the illusion of competence that desirable-difficulty research warns
  about.
- Implementation-heavy lessons are low value until the planning phase is solid.
- Freezing is a performance failure that only manifests under observation, so at
  some point this needs a live human, not just lessons. Flagged as the main gap
  in [[RESOURCES.md]].

**Evidence:** self-report at intake, 2026-09-07. Not yet corroborated by watching
him attempt a problem — treat as a strong hypothesis, and confirm or revise once
he returns his first written contract.


---

**Superseded in part (2026-09-07).** The claim that this is *purely* a process
gap was wrong. Manuel subsequently reported that he has never implemented
insertion sort, merge sort, a binary tree, or a doubly linked list, and does not
know the interview patterns. That is a real implementation gap, not a retrieval
one. Both deficits are genuine and co-exist. The corrected picture is in
[[0003-actual-rust-and-algorithms-baseline]]. The parts of this record that still
hold: prefer generation over recognition, and do not re-define vocabulary he
already has.
