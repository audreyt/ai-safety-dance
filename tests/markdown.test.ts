import { describe, expect, it } from 'vitest';
import { orbitUidFor, renderMarkdown } from '../src/site/markdown.ts';
import { createEnv } from '../src/site/build.ts';

const env = createEnv();
const render = (source: string, data: Record<string, unknown> = {}) =>
  renderMarkdown(source, { data, env, orbitUid: 'https://example.test/' });

describe('orbitUidFor', () => {
  it('maps the frontpage to the bare origin', () => {
    expect(orbitUidFor('https://aisafety.dance', 'index.html')).toBe('https://aisafety.dance/');
  });

  it('maps a directory index to its directory URL', () => {
    expect(orbitUidFor('https://aisafety.dance', 'p1/index.html')).toBe(
      'https://aisafety.dance/p1/',
    );
  });

  it('maps a loose file to its path', () => {
    expect(orbitUidFor('https://aisafety.dance', 'extras.html')).toBe(
      'https://aisafety.dance/extras.html',
    );
  });

  it('tolerates a trailing slash on the origin', () => {
    expect(orbitUidFor('https://aisafety.dance/', 'index.html')).toBe('https://aisafety.dance/');
  });
});

describe('renderMarkdown', () => {
  it('renders emphasis as <i> because the stylesheet targets <i>', () => {
    expect(render('*yes*')).toContain('<i>yes</i>');
  });

  it('leaves words ending in "em" alone', () => {
    // A naive /\bem>/ rewrite corrupts "them>" and similar; guard the boundary.
    expect(render('them> and stem>')).toContain('them&gt; and stem&gt;');
  });

  it('pins an Orbit UID on review areas that lack one', () => {
    expect(render('<orbit-reviewarea color="blue"></orbit-reviewarea>')).toContain(
      '<orbit-reviewarea uid="https://example.test/" color="blue">',
    );
  });

  it('never overwrites an Orbit UID that is already set', () => {
    const html = render('<orbit-reviewarea uid="custom"></orbit-reviewarea>');
    expect(html).toContain('uid="custom"');
    expect(html).not.toContain('https://example.test/');
  });

  it('expands nunjucks variables embedded in the markdown', () => {
    expect(render('Root is {{ root }}.', { root: '../' })).toContain('Root is ../.');
  });

  it('resolves nunjucks includes against the repo root', () => {
    expect(render("{% include 'templates/signup.html' %}")).toContain('data-fillout-id');
  });

  it('renders footnote definitions into a footnote block', () => {
    const html = render('Claim.[^a]\n\n[^a]: Because.\n');
    expect(html).toContain('footnote-ref');
    expect(html).toContain('Because.');
  });
});
