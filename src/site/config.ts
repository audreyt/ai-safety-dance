/**
 * Single source of truth for the site: where it lives, and what pages it has.
 *
 * `build.js` used to hard-code the production origin in two places (Orbit UIDs and
 * social-share images) and a third in the page template (analytics). All three now
 * derive from `SITE_ORIGIN`, which must stay in sync with `CNAME`.
 */

export const SITE_ORIGIN = 'https://ai.audreyt.org';

/** Bare host, for analytics and canonical URLs. */
export const SITE_HOST = SITE_ORIGIN.replace(/^https?:\/\//, '');

export const SITE_TITLE = '寫給有血有肉的人類的 AI 安全指南';

/** Which of the mutually-exclusive chapter flags a page carries. */
export type PageKind = 'frontpage' | 'p1' | 'p2' | 'p3';

export interface PageConfig {
  /** Markdown source, relative to the repo root. */
  markdown: string;
  /** Nunjucks template, relative to the repo root. */
  template: string;
  /** Output path, relative to the repo root. */
  exportTo: string;
  kind: PageKind;
  title: string;
  shareDesc: string;
  /** Share image path relative to the site root, e.g. `thumbs/thumb.png`. */
  shareImage: string;
  /** Prefix that gets a page back to the site root (`''` or `'../'`). */
  root: string;
}

export const PAGES: readonly PageConfig[] = [
  {
    markdown: 'intro.md',
    template: 'templates/page_template.html',
    exportTo: 'index.html',
    kind: 'frontpage',
    title: SITE_TITLE,
    shareDesc: '一次搞懂 AI 與 AI 安全的所有核心概念。',
    shareImage: 'thumbs/thumb.png',
    root: '',
  },
  {
    markdown: 'p1/p1.md',
    template: 'templates/page_template.html',
    exportTo: 'p1/index.html',
    kind: 'p1',
    title: '第一章：過去、現在，與可能的未來',
    shareDesc: `第一章 — ${SITE_TITLE}`,
    shareImage: 'thumbs/thumb-p1.png',
    root: '../',
  },
  {
    markdown: 'p2/p2.md',
    template: 'templates/page_template.html',
    exportTo: 'p2/index.html',
    kind: 'p2',
    title: '第二章：問題',
    shareDesc: `第二章 — ${SITE_TITLE}`,
    shareImage: 'thumbs/thumb-p2.png',
    root: '../',
  },
  {
    markdown: 'p3/p3.md',
    template: 'templates/page_template.html',
    exportTo: 'p3/index.html',
    kind: 'p3',
    title: '第三章：可能的解方',
    shareDesc: `第三章 — ${SITE_TITLE}`,
    shareImage: 'thumbs/thumb-p3.png',
    root: '../',
  },
];
