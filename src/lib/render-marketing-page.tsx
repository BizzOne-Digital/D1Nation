import { MarketingSimplePage } from "@/components/marketing/MarketingSimplePage";
import { MARKETING_PAGES, type MarketingPageKey } from "@/lib/marketing-pages";
import { marketingSocial } from "@/lib/marketing-social";
import { getSiteSettings } from "@/lib/site-data";

export async function renderMarketingPage(key: MarketingPageKey) {
  const settings = await getSiteSettings();
  return <MarketingSimplePage content={MARKETING_PAGES[key]} social={marketingSocial(settings)} />;
}
