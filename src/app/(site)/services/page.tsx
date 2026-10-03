import { MarketingServicesPage } from "@/components/services/marketing/MarketingServicesPage";
import { getSiteSettings } from "@/lib/site-data";

export const metadata = { title: "Recruiting Coordination" };

export default async function ServicesPage() {
  const settings = await getSiteSettings();

  return (
    <MarketingServicesPage
      heroVideoUrl={settings.heroVideoUrl}
      social={{
        instagram: settings.socialInstagram,
        facebook: settings.socialFacebook,
        tiktok: settings.socialTiktok,
      }}
    />
  );
}
