import { MARKETING_PAGES } from "@/lib/marketing-pages";
import { renderMarketingPage } from "@/lib/render-marketing-page";

export const metadata = { title: MARKETING_PAGES["payment-gateways"].metadataTitle };

export default async function PaymentGatewaysPage() {
  return renderMarketingPage("payment-gateways");
}
