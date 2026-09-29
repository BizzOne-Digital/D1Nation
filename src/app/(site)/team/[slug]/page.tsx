import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { getTeamMemberBySlug } from "@/lib/site-data";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const member = await getTeamMemberBySlug(slug);
  if (!member) return { title: "Team" };
  return { title: member.name, description: member.role };
}

export default async function TeamMemberPage({ params }: Props) {
  const { slug } = await params;
  const member = await getTeamMemberBySlug(slug);
  if (!member) notFound();

  return (
    <section className="pt-32 pb-24">
      <Container className="grid gap-12 lg:grid-cols-[320px_1fr]">
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-white/5 lg:aspect-auto lg:min-h-[400px]">
          {member.photoUrl ? (
            <Image src={member.photoUrl} alt="" fill className="object-cover" sizes="320px" priority />
          ) : (
            <div className="flex h-full min-h-[320px] items-center justify-center font-display text-8xl text-d1-orange/30">
              {member.name.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-d1-orange">{member.role}</p>
          <h1 className="mt-2 font-display text-5xl text-d1-off-white">{member.name}</h1>
          <div className="prose-d1 mt-8 whitespace-pre-line">{member.bio || "Bio coming soon."}</div>
        </div>
      </Container>
    </section>
  );
}
