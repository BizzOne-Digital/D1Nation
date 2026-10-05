import { MARKETING_PAGES } from "@/lib/marketing-pages";
import { renderMarketingPage } from "@/lib/render-marketing-page";

export const metadata = { title: MARKETING_PAGES["social-media-management"].metadataTitle };

export default async function SocialMediaManagementPage() {
  return renderMarketingPage("social-media-management");
}
