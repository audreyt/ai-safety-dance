#!/usr/bin/env node
/**
 * Diffs one chapter's structure *and* its shape against a git revision.
 *
 * Rewriting a chapter's prose touches nearly every line, and the page machinery lives
 * inside that prose. Structural checks catch a dropped footnote; the block checks catch
 * the quieter failure where a rewrite silently summarises away an aside. Run after a
 * rewrite to prove nothing load-bearing moved:
 *
 *     node scripts/check-chapter.ts p2/p2.md          # vs HEAD
 *     node scripts/check-chapter.ts p2/p2.md upstream/main
 */

import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { REPO_ROOT } from '../src/site/build.ts';
import { danglingFragments, extractInvariants } from '../src/site/invariants.ts';

const [file, revision = 'HEAD'] = process.argv.slice(2);
if (!file) {
  console.error('usage: check-chapter.ts <markdown-path> [git-revision]');
  process.exit(2);
}

const nowText = readFileSync(path.join(REPO_ROOT, file), 'utf-8');
const beforeText = execFileSync('git', ['show', `${revision}:${file}`], {
  cwd: REPO_ROOT,
  encoding: 'utf-8',
});
const now = extractInvariants(nowText);
const before = extractInvariants(beforeText);

/** Blank-line-separated blocks: paragraphs, list runs, HTML islands, headings. */
const blocks = (text: string): string[] =>
  text
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

/** How much a block actually says: CJK characters plus Latin/number words. */
const weight = (block: string): number =>
  (block.match(/[\u3400-\u9fff\uf900-\ufaff]/g)?.length ?? 0) +
  (block.match(/[A-Za-z0-9]+/g)?.length ?? 0);

const problems: string[] = [];

const compare = (label: string, was: string[], is: string[], ordered = false) => {
  const lost = was.filter((item) => !is.includes(item));
  const gained = is.filter((item) => !was.includes(item));
  if (lost.length) problems.push(`${label}: lost ${JSON.stringify(lost)}`);
  if (gained.length) problems.push(`${label}: gained ${JSON.stringify(gained)}`);
  if (ordered && !lost.length && !gained.length && was.join('\u0000') !== is.join('\u0000')) {
    problems.push(`${label}: reordered`);
  }
};

compare('footnote definitions', before.footnoteDefinitions, now.footnoteDefinitions, true);
compare('footnote references', before.footnoteReferences, now.footnoteReferences, true);
compare('in-page links', before.fragmentTargets, now.fragmentTargets);
compare('nutshell headings', before.nutshellHeadings, now.nutshellHeadings);
compare('html ids', before.htmlIds, now.htmlIds);
compare('images', before.images, now.images);
compare('nunjucks tags', before.nunjucksTags, now.nunjucksTags);

if (before.orbitReviewAreas !== now.orbitReviewAreas) {
  problems.push(`orbit review areas: ${before.orbitReviewAreas} → ${now.orbitReviewAreas}`);
}
if (before.orbitPrompts !== now.orbitPrompts) {
  problems.push(`orbit prompts: ${before.orbitPrompts} → ${now.orbitPrompts}`);
}

const dangling = danglingFragments(now);
if (dangling.length) problems.push(`unresolvable in-page links: ${JSON.stringify(dangling)}`);

// Heading levels, in order. The text may be rewritten; the outline may not move.
const outline = (text: string) =>
  [...text.matchAll(/^(#{1,6})\s/gm)].map((match) => match[1]?.length ?? 0);
const wasOutline = outline(beforeText).join(',');
const isOutline = outline(nowText).join(',');
if (wasOutline !== isOutline) {
  problems.push(`heading outline changed:\n      was ${wasOutline}\n      now ${isOutline}`);
}

const wasBlocks = blocks(beforeText);
const isBlocks = blocks(nowText);
if (wasBlocks.length !== isBlocks.length) {
  problems.push(
    `block count: ${wasBlocks.length} → ${isBlocks.length} (a paragraph was dropped or merged)`,
  );
} else {
  for (const [index, wasBlock] of wasBlocks.entries()) {
    const wasWeight = weight(wasBlock);
    const isWeight = weight(isBlocks[index] ?? '');
    if (wasWeight < 25) continue; // short blocks swing wildly for innocent reasons
    const ratio = isWeight / wasWeight;
    if (ratio < 0.6 || ratio > 1.6) {
      problems.push(
        `block ${index + 1} weight ${wasWeight} → ${isWeight} (${ratio.toFixed(2)}×)\n` +
          `      was: ${wasBlock.slice(0, 90).replace(/\n/g, ' ')}\n` +
          `      now: ${(isBlocks[index] ?? '').slice(0, 90).replace(/\n/g, ' ')}`,
      );
    }
  }
}

if (problems.length) {
  console.error(`✗ ${file} drifted from ${revision}:`);
  for (const problem of problems) console.error(`  - ${problem}`);
  process.exit(1);
}

console.log(
  `✓ ${file} matches ${revision} structurally ` +
    `(${wasBlocks.length} blocks, ${now.footnoteDefinitions.length} footnotes, ` +
    `${now.fragmentTargets.length} in-page links, ${now.images.length} images, ` +
    `${now.orbitPrompts} orbit prompts)`,
);
