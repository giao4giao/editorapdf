#!/usr/bin/env node
/**
 * postinstall: fixes for @opennextjs/cloudflare Cloudflare Worker bundling.
 *
 * Fix 1 — pdfjs-dist requires "canvas"
 *   pdfjs-dist/build/pdf.js line 6247: `const Canvas = require("canvas")`
 *   "canvas" is a heavy native Node.js addon that is never installed in this
 *   project.
 *   Fix: create an empty stub at node_modules/canvas so esbuild can resolve it.
 *
 * Fix 2 — Exclude client-only libraries (~25 MB)
 *   next.config.js marks heavy libraries (pdfjs-dist, tesseract.js, pdf-lib, docx, xlsx, etc.)
 *   as webpack externals.
 *   Fix: patch bundle-server.js to add esbuild `alias` entries that redirect these packages
 *   to stubs/client-only-stub.js.
 *
 * Fix 3 — Exclude static page routes (~10 MB)
 *   Next.js compiles blog/[slug]/page.js and tools/[toolId]/page.js. Although these pages
 *   are 100% static and served directly by Cloudflare Assets, Next.js copies them to standalone
 *   server files, and OpenNext/esbuild bundles their code (which imports all blog posts and tools)
 *   into the Worker.
 *   Fix: patch bundle-server.js to add an esbuild plugin that redirects these page files to
 *   stubs/client-only-stub.js during resolution.
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
// Fix 2 & 3: patch bundle-server.js
// ---------------------------------------------------------------------------
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

const ALIAS_PATCH_MARKER = '// [client-only-alias-patch-v1]';
const PLUGIN_PATCH_MARKER = '// [client-only-plugin-patch-v2]';

const ALIAS_ANCHOR = '"@next/env": path.join(buildOpts.outputDir, "cloudflare-templates/shims/env.js"),';
const PLUGIN_ANCHOR = 'plugins: [';

function patchBundleServer() {
  const bundleServerPath = path.join(
    ROOT,
    'node_modules', '@opennextjs', 'cloudflare',
    'dist', 'cli', 'build', 'bundle-server.js'
  );

  if (!fs.existsSync(bundleServerPath)) {
    console.warn('[postinstall] bundle-server.js not found, skipping patch');
    return;
  }

  let code = fs.readFileSync(bundleServerPath, 'utf8');
  let dirty = false;

  // Apply Alias Patch
  if (!code.includes(ALIAS_PATCH_MARKER)) {
    if (code.includes(ALIAS_ANCHOR)) {
      const stubRelPath = 'stubs/client-only-stub.js';
      const aliasLines = CLIENT_ONLY_PACKAGES
        .map(pkg => `            "${pkg}": path.join(appPath, "${stubRelPath}"),`)
        .join('\n');

      const insertion =
        `${ALIAS_ANCHOR}\n` +
        `            ${ALIAS_PATCH_MARKER}\n` +
        `            // Heavy client-only packages — replaced with empty stubs so esbuild\n` +
        `            // does not bundle them (~25 MB) into the Cloudflare Worker.\n` +
        aliasLines;

      code = code.replace(ALIAS_ANCHOR, insertion);
      dirty = true;
      console.log('[postinstall] Patched bundle-server.js: added client-only package aliases');
    } else {
      console.warn('[postinstall] Could not find alias anchor in bundle-server.js');
    }
  }

  // Apply Plugin Patch (to exclude static page routes)
  if (!code.includes(PLUGIN_PATCH_MARKER)) {
    if (code.includes(PLUGIN_ANCHOR)) {
      const pluginCode =
        `${PLUGIN_ANCHOR}\n` +
        `            ${PLUGIN_PATCH_MARKER}\n` +
        `            // Intercept and redirect static page entrypoints to empty stubs\n` +
        `            // so esbuild does not bundle their code (~10 MB) into the Worker.\n` +
        `            {\n` +
        `                name: "exclude-static-pages",\n` +
        `                setup(build) {\n` +
        `                    build.onResolve({ filter: /blog.\\[slug\\].page\\.js$|tools.\\[toolId\\].page\\.js$/ }, () => {\n` +
        `                        return { path: path.join(buildOpts.appPath, "stubs/client-only-stub.js") };\n` +
        `                    });\n` +
        `                }\n` +
        `            },`;

      code = code.replace(PLUGIN_ANCHOR, pluginCode);
      dirty = true;
      console.log('[postinstall] Patched bundle-server.js: added static page exclusion plugin');
    } else {
      console.warn('[postinstall] Could not find plugin anchor in bundle-server.js');
    }
  }

  if (dirty) {
    fs.writeFileSync(bundleServerPath, code);
  } else {
    console.log('[postinstall] bundle-server.js already fully patched');
  }
}

// ---------------------------------------------------------------------------
// Run
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
