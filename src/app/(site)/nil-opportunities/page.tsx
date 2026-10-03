import { MarketingNilPage } from "@/components/nil/marketing/MarketingNilPage";
import { getSiteSettings } from "@/lib/site-data";

export const metadata = { title: "NIL Opportunities" };

export default async function NilOpportunitiesPage() {
  const settings = await getSiteSettings();

  return (
    <MarketingNilPage
      social={{
        instagram: settings.socialInstagram,
        facebook: settings.socialFacebook,
        tiktok: settings.socialTiktok,
      }}
    />
  );
}
