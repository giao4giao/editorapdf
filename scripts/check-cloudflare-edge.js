const fs = require('node:fs');
const path = require('node:path');
const esbuild = require('esbuild');

// Check actual Next.js Edge output using next-on-pages' stdin bundling mode.
// Deliberately omit resolveDir: adding it would mask unresolved dependencies.
async function main() {
  const manifest = JSON.parse(fs.readFileSync('.next/server/middleware-manifest.json', 'utf8'));
  const entries = [...Object.values(manifest.middleware), ...Object.values(manifest.functions)];
  const files = new Set(entries.flatMap(entry => entry.files).filter(file => file.endsWith('.js')));
  if (files.size === 0) throw new Error('No Edge output found. Run next build first.');

  for (const file of files) {
    try {
      await esbuild.build({
        stdin: { contents: fs.readFileSync(path.join('.next', file), 'utf8') },
        target: 'es2022',
        platform: 'neutral',
        bundle: true,
        minify: true,
        external: ['node:*', 'async_hooks', 'cloudflare:*', '*.wasm'],
        write: false,
        logLevel: 'silent',
      });
    } catch (error) {
      throw new Error(`${file}: ${error.message}`);
    }
  }
  console.log(`Cloudflare Edge dependency check passed (${files.size} generated files).`);
}

main().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
