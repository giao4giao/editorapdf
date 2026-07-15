/**
 * Client-only stub for Cloudflare Worker / Next.js server builds.
 *
 * Heavy browser-only packages (pdfjs-dist, tesseract.js, pdf-lib, etc.)
 * are aliased to this stub by the esbuild bundler step of @opennextjs/cloudflare
 * so they are NOT bundled into the Worker. These packages are exclusively
 * used in the browser — never invoked on the server.
 *
 * Returning an empty object means:
 *   - Top-level require() calls resolve without throwing.
 *   - Any dead code that references these packages is eliminated by esbuild's
 *     tree-shaker.
 *   - If (incorrectly) called server-side, the caller gets {} rather than
 *     crashing the entire Worker at startup.
 */
module.exports = {};
