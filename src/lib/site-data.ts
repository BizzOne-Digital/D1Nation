import { connectDB } from "@/lib/mongodb";
import { FALLBACK_SETTINGS, FALLBACK_SERVICES } from "@/lib/defaults";
import { ensureSiteData } from "@/lib/seed";
import SiteSettings from "@/models/SiteSettings";
import Service from "@/models/Service";
import Testimonial from "@/models/Testimonial";
import Faq from "@/models/Faq";
import Product from "@/models/Product";
import BlogPost from "@/models/BlogPost";
import TeamMember from "@/models/TeamMember";

export async function getSiteSettings() {
  try {
    if (!process.env.MONGODB_URI) return FALLBACK_SETTINGS;
    await connectDB();
    await ensureSiteData();
    let settings = await SiteSettings.findOne().lean();
    if (!settings) {
      settings = await SiteSettings.create({});
    }
    return JSON.parse(JSON.stringify(settings));
  } catch {
    return FALLBACK_SETTINGS;
  }
}

async function safeQuery<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    if (!process.env.MONGODB_URI) return fallback;
    return await fn();
  } catch {
    return fallback;
  }
}

export async function getPublishedServices() {
  const items = await safeQuery(async () => {
    await connectDB();
    await ensureSiteData();
    const rows = await Service.find({ published: true }).sort({ order: 1 }).lean();
    return JSON.parse(JSON.stringify(rows));
  }, []);
  return items.length ? items : [...FALLBACK_SERVICES];
}

export async function getServiceBySlug(slug: string) {
  return safeQuery(async () => {
    await connectDB();
    const item = await Service.findOne({ slug, published: true }).lean();
    return item ? JSON.parse(JSON.stringify(item)) : null;
  }, null);
}

export async function getPublishedTestimonials() {
  return safeQuery(async () => {
    await connectDB();
    await ensureSiteData();
    const items = await Testimonial.find({ published: true, isSample: false })
      .sort({ order: 1 })
      .lean();
    return JSON.parse(JSON.stringify(items));
  }, []);
}

export async function getFaqs(categories?: string[]) {
  return safeQuery(async () => {
    await connectDB();
    await ensureSiteData();
    const filter: Record<string, unknown> = { published: true };
    if (categories?.length) {
      filter.category = { $in: categories };
    }
    const items = await Faq.find(filter).sort({ order: 1 }).lean();
    return JSON.parse(JSON.stringify(items));
  }, []);
}

export async function getPublishedProducts() {
  return safeQuery(async () => {
    await connectDB();
    const items = await Product.find({ published: true }).sort({ order: 1 }).lean();
    return JSON.parse(JSON.stringify(items));
  }, []);
}

export async function getProductBySlug(slug: string) {
  return safeQuery(async () => {
    await connectDB();
    const item = await Product.findOne({ slug, published: true }).lean();
    return item ? JSON.parse(JSON.stringify(item)) : null;
  }, null);
}

export async function getPublishedPosts() {
  return safeQuery(async () => {
    await connectDB();
    await ensureSiteData();
    const items = await BlogPost.find({ published: true }).sort({ publishedAt: -1 }).lean();
    return JSON.parse(JSON.stringify(items));
  }, []);
}

export async function getPostBySlug(slug: string) {
  return safeQuery(async () => {
    await connectDB();
    await ensureSiteData();
    const item = await BlogPost.findOne({ slug, published: true }).lean();
    return item ? JSON.parse(JSON.stringify(item)) : null;
  }, null);
}

export async function getPublishedTeam() {
  return safeQuery(async () => {
    await connectDB();
    const items = await TeamMember.find({ published: true }).sort({ order: 1 }).lean();
    return JSON.parse(JSON.stringify(items));
  }, []);
}

export async function getTeamMemberBySlug(slug: string) {
  return safeQuery(async () => {
    await connectDB();
    const item = await TeamMember.findOne({ slug, published: true }).lean();
    return item ? JSON.parse(JSON.stringify(item)) : null;
  }, null);
}
