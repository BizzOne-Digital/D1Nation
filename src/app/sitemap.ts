import type { MetadataRoute } from "next";
import { connectDB } from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import Product from "@/models/Product";
import TeamMember from "@/models/TeamMember";

const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/pricing",
    "/testimonials",
    "/shop",
    "/blog",
    "/team",
    "/contact",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  try {
    if (!process.env.MONGODB_URI) return staticRoutes;
    await connectDB();
    const [posts, products, team] = await Promise.all([
      BlogPost.find({ published: true }).select("slug updatedAt").lean(),
      Product.find({ published: true }).select("slug updatedAt").lean(),
      TeamMember.find({ published: true }).select("slug updatedAt").lean(),
    ]);

    return [
      ...staticRoutes,
      ...posts.map((p) => ({
        url: `${base}/blog/${p.slug}`,
        lastModified: p.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
      ...products.map((p) => ({
        url: `${base}/shop/${p.slug}`,
        lastModified: p.updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      })),
      ...team.map((m) => ({
        url: `${base}/team/${m.slug}`,
        lastModified: m.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.5,
      })),
    ];
  } catch {
    return staticRoutes;
  }
}
