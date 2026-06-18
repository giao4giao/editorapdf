#!/usr/bin/env node
/**
 * Submit URLs to IndexNow (Bing, Yandex, Seznam, and other participating engines).
 *
 * By default it pulls EVERY URL from the live sitemap (https://editorapdf.com/sitemap.xml),
 * so all localized blog posts, tool pages, and main pages are submitted — not a hardcoded
 * subset. Run it after a deploy that adds/updates content.
 *
 * Usage:
 *   npm run submit-indexnow                      # submit all URLs from the sitemap
 *   node scripts/submit-indexnow.js <url> [...]  # submit only the given URL(s)
 *
 * The IndexNow key is hosted at https://editorapdf.com/<KEY>.txt (public/<KEY>.txt) and
 * must stay in sync with INDEXNOW_KEY below.
 */

const INDEXNOW_KEY = '2364b546c4a34edda494ccea10f3431b';
const SITE_URL = 'https://editorapdf.com';
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

// IndexNow shares a submission across all participating engines, but we also hit Bing
// directly. A submission to either endpoint reaches Bing.
const INDEXNOW_ENDPOINTS = [
  'https://api.indexnow.org/IndexNow',
  'https://www.bing.com/indexnow',
];

// IndexNow accepts up to 10,000 URLs per request.
const MAX_URLS_PER_REQUEST = 10000;

async function fetchSitemapUrls() {
  const res = await fetch(SITEMAP_URL, { headers: { 'User-Agent': 'EditoraPDF-IndexNow/1.0' } });
  if (!res.ok) throw new Error(`Sitemap fetch failed: HTTP ${res.status}`);
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)]
    .map((m) => m[1].trim())
    // only submit URLs that belong to this host (IndexNow rejects cross-host URLs with 422)
    .filter((u) => {
      try {
        return new URL(u).hostname === new URL(SITE_URL).hostname;
      } catch {
        return false;
      }
    });
  return [...new Set(urls)];
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

async function submitBatch(urls, endpoint) {
  const requestBody = {
    host: new URL(SITE_URL).hostname,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(requestBody),
  });
  return response.status;
}

async function submitToIndexNow(urls) {
  if (!urls || urls.length === 0) {
    console.warn('IndexNow: No URLs provided for submission');
    return false;
  }

  let anySuccess = false;
  for (const batch of chunk(urls, MAX_URLS_PER_REQUEST)) {
    // One endpoint succeeding is enough (the network shares submissions), but we try Bing
    // too for good measure.
    let batchOk = false;
    for (const endpoint of INDEXNOW_ENDPOINTS) {
      try {
        const status = await submitBatch(batch, endpoint);
        if (status === 200 || status === 202) {
          console.log(`✅ ${batch.length} URL(s) accepted by ${endpoint} (HTTP ${status})`);
          batchOk = true;
        } else {
          console.warn(`⚠️  HTTP ${status} from ${endpoint} for a batch of ${batch.length}`);
        }
      } catch (error) {
        console.error(`❌ Error submitting to ${endpoint}:`, error.message);
      }
    }
    anySuccess = anySuccess || batchOk;
  }
  return anySuccess;
}

async function main() {
  const customUrls = process.argv.slice(2);
  let urls;

  if (customUrls.length > 0) {
    console.log('🚀 Submitting custom URLs to IndexNow...\n');
    urls = customUrls;
  } else {
    console.log(`🚀 Submitting all sitemap URLs to IndexNow (${SITEMAP_URL})...\n`);
    try {
      urls = await fetchSitemapUrls();
    } catch (error) {
      console.error(`❌ Could not read the sitemap (${error.message}). Falling back to main pages.`);
      urls = [
        `${SITE_URL}`, `${SITE_URL}/en`, `${SITE_URL}/en/tools`, `${SITE_URL}/en/blog`,
      ];
    }
  }

  console.log(`📄 ${urls.length} URL(s) to submit (showing first 10):`);
  urls.slice(0, 10).forEach((url, i) => console.log(`  ${i + 1}. ${url}`));
  if (urls.length > 10) console.log(`  … and ${urls.length - 10} more`);
  console.log('');

  const success = await submitToIndexNow(urls);
  if (success) {
    console.log(`\n✅ Submitted ${urls.length} URL(s) to IndexNow. Bing will recrawl them shortly.`);
    process.exit(0);
  } else {
    console.error('\n❌ Failed to submit URLs to IndexNow. See errors above.');
    process.exit(1);
  }
}

main();
