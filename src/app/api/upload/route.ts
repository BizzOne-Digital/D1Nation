import { withAdmin, jsonError, jsonOk } from "@/lib/api";
import { uploadToCloudinary, validateUpload } from "@/lib/cloudinary";

export async function POST(request: Request) {
  return withAdmin(async () => {
    try {
      const form = await request.formData();
      const file = form.get("file");
      const folder = (form.get("folder") as string) || "media";
      const kind = (form.get("kind") as string) === "video" ? "video" : "image";

      if (!(file instanceof File)) {
        return jsonError("No file provided");
      }

      const validationError = validateUpload(file, kind);
      if (validationError) return jsonError(validationError);

      const buffer = Buffer.from(await file.arrayBuffer());
      const result = await uploadToCloudinary(buffer, folder, kind);
      return jsonOk(result);
    } catch (e) {
      console.error(e);
      return jsonError(
        e instanceof Error ? e.message : "Upload failed. Check Cloudinary configuration.",
        500,
      );
    }
  });
}
