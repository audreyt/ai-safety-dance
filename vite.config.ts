import { defineConfig } from 'vite-plus';
import { siteGenerator } from './src/site/devPlugin.ts';

/**
 * `vp fmt`/`vp lint` own exactly the TypeScript we wrote plus the JSON manifests.
 * Everything else here is upstream content, vendored libraries, generated HTML, or
 * Nunjucks templates whose `{{ }}` attribute syntax no HTML formatter can parse.
 */
const NOT_OURS = [
  'node_modules/**',
  '.tmp/**',
  '.en/**',
  'media/**',
  'thumbs/**',
  'anki/**',
  'licenses/**',
  'assets/**',
  'styles/**',
  'signup/**',
  'templates/**',
  'conclusion/**',
  'test/**',
  'p1/**',
  'p2/**',
  'p3/**',
  'scripts/*.js',
  'scripts/output/**',
  '*.md',
  '*.html',
];

export default defineConfig({
  appType: 'mpa',
  publicDir: false,
  server: {
    host: '127.0.0.1',
    port: 4321,
    open: '/',
  },
  plugins: [siteGenerator()],
  fmt: {
    semi: true,
    singleQuote: true,
    tabWidth: 2,
    ignorePatterns: NOT_OURS,
  },
  lint: {
    options: { typeAware: true, typeCheck: true },
    ignorePatterns: NOT_OURS,
  },
  staged: {
    '**/*': 'vp fmt --no-error-on-unmatched-pattern',
    '*.{ts,mts}': 'vp lint --fix --no-error-on-unmatched-pattern',
  },
  test: {
    include: ['tests/**/*.test.ts'],
    environment: 'node',
    coverage: {
      enabled: false,
      provider: 'v8',
      reporter: ['text'],
      include: ['src/site/**/*.ts'],
    },
  },
});
