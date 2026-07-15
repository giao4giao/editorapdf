#!/usr/bin/env node
/**
 * postinstall: fixes for @opennextjs/cloudflare Cloudflare Worker bundling.
 *
 * Problem 1 — pdfjs-dist requires "canvas"
 *   pdfjs-dist/build/pdf.js line 6247: `const Canvas = require("canvas")`
 *   "canvas" is a heavy native Node.js addon that is never installed in this
 *   project (all PDF rendering happens in the browser). esbuild fails at
 *   bundle-time when it cannot resolve the module.
 *   Fix: create an empty stub at node_modules/canvas so esbuild can resolve it.
 *
 * Problem 2 — Worker bundle too large (26 MB → exceeds 3/10 MiB limits)
 *   next.config.js marks pdfjs-dist, tesseract.js, pdf-lib, etc. as webpack
 *   server-side externals, which generates `require('pdfjs-dist')` calls in the
 *   Next.js server output. When @opennextjs/cloudflare's bundle-server.js step
 *   runs esbuild on that output, esbuild follows those require() calls and bundles
 *   the entire libraries (~25 MB combined) into the Worker.
 *   Fix: patch bundle-server.js to add esbuild `alias` entries that redirect all
 *   heavy client-only packages to an empty stub (stubs/client-only-stub.js),
 *   exactly as OpenNext does for `ws`, `node-fetch`, etc.
 *
 * Both fixes are idempotent and re-apply automatically after every npm install.
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// ---------------------------------------------------------------------------
// Fix 1: canvas stub
// ---------------------------------------------------------------------------
function ensureCanvasStub() {
  const stubDir   = path.join(ROOT, 'node_modules', 'canvas');
  const stubIndex = path.join(stubDir, 'index.js');
  const stubPkg   = path.join(stubDir, 'package.json');

  if (!fs.existsSync(stubDir)) {
    fs.mkdirSync(stubDir, { recursive: true });
  }

  const pkgExists = fs.existsSync(stubPkg);
  const isStub = pkgExists
    ? JSON.parse(fs.readFileSync(stubPkg, 'utf8'))._isCanvasStub === true
    : false;

  if (!pkgExists || isStub) {
    fs.writeFileSync(
      stubPkg,
      JSON.stringify({
        name: 'canvas',
        version: '0.0.0',
        description: 'Stub — pdfjs-dist optional dep, never used server-side',
        main: 'index.js',
        _isCanvasStub: true,
      }, null, 2)
    );
    fs.writeFileSync(
      stubIndex,
      '// Stub canvas for pdfjs-dist / Cloudflare Worker compat.\nmodule.exports = {};\n'
    );
    console.log('[postinstall] Created canvas stub in node_modules/canvas');
  } else {
    console.log('[postinstall] Real canvas package detected, skipping stub');
  }
}

// ---------------------------------------------------------------------------
// Fix 2: patch bundle-server.js to alias heavy packages to empty stub
// ---------------------------------------------------------------------------

// Packages that are client-only and must NOT be bundled into the Worker.
// These match the list in next.config.js webpack externals.
const CLIENT_ONLY_PACKAGES = [
  'pdfjs-dist',
  'tesseract.js',
  'tesseract.js-core',
  'pdf-lib',
  'pptxgenjs',
  'exceljs',
  'mammoth',
  'docx',
  'jszip',
  'xlsx',
  'jsbarcode',
  'qrcode',
  'sharp',
];

// Marker inserted into the patched file so the patch is not applied twice.
const PATCH_MARKER = '// [client-only-alias-patch-v1]';

// Exact string to anchor the insertion point (last entry in the alias block).
const ANCHOR = '"@next/env": path.join(buildOpts.outputDir, "cloudflare-templates/shims/env.js"),';

function patchBundleServer() {
  const bundleServerPath = path.join(
    ROOT,
    'node_modules', '@opennextjs', 'cloudflare',
    'dist', 'cli', 'build', 'bundle-server.js'
  );

  if (!fs.existsSync(bundleServerPath)) {
    console.warn('[postinstall] bundle-server.js not found, skipping alias patch');
    return;
  }

  const original = fs.readFileSync(bundleServerPath, 'utf8');

  if (original.includes(PATCH_MARKER)) {
    console.log('[postinstall] bundle-server.js already patched, skipping');
    return;
  }

  if (!original.includes(ANCHOR)) {
    console.warn('[postinstall] Could not find anchor in bundle-server.js — @opennextjs/cloudflare may have changed. Skipping alias patch.');
    return;
  }

  // Build the alias entries using the same `appPath` variable that bundle-server.js
  // already has in scope (from `const { appPath, ... } = buildOpts`).
  const stubRelPath = 'stubs/client-only-stub.js';
  const aliasLines = CLIENT_ONLY_PACKAGES
    .map(pkg => `            "${pkg}": path.join(appPath, "${stubRelPath}"),`)
    .join('\n');

  const insertion =
    `${ANCHOR}\n` +
    `            ${PATCH_MARKER}\n` +
    `            // Heavy client-only packages — replaced with empty stubs so esbuild\n` +
    `            // does not bundle them (~25 MB) into the Cloudflare Worker.\n` +
    aliasLines;

  const patched = original.replace(ANCHOR, insertion);
  fs.writeFileSync(bundleServerPath, patched);
  console.log('[postinstall] Patched bundle-server.js: added client-only package aliases');
}

// ---------------------------------------------------------------------------
// Run both fixes
// ---------------------------------------------------------------------------
try {
  ensureCanvasStub();
} catch (err) {
  console.error('[postinstall] canvas stub failed:', err.message);
}

try {
  patchBundleServer();
} catch (err) {
  console.error('[postinstall] bundle-server patch failed:', err.message);
}

