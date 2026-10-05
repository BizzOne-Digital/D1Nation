import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MarketingInnerShell } from "@/components/marketing/MarketingInnerShell";
import { NIL_IMAGES } from "@/lib/nil-images";
import { marketingSocial, resolveSocialHref } from "@/lib/marketing-social";
import { getSiteSettings } from "@/lib/site-data";

export const metadata = { title: "Social Media" };

export default async function SocialMediaPage() {
  const settings = await getSiteSettings();
  const social = marketingSocial(settings);

  const channels = [
    { name: "Instagram", key: "instagram" as const, href: resolveSocialHref("instagram", social.instagram) },
    { name: "Facebook", key: "facebook" as const, href: resolveSocialHref("facebook", social.facebook) },
    { name: "TikTok", key: "tiktok" as const, href: resolveSocialHref("tiktok", social.tiktok) },
  ];

  return (
    <MarketingInnerShell
      eyebrow="Connect"
      title="Follow D1 Nation"
      subtitle="Highlights, announcements, and behind-the-scenes from our community."
      heroImage={NIL_IMAGES.eduBrand}
      social={social}
      align="center"
    >
      <ul className="mx-auto flex max-w-md flex-col gap-3">
        {channels.map((ch) => (
          <li key={ch.name}>
            {ch.href ? (
              <a
                href={ch.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between border border-neutral-200 bg-white px-5 py-4 text-sm font-semibold text-neutral-900 hover:border-[#FF6A00]"
              >
                {ch.name}
                <ArrowRight className="h-4 w-4 text-[#FF6A00]" />
              </a>
            ) : (
              <span className="flex items-center justify-between border border-dashed border-neutral-200 px-5 py-4 text-sm text-neutral-500">
                {ch.name}
                <span className="text-xs">Add link in admin settings</span>
              </span>
            )}
          </li>
        ))}
      </ul>
      <p className="mx-auto mt-10 max-w-lg text-center text-sm text-neutral-600">
        Need help with content or NIL-safe posting?{" "}
        <Link href="/social-media-management" className="font-semibold text-[#FF6A00] hover:underline">
          Social Media Management
        </Link>
      </p>
    </MarketingInnerShell>
  );
}
