export const SERVICE_IMAGE_BY_SLUG: Record<string, string> = {
  academy: "/images/services/academy.jpg",
  teams: "/images/services/teams.jpg",
  "recruiting-coordination": "/images/services/recruiting.jpg",
  "nil-opportunities": "/images/services/nil.jpg",
};

export function resolveServiceImage(slug: string, imageUrl?: string | null) {
  if (imageUrl && !imageUrl.includes("unsplash.com")) return imageUrl;
  return SERVICE_IMAGE_BY_SLUG[slug] ?? imageUrl ?? SERVICE_IMAGE_BY_SLUG.academy;
}
