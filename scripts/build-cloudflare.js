const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Vercel CLI (which @cloudflare/next-on-pages uses internally) injects VERCEL=1
// and NOW_BUILDER=1 into the environment when it runs the project build command.
if (process.env.VERCEL || process.env.NOW_BUILDER) {
  console.log('[build-cloudflare] Inside Vercel compiler environment. Running next build...');
  execSync('next build', { stdio: 'inherit' });
} else {
  console.log('[build-cloudflare] Outer build process. Running next-on-pages...');
  // Step 1: Run vercel build (which internally calls our build script with VERCEL=1)
  console.log('[build-cloudflare] Step 1: Running npx vercel build...');
  execSync('npx vercel build', { stdio: 'inherit' });

  // Step 2: Patch the .vercel/output function bundles to replace require("buffer")
  // with a browser-compatible shim before esbuild processes them.
  // pdfjs-dist includes: if(typeof atob === 'undefined') { require("buffer") }
  // In the edge runtime atob IS defined, so this code never runs at runtime —
  // but esbuild still fails to resolve it at build time.
  console.log('[build-cloudflare] Step 2: Patching .vercel/output functions for edge compatibility...');
  patchVercelOutput();

  // Step 3: Run next-on-pages to convert to Cloudflare Pages format
  // Use --skip-build since we already ran vercel build in step 1
  console.log('[build-cloudflare] Step 3: Running next-on-pages...');
  execSync('npx @cloudflare/next-on-pages --skip-build', { stdio: 'inherit' });
}

function patchVercelOutput() {
  const functionsDir = path.join(process.cwd(), '.vercel', 'output', 'functions');
  if (!fs.existsSync(functionsDir)) {
    console.log('[build-cloudflare] No .vercel/output/functions directory found, skipping patch.');
    return;
  }

  let patchCount = 0;
  // The buffer stub: atob is always available in edge/browser, so Buffer.from(str, 'base64')
  // can be replaced with a Uint8Array decoded from atob.
  const bufferStub = `{Buffer:{from:function(s,enc){if(typeof atob!=='undefined'&&enc==='base64'){var b=atob(s);var u=new Uint8Array(b.length);for(var i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return u}return new Uint8Array(0)}}}`;

  function patchDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        patchDir(fullPath);
      } else if (entry.name.endsWith('.js') || entry.name.endsWith('.mjs')) {
        let content = fs.readFileSync(fullPath, 'utf8');
        if (content.includes('require("buffer")') || content.includes("require('buffer')")) {
          content = content
            .replace(/require\("buffer"\)/g, bufferStub)
            .replace(/require\('buffer'\)/g, bufferStub);
          fs.writeFileSync(fullPath, content);
          patchCount++;
          console.log(`[build-cloudflare] Patched: ${path.relative(process.cwd(), fullPath)}`);
        }
      }
    }
  }

  patchDir(functionsDir);
  console.log(`[build-cloudflare] Patched ${patchCount} file(s).`);
}

