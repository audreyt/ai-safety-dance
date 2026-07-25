/**
 * Structural facts about a chapter's markdown that must survive any edit to its prose.
 *
 * Translating this book means rewriting nearly every sentence, and the machinery the
 * page depends on is embedded in that prose: Littlefoot footnotes, Nutshell expandables
 * that resolve by heading text, Nunjucks includes, Orbit flashcards, and image paths.
 * A rewrite that drops one of those fails silently in the browser, so the numbers below
 * are asserted in `tests/content.test.ts` and diffable across a rewrite.
 */

export interface ChapterInvariants {
  /** `[^label]: …` definitions, in document order. */
  footnoteDefinitions: string[];
  /** `[^label]` references, in document order (a label may repeat). */
  footnoteReferences: string[];
  /** Fragments targeted by in-page links, e.g. `FourObjects`. */
  fragmentTargets: string[];
  /** Raw text of `:x …` headings, which is what Nutshell resolves anchors against. */
  nutshellHeadings: string[];
  /** Ordinary headings, whose anchors `scripts/page.js` derives from the heading text. */
  headings: string[];
  /** Explicit `id="…"` attributes in inline HTML. */
  htmlIds: string[];
  /** Every `![alt](path)` target. */
  images: string[];
  /** Every `{% … %}` and `{{ … }}` tag, verbatim. */
  nunjucksTags: string[];
  /** Counts of the custom elements Orbit needs. */
  orbitReviewAreas: number;
  orbitPrompts: number;
  /** Per inline tag name, how many opens are left unclosed (0 means balanced). */
  unbalancedInlineTags: Record<string, number>;
}

const FOOTNOTE_DEFINITION = /^\[\^([^\]]+)\]:/gm;
const FOOTNOTE_REFERENCE = /\[\^([^\]]+)\](?!:)/g;
const FRAGMENT_TARGET = /\]\(#([^)\s]+)\)/g;
const HEADING = /^#{1,6}\s+(.*)$/gm;
const HTML_ID = /\bid="([^"]+)"/g;
const IMAGE = /!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
const NUNJUCKS_TAG = /\{[{%][\s\S]*?[%}]\}/g;
/**
 * Inline tags authors hand-write in the markdown. An unclosed one does not fail the
 * build — the browser silently reparents the rest of the article inside it, which is
 * how `<i>(來自 …)*` in the intro ended up italicising everything after it.
 */
const INLINE_TAGS = ['i', 'b', 's', 'u', 'span', 'sup', 'sub'];

export function extractInvariants(markdown: string): ChapterInvariants {
  const all = (pattern: RegExp): string[] => [...markdown.matchAll(pattern)].map((m) => m[1] ?? '');
  const allHeadings = all(HEADING).map((heading) => heading.trim());

  const unbalancedInlineTags: Record<string, number> = {};
  for (const tag of INLINE_TAGS) {
    const opens = markdown.match(new RegExp(`<${tag}\\b[^>]*>`, 'g'))?.length ?? 0;
    const closes = markdown.match(new RegExp(`</${tag}>`, 'g'))?.length ?? 0;
    if (opens !== closes) unbalancedInlineTags[tag] = opens - closes;
  }

  return {
    footnoteDefinitions: all(FOOTNOTE_DEFINITION),
    footnoteReferences: all(FOOTNOTE_REFERENCE),
    fragmentTargets: all(FRAGMENT_TARGET),
    nutshellHeadings: allHeadings.filter((heading) => heading.startsWith(':')),
    headings: allHeadings.filter((heading) => !heading.startsWith(':')),
    htmlIds: all(HTML_ID),
    images: all(IMAGE),
    nunjucksTags: [...markdown.matchAll(NUNJUCKS_TAG)].map((match) => match[0]),
    orbitReviewAreas: [...markdown.matchAll(/<orbit-reviewarea\b/g)].length,
    orbitPrompts: [...markdown.matchAll(/<orbit-prompt\b/g)].length,
    unbalancedInlineTags,
  };
}

/**
 * Nutshell resolves `#SomeAnchor` by lowercasing both sides, stripping everything but
 * `[a-z0-9]`, and testing containment (nutshell-v1.0.5.js `_forgivingMatchTest`). So an
 * anchor heading must keep its Latin text even when the surrounding prose is translated.
 */
export function nutshellKey(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/** The `#fragment` `scripts/page.js` generates for an ordinary heading. */
export function headingSlug(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\p{L}\p{N}-]/gu, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/** In-page links whose target no heading or `id` on the page can satisfy. */
export function danglingFragments(invariants: ChapterInvariants): string[] {
  const nutshellKeys = invariants.nutshellHeadings.map(nutshellKey);
  const slugs = new Set(invariants.headings.map(headingSlug));
  const ids = new Set(invariants.htmlIds);

  return [...new Set(invariants.fragmentTargets)].filter((target) => {
    if (ids.has(target) || slugs.has(headingSlug(decodeURIComponent(target)))) return false;
    const key = nutshellKey(target);
    return key.length > 0 && !nutshellKeys.some((heading) => heading.includes(key));
  });
}
