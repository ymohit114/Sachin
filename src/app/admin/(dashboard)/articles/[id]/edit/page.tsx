import React from "react";
import { notFound } from "next/navigation";
import { getArticleById } from "@/lib/db/repositories/articles";
import { ArticleEditor } from "@/components/admin/ArticleEditor";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params;
  const article = await getArticleById(id);

  if (!article) {
    notFound();
  }

  return <ArticleEditor initialArticle={article} isNew={false} />;
}
