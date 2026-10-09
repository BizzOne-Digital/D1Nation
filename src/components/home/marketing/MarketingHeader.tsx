"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, Search, ShoppingBag, X } from "lucide-react";
import { BrandLogo } from "@/components/marketing/BrandLogo";
import { cn } from "@/lib/cn";

const defaultNav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/camps", label: "Camps" },
  { href: "/nil-opportunities", label: "NIL" },
  { href: "/blog", label: "Blog" },
  { href: "/shop", label: "Shop" },
  { href: "/alumni", label: "Alumni" },
  { href: "/contact", label: "Contact" },
];

const servicesNav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/programs", label: "Programs" },
  { href: "/camps", label: "Camps" },
  { href: "/nil-opportunities", label: "NIL" },
  { href: "/blog", label: "Resources" },
  { href: "/shop", label: "Shop" },
  { href: "/alumni", label: "Alumni" },
  { href: "/contact", label: "Contact" },
];

const nilNav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/programs", label: "Programs" },
  { href: "/camps", label: "Camps" },
  { href: "/nil-opportunities", label: "NIL" },
  { href: "/blog", label: "Blog" },
  { href: "/shop", label: "Shop" },
  { href: "/alumni", label: "Alumni" },
  { href: "/contact", label: "Contact" },
];

function isNavActive(
  pathname: string,
  item: { href: string; label: string },
  variant: "default" | "services" | "nil",
) {
  if (item.label === "Home") return pathname === "/";
  if (item.label === "About") return pathname === "/about";
  if (item.label === "Services") return pathname === "/services";
  if (item.label === "Programs") {
    const programRoots = [
      "/programs",
      "/academy",
      "/teams",
      "/camps",
      "/uniforms",
      "/services",
      "/nil-opportunities",
      "/social-media-management",
      "/payment-gateways",
      "/sponsors",
    ];
    return programRoots.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  }
  if (item.label === "Camps") return pathname === "/camps" || pathname.startsWith("/camps/");
  if (item.label === "Alumni") return pathname === "/alumni" || pathname.startsWith("/testimonials");
  if (item.label === "NIL" || item.label === "NIL Opportunities") return pathname === "/nil-opportunities";
  if (item.label === "Blog" && variant === "nil") return pathname.startsWith("/blog");
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

type NavItem = { href: string; label: string };

function MobileNavSheet({
  nav,
  pathname,
  variant,
}: {
  nav: NavItem[];
  pathname: string;
  variant: "default" | "services" | "nil";
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <Link
        href="/contact"
        className="inline-flex min-h-[40px] items-center rounded-full bg-[#FF6600] px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-white md:hidden"
      >
        Start
      </Link>
      <button
        type="button"
        className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center text-neutral-800 lg:hidden"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div
            className="fixed inset-x-0 bottom-0 z-[60] flex max-h-[min(92dvh,640px)] flex-col rounded-t-2xl border-t border-neutral-200 bg-white shadow-2xl lg:hidden"
            style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom, 0px))" }}
          >
            <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-3">
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">Menu</p>
              <button
                type="button"
                className="tap-target inline-flex items-center justify-center p-2 text-neutral-600"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto overscroll-contain px-2 py-2" aria-label="Mobile">
              {nav.map((item) => {
                const active = isNavActive(pathname, item, variant);
                return (
                  <Link
                    key={`m-${item.href}-${item.label}`}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex min-h-[48px] items-center rounded-lg px-4 text-[15px] font-medium text-neutral-800 active:bg-neutral-100",
                      active && "bg-[#FF6600]/10 text-[#FF6600]",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="border-t border-neutral-100 px-4 pt-3">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#FF6600] text-xs font-bold uppercase tracking-wide text-white"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export function MarketingHeader({ variant = "default" }: { variant?: "default" | "services" | "nil" }) {
  const nav = variant === "services" ? servicesNav : variant === "nil" ? nilNav : defaultNav;
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full max-w-[100vw] border-b border-neutral-200/80 bg-white/95 backdrop-blur-md transition-shadow",
        scrolled && "shadow-sm",
      )}
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <div className="safe-px mx-auto flex min-h-[4.25rem] max-w-[1280px] items-center justify-between gap-1.5 py-2 sm:min-h-[5.75rem] sm:gap-4 sm:px-6 sm:py-2.5 lg:px-8">
        <BrandLogo className="min-w-0" size="2x" priority />

        <nav className="hidden items-center gap-4 xl:gap-6 lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = isNavActive(pathname, item, variant);
            return (
              <Link
                key={`${item.href}-${item.label}`}
                href={item.href}
                className={cn(
                  "text-[13px] font-medium text-neutral-700 transition hover:text-neutral-900",
                  active && "text-[#FF6600]",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-3">
          <Link href="/shop" className="hidden p-2 text-neutral-700 hover:text-neutral-900 md:inline-flex" aria-label="Search">
            <Search className="h-5 w-5" strokeWidth={1.75} />
          </Link>
          <Link href="/shop" className="hidden p-2 text-neutral-700 hover:text-neutral-900 md:inline-flex" aria-label="Cart">
            <ShoppingBag className="h-5 w-5" strokeWidth={1.75} />
          </Link>
          <Link
            href="/contact"
            className="cta-glow hidden items-center gap-2 rounded-full bg-[#FF6600] px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-white transition hover:scale-[1.02] hover:bg-[#e85c00] md:inline-flex"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Link>
          <MobileNavSheet key={pathname} nav={nav} pathname={pathname} variant={variant} />
        </div>
      </div>
    </header>
  );
}
