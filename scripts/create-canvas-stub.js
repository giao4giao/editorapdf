#!/usr/bin/env node
/**
 * Creates a stub `canvas` package under node_modules so that pdfjs-dist's
 * optional `require("canvas")` can be resolved by esbuild during the
 * OpenNext/Cloudflare bundling step.
 *
 * pdfjs-dist includes the following code:
 *   const Canvas = require("canvas");  // Node.js canvas addon (optional)
 *
 * The `canvas` npm package is a heavy native Node.js addon. This project
 * renders PDFs entirely in the browser (no server-side rendering), so `canvas`
 * is never needed at runtime. However, esbuild fails at bundle-time if the
 * module cannot be resolved.
 *
 * This script is run as a `postinstall` hook so the stub is always present
 * after `npm install` / `npm ci`, including in CI environments.
 */

const fs = require('fs');
const path = require('path');

const stubDir = path.join(__dirname, '..', 'node_modules', 'canvas');
const stubIndex = path.join(stubDir, 'index.js');
const stubPkg = path.join(stubDir, 'package.json');

if (!fs.existsSync(stubDir)) {
  fs.mkdirSync(stubDir, { recursive: true });
}

// Only write if not already a real canvas installation
const pkgExists = fs.existsSync(stubPkg);
const isStub = pkgExists
  ? JSON.parse(fs.readFileSync(stubPkg, 'utf8'))._isCanvasStub === true
  : false;

if (!pkgExists || isStub) {
  fs.writeFileSync(
    stubPkg,
    JSON.stringify(
      {
        name: 'canvas',
        version: '0.0.0',
        description: 'Stub canvas package — pdfjs-dist optional dep, not used server-side',
        main: 'index.js',
        _isCanvasStub: true,
      },
      null,
      2
    )
  );

  fs.writeFileSync(
    stubIndex,
    `// Stub canvas module for pdfjs-dist compatibility in Cloudflare Workers.
// pdfjs-dist optionally requires("canvas") for server-side Node.js rendering,
// but this project renders PDFs entirely in the browser.
// This stub prevents esbuild from failing during the OpenNext build step.
module.exports = {};
`
  );

  console.log('[postinstall] Created canvas stub in node_modules/canvas');
} else {
  console.log('[postinstall] Real canvas package found, skipping stub creation');
}
