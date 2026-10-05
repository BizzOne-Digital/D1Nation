import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MarketingInnerShell } from "@/components/marketing/MarketingInnerShell";
import type { MarketingPageDefinition } from "@/lib/marketing-pages";

type Social = {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
};

type Props = {
  content: MarketingPageDefinition;
  social: Social;
};

export function MarketingSimplePage({ content, social }: Props) {
  const { eyebrow, title, subtitle, heroImage, intro, bullets, sections, highlight, primaryCta, secondaryCta } =
    content;

  return (
    <MarketingInnerShell eyebrow={eyebrow} title={title} subtitle={subtitle} heroImage={heroImage} social={social}>
      <p className="max-w-2xl text-sm leading-relaxed text-neutral-600 sm:text-[15px]">{intro}</p>

      {highlight ? (
        <div className="mt-10 border border-[#FF6A00]/35 bg-[#FF6A00]/5 p-6 sm:p-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#FF6A00]">Key sponsor</p>
          <h2 className="mt-2 text-xl font-extrabold text-neutral-900">{highlight.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600">{highlight.body}</p>
        </div>
      ) : null}

      {bullets?.length ? (
        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {bullets.map((item) => (
            <li key={item} className="flex gap-3 border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-700">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF6A00]" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      ) : null}

      {sections?.map((block) => (
        <div key={block.heading} className="mt-12 border-t border-neutral-200 pt-10">
          <h2 className="text-lg font-extrabold text-neutral-900">{block.heading}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600">{block.body}</p>
        </div>
      ))}

      <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center">
        {primaryCta ? (
          <Link
            href={primaryCta.href}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FF6A00] px-6 py-3.5 text-xs font-bold uppercase tracking-wide text-white hover:bg-[#e85c00]"
          >
            {primaryCta.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : null}
        {secondaryCta ? (
          <Link
            href={secondaryCta.href}
            className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-neutral-800 hover:text-[#FF6A00]"
          >
            {secondaryCta.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : null}
      </div>
    </MarketingInnerShell>
  );
}
