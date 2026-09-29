import { connectDB } from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import { jsonError, jsonOk, withAdmin } from "@/lib/api";
import { slugify } from "@/lib/slug";

export async function GET() {
  return withAdmin(async () => {
    await connectDB();
    const items = await BlogPost.find().sort({ updatedAt: -1 });
    return jsonOk(items);
  });
}

export async function POST(request: Request) {
  return withAdmin(async () => {
    await connectDB();
    const body = await request.json();
    if (!body.title) return jsonError("Title required");
    const slug = body.slug || slugify(body.title);
    const item = await BlogPost.create({
      ...body,
      slug,
      publishedAt: body.published ? body.publishedAt || new Date() : null,
    });
    return jsonOk(item, 201);
  });
}

export async function PATCH(request: Request) {
  return withAdmin(async () => {
    await connectDB();
    const { id, ...updates } = await request.json();
    if (!id) return jsonError("ID required");
    if (updates.published && !updates.publishedAt) {
      updates.publishedAt = new Date();
    }
    const item = await BlogPost.findByIdAndUpdate(id, updates, { new: true });
    if (!item) return jsonError("Not found", 404);
    return jsonOk(item);
  });
}

export async function DELETE(request: Request) {
  return withAdmin(async () => {
    await connectDB();
    const { id } = await request.json();
    if (!id) return jsonError("ID required");
    await BlogPost.findByIdAndDelete(id);
    return jsonOk({ ok: true });
  });
}
