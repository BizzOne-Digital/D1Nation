import { MarketingInnerShell } from "@/components/marketing/MarketingInnerShell";
import { MARKETING_HEROES } from "@/lib/marketing-heroes";
import { marketingSocial } from "@/lib/marketing-social";
import { getSiteSettings } from "@/lib/site-data";

export const metadata = { title: "Privacy Policy" };

export default async function PrivacyPage() {
  const settings = await getSiteSettings();

  return (
    <MarketingInnerShell
      eyebrow="Legal"
      title="Privacy Policy"
      subtitle="How D1 Nation collects, uses, and protects your information."
      heroImage={MARKETING_HEROES.article}
      social={marketingSocial(settings)}
    >
      <div className="prose-marketing max-w-2xl space-y-4 text-sm leading-relaxed text-neutral-600">
        <p>
          We collect information you submit through contact forms, registrations, and shop checkout — including names,
          email, phone, athlete details, and messages — to respond to inquiries and deliver programs.
        </p>
        <p>
          We do not sell personal information. Data is stored securely and used only for D1 Nation operations,
          communication, and compliance. Admin access is restricted to authorized staff.
        </p>
        <p>
          You may request updates or deletion of your information by contacting us at{" "}
          <a href={`mailto:${settings.email}`} className="font-semibold text-[#FF6A00] hover:underline">
            {settings.email}
          </a>
          .
        </p>
        <p className="text-xs text-neutral-500">Last updated: {new Date().getFullYear()}. Replace with counsel-approved copy when ready.</p>
      </div>
    </MarketingInnerShell>
  );
}
