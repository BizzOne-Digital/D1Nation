import { connectDB } from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";
import { jsonError, jsonOk, withAdmin } from "@/lib/api";

export async function GET() {
  return withAdmin(async () => {
    await connectDB();
    const items = await Inquiry.find().sort({ createdAt: -1 });
    return jsonOk(items);
  });
}

export async function PATCH(request: Request) {
  return withAdmin(async () => {
    await connectDB();
    const { id, status } = await request.json();
    if (!id || !status) return jsonError("ID and status required");
    const item = await Inquiry.findByIdAndUpdate(id, { status }, { new: true });
    if (!item) return jsonError("Not found", 404);
    return jsonOk(item);
  });
}

export async function DELETE(request: Request) {
  return withAdmin(async () => {
    await connectDB();
    const { id } = await request.json();
    if (!id) return jsonError("ID required");
    await Inquiry.findByIdAndDelete(id);
    return jsonOk({ ok: true });
  });
}
