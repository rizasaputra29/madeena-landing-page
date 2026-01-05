import type { MetadataRoute } from 'next'
import { navigationLinks } from '~/data/home/navigationLinks'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://almadeenaislamicschool.sch.id';
  
  // Extract routes from navigationLinks
  const routes = navigationLinks.flatMap(item => {
    const paths = [];
    if (item.href) paths.push(item.href);
    if (item.items) {
      item.items.forEach(sub => {
        if (sub.href) paths.push(sub.href);
      });
    }
    return paths;
  });

  // Remove duplicates and ensure unique paths
  const uniqueRoutes = Array.from(new Set(routes));

  return uniqueRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '/' ? 1 : 0.8,
  }));
}
