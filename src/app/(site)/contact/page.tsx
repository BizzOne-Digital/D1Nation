import Link from "next/link";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactMap } from "@/components/contact/ContactMap";
import { MarketingInnerShell } from "@/components/marketing/MarketingInnerShell";
import { MARKETING_HEROES } from "@/lib/marketing-heroes";
import { marketingSocial } from "@/lib/marketing-social";
import { getSiteSettings } from "@/lib/site-data";

export const metadata = { title: "Contact" };

const SOCIAL_PLACEHOLDERS = [
  { platform: "Instagram", handle: "@instagram" },
  { platform: "Twitter", handle: "@twiter" },
  { platform: "Facebook", handle: "@facebook" },
  { platform: "TikTok", handle: "@tiktok" },
];

function buildLocationLabel(settings: {
  address?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  zip?: string;
}) {
  const lines: string[] = [];
  if (settings.address) lines.push(settings.address);
  if (settings.addressLine2) lines.push(settings.addressLine2);
  const cityLine = [settings.city, settings.state, settings.zip].filter(Boolean).join(", ");
  if (cityLine) lines.push(cityLine);
  if (lines.length) return { display: lines, mapQuery: lines.join(", ") };
  return { display: ["Austin, Texas"], mapQuery: "Austin, Texas" };
}

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const location = buildLocationLabel(settings);
  const social = marketingSocial(settings);

  return (
    <MarketingInnerShell
      eyebrow="Contact"
      title="Let's Talk About Your Athlete."
      subtitle="Share a few details and our team will follow up. We respond to every serious inquiry."
      heroImage={MARKETING_HEROES.contact}
      social={social}
    >
      <div className="grid min-w-0 gap-10 lg:grid-cols-5 lg:gap-12">
        <div className="min-w-0 space-y-6 lg:col-span-2">
          <div className="border border-neutral-200 bg-neutral-50 p-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900">Direct line</h2>
            <ul className="mt-4 space-y-3 text-sm text-neutral-600">
              <li>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#FF6A00]">Email</span>
                <a href={`mailto:${settings.email}`} className="hover:text-neutral-900">{settings.email}</a>
              </li>
              <li>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#FF6A00]">Phone</span>
                <a href={`tel:${settings.phone.replace(/\D/g, "")}`} className="hover:text-neutral-900">
                  {settings.phone}
                </a>
              </li>
            </ul>
          </div>
          <div className="border border-neutral-200 bg-neutral-50 p-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900">Location</h2>
            <address className="mt-4 not-italic text-sm leading-relaxed text-neutral-600">
              {location.display.map((line) => (
                <span key={line} className="block">{line}</span>
              ))}
            </address>
            <ContactMap mapQuery={location.mapQuery} />
          </div>
          <div className="border border-neutral-200 bg-neutral-50 p-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900">Social</h2>
            <ul className="mt-4 space-y-3">
              {SOCIAL_PLACEHOLDERS.map((item) => (
                <li key={item.platform}>
                  <Link href="/contact" className="group flex items-center justify-between gap-3 text-sm">
                    <span className="text-neutral-500 group-hover:text-neutral-800">{item.platform}</span>
                    <span className="font-semibold text-[#FF6A00]">{item.handle}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="min-w-0 border border-neutral-200 bg-white p-4 sm:p-6 md:p-8 lg:col-span-3">
          <ContactForm theme="marketing" />
        </div>
      </div>
    </MarketingInnerShell>
  );
}
