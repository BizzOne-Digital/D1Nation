import Image from "next/image";
import { MarketingHeader } from "@/components/home/marketing/MarketingHeader";
import { MarketingServicesFooter } from "@/components/services/marketing/MarketingServicesFooter";

type Social = {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
};

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  heroImage: string;
  social: Social;
  children: React.ReactNode;
  align?: "left" | "center";
};

export function MarketingInnerShell({
  eyebrow,
  title,
  subtitle,
  heroImage,
  social,
  children,
  align = "left",
}: Props) {
  const centered = align === "center";

  return (
    <div className="min-h-screen min-w-0 overflow-x-clip bg-white font-[family-name:var(--font-marketing)] text-neutral-900 antialiased">
      <MarketingHeader />
      <section className="relative overflow-hidden border-b border-neutral-100 bg-white">
        <div
          className="pointer-events-none absolute top-[-20%] left-[-8%] hidden h-[130%] w-[18%] rotate-[16deg] bg-[#FF6A00]/20 lg:block"
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-[1280px] lg:grid-cols-2 lg:items-stretch">
          <div
            className={`relative z-10 order-2 flex flex-col justify-center px-4 py-8 sm:px-6 sm:py-10 lg:order-1 lg:px-8 lg:py-14 ${centered ? "text-center lg:text-left" : ""}`}
          >
            <div className={`flex items-center gap-3 ${centered ? "justify-center lg:justify-start" : ""}`}>
              <span className="h-px w-8 shrink-0 bg-[#FF6A00] sm:w-10" aria-hidden />
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-neutral-500 sm:text-[10px] sm:tracking-[0.28em]">
                {eyebrow}
              </p>
            </div>
            <h1 className="mt-3 text-[clamp(1.75rem,6vw,2.85rem)] font-extrabold leading-[1.1] tracking-tight break-words sm:mt-4">
              {title}
            </h1>
            {subtitle ? (
              <p className={`mt-4 max-w-lg text-sm leading-relaxed text-neutral-600 sm:text-[15px] ${centered ? "mx-auto lg:mx-0" : ""}`}>
                {subtitle}
              </p>
            ) : null}
          </div>
          <div className="relative order-1 min-h-[200px] sm:min-h-[280px] lg:order-2 lg:min-h-[360px]">
            <Image src={heroImage} alt="" fill priority className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 50vw" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/90 lg:bg-gradient-to-r lg:from-white lg:via-white/70 lg:to-transparent" />
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 sm:py-16 lg:px-8">{children}</div>
      <MarketingServicesFooter social={social} />
    </div>
  );
}
