import { MARKETING_PAGES } from "@/lib/marketing-pages";
import { renderMarketingPage } from "@/lib/render-marketing-page";

export const metadata = { title: MARKETING_PAGES.sponsors.metadataTitle };

export default async function SponsorsPage() {
  return renderMarketingPage("sponsors");
}
