import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/db/repositories/articles";
import { SafeMarkdown } from "@/components/markdown/SafeMarkdown";
import { ArrowLeft, Calendar, User, Clock, ShieldAlert } from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug, false);

  if (!article) {
    return { title: "Article Not Found" };
  }

  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.summary,
    alternates: {
      canonical: `/legal-articles/${article.slug}`,
    },
  };
}

export default async function LegalArticleViewPage({ params }: Props) {
  const { slug } = await params;
  // Strictly enforce includeDrafts = false on public route
  const article = await getArticleBySlug(slug, false);

  if (!article) {
    notFound();
  }

  const publishedDate = new Date(article.publishedAt || article.createdAt).toLocaleDateString("en-IN", {
    dateStyle: "long",
  });
  const updatedDate = new Date(article.updatedAt).toLocaleDateString("en-IN", {
    dateStyle: "long",
  });

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-10">
      {/* Back Link */}
      <div>
        <Link
          href="/legal-articles"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-navy transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Legal Articles</span>
        </Link>
      </div>

      {/* Article Header */}
      <header className="border-b border-border-subtle pb-8 space-y-4">
        {article.categories && article.categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {article.categories.map((cat, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 bg-ivory text-navy border border-border-subtle rounded text-xs font-semibold uppercase tracking-wider"
              >
                {cat}
              </span>
            ))}
          </div>
        )}

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted pt-2">
          <span className="flex items-center gap-1.5 font-medium text-text-secondary">
            <User className="w-3.5 h-3.5" />
            <span>{article.author}</span>
          </span>
          <span>&bull;</span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>Published: {publishedDate}</span>
          </span>
          {article.updatedAt !== article.createdAt && (
            <>
              <span>&bull;</span>
              <span>Updated: {updatedDate}</span>
            </>
          )}
          <span>&bull;</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{article.readingTimeMinutes} min read</span>
          </span>
        </div>
      </header>

      {/* Mandatory Regulatory Warning Box */}
      <aside aria-label="Article Notice" className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-md text-xs text-amber-900 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold uppercase tracking-wider">Educational Information Only:</p>
          <p className="leading-relaxed">
            This article presents general commentary on Indian statutory law and judicial precedents.
            It does not constitute legal counsel, nor does viewing it establish an advocate-client relationship.
            Litigants must seek independent advice from a certified advocate concerning individual case facts.
          </p>
        </div>
      </aside>

      {/* Article Content Rendered Safely */}
      <div className="bg-white rounded-lg border border-border-subtle p-6 sm:p-10 shadow-subtle">
        <SafeMarkdown content={article.content} />
      </div>

      {/* Tags & Footer Navigation */}
      {article.tags && article.tags.length > 0 && (
        <div className="pt-4 border-t border-border-subtle flex flex-wrap items-center gap-2 text-xs">
          <span className="text-text-muted font-medium">Topics:</span>
          {article.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 bg-ivory text-text-secondary border border-border-subtle rounded text-[11px]"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
