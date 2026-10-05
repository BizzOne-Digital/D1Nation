import { MARKETING_PAGES } from "@/lib/marketing-pages";
import { renderMarketingPage } from "@/lib/render-marketing-page";

export const metadata = { title: MARKETING_PAGES.academy.metadataTitle };

export default async function AcademyPage() {
  return renderMarketingPage("academy");
}
