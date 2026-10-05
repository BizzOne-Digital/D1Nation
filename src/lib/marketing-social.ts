type Settings = {
  socialInstagram?: string;
  socialFacebook?: string;
  socialTiktok?: string;
};

export function marketingSocial(settings: Settings) {
  return {
    instagram: settings.socialInstagram,
    facebook: settings.socialFacebook,
    tiktok: settings.socialTiktok,
  };
}

export function resolveSocialHref(platform: "instagram" | "facebook" | "tiktok", handle?: string) {
  if (!handle) return null;
  const trimmed = handle.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith("http")) return trimmed;
  const user = trimmed.replace(/^@/, "");
  if (platform === "instagram") return `https://instagram.com/${user}`;
  if (platform === "facebook") return `https://facebook.com/${user}`;
  return `https://tiktok.com/@${user}`;
}

export function socialDisplayLabel(handle?: string) {
  if (!handle?.trim()) return null;
  const trimmed = handle.trim();
  if (trimmed.startsWith("http")) {
    try {
      return new URL(trimmed).hostname.replace(/^www\./, "");
    } catch {
      return "View profile";
    }
  }
  return trimmed.startsWith("@") ? trimmed : `@${trimmed.replace(/^@/, "")}`;
}
