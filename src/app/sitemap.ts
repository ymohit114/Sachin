import { MetadataRoute } from "next";
import { DEFAULT_PRACTICE_AREAS } from "@/lib/constants/site-defaults";
import { getPublishedArticles } from "@/lib/db/repositories/articles";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  // Public static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/practice-areas`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/legal-articles`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  // Practice areas routes
  const practiceRoutes: MetadataRoute.Sitemap = DEFAULT_PRACTICE_AREAS.map((area) => ({
    url: `${baseUrl}/practice-areas/${area.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Published articles only (drafts are strictly excluded)
  const publishedArticles = await getPublishedArticles();
  const articleRoutes: MetadataRoute.Sitemap = publishedArticles.map((art) => ({
    url: `${baseUrl}/legal-articles/${art.slug}`,
    lastModified: new Date(art.updatedAt || art.publishedAt || art.createdAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...practiceRoutes, ...articleRoutes];
}
