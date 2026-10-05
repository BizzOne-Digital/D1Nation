import { MarketingInnerShell } from "@/components/marketing/MarketingInnerShell";
import { MARKETING_HEROES } from "@/lib/marketing-heroes";
import { marketingSocial } from "@/lib/marketing-social";
import { getSiteSettings } from "@/lib/site-data";

export const metadata = { title: "Terms of Service" };

export default async function TermsPage() {
  const settings = await getSiteSettings();

  return (
    <MarketingInnerShell
      eyebrow="Legal"
      title="Terms of Service"
      subtitle="Participation, payments, and use of D1 Nation programs and this website."
      heroImage={MARKETING_HEROES.article}
      social={marketingSocial(settings)}
    >
      <div className="prose-marketing max-w-2xl space-y-4 text-sm leading-relaxed text-neutral-600">
        <p>
          By using this site or enrolling in programs, you agree to follow club policies, codes of conduct, and payment
          terms communicated during registration. Program fees, camps, and merchandise are subject to the pricing and
          refund rules provided at signup.
        </p>
        <p>
          Athletic participation involves inherent risk. Families are responsible for accurate athlete information and
          timely communication with staff.
        </p>
        <p>
          Questions about these terms:{" "}
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
