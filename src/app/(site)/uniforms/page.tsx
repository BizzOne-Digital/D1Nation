import { MARKETING_PAGES } from "@/lib/marketing-pages";
import { renderMarketingPage } from "@/lib/render-marketing-page";

export const metadata = { title: MARKETING_PAGES.uniforms.metadataTitle };

export default async function UniformsPage() {
  return renderMarketingPage("uniforms");
}
