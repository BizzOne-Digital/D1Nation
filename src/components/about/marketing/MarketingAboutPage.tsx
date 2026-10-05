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
              {heroVideoUrl ? (
                <Link
                  href={heroVideoUrl}
                  className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-neutral-800 hover:text-[#FF7F27]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-neutral-300">
                    <Play className="h-4 w-4 fill-neutral-800 text-neutral-800" />
                  </span>
                  Watch D1 Nation in Action
                </Link>
              ) : null}
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
      <section id="our-story" className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
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
            <Link
              href="/services"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#FF7F27] hover:underline"
            >
              See how our four pathways work together
              <ArrowRight className="h-4 w-4" />
            </Link>
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

      {/* Impact — split layout so the athlete (left side of photo) is not cropped or hidden under the orange panel */}
      <section className="overflow-hidden bg-neutral-900">
        <div className="mx-auto grid max-w-[1280px] lg:grid-cols-2 lg:items-stretch">
          <div className="relative order-2 px-4 py-14 sm:px-6 sm:py-16 lg:order-1 lg:px-8 lg:py-20">
            <div
              className="pointer-events-none absolute -left-24 top-0 hidden h-full w-[70%] rotate-[-8deg] bg-[#FF7F27]/90 lg:block"
              aria-hidden
            />
            <div className="relative z-10">
              <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.28em] text-white/70">Our Impact</p>
              <AboutImpactCarousel slides={impactSlides} />
            </div>
          </div>
          <div className="relative order-1 min-h-[min(72vw,420px)] w-full sm:min-h-[400px] lg:order-2 lg:min-h-[520px]">
            <Image
              src={ABOUT_IMAGES.impact}
              alt="D1 Nation athlete"
              fill
              className="object-cover object-left grayscale [object-position:left_32%]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-900/50 via-transparent to-transparent lg:bg-gradient-to-l lg:from-neutral-900/70 lg:via-neutral-900/15 lg:to-transparent"
              aria-hidden
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 rounded-2xl border border-neutral-200 bg-neutral-50 px-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h2 className="text-xl font-extrabold text-neutral-900">Want to train with us?</h2>
            <p className="mt-2 max-w-md text-sm text-neutral-600">
              Programs and pathways live on the home page and Services — start here when you&apos;re ready to talk.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex justify-center rounded-full bg-[#FF7F27] px-6 py-3.5 text-xs font-bold uppercase tracking-wide text-white hover:bg-[#e86f1f]"
            >
              Contact Us
            </Link>
            <Link
              href="/"
              className="inline-flex justify-center rounded-full border-2 border-neutral-300 px-6 py-3.5 text-xs font-bold uppercase tracking-wide text-neutral-800 hover:border-[#FF7F27] hover:text-[#FF7F27]"
            >
              View Programs
            </Link>
          </div>
        </div>
      </section>

      <MarketingFooter social={social} />
    </div>
  );
}
