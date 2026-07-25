import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { PAGES } from '../src/site/config.ts';
import { REPO_ROOT } from '../src/site/build.ts';
import { danglingFragments, extractInvariants } from '../src/site/invariants.ts';

const chapters = PAGES.map((page) => ({
  name: page.markdown,
  dir: path.dirname(path.join(REPO_ROOT, page.markdown)),
  source: readFileSync(path.join(REPO_ROOT, page.markdown), 'utf-8'),
}));

describe.each(chapters)('$name', ({ dir, source }) => {
  const invariants = extractInvariants(source);

  it('defines every footnote it cites', () => {
    const defined = new Set(invariants.footnoteDefinitions);
    const undefinedRefs = [...new Set(invariants.footnoteReferences)].filter(
      (label) => !defined.has(label),
    );
    expect(undefinedRefs).toEqual([]);
  });

  it('cites every footnote it defines', () => {
    const cited = new Set(invariants.footnoteReferences);
    expect(invariants.footnoteDefinitions.filter((label) => !cited.has(label))).toEqual([]);
  });

  it('defines each footnote exactly once', () => {
    expect(new Set(invariants.footnoteDefinitions).size).toBe(
      invariants.footnoteDefinitions.length,
    );
  });

  it('resolves every in-page link to a heading or an id', () => {
    // Nutshell matches on Latin characters only, so a translated `:x` heading would
    // silently turn its expandable into a "no section matches" error bubble.
    expect(danglingFragments(invariants)).toEqual([]);
  });

  it('points every image at a file that exists', () => {
    const missing = invariants.images
      .filter((src) => !/^(https?:)?\/\//.test(src))
      .map((src) => decodeURIComponent(src))
      .filter((src) => !existsSync(path.resolve(dir, src)));
    expect(missing).toEqual([]);
  });

  it('pairs every orbit-reviewarea with at least one prompt', () => {
    expect(invariants.orbitPrompts).toBeGreaterThanOrEqual(invariants.orbitReviewAreas);
  });
});
