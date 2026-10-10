import Image from "next/image";
import { notFound } from "next/navigation";
import { MarketingInnerShell } from "@/components/marketing/MarketingInnerShell";
import { resolvePublicImageUrl, shouldUnoptimizeImageSrc } from "@/lib/image-url";
import { MARKETING_HEROES } from "@/lib/marketing-heroes";
import { marketingSocial } from "@/lib/marketing-social";
import { getSiteSettings, getTeamMemberBySlug } from "@/lib/site-data";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const member = await getTeamMemberBySlug(slug);
  if (!member) return { title: "Team" };
  return { title: member.name, description: member.role };
}

export default async function TeamMemberPage({ params }: Props) {
  const { slug } = await params;
  const [settings, member] = await Promise.all([getSiteSettings(), getTeamMemberBySlug(slug)]);
  if (!member) notFound();

  const hero = member.photoUrl
    ? resolvePublicImageUrl(member.photoUrl, MARKETING_HEROES.member)
    : MARKETING_HEROES.member;

  return (
    <MarketingInnerShell
      eyebrow="Our Team"
      title={member.name}
      subtitle={member.role}
      heroImage={hero}
      social={marketingSocial(settings)}
    >
      <div className="grid gap-12 lg:grid-cols-[280px_1fr]">
        <div className="relative aspect-square overflow-hidden border border-neutral-200 lg:aspect-auto lg:min-h-[320px]">
          {member.photoUrl ? (
            <Image
              src={resolvePublicImageUrl(member.photoUrl, MARKETING_HEROES.member)}
              alt=""
              fill
              unoptimized={shouldUnoptimizeImageSrc(member.photoUrl)}
              className="object-cover"
              sizes="280px"
              priority
            />
          ) : (
            <Image src={MARKETING_HEROES.member} alt="" fill className="object-cover" sizes="280px" priority />
          )}
        </div>
        <div className="prose-marketing whitespace-pre-line">{member.bio || "Bio coming soon."}</div>
      </div>
    </MarketingInnerShell>
  );
}
