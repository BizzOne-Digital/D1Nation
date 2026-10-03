import { Button } from "@/components/ui/Button";
import { MarketingInnerShell } from "@/components/marketing/MarketingInnerShell";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { MARKETING_HEROES } from "@/lib/marketing-heroes";
import { marketingSocial } from "@/lib/marketing-social";
import { getPublishedProducts, getSiteSettings } from "@/lib/site-data";

export const metadata = { title: "Shop" };

export default async function ShopPage() {
  const [settings, products] = await Promise.all([getSiteSettings(), getPublishedProducts()]);

  return (
    <MarketingInnerShell
      eyebrow="Shop"
      title="D1 Nation Gear & Essentials"
      subtitle="Browse our catalog and submit an inquiry — online checkout is not enabled unless configured later."
      heroImage={MARKETING_HEROES.shop}
      social={marketingSocial(settings)}
    >
      {products.length ? (
        <ProductGrid products={products} theme="marketing" />
      ) : (
        <div className="mx-auto max-w-2xl border border-dashed border-neutral-300 bg-neutral-50 p-12 text-center">
          <h2 className="text-3xl font-extrabold">Products coming soon</h2>
          <p className="mt-4 text-sm text-neutral-600">Our team is preparing the D1 Nation shop. Check back soon.</p>
          <Button href="/contact" variant="marketingOutline" className="mt-8">Ask About Merch</Button>
        </div>
      )}
    </MarketingInnerShell>
  );
}
