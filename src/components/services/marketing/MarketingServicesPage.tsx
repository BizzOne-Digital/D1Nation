import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  FileText,
  GraduationCap,
  Play,
  Target,
  User,
  Users,
} from "lucide-react";
import { MarketingHeader } from "@/components/home/marketing/MarketingHeader";
import { MarketingServicesFooter } from "@/components/services/marketing/MarketingServicesFooter";
import { SERVICES_PAGE_IMAGES } from "@/lib/services-page-images";

const steps = [
  {
    num: "01",
    title: "Prepare",
    copy: "Build your profile, film, and academic story with a clear plan tailored to your goals.",
    image: SERVICES_PAGE_IMAGES.stepPrepare,
  },
  {
    num: "02",
    title: "Connect",
    copy: "Coordinate outreach, communication, and visibility with coaches who fit your path.",
    image: SERVICES_PAGE_IMAGES.stepConnect,
  },
  {
    num: "03",
    title: "Decide",
    copy: "Evaluate options with education and support — on your timeline, with confidence.",
    image: SERVICES_PAGE_IMAGES.stepDecide,
  },
];

const checklist = [
  { icon: GraduationCap, label: "Academic Information" },
  { icon: Target, label: "Athletic Details" },
  { icon: User, label: "Personal Information" },
  { icon: Play, label: "Media" },
  { icon: FileText, label: "Additional Materials" },
];

type Props = {
  heroVideoUrl?: string;
  social: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };
};

export function MarketingServicesPage({ heroVideoUrl, social }: Props) {
  return (
    <div className="min-h-screen min-w-0 overflow-x-clip bg-white font-[family-name:var(--font-marketing)] text-neutral-900 antialiased">
      <MarketingHeader variant="services" />

      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="mx-auto grid max-w-[1280px] lg:grid-cols-2 lg:items-stretch">
          <div className="relative z-10 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#FF7F27]" aria-hidden />
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-neutral-500">Recruiting Coordination</p>
            </div>
            <h1 className="mt-4 text-[clamp(2.25rem,5vw,3.35rem)] font-extrabold leading-[1.05] tracking-tight">
              Your Next Step Starts Here.
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-neutral-600 sm:text-[15px]">
              A clear, personalized path to help student-athletes navigate the recruiting process with confidence and
              support every step of the way.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FF7F27] px-6 py-3.5 text-xs font-bold uppercase tracking-wide text-white hover:bg-[#e86f1f]"
              >
                Start Your Recruiting Journey
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={heroVideoUrl || "#services-video"}
                className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-neutral-800 hover:text-[#FF7F27]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-neutral-300">
                  <Play className="h-4 w-4 fill-neutral-800 text-neutral-800" />
                </span>
                Learn More
              </Link>
            </div>
          </div>
          <div className="relative min-h-[340px] lg:min-h-[520px]">
            <Image src={SERVICES_PAGE_IMAGES.hero} alt="" fill priority className="object-cover object-right" sizes="(max-width: 1024px) 100vw, 50vw" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent lg:via-white/50" />
            <p
              className="pointer-events-none absolute bottom-[20%] right-[6%] max-w-[220px] text-center text-xl font-bold leading-tight text-[#FF7F27] sm:text-2xl"
              style={{ fontFamily: "var(--font-script)" }}
            >
              Opportunity builds brighter futures
            </p>
          </div>
        </div>
      </section>

      {/* Pathway */}
      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="text-center">
          <div className="mx-auto flex w-fit items-center gap-3">
            <span className="h-px w-10 bg-[#FF7F27]" aria-hidden />
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-neutral-500">The Recruiting Pathway</p>
            <span className="h-px w-10 bg-[#FF7F27]" aria-hidden />
          </div>
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <h2 className="text-[clamp(1.75rem,3.5vw,2.25rem)] font-extrabold leading-tight">A Clear Process. Real Support.</h2>
          <p className="text-sm leading-relaxed text-neutral-600 lg:text-[15px]">
            Recruiting is more than highlights — it&apos;s preparation, relationships, and decisions made together. Our
            coordinators walk with athletes and families through each phase.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <article key={step.num} className="relative border border-neutral-200 bg-neutral-50 pt-12">
              <span
                className="pointer-events-none absolute left-4 top-3 text-6xl font-extrabold text-[#FF7F27]/25"
                aria-hidden
              >
                {step.num}
              </span>
              <div className="relative mx-4 aspect-[4/3] overflow-hidden [clip-path:polygon(6%_0,100%_0,94%_100%,0_100%)]">
                <Image src={step.image} alt={step.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm text-neutral-600">{step.copy}</p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#FF7F27] text-white hover:bg-[#e86f1f]"
                  aria-label={`Learn more about ${step.title}`}
                >
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Navigate alone */}
      <section className="bg-neutral-50 py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative min-h-[320px] overflow-hidden">
            <Image src={SERVICES_PAGE_IMAGES.guide} alt="" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            <p
              className="pointer-events-none absolute bottom-6 left-4 max-w-[240px] text-xl font-bold leading-snug text-white drop-shadow-md sm:text-2xl"
              style={{ fontFamily: "var(--font-script)" }}
            >
              Guidance for today.
              <br />
              Opportunities for tomorrow.
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-neutral-500">For Student-Athletes and Families</p>
            <h2 className="mt-3 text-[clamp(1.75rem,3.5vw,2.25rem)] font-extrabold leading-tight">
              You Don&apos;t Have to Navigate This Alone.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              From first conversations to final decisions, D1 Nation recruiting coordination keeps athletes and parents
              aligned with a transparent, education-first approach.
            </p>
            <ul className="mt-8 space-y-6">
              <li className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FF7F27]/15 text-[#FF7F27]">
                  <User className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-sm font-bold">For Student-Athletes</p>
                  <p className="mt-1 text-sm text-neutral-600">
                    Build your brand, film, and communication skills with coordinators who understand the modern
                    recruiting landscape.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FF7F27]/15 text-[#FF7F27]">
                  <Users className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-sm font-bold">For Parents</p>
                  <p className="mt-1 text-sm text-neutral-600">
                    Stay informed with clear timelines, realistic expectations, and support that respects your family&apos;s
                    goals.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Profile checklist */}
      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)_minmax(0,1fr)] lg:items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-neutral-500">Build a Stronger Profile</p>
            <h2 className="mt-3 text-[clamp(1.75rem,3.5vw,2.1rem)] font-extrabold leading-tight">Get Ready to Be Recruited.</h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              We help athletes organize everything coaches need — academics, athletics, media, and personal story — in one
              professional package.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-[#FF7F27] px-5 py-3 text-xs font-bold uppercase tracking-wide text-[#FF7F27] hover:bg-[#FF7F27]/5"
            >
              View Full Checklist
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ul className="space-y-4">
            {checklist.map((item) => (
              <li key={item.label} className="flex items-center gap-3 border-b border-neutral-100 pb-4">
                <item.icon className="h-5 w-5 text-[#FF7F27]" strokeWidth={1.75} />
                <span className="text-sm font-semibold text-neutral-800">{item.label}</span>
              </li>
            ))}
          </ul>
          <div className="relative min-h-[300px] overflow-hidden lg:min-h-[380px]">
            <div className="absolute inset-0 [clip-path:polygon(12%_0,100%_0,88%_100%,0_100%)]">
              <Image src={SERVICES_PAGE_IMAGES.profile} alt="" fill className="object-cover" sizes="400px" />
            </div>
          </div>
        </div>
      </section>

      {/* Campus walk accent */}
      <section className="relative hidden h-48 overflow-hidden lg:block">
        <Image src={SERVICES_PAGE_IMAGES.campusWalk} alt="" fill className="object-cover object-center" sizes="100vw" />
        <div className="absolute inset-0 bg-white/70" />
      </section>

      {/* CTA */}
      <section className="relative min-h-[320px] overflow-hidden">
        <Image src={SERVICES_PAGE_IMAGES.cta} alt="" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px]" />
        <div className="relative mx-auto max-w-[640px] px-4 py-16 text-center sm:px-6 lg:py-20">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/80">Take the Next Step</p>
          <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">Tell Us About Your College Aspirations.</h2>
          <p className="mt-4 text-sm leading-relaxed text-white/90">
            Share your goals and timeline — we&apos;ll help you understand the recruiting pathway that fits your athlete.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#FF7F27] px-8 py-4 text-xs font-bold uppercase tracking-wide text-white hover:bg-[#e86f1f]"
          >
            Complete the Aspiration Form
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <MarketingServicesFooter social={social} />
    </div>
  );
}
