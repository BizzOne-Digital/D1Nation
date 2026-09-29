import { cn } from "@/lib/cn";

export function Container({
  className,
  children,
  as: Tag = "div",
  id,
}: {
  className?: string;
  children: React.ReactNode;
  as?: "div" | "section" | "header" | "footer";
  id?: string;
}) {
  return (
    <Tag
      id={id}
      className={cn(
        "mx-auto box-border w-full min-w-0 max-w-7xl px-4 sm:px-6 lg:px-8",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
