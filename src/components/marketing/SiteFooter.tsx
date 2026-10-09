import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrandLogo } from "@/components/marketing/BrandLogo";

const servicesLinks = [
  { href: "/academy", label: "Academy" },
  { href: "/teams", label: "Teams" },
  { href: "/camps", label: "Camps" },
  { href: "/uniforms", label: "Uniforms" },
  { href: "/services", label: "Recruiting" },
  { href: "/nil-opportunities", label: "NIL Opportunities" },
  { href: "/social-media-management", label: "Social Media" },
  { href: "/sponsors", label: "Sponsors" },
];

const resourceLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/blog", label: "Guides" },
  { href: "/pricing", label: "Programs & Camps" },
  { href: "/contact", label: "FAQ" },
  { href: "/social-media", label: "Social Media" },
  { href: "/payment-gateways", label: "Payments" },
];

const aboutLinks = [
  { href: "/about", label: "Our Story" },
  { href: "/team", label: "Our Team" },
  { href: "/alumni", label: "Alumni Stories" },
  { href: "/contact", label: "Contact" },
];

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/shop", label: "Shop" },
];

type Props = {
  social: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };
};

function SocialIcon({ name, className }: { name: "instagram" | "youtube" | "tiktok"; className?: string }) {
  if (name === "instagram") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (name === "youtube") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.28 5 12 5 12 5s-6.28 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.72 19 12 19 12 19s6.28 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15.5v-7l6 3.5-6 3.5z" />
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.75a8.18 8.18 0 0 0 4.78 1.52V6.84a4.85 4.85 0 0 1-1.01-.15z" />
    </svg>
  );
}

function FooterColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-900">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((item) => (
          <li key={`${item.href}-${item.label}`}>
            <Link
              href={item.href}
              className="text-sm text-neutral-600 transition hover:text-[#FF6A00] hover:pl-0.5"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter({ social }: Props) {
  const ig = social.instagram || "/contact";
  const yt = social.facebook || "/contact";
  const tt = social.tiktok || "/contact";

  return (
    <footer className="mt-auto border-t border-neutral-200 bg-neutral-50 font-[family-name:var(--font-marketing)] text-neutral-800">
      <div className="h-1 bg-gradient-to-r from-[#FF6A00] via-[#ff8c3a] to-[#FF6A00]" aria-hidden />

      <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="order-1 lg:col-span-4">
            <BrandLogo />
            <p className="mt-4 max-w-xs text-[11px] font-bold uppercase leading-relaxed tracking-[0.18em] text-neutral-500">
              Athletes • Families • Brighter Tomorrows
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-600">
              Training, teams, recruiting, and NIL education — one system built for stronger athletes and brighter futures.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                { href: ig, label: "Instagram", icon: "instagram" as const },
                { href: yt, label: "YouTube", icon: "youtube" as const },
                { href: tt, label: "TikTok", icon: "tiktok" as const },
              ].map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-sm transition hover:border-[#FF6A00] hover:text-[#FF6A00]"
                >
                  <SocialIcon name={s.icon} className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          <div className="order-3 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:order-2 lg:col-span-5 lg:gap-10">
            <FooterColumn title="Services" links={servicesLinks} />
            <FooterColumn title="Resources" links={resourceLinks} />
            <FooterColumn title="About" links={aboutLinks} />
          </div>

          <div className="order-2 flex flex-col justify-between gap-5 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6 lg:order-3 lg:col-span-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF6A00]">Ready to start?</p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                Tell us about your athlete. We&apos;ll help you find the right pathway.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FF6A00] px-5 py-3.5 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-[#e85f00]"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="flex flex-wrap gap-x-4 gap-y-1 border-t border-neutral-100 pt-4">
              {quickLinks.map((l) => (
                <Link key={l.href} href={l.href} className="text-xs font-medium text-neutral-500 hover:text-[#FF6A00]">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-4 py-6 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} D1 Nation. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2 sm:gap-6">
            <Link href="/privacy" className="transition hover:text-neutral-900">Privacy Policy</Link>
            <Link href="/terms" className="transition hover:text-neutral-900">Terms of Service</Link>
            <Link href="/contact" className="transition hover:text-neutral-900">Contact</Link>
            <Link href="/intro?replay=1" className="transition hover:text-neutral-900">Watch intro</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
