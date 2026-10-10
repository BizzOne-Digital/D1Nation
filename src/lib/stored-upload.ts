import { randomBytes } from "crypto";
import StoredUpload from "@/models/StoredUpload";
import { parseStoredUploadUrl, type UploadFolder } from "@/lib/stored-upload-shared";

export {
  UPLOAD_FOLDERS,
  type UploadFolder,
  isUploadFolder,
  isStoredUploadUrl,
  parseStoredUploadUrl,
  isSafeFilename,
  storedUploadPublicUrl,
} from "@/lib/stored-upload-shared";

const ALLOWED_MIME = ["image/jpeg", "image/png", "image/webp", "image/gif"] as const;
export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

const MIME_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export function validateImageUpload(file: File): string | null {
  if (!ALLOWED_MIME.includes(file.type as (typeof ALLOWED_MIME)[number])) {
    return "Invalid file type. Use JPEG, PNG, WebP, or GIF.";
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return "File too large. Maximum size is 8MB.";
  }
  return null;
}

export function generateStoredFilename(mimeType: string): string {
  const ext = MIME_EXT[mimeType] || "bin";
  return `${Date.now()}-${randomBytes(8).toString("hex")}.${ext}`;
}

export async function saveStoredUpload(params: {
  folder: UploadFolder;
  filename: string;
  mimeType: string;
  size: number;
  data: Buffer;
}) {
  return StoredUpload.create(params);
}

export async function deleteStoredUploadByUrl(url: string): Promise<boolean> {
  const parsed = parseStoredUploadUrl(url);
  if (!parsed) return false;
  const result = await StoredUpload.deleteOne({ folder: parsed.folder, filename: parsed.filename });
  return result.deletedCount > 0;
}

export async function findStoredUpload(folder: UploadFolder, filename: string) {
  return StoredUpload.findOne({ folder, filename }).lean();
}
