import { MARKETING_PAGES } from "@/lib/marketing-pages";
import { renderMarketingPage } from "@/lib/render-marketing-page";

export const metadata = { title: MARKETING_PAGES.camps.metadataTitle };

export default async function CampsPage() {
  return renderMarketingPage("camps");
}
