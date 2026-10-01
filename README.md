# EditoraPDF - Free Open-Source PDF Editor

[English](README.md) | [简体中文](README.zh-CN.md)

This fork is maintained by [giao4giao](https://github.com/giao4giao). It adds Simplified Chinese support, a refreshed interface, and Cloudflare build fixes. The original project is [affsquadDevs/EditoraPDF](https://github.com/affsquadDevs/editorapdf); its MIT license and original copyright notice are retained.

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![GitHub Stars](https://img.shields.io/github/stars/giao4giao/editorapdf?style=social)](https://github.com/giao4giao/editorapdf)

[**Live Site**](https://editorapdf.171818.xyz) · [**Report Bug**](https://github.com/giao4giao/editorapdf/issues) · [**Request Feature**](https://github.com/giao4giao/editorapdf/issues) · [**Contributing**](CONTRIBUTING.md)

</div>

---

## 🌟 About

**EditoraPDF** is a **100% free and open-source** online PDF editor that runs entirely in your browser. Built with modern web technologies (Next.js, TypeScript, React, PDF.js, pdf-lib), it provides professional PDF editing capabilities without requiring installation, signup, or data uploads.

### 🔒 Privacy-First Design

All processing happens **locally on your device**. Your PDF files never leave your browser, ensuring complete privacy and security.

### 🎯 Perfect For

- Quick PDF edits without software installation
- Privacy-conscious users who don't want to upload sensitive documents
- Developers looking for an open-source PDF editor to study or fork
- Organizations needing a self-hosted PDF editing solution

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/giao4giao/editorapdf.git
cd editorapdf

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## ✨ Key Features

### 📄 PDF Viewing & Navigation
- **High-Quality Rendering**: Crystal-clear PDF rendering using Mozilla's PDF.js
- **Zoom Controls**: Smooth zoom from 50% to 300%
- **Thumbnail Sidebar**: Visual page overview with drag-to-reorder
- **Responsive Design**: Works on desktop, tablet, and mobile

### ✏️ Advanced Editing Capabilities

#### Text Editing
- **Extract & Edit Original Text**: Automatically extracts all text from PDF
- **Edit Content**: Click any text to modify content, size, and color
- **Add New Text**: Place text overlays anywhere on pages
- **Multi-line Support**: Create paragraphs with line breaks
- **Hide Original Text**: Replace existing text seamlessly

#### Image Management
- **Upload Images**: Add PNG, JPEG, and other image formats
- **Resize & Position**: Drag and resize images freely
- **Delete Images**: Remove unwanted images

#### Shape Drawing
- **Rectangles**: Draw boxes for emphasis
- **Circles/Ellipses**: Highlight circular areas
- **Lines & Arrows**: Point to specific content
- **Highlights**: Semi-transparent overlays
- **Customization**: Adjust colors and line widths

### 📄 Page Operations
- **Rotate Pages**: 90° increments with live preview
- **Delete Pages**: Remove unwanted pages (with confirmation)
- **Reorder Pages**: Drag thumbnails to rearrange
- **Export PDF**: Download with all changes applied

---

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| [Next.js](https://nextjs.org/) | React framework with App Router | 14.x |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript | 5.x |
| [React](https://react.dev/) | UI library | 18.x |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework | 3.x |
| [Zustand](https://github.com/pmndrs/zustand) | Lightweight state management | 4.x |
| [PDF.js](https://mozilla.github.io/pdf.js/) | PDF rendering engine (Mozilla) | 3.x |
| [pdf-lib](https://pdf-lib.js.org/) | PDF manipulation library | 1.x |

---

## 📦 Installation & Setup

### Prerequisites

- **Node.js** 18+ and npm/yarn/pnpm
- **Modern browser**: Chrome, Firefox, Edge, or Safari (latest versions)

### Development Setup

```bash
# Clone the repo
git clone https://github.com/giao4giao/editorapdf.git
cd editorapdf

# Install dependencies
npm install

# Start development server (with hot reload)
npm run dev
```

### Local production preview

```bash
npx next build
npm run start
```

### Cloudflare Pages

`npm run build` runs the Cloudflare Pages adapter; it is different from a local Next.js build. Use `.vercel/output/static` as the Pages output directory. Set `NEXT_PUBLIC_SITE_URL` to `https://editorapdf.171818.xyz` (or your new public Pages URL or custom domain) in Cloudflare's build environment before building. Copy `.env.example` to `.env.local` for local configuration.

```bash
npm run build
# Optional manual deployment with your own Cloudflare account:
npm run deploy
```

The project uses Edge routes and is not a plain static `out` export. On Windows, the next-on-pages adapter may require a compatible Linux/WSL environment; Cloudflare's Linux build environment is the deployment path used by this fork. See [中文部署说明](README.zh-CN.md#cloudflare-pages-部署).

---

## ⭐ SEO Optimized

This project includes **comprehensive SEO optimizations** following 2026 best practices:
- ✅ Complete metadata (Open Graph, Twitter Cards, structured data)
- ✅ JSON-LD schemas (WebApplication, SoftwareSourceCode, Organization, Breadcrumb)
- ✅ Dynamic sitemap & robots.txt
- ✅ PWA manifest for app stores
- ✅ Performance headers & caching
- ✅ Semantic HTML5 & ARIA accessibility
- ✅ Mobile-first responsive design
- ✅ Open-source schema with GitHub integration

📚 **SEO Documentation**: See [`SEO_IMPLEMENTATION.md`](SEO_IMPLEMENTATION.md), [`SEO_CHECKLIST.md`](SEO_CHECKLIST.md), and [`IMAGE_REQUIREMENTS.md`](IMAGE_REQUIREMENTS.md) for complete setup guide.




## Project Structure

```
pdfeditor/
├── app/
│   ├── components/
│   │   ├── UploadArea.tsx            # File upload with drag & drop
│   │   ├── Toolbar.tsx               # Main controls (zoom, rotate, delete)
│   │   ├── EditToolbar.tsx           # ✨ NEW: Tool selector (text, image, shape)
│   │   ├── Thumbnails.tsx            # Page thumbnail list with drag-to-reorder
│   │   ├── PdfViewer.tsx             # Main page canvas viewer
│   │   ├── AdvancedOverlayLayer.tsx  # ✨ NEW: All editing (text, images, shapes)
│   │   ├── TextOverlayLayer.tsx      # Legacy text overlay (still available)
│   │   └── ExportButton.tsx          # PDF export and download
│   ├── lib/
│   │   └── pdf/
│   │       ├── pdfRender.ts          # PDF.js rendering utilities
│   │       ├── pdfExtract.ts         # ✨ NEW: Text & image extraction
│   │       └── exportPdf.ts          # pdf-lib export logic (enhanced)
│   ├── store/
│   │   └── pdfStore.ts               # Zustand state management (enhanced)
│   ├── layout.tsx
│   ├── page.tsx                      # Main page / entry point
│   └── globals.css
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## How It Works

### 1. Upload & Parsing
- File is validated (type, size) and loaded into memory
- PDF.js parses the PDF and extracts page information
- **Text Extraction**: Automatically extracts all text with positioning
- Thumbnails are generated for all pages

### 2. State Management
The app maintains:
- **originalFile**: Uploaded PDF file
- **pages[]**: Array of page objects with:
  - Original index
  - Rotation (0, 90, 180, 270)
  - Deleted flag
  - Text overlays (original + new, with normalized coordinates)
  - Image overlays (with data URLs)
  - Shape overlays (rectangles, circles, lines, arrows, highlights)
- **selectedPageId**: Current page being viewed
- **zoom**: Current zoom level (0.5 - 3.0)
- **editMode**: Current tool (select, text, image, shape)

### 3. Text Extraction
- PDF.js `getTextContent()` extracts all text with positioning
- Text items are converted to editable overlays
- Original text can be edited or hidden
- New text can be added anywhere

### 4. Rendering
- PDF.js renders pages to HTML5 canvas
- Multiple overlay layers positioned absolutely:
  - Text layer (original + new)
  - Image layer (uploaded images)
  - Shape layer (drawn shapes)
- Coordinates are normalized (0-1) so they scale with zoom
- Interactive editing with drag-and-drop

### 5. Export
- pdf-lib loads the original PDF
- Creates a new PDF document
- Copies pages in the new order (skipping deleted pages)
- Applies rotations
- **Hides replaced text** (white rectangles over originals)
- **Burns edited text** into the PDF pages
- **Embeds images** (PNG/JPEG)
- **Draws shapes** (SVG-like rendering)
- Generates downloadable file

## Limitations & Known Issues

### File Constraints
- **Max file size**: 25MB (browser memory constraint)
- **Recommended page count**: < 50 pages for smooth performance
- **No password-protected PDFs**: Encrypted files not supported

### Feature Limitations
- **No undo/redo**: Doesn't include history management (TODO: implement)
- **Basic text rendering**: Only standard fonts (Helvetica), no custom fonts
- **Text positioning**: Extracted text positioning may not be perfect for complex layouts
- **Original text replacement**: Hides original with white rectangles (works best on white backgrounds)
- **Form field editing**: Forms are flattened on export
- **Image extraction**: Currently limited (can add new images, but extracting existing images from PDF is complex)

### Browser Compatibility
- **Modern browsers only**: Chrome, Firefox, Edge, Safari (latest versions)
- **Large PDFs**: May cause performance issues or memory errors
- **Mobile**: Works but not optimized for touch interactions

## ✅ Implemented Advanced Features

- [x] **Extract and edit original PDF text**
- [x] **Image overlays** (upload and place images)
- [x] **Draw shapes** (rectangles, circles, lines, arrows, highlights)
- [x] **Multi-line text support**
- [x] **Hide/replace original text**
- [x] **Comprehensive export** (all overlay types)

## Future Enhancements

- [ ] Undo/redo functionality
- [ ] More text formatting options (bold, italic, font family selection)
- [ ] Extract existing images from PDF (currently can only add new images)
- [ ] Freehand drawing/signature
- [ ] Page merging from multiple PDFs
- [ ] Extract/split pages to separate PDFs
- [ ] OCR for scanned PDFs
- [ ] Optimize large file handling
- [ ] Mobile-responsive touch controls
- [ ] Keyboard shortcuts
- [ ] Collaborative editing (cloud sync)

## Troubleshooting

### "Failed to load PDF"
- Check if the file is a valid PDF
- Ensure the PDF is not encrypted or password-protected
- Try a smaller file (< 25MB)

### "Export failed"
- Some complex PDFs with unusual structure may not export correctly
- Try with a simpler PDF to verify the feature works
- Check browser console for specific errors

### Slow performance
- Large PDFs (> 50 pages) may render slowly
- Try reducing zoom level
- Close other browser tabs to free up memory

### PDF.js worker errors
- The app loads the PDF.js worker from a CDN
- Ensure you have internet connectivity (even though processing is local)
- In production, consider bundling the worker locally

## Development Notes

### Why client-only?
- **Privacy**: User files never leave their machine
- **Simplicity**: No backend infrastructure needed
- **Cost**: Free hosting on static platforms
- **Speed**: No network latency for processing

### Key Technical Decisions
- **Zustand over Redux**: Simpler state management for MVP
- **Canvas rendering**: Better performance than SVG for PDF pages
- **Normalized coordinates**: Makes overlays zoom-independent
- **pdf-lib for export**: Browser-compatible, unlike Node-based alternatives

### Adding New Features
1. Add state to `pdfStore.ts` if needed
2. Create component in `app/components/`
3. Add helper functions in `app/lib/pdf/` if manipulating PDFs
4. Update export logic in `exportPdf.ts` to persist changes

---

## 🤝 Contributing

We welcome contributions from the community! Whether you're fixing bugs, adding features, improving documentation, or spreading the word, your help is appreciated.

Please read our [**Contributing Guide**](CONTRIBUTING.md) to get started.

### Ways to Contribute

- 🐛 **Report bugs** and suggest features via [GitHub Issues](https://github.com/giao4giao/editorapdf/issues)
- 💻 **Submit pull requests** with bug fixes or new features
- 📖 **Improve documentation** and add examples
- ⭐ **Star the repo** to show your support
- 🔗 **Share the project** with others who might find it useful

---

## 📄 License

**MIT License** - This project is completely free and open source. You can use, modify, and distribute it for any purpose, including commercial projects.

See the [LICENSE](LICENSE) file for full details.

---

## 🙏 Credits & Acknowledgments

EditoraPDF is built on the shoulders of giants:

- **[Next.js](https://nextjs.org/)** - The React framework for production
- **[PDF.js](https://mozilla.github.io/pdf.js/)** - PDF rendering by Mozilla
- **[pdf-lib](https://pdf-lib.js.org/)** - PDF manipulation library
- **[Zustand](https://github.com/pmndrs/zustand)** - Lightweight state management
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework

---

## 🌐 Community & Support

- **Maintainer**: [giao4giao](https://github.com/giao4giao)
- **Repository**: [giao4giao/editorapdf](https://github.com/giao4giao/editorapdf)
- **Issues**: [Report bugs or request features](https://github.com/giao4giao/editorapdf/issues)
- **中文说明**: [README.zh-CN.md](README.zh-CN.md)

This fork does not use the upstream maintainer's email, social profiles, Trustpilot widget, analytics container, or advertising account. Add your own integrations if needed.

---

## ⭐ Show Your Support

If you find EditoraPDF useful, please consider:

- ⭐ **Starring the repo** on GitHub
- 🐦 **Sharing on social media**
- 📝 **Writing a blog post** about the project
- 💬 **Recommending it** to friends and colleagues

Every bit of support helps the project grow and improve!

---

<div align="center">

**Maintained by giao4giao · Based on EditoraPDF by affsquadDevs / EditoraPDF Team**

[GitHub](https://github.com/giao4giao/editorapdf) · [Contributing](CONTRIBUTING.md)

</div>
