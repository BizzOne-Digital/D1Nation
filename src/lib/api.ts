import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";

export function jsonOk<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function mongoErrorMessage(err: unknown): string | null {
  if (err && typeof err === "object" && "code" in err && (err as { code: number }).code === 11000) {
    return "A record with this name or slug already exists.";
  }
  return null;
}

export async function withAdmin(handler: () => Promise<Response>) {
  try {
    await requireAdmin();
    return await handler();
  } catch (e) {
    if (e instanceof Error && e.message === "UNAUTHORIZED") {
      return jsonError("Unauthorized", 401);
    }
    console.error(e);
    return jsonError("Server error", 500);
  }
}
