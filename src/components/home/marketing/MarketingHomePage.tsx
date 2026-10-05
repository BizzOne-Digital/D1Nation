import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  GraduationCap,
  Play,
  Shield,
  Users,
  Trophy,
  Target,
  Heart,
} from "lucide-react";
import { MarketingHeader } from "@/components/home/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/home/marketing/MarketingFooter";
import { HOME_IMAGES } from "@/lib/home-images";
import type { TestimonialItem } from "@/types/content";

const values = [
  {
    icon: BarChart3,
    title: "Better Athletes",
    copy: "Elite coaching, competitive reps, and development built for every stage of the journey.",
  },
  {
    icon: Users,
    title: "Stronger Communities",
    copy: "Teams and families united by standards, accountability, and a shared love for the game.",
  },
  {
    icon: GraduationCap,
    title: "Brighter Futures",
    copy: "Education, recruiting support, and NIL guidance that open doors beyond high school.",
  },
  {
    icon: Shield,
    title: "Families First",
    copy: "Transparent communication and a premium experience parents can trust.",
  },
];

const programs = [
  {
    num: "01",
    image: HOME_IMAGES.program01,
    title: "Academy",
    copy: "Skill development, strength, and basketball IQ in a supportive training environment.",
    href: "/services",
  },
  {
    num: "02",
    image: HOME_IMAGES.program02,
    title: "Teams",
    copy: "Competitive club teams with high standards on and off the court.",
    href: "/services",
  },
  {
    num: "03",
    image: HOME_IMAGES.program03,
    title: "Recruiting",
    copy: "Film, profiles, and coordination to navigate the college pathway with clarity.",
    href: "/services",
  },
  {
    num: "04",
    image: HOME_IMAGES.program04,
    title: "NIL Opportunities",
    copy: "Education and brand-building so athletes grow with confidence and compliance.",
    href: "/nil-opportunities",
  },
];

const paths = [
  {
    image: HOME_IMAGES.path01,
    title: "Foundations",
    ages: "Ages 8–12",
    copy: "Fundamentals, fun, and habits that last.",
  },
  {
    image: HOME_IMAGES.path02,
    title: "Development",
    ages: "Ages 13–15",
    copy: "Skill expansion and competitive readiness.",
  },
  {
    image: HOME_IMAGES.path03,
    title: "High Performance",
    ages: "Ages 16–18",
    copy: "Elite training aligned with recruiting goals.",
  },
  {
    image: HOME_IMAGES.path04,
    title: "Next Opportunities",
    ages: "Post–High School",
    copy: "College prep, NIL, and life-after-sports support.",
  },
];

const academyPillars = [
  { icon: Trophy, title: "Elite Coaching" },
  { icon: Heart, title: "Supportive Culture" },
  { icon: Target, title: "More Than Sports" },
];

type Props = {
  heroVideoUrl?: string;
  testimonial?: TestimonialItem;
  social: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };
};

export function MarketingHomePage({ heroVideoUrl, testimonial, social }: Props) {
  const quote =
    testimonial?.quote ||
    "D1 Nation gave our family a clear plan — great coaching, real communication, and a culture our kid is proud to represent.";
  const attribution = testimonial?.name ? `${testimonial.name}` : "D1 Parent";
  const role = testimonial?.role || "Parent";

  return (
    <div className="min-h-screen min-w-0 overflow-x-clip bg-white font-[family-name:var(--font-marketing)] text-neutral-900 antialiased">
      <MarketingHeader />

      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="mx-auto grid max-w-[1280px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-stretch">
          <div className="relative z-10 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-8 lg:py-16 xl:py-20">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-neutral-500 sm:text-[11px]">
              Athletes • Families • Brighter Tomorrows
            </p>
            <h1 className="mt-4 text-[clamp(2.5rem,5.5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight text-neutral-900">
              Train with Purpose.
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-neutral-600 sm:text-[15px]">
              A complete sports system — academy training, competitive teams, recruiting coordination, and NIL education —
              designed to build stronger athletes and brighter futures.
            </p>
            <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center gap-2 bg-[#FF6600] px-6 py-3.5 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-[#e85c00] sm:w-auto"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
              {heroVideoUrl ? (
                <Link
                  href={heroVideoUrl}
                  className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-neutral-800 hover:text-[#FF6600]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-neutral-300">
                    <Play className="h-4 w-4 fill-neutral-800 text-neutral-800" />
                  </span>
                  Watch Our Story
                </Link>
              ) : (
                <Link
                  href="/about#our-story"
                  className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-neutral-800 hover:text-[#FF6600]"
                >
                  Our Story
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
          <div className="relative min-h-[320px] sm:min-h-[400px] lg:min-h-[520px]">
            <Image
              src={HOME_IMAGES.hero}
              alt="D1 Nation athletes training"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
            <p
              className="pointer-events-none absolute bottom-[18%] right-[8%] hidden max-w-[140px] rotate-[-8deg] text-center text-2xl font-bold leading-tight text-[#FF6600] sm:block lg:text-3xl"
              style={{ fontFamily: "var(--font-script)" }}
            >
              More than a game
            </p>
            <p className="pointer-events-none absolute bottom-8 left-4 hidden max-w-[200px] text-[10px] font-bold uppercase leading-snug tracking-[0.2em] text-white drop-shadow-md sm:left-8 md:block lg:bottom-12">
              Stronger athletes
              <br />
              Brighter futures
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-neutral-200">
        <div className="mx-auto grid max-w-[1280px] sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <div
              key={v.title}
              className={`flex flex-col gap-3 px-6 py-10 sm:px-8 ${i < values.length - 1 ? "border-neutral-200 lg:border-r" : ""} ${i % 2 === 0 ? "sm:border-r" : ""} border-b sm:border-b-0`}
            >
              <v.icon className="h-8 w-8 text-[#FF6600]" strokeWidth={1.5} />
              <h2 className="text-base font-bold text-neutral-900">{v.title}</h2>
              <p className="text-sm leading-relaxed text-neutral-600">{v.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Programs */}
      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-[clamp(1.75rem,3.5vw,2.25rem)] font-extrabold leading-tight text-neutral-900">
              Four Pathways.
              <br />
              A Brighter Future.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-600">
              From first dribble to college conversations — every program connects to the same standard of excellence.
            </p>
            <Link
              href="/services"
              className="mt-8 inline-flex items-center gap-2 bg-[#FF6600] px-5 py-3 text-xs font-bold uppercase tracking-wide text-white hover:bg-[#e85c00]"
            >
              Explore All Programs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {programs.map((p) => (
              <article key={p.num} className="flex flex-col border border-neutral-200 bg-neutral-50">
                <div className="relative aspect-[4/3] bg-neutral-100">
                  <Image src={p.image} alt={p.title} fill className="object-cover object-top" sizes="(max-width: 640px) 100vw, 280px" />
                  <span className="absolute left-3 top-3 text-xs font-bold text-white/90">{p.num}</span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-bold text-neutral-900">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-neutral-600">{p.copy}</p>
                  <Link
                    href={p.href}
                    className="mt-4 inline-flex h-9 w-9 items-center justify-center self-end rounded-full bg-[#FF6600] text-white hover:bg-[#e85c00]"
                    aria-label={`Learn more about ${p.title}`}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Clear path */}
      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <h2 className="text-[clamp(1.75rem,3.5vw,2.25rem)] font-extrabold leading-tight">
            A Clear Path for Every Athlete.
          </h2>
          <p className="text-sm leading-relaxed text-neutral-600 lg:text-[15px]">
            Age-appropriate training that grows with your athlete — from foundations through post–high school opportunities,
            with one culture and one standard at every step.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:-mx-4 lg:grid-cols-4 lg:gap-0">
          {paths.map((path, i) => (
            <div
              key={path.title}
              className="group relative min-h-[280px] overflow-hidden lg:min-h-[360px] lg:-skew-x-3 lg:origin-bottom"
              style={{ zIndex: paths.length - i }}
            >
              <div className="relative h-full min-h-[280px] overflow-hidden lg:skew-x-3 lg:scale-[1.02]">
                <Image src={path.image} alt={path.title} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 1024px) 50vw, 25vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 p-5 text-white">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#FF6600]">{path.ages}</p>
                  <h3 className="mt-1 text-lg font-bold">{path.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/85">{path.copy}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Academy */}
      <section className="overflow-hidden bg-neutral-50">
        <div className="mx-auto grid max-w-[1280px] lg:grid-cols-2">
          <div className="relative min-h-[320px] lg:min-h-[480px]">
            <div className="absolute inset-0 lg:right-8 lg:skew-x-[-4deg] lg:overflow-hidden">
              <div className="relative h-full w-full lg:skew-x-[4deg] lg:scale-110">
                <Image src={HOME_IMAGES.academy} alt="Academy training" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center px-4 py-14 sm:px-6 lg:px-10 lg:py-16">
            <h2 className="text-[clamp(1.75rem,3.5vw,2.25rem)] font-extrabold leading-tight">Train. Grow. Belong.</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-600">
              D1 Nation Academy is where skill meets culture — elite coaching, competitive energy, and a community that
              believes in athletes as people first.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex w-fit items-center gap-2 bg-[#FF6600] px-5 py-3 text-xs font-bold uppercase tracking-wide text-white hover:bg-[#e85c00]"
            >
              Ask About Academy
              <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {academyPillars.map((item) => (
                <div key={item.title} className="text-center sm:text-left">
                  <item.icon className="mx-auto h-7 w-7 text-[#FF6600] sm:mx-0" strokeWidth={1.5} />
                  <p className="mt-2 text-sm font-bold text-neutral-900">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <h2 className="text-[clamp(1.75rem,3.5vw,2.25rem)] font-extrabold leading-tight">
            Stronger Athletes.
            <br />
            Brighter Futures.
          </h2>
          <div>
            <span className="text-6xl font-serif leading-none text-[#FF6600]" aria-hidden>&ldquo;</span>
            <blockquote className="-mt-4 text-lg font-medium leading-relaxed text-neutral-800 sm:text-xl">{quote}</blockquote>
            <div className="mt-8 flex items-center gap-4">
              <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-[#FF6600]/40">
                <Image
                  src={testimonial?.photoUrl || HOME_IMAGES.testimonial}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-neutral-900">{attribution}</p>
                <p className="text-xs text-neutral-500">{role}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative min-h-[220px] overflow-hidden sm:min-h-[260px]">
        <Image src={HOME_IMAGES.cta} alt="" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-6 px-4 py-14 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">Ready to Be Part of Something Bigger?</h2>
            <p className="mt-2 max-w-md text-sm text-white/85">Join a system built for athletes, families, and brighter tomorrows.</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 bg-[#FF6600] px-8 py-4 text-xs font-bold uppercase tracking-wide text-white hover:bg-[#e85c00]"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <MarketingFooter social={social} />
    </div>
  );
}
