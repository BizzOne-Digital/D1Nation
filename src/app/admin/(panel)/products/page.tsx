"use client";

import { useEffect, useState } from "react";
import { AdminField, adminInputClass } from "@/components/admin/AdminField";
import { AdminFormActions } from "@/components/admin/AdminFormActions";
import { AdminListRow } from "@/components/admin/AdminListRow";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { adminList, adminRequest } from "@/lib/admin-client";

type Product = {
  _id?: string;
  name: string;
  slug?: string;
  description: string;
  category: string;
  images?: { url: string; alt?: string; publicId?: string }[];
  internalPrice?: number | null;
  showPublicPrice?: boolean;
  available?: boolean;
  published?: boolean;
};

const emptyProduct = (): Product => ({
  name: "",
  description: "",
  category: "General",
  available: true,
  published: false,
});

export default function AdminProductsPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [form, setForm] = useState<Product>(emptyProduct());
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  async function load() {
    try {
      setItems(await adminList<Product>("/api/admin/products"));
    } catch (e) {
      setMessage({ type: "err", text: e instanceof Error ? e.message : "Could not load products" });
    }
  }

  useEffect(() => {
    load();
  }, []);

  function startNew() {
    setForm(emptyProduct());
    setMessage(null);
  }

  function startEdit(p: Product) {
    setForm({ ...p, images: p.images?.length ? [...p.images] : [] });
    setMessage(null);
  }

  const imageUrl = form.images?.[0]?.url;

  async function save() {
    if (!form.name.trim()) {
      setMessage({ type: "err", text: "Product name is required." });
      return;
    }
    setSaving(true);
    setMessage(null);
    try {
      const { _id, ...fields } = form;
      if (_id) {
        await adminRequest("/api/admin/products", { method: "PATCH", body: { id: _id, ...fields } });
        setMessage({ type: "ok", text: "Product updated." });
      } else {
        await adminRequest("/api/admin/products", { method: "POST", body: fields });
        setMessage({ type: "ok", text: "Product added." });
      }
      setForm(emptyProduct());
      await load();
    } catch (e) {
      setMessage({ type: "err", text: e instanceof Error ? e.message : "Save failed" });
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this product?")) return;
    try {
      await adminRequest("/api/admin/products", { method: "DELETE", body: { id } });
      if (form._id === id) setForm(emptyProduct());
      await load();
      setMessage({ type: "ok", text: "Product deleted." });
    } catch (e) {
      setMessage({ type: "err", text: e instanceof Error ? e.message : "Delete failed" });
    }
  }

  const isEdit = Boolean(form._id);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-d1-off-white">Products</h1>
          <p className="mt-2 text-sm text-d1-muted">Manage shop items with photos, pricing, and availability.</p>
        </div>
        <button
          type="button"
          onClick={startNew}
          className="rounded-full border border-dashed border-d1-orange/50 px-5 py-2 text-sm font-semibold text-d1-orange hover:bg-d1-orange/10"
        >
          + New product
        </button>
      </div>

      {message && (
        <p className={`text-sm ${message.type === "ok" ? "text-d1-orange" : "text-red-400"}`}>{message.text}</p>
      )}

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
          label="Product image"
          folder="products"
          value={imageUrl}
          onChange={(url, publicId) =>
            setForm({
              ...form,
              images: url ? [{ url, alt: form.name, publicId }] : [],
            })
          }
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField label="Internal price (optional)">
            <input
              type="number"
              className={adminInputClass}
              value={form.internalPrice ?? ""}
              onChange={(e) => setForm({ ...form, internalPrice: e.target.value ? Number(e.target.value) : null })}
            />
          </AdminField>
          <label className="flex items-center gap-2 pt-6 text-sm text-d1-off-white">
            <input type="checkbox" checked={!!form.showPublicPrice} onChange={(e) => setForm({ ...form, showPublicPrice: e.target.checked })} />
            Show public price on site
          </label>
        </div>
        <label className="flex items-center gap-2 text-sm text-d1-off-white">
          <input type="checkbox" checked={!!form.available} onChange={(e) => setForm({ ...form, available: e.target.checked })} />
          Available for inquiry
        </label>
        <label className="flex items-center gap-2 text-sm text-d1-off-white">
          <input type="checkbox" checked={!!form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
          Published on site
        </label>
        <AdminFormActions
          isEdit={isEdit}
          saving={saving}
          onSave={save}
          onCancel={isEdit ? startNew : undefined}
          saveLabel={isEdit ? "Save changes" : "Add product"}
        />
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-d1-muted">All products ({items.length})</h2>
        <ul className="space-y-2">
          {items.map((p) => (
            <AdminListRow
              key={p._id}
              title={p.name}
              subtitle={[p.category, p.published ? "Live" : "Draft", p.available ? "Available" : "Unavailable"].join(" · ")}
              imageUrl={p.images?.[0]?.url}
              onEdit={() => startEdit(p)}
              onDelete={() => p._id && remove(p._id)}
            />
          ))}
        </ul>
        {items.length === 0 && <p className="text-sm text-d1-muted">No products yet.</p>}
      </div>
    </div>
  );
}
