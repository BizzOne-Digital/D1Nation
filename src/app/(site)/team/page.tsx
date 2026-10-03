import Image from "next/image";
import Link from "next/link";
import { MarketingInnerShell } from "@/components/marketing/MarketingInnerShell";
import { MARKETING_HEROES } from "@/lib/marketing-heroes";
import { marketingSocial } from "@/lib/marketing-social";
import { getPublishedTeam, getSiteSettings } from "@/lib/site-data";
import type { TeamListItem } from "@/types/content";

export const metadata = { title: "Our Team" };

export default async function TeamPage() {
  const [settings, team] = await Promise.all([getSiteSettings(), getPublishedTeam()]);

  return (
    <MarketingInnerShell
      eyebrow="Leadership"
      title="Our Team"
      subtitle="Meet the coaches and staff behind D1 Nation."
      heroImage={MARKETING_HEROES.team}
      social={marketingSocial(settings)}
      align="center"
    >
      {team.length ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member: TeamListItem) => (
            <Link
              key={member._id}
              href={`/team/${member.slug}`}
              className="group block overflow-hidden border border-neutral-200 bg-white shadow-sm"
            >
              <div className="relative aspect-[4/5] bg-neutral-100">
                {member.photoUrl ? (
                  <Image
                    src={member.photoUrl}
                    alt=""
                    fill
                    className="object-cover transition group-hover:scale-105"
                    sizes="33vw"
                  />
                ) : (
                  <Image src={MARKETING_HEROES.member} alt="" fill className="object-cover" sizes="33vw" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute bottom-0 p-6">
                  <h2 className="text-2xl font-extrabold text-white">{member.name}</h2>
                  <p className="text-sm font-semibold text-[#FF6A00]">{member.role}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mx-auto max-w-xl border border-dashed border-neutral-300 p-12 text-center">
          <h2 className="text-2xl font-extrabold">Team profiles coming soon</h2>
          <p className="mt-3 text-sm text-neutral-600">Coach and staff bios will be posted here as they are finalized.</p>
        </div>
      )}
    </MarketingInnerShell>
  );
}
