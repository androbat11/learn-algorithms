/* ==========================================================================
   exercise.js — live code exercises with automatic test feedback.
   Vanilla, no dependencies, runs from file://.

   The learner writes a function, presses Run, and sees each test case pass or
   fail immediately. That tight automatic loop is the whole point: feedback that
   arrives while the attempt is still in working memory.

   MARKUP CONTRACT
   ---------------
   <div class="exercise" data-exercise data-fn="insertionSort">
     <span class="ex-kicker">Exercise 1</span>
     <p class="ex-brief">Sort the array ascending, in place.</p>
     <textarea class="ex-code">function insertionSort(a) {
  // your code here
}</textarea>
     <div class="ex-bar">
       <button class="btn run">Run tests</button>
       <button class="btn ghost hint">Hint</button>
       <button class="btn ghost solution">Solution</button>
     </div>
     <div class="ex-results"></div>
     <div class="ex-hint" hidden>…</div>
     <div class="ex-answer" hidden>…</div>
     <script type="application/json" class="ex-tests">
       [{"name":"mixed","args":[[5,2,4,1]],"expect":[1,2,4,5]}]
     </script>
   </div>

   Each test: { name, args, expect }. The value compared is the function's
   return value, or — when it returns undefined — its mutated first argument,
   so in-place and returning implementations both work.

   Optional per-test "mutates": true forces comparison against args[0].
   ========================================================================== */

(function () {
  'use strict';

  /* --- value formatting and comparison ----------------------------------- */

  function show(v) {
    if (v === undefined) return 'undefined';
    if (v === null) return 'null';
    if (typeof v === 'string') return JSON.stringify(v);
    if (Array.isArray(v)) return '[' + v.map(show).join(', ') + ']';
    if (typeof v === 'object') {
      try { return JSON.stringify(v); } catch (e) { return String(v); }
    }
    return String(v);
  }

  function deepEqual(a, b) {
    if (a === b) return true;
    if (typeof a === 'number' && typeof b === 'number') {
      return a === b || (Number.isNaN(a) && Number.isNaN(b));
    }
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      for (var i = 0; i < a.length; i++) if (!deepEqual(a[i], b[i])) return false;
      return true;
    }
    if (a && b && typeof a === 'object' && typeof b === 'object') {
      var ka = Object.keys(a), kb = Object.keys(b);
      if (ka.length !== kb.length) return false;
      return ka.every(function (k) {
        return Object.prototype.hasOwnProperty.call(b, k) && deepEqual(a[k], b[k]);
      });
    }
    return false;
  }

  function clone(v) {
    if (Array.isArray(v)) return v.map(clone);
    if (v && typeof v === 'object') {
      var o = {};
      Object.keys(v).forEach(function (k) { o[k] = clone(v[k]); });
      return o;
    }
    return v;
  }

  /* --- a forgiving TypeScript-annotation stripper ------------------------- */
  /* The runner is plain JavaScript. Learners reasonably paste TypeScript, so
     if the source will not parse we make one conservative attempt to remove
     type annotations rather than just showing a syntax error.               */

  function stripTypes(src) {
    return src
      .replace(/\)\s*:\s*[A-Za-z_$][\w$<>\[\],\s|]*\s*\{/g, ') {')
      .replace(/([A-Za-z_$][\w$]*)\s*:\s*[A-Za-z_$][\w$<>\[\],\s|]*(?=\s*[,)=])/g, '$1')
      .replace(/\bas\s+[A-Za-z_$][\w$<>\[\]]*/g, '');
  }

  function compile(src, fnName) {
    var attempts = [src, stripTypes(src)];
    var lastError = null;

    for (var i = 0; i < attempts.length; i++) {
      try {
        /* eslint-disable no-new-func */
        var factory = new Function(
          '"use strict";\n' + attempts[i] + '\nreturn typeof ' + fnName +
          ' === "function" ? ' + fnName + ' : undefined;'
        );
        var fn = factory();
        if (typeof fn === 'function') {
          return { fn: fn, strippedTypes: i > 0 };
        }
        lastError = new Error(
          'No function named `' + fnName + '` was defined. Check the name and ' +
          'that it is a top-level function.'
        );
      } catch (e) {
        lastError = e;
      }
    }
    return { error: lastError };
  }

  /* --- rendering ---------------------------------------------------------- */

  function renderError(box, err, note) {
    box.innerHTML = '';
    var pre = document.createElement('div');
    pre.className = 'ex-error';
    pre.textContent = (note ? note + '\n\n' : '') +
      (err && err.message ? err.name + ': ' + err.message : String(err));
    box.appendChild(pre);
  }

  function renderResults(box, results, stripped) {
    box.innerHTML = '';

    var passed = results.filter(function (r) { return r.pass; }).length;
    var summary = document.createElement('div');
    summary.className = 'ex-summary ' + (passed === results.length ? 'all-pass' : 'some-fail');
    summary.textContent = passed === results.length
      ? '✓  All ' + results.length + ' tests passed.'
      : passed + ' of ' + results.length + ' passed.';
    box.appendChild(summary);

    if (stripped) {
      var n = document.createElement('p');
      n.className = 'ex-note';
      n.textContent = 'Note: that looked like TypeScript, so the type ' +
        'annotations were stripped before running. The logic is unchanged.';
      box.appendChild(n);
    }

    results.forEach(function (r) {
      var el = document.createElement('div');
      el.className = 'ex-case ' + (r.pass ? 'pass' : 'fail');

      var head = '<span class="tag">' + (r.pass ? 'pass' : 'fail') + '</span>' +
                 '<span class="label">' + r.name + '</span>';

      if (r.pass) {
        el.innerHTML = head;
      } else if (r.threw) {
        el.innerHTML = head +
          '<div class="row"><span class="label">threw</span> ' +
          '<span class="got">' + r.threw + '</span></div>';
      } else {
        el.innerHTML = head +
          '<div class="row"><span class="label">input&nbsp;&nbsp;</span> ' + r.input + '</div>' +
          '<div class="row"><span class="label">got&nbsp;&nbsp;&nbsp;&nbsp;</span> ' +
          '<span class="got">' + r.got + '</span></div>' +
          '<div class="row"><span class="label">want&nbsp;&nbsp;&nbsp;</span> ' +
          '<span class="want">' + r.want + '</span></div>';
      }
      box.appendChild(el);
    });
  }

  /* --- running ------------------------------------------------------------ */

  function runExercise(ex) {
    var fnName = ex.dataset.fn;
    var src = ex.querySelector('.ex-code').value;
    var box = ex.querySelector('.ex-results');
    var testsEl = ex.querySelector('.ex-tests');

    var tests;
    try {
      tests = JSON.parse(testsEl.textContent);
    } catch (e) {
      renderError(box, e, 'The test definitions for this exercise are malformed.');
      return;
    }

    var compiled = compile(src, fnName);
    if (compiled.error) {
      renderError(box, compiled.error, 'Your code did not compile.');
      return;
    }

    var results = tests.map(function (t) {
      var args = clone(t.args);
      var record = { name: t.name, input: show(t.args.length === 1 ? t.args[0] : t.args) };

      try {
        var returned = compiled.fn.apply(null, args);
        var actual = (t.mutates || returned === undefined) ? args[0] : returned;
        record.pass = deepEqual(actual, t.expect);
        record.got = show(actual);
        record.want = show(t.expect);
      } catch (e) {
        record.pass = false;
        record.threw = (e && e.message) ? e.name + ': ' + e.message : String(e);
      }
      return record;
    });

    renderResults(box, results, compiled.strippedTypes);
  }

  /* --- boot --------------------------------------------------------------- */

  function initExercise(ex) {
    var code = ex.querySelector('.ex-code');
    var runBtn = ex.querySelector('.btn.run');
    var hintBtn = ex.querySelector('.btn.hint');
    var solBtn = ex.querySelector('.btn.solution');
    var hint = ex.querySelector('.ex-hint');
    var answer = ex.querySelector('.ex-answer');

    /* Tab should indent, not escape the editor. */
    if (code) {
      code.addEventListener('keydown', function (e) {
        if (e.key !== 'Tab') return;
        e.preventDefault();
        var s = code.selectionStart, t = code.selectionEnd;
        code.value = code.value.slice(0, s) + '  ' + code.value.slice(t);
        code.selectionStart = code.selectionEnd = s + 2;
      });
      /* Ctrl/Cmd+Enter runs. */
      code.addEventListener('keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
          e.preventDefault();
          runExercise(ex);
        }
      });
    }

    if (runBtn) {
      runBtn.type = 'button';
      runBtn.addEventListener('click', function () { runExercise(ex); });
    }

    if (hintBtn && hint) {
      hintBtn.type = 'button';
      hintBtn.addEventListener('click', function () {
        hint.hidden = false;
        hintBtn.disabled = true;
      });
    }

    if (solBtn && answer) {
      solBtn.type = 'button';
      solBtn.addEventListener('click', function () {
        answer.hidden = false;
        solBtn.disabled = true;
        solBtn.textContent = 'Solution shown';
      });
    }
  }

  function boot() {
    document.querySelectorAll('[data-exercise]').forEach(initExercise);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
