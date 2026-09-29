import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ServiceCard } from "@/components/services/ServiceCard";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { Button } from "@/components/ui/Button";
import {
  getSiteSettings,
  getPublishedServices,
  getFaqs,
  getPublishedTestimonials,
} from "@/lib/site-data";
import type { ServiceItem, TestimonialItem } from "@/types/content";

const journey = [
  { step: "01", title: "Discover", copy: "Share your athlete's goals and learn how our programs align with your family's path." },
  { step: "02", title: "Develop", copy: "Train with elite coaching, competitive reps, and a culture built for growth." },
  { step: "03", title: "Document", copy: "Build film, profiles, and communication habits that support the recruiting process." },
  { step: "04", title: "Decide", copy: "Navigate options with education and coordination — on your timeline, with clarity." },
];

export default async function HomePage() {
  const [settings, services, faqs, testimonials] = await Promise.all([
    getSiteSettings(),
    getPublishedServices(),
    getFaqs(["home", "general"]),
    getPublishedTestimonials(),
  ]);

  const previewFaqs = faqs.slice(0, 4);
  const previewTestimonials = testimonials.slice(0, 3);

  return (
    <>
      <Hero
        heroVideoUrl={settings.heroVideoUrl}
        heroImageUrl={settings.heroImageUrl || undefined}
      />

      <section className="relative w-full overflow-x-clip py-20 md:py-28">
        <Container className="min-w-0">
          <Reveal>
            <SectionHeading
              eyebrow="The System"
              title="Four pillars. One standard."
              subtitle="Academy training, competitive teams, recruiting coordination, and NIL education — designed to work together."
              align="center"
              className="mb-14"
            />
          </Reveal>
          <div className="grid min-w-0 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s: ServiceItem, i: number) => (
              <ServiceCard key={s._id} service={s} index={i} />
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden border-y border-white/10 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(249,115,22,0.12),transparent_50%)]" />
        <Container className="relative grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-d1-orange">Legacy</p>
            <p className="mt-4 font-display text-[clamp(4rem,12vw,8rem)] leading-none text-gradient-orange">
              {settings.placementClaim}
            </p>
            <p className="mt-2 max-w-md text-lg text-d1-off-white/90">{settings.placementClaimLabel}</p>
            <p className="mt-6 text-sm leading-relaxed text-d1-muted">{settings.aboutShort}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
              <h3 className="font-display text-3xl text-d1-off-white">Built for families</h3>
              <p className="mt-4 text-sm leading-relaxed text-d1-muted">
                We partner with parents and athletes pursuing college athletics — with transparency,
                high standards, and a premium club experience at every touchpoint.
              </p>
              <Button href="/about" variant="secondary" className="mt-6">Our Story</Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="The Journey"
              title="From first conversation to next chapter"
              align="center"
              className="mb-14"
            />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {journey.map((j, i) => (
              <Reveal key={j.step} delay={i * 0.08}>
                <div className="relative h-full rounded-2xl border border-white/10 bg-d1-charcoal-soft p-6 transition hover:border-d1-orange/40">
                  <span className="font-display text-5xl text-d1-orange/30">{j.step}</span>
                  <h3 className="mt-2 font-display text-2xl text-d1-off-white">{j.title}</h3>
                  <p className="mt-3 text-sm text-d1-muted">{j.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-white/10 bg-d1-charcoal-soft py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Voices"
              title="Families who train with us"
              subtitle="Hear from parents and athletes in the D1 Nation community."
              align="center"
              className="mb-12"
            />
          </Reveal>
          {previewTestimonials.length ? (
            <div className="grid gap-6 md:grid-cols-3">
              {previewTestimonials.map((t: TestimonialItem, i: number) => (
                <Reveal key={t._id} delay={i * 0.1}>
                  <blockquote className="h-full rounded-2xl border border-white/10 bg-white/5 p-6">
                    <p className="text-sm leading-relaxed text-d1-off-white/90">&ldquo;{t.quote}&rdquo;</p>
                    {(t.name || t.role) && (
                      <footer className="mt-4 text-xs uppercase tracking-wider text-d1-muted">
                        {t.name}{t.role ? ` · ${t.role}` : ""}
                      </footer>
                    )}
                  </blockquote>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-white/15 p-10 text-center">
              <p className="text-sm text-d1-muted">
                Testimonials coming soon. Add and publish real family stories in the admin portal.
              </p>
              <Button href="/testimonials" variant="secondary" className="mt-6">View Testimonials</Button>
            </div>
          )}
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <SectionHeading eyebrow="FAQ" title="Quick answers" />
            <p className="mt-4 text-sm text-d1-muted">
              <Link href="/contact" className="text-d1-orange hover:underline">Contact us</Link> for
              program-specific questions.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <FaqAccordion items={previewFaqs} />
          </Reveal>
        </Container>
      </section>

      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-d1-orange/20 via-transparent to-d1-orange/10" />
        <Container className="relative text-center">
          <Reveal>
            <h2 className="font-display text-5xl text-d1-off-white md:text-6xl">Ready to elevate your path?</h2>
            <p className="mx-auto mt-4 max-w-xl text-d1-muted">
              Tell us about your athlete. We&apos;ll follow up with next steps — no pressure, no fabricated promises.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/contact">Contact D1 Nation</Button>
              <Button href="/pricing" variant="secondary">Pricing & Programs</Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
