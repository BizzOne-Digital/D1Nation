"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { BrandMark } from "@/components/brand/BrandMark";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/pricing", label: "Pricing" },
  { href: "/shop", label: "Shop" },
  { href: "/blog", label: "Blog" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

export function Header({ logoUrl }: { logoUrl?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full max-w-full overflow-x-clip border-b transition-all duration-300",
        scrolled
          ? "border-white/10 bg-black/95 py-0 shadow-lg backdrop-blur-md"
          : "border-white/5 bg-black/85 py-0 backdrop-blur-sm",
      )}
    >
      <Container className="flex h-[4.25rem] min-w-0 items-center justify-between gap-2 sm:gap-3 lg:gap-6">
        <div className="min-w-0 shrink lg:flex-1">
          <BrandMark logoUrl={logoUrl} size="sm" variant="header" />
        </div>

        <nav
          className="hidden items-center justify-center gap-0.5 xl:flex lg:flex-1"
          aria-label="Main"
        >
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-2.5 py-4 text-[11px] font-medium tracking-wide transition-colors xl:px-3 xl:text-[13px]",
                  active ? "text-d1-orange" : "text-d1-off-white/90 hover:text-d1-off-white",
                )}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-2 left-2 right-2 h-0.5 bg-d1-orange xl:left-3 xl:right-3"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center justify-end gap-2 lg:flex-1">
          <Link
            href="/contact"
            className="hidden border border-d1-orange px-4 py-2 font-hero text-[10px] font-semibold uppercase tracking-[0.16em] text-d1-orange transition hover:bg-d1-orange/10 sm:inline-block xl:px-5 xl:text-[11px]"
          >
            Contact Us
          </Link>

          <button
            type="button"
            className="inline-flex items-center justify-center border border-white/20 p-2 text-d1-off-white xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={reduce ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/10 bg-black xl:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "border-l-2 px-3 py-3 text-sm font-semibold uppercase tracking-wider",
                    pathname === link.href
                      ? "border-d1-orange bg-d1-orange/10 text-d1-orange"
                      : "border-transparent text-d1-off-white/90",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 border border-d1-orange py-3 text-center text-xs font-bold uppercase tracking-widest text-d1-orange"
              >
                Contact Us
              </Link>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
