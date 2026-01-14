import type { MetadataRoute } from "next";
import { navigationLinks } from "~/data/home/navigationLinks";
import { db } from "~/server/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ?? "https://almadeenaislamicschool.sch.id";

  // Extract routes from navigationLinks
  const routes = navigationLinks.flatMap((item) => {
    const paths = [];
    if (item.href) paths.push(item.href);
    if (item.items) {
      item.items.forEach((sub) => {
        if (sub.href) paths.push(sub.href);
      });
    }
    return paths;
  });

  // Remove duplicates and ensure unique paths
  const uniqueRoutes = Array.from(new Set(routes));

  // Fetch dynamic news article routes
  const newsArticles = await db.newsArticle.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true, updatedAt: true },
  });

  const staticRoutes: MetadataRoute.Sitemap = uniqueRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "/" ? 1 : 0.8,
  }));

  const newsRoutes: MetadataRoute.Sitemap = newsArticles.map((article) => ({
    url: `${baseUrl}/news/${article.slug}`,
    lastModified: article.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...newsRoutes];
}
