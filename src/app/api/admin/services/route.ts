import { connectDB } from "@/lib/mongodb";
import Service from "@/models/Service";
import { jsonError, jsonOk, withAdmin } from "@/lib/api";
import { slugify } from "@/lib/slug";

export async function GET() {
  return withAdmin(async () => {
    await connectDB();
    const items = await Service.find().sort({ order: 1 });
    return jsonOk(items);
  });
}

export async function POST(request: Request) {
  return withAdmin(async () => {
    await connectDB();
    const body = await request.json();
    if (!body.title || !body.overview) return jsonError("Title and overview required");
    const slug = body.slug || slugify(body.title);
    const item = await Service.create({ ...body, slug });
    return jsonOk(item, 201);
  });
}

export async function PATCH(request: Request) {
  return withAdmin(async () => {
    await connectDB();
    const body = await request.json();
    const { id, ...updates } = body;
    if (!id) return jsonError("ID required");
    const item = await Service.findByIdAndUpdate(id, updates, { new: true });
    if (!item) return jsonError("Not found", 404);
    return jsonOk(item);
  });
}

export async function DELETE(request: Request) {
  return withAdmin(async () => {
    await connectDB();
    const { id } = await request.json();
    if (!id) return jsonError("ID required");
    await Service.findByIdAndDelete(id);
    return jsonOk({ ok: true });
  });
}
