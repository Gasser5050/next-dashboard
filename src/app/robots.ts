import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://next-dashboard-gasser.vercel.app/";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/posts/new", "/posts/*/edit", "/todos/new"] // Hide creation/editing forms from search engines
    },
    sitemap: `${baseUrl}/sitemap.xml`
  };
}
