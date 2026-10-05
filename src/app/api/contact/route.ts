import { createHash } from "crypto";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";
import { jsonError, jsonOk } from "@/lib/api";

const schema = z.object({
  parentName: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().min(7).max(30),
  athleteName: z.string().min(2).max(120),
  graduationYear: z.string().regex(/^\d{4}$/),
  serviceInterest: z.string().min(2).max(120),
  message: z.string().min(10).max(5000),
  website: z.string().max(0).optional(),
});

const recentByIp = new Map<string, number>();

export async function POST(request: Request) {
  try {
    if (!process.env.MONGODB_URI) {
      return jsonError("Inquiries are temporarily unavailable. Please email us directly from the contact page.", 503);
    }

    const body = schema.parse(await request.json());
    if (body.website) {
      return jsonOk({ ok: true });
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const ipHash = createHash("sha256").update(ip).digest("hex");
    const now = Date.now();
    const last = recentByIp.get(ipHash) ?? 0;
    if (now - last < 60_000) {
      return jsonError("Please wait before submitting again.", 429);
    }
    recentByIp.set(ipHash, now);

    await connectDB();
    await Inquiry.create({
      parentName: body.parentName,
      email: body.email,
      phone: body.phone,
      athleteName: body.athleteName,
      graduationYear: body.graduationYear,
      serviceInterest: body.serviceInterest,
      message: body.message,
      ipHash,
    });

    return jsonOk({ ok: true });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return jsonError("Please check your form fields.", 400);
    }
    console.error(e);
    return jsonError("Unable to submit inquiry.", 500);
  }
}
