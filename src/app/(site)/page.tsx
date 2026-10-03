import { MarketingHomePage } from "@/components/home/marketing/MarketingHomePage";
import { getSiteSettings, getPublishedTestimonials } from "@/lib/site-data";

export default async function HomePage() {
  const [settings, testimonials] = await Promise.all([getSiteSettings(), getPublishedTestimonials()]);
  const featured = testimonials[0];

  return (
    <MarketingHomePage
      heroVideoUrl={settings.heroVideoUrl}
      testimonial={featured}
      social={{
        instagram: settings.socialInstagram,
        facebook: settings.socialFacebook,
        tiktok: settings.socialTiktok,
      }}
    />
  );
}
