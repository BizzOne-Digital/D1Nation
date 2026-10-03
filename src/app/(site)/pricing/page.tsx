import { Button } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { MarketingInnerShell } from "@/components/marketing/MarketingInnerShell";
import { formatPublicPrice } from "@/lib/pricing";
import { MARKETING_HEROES } from "@/lib/marketing-heroes";
import { marketingSocial } from "@/lib/marketing-social";
import { getPublishedServices, getFaqs, getSiteSettings } from "@/lib/site-data";
import type { ServiceItem } from "@/types/content";

export const metadata = { title: "Programs & Camps" };

export default async function PricingPage() {
  const [settings, services, faqs] = await Promise.all([
    getSiteSettings(),
    getPublishedServices(),
    getFaqs(["pricing", "general"]),
  ]);

  return (
    <MarketingInnerShell
      eyebrow="Programs & Camps"
      title="Transparent Conversations. Tailored Programs."
      subtitle="Every athlete's path is different. We provide pricing after learning about your goals, graduation timeline, and service selection."
      heroImage={MARKETING_HEROES.pricing}
      social={marketingSocial(settings)}
    >
      <div className="grid gap-6 md:grid-cols-2">
        {services.map((service: ServiceItem) => (
          <article key={service._id} className="flex h-full flex-col border border-neutral-200 bg-neutral-50 p-8">
            <h2 className="text-2xl font-extrabold text-neutral-900">{service.title}</h2>
            <p className="mt-2 line-clamp-3 text-sm text-neutral-600">{service.overview}</p>
            <p className="mt-6 text-3xl font-extrabold text-[#FF6A00]">
              {formatPublicPrice(service.internalPrice, !!service.showPublicPrice)}
            </p>
            <p className="mt-2 text-xs text-neutral-500">
              {service.showPublicPrice
                ? "Public price enabled by admin."
                : "Request a personalized quote for your athlete."}
            </p>
            <Button href="/contact" variant="marketingOutline" className="mt-8 w-full sm:w-auto">
              Inquire About {service.title}
            </Button>
          </article>
        ))}
      </div>

      <div className="mt-12 border border-[#FF6A00]/30 bg-[#FF6A00]/5 p-8 text-center">
        <p className="text-sm text-neutral-700">
          No hidden packages or fabricated discounts. We&apos;ll walk your family through options, expectations, and
          investment during a consultation.
        </p>
        <Button href="/contact" variant="marketing" className="mt-6">Schedule a Consultation</Button>
      </div>

      <div className="mt-16 grid gap-10 border-t border-neutral-200 pt-16 lg:grid-cols-2">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-neutral-500">FAQ</p>
          <h2 className="mt-2 text-2xl font-extrabold">Pricing questions</h2>
        </div>
        <FaqAccordion items={faqs} theme="marketing" />
      </div>
    </MarketingInnerShell>
  );
}
