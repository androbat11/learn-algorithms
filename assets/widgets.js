/* ==========================================================================
   widgets.js — interactive lesson components. Vanilla, no dependencies,
   works from file://. Shared across every lesson in this workspace.

   MARKUP CONTRACTS
   ----------------
   Multiple choice, instant feedback:

     <div class="quiz" data-quiz>
       <span class="quiz-kicker">Check 1</span>
       <p class="quiz-q">Question text</p>
       <ul class="quiz-opts">
         <li><button data-correct data-why="Why this is right.">Option A</button></li>
         <li><button data-why="Why this is wrong.">Option B</button></li>
       </ul>
       <div class="quiz-fb" hidden></div>
     </div>

   Add data-noshuffle to the .quiz to keep the authored option order.

   Free recall — generate from memory first, then compare:

     <div class="recall" data-recall>
       <span class="recall-kicker">From memory</span>
       <p class="recall-q">Prompt</p>
       <textarea placeholder="..."></textarea>
       <button class="btn">Show the answer</button>
       <div class="recall-answer" hidden>…model answer…</div>
     </div>

   Running tally (optional, place anywhere):

     <p class="score" data-score>Answered <b>0</b> of <b>0</b>.</p>
   ========================================================================== */

(function () {
  'use strict';

  var answered = 0;
  var correct = 0;
  var total = 0;

  /* --- utilities --------------------------------------------------------- */

  function shuffle(nodes) {
    for (var i = nodes.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      nodes[i].parentNode.insertBefore(nodes[i], nodes[j]);
    }
  }

  function updateScores() {
    document.querySelectorAll('[data-score]').forEach(function (el) {
      var bs = el.querySelectorAll('b');
      if (bs.length >= 2) {
        bs[0].textContent = String(correct);
        bs[1].textContent = String(total);
      }
      el.dataset.answered = String(answered);
    });
  }

  /* --- quizzes ----------------------------------------------------------- */

  function initQuiz(quiz) {
    var list = quiz.querySelector('.quiz-opts');
    var feedback = quiz.querySelector('.quiz-fb');
    if (!list) return;

    var items = Array.prototype.slice.call(list.children);
    if (!quiz.hasAttribute('data-noshuffle')) shuffle(items);

    var buttons = quiz.querySelectorAll('.quiz-opts button');
    total += 1;

    buttons.forEach(function (btn) {
      btn.type = 'button';

      btn.addEventListener('click', function () {
        if (quiz.dataset.done === 'true') return;
        quiz.dataset.done = 'true';

        var isRight = btn.hasAttribute('data-correct');
        answered += 1;
        if (isRight) correct += 1;

        buttons.forEach(function (other) {
          other.disabled = true;
          if (other.hasAttribute('data-correct')) {
            other.classList.add('is-correct');
            other.insertAdjacentHTML('beforeend', '<span class="mark">&#10003;</span>');
          } else if (other === btn) {
            other.classList.add('is-wrong');
            other.insertAdjacentHTML('beforeend', '<span class="mark">&#10007;</span>');
          }
        });

        if (feedback) {
          var why = btn.getAttribute('data-why') || '';
          feedback.className = 'quiz-fb ' + (isRight ? 'ok' : 'no');
          feedback.innerHTML =
            '<span class="verdict">' +
            (isRight ? 'Correct.' : 'Not quite.') +
            '</span>' + why;
          feedback.hidden = false;
        }

        updateScores();
      });
    });
  }

  /* --- recall ------------------------------------------------------------ */

  function initRecall(box) {
    var btn = box.querySelector('.btn');
    var answer = box.querySelector('.recall-answer');
    var field = box.querySelector('textarea');
    if (!btn || !answer) return;

    btn.type = 'button';
    btn.addEventListener('click', function () {
      answer.hidden = false;
      btn.disabled = true;
      btn.textContent = 'Answer shown — compare it with yours';
      if (field) field.setAttribute('readonly', 'readonly');
      answer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    /* Nudge toward generating before revealing: the reveal is the reward. */
    if (field) {
      btn.disabled = true;
      btn.title = 'Write something first — the attempt is what builds the memory';
      var enable = function () {
        if (field.value.trim().length > 0) {
          btn.disabled = false;
          btn.title = '';
        }
      };
      field.addEventListener('input', enable);
      /* Escape hatch: double-click the button area to bypass. */
      btn.addEventListener('dblclick', function () { btn.disabled = false; });
    }
  }

  /* --- boot -------------------------------------------------------------- */

  function boot() {
    document.querySelectorAll('[data-quiz]').forEach(initQuiz);
    document.querySelectorAll('[data-recall]').forEach(initRecall);
    updateScores();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
