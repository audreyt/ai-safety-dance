/**
 * Markdown → HTML, plus the handful of post-processing passes the site needs.
 *
 * Pure: no disk access, so the whole pipeline is unit-testable.
 */

import MarkdownIt from 'markdown-it';
import footnotePlugin from 'markdown-it-footnote';
import type nunjucks from 'nunjucks';

const md = new MarkdownIt({ html: true }).use(footnotePlugin);

/**
 * Orbit review areas persist scheduling state per UID. In production Orbit infers the
 * UID from the page URL, but a page opened over `file://` infers `null` and silently
 * loses review history, so pin the production URL at build time.
 */
export function orbitUidFor(origin: string, exportTo: string): string {
  const base = origin.replace(/\/*$/, '/');
  if (exportTo === 'index.html') return base;
  if (exportTo.endsWith('/index.html')) {
    return base + exportTo.slice(0, -'/index.html'.length).replace(/^\//, '') + '/';
  }
  return base + exportTo.replace(/^\//, '');
}

export interface RenderMarkdownOptions {
  /** Nunjucks variables available to `{{ }}` / `{% %}` inside the markdown. */
  data: Record<string, unknown>;
  /** Absolute Orbit UID for this page. */
  orbitUid: string;
  /** Nunjucks environment (carries the template search path for `{% include %}`). */
  env: nunjucks.Environment;
}

export function renderMarkdown(source: string, options: RenderMarkdownOptions): string {
  const html = md
    .render(source)
    // The stylesheet targets `<i>`, not `<em>`. Rewrite the tag names only — the word
    // "them" in body copy must survive, which an unanchored /\bem>/ would mangle.
    .replace(/<(\/?)em>/g, '<$1i>');

  return (
    options.env
      .renderString(html, options.data)
      .replace(
        /<orbit-reviewarea(?![^>]*\buid=)([^>]*)>/g,
        `<orbit-reviewarea uid="${options.orbitUid}"$1>`,
      )
      // Orbit prompt attributes are plain text/markdown; raw HTML inside an attribute
      // value breaks Orbit's parser, so downgrade the two emphasis tags we use.
      // The tag pattern steps over complete quoted values, because the `>` of an
      // inner `<i>` would otherwise end the match and strip only the opening tag.
      .replace(/<orbit-prompt(?:[^>"]|"[^"]*")*>/g, (tag) =>
        // `\b[^>]*` rather than a bare `<i>`, so the tag still matches once
        // `markEmphasisScript` has put a class on it.
        tag.replace(/<\/?i\b[^>]*>/g, '_').replace(/<\/?b\b[^>]*>/g, '**'),
      )
  );
}

/** A run this long is a whole clause; dotting every character of it is shouting. */
const LONGEST_EMPHASIS = 40;

/**
 * Marks emphasis runs that contain 漢字, so the stylesheet can set them the way
 * Chinese actually marks emphasis.
 *
 * Slanting 漢字 is not a Chinese convention — and none of the CJK families in our
 * stack ships an italic face, so `<i>` around Chinese produced a synthetic oblique
 * that is both ugly and nearly invisible. Taiwan uses 著重號, dots set under the
 * emphasised characters. Latin-only runs (`<i>AlphaGo</i>`) keep a true italic,
 * which is why this has to be decided per run and cannot live in CSS: every
 * element on the page inherits `lang="zh-TW"`, so `:lang()` cannot tell them apart.
 *
 * THE SIGNAL IS THE TAG, NOT A CLASS, AND THAT IS LOAD-BEARING. Nutshell re-renders
 * every expandable section through DOMPurify with
 * `FORBID_ATTR: ['style','id','class']` (scripts/nutshell-v1.0.5.js:968), so a
 * class-based marker is stripped inside every bubble — Chinese silently reverted to
 * fake oblique in exactly the place a reader had expanded to look more closely.
 * `<em>` is on DOMPurify's default allow-list and survives untouched.
 *
 * The source also uses `<i>` for a second, different job: whole-paragraph asides
 * ("hey, if you were linked straight here…"). Those stay `<i>` and take `.aside` —
 * upright and quietened, because 著重號 under sixty consecutive characters is not
 * emphasis, it is noise. Median run on these pages is two characters; the tail runs
 * past 130. If a bubble strips that class the run still renders upright, because
 * `font-synthesis-style: none` denies the browser a fake oblique to fall back on.
 */
export function markEmphasisScript(html: string): string {
  // Emphasis never nests here, and markdown-it escapes any `<i>` written inside an
  // attribute value, so a flat scan is safe. Script and style blocks are skipped.
  const RUN = /<(script|style)\b[\s\S]*?<\/\1>|<i>((?:(?!<\/?i>)[\s\S])*)<\/i>/g;
  return html.replace(
    RUN,
    (match, blockTag: string | undefined, inner: string | undefined, offset: number) => {
      if (blockTag !== undefined || inner === undefined) return match;
      const text = inner.replace(/<[^>]*>/g, '');
      if (!/[\u3400-\u9fff\uf900-\ufaff]/.test(text)) return match;
      const fillsItsParagraph =
        html.startsWith('<p>', offset - 3) && html.startsWith('</p>', offset + match.length);
      const aside = fillsItsParagraph || text.length > LONGEST_EMPHASIS;
      return aside ? `<i class="aside">${inner}</i>` : `<em>${inner}</em>`;
    },
  );
}
