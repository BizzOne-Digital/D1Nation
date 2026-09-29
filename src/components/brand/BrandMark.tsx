import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

type BrandMarkProps = {
  logoUrl?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "header";
};

const sizes = {
  sm: { text: "text-xl", mark: "h-8 w-8 text-sm" },
  md: { text: "text-2xl", mark: "h-10 w-10 text-base" },
  lg: { text: "text-3xl md:text-4xl", mark: "h-12 w-12 text-lg" },
};

export function BrandMark({
  logoUrl,
  className,
  size = "md",
  variant = "default",
}: BrandMarkProps) {
  const s = sizes[size];

  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-d1-orange rounded-sm",
        className,
      )}
      aria-label="D1 Nation home"
    >
      {logoUrl ? (
        <Image
          src={logoUrl}
          alt="D1 Nation logo"
          width={160}
          height={48}
          className="h-10 w-auto object-contain"
          priority
        />
      ) : variant === "header" ? (
        <span
          className={cn(
            "font-display italic uppercase leading-none tracking-wide",
            size === "sm"
              ? "text-[clamp(1.15rem,4.5vw,1.65rem)]"
              : s.text,
          )}
        >
          <span className="text-d1-orange">D1</span>
          <span className="text-d1-off-white"> Nation</span>
        </span>
      ) : (
        <>
          <span
            className={cn(
              "relative flex items-center justify-center rounded-sm border border-d1-orange/40 bg-d1-charcoal-soft font-display text-d1-orange orange-glow transition-transform group-hover:scale-105",
              s.mark,
            )}
            aria-hidden
          >
            D1
          </span>
          <span className={cn("font-display leading-none text-d1-off-white", s.text)}>
            NATION
            <span className="block h-0.5 w-full origin-left scale-x-0 bg-d1-orange transition-transform duration-500 group-hover:scale-x-100" />
          </span>
        </>
      )}
    </Link>
  );
}
