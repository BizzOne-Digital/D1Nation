import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { getPostBySlug } from "@/lib/site-data";

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
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="pt-32 pb-24">
      <Container className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.25em] text-d1-orange">{post.category}</p>
        <h1 className="mt-4 font-display text-5xl leading-tight text-d1-off-white md:text-6xl">
          {post.title}
        </h1>
        {post.publishedAt && (
          <time className="mt-4 block text-sm text-d1-muted" dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </time>
        )}
        {post.coverImageUrl && (
          <div className="relative mt-10 aspect-[21/9] overflow-hidden rounded-2xl border border-white/10">
            <Image src={post.coverImageUrl} alt="" fill className="object-cover" sizes="800px" priority />
          </div>
        )}
        <div className="prose-d1 mt-10 whitespace-pre-line text-base">{post.content}</div>
      </Container>
    </article>
  );
}
