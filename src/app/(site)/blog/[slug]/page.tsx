import Image from "next/image";
import { notFound } from "next/navigation";
import { MarketingInnerShell } from "@/components/marketing/MarketingInnerShell";
import { resolvePublicImageUrl, shouldUnoptimizeImageSrc } from "@/lib/image-url";
import { MARKETING_HEROES } from "@/lib/marketing-heroes";
import { marketingSocial } from "@/lib/marketing-social";
import { getPostBySlug, getSiteSettings } from "@/lib/site-data";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Article" };
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [settings, post] = await Promise.all([getSiteSettings(), getPostBySlug(slug)]);
  if (!post) notFound();

  const hero = post.coverImageUrl
    ? resolvePublicImageUrl(post.coverImageUrl, MARKETING_HEROES.article)
    : MARKETING_HEROES.article;
  const coverSrc = post.coverImageUrl ? resolvePublicImageUrl(post.coverImageUrl, MARKETING_HEROES.article) : "";

  return (
    <MarketingInnerShell
      eyebrow={post.category || "Article"}
      title={post.title}
      heroImage={hero}
      social={marketingSocial(settings)}
    >
      {post.publishedAt && (
        <time className="mb-8 block text-sm text-neutral-500" dateTime={post.publishedAt}>
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </time>
      )}
      {coverSrc && (
        <div className="relative mb-10 aspect-[21/9] overflow-hidden border border-neutral-200">
          <Image
            src={coverSrc}
            alt=""
            fill
            unoptimized={shouldUnoptimizeImageSrc(coverSrc)}
            className="object-cover"
            sizes="800px"
            priority
          />
        </div>
      )}
      <div className="prose-marketing max-w-3xl whitespace-pre-line text-base">{post.content}</div>
    </MarketingInnerShell>
  );
}
