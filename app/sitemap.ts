import { MetadataRoute } from "next";
import { sql } from "@/lib/db/connection";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://larkbase.club";

  // Fetch expert IDs for dynamic routes
  const experts = await sql`
    SELECT id FROM experts WHERE status = 'active'
  `;

  const expertUrls = experts.map((e: any) => ({
    url: `${baseUrl}/expert/${e.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/expert-square`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/templates`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...expertUrls,
  ];
}
