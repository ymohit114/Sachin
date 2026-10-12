import { NextRequest, NextResponse } from "next/server";
import { assertAdminApi } from "@/lib/auth/guard";
import { ArticleSchema } from "@/lib/validation/article.schema";
import { getArticleById, saveArticle, deleteArticle } from "@/lib/db/repositories/articles";
import { auditTextForCompliance } from "@/lib/compliance/bci-rules";

interface Context {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: Context) {
  const auth = await assertAdminApi();
  if (!auth.authorized) return auth.response;

  const { id } = await params;
  const article = await getArticleById(id);
  if (!article) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }

  return NextResponse.json({ article });
}

export async function PUT(req: NextRequest, { params }: Context) {
  const auth = await assertAdminApi();
  if (!auth.authorized) return auth.response;

  const { id } = await params;
  const existing = await getArticleById(id);
  if (!existing) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }

  try {
    const body = await req.json();
    const parsed = ArticleSchema.safeParse(body);

    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      return NextResponse.json(
        { error: issue ? `${issue.path.join(".")}: ${issue.message}` : "Validation failed" },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Audit for BCI promotional violations if being published
    if (data.status === "published") {
      const compliance = auditTextForCompliance(`${data.title} ${data.summary} ${data.content}`);
      if (!compliance.isCompliant) {
        return NextResponse.json(
          {
            error: "BCI Rule 36 Compliance Warning: Promotional phrasing detected in article. Must be resolved before publication.",
            violations: compliance.violations,
          },
          { status: 422 }
        );
      }
    }

    const words = data.content.split(/\s+/).length;
    const readingTimeMinutes = Math.max(1, Math.ceil(words / 200));

    const now = new Date().toISOString();
    const isApproved = data.approved || data.status === "published";
    const isReviewed = data.reviewed || isApproved;

    const updated = await saveArticle({
      id,
      title: data.title,
      slug: data.slug,
      summary: data.summary,
      content: data.content,
      status: data.status,
      author: data.author,
      categories: data.categories,
      tags: data.tags,
      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription,
      readingTimeMinutes,
      reviewedAt: isReviewed ? existing.reviewedAt || now : undefined,
      approvedAt: isApproved ? existing.approvedAt || now : undefined,
      publishedAt: data.status === "published" ? existing.publishedAt || now : undefined,
    });

    return NextResponse.json({ success: true, article: updated });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update article", details: (err as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: Context) {
  const auth = await assertAdminApi();
  if (!auth.authorized) return auth.response;

  const { id } = await params;
  const success = await deleteArticle(id);
  if (!success) {
    return NextResponse.json({ error: "Failed to delete article or not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: "Article deleted successfully." });
}
