import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { getPublishedTestimonials } from "@/lib/site-data";
import type { TestimonialItem } from "@/types/content";

export const metadata = { title: "Testimonials" };

export default async function TestimonialsPage() {
  const testimonials = await getPublishedTestimonials();

  return (
    <>
      <section className="pt-32 pb-16">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Testimonials"
              title="Stories from our community"
              subtitle="Hear from parents and athletes in the D1 Nation community."
              align="center"
            />
          </Reveal>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          {testimonials.length ? (
            <div className="grid gap-8 md:grid-cols-2">
              {testimonials.map((t: TestimonialItem, i: number) => (
                <Reveal key={t._id} delay={i * 0.05}>
                  <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-d1-charcoal-soft p-8">
                    {t.photoUrl && (
                      <div className="relative mb-6 h-16 w-16 overflow-hidden rounded-full border border-d1-orange/40">
                        <Image src={t.photoUrl} alt="" fill className="object-cover" sizes="64px" />
                      </div>
                    )}
                    <blockquote className="flex-1 text-lg leading-relaxed text-d1-off-white/90">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    {(t.name || t.role || t.context) && (
                      <footer className="mt-6 border-t border-white/10 pt-4 text-sm text-d1-muted">
                        {t.name && <span className="font-semibold text-d1-off-white">{t.name}</span>}
                        {t.role && <span> · {t.role}</span>}
                        {t.context && <p className="mt-1 text-xs">{t.context}</p>}
                      </footer>
                    )}
                  </article>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="mx-auto max-w-2xl rounded-2xl border border-dashed border-white/20 bg-white/5 p-12 text-center">
                <h2 className="font-display text-3xl text-d1-off-white">Stories coming soon</h2>
                <p className="mt-4 text-sm text-d1-muted">
                  We&apos;re collecting testimonials from D1 Nation families. Check back soon — or share
                  your experience with our team to be featured.
                </p>
                <Button href="/contact" className="mt-8">Get in Touch</Button>
              </div>
            </Reveal>
          )}
        </Container>
      </section>
    </>
  );
}
