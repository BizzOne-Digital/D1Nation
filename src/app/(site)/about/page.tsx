import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Shield, Target, Users } from "lucide-react";
import { AboutPageHero } from "@/components/about/AboutPageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { getSiteSettings } from "@/lib/site-data";

export const metadata = { title: "About Us" };

const values = [
  {
    icon: Target,
    title: "High standards",
    copy: "Every rep, session, and conversation is tied to measurable growth — skill, athleticism, and character.",
  },
  {
    icon: Users,
    title: "Family-first",
    copy: "Parents are partners. We keep communication clear so your household stays aligned with the plan.",
  },
  {
    icon: Shield,
    title: "Honest guidance",
    copy: "We educate on recruiting and NIL without hype. No guaranteed outcomes — just a system you can trust.",
  },
  {
    icon: Heart,
    title: "Culture that lasts",
    copy: "Confidence, discipline, and leadership carry beyond the field into school and life.",
  },
];

const journey = [
  {
    phase: "Foundation",
    title: "Assess & align",
    copy: "We learn your athlete's position, goals, and graduation timeline — then map the right mix of academy, teams, and family support.",
  },
  {
    phase: "Development",
    title: "Train with purpose",
    copy: "Structured skill work, strength and speed, film, and competitive reps in an environment that demands excellence.",
  },
  {
    phase: "Preparation",
    title: "Build your story",
    copy: "Profiles, communication habits, and recruiting education so families move through the process with clarity.",
  },
  {
    phase: "Next step",
    title: "Choose your path",
    copy: "Whether the focus is the next season or the college search, decisions are made together — with transparency at every stage.",
  },
];

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <AboutPageHero aboutShort={settings.aboutShort} />

      {/* Story + image */}
      <section className="relative overflow-x-clip py-16 md:py-24">
        <Container>
          <div className="grid min-w-0 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="relative">
                <div className="absolute -left-3 top-6 h-full w-1 bg-gradient-to-b from-d1-orange to-transparent md:-left-4" aria-hidden />
                <p className="font-hero text-xs font-semibold uppercase tracking-[0.25em] text-d1-orange">
                  Our story
                </p>
                <h2 className="mt-3 font-hero text-3xl font-bold uppercase leading-tight text-white sm:text-4xl">
                  A complete sports system under one roof
                </h2>
                <p className="mt-5 text-base leading-relaxed text-d1-muted">
                  D1 Nation is a high-end sports club built for young athletes and the families behind
                  them. We unite academy training, competitive teams, recruiting coordination, and NIL
                  education — so development does not feel fragmented across camps, clubs, and consultants.
                </p>
                <p className="mt-4 text-base leading-relaxed text-d1-muted">
                  Our coaches and staff share one standard: prepare athletes to compete, communicate with
                  parents openly, and respect the long game of growth. That is the experience families
                  feel when they walk through our doors.
                </p>
                <blockquote className="mt-8 border-l-2 border-d1-orange pl-5">
                  <p className="font-hero text-lg font-medium uppercase leading-snug tracking-wide text-white/95">
                    &ldquo;We are not selling dreams — we are building capable athletes and informed
                    families.&rdquo;
                  </p>
                </blockquote>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 rounded-2xl bg-d1-orange/10 blur-2xl" aria-hidden />
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1200&q=80"
                    alt="Coach working with a young athlete"
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <p className="font-hero text-2xl font-bold uppercase text-white">The D1 standard</p>
                    <p className="mt-2 text-sm text-white/75">
                      Premium facilities, intentional coaching, and a culture athletes are proud to represent.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="border-y border-white/10 bg-gradient-to-b from-d1-charcoal-soft to-black py-16 md:py-24">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="font-hero text-xs font-semibold uppercase tracking-[0.25em] text-d1-orange">
              What we stand for
            </p>
            <h2 className="mt-3 font-hero text-3xl font-bold uppercase text-white sm:text-4xl">
              More than a club — a standard
            </h2>
            <p className="mt-4 text-d1-muted">
              Four principles guide how we train, compete, and communicate with every family.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={i * 0.06}>
                  <article className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-d1-orange/40 hover:bg-d1-orange/[0.06]">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-d1-orange/30 bg-d1-orange/10 text-d1-orange transition group-hover:bg-d1-orange group-hover:text-black">
                      <Icon size={22} strokeWidth={1.75} />
                    </span>
                    <h3 className="mt-5 font-hero text-xl font-semibold uppercase tracking-wide text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-d1-muted">{item.copy}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Journey */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <Reveal>
              <p className="font-hero text-xs font-semibold uppercase tracking-[0.25em] text-d1-orange">
                Athlete journey
              </p>
              <h2 className="mt-3 font-hero text-3xl font-bold uppercase leading-tight text-white sm:text-4xl">
                How families grow with us
              </h2>
              <p className="mt-4 text-d1-muted leading-relaxed">
                From first inquiry to long-term development, our programs are designed to stack — not
                compete with each other.
              </p>
              <Link
                href="/services"
                className="mt-8 inline-flex items-center gap-2 font-hero text-xs font-semibold uppercase tracking-[0.14em] text-d1-orange hover:text-d1-orange-bright"
              >
                View all services
                <ArrowRight size={16} />
              </Link>
            </Reveal>

            <div className="space-y-0">
              {journey.map((step, i) => (
                <Reveal key={step.title} delay={i * 0.07}>
                  <div className="relative flex gap-6 border-l border-d1-orange/30 pb-10 pl-8 last:pb-0">
                    <span
                      className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-d1-orange shadow-[0_0_12px_rgba(249,115,22,0.8)]"
                      aria-hidden
                    />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-d1-orange">
                        {step.phase}
                      </p>
                      <h3 className="mt-1 font-hero text-xl font-semibold uppercase text-white">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-d1-muted">{step.copy}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Legacy */}
      <section className="relative overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(249,115,22,0.15),transparent_55%)]" aria-hidden />
        <Container className="relative py-16 md:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <p className="font-hero text-xs font-semibold uppercase tracking-[0.25em] text-d1-orange">
                College placement legacy
              </p>
              <p className="mt-4 font-hero text-[clamp(4rem,14vw,7.5rem)] font-bold leading-none text-d1-orange">
                {settings.placementClaim}
              </p>
              <p className="mt-2 text-xl text-white/90">{settings.placementClaimLabel}</p>
              <p className="mt-6 max-w-lg text-sm leading-relaxed text-d1-muted">
                This reflects D1 Nation&apos;s stated legacy. Every athlete&apos;s path is unique — we
                support development and education; we do not guarantee scholarships, offers, or roster
                spots.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm md:p-10">
                <h3 className="font-hero text-2xl font-bold uppercase text-white">Who we serve</h3>
                <ul className="mt-6 space-y-4">
                  {[
                    "Motivated young athletes pursuing growth at the next level",
                    "Families who want structure, communication, and honesty",
                    "Players ready for academy intensity and team competition",
                    "Households navigating recruiting and NIL with guidance",
                  ].map((line) => (
                    <li key={line} className="flex gap-3 text-sm text-d1-off-white/85">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-d1-orange" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 bg-gradient-to-r from-d1-orange/15 via-black to-black">
        <Container className="flex flex-col items-center justify-between gap-8 py-14 text-center md:flex-row md:text-left">
          <div>
            <h2 className="font-hero text-2xl font-bold uppercase tracking-wide text-white md:text-3xl">
              Ready to learn more?
            </h2>
            <p className="mt-2 max-w-md text-sm text-d1-muted">
              Tell us about your athlete. We&apos;ll help you explore programs and next steps.
            </p>
          </div>
          <Link
            href="/contact"
            className="group inline-flex shrink-0 items-center gap-2 bg-gradient-to-r from-[#ff7a1a] to-[#ff9a3d] px-8 py-3.5 font-hero text-xs font-semibold uppercase tracking-[0.14em] text-black transition hover:brightness-105"
          >
            Contact D1 Nation
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Container>
      </section>
    </>
  );
}
