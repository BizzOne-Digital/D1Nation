import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { formatPublicPrice } from "@/lib/pricing";
import { getPublishedServices, getFaqs } from "@/lib/site-data";
import type { ServiceItem } from "@/types/content";

export const metadata = { title: "Pricing" };

export default async function PricingPage() {
  const [services, faqs] = await Promise.all([
    getPublishedServices(),
    getFaqs(["pricing", "general"]),
  ]);

  return (
    <>
      <section className="pt-32 pb-16">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Investment"
              title="Transparent conversations. Tailored programs."
              subtitle="Every athlete's path is different. We provide pricing after learning about your goals, graduation timeline, and service selection."
            />
          </Reveal>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service: ServiceItem, i: number) => (
              <Reveal key={service._id} delay={i * 0.06}>
                <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-8">
                  <h2 className="font-display text-3xl text-d1-off-white">{service.title}</h2>
                  <p className="mt-2 text-sm text-d1-muted line-clamp-3">{service.overview}</p>
                  <p className="mt-6 font-display text-4xl text-d1-orange">
                    {formatPublicPrice(service.internalPrice, !!service.showPublicPrice)}
                  </p>
                  <p className="mt-2 text-xs text-d1-muted">
                    {service.showPublicPrice
                      ? "Public price enabled by admin."
                      : "Request a personalized quote for your athlete."}
                  </p>
                  <Button href="/contact" variant="secondary" className="mt-8 w-full sm:w-auto">
                    Inquire About {service.title}
                  </Button>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 rounded-2xl border border-d1-orange/30 bg-d1-orange/10 p-8 text-center">
            <p className="text-sm text-d1-off-white/90">
              No hidden packages or fabricated discounts. We&apos;ll walk your family through options,
              expectations, and investment during a consultation.
            </p>
            <Button href="/contact" className="mt-6">Schedule a Consultation</Button>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-white/10 py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <SectionHeading eyebrow="FAQ" title="Pricing questions" />
          </Reveal>
          <Reveal delay={0.1}>
            <FaqAccordion items={faqs} />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
