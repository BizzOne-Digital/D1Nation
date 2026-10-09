import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Compass,
  Megaphone,
  Shield,
  Users,
  Handshake,
} from "lucide-react";
import { MarketingHeader } from "@/components/home/marketing/MarketingHeader";
import { MarketingNilFooter } from "@/components/nil/marketing/MarketingNilFooter";
import { NIL_IMAGES } from "@/lib/nil-images";

const educationCards = [
  {
    image: NIL_IMAGES.eduUnderstand,
    icon: BookOpen,
    title: "Understand NIL",
    copy: "Learn what Name, Image, and Likeness means — and what it means for your athlete today.",
  },
  {
    image: NIL_IMAGES.eduBrand,
    icon: Megaphone,
    title: "Build Your Brand",
    copy: "Develop an authentic voice, content habits, and visibility that reflect who you are.",
  },
  {
    image: NIL_IMAGES.eduOpportunities,
    icon: Handshake,
    title: "Explore Opportunities",
    copy: "Discover partnerships and activations that align with your values and long-term goals.",
  },
  {
    image: NIL_IMAGES.eduDecisions,
    icon: Shield,
    title: "Make Smart Decisions",
    copy: "Navigate contracts, compliance, and family conversations with education-first guidance.",
  },
];

const pathColumns = [
  {
    icon: BarChart3,
    title: "Short-Term Opportunities",
    copy: "Activate your platform responsibly with deals and campaigns that fit your season and schedule.",
  },
  {
    icon: Users,
    title: "Long-Term Skills",
    copy: "Build communication, media, and business literacy that travels with you beyond sports.",
  },
  {
    icon: Compass,
    title: "Lifelong Impact",
    copy: "Shape a personal brand rooted in purpose — not hype — for opportunities that last.",
  },
];

type Props = {
  social: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };
};

export function MarketingNilPage({ social }: Props) {
  return (
    <div className="marketing-energy min-h-screen min-w-0 bg-white font-[family-name:var(--font-marketing)] text-neutral-900 antialiased">
      <MarketingHeader variant="nil" />

      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div
          className="pointer-events-none absolute top-[-18%] left-[-6%] hidden h-[135%] w-[20%] rotate-[16deg] bg-[#FF6A00]/25 lg:block"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute top-[-12%] right-[-4%] hidden h-[125%] w-[16%] rotate-[16deg] bg-[#FF6A00]/18 lg:block"
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-[1280px] lg:grid-cols-2 lg:items-stretch">
          <div className="relative z-10 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#FF6A00]" aria-hidden />
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-neutral-500">NIL Opportunities</p>
            </div>
            <h1 className="mt-4 text-[clamp(2.25rem,5vw,3.35rem)] font-extrabold leading-[1.05] tracking-tight">
              Build Your Name Beyond the Game.
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-neutral-600 sm:text-[15px]">
              Name, Image, and Likeness is more than deals — it&apos;s how athletes tell their story, protect their
              future, and grow with purpose. D1 Nation helps families navigate NIL with education, compliance, and
              confidence.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#FF6A00] px-6 py-3.5 text-xs font-bold uppercase tracking-wide text-white hover:bg-[#e85f00]"
            >
              Explore NIL Resources
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative min-h-[360px] lg:min-h-[520px]">
            <Image src={NIL_IMAGES.hero} alt="" fill priority className="object-cover object-right" sizes="(max-width: 1024px) 100vw, 50vw" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-white/75 to-transparent lg:via-white/45" />
            <p
              className="pointer-events-none absolute bottom-[22%] right-[5%] max-w-[200px] text-center text-xl font-bold leading-tight text-[#FF6A00] sm:text-2xl"
              style={{ fontFamily: "var(--font-script)" }}
            >
              Your platform has potential
            </p>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="text-center">
          <div className="mx-auto flex w-fit items-center gap-3">
            <span className="h-px w-10 bg-[#FF6A00]" aria-hidden />
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-neutral-500">Education First</p>
            <span className="h-px w-10 bg-[#FF6A00]" aria-hidden />
          </div>
          <h2 className="mt-4 text-[clamp(1.75rem,3.5vw,2.35rem)] font-extrabold">Knowledge Creates Opportunity.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-neutral-600">
            We teach athletes and families the fundamentals of NIL — so every opportunity is understood, intentional,
            and aligned with your bigger picture.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {educationCards.map((card) => (
            <article key={card.title} className="flex flex-col border border-neutral-200 bg-white">
              <div className="relative aspect-[4/3] bg-neutral-100">
                <Image src={card.image} alt="" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <card.icon className="h-7 w-7 text-[#FF6A00]" strokeWidth={1.5} />
                <h3 className="mt-3 text-sm font-bold">{card.title}</h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-neutral-600">{card.copy}</p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex h-8 w-8 items-center justify-center self-end rounded-full bg-[#FF6A00] text-white"
                  aria-label={`Learn more: ${card.title}`}
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Personal brand */}
      <section className="overflow-hidden bg-neutral-50 py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative z-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-neutral-500">Your Personal Brand</p>
            <h2 className="mt-3 text-[clamp(1.75rem,3.5vw,2.35rem)] font-extrabold leading-tight">More Than an Athlete.</h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              Your story is your advantage. We help athletes craft messaging, content, and presence that feel authentic
              — on social, on camera, and in the room.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#FF6A00] px-6 py-3.5 text-xs font-bold uppercase tracking-wide text-white"
            >
              Start Building Your Brand
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p
              className="mt-10 max-w-xs text-lg font-bold leading-snug text-neutral-800"
              style={{ fontFamily: "var(--font-script)" }}
            >
              Authentic • Purposeful • Lasting
            </p>
          </div>
          <div className="relative min-h-0">
            <div className="relative aspect-[4/3] overflow-hidden lg:hidden">
              <Image src={NIL_IMAGES.brandHero} alt="" fill className="object-cover" sizes="100vw" />
            </div>
            <div className="relative hidden min-h-[400px] lg:block">
              <div className="absolute inset-y-4 left-0 right-[28%] overflow-hidden [clip-path:polygon(8%_0,100%_0,92%_100%,0_100%)]">
                <Image src={NIL_IMAGES.brandHero} alt="" fill className="object-cover" sizes="40vw" />
              </div>
              <div className="absolute right-0 top-8 h-[38%] w-[42%] overflow-hidden border-4 border-white shadow-lg [clip-path:polygon(10%_0,100%_0,90%_100%,0_100%)]">
                <Image src={NIL_IMAGES.brandInsetNotebook} alt="" fill className="object-cover" sizes="200px" />
              </div>
              <div className="absolute right-4 bottom-4 h-[42%] w-[48%] overflow-hidden border-4 border-white shadow-lg [clip-path:polygon(8%_0,100%_0,92%_100%,0_100%)]">
                <Image src={NIL_IMAGES.brandInsetTrack} alt="" fill className="object-cover" sizes="240px" />
              </div>
              <div
                className="pointer-events-none absolute top-0 right-[20%] h-full w-[3px] rotate-12 bg-[#FF6A00]/80"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </section>

      {/* Families */}
      <section className="relative min-h-[420px] overflow-hidden lg:min-h-[480px]">
        <Image src={NIL_IMAGES.families} alt="" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/20" />
        <div className="relative mx-auto flex h-full min-h-[420px] max-w-[1280px] flex-col justify-end px-4 pb-14 pt-24 sm:px-6 lg:min-h-[480px] lg:px-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#FF6A00]" aria-hidden />
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/90">Families Matter</p>
            </div>
            <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">Have the Conversation.</h2>
            <p className="mt-4 text-sm leading-relaxed text-white/90">
              NIL decisions affect the whole household. We give parents and athletes shared language, guardrails, and
              resources so you move forward together.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#FF6A00] px-6 py-3.5 text-xs font-bold uppercase tracking-wide text-white"
            >
              Family Resources
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Responsible path */}
      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 border-b border-neutral-200 pb-12 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-neutral-500">A Responsible Path</p>
            <h2 className="mt-3 text-[clamp(1.75rem,3.5vw,2.25rem)] font-extrabold">Opportunity With Perspective.</h2>
          </div>
          <p className="text-sm leading-relaxed text-neutral-600">
            We focus on education over hype — helping athletes understand short-term wins, long-term skills, and the
            impact of every choice on their name and their future.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {pathColumns.map((col) => (
            <div key={col.title}>
              <col.icon className="h-8 w-8 text-[#FF6A00]" strokeWidth={1.5} />
              <h3 className="mt-4 text-sm font-bold">{col.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{col.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <MarketingNilFooter social={social} />
    </div>
  );
}
