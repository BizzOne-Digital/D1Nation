import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactMap } from "@/components/contact/ContactMap";
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
  return {
    display: ["Austin, Texas"],
    mapQuery: "Austin, Texas",
  };
}

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const location = buildLocationLabel(settings);

  return (
    <>
      <section className="pt-32 pb-16">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Contact"
              title="Let's talk about your athlete"
              subtitle="Share a few details and our team will follow up. We respond to every serious inquiry."
            />
          </Reveal>
        </Container>
      </section>

      <section className="pb-24">
        <Container className="grid gap-12 lg:grid-cols-5">
          <Reveal className="min-w-0 space-y-8 lg:col-span-2">
            <div className="rounded-2xl border border-white/10 bg-d1-charcoal-soft p-6">
              <h2 className="font-hero text-xl font-semibold uppercase tracking-wide text-d1-off-white">
                Direct line
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-d1-muted">
                <li>
                  <span className="block text-xs uppercase tracking-wider text-d1-orange">Email</span>
                  <a href={`mailto:${settings.email}`} className="hover:text-d1-off-white">
                    {settings.email}
                  </a>
                </li>
                <li>
                  <span className="block text-xs uppercase tracking-wider text-d1-orange">Phone</span>
                  <a href={`tel:${settings.phone.replace(/\D/g, "")}`} className="hover:text-d1-off-white">
                    {settings.phone}
                  </a>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-d1-charcoal-soft p-6">
              <h2 className="font-hero text-xl font-semibold uppercase tracking-wide text-d1-off-white">
                Location
              </h2>
              <address className="mt-4 not-italic text-sm leading-relaxed text-d1-muted">
                {location.display.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <ContactMap mapQuery={location.mapQuery} />
            </div>

            <div className="rounded-2xl border border-white/10 bg-d1-charcoal-soft p-6">
              <h2 className="font-hero text-xl font-semibold uppercase tracking-wide text-d1-off-white">
                Social
              </h2>
              <ul className="mt-4 space-y-3">
                {SOCIAL_PLACEHOLDERS.map((item) => (
                  <li key={item.platform}>
                    <Link
                      href="/contact"
                      className="group flex items-center justify-between gap-3 text-sm transition"
                    >
                      <span className="text-d1-muted group-hover:text-d1-off-white">{item.platform}</span>
                      <span className="font-medium text-d1-orange group-hover:text-d1-orange-bright">
                        {item.handle}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="min-w-0 lg:col-span-3">
            <div className="min-w-0 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur sm:p-6 md:p-8">
              <ContactForm />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
