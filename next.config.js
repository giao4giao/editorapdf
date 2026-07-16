// Content-Security-Policy (Report-Only for now). Allows the third parties the site
// actually loads: Google AdSense/Ads/DoubleClick, Google Tag Manager, Trustpilot, and
// the pdf.js worker (cdnjs + unpkg fallback). Tighten before switching to enforcing.
const CSP_REPORT_ONLY = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://*.googlesyndication.com https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net https://*.doubleclick.net https://adservice.google.com https://*.google.com https://widget.trustpilot.com https://*.trustpilot.com https://cdnjs.cloudflare.com https://unpkg.com",
  "style-src 'self' 'unsafe-inline' https://*.trustpilot.com",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https:",
  "frame-src https://googleads.g.doubleclick.net https://*.doubleclick.net https://*.google.com https://widget.trustpilot.com https://*.trustpilot.com",
  "worker-src 'self' blob:",
  "upgrade-insecure-requests",
].join('; ')

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // SEO & Performance optimizations
  compress: true, // Enable gzip compression
  
  // Enable React strict mode for better error handling
  reactStrictMode: true,
  
  // Power-only features for optimization
  poweredByHeader: false, // Remove X-Powered-By header for security
  
  // Performance optimizations
  swcMinify: true, // Use SWC for faster minification
  
  experimental: {
    // Tree-shake barrel imports for icon-heavy packages so only the icons actually
    // used are bundled (lucide-react is imported in ~34 files). This is a per-package
    // allow-list — it deliberately does NOT include pdf-lib / pdfjs-dist, because
    // optimizePackageImports breaks their webpack chunk paths
    // (e.g. Cannot find module './vendor-chunks/pdf-lib.js').
    optimizePackageImports: ['lucide-react'],
    // NOTE: optimizeCss requires the optional dependency `critters`.
    // It breaks `next export` if `critters` isn't installed, especially on /404 and /500 prerender.
    // Keep disabled unless you explicitly add `critters` to dependencies.
    optimizeCss: false,
    // IMPORTANT: Do NOT add serverComponentsExternalPackages for pdfjs-dist or pdf-lib.
    // Marking them as external causes webpack to emit require('pdfjs-dist') in the edge
    // function output, which esbuild then tries to bundle fresh from node_modules —
    // bringing require("buffer") back in. Instead, we alias pdfjs-dist to an empty stub
    // in the server webpack config below, so esbuild never encounters it.
  },
  
  // Compiler optimizations
  compiler: {
    // Remove console logs in production for smaller bundle
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true, // Allow SVG images
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Headers for SEO and security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            // Report-Only: observe violations without blocking anything. Promote to a
            // real `Content-Security-Policy` after confirming the live ad/analytics/
            // Trustpilot/pdf-worker flows produce no violations. 'unsafe-inline' is
            // required by the inline GTM bootstrap and JSON-LD until a nonce is wired in.
            key: 'Content-Security-Policy-Report-Only',
            value: CSP_REPORT_ONLY
          }
        ],
      },
      {
        source: '/:all*(svg|jpg|png|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          }
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          }
        ],
      }
    ]
  },
  
  webpack: (config, { isServer }) => {
    // Fix for pdfjs-dist canvas dependency (browser builds)
    config.resolve.alias.canvas = false;

    if (isServer) {
      // On the server/edge compilation, replace pdfjs-dist with an empty stub.
      //
      // WHY: pdfjs-dist is a browser-only library (all PDF operations run in the
      // browser). It should never execute server-side. However, because
      // pdfjsLoader.ts uses a dynamic import('pdfjs-dist'), Next.js includes it in
      // the edge function bundle for any route that transitively imports that module.
      // pdfjs-dist contains require("buffer") which esbuild (used by
      // @cloudflare/next-on-pages) cannot resolve in the browser-platform mode.
      //
      // Solution: alias pdfjs-dist -> empty stub on the server/edge webpack pass.
      // webpack inlines {} instead of the 300 kB pdfjs bundle, so esbuild never
      // sees require("buffer"). Client builds are unaffected.
      //
      // NOTE: Do NOT use serverComponentsExternalPackages for this — that makes
      // webpack emit require('pdfjs-dist') which esbuild then bundles from source,
      // re-introducing the same require("buffer") error.
      const pdfjsStub = require.resolve('./stubs/pdfjs-stub.js');
      config.resolve.alias['pdfjs-dist'] = pdfjsStub;
      config.resolve.alias['pdfjs-dist/build/pdf'] = pdfjsStub;
      config.resolve.alias['pdfjs-dist/build/pdf.mjs'] = pdfjsStub;
      config.resolve.alias['pdfjs-dist/legacy/build/pdf'] = pdfjsStub;
    } else {
      // Client-side: keep pdfjs-dist real, just fill missing browser polyfills
      config.resolve.fallback = {
        ...config.resolve.fallback,
        emitter: false,
        batch: false,
      };
    }

    return config;
  },
}

module.exports = nextConfig
