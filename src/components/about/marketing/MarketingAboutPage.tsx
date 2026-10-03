import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Layers,
  Play,
  Sun,
  Users,
} from "lucide-react";
import { AboutImpactCarousel } from "@/components/about/marketing/AboutImpactCarousel";
import { MarketingHeader } from "@/components/home/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/home/marketing/MarketingFooter";
import { ABOUT_IMAGES } from "@/lib/about-images";
import { HOME_IMAGES } from "@/lib/home-images";
import type { TestimonialItem } from "@/types/content";

const missionCards = [
  {
    icon: Users,
    title: "Athletes First",
    copy: "Development plans built around the person — not just the highlight reel.",
  },
  {
    icon: Layers,
    title: "Opportunities Today",
    copy: "Academy, teams, recruiting, and NIL education that connect in one system.",
  },
  {
    icon: Sun,
    title: "Brighter Tomorrows",
    copy: "Skills, confidence, and guidance that last beyond the next season.",
  },
];

const programs = [
  { num: "01", image: HOME_IMAGES.program01, title: "Academy", href: "/services" },
  { num: "02", image: HOME_IMAGES.program02, title: "Teams", href: "/services" },
  { num: "03", image: HOME_IMAGES.program03, title: "Recruiting", href: "/services" },
  { num: "04", image: HOME_IMAGES.program04, title: "NIL Opportunities", href: "/nil-opportunities" },
];

const staff = [
  { image: ABOUT_IMAGES.staffPrograms, label: "Programs" },
  { image: ABOUT_IMAGES.staffDevelopment, label: "Athlete Development" },
  { image: ABOUT_IMAGES.staffRecruiting, label: "Recruiting Support" },
];

type Props = {
  aboutShort?: string;
  placementClaim?: string;
  placementClaimLabel?: string;
  heroVideoUrl?: string;
  testimonials: TestimonialItem[];
  social: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };
};

export function MarketingAboutPage({
  aboutShort,
  placementClaim = "1,000+",
  placementClaimLabel = "Athletes placed on brighter paths",
  heroVideoUrl,
  testimonials,
  social,
}: Props) {
  const impactSlides =
    testimonials.length > 0
      ? testimonials.slice(0, 4).map((t) => ({
          quote: t.quote,
          attribution: t.name || "D1 Nation Athlete",
          role: (t.role || "College Athlete").toUpperCase(),
        }))
      : [
          {
            quote:
              "D1 Nation helped me train with purpose and tell my story the right way — on and off the field.",
            attribution: "College Athlete",
            role: "COLLEGE ATHLETE",
          },
        ];

  const storyCopy =
    aboutShort ||
    "D1 Nation is a complete ecosystem for athletes and families — academy training, competitive teams, recruiting coordination, and NIL education under one roof.";

  return (
    <div className="min-h-screen min-w-0 overflow-x-clip bg-white font-[family-name:var(--font-marketing)] text-neutral-900 antialiased">
      <MarketingHeader />

      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div
          className="pointer-events-none absolute top-[-20%] left-[-8%] hidden h-[140%] w-[22%] rotate-[18deg] bg-[#FF7F27]/25 lg:block"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute top-[-15%] right-[-5%] hidden h-[130%] w-[18%] rotate-[18deg] bg-[#FF7F27]/20 lg:block"
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-[1280px] lg:grid-cols-2 lg:items-stretch">
          <div className="relative z-10 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-neutral-500">About D1 Nation</p>
            <h1 className="mt-4 text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight">
              Built for the <span className="text-neutral-900">Next Level.</span>
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-neutral-600 sm:text-[15px]">{storyCopy}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FF7F27] px-6 py-3.5 text-xs font-bold uppercase tracking-wide text-white hover:bg-[#e86f1f]"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={heroVideoUrl || "#about-video"}
                className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-neutral-800 hover:text-[#FF7F27]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-neutral-300">
                  <Play className="h-4 w-4 fill-neutral-800 text-neutral-800" />
                </span>
                Watch D1 Nation in Action
              </Link>
            </div>
            <div className="mt-12 grid gap-6 border-t border-neutral-200 pt-8 sm:grid-cols-3">
              <div>
                <p className="text-2xl font-extrabold text-[#FF7F27]">{placementClaim}</p>
                <p className="mt-1 text-[10px] font-bold uppercase leading-snug tracking-wider text-neutral-600">
                  {placementClaimLabel}
                </p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-[#FF7F27]">4</p>
                <p className="mt-1 text-[10px] font-bold uppercase leading-snug tracking-wider text-neutral-600">
                  Pathways to grow
                </p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-[#FF7F27]">1</p>
                <p className="mt-1 text-[10px] font-bold uppercase leading-snug tracking-wider text-neutral-600">
                  Brighter future
                </p>
              </div>
            </div>
          </div>
          <div className="relative min-h-[360px] lg:min-h-[560px]">
            <Image src={ABOUT_IMAGES.hero} alt="" fill priority className="object-cover object-right" sizes="(max-width: 1024px) 100vw, 50vw" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent lg:via-white/40" />
            <p
              className="pointer-events-none absolute right-6 top-[22%] hidden max-w-[160px] text-center text-2xl font-bold text-[#FF7F27] sm:block"
              style={{ fontFamily: "var(--font-script)", transform: "rotate(-12deg)" }}
            >
              More than a game
            </p>
            <p className="pointer-events-none absolute bottom-16 right-4 hidden max-w-[200px] text-[9px] font-bold uppercase leading-relaxed tracking-[0.18em] text-neutral-500 sm:block">
              Athletes
              <br />
              Families
              <br />
              Opportunities
              <br />
              Brighter tomorrows
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative grid min-h-0 grid-cols-1 gap-4 sm:min-h-[340px] sm:grid-cols-2">
            <div className="relative min-h-[220px] overflow-hidden sm:mt-8 sm:min-h-[280px] [clip-path:polygon(8%_0,100%_0,92%_100%,0_100%)]">
              <Image src={ABOUT_IMAGES.story01} alt="" fill className="object-cover" sizes="280px" />
            </div>
            <div className="relative min-h-[220px] overflow-hidden sm:min-h-[280px] [clip-path:polygon(8%_0,100%_0,92%_100%,0_100%)]">
              <Image src={ABOUT_IMAGES.story02} alt="" fill className="object-cover" sizes="280px" />
            </div>
            <p
              className="pointer-events-none absolute -bottom-2 left-2 z-10 max-w-[200px] text-xl font-bold text-[#FF7F27] sm:text-2xl"
              style={{ fontFamily: "var(--font-script)" }}
            >
              A stronger tomorrow together
            </p>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#FF7F27]" aria-hidden />
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-neutral-500">Our Story</p>
            </div>
            <h2 className="mt-4 text-[clamp(1.75rem,3.5vw,2.35rem)] font-extrabold leading-tight">
              More Than Athletes.
              <br />
              Stronger Futures.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-neutral-600">
              We started with a simple belief: families deserve one trusted partner for training, competition, and the
              path to what&apos;s next. Today, D1 Nation is that ecosystem — built for athletes who want more and parents
              who want clarity.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              From first reps to recruiting conversations, our coaches and staff stay aligned on the same standard —
              people first, purpose always, progress you can measure.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-[#FF7F27] px-6 py-3 text-xs font-bold uppercase tracking-wide text-[#FF7F27] hover:bg-[#FF7F27]/5"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Founder & Staff */}
      <section className="bg-neutral-50 py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1280px] gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_1.4fr] lg:px-8">
          <article className="relative min-h-[420px] overflow-hidden rounded-sm shadow-lg">
            <Image src={ABOUT_IMAGES.founder} alt="Founder" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 400px" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <p className="absolute bottom-6 left-6 text-sm font-bold uppercase tracking-[0.25em] text-white">Founder</p>
          </article>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-neutral-500">Our Staff</p>
            <h2 className="mt-2 text-2xl font-extrabold">Leaders behind the system</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {staff.map((member) => (
                <article key={member.label} className="group bg-white shadow-sm">
                  <div className="relative aspect-square overflow-hidden">
                    <Image src={member.image} alt={member.label} fill className="object-cover transition group-hover:scale-105" sizes="200px" />
                  </div>
                  <div className="flex items-center justify-between gap-2 p-4">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-800">{member.label}</p>
                    <Link
                      href="/team"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FF7F27] text-white"
                      aria-label={`Meet ${member.label}`}
                    >
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-neutral-500">Our Mission</p>
            <h2 className="mt-3 text-[clamp(1.75rem,3.5vw,2.35rem)] font-extrabold leading-tight">
              People. Purpose. Progress.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-600">
              We exist to help athletes grow with intention — on the court, in the classroom, and in the decisions that
              shape their future.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {missionCards.map((card) => (
              <div key={card.title} className="border border-neutral-200 bg-white p-5">
                <card.icon className="h-8 w-8 text-[#FF7F27]" strokeWidth={1.5} />
                <p className="mt-4 text-xs font-bold uppercase tracking-wider text-neutral-900">{card.title}</p>
                <p className="mt-2 text-xs leading-relaxed text-neutral-600">{card.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video */}
      <section id="about-video" className="relative min-h-[300px] sm:min-h-[380px]">
        <Image src={ABOUT_IMAGES.videoBreak} alt="" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white">
          <Link
            href={heroVideoUrl || "/contact"}
            className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white bg-white/10 backdrop-blur-sm hover:bg-white/20"
            aria-label="Play video"
          >
            <Play className="h-7 w-7 fill-white text-white" />
          </Link>
          <span className="text-sm font-semibold">Watch D1 Nation in Action</span>
        </div>
      </section>

      {/* Programs */}
      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-neutral-500">Our Programs</p>
            <h2 className="mt-3 text-[clamp(1.75rem,3.5vw,2.25rem)] font-extrabold leading-tight">
              Four Pathways.
              <br />
              A Brighter Future.
            </h2>
            <p className="mt-4 max-w-sm text-sm text-neutral-600">
              Every athlete finds the right door — and every door leads to the same culture of excellence.
            </p>
            <Link
              href="/services"
              className="mt-8 inline-flex rounded-full border-2 border-[#FF7F27] px-5 py-3 text-xs font-bold uppercase tracking-wide text-[#FF7F27] hover:bg-[#FF7F27]/5"
            >
              Explore All Programs
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {programs.map((p) => (
              <article key={p.num} className="relative border border-neutral-200 bg-neutral-50 pt-10">
                <span
                  className="pointer-events-none absolute left-4 top-2 text-5xl font-extrabold text-transparent"
                  style={{ WebkitTextStroke: "2px #FF7F27" }}
                  aria-hidden
                >
                  {p.num}
                </span>
                <div className="relative mx-4 mb-4 aspect-[4/3] overflow-hidden [clip-path:polygon(6%_0,100%_0,94%_100%,0_100%)]">
                  <Image src={p.image} alt={p.title} fill className="object-cover object-top" sizes="280px" />
                </div>
                <div className="px-5 pb-5">
                  <h3 className="text-base font-bold">{p.title}</h3>
                  <Link href={p.href} className="mt-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#FF7F27] text-white">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <Image src={ABOUT_IMAGES.impact} alt="" fill className="object-cover object-center grayscale" sizes="100vw" />
        <div className="absolute inset-0 bg-neutral-900/75" />
        <div
          className="pointer-events-none absolute -left-20 top-0 hidden h-full w-[45%] rotate-[-8deg] bg-[#FF7F27]/85 sm:block"
          aria-hidden
        />
        <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.28em] text-white/70">Our Impact</p>
          <AboutImpactCarousel slides={impactSlides} />
        </div>
      </section>

      {/* Join CTA */}
      <section className="relative min-h-[320px] overflow-hidden">
        <Image src={ABOUT_IMAGES.cta} alt="" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative mx-auto flex max-w-[1280px] flex-col gap-8 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#FF7F27]">Join D1 Nation</p>
            <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">Be Part of What&apos;s Next.</h2>
            <p className="mt-3 max-w-md text-sm text-white/85">
              Athletes. Families. Coaches. A stronger tomorrow starts here.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="inline-flex justify-center rounded-full bg-[#FF7F27] px-6 py-3.5 text-xs font-bold uppercase tracking-wide text-white"
              >
                Get Started
              </Link>
              <Link
                href={heroVideoUrl || "#about-video"}
                className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-white hover:text-[#FF7F27]"
              >
                <Play className="h-4 w-4 fill-white" />
                Watch D1 Nation in Action
              </Link>
            </div>
          </div>
          <p
            className="max-w-xs text-right text-2xl font-extrabold uppercase leading-tight text-white/95 sm:text-3xl"
            style={{ transform: "skewY(-6deg)" }}
          >
            Same people
            <br />
            Bigger tomorrows
          </p>
        </div>
      </section>

      <MarketingFooter social={social} />
    </div>
  );
}
