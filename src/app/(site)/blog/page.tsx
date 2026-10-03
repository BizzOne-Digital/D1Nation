import Image from "next/image";
import Link from "next/link";
import { MarketingInnerShell } from "@/components/marketing/MarketingInnerShell";
import { MARKETING_HEROES } from "@/lib/marketing-heroes";
import { marketingSocial } from "@/lib/marketing-social";
import { getPublishedPosts, getSiteSettings } from "@/lib/site-data";
import type { BlogListItem } from "@/types/content";

export const metadata = { title: "Blog" };

export default async function BlogPage() {
  const [settings, posts] = await Promise.all([getSiteSettings(), getPublishedPosts()]);
  const categories = Array.from(new Set(posts.map((p: BlogListItem) => p.category).filter(Boolean)));

  return (
    <MarketingInnerShell
      eyebrow="Resources"
      title="The D1 Nation Journal"
      subtitle="Training notes, family resources, and club updates."
      heroImage={MARKETING_HEROES.blog}
      social={marketingSocial(settings)}
      align="center"
    >
      {categories.length > 1 && (
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-neutral-500">
          Categories: {categories.join(" · ")}
        </p>
      )}
      {posts.length ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: BlogListItem) => (
            <article key={post._id} className="group flex h-full flex-col overflow-hidden border border-neutral-200 bg-white shadow-sm">
              <div className="relative aspect-[16/10] bg-neutral-100">
                {post.coverImageUrl ? (
                  <Image
                    src={post.coverImageUrl}
                    alt=""
                    fill
                    className="object-cover transition group-hover:scale-105"
                    sizes="33vw"
                  />
                ) : (
                  <Image src={MARKETING_HEROES.article} alt="" fill className="object-cover opacity-90" sizes="33vw" />
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#FF6A00]">{post.category}</p>
                <h2 className="mt-2 text-xl font-bold text-neutral-900 transition group-hover:text-[#FF6A00]">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="mt-3 flex-1 line-clamp-3 text-sm text-neutral-600">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="mt-4 text-sm font-semibold text-[#FF6A00]">
                  Read article →
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mx-auto max-w-xl border border-dashed border-neutral-300 p-12 text-center">
          <h2 className="text-2xl font-extrabold">Articles on deck</h2>
          <p className="mt-3 text-sm text-neutral-600">New stories will appear here as they are published.</p>
        </div>
      )}
    </MarketingInnerShell>
  );
}
