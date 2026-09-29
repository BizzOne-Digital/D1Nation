import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { getPublishedPosts } from "@/lib/site-data";
import type { BlogListItem } from "@/types/content";

export const metadata = { title: "Blog" };

export default async function BlogPage() {
  const posts = await getPublishedPosts();
  const categories = Array.from(new Set(posts.map((p: BlogListItem) => p.category).filter(Boolean)));

  return (
    <>
      <section className="pt-32 pb-12">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Insights"
              title="The D1 Nation journal"
              subtitle="Training notes, family resources, and club updates."
              align="center"
            />
          </Reveal>
          {categories.length > 1 && (
            <p className="mt-6 text-center text-xs uppercase tracking-widest text-d1-muted">
              Categories: {categories.join(" · ")}
            </p>
          )}
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          {posts.length ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post: BlogListItem, i: number) => (
                <Reveal key={post._id} delay={i * 0.05}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-d1-charcoal-soft">
                    <div className="relative aspect-[16/10] bg-white/5">
                      {post.coverImageUrl ? (
                        <Image src={post.coverImageUrl} alt="" fill className="object-cover transition group-hover:scale-105" sizes="33vw" />
                      ) : null}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-[10px] uppercase tracking-widest text-d1-orange">{post.category}</p>
                      <h2 className="mt-2 font-display text-2xl text-d1-off-white group-hover:text-d1-orange transition">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h2>
                      <p className="mt-3 flex-1 text-sm text-d1-muted line-clamp-3">{post.excerpt}</p>
                      <Link href={`/blog/${post.slug}`} className="mt-4 text-sm font-semibold text-d1-orange">
                        Read article →
                      </Link>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-white/15 p-12 text-center">
                <h2 className="font-display text-3xl">Articles on deck</h2>
                <p className="mt-3 text-sm text-d1-muted">
                  Publish your first post from the admin portal to populate this page.
                </p>
              </div>
            </Reveal>
          )}
        </Container>
      </section>
    </>
  );
}
