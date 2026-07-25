import { describe, expect, it } from 'vitest';
import { markEmphasisScript, orbitUidFor, renderMarkdown } from '../src/site/markdown.ts';
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

  it('downgrades emphasis inside orbit-prompt attributes, opening and closing', () => {
    const html = render(
      '<orbit-prompt\n    question="讓電腦<i>非常快速地</i>執行"\n    answer="<b>是</b>"></orbit-prompt>',
    );
    expect(html).toContain('question="讓電腦_非常快速地_執行"');
    expect(html).toContain('answer="**是**"');
    expect(html).not.toContain('</i>');
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

describe('markEmphasisScript', () => {
  it('marks a 漢字 emphasis run for 著重號', () => {
    expect(markEmphasisScript('<p>他說<i>不行</i>。</p>')).toBe(
      '<p>他說<i class="hanzi">不行</i>。</p>',
    );
  });

  it('leaves a Latin-only run as a real italic', () => {
    // Merriweather has a genuine italic face; Latin should use it.
    expect(markEmphasisScript('<p>用 <i>AlphaGo</i> 舉例</p>')).toBe(
      '<p>用 <i>AlphaGo</i> 舉例</p>',
    );
  });

  it('marks a run that fills its whole paragraph as an aside', () => {
    // The source uses <i> for asides as well as emphasis; dotting a whole
    // sentence is not emphasis, it is noise.
    expect(markEmphasisScript('<p><i>（嘿，你可能想先看導讀）</i></p>')).toBe(
      '<p><i class="hanzi aside">（嘿，你可能想先看導讀）</i></p>',
    );
  });

  it('marks an over-long inline run as an aside', () => {
    const long = '很'.repeat(41);
    expect(markEmphasisScript(`<p>前<i>${long}</i>後</p>`)).toContain('class="hanzi aside"');
  });

  it('keeps a run just under the limit as emphasis', () => {
    const ok = '很'.repeat(40);
    expect(markEmphasisScript(`<p>前<i>${ok}</i>後</p>`)).toContain('<i class="hanzi">');
  });

  it('looks through inline markup when deciding', () => {
    const html = markEmphasisScript('<p>看<i><a href="/x">導讀</a></i>吧</p>');
    expect(html).toContain('<i class="hanzi"><a href="/x">導讀</a></i>');
  });

  it('never touches script or style bodies', () => {
    const script = '<script>if (a<i && i<b) go("字");</script>';
    expect(markEmphasisScript(script)).toBe(script);
  });
});
