import React from "react";
import Link from "next/link";
import { getPublishedArticles } from "@/lib/db/repositories/articles";
import { Card } from "@/components/ui/Card";
import { BookOpen, Calendar, ArrowRight, ShieldAlert } from "lucide-react";

export const metadata = {
  title: "Legal Information & Articles",
  description:
    "Reviewed legal articles and procedural analyses on statutory amendments and judicial precedents in Haryana and Delhi NCR.",
};

export default async function LegalArticlesIndexPage() {
  const articles = await getPublishedArticles();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-12">
      {/* Header */}
      <div className="border-b border-border-subtle pb-6 space-y-2">
        <span className="text-xs uppercase tracking-widest text-gold-dark font-semibold">
          Legal Commentary &amp; Education
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy">
          Legal Articles &amp; Statutory Notes
        </h1>
        <p className="text-sm text-text-secondary max-w-3xl leading-relaxed">
          The following commentaries are published solely for general academic and informational purposes.
          Each published article has undergone editorial review. These notes do not constitute legal advice on individual matters.
        </p>
      </div>

      {/* Article Listing */}
      {articles.length === 0 ? (
        <Card variant="ivory" className="text-center py-12 space-y-3">
          <BookOpen className="w-8 h-8 text-text-muted mx-auto" />
          <h2 className="font-serif text-lg font-bold text-navy">No Articles Currently Published</h2>
          <p className="text-xs text-text-secondary max-w-md mx-auto">
            Articles undergoing professional review and judicial citation verification will appear here once approved.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article) => (
            <Card
              key={article.id}
              variant="default"
              className="flex flex-col justify-between space-y-5 hover:border-navy transition-colors"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-xs text-text-muted">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      {new Date(article.publishedAt || article.createdAt).toLocaleDateString("en-IN", {
                        dateStyle: "medium",
                      })}
                    </span>
                  </span>
                  <span>&bull;</span>
                  <span>{article.readingTimeMinutes} min read</span>
                </div>

                <h2 className="font-serif text-xl font-bold text-navy leading-snug">
                  <Link href={`/legal-articles/${article.slug}`} className="hover:text-gold-dark transition-colors">
                    {article.title}
                  </Link>
                </h2>

                <p className="text-xs text-text-secondary leading-relaxed">
                  {article.summary}
                </p>

                {article.categories && article.categories.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {article.categories.map((cat, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-ivory text-navy border border-border-subtle rounded text-[11px] font-medium"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-border-subtle flex items-center justify-between text-xs">
                <span className="text-text-muted">Author: {article.author}</span>
                <Link
                  href={`/legal-articles/${article.slug}`}
                  className="inline-flex items-center gap-1 font-semibold text-navy hover:text-gold-dark"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Distinction Disclaimer */}
      <div className="p-4 bg-ivory rounded border border-border-subtle text-xs text-text-secondary flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-gold-dark flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Mandatory Distinction:</strong> The opinions and analyses set out in these articles represent
          academic analysis of statutes and reported judgments. They must not be treated as a substitute for direct legal advice.
          Statutes and procedures may vary according to recent amendments or local High Court rules.
        </p>
      </div>
    </div>
  );
}
