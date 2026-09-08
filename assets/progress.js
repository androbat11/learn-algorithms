/* ==========================================================================
   progress.js — persistent checklists for long-lived reference documents.

   Any element carrying data-track="<unique-id>" becomes a checkbox whose state
   survives reloads. State is per-document, stored under one localStorage key.

   MARKUP
   ------
   <li class="track" data-track="two-pointers">Two pointers</li>
   <p class="track-summary" data-track-summary>0 of 0 done</p>

   Storage can be unavailable (private windows, file:// in some browsers,
   blocked site data) and may throw on access, so every read and write is
   guarded and the page renders correctly with no stored value.
   ========================================================================== */

(function () {
  'use strict';

  var KEY = 'algos-progress:' + (document.title || 'doc');

  function load() {
    try {
      var raw = window.localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function save(state) {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {
      /* Non-fatal: the checklist still works for this session. */
    }
  }

  function boot() {
    var items = Array.prototype.slice.call(document.querySelectorAll('[data-track]'));
    if (!items.length) return;

    var state = load();

    function refresh() {
      var done = items.filter(function (el) { return el.dataset.done === 'true'; }).length;
      document.querySelectorAll('[data-track-summary]').forEach(function (el) {
        var bs = el.querySelectorAll('b');
        if (bs.length >= 2) {
          bs[0].textContent = String(done);
          bs[1].textContent = String(items.length);
        }
      });
      document.querySelectorAll('[data-track-bar]').forEach(function (el) {
        el.style.width = (items.length ? (done / items.length) * 100 : 0) + '%';
      });
    }

    items.forEach(function (el) {
      var id = el.dataset.track;

      var box = document.createElement('button');
      box.type = 'button';
      box.className = 'track-box';
      box.setAttribute('aria-label', 'mark done');

      el.insertBefore(box, el.firstChild);

      function apply(done) {
        el.dataset.done = done ? 'true' : 'false';
        box.textContent = done ? '✓' : '';
        box.setAttribute('aria-pressed', done ? 'true' : 'false');
      }

      apply(state[id] === true);

      box.addEventListener('click', function () {
        var next = el.dataset.done !== 'true';
        apply(next);
        state[id] = next;
        save(state);
        refresh();
      });
    });

    refresh();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
