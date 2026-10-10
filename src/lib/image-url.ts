/** Shown when a legacy disk `/uploads/...` URL is no longer available. */
export const LEGACY_UPLOAD_PLACEHOLDER = "/images/image-placeholder.svg";

export function isLegacyDiskUploadUrl(url: string | undefined | null): boolean {
  if (!url) return false;
  const path = url.split("?")[0];
  if (path.startsWith("/api/uploads/")) return false;
  return path.startsWith("/uploads/");
}

/**
 * Resolves CMS image URLs for display. Legacy `/uploads/**` paths map to a placeholder.
 */
export function resolvePublicImageUrl(url: string | undefined | null, fallback?: string): string {
  if (!url || url.trim() === "") {
    return fallback || LEGACY_UPLOAD_PLACEHOLDER;
  }
  if (isLegacyDiskUploadUrl(url)) {
    return LEGACY_UPLOAD_PLACEHOLDER;
  }
  return url;
}

/** True when Next.js Image can load this src (relative app paths or https). */
export function shouldUnoptimizeImageSrc(src: string): boolean {
  return src.startsWith("/api/uploads/");
}
