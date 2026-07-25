/**
 * Vite plugin that keeps the generated HTML in sync while `vp dev` is running.
 *
 * The site is generated *in place* (the repo root is also the deploy root), so the
 * plugin regenerates on every source change and lets Vite's own watcher pick up the
 * resulting HTML and trigger the reload.
 */

import path from 'node:path';
import type { Plugin } from 'vite';
import { PAGES } from './config.ts';
import { buildSite, REPO_ROOT } from './build.ts';

const GENERATED: Record<string, true> = Object.fromEntries(
  PAGES.map((page) => [path.join(REPO_ROOT, page.exportTo), true]),
);

/** Sources that feed the generator: page markdown, templates, and the generator itself. */
function isSource(file: string): boolean {
  if (GENERATED[file]) return false;
  const rel = path.relative(REPO_ROOT, file);
  if (rel.startsWith('..')) return false;
  return (
    rel.endsWith('.md') ||
    rel.startsWith(`templates${path.sep}`) ||
    rel.startsWith(`src${path.sep}site${path.sep}`)
  );
}

export function siteGenerator(): Plugin {
  return {
    name: 'ai-safety-dance:generate',
    async buildStart() {
      await buildSite();
    },
    configureServer(server) {
      const regenerate = async (file: string) => {
        if (!isSource(file)) return;
        try {
          await buildSite();
          server.config.logger.info(`  ⟳ rebuilt from ${path.relative(REPO_ROOT, file)}`, {
            timestamp: true,
          });
        } catch (error) {
          server.config.logger.error(`  ✗ build failed: ${(error as Error).message}`, {
            timestamp: true,
          });
        }
      };
      server.watcher.on('add', regenerate);
      server.watcher.on('change', regenerate);
    },
  };
}
