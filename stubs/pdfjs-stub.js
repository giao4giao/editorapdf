// Server/Edge-side stub for pdfjs-dist.
// pdfjs-dist is a browser-only library; all PDF rendering happens client-side.
// This stub is aliased in webpack for server/edge compilations so that the
// real pdfjs-dist (which contains require("buffer")) never enters the edge bundle.
// TypeScript "import type" from pdfjs-dist is erased at compile time and is unaffected.
module.exports = {};
