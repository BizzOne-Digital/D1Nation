import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { getPublishedProducts } from "@/lib/site-data";

export const metadata = { title: "Shop" };

export default async function ShopPage() {
  const products = await getPublishedProducts();

  return (
    <>
      <section className="pt-32 pb-12">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Shop"
              title="D1 Nation gear & essentials"
              subtitle="Browse our catalog and submit an inquiry — online checkout is not enabled unless configured later."
            />
          </Reveal>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          {products.length ? (
            <Reveal>
              <ProductGrid products={products} />
            </Reveal>
          ) : (
            <Reveal>
              <div className="mx-auto max-w-2xl rounded-2xl border border-dashed border-white/20 bg-gradient-to-b from-d1-orange/10 to-transparent p-12 text-center">
                <h2 className="font-display text-4xl text-d1-off-white">Products coming soon</h2>
                <p className="mt-4 text-sm text-d1-muted">
                  Our team is preparing the D1 Nation shop. Add products in the admin portal when you&apos;re
                  ready to launch.
                </p>
                <Button href="/contact" variant="secondary" className="mt-8">Ask About Merch</Button>
              </div>
            </Reveal>
          )}
        </Container>
      </section>
    </>
  );
}
