import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { getPublishedTeam } from "@/lib/site-data";
import type { TeamListItem } from "@/types/content";

export const metadata = { title: "Our Team" };

export default async function TeamPage() {
  const team = await getPublishedTeam();

  return (
    <>
      <section className="pt-32 pb-16">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Leadership"
              title="Our team"
              subtitle="Meet the coaches and staff behind D1 Nation — profiles appear here when published."
              align="center"
            />
          </Reveal>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          {team.length ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member: TeamListItem, i: number) => (
                <Reveal key={member._id} delay={i * 0.06}>
                  <Link
                    href={`/team/${member.slug}`}
                    className="group block overflow-hidden rounded-2xl border border-white/10 bg-d1-charcoal-soft"
                  >
                    <div className="relative aspect-[4/5] bg-white/5">
                      {member.photoUrl ? (
                        <Image src={member.photoUrl} alt="" fill className="object-cover transition group-hover:scale-105" sizes="33vw" />
                      ) : (
                        <div className="flex h-full items-end p-6 font-display text-6xl text-d1-orange/20">
                          {member.name.charAt(0)}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-d1-charcoal via-transparent to-transparent" />
                      <div className="absolute bottom-0 p-6">
                        <h2 className="font-display text-3xl text-d1-off-white">{member.name}</h2>
                        <p className="text-sm text-d1-orange">{member.role}</p>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-white/15 p-12 text-center">
                <h2 className="font-display text-3xl">Team profiles coming soon</h2>
                <p className="mt-3 text-sm text-d1-muted">
                  Coach and staff bios will be posted here as they are finalized.
                </p>
              </div>
            </Reveal>
          )}
        </Container>
      </section>
    </>
  );
}
