import { getDb, memoryDb } from "@/lib/db/mongodb";
import { LegalArticle } from "@/types";
import { ObjectId } from "mongodb";

export async function getPublishedArticles(): Promise<LegalArticle[]> {
  const db = await getDb();
  if (db) {
    try {
      const articles = await db
        .collection<LegalArticle>("articles")
        .find({ status: "published" })
        .sort({ publishedAt: -1 })
        .toArray();
      return articles.map((a) => ({ ...a, id: a._id ? a._id.toString() : a.id }));
    } catch {
      // Fallback to memory
    }
  }

  const store = memoryDb.getStore();
  return store.articles.filter((a) => a.status === "published");
}

export async function getArticleBySlug(slug: string, includeDrafts = false): Promise<LegalArticle | null> {
  const db = await getDb();
  if (db) {
    try {
      const filter: Record<string, unknown> = { slug };
      if (!includeDrafts) {
        filter.status = "published";
      }
      const article = await db.collection<LegalArticle>("articles").findOne(filter);
      if (article) {
        return { ...article, id: article._id ? article._id.toString() : article.id };
      }
      return null;
    } catch {
      // Fallback to memory
    }
  }

  const store = memoryDb.getStore();
  const article = store.articles.find((a) => a.slug === slug);
  if (!article) return null;
  if (!includeDrafts && article.status !== "published") return null;
  return article;
}

export async function getAllArticlesForAdmin(): Promise<LegalArticle[]> {
  const db = await getDb();
  if (db) {
    try {
      const articles = await db
        .collection<LegalArticle>("articles")
        .find({})
        .sort({ updatedAt: -1 })
        .toArray();
      return articles.map((a) => ({ ...a, id: a._id ? a._id.toString() : a.id }));
    } catch {
      // Fallback to memory
    }
  }

  const store = memoryDb.getStore();
  return store.articles;
}

export async function getArticleById(id: string): Promise<LegalArticle | null> {
  const db = await getDb();
  if (db) {
    try {
      let filter: Record<string, unknown> = { id };
      if (ObjectId.isValid(id)) {
        filter = { $or: [{ id }, { _id: new ObjectId(id) }] };
      }
      const article = await db.collection<LegalArticle>("articles").findOne(filter);
      if (article) {
        return { ...article, id: article._id ? article._id.toString() : article.id };
      }
      return null;
    } catch {
      // Fallback to memory
    }
  }

  const store = memoryDb.getStore();
  return store.articles.find((a) => a.id === id) || null;
}

export async function saveArticle(
  articleData: Omit<LegalArticle, "id" | "createdAt" | "updatedAt"> & { id?: string }
): Promise<LegalArticle> {
  const now = new Date().toISOString();
  const db = await getDb();

  if (articleData.id) {
    // Update
    const id = articleData.id;
    const updatePayload: Partial<LegalArticle> = {
      ...articleData,
      updatedAt: now,
    };
    if (articleData.status === "published" && !articleData.publishedAt) {
      updatePayload.publishedAt = now;
    }

    if (db) {
      try {
        let filter: Record<string, unknown> = { id };
        if (ObjectId.isValid(id)) {
          filter = { $or: [{ id }, { _id: new ObjectId(id) }] };
        }
        await db.collection("articles").updateOne(filter, { $set: updatePayload });
        const updated = await getArticleById(id);
        if (updated) return updated;
      } catch {
        // Fallback to memory
      }
    }

    const store = memoryDb.getStore();
    const idx = store.articles.findIndex((a) => a.id === id);
    if (idx !== -1) {
      store.articles[idx] = { ...store.articles[idx], ...updatePayload } as LegalArticle;
      return store.articles[idx];
    }
  }

  // Create
  const newId = `art-${Date.now()}`;
  const newArticle: LegalArticle = {
    ...articleData,
    id: newId,
    createdAt: now,
    updatedAt: now,
    publishedAt: articleData.status === "published" ? now : undefined,
  };

  if (db) {
    try {
      await db.collection("articles").insertOne(newArticle as any);
      return newArticle;
    } catch {
      // Fallback to memory
    }
  }

  const store = memoryDb.getStore();
  store.articles.unshift(newArticle);
  return newArticle;
}

export async function deleteArticle(id: string): Promise<boolean> {
  const db = await getDb();
  if (db) {
    try {
      let filter: Record<string, unknown> = { id };
      if (ObjectId.isValid(id)) {
        filter = { $or: [{ id }, { _id: new ObjectId(id) }] };
      }
      const res = await db.collection("articles").deleteOne(filter);
      return res.deletedCount > 0;
    } catch {
      // Fallback
    }
  }

  const store = memoryDb.getStore();
  const prevLen = store.articles.length;
  store.articles = store.articles.filter((a) => a.id !== id);
  return store.articles.length < prevLen;
}
