import Link from "next/link";
import { cn } from "@/lib/cn";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-d1-orange focus-visible:ring-offset-2 focus-visible:ring-offset-d1-charcoal disabled:opacity-50";

const variants = {
  primary:
    "bg-d1-orange text-d1-charcoal hover:bg-d1-orange-bright hover:shadow-[0_0_40px_-8px_rgba(249,115,22,0.8)] active:scale-[0.98]",
  secondary:
    "border border-d1-off-white/20 bg-white/5 text-d1-off-white backdrop-blur hover:border-d1-orange/50 hover:bg-d1-orange/10",
  ghost: "text-d1-off-white hover:text-d1-orange",
  marketing:
    "rounded-full bg-[#FF6A00] px-6 py-3 text-xs font-bold uppercase tracking-wide text-white hover:bg-[#e85f00] focus-visible:ring-offset-white",
  marketingOutline:
    "rounded-full border-2 border-[#FF6A00] bg-transparent px-6 py-3 text-xs font-bold uppercase tracking-wide text-[#FF6A00] hover:bg-[#FF6A00]/5 focus-visible:ring-offset-white",
};

type ButtonProps = {
  variant?: keyof typeof variants;
  className?: string;
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

export function Button({
  variant = "primary",
  className,
  children,
  href,
  type = "button",
  disabled,
  onClick,
}: ButtonProps) {
  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
