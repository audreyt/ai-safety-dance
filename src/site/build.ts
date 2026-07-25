/**
 * Renders every page in the manifest to static HTML at the repo root.
 *
 * The site is served straight from the repository (GitHub Pages, root directory), so
 * the build writes in place rather than into `dist/`.
 */

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import nunjucks from 'nunjucks';
import { PAGES, SITE_HOST, SITE_ORIGIN, type PageConfig } from './config.ts';
import { markEmphasisScript, orbitUidFor, renderMarkdown } from './markdown.ts';

export const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

export function createEnv(rootDir: string = REPO_ROOT): nunjucks.Environment {
  return new nunjucks.Environment(new nunjucks.FileSystemLoader(rootDir, { noCache: true }), {
    autoescape: false,
  });
}

/** Template variables shared by the markdown pass and the page-template pass. */
export function templateData(page: PageConfig): Record<string, unknown> {
  return {
    title: page.title,
    share_desc: page.shareDesc,
    share_image: `${SITE_ORIGIN}/${page.shareImage}`,
    site_host: SITE_HOST,
    root: page.root,
    isFrontpage: page.kind === 'frontpage',
    isPartOne: page.kind === 'p1',
    isPartTwo: page.kind === 'p2',
    isPartThree: page.kind === 'p3',
  };
}

export async function renderPage(
  page: PageConfig,
  env: nunjucks.Environment,
  rootDir: string = REPO_ROOT,
): Promise<string> {
  const source = await readFile(path.join(rootDir, page.markdown), 'utf-8');
  const data = templateData(page);
  data.content = renderMarkdown(source, {
    data,
    env,
    orbitUid: orbitUidFor(SITE_ORIGIN, page.exportTo),
  });
  // Runs over the whole page, not just the article, so the sidebar, footer and
  // post-credits teasers get the same 著重號 treatment as the chapter prose.
  return markEmphasisScript(env.render(page.template, data));
}

export async function buildSite(rootDir: string = REPO_ROOT): Promise<string[]> {
  const env = createEnv(rootDir);
  return Promise.all(
    PAGES.map(async (page) => {
      const html = await renderPage(page, env, rootDir);
      await writeFile(path.join(rootDir, page.exportTo), html);
      return page.exportTo;
    }),
  );
}
