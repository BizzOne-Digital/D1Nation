import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { BrandMark } from "@/components/brand/BrandMark";
import { Container } from "@/components/ui/Container";

type FooterProps = {
  logoUrl?: string;
  email: string;
  phone: string;
  social: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    twitter?: string;
  };
};

const programs = [
  { href: "/services#academy", label: "Academy" },
  { href: "/services#teams", label: "Teams" },
  { href: "/services#recruiting-coordination", label: "Recruiting" },
  { href: "/services#nil-opportunities", label: "NIL" },
];

const company = [
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/blog", label: "Blog" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/shop", label: "Shop" },
  { href: "/pricing", label: "Pricing" },
];

const quick = [
  { href: "/contact", label: "Contact" },
  { href: "/services", label: "All Services" },
];

function SocialIcon({
  href,
  label,
  children,
}: {
  href?: string;
  label: string;
  children: ReactNode;
}) {
  const base =
    "flex h-10 w-10 items-center justify-center rounded-full border transition-colors";
  if (!href) {
    return (
      <span
        className={`${base} border-white/10 bg-white/5 text-d1-muted/40`}
        title={`${label} — link coming soon`}
        aria-hidden
      >
        {children}
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} border-white/15 bg-white/5 text-d1-off-white hover:border-d1-orange hover:bg-d1-orange/15 hover:text-d1-orange`}
      aria-label={label}
    >
      {children}
    </a>
  );
}

export function Footer({ logoUrl, email, phone, social }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto w-full max-w-full overflow-x-clip overflow-y-visible bg-black">
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-d1-orange/80 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 top-0 h-64 w-64 rounded-full bg-d1-orange/10 blur-3xl"
        aria-hidden
      />

      {/* CTA band */}
      <div className="relative border-b border-white/10 bg-gradient-to-br from-d1-orange/[0.12] via-black to-black">
        <Container className="flex min-w-0 flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center">
          <div className="min-w-0 w-full">
            <p className="font-hero text-2xl font-semibold uppercase tracking-wide text-white md:text-3xl">
              Start your athlete&apos;s journey
            </p>
            <p className="mt-2 max-w-md text-sm text-d1-muted">
              Connect with our team about academy training, teams, recruiting guidance, and NIL education.
            </p>
          </div>
          <Link
            href="/contact"
            className="group inline-flex w-full shrink-0 items-center justify-center gap-2 bg-gradient-to-r from-[#ff7a1a] to-[#ff9a3d] px-7 py-3.5 font-hero text-xs font-semibold uppercase tracking-[0.14em] text-black transition hover:brightness-105 sm:w-auto"
          >
            Get in touch
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Container>
      </div>

      <Container className="relative min-w-0 py-14 lg:py-16">
        <div className="grid min-w-0 gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="min-w-0 lg:col-span-4">
            <BrandMark logoUrl={logoUrl} size="md" variant="header" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-d1-muted">
              A complete sports system for today&apos;s athletes and families — built for development,
              competition, and clarity at every step.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <SocialIcon href={social.instagram} label="Instagram">
                <InstagramGlyph />
              </SocialIcon>
              <SocialIcon href={social.facebook} label="Facebook">
                <FacebookGlyph />
              </SocialIcon>
              <SocialIcon href={social.tiktok} label="TikTok">
                <TikTokGlyph />
              </SocialIcon>
              <SocialIcon href={social.twitter} label="X">
                <XGlyph />
              </SocialIcon>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
            <div>
              <h3 className="font-hero text-sm font-semibold uppercase tracking-[0.2em] text-d1-orange">
                Programs
              </h3>
              <ul className="mt-4 space-y-2.5">
                {programs.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-d1-off-white/75 transition hover:text-d1-orange hover:pl-0.5"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-hero text-sm font-semibold uppercase tracking-[0.2em] text-d1-orange">
                Company
              </h3>
              <ul className="mt-4 space-y-2.5">
                {company.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-d1-off-white/75 transition hover:text-d1-orange hover:pl-0.5"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-hero text-sm font-semibold uppercase tracking-[0.2em] text-d1-orange">
                Connect
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="group flex items-start gap-3 text-sm text-d1-off-white/80 hover:text-d1-orange"
                  >
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-d1-orange group-hover:border-d1-orange/40">
                      <Mail size={15} />
                    </span>
                    <span className="break-all pt-1 [overflow-wrap:anywhere]">{email}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${phone.replace(/\D/g, "")}`}
                    className="group flex items-center gap-3 text-sm text-d1-off-white/80 hover:text-d1-orange"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-d1-orange group-hover:border-d1-orange/40">
                      <Phone size={15} />
                    </span>
                    {phone}
                  </a>
                </li>
                {quick.map((l) => (
                  <li key={l.href} className="pl-11 sm:pl-0 sm:hidden">
                    <Link href={l.href} className="text-sm text-d1-muted hover:text-d1-orange">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-5 hidden sm:flex flex-wrap gap-3">
                {quick.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="text-xs font-medium uppercase tracking-wider text-d1-muted hover:text-d1-orange"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10 bg-black/80">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-d1-muted">
            © {year} D1 Nation. All rights reserved.
          </p>
          <p className="font-hero text-[10px] uppercase tracking-[0.25em] text-d1-muted/80">
            Train · Compete · Elevate
          </p>
        </Container>
      </div>
    </footer>
  );
}

function InstagramGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function TikTokGlyph() {
  return (
    <svg width="16" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
    </svg>
  );
}

function XGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
