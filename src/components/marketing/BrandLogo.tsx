import Image from "next/image";
import Link from "next/link";
import { BRAND_LOGO_PATH } from "@/lib/brand";
import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  priority?: boolean;
  /** Header uses 2× logo height; footer stays default. */
  size?: "default" | "2x";
};

const logoSizes = {
  default: {
    width: 180,
    height: 48,
    link: "max-w-[46vw] sm:max-w-none",
    img: "h-7 w-auto max-w-full object-contain object-left sm:h-10",
  },
  "2x": {
    width: 360,
    height: 96,
    link: "max-w-[min(78vw,360px)] sm:max-w-none",
    img: "h-14 w-auto max-w-full object-contain object-left sm:h-20",
  },
} as const;

export function BrandLogo({ className, priority, size = "default" }: Props) {
  const s = logoSizes[size];
  return (
    <Link href="/" className={cn("inline-flex min-w-0 shrink items-center", s.link, className)}>
      <Image
        src={BRAND_LOGO_PATH}
        alt="D1 Nation"
        width={s.width}
        height={s.height}
        priority={priority}
        className={s.img}
      />
    </Link>
  );
}
