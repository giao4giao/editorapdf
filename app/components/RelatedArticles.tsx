import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';
import { getRelatedPosts } from '../data/toolBlogMap';

interface RelatedArticlesProps {
  toolId: string;
  /** Used only for analytics labelling; blog URLs stay un-prefixed because posts live at /blog/:slug */
  locale?: string;
  limit?: number;
}

export default function RelatedArticles({ toolId, limit = 3 }: RelatedArticlesProps) {
  const posts = getRelatedPosts(toolId, limit);
  if (posts.length === 0) return null;

  return (
    <section
      aria-labelledby={`related-articles-${toolId}`}
      className="w-full max-w-5xl mx-auto px-4 sm:px-6 pb-12 mt-2"
    >
      <div className="card p-6 md:p-8 bg-gradient-to-br from-surface-800/60 via-surface-800/40 to-surface-900/60 border-surface-700/50">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-9 h-9 rounded-lg bg-primary-500/15 flex items-center justify-center text-primary-400">
            <BookOpen size={18} strokeWidth={1.75} />
          </div>
          <div>
            <h2
              id={`related-articles-${toolId}`}
              className="text-base md:text-lg font-semibold text-white"
            >
              Read also
            </h2>
            <p className="text-xs text-surface-500">
              Guides and explainers related to this tool
            </p>
          </div>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {posts.map((post) => (
            <li key={post.slug} className="h-full">
              <Link
                href={`/blog/${post.slug}`}
                className="group h-full flex flex-col p-4 rounded-xl bg-surface-800/40 border border-surface-700/50 hover:border-primary-500/40 hover:bg-surface-800/60 transition-all duration-200"
              >
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-1.5 py-0.5 rounded bg-surface-700/50 text-[10px] font-medium text-surface-400 uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <h3 className="text-sm font-semibold text-white leading-snug mb-2 group-hover:text-primary-300 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-surface-400 leading-relaxed line-clamp-2 mb-3 flex-1">
                  {post.description}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-primary-400 group-hover:gap-1.5 transition-all mt-auto">
                  Read more
                  <ArrowRight size={12} strokeWidth={2.25} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
