const { execSync } = require('child_process');

// Vercel CLI (which @cloudflare/next-on-pages uses internally) injects VERCEL=1
// and NOW_BUILDER=1 into the environment when it runs the project build command.
if (process.env.VERCEL || process.env.NOW_BUILDER) {
  console.log('[build-cloudflare] Inside Vercel compiler environment. Running next build...');
  execSync('next build', { stdio: 'inherit' });
} else {
  console.log('[build-cloudflare] Outer build process. Running next-on-pages...');
  // --node-compat tells esbuild to treat Node.js built-ins (buffer, stream, etc.)
  // as external modules provided by the nodejs_compat_v2 runtime flag.
  execSync('npx @cloudflare/next-on-pages', { stdio: 'inherit' });
}
