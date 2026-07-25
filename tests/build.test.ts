import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { PAGES, SITE_ORIGIN } from '../src/site/config.ts';
import { REPO_ROOT, createEnv, renderPage } from '../src/site/build.ts';

const env = createEnv();
const rendered = new Map<string, string>();
async function html(exportTo: string): Promise<string> {
  const cached = rendered.get(exportTo);
  if (cached) return cached;
  const page = PAGES.find((candidate) => candidate.exportTo === exportTo);
  if (!page) throw new Error(`no page ${exportTo}`);
  const output = await renderPage(page, env);
  rendered.set(exportTo, output);
  return output;
}

describe('page manifest', () => {
  it('declares one page per chapter with unique outputs', () => {
    expect(PAGES.map((page) => page.kind)).toEqual(['frontpage', 'p1', 'p2', 'p3']);
    expect(new Set(PAGES.map((page) => page.exportTo)).size).toBe(PAGES.length);
  });

  it('gives nested pages a root prefix that escapes their directory', () => {
    for (const page of PAGES) {
      const depth = page.exportTo.split('/').length - 1;
      expect(page.root).toBe('../'.repeat(depth));
    }
  });
});

describe.each(PAGES.map((page) => page.exportTo))('%s', (exportTo) => {
  it('is a complete zh-TW document', async () => {
    const output = await html(exportTo);
    expect(output.startsWith('<!DOCTYPE html>')).toBe(true);
    expect(output).toContain('<html lang="zh-TW"');
    expect(output.trimEnd().endsWith('</script>')).toBe(true);
  });

  it('carries absolute social-share metadata', async () => {
    const output = await html(exportTo);
    expect(output).toContain(`<meta property="og:image" content="${SITE_ORIGIN}/thumbs/`);
  });

  it('resolves every local asset relative to its own directory', async () => {
    const page = PAGES.find((candidate) => candidate.exportTo === exportTo);
    const output = await html(exportTo);
    // A missing `{{root}}` would emit `href="styles/…"` on a nested page and 404.
    expect(output).toContain(`href="${page?.root}styles/page.css"`);
  });

  it('marks exactly one chapter tab as selected', async () => {
    const output = await html(exportTo);
    expect([...output.matchAll(/<div selected/g)]).toHaveLength(1);
  });

  it('leaves no unparsed **bold** markers in the prose', async () => {
    // CommonMark: a closing `**` preceded by punctuation and followed by a letter
    // is not right-flanking, so `**看這裡：**然後` never closes and both markers
    // ship to the reader. Full-width CJK punctuation hits this constantly.
    // Orbit flashcards are excluded — Orbit renders that markdown itself.
    const prose = (await html(exportTo)).replace(
      /<orbit-reviewarea[\s\S]*?<\/orbit-reviewarea>/g,
      '',
    );
    expect(prose.match(/\*\*[^*\n]{0,80}/g) ?? []).toEqual([]);
  });

  it('leaves no unparsed _italic_ markers in the prose', async () => {
    // `_` is stricter than `*`: CommonMark forbids intraword `_`, and every 漢字
    // counts as a word character, so `創造物_一起成長_。` can never open — there is
    // no space anywhere to flank against. Use `<i>` next to CJK, never `_`.
    const page = await html(exportTo);
    const article = /<article id="content">([\s\S]*?)<\/article>/.exec(page)?.[1] ?? '';
    const prose = article
      .replace(/<orbit-reviewarea[\s\S]*?<\/orbit-reviewarea>/g, '')
      .replace(/<[^>]*>/g, '');
    // Identifiers (`Robot_1`) and the `¯\_(ツ)_/¯` shrug keep their underscores;
    // only a CJK-touching pair with no inner whitespace is a failed emphasis.
    const leaked = (prose.match(/_[^_\s\n]{1,40}?_/g) ?? []).filter(
      (span) => /[\u3400-\u9fff]/.test(span) && !/^_\d/.test(span),
    );
    expect(leaked).toEqual([]);
  });
});

describe('frontpage', () => {
  it('embeds the signup form pulled in from the markdown', async () => {
    expect(await html('index.html')).toContain('data-fillout-id');
  });

  it('pins the Orbit UID to the production URL', async () => {
    expect(await html('index.html')).toContain(`uid="${SITE_ORIGIN}/"`);
  });
});

describe('checked-in output', () => {
  it('matches what the generator produces right now', async () => {
    for (const page of PAGES) {
      const onDisk = await readFile(path.join(REPO_ROOT, page.exportTo), 'utf-8');
      expect(onDisk, `${page.exportTo} is stale — run \`npm run build\``).toBe(
        await html(page.exportTo),
      );
    }
  });
});
