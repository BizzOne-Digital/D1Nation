import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl min-w-0 w-full break-words",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-d1-orange">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-[clamp(1.75rem,7vw,3.75rem)] leading-[1.05] text-balance text-d1-off-white">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-d1-muted sm:text-lg">{subtitle}</p>
      )}
    </div>
  );
}
