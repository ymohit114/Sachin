"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LegalArticle, ArticleStatus } from "@/types";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { SafeMarkdown } from "@/components/markdown/SafeMarkdown";
import { auditTextForCompliance } from "@/lib/compliance/bci-rules";
import {
  FileText,
  Eye,
  Edit3,
  ShieldAlert,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Save,
} from "lucide-react";
import Link from "next/link";

interface ArticleEditorProps {
  initialArticle?: LegalArticle;
  isNew?: boolean;
}

export function ArticleEditor({ initialArticle, isNew = false }: ArticleEditorProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialArticle?.title || "");
  const [slug, setSlug] = useState(initialArticle?.slug || "");
  const [summary, setSummary] = useState(initialArticle?.summary || "");
  const [content, setContent] = useState(initialArticle?.content || "");
  const [author, setAuthor] = useState(initialArticle?.author || "Advocate Sachin [Pending Verification]");
  const [status, setStatus] = useState<ArticleStatus>(initialArticle?.status || "draft");
  const [categoriesText, setCategoriesText] = useState(initialArticle?.categories?.join(", ") || "Commercial Law");
  const [tagsText, setTagsText] = useState(initialArticle?.tags?.join(", ") || "");
  const [seoTitle, setSeoTitle] = useState(initialArticle?.seoTitle || "");
  const [seoDescription, setSeoDescription] = useState(initialArticle?.seoDescription || "");

  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [complianceViolations, setComplianceViolations] = useState<string[]>([]);

  // Automatically generate slug from title when slug is empty
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (isNew && (!slug || slug === "")) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setSlug(generated);
    }
  };

  const handleSave = async (targetStatus?: ArticleStatus) => {
    setErrorMessage(null);
    setComplianceViolations([]);

    const currentStatus = targetStatus || status;

    // Check compliance
    const compliance = auditTextForCompliance(`${title} ${summary} ${content}`);
    if (!compliance.isCompliant) {
      setComplianceViolations(compliance.violations);
      if (currentStatus === "published") {
        setErrorMessage(
          "BCI Rule 36 Compliance Warning: The article contains promotional terms and cannot be published until resolved."
        );
        return;
      }
    }

    if (!title.trim() || !slug.trim() || !summary.trim() || !content.trim()) {
      setErrorMessage("Please complete all required fields (Title, Slug, Summary, and Content).");
      return;
    }

    const categories = categoriesText
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);

    const tags = tagsText
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    setIsSaving(true);
    try {
      const payload = {
        title,
        slug,
        summary,
        content,
        author,
        status: currentStatus,
        categories,
        tags,
        seoTitle,
        seoDescription,
        reviewed: currentStatus !== "draft",
        approved: currentStatus === "published",
      };

      const url = isNew ? "/api/admin/articles" : `/api/admin/articles/${initialArticle?.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Failed to save article.");
        if (data.violations) {
          setComplianceViolations(data.violations);
        }
        return;
      }

      router.push("/admin/articles");
      router.refresh();
    } catch {
      setErrorMessage("Network error while saving article.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/articles"
            className="p-1.5 text-text-secondary hover:text-navy rounded border border-border-subtle bg-white"
            title="Back to articles list"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-serif text-2xl font-bold text-navy">
              {isNew ? "Create Legal Article" : "Edit Article"}
            </h1>
            <p className="text-xs text-text-secondary">
              Educational commentary &bull; BCI Rule 36 workflow
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            onClick={() => handleSave("draft")}
            variant="outline"
            size="sm"
            isLoading={isSaving}
          >
            <Save className="w-3.5 h-3.5 mr-1.5" />
            <span>Save as Draft</span>
          </Button>

          <Button
            onClick={() => handleSave("published")}
            variant="gold"
            size="sm"
            isLoading={isSaving}
          >
            <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
            <span>Publish Article</span>
          </Button>
        </div>
      </div>

      {/* Error or Compliance Warnings */}
      {errorMessage && (
        <div className="p-3 bg-red-50 border border-red-300 rounded text-xs text-red-800 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-red-700 mt-0.5 flex-shrink-0" />
          <div className="space-y-1">
            <span className="font-semibold">{errorMessage}</span>
            {complianceViolations.length > 0 && (
              <ul className="list-disc pl-4 text-[11px] text-red-700">
                {complianceViolations.map((v, idx) => (
                  <li key={idx}>{v}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-border-subtle gap-2">
        <button
          onClick={() => setActiveTab("edit")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold border-b-2 transition-colors ${
            activeTab === "edit"
              ? "border-navy text-navy font-bold"
              : "border-transparent text-text-muted hover:text-navy"
          }`}
        >
          <Edit3 className="w-4 h-4" />
          <span>Editor &amp; Metadata</span>
        </button>

        <button
          onClick={() => setActiveTab("preview")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold border-b-2 transition-colors ${
            activeTab === "preview"
              ? "border-navy text-navy font-bold"
              : "border-transparent text-text-muted hover:text-navy"
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>Live Safe Markdown Preview</span>
        </button>
      </div>

      {activeTab === "edit" ? (
        <div className="bg-white border border-border-subtle rounded-lg p-6 space-y-6 shadow-subtle">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Article Title"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Procedural Aspects of Order XXXIX Injunctions"
            />

            <Input
              label="URL Slug (Permanent link identifier)"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. procedural-aspects-order-xxxix-injunctions"
              helperText="Lowercase letters, numbers, and hyphens only"
            />
          </div>

          <Textarea
            label="Executive Summary (Displayed in article feeds & search results)"
            required
            rows={3}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="A factual synopsis of statutory points discussed..."
          />

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-navy">
              Article Content (Markdown) <span className="text-red-700">*</span>
            </label>
            <textarea
              rows={14}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3.5 py-2.5 font-mono text-xs bg-white border border-border-subtle rounded text-text-primary focus:outline-none focus:ring-2 focus:ring-navy focus:border-navy"
              placeholder="## Introduction&#10;&#10;Write the factual legal commentary here in Markdown..."
            />
            <p className="text-xs text-text-muted">
              Word count: {content.split(/\s+/).filter(Boolean).length} words &bull; Est. reading time:{" "}
              {Math.max(1, Math.ceil(content.split(/\s+/).filter(Boolean).length / 200))} min
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border-subtle">
            <Input
              label="Author Attribution"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-navy mb-1.5">
                Publication Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as ArticleStatus)}
                className="w-full px-3.5 py-2.5 bg-white border border-border-subtle rounded text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-navy"
              >
                <option value="draft">Draft (Private / Excluded)</option>
                <option value="reviewed">Reviewed (Internal)</option>
                <option value="published">Published (Public)</option>
              </select>
            </div>

            <Input
              label="Categories (comma separated)"
              value={categoriesText}
              onChange={(e) => setCategoriesText(e.target.value)}
              placeholder="Civil Law, Procedure"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border-subtle">
            <Input
              label="SEO Title (Optional override)"
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              placeholder="Custom title tag"
            />

            <Input
              label="SEO Description (Optional override)"
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              placeholder="Meta description for search engines"
            />
          </div>

          {/* Compliance Checklist reminder */}
          <div className="p-4 bg-ivory rounded border border-border-subtle text-xs text-text-secondary flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-gold-dark mt-0.5 flex-shrink-0" />
            <div className="space-y-1">
              <span className="font-semibold text-navy">Bar Council Publication Standard:</span>
              <p className="leading-relaxed">
                Ensure that judicial citations are accurate. Do not include promotional claims, superlatives,
                or solicitations for legal representation within article commentary.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-border-subtle rounded-lg p-6 sm:p-10 space-y-6 shadow-subtle">
          <div className="border-b border-border-subtle pb-4">
            <span className="text-xs font-semibold text-gold-dark uppercase tracking-wider">
              Preview Mode
            </span>
            <h1 className="font-serif text-3xl font-bold text-navy mt-1">{title || "Untitled Article"}</h1>
            <p className="text-xs text-text-secondary mt-1">{summary}</p>
          </div>

          <SafeMarkdown content={content || "*No content provided yet.*"} />
        </div>
      )}
    </div>
  );
}
