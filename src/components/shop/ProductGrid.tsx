"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { formatPublicPrice } from "@/lib/pricing";
import { Search } from "lucide-react";

export type ProductListItem = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  category?: string;
  images?: { url: string; alt?: string }[];
  internalPrice?: number | null;
  showPublicPrice?: boolean;
  available?: boolean;
};

export function ProductGrid({ products, theme = "dark" }: { products: ProductListItem[]; theme?: "dark" | "marketing" }) {
  const marketing = theme === "marketing";
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category || "General"));
    return ["All", ...Array.from(set).sort()];
  }, [products]);

  const filtered = products.filter((p) => {
    const matchCat = category === "All" || p.category === category;
    const q = query.toLowerCase();
    const matchQuery =
      !q ||
      p.name.toLowerCase().includes(q) ||
      (p.description || "").toLowerCase().includes(q);
    return matchCat && matchQuery;
  });

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search
            className={`absolute left-3 top-1/2 -translate-y-1/2 ${marketing ? "text-neutral-400" : "text-d1-muted"}`}
            size={18}
          />
          <input
            type="search"
            placeholder="Search products…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={
              marketing
                ? "w-full rounded-lg border border-neutral-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-[#FF6A00]/50"
                : "w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm outline-none focus:border-d1-orange/50"
            }
            aria-label="Search products"
          />
        </div>
        <div className="-mx-1 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`shrink-0 rounded-full px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition ${
                category === c
                  ? marketing
                    ? "bg-[#FF6A00] text-white"
                    : "bg-d1-orange text-d1-charcoal"
                  : marketing
                    ? "border border-neutral-200 text-neutral-600 hover:border-[#FF6A00]/40"
                    : "border border-white/10 text-d1-muted hover:border-d1-orange/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => {
            const img = p.images?.[0]?.url;
            return (
              <Link
                key={p._id}
                href={`/shop/${p.slug}`}
                className={
                  marketing
                    ? "group overflow-hidden border border-neutral-200 bg-white shadow-sm transition hover:border-[#FF6A00]/40"
                    : "group overflow-hidden rounded-2xl border border-white/10 bg-d1-charcoal-soft transition hover:border-d1-orange/40"
                }
              >
                <div className="relative aspect-square bg-white/5">
                  {img ? (
                    <Image src={img} alt={p.images?.[0]?.alt || p.name} fill className="object-cover transition group-hover:scale-105" sizes="33vw" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-d1-muted">No image</div>
                  )}
                  {!p.available && (
                    <span className="absolute left-3 top-3 rounded-full bg-d1-charcoal/80 px-3 py-1 text-[10px] uppercase tracking-wider text-d1-muted">
                      Unavailable
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <p className={`text-[10px] uppercase tracking-widest ${marketing ? "text-[#FF6A00]" : "text-d1-orange"}`}>
                    {p.category}
                  </p>
                  <h3 className={`mt-1 text-xl font-bold ${marketing ? "text-neutral-900" : "font-display text-2xl text-d1-off-white"}`}>
                    {p.name}
                  </h3>
                  <p className={`mt-2 font-semibold text-sm ${marketing ? "text-neutral-700" : "text-d1-off-white/90"}`}>
                    {formatPublicPrice(p.internalPrice, !!p.showPublicPrice)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <p className={`text-center text-sm ${marketing ? "text-neutral-500" : "text-d1-muted"}`}>
          No products match your filters.
        </p>
      )}
    </div>
  );
}
