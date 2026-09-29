import { cn } from "@/lib/cn";

export function AdminField({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block space-y-1.5", className)}>
      <span className="text-xs font-medium uppercase tracking-wider text-d1-muted">{label}</span>
      {children}
    </label>
  );
}

export const adminInputClass =
  "w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-d1-off-white outline-none focus:border-d1-orange/50";
