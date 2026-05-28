import { MetadataRoute } from "next";
import { getPosts } from "@/lib/data";

const BASE_URL = "https://madebyelune.com";

const MONTHS: Record<string, number> = {
  enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5,
  julio: 6, agosto: 7, septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11,
};

function parseDate(str: string): Date {
  const parts = str.toLowerCase().split(" de ");
  if (parts.length === 3) {
    const day = parseInt(parts[0]);
    const month = MONTHS[parts[1]];
    const year = parseInt(parts[2]);
    if (!isNaN(day) && month !== undefined && !isNaN(year)) {
      return new Date(year, month, day);
    }
  }
  return new Date();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = (await getPosts()).filter((p) => p.published);

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: parseDate(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
