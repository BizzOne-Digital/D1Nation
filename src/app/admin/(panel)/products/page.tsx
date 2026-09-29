"use client";

import { useEffect, useState } from "react";
import { AdminField, adminInputClass } from "@/components/admin/AdminField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

type Product = {
  _id?: string;
  name: string;
  slug?: string;
  description: string;
  category: string;
  images?: { url: string; alt?: string }[];
  internalPrice?: number | null;
  showPublicPrice?: boolean;
  available?: boolean;
  published?: boolean;
};

export default function AdminProductsPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [form, setForm] = useState<Product>({ name: "", description: "", category: "General" });

  async function load() {
    setItems(await (await fetch("/api/admin/products")).json());
  }

  useEffect(() => {
    load();
  }, []);

  async function save() {
    const method = form._id ? "PATCH" : "POST";
    const body = form._id ? { id: form._id, ...form } : form;
    await fetch("/api/admin/products", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    setForm({ name: "", description: "", category: "General" });
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete product?")) return;
    await fetch("/api/admin/products", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    load();
  }

  const imageUrl = form.images?.[0]?.url;

  return (
    <div className="space-y-8">
      <h1 className="font-display text-4xl text-d1-off-white">Products</h1>
      <div className="max-w-2xl space-y-4 rounded-xl border border-white/10 p-6">
        <AdminField label="Name">
          <input className={adminInputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </AdminField>
        <AdminField label="Category">
          <input className={adminInputClass} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
        </AdminField>
        <AdminField label="Description">
          <textarea className={adminInputClass} rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </AdminField>
        <ImageUploadField
          label="Primary image"
          folder="products"
          value={imageUrl}
          onChange={(url) => setForm({ ...form, images: [{ url, alt: form.name }] })}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField label="Internal price">
            <input type="number" className={adminInputClass} value={form.internalPrice ?? ""} onChange={(e) => setForm({ ...form, internalPrice: e.target.value ? Number(e.target.value) : null })} />
          </AdminField>
          <label className="flex items-center gap-2 pt-6 text-sm">
            <input type="checkbox" checked={!!form.showPublicPrice} onChange={(e) => setForm({ ...form, showPublicPrice: e.target.checked })} /> Show public price
          </label>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={!!form.available} onChange={(e) => setForm({ ...form, available: e.target.checked })} /> Available
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={!!form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} /> Published
        </label>
        <button type="button" onClick={save} className="rounded-full bg-d1-orange px-6 py-2 text-sm font-semibold text-d1-charcoal">
          {form._id ? "Update" : "Add"} Product
        </button>
      </div>
      <ul className="space-y-2">
        {items.map((p) => (
          <li key={p._id} className="flex justify-between rounded-lg border border-white/10 p-4">
            <span className="text-sm">{p.name} · {p.published ? "Live" : "Draft"}</span>
            <div className="flex gap-2">
              <button type="button" className="text-xs text-d1-orange" onClick={() => setForm(p)}>Edit</button>
              <button type="button" className="text-xs text-red-400" onClick={() => p._id && remove(p._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
