// ─── Daily blog generator (EditoraPDF) ────────────────────────────────────────
// Generates N brand-new English blog posts with the Claude API, matching the
// existing posts' voice, structure, length, and on-page SEO, then wires each one
// into THIS repo's TSX-module blog system so it renders on the site and appears in
// the sitemap. A push of those changes to `main` triggers the Vercel production
// deploy; the IndexNow ping is done from the workflow (GITHUB_TOKEN pushes do not
// trigger the deployment-driven indexnow.yml).
//
// This repo does NOT store posts as JSON/markdown — every post is a React module:
//   • app/data/blog/posts/<slug>.tsx       — meta() + schemas() + Article() component
//   • app/data/blog/posts/<slug>.i18n.ts   — TRANSLATIONS map (English-only here)
// and a new post must additionally be registered in FOUR places to appear:
//   • app/data/blog/registry.ts            — import + BLOG_POST_REGISTRY entry  → [slug]/page renders it
//   • app/data/blog/migrated.ts            — MIGRATED_BLOG_SLUGS entry          → generateStaticParams + sitemap
//   • app/components/BlogIndex.tsx          — a hand-authored <Link> card (uses c.<slug>CardTitle/Desc + a lucide icon)
//   • app/data/blog/indexContent.ts        — (translations only; English card text lives inline in BlogIndex C.en)
// The sitemap (app/sitemap.ts) derives blog URLs from MIGRATED_BLOG_SLUGS, so the
// migrated.ts entry is what gets the post into the sitemap automatically.
//
// SINGLE-SOURCE / ENGLISH-FIRST: the post template falls back to `en` per-key for any
// missing locale, and BlogIndex/index cards do the same. So this generator writes the
// English content only and leaves the .i18n.ts TRANSLATIONS empty — the six locales
// render the English text until a translator fills them in. (Translating the keyed TSX
// segment maps for 5 locales is intentionally out of scope here.)
//
// Usage:
//   node scripts/generate-blog.mjs              # generate 2 posts, write files
//   node scripts/generate-blog.mjs --count 1    # generate 1 post
//   node scripts/generate-blog.mjs --no-write   # generate + print, write nothing
//
// Env:
//   ANTHROPIC_API_KEY   required — the Claude API key
//   ANTHROPIC_MODEL     optional — defaults to "claude-opus-4-8"
//
// Dependency-free: Node 20+ global fetch, no npm packages.

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const MODEL = process.env.ANTHROPIC_MODEL || "claude-opus-4-8";
const API_KEY = process.env.ANTHROPIC_API_KEY;

const args = process.argv.slice(2);
const countIdx = args.indexOf("--count");
const COUNT = countIdx >= 0 && Number(args[countIdx + 1]) > 0 ? Number(args[countIdx + 1]) : 2;
const NO_WRITE = args.includes("--no-write");
const NO_TRANSLATE = args.includes("--no-translate"); // English-only (debug)
const MOCK = args.includes("--mock"); // skip the API entirely (canned post + marker translations) for testing wiring/build

const POSTS_DIR = path.join(ROOT, "app/data/blog/posts");
const REGISTRY_TS = path.join(ROOT, "app/data/blog/registry.ts");
const MIGRATED_TS = path.join(ROOT, "app/data/blog/migrated.ts");
const BLOG_INDEX_TSX = path.join(ROOT, "app/components/BlogIndex.tsx");
const INDEX_CONTENT_TS = path.join(ROOT, "app/data/blog/indexContent.ts");
const SEARCH_INDEX_TS = path.join(ROOT, "app/data/searchIndex.ts");

// The site is fully localized; auto-posts MUST be too, or the 5 non-English locale URLs
// render duplicate English content (which Google leaves "crawled, not indexed").
const LOCALES = [
  { code: "uk", name: "Ukrainian" },
  { code: "de", name: "German" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "it", name: "Italian" },
];

// cat* key → the human label BlogIndex C.en uses (for searchIndex tags).
const CAT_LABEL = {
  catGuide: "Guide", catPrivacy: "Privacy", catSecurity: "Security", catPdfTools: "PDF Tools",
  catConverter: "Converter", catOpenSource: "Open Source", catTechnical: "Technical",
  catPhilosophy: "Philosophy", catTechnology: "Technology", catComparison: "Comparison",
  catAnalysis: "Analysis", catCompliance: "Compliance",
};

const SITE_URL = "https://editorapdf.com";
const HERO_IMAGE = "/og/og-image.png"; // shared OG hero (matches recent posts like how-to-flatten)

// lucide-react icons already imported by BlogIndex.tsx — the model must pick one of these
// so the card compiles without touching the import list.
const ICONS = ["FileX", "Database", "WifiOff", "FileImage", "Crop", "Layers", "Type", "Highlighter", "ShieldCheck", "Lock", "Code", "BarChart3"];

// Category pill labels available in BlogIndex C.en (cat* keys). The model picks two.
const CATEGORIES = ["catGuide", "catPrivacy", "catSecurity", "catPdfTools", "catConverter", "catOpenSource", "catTechnical", "catPhilosophy", "catTechnology", "catComparison", "catAnalysis", "catCompliance"];

// ─── Anthropic Messages API (tool use → structured, valid JSON) ───────────────
const POST_SCHEMA = {
  type: "object",
  properties: {
    slug: { type: "string", description: "short kebab-case unique slug, no leading/trailing slash" },
    icon: { type: "string", enum: ICONS },
    category1: { type: "string", enum: CATEGORIES },
    category2: { type: "string", enum: CATEGORIES },
    cardTitle: { type: "string", description: "blog-index card heading" },
    cardDesc: { type: "string", description: "1-2 sentence blog-index card description" },
    metaTitle: { type: "string", description: "<=50 chars, primary keyword first. Do NOT append the site name — the layout adds ' | EditoraPDF' automatically" },
    metaDesc: { type: "string", description: "150-160 chars, includes primary keyword" },
    ogTitle: { type: "string" },
    ogDesc: { type: "string" },
    ogAlt: { type: "string" },
    twTitle: { type: "string" },
    twDesc: { type: "string" },
    heroAlt: { type: "string" },
    bcLeaf: { type: "string", description: "short breadcrumb leaf label" },
    heroTitle: { type: "string" },
    heroSubtitle: { type: "string" },
    artHeadline: { type: "string" },
    artDesc: { type: "string" },
    intro1: { type: "string" },
    intro2: { type: "string" },
    sections: {
      type: "array",
      description: "exactly 6 body sections in order",
      items: {
        type: "object",
        properties: {
          h: { type: "string", description: "H2 heading" },
          p1: { type: "string", description: "lead paragraph" },
          list: { type: "array", items: { type: "string" }, description: "0 or 3-5 bullet/step items" },
          p2: { type: "string", description: "closing paragraph (may be empty)" },
        },
        required: ["h", "p1", "list", "p2"],
      },
    },
    faq: {
      type: "array",
      description: "exactly 6 question/answer pairs",
      items: {
        type: "object",
        properties: { q: { type: "string" }, a: { type: "string" } },
        required: ["q", "a"],
      },
    },
  },
  required: [
    "slug", "icon", "category1", "category2", "cardTitle", "cardDesc",
    "metaTitle", "metaDesc", "ogTitle", "ogDesc", "ogAlt", "twTitle", "twDesc",
    "heroAlt", "bcLeaf", "heroTitle", "heroSubtitle", "artHeadline", "artDesc",
    "intro1", "intro2", "sections", "faq",
  ],
};

const POSTS_TOOL = {
  name: "submit_posts",
  description: "Submit the finished blog post objects.",
  input_schema: {
    type: "object",
    properties: { posts: { type: "array", items: POST_SCHEMA } },
    required: ["posts"],
  },
};

async function claudePosts(prompt, maxTokens = 16000) {
  if (!API_KEY) throw new Error("ANTHROPIC_API_KEY is not set");
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": API_KEY,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      tools: [POSTS_TOOL],
      tool_choice: { type: "tool", name: "submit_posts" },
      messages: [{ role: "user", content: prompt }],
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Anthropic API ${res.status}: ${text.slice(0, 500)}`);
  }
  const data = await res.json();
  const tool = (data.content || []).find((b) => b.type === "tool_use");
  if (!tool || !Array.isArray(tool.input?.posts)) {
    throw new Error(`Model did not return posts (stop_reason: ${data.stop_reason})`);
  }
  return tool.input.posts;
}

const TRANSLATE_TOOL = {
  name: "submit_translation",
  description: "Submit the translated string map.",
  input_schema: {
    type: "object",
    properties: { translation: { type: "object", additionalProperties: { type: "string" } } },
    required: ["translation"],
  },
};

// Translate every value of an English string map into one locale (keys unchanged).
async function claudeTranslate(enMap, localeName) {
  if (MOCK) {
    // Marker translation so the wiring/build can be tested without the API.
    return Object.fromEntries(Object.entries(enMap).map(([k, v]) => [k, `[${localeName}] ${v}`]));
  }
  if (!API_KEY) throw new Error("ANTHROPIC_API_KEY is not set");
  const prompt =
    `Translate EVERY value of this JSON object into natural, fluent, native ${localeName}. ` +
    `Return { translation } with the EXACT SAME KEYS. Keep the brand "EditoraPDF", "PDF", and ` +
    `file/format tokens (JPG, PNG, WebP, DOCX, XLSX, CSV, OCR, A4) as-is. Preserve leading/trailing ` +
    `spaces and terminal punctuation. OBJECT = ${JSON.stringify(enMap)}`;
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": API_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 16000,
      tools: [TRANSLATE_TOOL],
      tool_choice: { type: "tool", name: "submit_translation" },
      messages: [{ role: "user", content: prompt }],
    }),
  });
  if (!res.ok) throw new Error(`Anthropic API ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const data = await res.json();
  const tool = (data.content || []).find((b) => b.type === "tool_use");
  const tr = tool?.input?.translation;
  if (!tr || typeof tr !== "object") throw new Error(`Translation failed (${localeName}, stop_reason: ${data.stop_reason})`);
  // Per-key fill: keep English for any key the model dropped (never blank the page).
  return Object.fromEntries(Object.keys(enMap).map((k) => [k, tr[k] && String(tr[k]).trim() ? tr[k] : enMap[k]]));
}

// ─── Read existing slugs from registry.ts (the post wiring source of truth) ────
function existingSlugsFromRegistry(src) {
  // BLOG_POST_REGISTRY keys are quoted kebab-case slugs.
  const m = src.match(/BLOG_POST_REGISTRY[\s\S]*?\{([\s\S]*?)\n\}/);
  const body = m ? m[1] : src;
  return [...body.matchAll(/'([a-z0-9][a-z0-9-]*)':/g)].map((x) => x[1]);
}

// camelCase identifier for a slug, e.g. how-to-foo-bar → howToFooBar
function slugToIdent(slug) {
  return slug.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
}

// ─── Prompt ────────────────────────────────────────────────────────────────────
function generationPrompt(samples, existingSlugs) {
  return `You are a senior writer for EditoraPDF, a free, private, in-browser PDF editing tool. Write ${COUNT} brand-new English blog post(s).

Match the EXISTING posts exactly in voice, depth, structure, length, and on-page SEO. Study these ${samples.length} real examples (practical, reassuring, privacy-first tone; ~1300-1700 words across the sections; clear step-by-step "How to" structure; substantive FAQ answers):

${JSON.stringify(samples, null, 2)}

STRICT REQUIREMENTS for each new post object (call the submit_posts tool):
- "slug": short kebab-case, unique. MUST NOT be any of these existing slugs: ${JSON.stringify(existingSlugs)}
- "icon": one of ${JSON.stringify(ICONS)} (a lucide icon that fits the topic).
- "category1"/"category2": two DIFFERENT category keys from ${JSON.stringify(CATEGORIES)} that fit the topic.
- "cardTitle"/"cardDesc": the blog-index card heading + 1-2 sentence description.
- "metaTitle": <= 50 chars, primary keyword first. Do NOT append " | EditoraPDF" — the page layout adds the site name automatically, so including it here would double it.
- "metaDesc": 150-160 chars, includes the primary keyword.
- "ogTitle","ogDesc","ogAlt","twTitle","twDesc","heroAlt": social/SEO metadata.
- "bcLeaf": short breadcrumb label (e.g. "How to Flatten a PDF").
- "heroTitle": the main H1. "heroSubtitle": one-line supporting sentence.
- "artHeadline"/"artDesc": schema headline + description.
- "intro1"/"intro2": two intro paragraphs.
- "sections": EXACTLY 6 objects, each { "h": H2 heading, "p1": lead paragraph, "list": array of 0 OR 3-5 short items, "p2": closing paragraph (may be ""). At least 2 sections should use a non-empty list. Make one section a clear "How to ... : Step by Step" with an ordered list of steps. Cover privacy/no-upload somewhere.
- "faq": EXACTLY 6 { "q", "a" } objects with 2-4 sentence answers.

EditoraPDF facts to stay consistent with the samples: everything runs locally in the browser, files are never uploaded to a server, no account or install needed, works on any modern browser/phone/tablet, free with no watermark.

Pick fresh, non-overlapping PDF topics NOT covered by the existing slugs. Each post must be on a distinct topic. Call submit_posts with exactly ${COUNT} post object(s).`;
}

// ─── Build the .tsx post module from a generated post object ───────────────────
const q = (s) => JSON.stringify(String(s ?? "")); // safe JS string literal

// The English content map (C.en) for a post — the single source both buildPostTsx and the
// translator use, so the .i18n.ts keys always match C.en exactly.
function contentMap(post) {
  const C = {
    metaTitle: post.metaTitle, metaDesc: post.metaDesc,
    ogTitle: post.ogTitle, ogDesc: post.ogDesc, ogAlt: post.ogAlt,
    twTitle: post.twTitle, twDesc: post.twDesc, heroAlt: post.heroAlt,
    bcLeaf: post.bcLeaf, heroTitle: post.heroTitle, heroSubtitle: post.heroSubtitle,
    artHeadline: post.artHeadline, artDesc: post.artDesc,
    intro1: post.intro1, intro2: post.intro2,
  };
  const sections = (post.sections || []).slice(0, 6);
  sections.forEach((s, i) => {
    const n = i + 1;
    C[`s${n}h`] = s.h;
    C[`s${n}p1`] = s.p1;
    (s.list || []).forEach((item, j) => { C[`s${n}l${j + 1}`] = item; });
    if (s.p2) C[`s${n}p2`] = s.p2;
  });
  (post.faq || []).slice(0, 6).forEach((f, i) => {
    C[`fv${i + 1}q`] = f.q;
    C[`fv${i + 1}a`] = f.a;
  });
  return C;
}

function buildPostTsx(post, slug, today) {
  const C = contentMap(post);
  const sections = (post.sections || []).slice(0, 6);
  const cEntries = Object.entries(C).map(([k, v]) => `    ${k}: ${q(v)},`).join("\n");

  const sectionJsx = sections.map((s, i) => {
    const n = i + 1;
    const list = (s.list || []).slice(0, 5);
    const listJsx = list.length
      ? `              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
${list.map((_, j) => `                <li>{c.s${n}l${j + 1}}</li>`).join("\n")}
              </ul>\n`
      : "";
    const p2Jsx = s.p2 ? `              <p className="text-surface-300 leading-relaxed">{c.s${n}p2}</p>\n` : "";
    return `            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s${n}h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">{c.s${n}p1}</p>
${listJsx}${p2Jsx}            </section>`;
  }).join("\n\n");

  const ident = slugToIdent(slug);

  return `import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../../../components/Header'
import BlogByline from '../../../components/BlogByline'
import { getMessages } from '../../../i18n/messages'
import { localeAlternates, getOgLocale } from '../../../lib/seo'
import type { AppLocale } from '../../../../i18n/config'

const siteUrl = 'https://editorapdf.com'
const slug = '${slug}'
const postPath = \`/blog/\${slug}\`
const heroImage = '${HERO_IMAGE}'
const datePublished = '${today}'
const dateModified = '${today}'

const postUrl = (locale: AppLocale) => \`\${siteUrl}/\${locale}\${postPath}\`

// Per-locale content. \`en\` is the source map; other locales fall back to en per-key until
// translations are added in ./${slug}.i18n (see TRANSLATIONS merge at the bottom).
type Content = Record<string, string>

const C: Record<AppLocale, Content> = {
  en: {
${cEntries}
  },
  uk: {}, de: {}, es: {}, fr: {}, it: {},
} as Record<AppLocale, Content>

function content(locale: AppLocale): Content {
  const base = C.en
  const over = C[locale] ?? {}
  return new Proxy(base, { get: (_t, k: string) => (k in over ? over[k] : base[k]) }) as Content
}

export function meta(locale: AppLocale): Metadata {
  const c = content(locale)
  const url = postUrl(locale)
  return {
    title: c.metaTitle,
    description: c.metaDesc,
    openGraph: {
      type: 'article',
      locale: getOgLocale(locale),
      title: c.ogTitle,
      description: c.ogDesc,
      url,
      siteName: 'EditoraPDF',
      images: [{ url: \`\${siteUrl}\${heroImage}\`, width: 1200, height: 630, alt: c.ogAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: c.twTitle,
      description: c.twDesc,
      images: [\`\${siteUrl}\${heroImage}\`],
    },
    alternates: localeAlternates(locale, postPath),
  }
}

export function schemas(locale: AppLocale): Record<string, unknown>[] {
  const c = content(locale)
  const url = postUrl(locale)
  const m = getMessages(locale)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': \`\${url}#faq\`,
    mainEntity: [1, 2, 3, 4, 5, 6].map((n) => ({
      '@type': 'Question',
      name: c[\`fv\${n}q\`],
      acceptedAnswer: { '@type': 'Answer', text: c[\`fv\${n}a\`] },
    })),
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': \`\${url}#breadcrumbs\`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: m['blog.bcHome'] || 'Home', item: \`\${siteUrl}/\${locale}\` },
      { '@type': 'ListItem', position: 2, name: m['blog.bcBlog'] || 'Blog', item: \`\${siteUrl}/\${locale}/blog\` },
      { '@type': 'ListItem', position: 3, name: c.bcLeaf, item: url },
    ],
  }
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': \`\${url}#article\`,
    headline: c.heroTitle,
    description: c.metaDesc,
    image: \`\${siteUrl}\${heroImage}\`,
    inLanguage: locale,
    author: { '@type': 'Organization', name: 'EditoraPDF Team', url: siteUrl },
    publisher: {
      '@type': 'Organization',
      name: 'EditoraPDF',
      logo: { '@type': 'ImageObject', url: \`\${siteUrl}/logo.svg\` },
    },
    datePublished,
    dateModified,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  }
  return [faqSchema, breadcrumbSchema, articleSchema]
}

export function Article({ locale }: { locale: AppLocale }) {
  const c = content(locale)
  const m = getMessages(locale)
  const t = (k: string, fb: string) => (m[k] && m[k].trim() ? m[k] : fb)
  const L = (p: string) => \`/\${locale}\${p}\`

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Breadcrumbs */}
      <nav className="bg-surface-800/30 border-b border-surface-700/30" aria-label="Breadcrumb">
        <div className="max-w-4xl mx-auto px-6 py-3">
          <ol className="flex items-center gap-2 text-sm text-surface-400">
            <li>
              <Link href={L('')} className="hover:text-primary-400 transition-colors">{t('blog.bcHome', 'Home')}</Link>
            </li>
            <li>/</li>
            <li>
              <Link href={L('/blog')} className="hover:text-primary-400 transition-colors">{t('blog.bcBlog', 'Blog')}</Link>
            </li>
            <li>/</li>
            <li className="text-surface-300">{c.bcLeaf}</li>
          </ol>
        </div>
      </nav>

      {/* Hero Image with Title Overlay */}
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden bg-surface-800">
        <Image fill priority sizes="100vw"
          src={heroImage}
          alt={c.heroAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-900/90 via-surface-900/50 to-surface-900/30" />
        <div className="absolute inset-0 flex items-end">
          <div className="w-full max-w-4xl mx-auto px-6 pb-8 md:pb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              {c.heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-surface-200 leading-relaxed max-w-3xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              {c.heroSubtitle}
            </p>
            <BlogByline locale={locale} datePublished={datePublished} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <article className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-8">
            <p className="text-xl text-surface-300 leading-relaxed mb-4">{c.intro1}</p>
            <p className="text-lg text-surface-400">{c.intro2}</p>
          </div>

          <div className="prose prose-invert prose-lg max-w-none">
${sectionJsx}

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{t('blog.faqTitle', 'Frequently Asked Questions')}</h2>
              <div className="space-y-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n}>
                    <h3 className="text-xl font-semibold text-white mb-2">{c[\`fv\${n}q\`]}</h3>
                    <p className="text-surface-300 leading-relaxed">{c[\`fv\${n}a\`]}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Back to Blog Link */}
          <div className="mt-12 pt-8 border-t border-surface-700/50">
            <Link href={L('/blog')} className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              {t('blog.backToBlog', 'Back to Blog')}
            </Link>
          </div>
        </div>
      </article>

      {/* Background */}
      <div className="fixed inset-0 bg-mesh -z-10" aria-hidden="true" />
      <div className="fixed inset-0 bg-grid opacity-30 -z-10" aria-hidden="true" />
    </main>
  )
}

// Translations are merged in at module load (English-only for now; locales fall back to en).
import { TRANSLATIONS } from './${slug}.i18n'
Object.assign(C, TRANSLATIONS)
`;
}

// translations: { uk: {key:val,...}, de: {...}, ... } — populated maps mirroring C.en.
function buildPostI18n(slug, translations) {
  const body = translations && Object.keys(translations).length
    ? JSON.stringify(translations, null, 2)
    : "{}";
  return `import type { AppLocale } from '../../../../i18n/config'

// Translated string maps for ${slug}. Keys mirror C.en in ./${slug}.tsx.
// Machine-translated at generation time; missing keys fall back to English per-key.
export const TRANSLATIONS: Partial<Record<AppLocale, Record<string, string>>> = ${body}
`;
}

// ─── Build the BlogIndex card (hand-authored JSX block) ────────────────────────
function buildIndexCard(post, slug) {
  const ident = slugToIdent(slug);
  return `            {/* Blog Post: ${post.cardTitle} */}
            <Link href={L('${slug}')} className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-primary-500/20 to-info-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <${post.icon} className="w-24 h-24 text-primary-400/50" strokeWidth={1.5} />
                </div>
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-primary-500/90 text-white text-[10px] font-bold uppercase tracking-wider shadow-lg">
                  {c.badgeNew}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">{c.${post.category1}}</span>
                  <span className="px-2 py-0.5 rounded bg-success-500/20 text-success-300 text-xs font-medium">{c.${post.category2}}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">{c.${ident}CardTitle}</h3>
                <p className="text-surface-400 mb-4 line-clamp-3">{c.${ident}CardDesc}</p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {c.readMore}
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>`;
}

// ─── Quality gate ─────────────────────────────────────────────────────────────
function wordCount(p) {
  let w = 0;
  const add = (s) => { if (s) w += String(s).trim().split(/\s+/).filter(Boolean).length; };
  add(p.intro1); add(p.intro2);
  (p.sections || []).forEach((s) => { add(s.h); add(s.p1); add(s.p2); (s.list || []).forEach(add); });
  (p.faq || []).forEach((f) => { add(f.q); add(f.a); });
  return w;
}

// Returns a rejection reason, or "" if the post is publishable. The .tsx/schema map over
// EXACTLY 6 sections + 6 FAQ, so anything short would render undefined — reject it.
function qualityIssue(p) {
  if (!p || typeof p !== "object") return "not an object";
  for (const k of ["slug", "cardTitle", "cardDesc", "metaTitle", "metaDesc", "heroTitle", "heroSubtitle", "intro1", "intro2"]) {
    if (!p[k] || !String(p[k]).trim()) return `missing ${k}`;
  }
  const secs = Array.isArray(p.sections) ? p.sections : [];
  if (secs.length < 6) return `only ${secs.length} sections (need 6)`;
  if (secs.slice(0, 6).some((s) => !s || !s.h || !s.p1)) return "a section is missing its heading or lead";
  const faq = Array.isArray(p.faq) ? p.faq : [];
  if (faq.length < 6) return `only ${faq.length} FAQ (need 6)`;
  if (faq.slice(0, 6).some((f) => !f || !f.q || !f.a)) return "an FAQ is missing its question or answer";
  const w = wordCount(p);
  if (w < 700) return `too thin (~${w} words)`;
  return "";
}

// A canned, valid post for `--mock` runs (tests the write/translate/wire/build path, no API).
function mockPost(existingSlugs) {
  let slug = "how-to-mock-test-a-pdf-online", i = 1;
  while (existingSlugs.includes(slug)) slug = `how-to-mock-test-a-pdf-online-${i++}`;
  const sec = (h) => ({ h, p1: "Lead paragraph explaining the topic in several sentences for testing purposes only, written to be long enough that the quality gate word count is comfortably satisfied when the mock post is validated during a local wiring test of the blog generator pipeline.", list: ["First test step or point here for the mock", "Second test step or point here for the mock", "Third test step or point here for the mock"], p2: "Closing paragraph for this section, a few sentences long so the mock post has realistic body length, rounding out the section during testing without ever calling the translation or generation API." });
  return {
    slug, icon: "Layers", category1: "catGuide", category2: "catPdfTools",
    cardTitle: "Mock Test Post Title", cardDesc: "A mock blog-index card description used only for local wiring tests.",
    metaTitle: "Mock Test Post: Local Wiring Check", metaDesc: "A mock meta description that is roughly the right length for exercising the blog generator wiring and the production build.",
    ogTitle: "Mock Test Post", ogDesc: "Mock OG description.", ogAlt: "Mock OG alt", twTitle: "Mock Test Post", twDesc: "Mock Twitter description.",
    heroAlt: "Mock hero alt text", bcLeaf: "Mock Test", heroTitle: "Mock Test Post: A Local Wiring Test", heroSubtitle: "This is a mock hero subtitle used only when running the generator with --mock.",
    artHeadline: "Mock Test Post", artDesc: "Mock article description.",
    intro1: "This is the first intro paragraph of the mock post, present only so the generator has realistic content to write and wire during local testing without calling the API at all.",
    intro2: "This is the second intro paragraph, adding a little more length so the word-count quality gate comfortably passes during the mock test run.",
    sections: ["What This Is", "Why It Matters", "How It Works", "Step by Step", "Tips", "Limitations"].map(sec),
    faq: [1, 2, 3, 4, 5, 6].map((n) => ({ q: `Mock question number ${n}?`, a: `Mock answer number ${n}, a sentence or two long so the FAQ has real content for testing.` })),
  };
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  let registrySrc = await readFile(REGISTRY_TS, "utf8");
  const existingSlugs = existingSlugsFromRegistry(registrySrc);

  // Two recent posts as the style reference. Pull their card text from BlogIndex C.en.
  const samples = [
    {
      slug: "how-to-flatten-pdf-online",
      cardTitle: "How to Flatten a PDF Online: Lock Form Fields and Annotations",
      heroTitle: "How to Flatten a PDF Online: Lock Form Fields and Annotations",
      sectionHeadings: [
        "What Does It Mean to Flatten a PDF?",
        "Why Would You Flatten a PDF?",
        "Flatten a PDF Online Without Uploading Your Files",
        "How to Flatten a PDF Online: Step by Step",
        "Tips for Getting a Clean Result",
        "Limitations and Things to Know",
      ],
      faqSample: { q: "Is it free to flatten a PDF online?", a: "Yes. EditoraPDF lets you flatten a PDF online completely free, with no account, no sign-up, and no watermark." },
    },
  ];

  console.log(`→ Generating ${COUNT} new English post(s) with ${MODEL}…`);
  const generated = MOCK ? [mockPost(existingSlugs)] : await claudePosts(generationPrompt(samples, existingSlugs));

  const today = new Date().toISOString().slice(0, 10);
  const seen = new Set(existingSlugs);
  const newPosts = [];
  for (const p of Array.isArray(generated) ? generated : [generated]) {
    const reason = qualityIssue(p);
    if (reason) { console.warn(`  ⚠ rejected post "${p?.slug}": ${reason}`); continue; }
    const slug = String(p.slug).trim().toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
    if (!slug || seen.has(slug)) { console.warn(`  ⚠ duplicate/empty slug "${slug}" — skipping`); continue; }
    if (!ICONS.includes(p.icon)) p.icon = "Layers";
    if (!CATEGORIES.includes(p.category1)) p.category1 = "catGuide";
    if (!CATEGORIES.includes(p.category2) || p.category2 === p.category1) p.category2 = "catPdfTools";
    // Defensive: the [locale] layout title.template already appends " | EditoraPDF".
    // Strip any brand suffix the model added so the rendered <title> isn't doubled.
    p.metaTitle = String(p.metaTitle || "").replace(/\s*[|–—-]\s*(Blog\s+(?:de|di)?\s*)?Editora\s?PDF\s*$/i, "").trim();
    seen.add(slug);
    newPosts.push({ ...p, slug });
  }
  if (!newPosts.length) throw new Error("No posts passed the quality gate");
  console.log(`  ✓ ${newPosts.length} post(s): ${newPosts.map((p) => `${p.slug} (~${wordCount(p)}w)`).join(", ")}`);

  // Translate each post's content map (+ its card text) into the 5 non-English locales.
  // enC → { uk: {...}, de: {...}, ... }; card text is carried on the __cardTitle/__cardDesc keys.
  const postTr = new Map();   // slug → { locale → C-map }
  const cardTr = new Map();   // slug → { locale → { <ident>CardTitle, <ident>CardDesc } }
  for (const p of newPosts) {
    const ident = slugToIdent(p.slug);
    const enC = { ...contentMap(p), __cardTitle: p.cardTitle, __cardDesc: p.cardDesc };
    const perLocale = {}, perCard = {};
    if (!NO_TRANSLATE) {
      for (const loc of LOCALES) {
        const t = await claudeTranslate(enC, loc.name);
        const { __cardTitle, __cardDesc, ...cKeys } = t;
        perLocale[loc.code] = cKeys;
        perCard[loc.code] = { [`${ident}CardTitle`]: __cardTitle, [`${ident}CardDesc`]: __cardDesc };
      }
      console.log(`  ✓ translated ${p.slug} → ${LOCALES.map((l) => l.code).join("/")}`);
    }
    postTr.set(p.slug, perLocale);
    cardTr.set(p.slug, perCard);
  }

  if (NO_WRITE) {
    console.log("\n--no-write: nothing written. Generated posts:\n");
    console.log(JSON.stringify(newPosts.map((p) => ({ slug: p.slug, title: p.heroTitle, words: wordCount(p) })), null, 2));
    return;
  }

  // 1) Write the .tsx + populated .i18n.ts post modules.
  for (const p of newPosts) {
    await writeFile(path.join(POSTS_DIR, `${p.slug}.tsx`), buildPostTsx(p, p.slug, today));
    await writeFile(path.join(POSTS_DIR, `${p.slug}.i18n.ts`), buildPostI18n(p.slug, postTr.get(p.slug)));
    console.log(`  ✓ wrote app/data/blog/posts/${p.slug}.{tsx,i18n.ts}`);
  }

  // 2) registry.ts — add `import * as <ident> from './posts/<slug>'` + a registry entry.
  {
    let src = await readFile(REGISTRY_TS, "utf8");
    const importLines = newPosts
      .map((p) => `import * as ${slugToIdent(p.slug)} from './posts/${p.slug}'`)
      .join("\n");
    // Insert imports after the last existing `import * as ... from './posts/...'` line.
    const lastImport = src.lastIndexOf("from './posts/");
    const lineEnd = src.indexOf("\n", lastImport);
    src = src.slice(0, lineEnd + 1) + importLines + "\n" + src.slice(lineEnd + 1);
    // Insert registry entries before the closing `}` of BLOG_POST_REGISTRY.
    const regAnchor = src.indexOf("export const BLOG_POST_REGISTRY");
    const closeIdx = src.indexOf("\n}", regAnchor);
    const entries = newPosts
      .map((p) => `  '${p.slug}': ${slugToIdent(p.slug)},`)
      .join("\n");
    src = src.slice(0, closeIdx) + "\n" + entries + src.slice(closeIdx);
    await writeFile(REGISTRY_TS, src);
    console.log(`  ✓ wired ${newPosts.length} post(s) into registry.ts`);
  }

  // 3) migrated.ts — add slug(s) to MIGRATED_BLOG_SLUGS (→ static params + sitemap).
  {
    let src = await readFile(MIGRATED_TS, "utf8");
    const anchor = src.indexOf("export const MIGRATED_BLOG_SLUGS = [");
    const closeIdx = src.indexOf("\n] as const", anchor);
    const entries = newPosts.map((p) => `  '${p.slug}',`).join("\n");
    src = src.slice(0, closeIdx) + "\n" + entries + src.slice(closeIdx);
    await writeFile(MIGRATED_TS, src);
    console.log(`  ✓ added ${newPosts.length} slug(s) to migrated.ts (sitemap + static params)`);
  }

  // 4) BlogIndex.tsx — add the English card text into C.en and a <Link> card into the grid.
  {
    let src = await readFile(BLOG_INDEX_TSX, "utf8");
    // 4a) Add CardTitle/CardDesc keys to C.en (insert before the line `  },` that closes en).
    const enStart = src.indexOf("  en: {");
    const enClose = src.indexOf("\n  },", enStart); // first `  },` after en: { closes the en map
    const keyLines = newPosts
      .map((p) => {
        const id = slugToIdent(p.slug);
        return `    ${id}CardTitle: ${q(p.cardTitle)},\n    ${id}CardDesc: ${q(p.cardDesc)},`;
      })
      .join("\n");
    src = src.slice(0, enClose) + "\n" + keyLines + src.slice(enClose);
    // 4b) Insert the new card(s) right after the grid open so they appear first (newest).
    const gridOpen = src.indexOf('<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">');
    const gridLineEnd = src.indexOf("\n", gridOpen);
    const cards = newPosts.map((p) => buildIndexCard(p, p.slug)).join("\n\n");
    src = src.slice(0, gridLineEnd + 1) + cards + "\n\n" + src.slice(gridLineEnd + 1);
    await writeFile(BLOG_INDEX_TSX, src);
    console.log(`  ✓ added ${newPosts.length} card(s) to BlogIndex.tsx`);
  }

  // 5) indexContent.ts — localized blog-index card title/desc for the 5 non-en locales
  //    (so the cards aren't English on /uk/blog, /de/blog, …).
  if (!NO_TRANSLATE) {
    let src = await readFile(INDEX_CONTENT_TS, "utf8");
    for (const loc of LOCALES) {
      const lines = newPosts.flatMap((p) =>
        Object.entries(cardTr.get(p.slug)?.[loc.code] || {}).map(([k, v]) => `    ${q(k)}: ${q(v)},`)
      );
      if (!lines.length) continue;
      const anchor = src.indexOf(`"${loc.code}": {`);
      if (anchor < 0) { console.warn(`  ⚠ indexContent.ts: no "${loc.code}" block`); continue; }
      const lineEnd = src.indexOf("\n", anchor); // end of the `"uk": {` line
      src = src.slice(0, lineEnd + 1) + lines.join("\n") + "\n" + src.slice(lineEnd + 1);
    }
    await writeFile(INDEX_CONTENT_TS, src);
    console.log(`  ✓ added localized card text to indexContent.ts`);
  }

  // 6) searchIndex.ts — a BLOG_POSTS entry so RelatedArticles/tool cross-links + blog
  //    search surface the post (tags come from the two chosen category labels).
  {
    let src = await readFile(SEARCH_INDEX_TS, "utf8");
    const anchor = src.indexOf("export const BLOG_POSTS: BlogPost[] = [");
    const lineEnd = src.indexOf("\n", anchor);
    const entries = newPosts.map((p) => {
      const tags = [CAT_LABEL[p.category1] || "Guide", CAT_LABEL[p.category2] || "PDF Tools"];
      return `  {\n    slug: ${q(p.slug)},\n    title: ${q(p.cardTitle)},\n    description: ${q(p.cardDesc)},\n    tags: [${tags.map(q).join(", ")}],\n  },`;
    }).join("\n");
    src = src.slice(0, lineEnd + 1) + entries + "\n" + src.slice(lineEnd + 1);
    await writeFile(SEARCH_INDEX_TS, src);
    console.log(`  ✓ added ${newPosts.length} entry(ies) to searchIndex.ts`);
  }

  console.log("\n✅ Done. New posts render localized at /<locale>/blog/<slug> and are in the sitemap.");
}

main().catch((err) => {
  console.error("❌", err.message);
  process.exit(1);
});
