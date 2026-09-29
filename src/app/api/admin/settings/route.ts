import { connectDB } from "@/lib/mongodb";
import SiteSettings from "@/models/SiteSettings";
import { jsonOk, withAdmin } from "@/lib/api";
import { ensureSiteData } from "@/lib/seed";

export async function GET() {
  return withAdmin(async () => {
    await connectDB();
    await ensureSiteData();
    let doc = await SiteSettings.findOne();
    if (!doc) doc = await SiteSettings.create({});
    return jsonOk(doc);
  });
}

export async function PUT(request: Request) {
  return withAdmin(async () => {
    await connectDB();
    const body = await request.json();
    let doc = await SiteSettings.findOne();
    if (!doc) doc = await SiteSettings.create({});
    Object.assign(doc, body);
    await doc.save();
    return jsonOk(doc);
  });
}
