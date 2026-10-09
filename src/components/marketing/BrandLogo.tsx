import Image from "next/image";
import Link from "next/link";
import { BRAND_LOGO_PATH } from "@/lib/brand";
import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ className, priority }: Props) {
  return (
    <Link href="/" className={cn("inline-flex min-w-0 max-w-[46vw] shrink items-center sm:max-w-none", className)}>
      <Image
        src={BRAND_LOGO_PATH}
        alt="D1 Nation"
        width={180}
        height={48}
        priority={priority}
        className="h-7 w-auto max-w-full object-contain object-left sm:h-10"
      />
    </Link>
  );
}
