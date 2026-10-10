import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { jsonError, jsonOk, mongoErrorMessage, withAdmin } from "@/lib/api";
import { slugify } from "@/lib/slug";

export async function GET() {
  return withAdmin(async () => {
    await connectDB();
    const items = await Product.find().sort({ order: 1 }).lean();
    return jsonOk(items);
  });
}

export async function POST(request: Request) {
  return withAdmin(async () => {
    await connectDB();
    const body = await request.json();
    if (!body.name) return jsonError("Name required");
    const slug = body.slug || slugify(body.name);
    try {
      const item = await Product.create({ ...body, slug });
      return jsonOk(item.toObject(), 201);
    } catch (e) {
      const msg = mongoErrorMessage(e);
      if (msg) return jsonError(msg);
      throw e;
    }
  });
}

export async function PATCH(request: Request) {
  return withAdmin(async () => {
    await connectDB();
    const { id, ...updates } = await request.json();
    if (!id) return jsonError("ID required");
    try {
      const item = await Product.findByIdAndUpdate(id, updates, { new: true }).lean();
      if (!item) return jsonError("Not found", 404);
      return jsonOk(item);
    } catch (e) {
      const msg = mongoErrorMessage(e);
      if (msg) return jsonError(msg);
      throw e;
    }
  });
}

export async function DELETE(request: Request) {
  return withAdmin(async () => {
    await connectDB();
    const { id } = await request.json();
    if (!id) return jsonError("ID required");
    await Product.findByIdAndDelete(id);
    return jsonOk({ ok: true });
  });
}
