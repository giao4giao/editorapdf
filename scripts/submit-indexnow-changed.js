#!/usr/bin/env node
/**
 * Streaming IndexNow submission: submit ONLY the URLs whose content changed between two
 * commits, instead of dumping the whole sitemap on every deploy.
 *
 * Bing Webmaster Tools flags repeated full-sitemap submissions as "batch mode" (it can
 * overload servers and delay indexing). Streaming — small, change-driven submissions — is
 * the recommended pattern. This script maps the files changed in a deploy to the specific
 * page URLs they affect and submits just those. Shared/data/infra files that fan out to
 * many pages are intentionally skipped (left to normal crawling) so submissions stay small.
 *
 * It derives URLs from the git diff (not the sitemap), so it is also immune to sitemap
 * edge-cache lag right after a deploy.
 *
 * Usage:
 *   node scripts/submit-indexnow-changed.js <baseSha> [headSha] [--dry-run]
 */

const { execSync } = require('child_process');

const KEY = '2364b546c4a34edda494ccea10f3431b';
const SITE = 'https://editorapdf.com';
const LOCALES = ['en', 'uk', 'de', 'es', 'fr', 'it'];
const ENDPOINTS = ['https://api.indexnow.org/IndexNow', 'https://www.bing.com/indexnow'];
// Localized single pages that map 1:1 to a route segment.
const SINGLE_PAGES = new Set([
  'about', 'contact', 'faq', 'how-it-works', 'privacy-policy', 'terms', 'your-files-stay-private',
]);

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const positional = args.filter((a) => !a.startsWith('--'));
const base = positional[0];
const head = positional[1] || 'HEAD';

if (!base) {
  console.error('usage: submit-indexnow-changed.js <baseSha> [headSha] [--dry-run]');
  process.exit(2);
}

let files = [];
try {
  files = execSync(`git diff --name-only ${base} ${head}`, { encoding: 'utf8' })
    .split('\n').map((s) => s.trim()).filter(Boolean);
} catch (e) {
  console.error(`git diff ${base}..${head} failed: ${e.message}`);
  // Safer to submit nothing than to fall back to a full batch.
  process.exit(0);
}

const eachLocale = (path) => LOCALES.map((l) => `${SITE}/${l}${path}`);
const urls = new Set();

for (const f of files) {
  let m;
  if ((m = f.match(/^app\/data\/blog\/posts\/([a-z0-9-]+)\.(?:tsx|i18n\.ts)$/))) {
    // A blog post (module or its translations) → that post in every locale.
    eachLocale(`/blog/${m[1]}`).forEach((u) => urls.add(u));
  } else if (
    f === 'app/[locale]/blog/page.tsx' ||
    f === 'app/components/BlogIndex.tsx' ||
    f === 'app/data/blog/indexContent.ts'
  ) {
    eachLocale('/blog').forEach((u) => urls.add(u));
  } else if (f === 'app/[locale]/page.tsx') {
    eachLocale('').forEach((u) => urls.add(u));
  } else if (f === 'app/[locale]/tools/page.tsx') {
    eachLocale('/tools').forEach((u) => urls.add(u));
  } else if ((m = f.match(/^app\/\[locale\]\/([a-z-]+)\/page\.tsx$/)) && SINGLE_PAGES.has(m[1])) {
    eachLocale(`/${m[1]}`).forEach((u) => urls.add(u));
  }
  // Everything else (shared components, locale JSON, toolsMeta/toolFaq/toolBlogMap,
  // layouts, config, scripts, CI) is deliberately NOT mapped — those changes fan out to
  // many/all pages and are left to regular crawling instead of a large IndexNow batch.
}

const urlList = [...urls];
console.log(`changed files: ${files.length} → ${urlList.length} content URL(s)`);

if (urlList.length === 0) {
  console.log('No page-specific content changed; skipping IndexNow (nothing to stream).');
  process.exit(0);
}
// Guard rail: if a change ever maps to a very large set, skip rather than batch-dump.
if (urlList.length > 600) {
  console.log(`Change set is unusually large (${urlList.length}); skipping to avoid a batch dump — crawl/sitemap will cover it.`);
  process.exit(0);
}

urlList.slice(0, 25).forEach((u, i) => console.log(`  ${i + 1}. ${u}`));
if (urlList.length > 25) console.log(`  … +${urlList.length - 25} more`);

if (dryRun) {
  console.log('[dry-run] not submitting.');
  process.exit(0);
}

(async () => {
  const body = { host: 'editorapdf.com', key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList };
  let anyOk = false;
  for (const ep of ENDPOINTS) {
    try {
      const r = await fetch(ep, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(body),
      });
      console.log(`  ${ep} → HTTP ${r.status}`);
      if (r.status === 200 || r.status === 202) anyOk = true;
    } catch (e) {
      console.error(`  ${ep} error: ${e.message}`);
    }
  }
  if (anyOk) console.log(`✅ Streamed ${urlList.length} changed URL(s) to IndexNow.`);
  process.exit(anyOk ? 0 : 1);
})();
