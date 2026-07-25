#!/usr/bin/env bash
# Regenerates the self-hosted Orbit embed committed under orbit-embed/ and
# scripts/orbit-web-component.js.
#
# Why we host these ourselves: the interface strings inside Orbit's review
# iframe are served from withorbit.com, so a zh-TW page still shows readers
# "Show Answer". Our fork localizes that interface and persists reviews in
# IndexedDB instead of an Orbit account -- the hosted backend's CORS allowlist,
# session cookie, and login handshake are all pinned to withorbit.com, so an
# account can't work from here anyway.
#
# The embed MUST stay on this site's own origin. In a cross-origin iframe,
# IndexedDB is partitioned and Safari's ITP evicts script-writable storage after
# seven days without first-party interaction, which would wipe every review
# interval past the 5-day first step.
#
# Usage: scripts/build-orbit-embed.sh [path-to-orbit-checkout]
set -euo pipefail

ORBIT="${1:-$HOME/w/orbit}"
SITE="$(cd "$(dirname "$0")/.." && pwd)"

if [ ! -d "$ORBIT/packages/app" ]; then
  echo "No Orbit checkout at $ORBIT (branch feat/local-only-embed)." >&2
  exit 1
fi

export TMPDIR="$ORBIT/.tmp"
mkdir -p "$TMPDIR"

echo "==> Building the review app (static export)"
rm -rf "$TMPDIR/web-build"
(cd "$ORBIT/packages/app" && EXPO_USE_METRO_WORKSPACE_ROOT=1 \
  "$ORBIT/node_modules/.bin/expo" export -p web --output-dir "$TMPDIR/web-build")

echo "==> Building the host web component"
rm -rf "$TMPDIR/wc"
# Trailing slash matters: GitHub Pages answers a bare directory path with a 301
# to the slashed form, and we would rather the iframe not take a redirect hop.
(cd "$ORBIT/packages/web-component" && bun build src/index.ts \
  --outdir "$TMPDIR/wc" --target browser --minify \
  --define EMBED_API_BASE_URL='"/orbit-embed/embed/"')

echo "==> Installing into $SITE"
rm -rf "$SITE/orbit-embed"
mkdir -p "$SITE/orbit-embed"
cp -R "$TMPDIR/web-build/." "$SITE/orbit-embed/"

# expo-router serves /embed from the SPA shell; static hosting needs a real file
# at that path.
mkdir -p "$SITE/orbit-embed/embed"
cp "$SITE/orbit-embed/index.html" "$SITE/orbit-embed/embed/index.html"
cp "$SITE/orbit-embed/browserCompatibility.js" \
  "$SITE/orbit-embed/embed/browserCompatibility.js"

cp "$TMPDIR/wc/index.js" "$SITE/scripts/orbit-web-component.js"

echo "==> Done. Rebuild the site with: node scripts/build-site.ts"
