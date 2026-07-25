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
        tag.replace(/<\/?i>/g, '_').replace(/<\/?b>/g, '**'),
      )
  );
}
