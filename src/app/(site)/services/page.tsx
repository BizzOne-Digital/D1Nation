import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { formatPublicPrice } from "@/lib/pricing";
import { resolveServiceImage } from "@/lib/service-images";
import { getPublishedServices, getFaqs } from "@/lib/site-data";
import type { ServiceItem } from "@/types/content";

export const metadata = { title: "Services" };

export default async function ServicesPage() {
  const [services, faqs] = await Promise.all([
    getPublishedServices(),
    getFaqs(["services", "general"]),
  ]);

  return (
    <>
      <section className="pt-32 pb-16">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Services"
              title="Every layer of the athlete experience"
              subtitle="Explore our four core programs. Pricing is shared after we understand your athlete's needs."
            />
          </Reveal>
        </Container>
      </section>

      <section className="w-full overflow-x-clip space-y-16 pb-20 sm:space-y-24 sm:pb-24">
        {services.map((service: ServiceItem, index: number) => {
          const img = resolveServiceImage(service.slug, service.imageUrl);
          const reverse = index % 2 === 1;
          return (
            <Container key={service._id} id={service.slug}>
              <div
                className={`grid items-center gap-10 lg:grid-cols-2 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                <Reveal>
                  <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-white/10">
                    <Image src={img} alt="" fill className="object-cover" sizes="50vw" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-d1-charcoal/60 to-transparent" />
                  </div>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-d1-orange">
                    {formatPublicPrice(service.internalPrice, !!service.showPublicPrice)}
                  </p>
                  <h2 className="mt-2 font-display text-5xl text-d1-off-white">{service.title}</h2>
                  <p className="mt-4 text-d1-muted leading-relaxed">{service.overview}</p>
                  {service.benefits?.length ? (
                    <ul className="mt-6 space-y-2">
                      {service.benefits.map((b: string) => (
                        <li key={b} className="flex gap-2 text-sm text-d1-off-white/85">
                          <span className="text-d1-orange">▸</span> {b}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <Button href={service.ctaHref || "/contact"} className="mt-8">
                    {service.ctaLabel || "Inquire Now"}
                  </Button>
                </Reveal>
              </div>
            </Container>
          );
        })}
      </section>

      <section className="border-t border-white/10 bg-d1-charcoal-soft py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <SectionHeading eyebrow="FAQ" title="Service questions" />
          </Reveal>
          <Reveal delay={0.1}>
            <FaqAccordion items={faqs} />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
