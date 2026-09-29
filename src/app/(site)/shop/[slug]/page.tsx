import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { formatPublicPrice } from "@/lib/pricing";
import { getProductBySlug } from "@/lib/site-data";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product" };
  return { title: product.name, description: product.description };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const mainImage = product.images?.[0]?.url;

  return (
    <section className="pt-32 pb-24">
      <Container className="grid gap-12 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          {mainImage ? (
            <Image src={mainImage} alt={product.images?.[0]?.alt || product.name} fill className="object-cover" sizes="50vw" priority />
          ) : (
            <div className="flex h-full items-center justify-center text-d1-muted">Image coming soon</div>
          )}
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-d1-orange">{product.category}</p>
          <h1 className="mt-2 font-display text-5xl text-d1-off-white">{product.name}</h1>
          <p className="mt-4 font-display text-3xl text-d1-orange">
            {formatPublicPrice(product.internalPrice, product.showPublicPrice)}
          </p>
          <p className="mt-2 text-sm text-d1-muted">
            {product.available ? "Available for inquiry" : "Currently unavailable"}
            {product.inventoryNote ? ` · ${product.inventoryNote}` : ""}
          </p>
          <p className="mt-6 whitespace-pre-line text-d1-muted leading-relaxed">{product.description}</p>
          <p className="mt-4 text-xs text-d1-muted">
            Purchases are handled via inquiry — no online checkout on this site.
          </p>
          <Button href={`/contact?product=${encodeURIComponent(product.name)}`} className="mt-8">
            Inquire About This Product
          </Button>
        </div>
      </Container>
    </section>
  );
}
