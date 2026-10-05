import { MARKETING_PAGES } from "@/lib/marketing-pages";
import { renderMarketingPage } from "@/lib/render-marketing-page";

export const metadata = { title: MARKETING_PAGES.teams.metadataTitle };

export default async function TeamsPage() {
  return renderMarketingPage("teams");
}
