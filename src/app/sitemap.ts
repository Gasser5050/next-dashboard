import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://next-dashboard-gasser.vercel.app/";

  // Fetch all posts and users for dynamic routing
  const [posts, users] = await Promise.all([
    prisma.post.findMany({ select: { id: true, updatedAt: true } }),
    prisma.user.findMany({ select: { id: true } })
  ]);

  // Dynamic Post URLs
  const postUrls: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${baseUrl}/posts/${post.id}`,
    lastModified: post.updatedAt || new Date(),
    changeFrequency: "weekly",
    priority: 0.8
  }));

  // Dynamic User URLs
  const userUrls: MetadataRoute.Sitemap = users.map(user => ({
    url: `${baseUrl}/users/${user.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5
  }));

  // Static Application Routes
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0
    },
    {
      url: `${baseUrl}/posts`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9
    },
    {
      url: `${baseUrl}/users`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7
    }
  ];

  return [...staticUrls, ...postUrls, ...userUrls];
}
