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
