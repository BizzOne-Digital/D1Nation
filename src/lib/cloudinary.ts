import { v2 as cloudinary } from "cloudinary";

const ALLOWED_IMAGE = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const ALLOWED_VIDEO = ["video/mp4", "video/webm", "video/quicktime"];
const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const MAX_VIDEO_BYTES = 100 * 1024 * 1024;

function configure() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary credentials are not configured");
  }
  cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });
  return cloudinary;
}

export function validateUpload(file: File, kind: "image" | "video") {
  const allowed = kind === "image" ? ALLOWED_IMAGE : ALLOWED_VIDEO;
  const max = kind === "image" ? MAX_IMAGE_BYTES : MAX_VIDEO_BYTES;
  if (!allowed.includes(file.type)) {
    return `Invalid file type. Allowed: ${allowed.join(", ")}`;
  }
  if (file.size > max) {
    return `File too large. Max ${Math.round(max / (1024 * 1024))}MB`;
  }
  return null;
}

export async function uploadToCloudinary(
  buffer: Buffer,
  folder: string,
  resourceType: "image" | "video" = "image",
) {
  const cld = configure();
  const base64 = `data:${resourceType === "video" ? "video/mp4" : "image/jpeg"};base64,${buffer.toString("base64")}`;

  const result = await cld.uploader.upload(base64, {
    folder: `d1-nation/${folder}`,
    resource_type: resourceType,
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
    duration: result.duration,
  };
}

export async function deleteFromCloudinary(publicId: string, resourceType: "image" | "video" = "image") {
  const cld = configure();
  await cld.uploader.destroy(publicId, { resource_type: resourceType });
}
