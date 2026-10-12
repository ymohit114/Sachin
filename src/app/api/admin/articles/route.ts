import { NextRequest, NextResponse } from "next/server";
import { assertAdminApi } from "@/lib/auth/guard";
import { ArticleSchema } from "@/lib/validation/article.schema";
import { getAllArticlesForAdmin, saveArticle } from "@/lib/db/repositories/articles";
import { auditTextForCompliance } from "@/lib/compliance/bci-rules";

export async function GET() {
  const auth = await assertAdminApi();
  if (!auth.authorized) return auth.response;

  try {
    const articles = await getAllArticlesForAdmin();
    return NextResponse.json({ articles });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to retrieve articles", details: (err as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const auth = await assertAdminApi();
  if (!auth.authorized) return auth.response;

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

    // Audit for BCI promotional violations
    const compliance = auditTextForCompliance(`${data.title} ${data.summary} ${data.content}`);
    if (!compliance.isCompliant && data.status === "published") {
      return NextResponse.json(
        {
          error: "BCI Rule 36 Compliance Warning: Promotional phrasing detected in article. Must be resolved before publication.",
          violations: compliance.violations,
        },
        { status: 422 }
      );
    }

    // Calculate reading time (roughly 200 words per minute)
    const words = data.content.split(/\s+/).length;
    const readingTimeMinutes = Math.max(1, Math.ceil(words / 200));

    const now = new Date().toISOString();
    const isApproved = data.approved || data.status === "published";
    const isReviewed = data.reviewed || isApproved;

    const saved = await saveArticle({
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
      reviewedAt: isReviewed ? now : undefined,
      approvedAt: isApproved ? now : undefined,
    });

    return NextResponse.json({ success: true, article: saved }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create article", details: (err as Error).message },
      { status: 500 }
    );
  }
}
