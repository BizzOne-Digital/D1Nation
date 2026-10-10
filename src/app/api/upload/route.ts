import { withAdmin, jsonError, jsonOk } from "@/lib/api";
import { connectDB } from "@/lib/mongodb";
import {
  deleteStoredUploadByUrl,
  generateStoredFilename,
  isUploadFolder,
  parseStoredUploadUrl,
  saveStoredUpload,
  storedUploadPublicUrl,
  validateImageUpload,
  type UploadFolder,
} from "@/lib/stored-upload";
import { uploadToCloudinary, validateUpload } from "@/lib/cloudinary";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return withAdmin(async () => {
    try {
      await connectDB();
      const form = await request.formData();
      const file = form.get("file");
      const folderRaw = (form.get("folder") as string) || "";
      const kind = (form.get("kind") as string) === "video" ? "video" : "image";

      if (!(file instanceof File)) {
        return jsonError("No file provided");
      }

      if (kind === "video") {
        const validationError = validateUpload(file, "video");
        if (validationError) return jsonError(validationError);
        const buffer = Buffer.from(await file.arrayBuffer());
        const folder = isUploadFolder(folderRaw) ? folderRaw : "misc";
        const result = await uploadToCloudinary(buffer, folder, "video");
        return jsonOk({ success: true, url: result.url, publicId: result.publicId });
      }

      if (!isUploadFolder(folderRaw)) {
        return jsonError(`Invalid folder. Allowed: products, gallery, pages, misc`);
      }
      const folder = folderRaw as UploadFolder;

      const validationError = validateImageUpload(file);
      if (validationError) return jsonError(validationError);

      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = generateStoredFilename(file.type);
      await saveStoredUpload({
        folder,
        filename,
        mimeType: file.type,
        size: file.size,
        data: buffer,
      });

      const url = storedUploadPublicUrl(folder, filename);
      return jsonOk({
        success: true,
        url,
        filename,
        size: file.size,
        folder,
      });
    } catch (e) {
      console.error(e);
      return jsonError(e instanceof Error ? e.message : "Upload failed", 500);
    }
  });
}

export async function DELETE(request: Request) {
  return withAdmin(async () => {
    await connectDB();
    const body = await request.json().catch(() => ({}));
    const url = typeof body.url === "string" ? body.url : "";
    if (!parseStoredUploadUrl(url)) {
      return jsonError("Invalid stored upload URL");
    }
    const deleted = await deleteStoredUploadByUrl(url);
    if (!deleted) return jsonError("Upload not found", 404);
    return jsonOk({ success: true });
  });
}
