import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { MarketingInnerShell } from "@/components/marketing/MarketingInnerShell";
import { resolvePublicImageUrl, shouldUnoptimizeImageSrc } from "@/lib/image-url";
import { MARKETING_HEROES } from "@/lib/marketing-heroes";
import { marketingSocial } from "@/lib/marketing-social";
import { getPublishedTestimonials, getSiteSettings } from "@/lib/site-data";
import type { TestimonialItem } from "@/types/content";

export const metadata = { title: "Alumni & Stories" };

export default async function TestimonialsPage() {
  const [settings, testimonials] = await Promise.all([getPublishedTestimonials(), getSiteSettings()]);

  return (
    <MarketingInnerShell
      eyebrow="Alumni"
      title="Stories From Our Community"
      subtitle="Hear from parents and athletes in the D1 Nation family."
      heroImage={MARKETING_HEROES.testimonials}
      social={marketingSocial(settings)}
      align="center"
    >
      {testimonials.length ? (
        <div className="grid gap-8 md:grid-cols-2">
          {testimonials.map((t: TestimonialItem) => (
            <article key={t._id} className="flex h-full flex-col border border-neutral-200 bg-neutral-50 p-8">
              {t.photoUrl ? (
                <div className="relative mb-6 h-16 w-16 overflow-hidden rounded-full border-2 border-[#FF6A00]/40">
                  <Image
                    src={resolvePublicImageUrl(t.photoUrl, MARKETING_HEROES.testimonials)}
                    alt=""
                    fill
                    unoptimized={shouldUnoptimizeImageSrc(t.photoUrl)}
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
              ) : (
                <div className="relative mb-6 h-16 w-16 overflow-hidden rounded-full border-2 border-[#FF6A00]/40">
                  <Image src={MARKETING_HEROES.testimonials} alt="" fill className="object-cover" sizes="64px" />
                </div>
              )}
              <blockquote className="flex-1 text-lg leading-relaxed text-neutral-800">&ldquo;{t.quote}&rdquo;</blockquote>
              {(t.name || t.role || t.context) && (
                <footer className="mt-6 border-t border-neutral-200 pt-4 text-sm text-neutral-500">
                  {t.name && <span className="font-bold text-neutral-900">{t.name}</span>}
                  {t.role && <span> · {t.role}</span>}
                  {t.context && <p className="mt-1 text-xs">{t.context}</p>}
                </footer>
              )}
            </article>
          ))}
        </div>
      ) : (
        <div className="mx-auto max-w-2xl border border-dashed border-neutral-300 p-12 text-center">
          <h2 className="text-2xl font-extrabold">Stories coming soon</h2>
          <p className="mt-4 text-sm text-neutral-600">
            We&apos;re collecting testimonials from D1 Nation families. Share your experience with our team.
          </p>
          <Button href="/contact" variant="marketing" className="mt-8">Get in Touch</Button>
        </div>
      )}
    </MarketingInnerShell>
  );
}
