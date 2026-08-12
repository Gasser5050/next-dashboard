import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const postEntries: MetadataRoute.Sitemap = [];

  return [{ url: "https://domain.com", priority: 1.0 }, ...postEntries];
}
