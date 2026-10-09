import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MarketingInnerShell } from "@/components/marketing/MarketingInnerShell";
import { HOME_IMAGES } from "@/lib/home-images";
import { marketingSocial } from "@/lib/marketing-social";
import { getSiteSettings } from "@/lib/site-data";

export const metadata = { title: "Programs" };

const programLinks = [
  { href: "/academy", title: "Academy", copy: "Year-round training and development." },
  { href: "/teams", title: "Teams", copy: "Competitive club teams and culture." },
  { href: "/camps", title: "Camps", copy: "Seasonal camps and clinics." },
  { href: "/uniforms", title: "Uniforms", copy: "Team kits and custom gear." },
  { href: "/services", title: "Recruiting Coordination", copy: "College pathway support." },
  { href: "/nil-opportunities", title: "NIL", copy: "Name, Image, Likeness education." },
  { href: "/social-media-management", title: "Social Media Management", copy: "Brand-safe storytelling online." },
  { href: "/payment-gateways", title: "Payment Gateways", copy: "Secure payments for families." },
  { href: "/sponsors", title: "Sponsors", copy: "Partners including D1 Nation Custom Clothing." },
];

export default async function ProgramsHubPage() {
  const settings = await getSiteSettings();

  return (
    <MarketingInnerShell
      eyebrow="Programs"
      title="Everything under one roof."
      subtitle="Explore each pathway — from academy and teams to NIL, payments, and partners."
      heroImage={HOME_IMAGES.program01}
      social={marketingSocial(settings)}
    >
      <div className="grid min-w-0 gap-4 sm:grid-cols-2">
        {programLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex flex-col border border-neutral-200 bg-neutral-50 p-6 transition hover:border-[#FF6A00]/40 hover:shadow-sm"
          >
            <h2 className="text-lg font-extrabold text-neutral-900 group-hover:text-[#FF6A00]">{item.title}</h2>
            <p className="mt-2 flex-1 text-sm text-neutral-600">{item.copy}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-[#FF6A00]">
              Learn more
              <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </MarketingInnerShell>
  );
}
