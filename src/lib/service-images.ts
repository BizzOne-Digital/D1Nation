import { isLegacyDiskUploadUrl } from "@/lib/image-url";

export const SERVICE_IMAGE_BY_SLUG: Record<string, string> = {
  academy: "/images/services/academy.jpg",
  teams: "/images/services/teams.jpg",
  "recruiting-coordination": "/images/services/recruiting.jpg",
  "nil-opportunities": "/images/services/nil.jpg",
};

export function resolveServiceImage(slug: string, imageUrl?: string | null) {
  const fallback = SERVICE_IMAGE_BY_SLUG[slug] ?? SERVICE_IMAGE_BY_SLUG.academy;
  if (imageUrl && !imageUrl.includes("unsplash.com")) {
    if (isLegacyDiskUploadUrl(imageUrl)) return fallback;
    return imageUrl;
  }
  return fallback;
}
