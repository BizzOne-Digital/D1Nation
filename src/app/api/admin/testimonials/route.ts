import { connectDB } from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import { jsonError, jsonOk, withAdmin } from "@/lib/api";

export async function GET() {
  return withAdmin(async () => {
    await connectDB();
    const items = await Testimonial.find().sort({ order: 1 });
    return jsonOk(items);
  });
}

export async function POST(request: Request) {
  return withAdmin(async () => {
    await connectDB();
    const body = await request.json();
    if (!body.quote) return jsonError("Quote required");
    const item = await Testimonial.create(body);
    return jsonOk(item, 201);
  });
}

export async function PATCH(request: Request) {
  return withAdmin(async () => {
    await connectDB();
    const { id, ...updates } = await request.json();
    if (!id) return jsonError("ID required");
    const item = await Testimonial.findByIdAndUpdate(id, updates, { new: true });
    if (!item) return jsonError("Not found", 404);
    return jsonOk(item);
  });
}

export async function DELETE(request: Request) {
  return withAdmin(async () => {
    await connectDB();
    const { id } = await request.json();
    if (!id) return jsonError("ID required");
    await Testimonial.findByIdAndDelete(id);
    return jsonOk({ ok: true });
  });
}
