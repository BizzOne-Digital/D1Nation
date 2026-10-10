import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { MarketingInnerShell } from "@/components/marketing/MarketingInnerShell";
import { formatPublicPrice } from "@/lib/pricing";
import { resolvePublicImageUrl, shouldUnoptimizeImageSrc } from "@/lib/image-url";
import { MARKETING_HEROES } from "@/lib/marketing-heroes";
import { marketingSocial } from "@/lib/marketing-social";
import { getProductBySlug, getSiteSettings } from "@/lib/site-data";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product" };
  return { title: product.name, description: product.description };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const [settings, product] = await Promise.all([getSiteSettings(), getProductBySlug(slug)]);
  if (!product) notFound();

  const mainImage = product.images?.[0]?.url
    ? resolvePublicImageUrl(product.images[0].url, MARKETING_HEROES.product)
    : MARKETING_HEROES.product;

  return (
    <MarketingInnerShell
      eyebrow={product.category || "Shop"}
      title={product.name}
      subtitle={formatPublicPrice(product.internalPrice, product.showPublicPrice)}
      heroImage={mainImage}
      social={marketingSocial(settings)}
    >
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden border border-neutral-200 bg-neutral-50">
          <Image
            src={mainImage}
            alt={product.images?.[0]?.alt || product.name}
            fill
            unoptimized={shouldUnoptimizeImageSrc(mainImage)}
            className="object-cover"
            sizes="50vw"
            priority
          />
        </div>
        <div>
          <p className="text-sm text-neutral-600">
            {product.available ? "Available for inquiry" : "Currently unavailable"}
            {product.inventoryNote ? ` · ${product.inventoryNote}` : ""}
          </p>
          <p className="mt-6 whitespace-pre-line leading-relaxed text-neutral-600">{product.description}</p>
          <p className="mt-4 text-xs text-neutral-500">
            Purchases are handled via inquiry — no online checkout on this site.
          </p>
          <Button href={`/contact?product=${encodeURIComponent(product.name)}`} variant="marketing" className="mt-8">
            Inquire About This Product
          </Button>
        </div>
      </div>
    </MarketingInnerShell>
  );
}
