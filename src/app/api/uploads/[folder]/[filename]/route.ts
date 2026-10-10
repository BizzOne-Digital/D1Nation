import { connectDB } from "@/lib/mongodb";
import { findStoredUpload, isSafeFilename, isUploadFolder, type UploadFolder } from "@/lib/stored-upload";

export const runtime = "nodejs";

type Params = { params: Promise<{ folder: string; filename: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { folder: folderRaw, filename } = await params;

  if (!isUploadFolder(folderRaw) || !isSafeFilename(filename)) {
    return new Response("Not found", { status: 404 });
  }
  const folder = folderRaw as UploadFolder;

  await connectDB();
  const doc = await findStoredUpload(folder, filename);
  if (!doc?.data) {
    return new Response("Not found", { status: 404 });
  }

  const raw = doc.data as Buffer | { buffer: ArrayBuffer };
  const body = Buffer.isBuffer(raw) ? raw : Buffer.from(raw.buffer);

  return new Response(new Uint8Array(body), {
    status: 200,
    headers: {
      "Content-Type": doc.mimeType,
      "Content-Length": String(doc.size),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
