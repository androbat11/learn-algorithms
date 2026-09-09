#!/usr/bin/env node
/* ==========================================================================
   run.mjs — the practice CLI. No dependencies; Node 18+ only.

     npm test                 run every problem you have started
     npm test -- 04           run one problem (id, or any part of its name)
     npm test -- --all        run everything, including untouched stubs
     npm run list             the ladder, with what you have started
     npm run next             what to do now
     npm run reset -- 04      restore the stub, keeping a copy of your attempt
     npm run drill            cold re-solve of something you already solved
     npm run solution -- 04   print the reference solution
   ========================================================================== */

import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { PROBLEMS } from './lib/registry.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const dirOf = (p) => join(HERE, 'problems', `${p.id}-${p.slug}`);
const read = (f) => (existsSync(f) ? readFileSync(f, 'utf8') : '');

const c = {
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
};

/** Untouched means solution.mjs is still byte-identical to the stub. */
const started = (p) => {
  const d = dirOf(p);
  return read(join(d, 'solution.mjs')).trim() !== read(join(d, 'template.mjs')).trim();
};

function resolve(query) {
  if (!query) return null;
  const q = String(query).toLowerCase();
  const hits = PROBLEMS.filter(
    (p) => p.id === q.padStart(2, '0') || p.slug.includes(q) || p.title.toLowerCase().includes(q)
  );
  if (hits.length === 0) {
    console.error(c.red(`No problem matches "${query}".`) + ' Try: npm run list');
    process.exit(1);
  }
  if (hits.length > 1) {
    console.error(c.red(`"${query}" is ambiguous:`));
    for (const h of hits) console.error(`  ${h.id}  ${h.title}`);
    process.exit(1);
  }
  return hits[0];
}

function runTests(list) {
  if (list.length === 0) {
    console.log(
      `\nNothing started yet. ${c.bold('npm run next')} will tell you where to begin.\n`
    );
    return 0;
  }
  const files = list.map((p) => join(dirOf(p), 'tests.mjs'));
  const r = spawnSync(process.execPath, ['--test', ...files], { stdio: 'inherit' });
  return r.status ?? 1;
}

/* --- commands ----------------------------------------------------------- */

function cmdTest(args) {
  if (args.includes('--all')) process.exit(runTests(PROBLEMS));
  const target = args.find((a) => !a.startsWith('-'));
  if (target) process.exit(runTests([resolve(target)]));
  process.exit(runTests(PROBLEMS.filter(started)));
}

function cmdList() {
  console.log(`\n  ${c.bold('The ladder')}   ${c.dim('· ordered by what each one needs · npm test -- <id>')}\n`);
  const trim = (t, w) => (t.length > w ? t.slice(0, w - 1) + '…' : t);
  for (const p of PROBLEMS) {
    const mark = started(p) ? c.green('●') : c.dim('○');
    const needs = p.needs ? ` needs ${p.needs}` : '';
    console.log(
      `  ${mark} ${c.bold(p.id)}  ${trim(p.title, 40).padEnd(41)}` +
      c.dim(`${p.topic.padEnd(16)}${needs}`)
    );
  }
  const n = PROBLEMS.filter(started).length;
  console.log(
    `\n  ${c.green('●')} started (${n})   ${c.dim('○')} untouched (${PROBLEMS.length - n})\n`
  );
}

function cmdNext() {
  const todo = PROBLEMS.find((p) => !started(p));
  if (!todo) {
    console.log(`\n  All ${PROBLEMS.length} started. Time to re-solve one cold: ${c.bold('npm run drill')}\n`);
    return;
  }
  console.log(`\n  ${c.bold(`${todo.id}. ${todo.title}`)}   ${c.dim(todo.topic)}`);
  if (todo.needs) console.log(`  ${c.yellow(`Assumes ${todo.needs}`)} — skip ahead if you would rather.`);
  console.log(`\n  Read     ${c.cyan(join('problems', `${todo.id}-${todo.slug}`, 'README.md'))}`);
  console.log(`  Write    ${c.cyan(join('problems', `${todo.id}-${todo.slug}`, 'solution.mjs'))}`);
  console.log(`  Run      ${c.cyan(`npm test -- ${todo.id}`)}`);
  console.log(`\n  ${c.dim('Fill in the contract block first. Bounds must end in a verdict.')}\n`);
}

function archive(p) {
  const d = dirOf(p);
  const current = read(join(d, 'solution.mjs'));
  if (!current.trim()) return null;
  const box = join(HERE, '.attempts');
  mkdirSync(box, { recursive: true });
  const stamp = new Date().toISOString().slice(0, 16).replace(/[:T]/g, '-');
  const f = join(box, `${p.id}-${p.slug}-${stamp}.mjs`);
  writeFileSync(f, current);
  return f;
}

function cmdReset(args) {
  const p = resolve(args.find((a) => !a.startsWith('-')));
  if (!p) {
    console.error(c.red('Which problem? e.g. npm run reset -- 04'));
    process.exit(1);
  }
  const d = dirOf(p);
  const saved = started(p) ? archive(p) : null;
  writeFileSync(join(d, 'solution.mjs'), read(join(d, 'template.mjs')));
  console.log(`\n  ${p.id}. ${p.title} reset to the stub.`);
  if (saved) console.log(c.dim(`  Your attempt is kept at ${saved.replace(HERE + '/', '')}`));
  console.log('');
}

function cmdDrill() {
  const candidates = PROBLEMS.filter(started);
  if (candidates.length === 0) {
    console.log(`\n  Nothing to drill yet — solve something first. ${c.bold('npm run next')}\n`);
    return;
  }
  console.log(c.dim('\n  Checking which problems currently pass…'));
  const passing = candidates.filter((p) => {
    const r = spawnSync(process.execPath, ['--test', join(dirOf(p), 'tests.mjs')], {
      stdio: 'ignore',
    });
    return r.status === 0;
  });
  const pool = passing.length ? passing : candidates;
  const pick = pool[Math.floor(Math.random() * pool.length)];
  const saved = archive(pick);
  writeFileSync(join(dirOf(pick), 'solution.mjs'), read(join(dirOf(pick), 'template.mjs')));

  console.log(`\n  ${c.bold('Cold re-solve')}: ${pick.id}. ${pick.title}`);
  console.log(`\n  Your working solution has been moved aside and the file reset to a stub.`);
  if (saved) console.log(c.dim(`  It is safe at ${saved.replace(HERE + '/', '')}`));
  console.log(`\n  Write     ${c.cyan(join('problems', `${pick.id}-${pick.slug}`, 'solution.mjs'))}`);
  console.log(`  Run       ${c.cyan(`npm test -- ${pick.id}`)}`);
  console.log(
    `\n  ${c.dim('Solving it a second time from nothing is worth more than three new')}` +
    `\n  ${c.dim('problems. That is the whole point of spacing.')}\n`
  );
}

function cmdSolution(args) {
  const p = resolve(args.find((a) => !a.startsWith('-')));
  if (!p) {
    console.error(c.red('Which problem? e.g. npm run solution -- 04'));
    process.exit(1);
  }
  if (!started(p)) {
    console.log(
      `\n  ${c.yellow('You have not attempted this one yet.')}\n` +
      `  Reading the answer first is the single most reliable way to feel like you\n` +
      `  learned something and retain none of it. Write something that fails first.\n\n` +
      `  If you really want it: ${c.bold(`npm run solution -- ${p.id} --force`)}\n`
    );
    if (!args.includes('--force')) return;
  }
  const f = join(HERE, 'solutions', `${p.id}-${p.slug}.mjs`);
  console.log('\n' + read(f));
}

/* --- dispatch ----------------------------------------------------------- */

const [cmd, ...rest] = process.argv.slice(2);
switch (cmd) {
  case 'list': cmdList(); break;
  case 'next': cmdNext(); break;
  case 'reset': cmdReset(rest); break;
  case 'drill': cmdDrill(); break;
  case 'solution': cmdSolution(rest); break;
  case 'test': case undefined: cmdTest(rest); break;
  default: cmdTest([cmd, ...rest]);
}
