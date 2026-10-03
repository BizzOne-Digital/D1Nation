import { MarketingAboutPage } from "@/components/about/marketing/MarketingAboutPage";
import { getPublishedTestimonials, getSiteSettings } from "@/lib/site-data";

export const metadata = { title: "About Us" };

export default async function AboutPage() {
  const [settings, testimonials] = await Promise.all([getSiteSettings(), getPublishedTestimonials()]);

  return (
    <MarketingAboutPage
      aboutShort={settings.aboutShort}
      placementClaim={settings.placementClaim}
      placementClaimLabel={settings.placementClaimLabel}
      heroVideoUrl={settings.heroVideoUrl}
      testimonials={testimonials}
      social={{
        instagram: settings.socialInstagram,
        facebook: settings.socialFacebook,
        tiktok: settings.socialTiktok,
      }}
    />
  );
}
