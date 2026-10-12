"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { LegalArticle } from "@/types";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  FileText,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
} from "lucide-react";

export default function AdminArticlesListPage() {
  const [articles, setArticles] = useState<LegalArticle[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [actionError, setActionError] = useState<string | null>(null);

  const fetchArticles = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/admin/articles");
      if (res.ok) {
        const data = await res.json();
        setArticles(data.articles || []);
      }
    } catch {
      setActionError("Failed to load articles.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }
    try {
      const res = await fetch(`/api/admin/articles/${id}`, { method: "DELETE" });
      if (res.ok) {
        setArticles((prev) => prev.filter((a) => a.id !== id));
      }
    } catch {
      setActionError("Failed to delete article.");
    }
  };

  const filteredArticles = articles.filter((a) => {
    if (filter === "all") return true;
    return a.status === filter;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-navy">
            Legal Articles CMS
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            Manage legal publications, editorial reviews, and public publication states.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/articles/new"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-gold hover:bg-gold-light text-navy text-xs font-semibold rounded transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Draft New Article</span>
          </Link>
        </div>
      </div>

      {actionError && (
        <div className="p-3 bg-red-50 border border-red-300 rounded text-xs text-red-800 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-red-700 mt-0.5 flex-shrink-0" />
          <span>{actionError}</span>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {["all", "published", "reviewed", "draft"].map((st) => (
          <button
            key={st}
            onClick={() => setFilter(st)}
            className={`px-3 py-1.5 text-xs font-semibold rounded uppercase tracking-wider transition-colors ${
              filter === st
                ? "bg-navy text-ivory"
                : "bg-white text-text-secondary border border-border-subtle hover:bg-stone-50"
            }`}
          >
            {st} ({articles.filter((a) => (st === "all" ? true : a.status === st)).length})
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="text-center py-16 text-xs text-text-muted">Loading articles...</div>
      ) : filteredArticles.length === 0 ? (
        <Card variant="ivory" className="text-center py-12 space-y-2">
          <FileText className="w-8 h-8 text-text-muted mx-auto" />
          <h2 className="font-serif text-base font-bold text-navy">No Articles Found</h2>
          <p className="text-xs text-text-secondary">
            {filter === "all"
              ? "No articles created yet. Click 'Draft New Article' to create one."
              : `No articles found with status "${filter}".`}
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white border border-border-subtle rounded-lg p-5 sm:p-6 space-y-3 shadow-subtle flex flex-col justify-between"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border-subtle pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="font-serif text-base font-bold text-navy">{article.title}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                      article.status === "published"
                        ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                        : article.status === "reviewed"
                        ? "bg-sky-50 text-sky-800 border-sky-300"
                        : "bg-amber-50 text-amber-800 border-amber-300"
                    }`}
                  >
                    {article.status}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-text-muted">
                  <span>Slug: /{article.slug}</span>
                  <span>&bull;</span>
                  <span>{article.readingTimeMinutes} min read</span>
                </div>
              </div>

              <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
                {article.summary}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-border-subtle text-xs">
                <div className="text-[11px] text-text-muted flex items-center gap-3">
                  <span>Author: {article.author}</span>
                  <span>&bull;</span>
                  <span>Updated: {new Date(article.updatedAt).toLocaleDateString("en-IN")}</span>
                </div>

                <div className="flex items-center gap-2">
                  {article.status === "published" && (
                    <Link
                      href={`/legal-articles/${article.slug}`}
                      target="_blank"
                      className="px-2.5 py-1 text-xs text-navy hover:text-gold-dark border border-border-subtle rounded inline-flex items-center gap-1 bg-ivory"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Live</span>
                    </Link>
                  )}

                  <Link
                    href={`/admin/articles/${article.id}/edit`}
                    className="px-2.5 py-1 text-xs text-navy hover:bg-stone-50 border border-border-subtle rounded inline-flex items-center gap-1 bg-white font-medium"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </Link>

                  <Button
                    onClick={() => handleDelete(article.id, article.title)}
                    variant="danger"
                    size="sm"
                    className="px-2 py-1"
                    title="Delete article"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
